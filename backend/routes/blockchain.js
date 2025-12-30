const express = require('express');
const crypto = require("crypto");
const router = express.Router();

const blockchain = require('../blockchain/blockchain');

// Utility: Hash content
function hashContent(content) {
  return crypto.createHash("sha256").update(content).digest("hex");
}

// Test route
router.get('/info', (req, res) => {
  res.json({
    message: "BlockScope Blockchain Active",
    blocks: blockchain.getChain().length
  });
});

// 🔐 Store news hash on blockchain
router.post('/store', (req, res) => {
  const { content } = req.body;

  if (!content) {
    return res.status(400).json({ success: false, message: "Content required" });
  }

  const newsHash = hashContent(content);
  const block = blockchain.addNewsHash(newsHash);

  res.json({
    success: true,
    message: "News hash stored on blockchain",
    block
  });
});

// ✅ Verify news authenticity
router.post('/verify', (req, res) => {
  const { content } = req.body;

  if (!content) {
    return res.status(400).json({ verified: false, message: "Content required" });
  }

  const newsHash = hashContent(content);
  const isVerified = blockchain.verifyNewsHash(newsHash);

  res.json({
    verified: isVerified,
    message: isVerified
      ? "News is VERIFIED on blockchain"
      : "News NOT FOUND – possibly fake"
  });
});

// 📦 View full blockchain (for demo)
router.get('/chain', (req, res) => {
  res.json(blockchain.getChain());
});

module.exports = router;
