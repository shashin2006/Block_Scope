const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const ethereumService = require('./services/ethereum');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Initialize Ethereum service on startup
let isEthereumReady = false;

async function initializeEthereum() {
  console.log('🚀 Starting Ethereum Blockchain Backend...');
  console.log('📋 Make sure you have:');
  console.log('   1. Hardhat node running: npm run node');
  console.log('   2. Contract deployed: npm run deploy');
  console.log('');
  
  isEthereumReady = await ethereumService.initialize();
  
  if (isEthereumReady) {
    console.log('✅ Ethereum service initialized successfully');
  } else {
    console.log('❌ Ethereum service failed to initialize');
    console.log('🔧 Troubleshooting:');
    console.log('   1. Start Hardhat node: npm run node');
    console.log('   2. Deploy contract: npm run deploy');
    console.log('   3. Restart this server: npm start');
  }
}

// Test route
app.get('/test', (req, res) => {
  res.json({
    success: true,
    message: 'Real Ethereum Blockchain Backend is running!',
    ethereumReady: isEthereumReady,
    timestamp: new Date().toISOString()
  });
});

// Health check
app.get('/health', async (req, res) => {
  try {
    let ethereumStatus = 'disconnected';
    let stats = null;
    
    if (isEthereumReady) {
      try {
        stats = await ethereumService.getContractStats();
        ethereumStatus = 'connected';
      } catch (error) {
        ethereumStatus = 'error';
      }
    }
    
    res.json({
      success: true,
      status: 'healthy',
      ethereum: ethereumStatus,
      stats,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      status: 'unhealthy',
      error: error.message
    });
  }
});

// Routes
const blockchainRoutes = require('./routes/blockchain');
const newsRoutes = require('./routes/news');

app.use('/blockchain', blockchainRoutes);
app.use('/news', newsRoutes);

// Error handling middleware
app.use((error, req, res, next) => {
  console.error('Server error:', error);
  res.status(500).json({
    success: false,
    message: 'Internal server error',
    error: error.message
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Endpoint not found',
    availableEndpoints: [
      'GET /test',
      'GET /health',
      'GET /blockchain/info',
      'POST /blockchain/store',
      'POST /blockchain/verify',
      'GET /blockchain/stats',
      'GET /blockchain/deployment',
      'GET /news/global-news',
      'GET /news/country-news',
      'GET /news/country-category-news'
    ]
  });
});

const PORT = process.env.PORT || 3002;

app.listen(PORT, async () => {
  console.log('');
  console.log('🌟 ================================');
  console.log('🚀 REAL ETHEREUM BLOCKCHAIN BACKEND');
  console.log('🌟 ================================');
  console.log(`📡 Server running on http://localhost:${PORT}`);
  console.log(`🧪 Test endpoint: http://localhost:${PORT}/test`);
  console.log(`🔗 Blockchain info: http://localhost:${PORT}/blockchain/info`);
  console.log('');
  
  // Initialize Ethereum connection
  await initializeEthereum();
  
  console.log('');
  console.log('🦊 MetaMask Setup:');
  console.log('   Network Name: Hardhat Local');
  console.log('   RPC URL: http://127.0.0.1:8545');
  console.log('   Chain ID: 31337');
  console.log('   Currency Symbol: ETH');
  console.log('');
  console.log('📚 API Endpoints:');
  console.log('   POST /blockchain/store   - Store news hash');
  console.log('   POST /blockchain/verify  - Verify news hash');
  console.log('   GET  /blockchain/stats   - Get statistics');
  console.log('   GET  /blockchain/info    - Get blockchain info');
  console.log('   GET  /news/global-news   - Get global news');
  console.log('   GET  /news/country-news  - Get country news');
  console.log('   GET  /news/country-category-news - Get category news');
  console.log('');
});