// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "./Model.sol";
import "./Payable.sol";

contract ModelState is Model, Payable {
    Policy[] internal policies;
    mapping(address => Subscription[]) internal subscriptions;

    constructor() {
        string[] memory features = new string[](6);

        // wellness
        features[0] = "Covers Medical illness";
        features[1] = "Critical hospitalization cover";
        features[2] = "100% cliam coverage";
        features[3] = "Addon plans available";
        features[4] = "Flexible coverage options";
        features[5] = "Nominee registration options";
        policies.push(
            Policy(
                "Wellness",
                features,
                "For individuals and small teams",
                5,
                25,
                100000,
                9,
                4,
                Status.ACTIVE
            )
        );

        // silver
        features[0] = "Get assured returns";
        features[1] = "4% return on maturity";
        features[2] = "2x payment in accidental death";
        features[3] = "Easy premiunm payment";
        features[4] = "Flexible plan tenure";
        features[5] = "Nominee registration options";
        policies.push(
            Policy(
                "Silver",
                features,
                "For startups and growing businesses",
                5,
                25,
                200000,
                19,
                4,
                Status.ACTIVE
            )
        );

        // Gold
        features[0] = "Silver plan benefits";
        features[1] = "Multiple nominee option";
        features[2] = "Pre maturity withdrawal";
        features[3] = "Family plans available";
        features[4] = "Loan against deposit";
        features[5] = "1% higher return";
        policies.push(
            Policy(
                "Gold",
                features,
                "For organisations with advanced needs",
                5,
                25,
                300000,
                99,
                4,
                Status.ACTIVE
            )
        );

        // Platinum
        features[0] = "Gold plan benefits";
        features[1] = "Medical insurance included";
        features[2] = "Late payment waiver**";
        features[3] = "Option to redeposit on maturity";
        features[4] = "Entire family coverage";
        features[5] = "2% higher return";
        policies.push(
            Policy(
                "Platinum",
                features,
                "For organisations with advanced needs",
                5,
                25,
                400000,
                99,
                5,
                Status.ACTIVE
            )
        );
    }

    error PolicyNotFound(string policyName);

    modifier onlyPolicyHolder() {
        require(subscriptions[msg.sender].length > 0, "Not a policy holder.");
        _;
    }

    function getPolicy(string calldata _policyName)
        public
        view
        returns (Policy memory)
    {
        for (uint i = 0; i < policies.length; i++) {
            if (
                keccak256(abi.encodePacked((_policyName))) ==
                keccak256(abi.encodePacked((policies[i].name)))
            ) {
                return policies[i];
            }
        }
        revert PolicyNotFound(_policyName);
    }

    function getAllPolicies()
        external
        view
        returns (Policy[] memory _policies)
    {
        _policies = policies;
    }

    function getSubscriptions()
        external
        view
        onlyPolicyHolder
        returns (Subscription[] memory)
    {
        return subscriptions[msg.sender];
    }

    function getSubscriptions(address _policyHolder)
        external
        view
        onlyPolicyHolder
        returns (Subscription[] memory)
    {
        return subscriptions[_policyHolder];
    }

    function isSubscriptionActive(uint _subscriptionIndex)
        external
        view
        onlyPolicyHolder
        returns (bool)
    {
        require(
            _subscriptionIndex < subscriptions[msg.sender].length,
            "Invalid subscription Id."
        );
        return
            isSubscriptionActiveForPolicyHolder(msg.sender, _subscriptionIndex);
    }

    function isSubscriptionActiveForPolicyHolder(
        address _policyHolder,
        uint _subscriptionIndex
    ) internal view returns (bool) {
        return (subscriptions[_policyHolder][_subscriptionIndex].status ==
            Status.ACTIVE);
    }

    function isPolicyExist(string calldata _policyName)
        internal
        view
        returns (bool)
    {
        for (uint i = 0; i < policies.length; i++) {
            if (
                keccak256(abi.encodePacked((_policyName))) ==
                keccak256(abi.encodePacked((policies[i].name)))
            ) {
                return true;
            }
        }
        return false;
    }

    function changePolicyStatus(string calldata _policyName, Status _status)
        external
        onlyOwner
        returns (bool)
    {
        uint policyIndexInArray = getPolicyIndex(_policyName);
        Policy memory policy = policies[policyIndexInArray];
        policy.status = _status;
        policies[policyIndexInArray] = policy;
        return true;
    }

    function getPolicyIndex(string calldata _policyName)
        private
        view
        returns (uint)
    {
        for (uint i = 0; i < policies.length; i++) {
            if (
                keccak256(abi.encodePacked((_policyName))) ==
                keccak256(abi.encodePacked((policies[i].name)))
            ) {
                return i;
            }
        }
        revert PolicyNotFound(_policyName);
    }
}
