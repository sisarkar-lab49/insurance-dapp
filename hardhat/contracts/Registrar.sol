// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import {KeeperRegistryInterface, State, Config} from "@chainlink/contracts/src/v0.8/interfaces/KeeperRegistryInterface.sol";
import {LinkTokenInterface} from "@chainlink/contracts/src/v0.8/interfaces/LinkTokenInterface.sol";

interface KeeperRegistrarInterface {
    function register(
        string memory name,
        bytes calldata encryptedEmail,
        address upkeepContract,
        uint32 gasLimit,
        address adminAddress,
        bytes calldata checkData,
        uint96 amount,
        uint8 source,
        address sender
    ) external;
}

contract Registrar {
    LinkTokenInterface public immutable i_link =
        LinkTokenInterface(0x326C977E6efc84E512bB9C30f76E30c160eD06FB);
    address public immutable registrar =
        0x9806cf6fBc89aBF286e8140C42174B94836e36F2;
    KeeperRegistryInterface public immutable i_registry =
        KeeperRegistryInterface(0x02777053d6764996e594c3E88AF1D58D5363a2e6);
    bytes4 registerSig = KeeperRegistrarInterface.register.selector;
    address public immutable upkeepContract;

    constructor(address _address) {
        upkeepContract = _address;
    }

    function registerAndPredictID(string memory name, bytes calldata checkData)
        public
    {
        (State memory state, Config memory _c, address[] memory _k) = i_registry
            .getState();
        uint256 oldNonce = state.nonce;
        bytes memory payload = abi.encode(
            name,
            bytes("siddharth.sarkar@lab49.com"),
            upkeepContract,
            2000000,
            0x75a562D72c3E31343E9C66B259aE72e346DEBc62,
            checkData,
            5000000000000000000,
            0,
            address(this)
        );

        i_link.transferAndCall(
            registrar,
            5000000000000000000,
            bytes.concat(registerSig, payload)
        );
        (state, _c, _k) = i_registry.getState();
        uint256 newNonce = state.nonce;
        if (newNonce == oldNonce + 1) {
            uint256(
                keccak256(
                    abi.encodePacked(
                        blockhash(block.number - 1),
                        address(i_registry),
                        uint32(oldNonce)
                    )
                )
            );
        } else {
            revert("auto-approve disabled");
        }
    }
}
