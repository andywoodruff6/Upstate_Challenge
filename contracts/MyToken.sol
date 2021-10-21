//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

/**
 *@title MyToken
 *@author Andy W
 *@notice A token with a time window for transferring
*/
import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MyToken is ERC20 {
    //Variables
    uint256 public startTime;
    uint256 public endTime;

    // EVENTS //
    ///@dev transfer and approval events are provided per OZ ERC20
    event contractTimeStarttoEnd(uint startTime, uint endTime);

    /**
     *@notice creates an ERC20 token called Credit with a symbol of CDT
     *@dev    All tests passing as of 10/12/21
     *@param  _startTime is a uint block number
     *@param  _endTime   is a uint block number
    */
    constructor(uint _startTime, uint _endTime) ERC20("Credit", "CDT") {
        _mint(msg.sender, 6000 * 10 **decimals());
        startTime = _startTime;
        endTime = _endTime;
        emit contractTimeStarttoEnd(_startTime, _endTime); // emits two block.number
    }

  /** 
   *@notice transfer function has been modified to limit transfers to a specific timeframe
   *@dev    start and end times are set in the constructor
   *@param  recipient the address of the person recieving the transfer
   *@param  amount the number of tokens to be transferred
   *@return same as standard transfer function bool
  */
    function transfer(address recipient, uint256 amount) public virtual override returns(bool) {
        //console.log('Trying to send %s tokens to %s from ', amount, recipient, msg.sender);
        require((block.number > startTime) && (block.number < endTime) , 'Can not trade');
            // console.log("blockNumber:", block.number);
        super.transfer(recipient, amount);
        return true;
    }
}