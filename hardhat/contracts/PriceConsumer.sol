// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";

contract PriceConsumer {
    AggregatorV3Interface internal priceFeed;

    constructor() {
        priceFeed = AggregatorV3Interface(
            0xD4a33860578De61DBAbDc8BFdb98FD742fA7028e
        );
    }

    function getLatestPrice() internal view returns (int) {
        (
            ,
            /*uint80 roundID*/
            int price,
            ,
            ,

        ) = /*uint startedAt*/
            /*uint timeStamp*/
            /*uint80 answeredInRound*/
            priceFeed.latestRoundData();
        return price;
    }

    function getEtherForDollar(uint dollar) internal view returns (uint) {
        uint etherVsDollar = uint(getLatestPrice());
        return (dollar * 10**8) / etherVsDollar;
    }

    function getGweiForDollar(uint dollar) public view returns (uint) {
        uint etherVsDollar = uint(getLatestPrice());
        return ((dollar * 10**8) / etherVsDollar) * 10**6;
    }
}
