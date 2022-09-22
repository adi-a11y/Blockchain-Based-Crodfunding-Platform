pragma solidity ^0.4.26;

import "./CrowdFund.sol";

contract CampaignFactory {

    address[] public deployedCampaigns;

    function createCampaign(string name, string description ,uint minimum) public {
        address newCampaign = new CrowdFund(name,description,minimum,msg.sender);
        deployedCampaigns.push(newCampaign);
    }

    function getDeployedCampaigns() public view returns ( address[] ) {
        return deployedCampaigns;
    }

}