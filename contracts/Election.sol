pragma solidity ^0.5.0;

contract Election {
    // Read/write candidate
        struct Candidate {
        uint id;
        string name;
        uint voteCount;
    }

    mapping(uint => Candidate) public candidates;
        // Store accounts that have voted
    mapping(address => bool) public voters;

    // Store Candidates Count
    uint public candidatesCount;

    function addCandidate (string memory _name) private {
        candidatesCount ++;
        candidates[candidatesCount] = Candidate(candidatesCount, _name, 0);
    }

        function vote (uint _candidateId) public {
        // require that they haven't voted before
        require(!voters[msg.sender],
            "You can only vote once");

        // require a valid candidate
        require(_candidateId > 0 && _candidateId <= candidatesCount,
            "You can only vote for a valid candidate");

        // record that voter has voted
        voters[msg.sender] = true;

        // update candidate vote Count
        candidates[_candidateId].voteCount ++;

            // trigger voted event
        emit votedEvent(_candidateId);
    }

    event votedEvent (
        uint indexed _candidateId
    );

    // Constructor
    constructor () public {
        addCandidate("Candidate 1");
        addCandidate("Candidate 2");
    }
}