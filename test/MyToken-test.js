const { expect } = require("chai");
const { ethers } = require("hardhat");


describe('MyToken contract', function () {
    it("Deployment should assign the total supply to the owner", async function() {
        const [owner] = await ethers.getSigners();
        const Token = await ethers.getContractFactory('MyToken');
        const hhToken = await Token.deploy();
        const ownerBalance = await hhToken.balanceOf(owner.address);
        expect(await hhToken.totalSupply()).to.equal(ownerBalance);
    })
});

 // let token
 // beforeEach( async () => {
 //     token = await Token.new()
 // }) // by calling async await here, we do not need to write these two lines for every "it" test
 // describe('deployment', () => {
 //     it('assigns the total supply to the depoloyer', async () => {
 //         const result = await token.balanceOf(deployer)
 //         result.toString().should.equal(totalSupply.toString())
 //     }) 
 // })