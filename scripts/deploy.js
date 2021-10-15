const hre = require("hardhat");
const startTime  = 1;
const endTime    = 13404500;
const rate = 1000;

async function main() {
  const Token = await hre.ethers.getContractFactory("MyToken");
  const token = await Token.deploy(startTime, endTime);

  await token.deployed();

  console.log("MyToken deployed to:", token.address);

  const Contribute = await hre.ethers.getContractFactory("Contribution");
  const tribute = await Contribute.deploy(rate);

  await tribute.deployed();

  console.log("Contribution contract deployed to:", tribute.address);



}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });