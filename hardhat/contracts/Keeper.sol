// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@chainlink/contracts/src/v0.8/ChainlinkClient.sol";
import "@chainlink/contracts/src/v0.8/KeeperCompatible.sol";

import './Insurance.sol';

contract Keeper is ChainlinkClient, KeeperCompatibleInterface {

    uint256 private fee;
    bytes32 private jobId;

    uint256 public data;
    uint256 public volume;
    uint256 private lastRun;

    using Chainlink for Chainlink.Request;

    event RequestVolume(bytes32 indexed requestId, uint256 volume);

    constructor() {
      setChainlinkToken(0x326C977E6efc84E512bB9C30f76E30c160eD06FB);
      setChainlinkOracle(0xCC79157eb46F5624204f47AB42b3906cAA40eaB7);
      jobId = "ca98366cc7314957b8c012c72f05aeeb";
      fee = (1 * LINK_DIVISIBILITY) / 10;
      lastRun = block.timestamp;
    }

    function setVolumn() public returns (uint256) {
        volume = 1;
        return volume;
    }

    function requestVolumeData() public returns (bytes32 requestId) {
        Chainlink.Request memory req = buildChainlinkRequest(jobId, address(this), this.fulfill.selector);
        req.add('get', 'https://min-api.cryptocompare.com/data/pricemultifull?fsyms=ETH&tsyms=USD');
        req.add('path', 'RAW,ETH,USD,VOLUME24HOUR');
        int256 timesAmount = 10**18;
        req.addInt('times', timesAmount);
        return sendChainlinkRequest(req, fee);
    }

    function fulfill(bytes32 _requestId, uint256 _volume) public recordChainlinkFulfillment(_requestId) {
        emit RequestVolume(_requestId, _volume);
        volume = _volume;
    }

    function checkUpkeep(bytes calldata checkData) external view override returns (bool upkeepNeeded, bytes memory performData) {
        uint256 decodedValue = uint256(bytes32(checkData));
        upkeepNeeded = false;

        if(decodedValue == 0) {
            upkeepNeeded = volume != 0;
        } else {
            upkeepNeeded = block.timestamp - lastRun > 2 minutes;
        }

        performData = checkData;
        return (upkeepNeeded, checkData);
    }

    function performUpkeep(bytes calldata performData) external override {
        uint256 decodedValue = uint256(bytes32(performData));

        if(decodedValue == 0) {
            Insurance insuranceContract = Insurance(payable(0x2679cdD3987306FB0c0E69fe6603c78629C66a75));
            insuranceContract.claimSettlement(0x75a562D72c3E31343E9C66B259aE72e346DEBc62, 1);
            data = insuranceContract.getBalance();
            //payable(0x2679cdD3987306FB0c0E69fe6603c78629C66a75).call{gas: 1000000, value: 0.01 ether}(abi.encodeWithSignature("claimSettlement(address, uint)", 0x75a562D72c3E31343E9C66B259aE72e346DEBc62, 1));
            //0x2679cdD3987306FB0c0E69fe6603c78629C66a75.call(abi.encodeWithSignature("claimSettlement(address, uint)", 0x75a562D72c3E31343E9C66B259aE72e346DEBc62, 1));
        } else {
            lastRun = block.timestamp;
            requestVolumeData();
        }
    }
}