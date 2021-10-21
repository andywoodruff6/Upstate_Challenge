const tokenError = 'VM Exception while processing transaction: reverted with reason string \'Can not trade\'';
const { assert, expect } = require("chai");
let startTime    = 1;
let endTime      = 100;
const name       = "Credit";
const symbol     = 'CDT';

describe('Token Contract', () => {

    let Token;
    let token;
    let owner;
    let addr1;
    let addr2;
    let addrs;

    describe('Limiting transactions to a certain window',  () => {
        //Setup
        startTime = 4;
        endTime   = 7;

        beforeEach( async () => {
            Token = await ethers.getContractFactory('MyToken');
            [owner, addr1, addr2, ...addrs] = await ethers.getSigners();
            token = await Token.deploy(startTime, endTime);
        });

        describe('window testing', () => {

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
    });

    beforeEach( async () => {
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

})
