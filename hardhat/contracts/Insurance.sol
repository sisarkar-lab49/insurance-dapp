// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

import "hardhat/console.sol";

contract Insurance {

    enum PremiumFrequancy{
        Yearly,
        HALF_YEARLY,
        QUARTERLY
    }

    enum Status{
        ACTIVE,
        INACTIVE,
        CLAIMED
    }

    struct Policy{
        string name;
        string[] features;
        string descriotion;
        uint minTenure;
        uint maxTenure;
        uint minSumInsured;
        uint yeildPercentage;
        string terms;
        Status status;
    }

    struct Subscription{
        string policyName;
        uint tenure;
        uint sumInsured;
        PremiumFrequancy premiumFrequency;
        uint personAge;
        uint premiumAmount;
        uint paidPremium;
        Status status;
    }

    address owner;
    Policy[] public policies;
    mapping(address => Subscription[]) subscriptions;

    constructor(){
        owner = msg.sender;
    }

    modifier isOwner(){
        require(msg.sender == owner, "Caller is not Policy owner");
        _;
    }

    error PolicyNotFound(string policyName);
    error DuplicatePolicy(string policyName);

    function addPolicy(string calldata _policyName, string[] memory _features, string calldata _description, uint _minTenure, uint _maxTenure, uint _minSumInsured, uint _yeildPercentage, string calldata _terms) external isOwner returns (bool){
        if(isPolicyExist(_policyName)) {
             revert DuplicatePolicy(_policyName);
        }
        policies.push(Policy(_policyName, _features, _description, _minTenure, _maxTenure, _minSumInsured, _yeildPercentage, _terms, Status.ACTIVE));
        return true;
        
    }

    function getAllPolicies() external view returns(Policy[] memory _policies){
        _policies = policies;
    }

    function changePolicyStatus(string calldata _policyName, Status _status) external isOwner returns (bool){
        uint policyIndexInArray = getPolicyIndex(_policyName);
        Policy memory policy = policies[policyIndexInArray];
        policy.status = _status;
        policies[policyIndexInArray] = policy;
        return true;
    }

    // TODO
    function calculatePremium(string calldata _policyName, uint _tenure, uint _sumInsured, PremiumFrequancy _premiumFrequency, uint _age) public view returns(uint){
        return _age;
    }


    function buyPolicy(string calldata _policyName, uint _tenure, uint _sumInsured, PremiumFrequancy _premiumFrequency, uint _age) payable public returns(bool){
        uint premiumAmount = calculatePremium(_policyName, _tenure, _sumInsured, _premiumFrequency, _age);
        require(msg.value >= premiumAmount, "Not enough Ether to buy this policy");

        payable(msg.sender).transfer(premiumAmount);

        Subscription memory subscription = Subscription(_policyName, _tenure, _sumInsured, _premiumFrequency, _age, premiumAmount, premiumAmount, Status.ACTIVE);
        subscriptions[msg.sender].push(subscription);
        return true;
    }

    function getSubscriptions() external view returns(Subscription[] memory){
        return subscriptions[msg.sender];
    }

    // TODO: add some check id index is not found
    function isSubscriptionActive(uint _subscriptionIndex) external view returns (bool){
        return isSubscriptionActiveForPolicyHolder(msg.sender, _subscriptionIndex);
    }

    function isSubscriptionActiveForPolicyHolder(address _policyHolder, uint _subscriptionIndex) private view returns (bool){
        return (subscriptions[_policyHolder][_subscriptionIndex].status == Status.ACTIVE);
    }

    function payPremium(uint _subscriptionIndex) payable external returns (bool){
        // get premium from subscription
        Subscription memory subscription = subscriptions[msg.sender][_subscriptionIndex];

        //validation
        require(msg.value >= subscription.premiumAmount, "Not enough Ether to buy this policy");

        // transfer premium from policyHolder to Insurance company
        payable(msg.sender).transfer(subscription.premiumAmount);

        // update paidPremium in subscription
        subscriptions[msg.sender][_subscriptionIndex].paidPremium = subscription.paidPremium + subscription.premiumAmount;
        return true;
    }

    function claimSettlement(address _policyHolder, uint _subscriptionIndex) public isOwner returns (bool){
        require(isSubscriptionActiveForPolicyHolder(_policyHolder, _subscriptionIndex), "Subscription is not avtive");

        Subscription memory subscription = subscriptions[msg.sender][_subscriptionIndex];
        if(payable(_policyHolder).send(subscription.sumInsured)){
            subscriptions[_policyHolder][_subscriptionIndex].status = Status.CLAIMED;
            return true;
        }
        return false;
    }


    function getPolicyIndex(string calldata _policyName) private view returns (uint){
        for(uint i=0; i < policies.length; i++){
            if(keccak256(abi.encodePacked((_policyName))) == keccak256(abi.encodePacked((policies[i].name)))){
               return i;
            }
        }
        revert PolicyNotFound(_policyName);
    }

    function getPolicy(string calldata _policyName) private view returns (Policy memory){
        for(uint i=0; i < policies.length; i++){
            if(keccak256(abi.encodePacked((_policyName))) == keccak256(abi.encodePacked((policies[i].name)))){
               return policies[i];
            }
        }
        revert PolicyNotFound(_policyName);
    }

    function isPolicyExist(string calldata _policyName) private view returns (bool){
        for(uint i=0; i < policies.length; i++){
            if(keccak256(abi.encodePacked((_policyName))) == keccak256(abi.encodePacked((policies[i].name)))){
                return true;
            }
        }
        return false;
    }

}