# Block_Scope
BlockScope is a decentralized news intelligence platform that verifies and authenticates news and rumors using blockchain-based hashing, real-time news aggregation, and voice interaction. Once verified, information becomes immutable, ensuring transparency, trust, and protection against misinformation.

▶️ How to Run BlockScope (Step by Step)
🔹 1. Clone the Repository
git clone https://github.com/shashin2006/Block_Scope.git
cd Block_Scope

🔹 2. Backend Setup
2.1 Navigate to Backend
cd backend1

2.2 Install Backend Dependencies
npm install

2.3 Create .env File (MANDATORY)

Create a file named .env inside backend1/ and add:

PORT=3001
RPC_URL=https://eth-sepolia.g.alchemy.com/v2/YOUR_ALCHEMY_API_KEY
PRIVATE_KEY=YOUR_METAMASK_TESTNET_PRIVATE_KEY


⚠️ Use Sepolia testnet credentials only.

2.4 (Optional) Compile Smart Contracts
npx hardhat compile

2.5 (Optional) Deploy Smart Contract to Sepolia

Skip this step if the contract is already deployed.

npx hardhat run scripts/deploy.js --network sepolia

2.6 Start Backend Server
npm start


Backend runs at:

http://localhost:3001

🔹 3. Frontend Setup
3.1 Open a New Terminal
cd frontend

3.2 Install Frontend Dependencies
npm install

3.3 Start Frontend Server
npm start


Frontend runs at:

http://localhost:3000

✅ Project is Now Running

Frontend → http://localhost:3000

Backend → http://localhost:3001

Blockchain → Ethereum Sepolia Testnet

🔍 Verification (Optional)

To verify blockchain connection:

GET http://localhost:3001/blockchain/info
