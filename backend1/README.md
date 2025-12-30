# 🔗 Real Ethereum Blockchain Backend

This backend uses **REAL Ethereum blockchain** technology with Hardhat local network, Solidity smart contracts, and ethers.js.

## 🚀 Quick Start

### 1. Install Dependencies
```bash
cd backend1
npm install
```

### 2. Start Hardhat Local Ethereum Network
```bash
npm run node
```
This will:
- Start local Ethereum network on `http://127.0.0.1:8545`
- Create 20 accounts with 10,000 ETH each (fake ETH for testing)
- Show account addresses and private keys

### 3. Deploy Smart Contract
```bash
npm run deploy
```
This will:
- Compile the Solidity smart contract
- Deploy to local Ethereum network
- Save contract address and ABI

### 4. Start Backend Server
```bash
npm start
```
Server runs on `http://localhost:3001`

## 🦊 MetaMask Setup

1. Install MetaMask browser extension
2. Add custom network:
   - **Network Name**: Hardhat Local
   - **RPC URL**: http://127.0.0.1:8545
   - **Chain ID**: 31337
   - **Currency Symbol**: ETH

3. Import account using private key from Hardhat node output

## 📡 API Endpoints

### Store News Hash
```bash
POST /blockchain/store
Content-Type: application/json

{
  "content": "Breaking news content here",
  "source": "News Source Name"
}
```

### Verify News Hash
```bash
POST /blockchain/verify
Content-Type: application/json

{
  "content": "Breaking news content here"
}
```

### Get Blockchain Info
```bash
GET /blockchain/info
```

### Get Statistics
```bash
GET /blockchain/stats
```

## 🧱 Architecture

```
Frontend (React)
    ↓
Node.js/Express Backend (this)
    ↓
ethers.js
    ↓
Smart Contract (Solidity)
    ↓
Hardhat Local Ethereum Network
```

## ✅ Features

- **Real Ethereum**: Uses actual Ethereum technology
- **Smart Contracts**: Written in Solidity
- **Immutable**: Data stored on blockchain cannot be changed
- **Verifiable**: Anyone can verify news authenticity
- **Event Logging**: All transactions logged with events
- **MetaMask Compatible**: Works with MetaMask wallet
- **Zero Cost**: Uses local network (no real ETH required)

## 🔧 Development Commands

```bash
npm run node      # Start Hardhat local network
npm run compile   # Compile smart contracts
npm run deploy    # Deploy contracts to local network
npm start         # Start backend server
npm run dev       # Start with nodemon (auto-restart)
```

## 📁 Project Structure

```
backend1/
├── contracts/          # Solidity smart contracts
├── scripts/           # Deployment scripts
├── services/          # Ethereum service layer
├── routes/            # Express routes
├── config/            # Contract addresses and ABIs
├── artifacts/         # Compiled contracts
└── cache/             # Hardhat cache
```

## 🐛 Troubleshooting

### "Ethereum service not ready"
1. Make sure Hardhat node is running: `npm run node`
2. Deploy the contract: `npm run deploy`
3. Restart the backend: `npm start`

### "Contract not found"
1. Check if contract is deployed: `npm run deploy`
2. Verify config/deployment.json exists

### MetaMask connection issues
1. Make sure network settings are correct
2. Try resetting MetaMask account
3. Check if Hardhat node is running

## 🎯 Why This Approach?

- **Authentic**: Real Ethereum blockchain technology
- **Judge-Friendly**: Uses industry-standard tools
- **Scalable**: Can easily deploy to testnets or mainnet
- **Professional**: Production-ready architecture
- **Free**: No costs for development and testing