const { ethers } = require("ethers");
const fs = require("fs");
const path = require("path");

class EthereumService {
  constructor() {
    this.provider = null;
    this.signer = null;
    this.contract = null;
    this.isInitialized = false;
  }

  async initialize() {
    try {
      console.log("🔗 Initializing Ethereum connection...");
      
      // Connect to local Hardhat network
      this.provider = new ethers.JsonRpcProvider("https://eth-sepolia.g.alchemy.com/v2/JZ22kX7dllRniV4Fj5gZg");
      
      // Test connection
      const network = await this.provider.getNetwork();
      console.log("✅ Connected to network:", network.name, "Chain ID:", network.chainId.toString());
      
      // Load deployment info
      const deploymentPath = path.join(__dirname, "..", "config", "deployment.json");
      if (!fs.existsSync(deploymentPath)) {
        throw new Error("Deployment info not found. Please deploy the contract first.");
      }
      
      const deployment = JSON.parse(fs.readFileSync(deploymentPath, "utf8"));
      
      // Load contract ABI
      const abiPath = path.join(__dirname, "..", "config", "NewsRegistry.json");
      if (!fs.existsSync(abiPath)) {
        throw new Error("Contract ABI not found. Please deploy the contract first.");
      }
      
      const abi = JSON.parse(fs.readFileSync(abiPath, "utf8"));
      
      // Get accounts from Hardhat
      const accounts = await this.provider.listAccounts();
      if (accounts.length === 0) {
        throw new Error("No accounts available. Make sure Hardhat node is running.");
      }
      
      // Use first account as signer
      this.signer = await this.provider.getSigner(0);
      console.log("✅ Using account:", await this.signer.getAddress());
      
      // Initialize contract
      this.contract = new ethers.Contract(deployment.address, abi, this.signer);
      
      // Test contract connection
      const stats = await this.contract.getStats();
      console.log("✅ Contract connected. Total news stored:", stats.toString());
      
      this.isInitialized = true;
      return true;
      
    } catch (error) {
      console.error("❌ Ethereum initialization failed:", error.message);
      return false;
    }
  }

  async storeNewsHash(hash, source = "") {
    if (!this.isInitialized) {
      throw new Error("Ethereum service not initialized");
    }

    try {
      console.log("📝 Storing news hash on blockchain...");
      
      // Convert string hash to bytes32 if needed
      const hashBytes32 = typeof hash === 'string' && hash.startsWith('0x') 
        ? hash 
        : ethers.id(hash);
      
      // Call smart contract
      const tx = await this.contract.storeHash(hashBytes32, source);
      console.log("⏳ Transaction sent:", tx.hash);
      
      // Wait for confirmation
      const receipt = await tx.wait();
      console.log("✅ Transaction confirmed in block:", receipt.blockNumber);
      
      return {
        success: true,
        txHash: tx.hash,
        blockNumber: receipt.blockNumber,
        gasUsed: receipt.gasUsed.toString()
      };
      
    } catch (error) {
      console.error("❌ Store hash failed:", error.message);
      
      if (error.message.includes("Hash already exists")) {
        return {
          success: false,
          error: "News hash already exists on blockchain",
          code: "DUPLICATE_HASH"
        };
      }
      
      throw error;
    }
  }

  async verifyNewsHash(hash) {
    if (!this.isInitialized) {
      throw new Error("Ethereum service not initialized");
    }

    try {
      console.log("🔍 Verifying news hash on blockchain...");
      
      // Convert string hash to bytes32 if needed
      const hashBytes32 = typeof hash === 'string' && hash.startsWith('0x') 
        ? hash 
        : ethers.id(hash);
      
      // Call smart contract with event logging
      const verified = await this.contract.verifyHashWithEvent(hashBytes32);
      
      let newsData = null;
      if (verified) {
        try {
          newsData = await this.contract.getNewsData(hashBytes32);
        } catch (error) {
          console.log("Could not fetch news data:", error.message);
        }
      }
      
      console.log("✅ Verification result:", verified);
      
      return {
        verified,
        newsData: newsData ? {
          hash: newsData.hash,
          storedBy: newsData.storedBy,
          timestamp: new Date(Number(newsData.timestamp) * 1000).toISOString(),
          source: newsData.source
        } : null
      };
      
    } catch (error) {
      console.error("❌ Verify hash failed:", error.message);
      throw error;
    }
  }

  async getContractStats() {
    if (!this.isInitialized) {
      throw new Error("Ethereum service not initialized");
    }

    try {
      const totalStored = await this.contract.getStats();
      const contractAddress = await this.contract.getAddress();
      const signerAddress = await this.signer.getAddress();
      const balance = await this.provider.getBalance(signerAddress);
      
      return {
        contractAddress,
        totalNewsStored: totalStored.toString(),
        signerAddress,
        balance: ethers.formatEther(balance) + " ETH",
        network: "Hardhat Local (Chain ID: 31337)"
      };
    } catch (error) {
      console.error("❌ Get stats failed:", error.message);
      throw error;
    }
  }

  isReady() {
    return this.isInitialized;
  }
}

// Export singleton instance
const ethereumService = new EthereumService();
module.exports = ethereumService;