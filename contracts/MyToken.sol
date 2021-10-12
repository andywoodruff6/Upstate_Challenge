//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

// tokens can only be transferred after _startTime but before _endTime - provided in constructor


contract MyToken is ERC20 {
    constructor(uint256 _totalSupply, uint _startTime, uint _endTime) ERC20("Credit", "CDT") {
        _mint(msg.sender, _totalSupply);
        require( block.number > _startTime && block.number < _endTime);
    }
}