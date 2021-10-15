const { expect } = require("chai")
const rate = 1000;
const tokenAddr = 0x5FbDB2315678afecb367f032d93F642f64180aa3;
const startTime = 1;
const endTime   = 12000;

describe("Contribution contract", () => {

    let Contribution;
    let hhContribute;
    let hhToken;
    let owner;
    let addr1;
    let addr2;
    let addrs;

    beforeEach(async () => {
        Token = await ethers.getContractFactory("MyToken");
        Contribution = await ethers.getContractFactory("Contribution");
        
        hhToken = await Token.deploy(startTime, endTime);
        hhContribute = await Contribution.deploy(rate);

        [owner, addr1, addr2, ...addrs] = await ethers.getSigners();
    });

    describe("Deployment", () => {

        it("Should assign the total supply of tokens to the owner", async () => {
            const ownerBalance = await hhToken.balanceOf(owner.address);
            expect(await hhToken.totalSupply()).to.equal(ownerBalance);
        });

        // it("something", async function () {
        //     const result = await hhContribute.conversionRate();
        //     result.should.equal(conversionRate);
        // });
    });

    describe("Transactions", () => {

        beforeEach( async () => {
            amount = 100 * (10 ** 18);
            result = await hhToken.transfer(addr1.address, amount );
        })

        it('transfers token balances', async () =>{
            let balanceOf  

            // Checking balance after transfer
            balanceOf = await hhtoken.balanceOf(addr1.address)
            balanceOf.toString().should.equal((5900*(10**18)).toString())

            balanceOf = await token.balanceOf(receiver)
            balanceOf.toString().should.equal(amount.toString())
        })
    })

});