const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const PatientWalletFactory = require('./build/PatientWalletFactory.json');

const provider = new HDWalletProvider(
  'social enough else what reform absurd claw gun large swing captain talent',
  'https://rinkeby.infura.io/v3/816b78c032c44192a0b32b96f23be476'
);
const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  console.log('Attempting to deploy from account', accounts[0]);

  const result = await new web3.eth.Contract(
    JSON.parse(PatientWalletFactory.interface)
  )
    .deploy({ data: PatientWalletFactory.bytecode })
    .send({ gas: '3000000', from: accounts[0] });

  console.log('Contract deployed to', result.options.address);
};
deploy();
