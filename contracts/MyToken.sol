//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

/**
@title MyToken
@author Andy W
@notice A token with a time window for transferring
*/
import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MyToken is ERC20 {
    //Variables
    uint256 public startTime;
    uint256 public endTime;

    constructor(uint _startTime, uint _endTime) ERC20("Credit", "CDT") {
        _mint(msg.sender, 6000 * 10 **decimals());
        startTime = _startTime;
        endTime = _endTime;
    }

  /// @dev modified to require transfer is occuring in a specific time window     
    function transfer(address recipient, uint256 amount) public virtual override returns(bool) {
        require((block.number > startTime) && (block.number < endTime) , 'Can not trade');
            console.log("blockNumber:", block.number);
        super.transfer(recipient, amount);
        return true;
    }

}