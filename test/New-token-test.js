const { assert } = require("chai");
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
