//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

/**
@title MyToken
@author Andy W
@notice A token with a time window for transferring
*/
import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

// tokens can only be transferred after _startTime but before _endTime - provided in constructor


contract MyToken is ERC20 {
    constructor() ERC20("Credit", "CDT") {
        _mint(msg.sender, 6000000 * 10 **decimals());
    }
}