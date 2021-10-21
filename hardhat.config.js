require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-web3");

// no need to require ethers as waffle already does this.
const ROPSTEN_PRIVATE_KEY = '38cb085c21874c4af5794c6620591efcf966b6f6b7a62dec0a4bfa0b748c1052';
const ROPSTEN_INFURA_API_KEY = '1ae5438793134f909cf8ffec051bd3a3';

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
  networks: {
    local: {
      url: 'http://127.0.0.1:8545/'
    },
    ropsten: {
      url: `https://eth-ropsten.alchemyapi.io/v2/${ROPSTEN_INFURA_API_KEY}`,
      accounts: [`0x${ROPSTEN_PRIVATE_KEY}`],
    },
  }
};
