import web3 from './web3';
import PatientWalletFactory from './build/PatientWalletFactory.json';

const instance = new web3.eth.Contract(
  JSON.parse(PatientWalletFactory.interface),
  '0x8f0eCEC74e686c8431F5Fa74412BBC7355BBdA72'
);

export default instance;
