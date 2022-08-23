// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "hardhat/console.sol";

import "./Payable.sol";
import "./PriceConsumer.sol";

contract Insurance is Payable, PriceConsumer {
  
    modifier isValidInput(string calldata _policyName, uint _sumInsured) {
        Policy memory policy = getPolicy(_policyName);
        require(_sumInsured >= policy.minSumInsured, "sum assured is not correct.");
        _;
    }

    error DuplicatePolicy(string policyName);

    function addPolicy(string calldata _policyName, string[] memory _features,
     string calldata _description, uint _minTenure, uint _maxTenure, uint _minSumInsured,
      uint _yeildPercentage, string calldata _terms) external onlyOwner returns (bool){
        if(isPolicyExist(_policyName)) {
            console.log("Policy with name %s already exists.", _policyName);
            revert DuplicatePolicy(_policyName);
        }
        policies.push(Policy(_policyName, _features, _description, _minTenure,
         _maxTenure, _minSumInsured, _yeildPercentage, _terms, Status.ACTIVE));
        console.log("Policy added with name %s.", _policyName);
        return true;
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
        uint prevBalance = getBalance();
        require(msg.value >= premiumAmount/1000000 ether, "Not enough Ether to buy this policy");
        console.log("transferring %s ether to contact.");
        require(payable(address(this)).send(premiumAmount/1000000 ether));
        Subscription memory subscription = Subscription(_policyName, _tenure, _sumInsured,
         _premiumFrequency, _age, getBalance() - prevBalance, getBalance() - prevBalance, Status.ACTIVE);
        subscriptions[msg.sender].push(subscription);
        return true;
    }

    function claimSettlement(address _policyHolder, uint _subscriptionIndex) public onlyOwner onlyPolicyHolder returns (bool){
        require(isSubscriptionActiveForPolicyHolder(_policyHolder, _subscriptionIndex), "Subscription is not avtive");

        Subscription memory subscription = subscriptions[msg.sender][_subscriptionIndex];
        console.log("transferring %s ether to policy holder.");
        payable(_policyHolder).transfer(subscription.paidPremium);

        subscriptions[_policyHolder][_subscriptionIndex].status = Status.CLAIMED;
        return true;
    }

    function payPremium(uint _subscriptionIndex) payable external returns (bool){
        require(_subscriptionIndex < subscriptions[msg.sender].length, "Invalid subscription Id.");
        Subscription memory subscription = subscriptions[msg.sender][_subscriptionIndex];
        uint prevBalance = getBalance();
        require(msg.value >= subscription.premiumAmount/1000000 ether, "Not enough Ether to pay preminum");
        console.log("transferring %s ether to contact.");
        require(payable(address(this)).send(subscription.premiumAmount/1000000 ether));
        uint premiumPaid = getBalance() - prevBalance;
        subscriptions[msg.sender][_subscriptionIndex].paidPremium = subscription.paidPremium + premiumPaid;
        return true;
    }
}