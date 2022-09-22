var CrowdFund = artifacts.require("CrowdFund");

module.exports = async function (deployer, network, accounts) {
    deployer.deploy(CrowdFund, 'ABC', 'DEF', 10, accounts[0]);
}