const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Test route
app.get('/test', (req, res) => {
  res.json({ 
    success: true, 
    message: 'Backend is working!', 
    timestamp: new Date().toISOString() 
  });
});

// Routes
const newsRoutes = require('./routes/news');
const blockchainRoutes = require('./routes/blockchain');

app.use('/news', newsRoutes);
app.use('/blockchain', blockchainRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 BlockScope Server running on http://localhost:${PORT}`);
  console.log(`📡 Test endpoint: http://localhost:${PORT}/test`);
  console.log(`📰 News endpoint: http://localhost:${PORT}/news/global-news`);
});
