
const CrowdFund = artifacts.require('CrowdFund');
const CampaignFactory = artifacts.require('CampaignFactory');


contract('Crowdfunding-platform', (accounts) => {

    let campaignFactory;
    let crowdFund;

    beforeEach(async () => {
        campaignFactory = await CampaignFactory.deployed();
        // console.log("CampaignFactory contract deployed at : ", campaignFactory.address);
        await campaignFactory.createCampaign('ABC', 'DEF', 10);
        const campaignAddresses = await campaignFactory.getDeployedCampaigns();
        crowdFund = await CrowdFund.at(campaignAddresses[0]);
        // console.log("CrowdFund contract deployed at : ", campaignAddresses[0]);
    });

    it('Must create a new factory and a campaign', async () => {
        assert.ok(campaignFactory.address);
        const campaignAddresses = await campaignFactory.getDeployedCampaigns();
        assert.equal(crowdFund.address, campaignAddresses[0]);
    });

    it('Marks the caller as the campaign manager', async () => {
        const manager = await crowdFund.manager();
        assert.equal(accounts[0],manager);
    });

    it('Allows people to contribute money and marks them as approvers', async () => {
     
        await crowdFund.contribute({from: accounts[1], value: 12});
        const isApprover = await crowdFund.approvers(accounts[1]);
        assert.equal(true,isApprover);
    });

    it('Requires a minimun contribution', async() => {
        try{
            await crowdFund.contribute({from: accounts[1], value: 9});
        } catch (error) {
            assert(error);
        }
    });

    it('Allows a manager to make create a request', async() => {
        await crowdFund.createRequest('Battries','100',accounts[5],{from: accounts[0]});
        const request = await crowdFund.requests(0);

        assert.equal('Battries',request.description);
    });

    it('End-to-End test: Contribute, Create request, approve request and finalize request', async() => {
        await crowdFund.contribute({from: accounts[1], value: 10000000000000000000});
        await crowdFund.contribute({from: accounts[2], value: 10000000000000000000});
        await crowdFund.contribute({from: accounts[3], value: 10000000000000000000});
    
        await crowdFund.createRequest('Hire emp','10000000000000000000',accounts[7],{from: accounts[0]});

        await crowdFund.approveRequests(0,{from: accounts[1]});
        await crowdFund.approveRequests(0,{from: accounts[2]});

        await crowdFund.finializeRequest(0,{from: accounts[0]});
        
        const request = await crowdFund.requests(0);
        assert.equal(true,request.complete);
    });



});
















