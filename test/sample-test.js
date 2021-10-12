const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Greeter", function () {
  it("Should return the new greeting once it's changed", async function () {
    const Greeter = await ethers.getContractFactory("Greeter");
    // an abstraction used to deploy new smart contracts. The string is the contract
    const greeter = await Greeter.deploy("Hello, world!");
    // We take the factory and call deploy. The string is what we pass the constructor
    await greeter.deployed();

    expect(await greeter.greet()).to.equal("Hello, world!");
    // now the contract is deployed we can call functions from our contract

    const setGreetingTx = await greeter.setGreeting("Hola, mundo!");

    // wait until the transaction is mined
    await setGreetingTx.wait();

    expect(await greeter.greet()).to.equal("Hola, mundo!");
  });
});
/**
 * If you need to send a tx form an account other than default
 * const [owner, addr1] = await ethers.getSigners();
 * 
 */