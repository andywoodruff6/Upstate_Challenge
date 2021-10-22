//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
///@title  Contribution to earn Credits
///@author Andy W.
///@notice Code Challenge for Upstate Interactive
///@dev    sadf

import "./MyToken.sol";
import "hardhat/console.sol";

contract Contribution {
    
    // EVENTS //
    event Contribute (address user, uint256 amount);
    event Check (address user, uint256 totalAmount);

    ///@notice logs Contributions
    ///@dev    stores the address and the amount of ETH
    struct Ledger {
        address person; //address of the ETH donation
        uint256 amount; //amount  of the ETH donation
    }
    Ledger[] public ledger;

    // VARIABLES //
    uint256 public conversionRate; // Give 1000 Credits per 1 ETH
    uint256 public reward;
    mapping(address => uint) public balances;

    constructor(uint256 _conversionRate) {
        conversionRate = _conversionRate;
    }

    receive() payable external {
        MyToken token = MyToken(0x5FbDB2315678afecb367f032d93F642f64180aa3);
        reward = (msg.value * conversionRate);
        token.transfer(msg.sender, reward); //this sends tokens from the contract to the sender
        _storeContribution(msg.sender, msg.value);
        emit Contribute(msg.sender, msg.value);
    }

    function _storeContribution (address _person, uint256 _amount) internal {
        ledger.push(Ledger( _person, _amount ));
        balances[_person] += _amount;
    }

    function contributionCheck( address _user) external returns( uint amount ) {
        balances[_user] = amount;
        emit Check(_user, amount);
        return(amount);
    }
}
