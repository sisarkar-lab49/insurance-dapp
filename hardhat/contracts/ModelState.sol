// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@chainlink/contracts/src/v0.8/ConfirmedOwner.sol";

contract ModelState is ConfirmedOwner {
    Policy[] internal policies;
    mapping(address => Subscription[]) internal subscriptions;

    constructor() ConfirmedOwner(msg.sender) {
        string[] memory features = new string[](3);
        features[0] = "feature 1";
        features[1] = "feature 2";
        features[2] = "feature 3";
        policies.push(Policy("Wellness", features, "Wellness policy", 5, 25, 2100000, 4, "T & C", Status.ACTIVE));
        policies.push(Policy("Silver", features, "Silver policy", 5, 25, 200000, 4, "T & C", Status.ACTIVE));
        policies.push(Policy("Gold", features, "Gold policy", 5, 25, 300000, 4, "T & C", Status.ACTIVE));
        policies.push(Policy("Platinum", features, "Platinum policy", 5, 25, 400000, 4, "T & C", Status.ACTIVE));
    }

    enum PremiumFrequancy{
        YEARLY,
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
        string description;
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

    error PolicyNotFound(string policyName);

     modifier onlyPolicyHolder() {
        require(subscriptions[msg.sender].length > 0, "Not a policy holder.");
        _;
    }

    function getPolicy(string calldata _policyName) public view returns (Policy memory){
        for(uint i=0; i < policies.length; i++){
            if(keccak256(abi.encodePacked((_policyName))) ==
             keccak256(abi.encodePacked((policies[i].name)))){
               return policies[i];
            }
        }
        revert PolicyNotFound(_policyName);
    }

    function getAllPolicies() external view returns(Policy[] memory _policies){
        _policies = policies;
    }

    function getSubscriptions() external view onlyPolicyHolder returns(Subscription[] memory){
        return subscriptions[msg.sender];
    }

    function getSubscriptions(address _policyHolder) external view onlyPolicyHolder returns(Subscription[] memory){
        return subscriptions[_policyHolder];
    }

    function isSubscriptionActive(uint _subscriptionIndex) external view onlyPolicyHolder returns (bool){
        require(_subscriptionIndex < subscriptions[msg.sender].length, "Invalid subscription Id.");
        return isSubscriptionActiveForPolicyHolder(msg.sender, _subscriptionIndex);
    }

    function isSubscriptionActiveForPolicyHolder(address _policyHolder, uint _subscriptionIndex)
     internal view returns (bool){
        return (subscriptions[_policyHolder][_subscriptionIndex].status == Status.ACTIVE);
    }

    function isPolicyExist(string calldata _policyName) internal view returns (bool){
        for(uint i=0; i < policies.length; i++){
            if(keccak256(abi.encodePacked((_policyName))) ==
             keccak256(abi.encodePacked((policies[i].name)))){
                return true;
            }
        }
        return false;
    }

    function changePolicyStatus(string calldata _policyName, Status _status)
     external onlyOwner returns (bool){
        uint policyIndexInArray = getPolicyIndex(_policyName);
        Policy memory policy = policies[policyIndexInArray];
        policy.status = _status;
        policies[policyIndexInArray] = policy;
        return true;
    }

     function getPolicyIndex(string calldata _policyName) private view returns (uint){
        for(uint i=0; i < policies.length; i++){
            if(keccak256(abi.encodePacked((_policyName))) ==
             keccak256(abi.encodePacked((policies[i].name)))){
               return i;
            }
        }
        revert PolicyNotFound(_policyName);
    }
}
