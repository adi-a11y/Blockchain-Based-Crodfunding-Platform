import web3 from './web3';
import CrowdFund from './build/contracts/CrowdFund.json';

const campaign = (address) => {
    return new web3.eth.Contract(
        CrowdFund.abi,
        address
    );
};

export default campaign;