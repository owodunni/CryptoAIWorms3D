pragma solidity ^0.5.0;
//pragma experimental ABIEncoderV2;

import "../node_modules/@openzeppelin/contracts/ownership/Ownable.sol";

contract WormFactory is Ownable {

    event NewWorm(uint id, string name, uint data);

    uint dnaDigits = 16;
    uint dnaModulus = 10 ** dnaDigits;
    uint public wormCount = 0;

    struct Worm {
      uint id;
      string name;
      uint dna;
    }

    mapping(uint => Worm) public worms;
    mapping (uint => address) public wormToOwner;
    mapping (address => uint) ownerWormCount;

    function _createWorm(string memory _name, uint _dna) internal {
        uint id = wormCount;
        worms[id] = Worm(id, _name, _dna);
        wormToOwner[id] = msg.sender;
        ownerWormCount[msg.sender]++;
        wormCount++;
        emit NewWorm(worms[id].id, worms[id].name, worms[id].dna);
    }

    function _generateRandomDna(string memory _str) private view returns (uint) {
        uint rand = uint(keccak256(abi.encodePacked(_str)));
        return rand % dnaModulus;
    }

    function createRandomWorm(string memory _name) public {
        require(ownerWormCount[msg.sender] == 0, "Only one worm per owner");
        uint randDna = _generateRandomDna(_name);
        _createWorm(_name, randDna);
    }
}
