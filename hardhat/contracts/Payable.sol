// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "./ModelState.sol";

contract Payable is ModelState {
    receive() external payable {}
    fallback() external payable {}

    function getBalance() public view returns (uint) {
        return address(this).balance;
    }

    function withdraw() external onlyOwner {
        payable(owner()).transfer(getBalance());
    }
}
