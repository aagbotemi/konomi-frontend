//SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "hardhat/console.sol";

contract SafeMath {
    function safeAdd(uint a, uint b) public pure returns (uint c) {
        c = a + b;
        require(c >= a);
    }

    function safeSub(uint a, uint b) public pure returns (uint c) {
        require(b <= a);
        c = a - b;
    }

    function safeMul(uint a, uint b) public pure returns (uint c) {
        c = a * b;
        require(a == 0 || c / a == b);
    }

    function safeDiv(uint a, uint b) public pure returns (uint c) {
        require(b > 0);
        c = a / b;
    }
}

abstract contract ERC20Token {
    function name() virtual public view returns (string memory);
    function symbol() virtual public view returns (string memory);
    function transfer(address _to, uint256 _value) virtual public returns (bool success);
    
    event Transfer(address indexed _from, address indexed _to, uint256 _value);
    event Approval(address indexed _owner, address indexed _spender, uint256 _value);
}

contract KonomiToken is ERC20Token, SafeMath {
    string public _symbol;
    string public _name;
    uint public _totalSupply;

    mapping(address => uint) balances;

    struct Transactions {
        address to; // The address you sent money to.
        uint256 value; // The amount the owner sent.
        uint256 timestamp; // The timestamp when the user waved.
    }

    Transactions[] transactions;

    constructor () {
        _symbol = "KNT";
        _name = "Konomi Network Token";
        _totalSupply = 1000000;

        balances[msg.sender] = _totalSupply;
    }

    function name() public override view returns (string memory) {
        return _name;
    }

    function symbol() public override view returns (string memory) {
        return _symbol;
    }

    function transfer(address _to, uint256 _value) public override returns (bool success) {
        require(balances[msg.sender] >= _value, 'Not enough tokens');
        
        balances[msg.sender] = safeSub(balances[msg.sender], _value); // balances[_from] = balances[_from] - _value
        balances[_to] = safeAdd(balances[_to], _value);
        emit Transfer(msg.sender, _to, _value);
        return true;
    }
}
