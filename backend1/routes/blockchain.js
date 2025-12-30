const express = require('express');
const crypto = require('crypto');
const ethereumService = require('../services/ethereum');

const router = express.Router();

// Utility function to hash content
function hashContent(content) {
  return crypto.createHash('sha256').update(content).digest('hex');
}

// Test route to check blockchain connection
router.get('/info', async (req, res) => {
  try {
    if (!ethereumService.isReady()) {
      return res.status(503).json({
        success: false,
        message: "Ethereum service not ready. Please ensure Hardhat node is running and contract is deployed."
      });
    }

    const stats = await ethereumService.getContractStats();
    
    res.json({
      success: true,
      message: "Real Ethereum Blockchain Active",
      ...stats
    });
  } catch (error) {
    console.error('Blockchain info error:', error);
    res.status(500).json({
      success: false,
      message: "Failed to get blockchain info",
      error: error.message
    });
  }
});

// 🔐 Store news hash on REAL Ethereum blockchain
router.post('/store', async (req, res) => {
  try {
    const { content, source } = req.body;

    if (!content) {
      return res.status(400).json({
        success: false,
        message: "Content is required"
      });
    }

    if (!ethereumService.isReady()) {
      return res.status(503).json({
        success: false,
        message: "Ethereum service not ready. Please ensure Hardhat node is running."
      });
    }

    // Generate SHA256 hash of content
    const newsHash = hashContent(content);
    console.log('📝 Storing news hash:', newsHash);

    // Store on Ethereum blockchain
    const result = await ethereumService.storeNewsHash(newsHash, source || "Unknown");

    if (!result.success) {
      return res.status(409).json({
        success: false,
        message: result.error,
        code: result.code
      });
    }

    res.json({
      success: true,
      message: "News hash stored on Ethereum blockchain",
      hash: newsHash,
      txHash: result.txHash,
      blockNumber: result.blockNumber,
      gasUsed: result.gasUsed,
      network: "Hardhat Local Ethereum"
    });

  } catch (error) {
    console.error('Store hash error:', error);
    res.status(500).json({
      success: false,
      message: "Failed to store news hash on blockchain",
      error: error.message
    });
  }
});

// ✅ Verify news authenticity on REAL Ethereum blockchain
router.post('/verify', async (req, res) => {
  try {
    const { content } = req.body;

    if (!content) {
      return res.status(400).json({
        verified: false,
        message: "Content is required"
      });
    }

    if (!ethereumService.isReady()) {
      return res.status(503).json({
        verified: false,
        message: "Ethereum service not ready. Please ensure Hardhat node is running."
      });
    }

    // Generate SHA256 hash of content
    const newsHash = hashContent(content);
    console.log('🔍 Verifying news hash:', newsHash);

    // Verify on Ethereum blockchain
    const result = await ethereumService.verifyNewsHash(newsHash);

    res.json({
      verified: result.verified,
      hash: newsHash,
      message: result.verified
        ? "✅ News is VERIFIED on Ethereum blockchain"
        : "❌ News NOT FOUND on blockchain – possibly fake or unverified",
      newsData: result.newsData,
      network: "Hardhat Local Ethereum"
    });

  } catch (error) {
    console.error('Verify hash error:', error);
    res.status(500).json({
      verified: false,
      message: "Failed to verify news hash on blockchain",
      error: error.message
    });
  }
});

// 📊 Get blockchain statistics
router.get('/stats', async (req, res) => {
  try {
    if (!ethereumService.isReady()) {
      return res.status(503).json({
        success: false,
        message: "Ethereum service not ready"
      });
    }

    const stats = await ethereumService.getContractStats();
    
    res.json({
      success: true,
      ...stats
    });

  } catch (error) {
    console.error('Stats error:', error);
    res.status(500).json({
      success: false,
      message: "Failed to get blockchain statistics",
      error: error.message
    });
  }
});

// 🔗 Get contract deployment info
router.get('/deployment', (req, res) => {
  try {
    const fs = require('fs');
    const path = require('path');
    
    const deploymentPath = path.join(__dirname, '..', 'config', 'deployment.json');
    
    if (!fs.existsSync(deploymentPath)) {
      return res.status(404).json({
        success: false,
        message: "Contract not deployed. Run 'npm run deploy' first."
      });
    }

    const deployment = JSON.parse(fs.readFileSync(deploymentPath, 'utf8'));
    
    res.json({
      success: true,
      ...deployment,
      rpcUrl: "http://127.0.0.1:8545",
      metamaskConfig: {
        networkName: "Hardhat Local",
        rpcUrl: "http://127.0.0.1:8545",
        chainId: "31337",
        currencySymbol: "ETH"
      }
    });

  } catch (error) {
    console.error('Deployment info error:', error);
    res.status(500).json({
      success: false,
      message: "Failed to get deployment info",
      error: error.message
    });
  }
});

module.exports = router;