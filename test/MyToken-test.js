const { expect } = require("chai");
const hre, { ethers } = require("hardhat");


describe('MyToken', () => {
    let MyToken;

    beforeEach(async function () {
        const contractName = 'MyToken';
        await hre.run("compile");

    })
});