// deploy code will go here
const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');
const {interface, bytecode} = require('./compile');

const provider = new HDWalletProvider(
    'ship apology layer minute spatial rain convince chunk chef trick common field',
    'https://rinkeby.infura.io/v3/d45080cb7a824dee82b2a15435d751ce'
    );

const web3 = new Web3(provider);

const deploy = async () => {
    const accounts = await web3.eth.getAccounts();
    console.log('attempting to deploy from account, ', accounts[0]);
    const result = await new web3.eth.Contract(JSON.parse(interface))
        .deploy({ data: bytecode, arguments: ['Hi there!']})
        .send({ gas: '1000000', from: accounts[0]})
    
    console.log('Contract deployed to', result.options.address)
    provider.engine.stop()


};
deploy();