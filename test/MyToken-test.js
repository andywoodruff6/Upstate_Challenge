const { expect } = require("chai");
const startTime = 3;
const endTime   = 12;

describe("Token contract", function () {

  let Token;
  let hardhatToken;
  let owner;
  let addr1;
  let addr2;
  let addrs;

  // `beforeEach` will run before each test, re-deploying the contract every time.
  beforeEach(async function () {

    Token = await ethers.getContractFactory("MyToken");
    [owner, addr1, addr2, ...addrs] = await ethers.getSigners();

    hardhatToken = await Token.deploy(startTime, endTime);
  });

  describe("Deployment", function () {
    // it("Should set the right owner", async function () {
    //   expect(await hardhatToken.owner()).to.equal(owner.address);
    // });

    it("Should assign the total supply of tokens to the owner", async function () {
      const ownerBalance = await hardhatToken.balanceOf(owner.address);
      expect(await hardhatToken.totalSupply()).to.equal(ownerBalance);
    });
  });

  describe("Transactions", function () {
    // This is being called before the startTime so it should fail and 
    // return "Can not trade". The test will pass if so. 
    it("Should fail when block before startTime", async function () {
        await expect(hardhatToken.transfer(addr1.address, 50))
            .to.be.revertedWith("Can not trade");
    });

    // This is being called in Block 5 and passes
    it("Should transfer tokens between accounts", async function () {
        // Transfer 50 tokens from owner to addr1
        await hardhatToken.transfer(addr1.address, 50);
        const addr1Balance = await hardhatToken.balanceOf(addr1.address);
        expect(addr1Balance).to.equal(50);
  
        // Transfer 50 tokens from addr1 to addr2
        // Use .connect(signer) to send a transaction from another account
        await hardhatToken.connect(addr1).transfer(addr2.address, 50);
        const addr2Balance = await hardhatToken.balanceOf(addr2.address);
        expect(addr2Balance).to.equal(50);
    });

    it("Should fail if sender doesn’t have enough tokens", async function () {
        const initialOwnerBalance = await hardhatToken.balanceOf(owner.address);
  
        await expect(
          hardhatToken.connect(addr1).transfer(owner.address, 1))
          .to.be.revertedWith("ERC20: transfer amount exceeds balance");
  
        // Owner balance shouldn't have changed.
        expect(await hardhatToken.balanceOf(owner.address)).to.equal(initialOwnerBalance);
    });

    it("Should transfer tokens between accounts", async function () {
      // Transfer 50 tokens from owner to addr1
      await hardhatToken.transfer(addr1.address, 50);
      const addr1Balance = await hardhatToken.balanceOf(addr1.address);
      expect(addr1Balance).to.equal(50);

      // Transfer 50 tokens from addr1 to addr2
      // Use .connect(signer) to send a transaction from another account
      await hardhatToken.connect(addr1).transfer(addr2.address, 50);
      const addr2Balance = await hardhatToken.balanceOf(addr2.address);
      expect(addr2Balance).to.equal(50);
    });

    // This is being called after block 12 and will fail and return
    // "Can not trade". The test will pass if so. 
    it("Should fail when block after endTime", async function () {
        await expect(hardhatToken.transfer(addr1.address, 50))
            .to.be.revertedWith("Can not trade");
    });

  });
});
