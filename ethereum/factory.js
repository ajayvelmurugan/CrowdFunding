import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json';

const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  '0x9Ca3Bf71b16E590cB2A1367C06034E7BE3Ba30CE'
);

export default instance;
