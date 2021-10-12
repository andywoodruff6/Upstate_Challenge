require("@nomiclabs/hardhat-waffle");
// no need to require ethers as waffle already does this.

const { task } = require("hardhat/config");
const ethers = require('ethers');


// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// task("tokenBalance", "Prints the balance of an account", async ())

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.8.4",
  // etherscan: {
  //   apiKey:
  // },
  local: {
    url: 'http://127.0.0.1:8545/'
  }
};
