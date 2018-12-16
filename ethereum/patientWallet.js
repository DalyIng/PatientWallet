import web3 from './web3';
import PatientWallet from './build/PatientWallet.json';

export default address => {
  return new web3.eth.Contract(
                        JSON.parse(PatientWallet.interface),
                        address
                              );
};
