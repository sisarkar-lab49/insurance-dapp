// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@chainlink/contracts/src/v0.8/ConfirmedOwner.sol";

contract Payable is ConfirmedOwner {
    receive() external payable {}
    fallback() external payable {}

    constructor() ConfirmedOwner(msg.sender) {
    }
    
    function getBalance() public view returns (uint) {
        return address(this).balance;
    }

    function withdraw() external onlyOwner {
        payable(owner()).transfer(getBalance());
    }
}
