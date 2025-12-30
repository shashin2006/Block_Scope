const { ethers } = require("hardhat");
const fs = require("fs");
const path = require("path");

async function main() {
  console.log("🚀 Deploying NewsRegistry contract...");
  
  // Get the contract factory
  const NewsRegistry = await ethers.getContractFactory("NewsRegistry");
  
  // Deploy the contract
  const contract = await NewsRegistry.deploy();
  
  // Wait for deployment to complete
  await contract.waitForDeployment();
  
  const contractAddress = await contract.getAddress();
  
  console.log("✅ NewsRegistry deployed to:", contractAddress);
  
  // Save contract address and ABI for backend use
  const deploymentInfo = {
    address: contractAddress,
    network: "localhost",
    chainId: 31337,
    deployedAt: new Date().toISOString()
  };
  
  // Create config directory if it doesn't exist
  const configDir = path.join(__dirname, "..", "config");
  if (!fs.existsSync(configDir)) {
    fs.mkdirSync(configDir, { recursive: true });
  }
  
  // Save deployment info
  fs.writeFileSync(
    path.join(configDir, "deployment.json"),
    JSON.stringify(deploymentInfo, null, 2)
  );
  
  // Copy ABI from artifacts
  const artifactPath = path.join(__dirname, "..", "artifacts", "contracts", "NewsRegistry.sol", "NewsRegistry.json");
  const abiPath = path.join(configDir, "NewsRegistry.json");
  
  if (fs.existsSync(artifactPath)) {
    const artifact = JSON.parse(fs.readFileSync(artifactPath, "utf8"));
    fs.writeFileSync(abiPath, JSON.stringify(artifact.abi, null, 2));
    console.log("✅ ABI saved to config/NewsRegistry.json");
  }
  
  console.log("📋 Deployment Summary:");
  console.log("   Contract Address:", contractAddress);
  console.log("   Network: Hardhat Local");
  console.log("   Chain ID: 31337");
  console.log("   RPC URL: http://127.0.0.1:8545");
  console.log("\n🦊 MetaMask Setup:");
  console.log("   Network Name: Hardhat Local");
  console.log("   RPC URL: http://127.0.0.1:8545");
  console.log("   Chain ID: 31337");
  console.log("   Currency Symbol: ETH");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("❌ Deployment failed:", error);
    process.exit(1);
  });