const tokenError = 'VM Exception while processing transaction: reverted with reason string \'Can not trade\'';
const { assert, expect } = require("chai");
const name       = "Credit";
const symbol     = 'CDT';
const rate       = 10000;
let Token;
let token;
let owner;
let addr1;
let addr2;
let addrs;
let startTime
let endTime

describe('Limiting transactions to a certain window', () => {
    //Setup
    startTime = 2;
    endTime   = 4;
    before( async () => {
        Token = await ethers.getContractFactory('MyToken');
        [owner, addr1, addr2, ...addrs] = await ethers.getSigners();
        token = await Token.deploy(startTime, endTime);
    });
    
    it('prevents tx before start', async () => {
        await expect(token.transfer(addr1.address, 1000000)).to.be.revertedWith(tokenError);
    });
    it('allows tx during window', async () => {
            await token.transfer(addr1.address, 1000000)
            const expected = '1000000';
            const result   = await token.balanceOf(addr1.address);
            assert.equal(expected, result);
    });
    
    it('prevents tx after end', async () => {
            await expect(token.transfer(addr1.address, 1000000)).to.be.revertedWith(tokenError);
    });
});

describe('Token Contract', () => {

    before( async () => {
        startTime = 1;
        endTime   = 100;

        Token = await ethers.getContractFactory('MyToken');
        [owner, addr1, addr2, ...addrs] = await ethers.getSigners();

        token = await Token.deploy(startTime, endTime);
    });

    describe('Deployment', () => {
        it('assigns TotalSupply to the owner', async () => {
            // setup
            const ownerBalance = await token.balanceOf(owner.address).toString();
            const totSupply = await token.totalSupply().toString();
            // exercise
            assert.equal(ownerBalance, totSupply);
            // verify 
        });
        it('tracks the name', async () => {
            const expected = name;
            const result = await token.name();

            assert.equal(expected, result);
        });
        it('tracks the symbol', async () => {
            const expected = symbol;
            const result = await token.symbol();

            assert.equal(expected, result);
        });
    });
    describe('Check events', () => {

        it('checks if transfer emits an event', async () => {
            await expect(token.transfer(addr1.address, 1000000))
            .to.emit(token, "Transfer")
            .withArgs(owner.address, addr1.address, 1000000);
        });
        
    });
});

describe('Contribution Contract', () => {
    before( async () => {
        startTime = 1;
        endTime   = 100;

        Token = await ethers.getContractFactory('MyToken');
        SmartContract = await ethers.getContractFactory('Contribution');
        [owner, addr1, addr2, ...addrs] = await ethers.getSigners();

        token = await Token.deploy(startTime, endTime);
        contract = await SmartContract.deploy(rate);
    });
    describe('smart contract deployment', () => {

        // send tokens to contract - block 12
        it('recieves tokens from owner', async () => {
            // setup
            const amount = 5000000000000; //5*10^12
            const expected = amount;
            // exercise
            await token.transfer(contract.address, amount)
            // verify -- result has to go after the transfer
            const result = await token.balanceOf(contract.address);
            assert.equal(expected, result);
        });

        it('contribute function works', async () => {
            // setup
            const amount = 2000
            const expected = (amount * rate);
            await token.approve()
            // exercise
            await addr2.sendTransaction({to: contract.address, value: amount})
            const result = await token.balanceOf(addr2.address);
            // verify
            assert.equal(expected, result);
        });
    });
});
