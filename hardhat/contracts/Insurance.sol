// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "hardhat/console.sol";

import "./Model.sol";

contract Insurance is Model {

    address private _owner;
    Policy[] public policies;
    mapping(address => Subscription[]) subscriptions;

    constructor() {
        _owner = msg.sender;
        string[] memory features = new string[](3);
        features[0] = "feature 1";
        features[1] = "feature 2";
        features[2] = "feature 3";
        policies.push(Policy("Platinum", features, "Platinum policy", 5, 25, 200000, 4, "T & C", Status.ACTIVE));
        policies.push(Policy("Gold", features, "Gold policy", 5, 25, 200000, 4, "T & C", Status.ACTIVE));
        policies.push(Policy("Silver", features, "Silver policy", 5, 25, 200000, 4, "T & C", Status.ACTIVE));
    }

    modifier onlyOwner() {
        require(msg.sender == _owner, "Not owner.");
        _;
    }

    modifier onlyPolicyHolder() {
        require(subscriptions[msg.sender].length > 0, "Not a policy holder.");
        _;
    }

    modifier isValidInput(string calldata _policyName, uint _sumInsured) {
        Policy memory policy = getPolicy(_policyName);
        require(_sumInsured >= policy.minSumInsured, "selected sum assured is not correct.");
        _;
    }

    function addPolicy(string calldata _policyName, string[] memory _features, string calldata _description, uint _minTenure, uint _maxTenure, uint _minSumInsured, uint _yeildPercentage, string calldata _terms) external onlyOwner returns (bool){
        if(isPolicyExist(_policyName)) {
             revert DuplicatePolicy(_policyName);
        }
        policies.push(Policy(_policyName, _features, _description, _minTenure, _maxTenure, _minSumInsured, _yeildPercentage, _terms, Status.ACTIVE));
        return true;
    }

    function isPolicyExist(string calldata _policyName) private view returns (bool){
        for(uint i=0; i < policies.length; i++){
            if(keccak256(abi.encodePacked((_policyName))) == keccak256(abi.encodePacked((policies[i].name)))){
                return true;
            }
        }
        return false;
    }

    function changePolicyStatus(string calldata _policyName, Status _status) external onlyOwner returns (bool){
        uint policyIndexInArray = getPolicyIndex(_policyName);
        Policy memory policy = policies[policyIndexInArray];
        policy.status = _status;
        policies[policyIndexInArray] = policy;
        return true;
    }

     function getPolicyIndex(string calldata _policyName) private view returns (uint){
        for(uint i=0; i < policies.length; i++){
            if(keccak256(abi.encodePacked((_policyName))) == keccak256(abi.encodePacked((policies[i].name)))){
               return i;
            }
        }
        revert PolicyNotFound(_policyName);
    }

    function calculatePremium(string calldata _policyName, uint _tenure,
     uint _sumInsured, PremiumFrequancy _premiumFrequency, uint _age)
      public view isValidInput(_policyName, _sumInsured) returns(uint){
        uint basePremium = (_sumInsured * 2)/100;

        uint discountOnPremiumFreq = 0;
        if(_premiumFrequency == PremiumFrequancy.YEARLY) {
            discountOnPremiumFreq = 2;
        } else if(_premiumFrequency == PremiumFrequancy.HALF_YEARLY) {
            discountOnPremiumFreq = 1;
        }

        uint discountOnAge = 0;
        if(_age < 30) {
            discountOnAge = 2;
        }

        uint discountOnTenure = 0;
        if(_tenure > 15) {
            discountOnTenure = 1;
        }

        return basePremium - (basePremium*discountOnPremiumFreq)/100 - (basePremium*discountOnAge)/100 - (basePremium*discountOnTenure)/100;
    }


    function buyPolicy(string calldata _policyName, uint _tenure,
     uint _sumInsured, PremiumFrequancy _premiumFrequency, uint _age)
      payable public isValidInput(_policyName, _sumInsured) returns(bool){
        uint premiumAmount = calculatePremium(_policyName, _tenure, _sumInsured, _premiumFrequency, _age);
        require(msg.value >= premiumAmount/100000000, "Not enough Ether to buy this policy");

        payable(msg.sender).transfer(premiumAmount/100000000);

        Subscription memory subscription = Subscription(_policyName, _tenure, _sumInsured, _premiumFrequency, _age, premiumAmount, premiumAmount, Status.ACTIVE);
        subscriptions[msg.sender].push(subscription);
        return true;
    }

    function getSubscriptions() external view onlyPolicyHolder returns(Subscription[] memory){
        return subscriptions[msg.sender];
    }

    function claimSettlement(address _policyHolder, uint _subscriptionIndex) public onlyOwner onlyPolicyHolder returns (bool){
        require(isSubscriptionActiveForPolicyHolder(_policyHolder, _subscriptionIndex), "Subscription is not avtive");

        Subscription memory subscription = subscriptions[msg.sender][_subscriptionIndex];
        if(payable(_policyHolder).send(subscription.sumInsured)){
            subscriptions[_policyHolder][_subscriptionIndex].status = Status.CLAIMED;
            return true;
        }
        return false;
    }

    function isSubscriptionActive(uint _subscriptionIndex) external view onlyPolicyHolder returns (bool){
        require(_subscriptionIndex < subscriptions[msg.sender].length, "Invalid subscription Id.");
        return isSubscriptionActiveForPolicyHolder(msg.sender, _subscriptionIndex);
    }

    function isSubscriptionActiveForPolicyHolder(address _policyHolder, uint _subscriptionIndex) private view returns (bool){
        return (subscriptions[_policyHolder][_subscriptionIndex].status == Status.ACTIVE);
    }

    function payPremium(uint _subscriptionIndex) payable external returns (bool){
        require(_subscriptionIndex < subscriptions[msg.sender].length, "Invalid subscription Id.");
        Subscription memory subscription = subscriptions[msg.sender][_subscriptionIndex];
        require(msg.value >= subscription.premiumAmount/100000000,
         "Not enough Ether to buy this policy");
        payable(msg.sender).transfer(subscription.premiumAmount/100000000);
        subscriptions[msg.sender][_subscriptionIndex].paidPremium = subscription.paidPremium + subscription.premiumAmount;
        return true;
    }

    function getPolicy(string calldata _policyName) private view returns (Policy memory){
        for(uint i=0; i < policies.length; i++){
            if(keccak256(abi.encodePacked((_policyName))) == keccak256(abi.encodePacked((policies[i].name)))){
               return policies[i];
            }
        }
        revert PolicyNotFound(_policyName);
    }

    function getAllPolicies() external view returns(Policy[] memory _policies){
        _policies = policies;
    }

    function getBalance() public view onlyOwner returns (uint) {
        return address(this).balance;
    }

    function withdraw() external onlyOwner {
        payable(_owner).transfer(getBalance());
    }
}