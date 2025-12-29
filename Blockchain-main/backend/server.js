const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const router = express.Router();
const app = express();
app.use(bodyParser.json());
app.use(cors());

// Import routes
const newsRoutes = require('./routes/news');
const blockchainRoutes = require('./routes/blockchain');

app.use('/news', newsRoutes);
app.use('/blockchain', blockchainRoutes);

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});


