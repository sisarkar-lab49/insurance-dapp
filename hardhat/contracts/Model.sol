// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

contract Model {
    enum PremiumFrequancy {
        YEARLY,
        HALF_YEARLY,
        QUARTERLY
    }

    enum Status {
        ACTIVE,
        INACTIVE,
        CLAIMED
    }

    struct Policy {
        string name;
        string[] features;
        string description;
        uint minTenure;
        uint maxTenure;
        uint minSumInsured;
        uint basePremium;
        uint yeildPercentage;
        Status status;
    }

    struct Subscription {
        string policyName;
        uint tenure;
        uint sumInsured;
        PremiumFrequancy premiumFrequency;
        uint personAge;
        uint premiumAmount;
        uint paidPremium;
        Status status;
    }
}
