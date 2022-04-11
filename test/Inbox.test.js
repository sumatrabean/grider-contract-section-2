// contract test code will go here
const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());
const { interface, bytecode} = require('../compile');

let accounts;
let inbox;

beforeEach(async () => {
    accounts = await web3.eth.getAccounts();

    inbox = await new web3.eth.Contract(JSON.parse(interface)) // tells what method Inbox contract has...the code was compiled in comepile.js
        .deploy({ data: bytecode, arguments: ['Hi there!']}) // deploy copy of a contract
        .send({ from: accounts[0], gas: '1000000'}); // web3 sent out transaction to create contract 
})

describe('Inbox', () => {

    it('deploys a contract', () => {
        // address where the contract was deployed to
        assert.ok(inbox.options.address)
    })

    it('has a default message', async () => {
        const message = await inbox.methods.message().call();
        assert.equal(message, 'Hi there!')
    })

    it('can change the message', async () => {
        await inbox.methods.setMessage('bye').send({ from: accounts[0]}) // send the transaction 
        const message = await inbox.methods.message().call();
        assert.equal(message, 'bye');


    })
})