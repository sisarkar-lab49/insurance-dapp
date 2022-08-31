// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@chainlink/contracts/src/v0.8/ChainlinkClient.sol";
import "@chainlink/contracts/src/v0.8/KeeperCompatible.sol";

import "./Insurance.sol";

contract Keeper is ChainlinkClient, KeeperCompatibleInterface {
    uint256 private fee;
    bytes32 private jobId;

    string public id;
    uint256 private lastRun;

    address private _contract;

    using Chainlink for Chainlink.Request;

    event RequestId(bytes32 indexed requestId, string id);

    constructor(address _address) {
        setChainlinkToken(0x326C977E6efc84E512bB9C30f76E30c160eD06FB);
        setChainlinkOracle(0xCC79157eb46F5624204f47AB42b3906cAA40eaB7);
        jobId = "7d80a6386ef543a3abb52817f6707e3b";
        fee = (1 * LINK_DIVISIBILITY) / 10;
        lastRun = block.timestamp;
        _contract = _address;
    }

    function requestData() public returns (bytes32 requestId) {
        Chainlink.Request memory req = buildChainlinkRequest(
            jobId,
            address(this),
            this.fulfill.selector
        );
        req.add(
            "get",
            "http://ec2-52-6-158-33.compute-1.amazonaws.com:8080/api/data"
        );
        req.add("path", "id");
        return sendChainlinkRequest(req, fee);
    }

    function fulfill(bytes32 _requestId, string memory _id)
        public
        recordChainlinkFulfillment(_requestId)
    {
        emit RequestId(_requestId, _id);
        id = _id;
    }

    function checkUpkeep(bytes calldata checkData)
        external
        view
        override
        returns (bool upkeepNeeded, bytes memory performData)
    {
        uint256 decodedValue = uint256(bytes32(checkData));
        upkeepNeeded = false;

        if (decodedValue == 0) {
            upkeepNeeded =
                keccak256(abi.encodePacked("")) !=
                keccak256(abi.encodePacked(id));
        } else {
            upkeepNeeded = block.timestamp - lastRun > 3 minutes;
        }

        performData = checkData;
    }

    function performUpkeep(bytes calldata performData) external override {
        uint256 decodedValue = uint256(bytes32(performData));

        if (decodedValue == 0) {
            Insurance insuranceContract = Insurance(payable(_contract));
            insuranceContract.claimSettlement(
                0x75a562D72c3E31343E9C66B259aE72e346DEBc62,
                0
            );
            id = "";
        } else {
            lastRun = block.timestamp;
            requestData();
        }
    }
}
