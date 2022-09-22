import web3 from './web3';
import CampaignFactory from './build/contracts/CampaignFactory.json';

const instance = new web3.eth.Contract(
    CampaignFactory.abi,
    '0x8866ecE336294e5584a80AABbEc5BEFEf5303C37'
);

export default instance;