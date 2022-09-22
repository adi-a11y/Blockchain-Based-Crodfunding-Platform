pragma solidity ^0.4.26;

contract CrowdFund {
    
    struct Request{
        string description;
        uint value;
        address recipient;
        bool complete;
        uint  approvalsCount;
        mapping(address => bool) approvals;
    }
    
    string public campaignName;
    string public campaignDescription;
    address public manager;
    uint public minimumContribution;
    mapping(address => bool) public approvers;
    Request[] public requests;
    uint numRequests;
    uint public countOfApprovers;

    modifier restricted() {
        require(msg.sender == manager);
        _;
    }
    
    constructor(string name, string description ,uint minimum, address campaignOwner) public {
        campaignName = name;
        campaignDescription = description;
        manager = campaignOwner;
        minimumContribution = minimum;
    }

    function contribute() public payable {
        require( msg.value >= minimumContribution,"Minimun contribution is criteria is not met");

        if(!approvers[msg.sender]){
            countOfApprovers++;
        }
        
        approvers[msg.sender] = true;
    }

    function createRequest(string description, uint value, address recipient) public restricted {
        Request memory newRequest = Request({
           description: description,
           value: value,
           recipient: recipient,
           complete: false,
           approvalsCount: 0
        });

        requests.push(newRequest);
    }


    function approveRequests(uint index) public {
        Request storage request = requests[index];
        
        require(approvers[msg.sender],"You don't have the right to approve as you haven't contributed to this campaign!");
        require(!request.approvals[msg.sender],"You have already voted! Don't cheat!");

        request.approvals[msg.sender] = true;
        request.approvalsCount++;

    }

    function finializeRequest(uint index) public restricted {
        Request storage request = requests[index];
        require(!request.complete,"This request has already been finalized!");
        require(request.approvalsCount > (countOfApprovers/2),"Haven't recieved enough approvals from the investors!");

        request.recipient.transfer(request.value);
        
        request.complete = true;
    }

    function getAllDetails() public view returns (string,string,uint,uint,uint,uint,address) {
        return(
            campaignName,
            campaignDescription,
            minimumContribution,
            this.balance,
            requests.length,
            countOfApprovers,
            manager
        );
    }

    function getRequestsCount() public view returns (uint) {
        return requests.length;
    }

}

