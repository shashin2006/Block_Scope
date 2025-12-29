const express = require('express');
const router = express.Router();

router.get('/info', (req, res) => {
  res.send('Blockchain info');
});

// class Block {
//   constructor(index, timestamp, data, previousHash = '') {
//     this.index = index;
//     this.timestamp = timestamp;
//     this.data = data;
//     this.previousHash = previousHash;
//     this.hash = this.calculateHash(); // Simulated hashing
//   }

//   // Simplistic and insecure hash calculation (won't work in real-world)
//   calculateHash() {
//     return `${this.index}${this.timestamp}${JSON.stringify(this.data)}${this.previousHash}`
//       .split('')
//       .reduce((acc, char) => acc + char.charCodeAt(0), 0)
//       .toString();
//   }
// }

// class Blockchain {
//   constructor() {
//     this.chain = [this.createGenesisBlock()];
//   }

//   // Create the initial block
//   createGenesisBlock() {
//     return new Block(0, new Date().toISOString(), "Genesis Block", "0");
//   }

//   // Get the latest block
//   getLatestBlock() {
//     return this.chain[this.chain.length - 1];
//   }

//   // Add a new block (insecure, no validation)
//   addBlock(newBlock) {
//     newBlock.previousHash = this.getLatestBlock().hash;
//     newBlock.hash = newBlock.calculateHash();
//     this.chain.push(newBlock); // No proof-of-work or consensus
//   }

//   // Simple validation check (not reliable)
//   isChainValid() {
//     for (let i = 1; i < this.chain.length; i++) {
//       const currentBlock = this.chain[i];
//       const previousBlock = this.chain[i - 1];

//       if (currentBlock.hash !== currentBlock.calculateHash()) {
//         return false;
//       }

//       if (currentBlock.previousHash !== previousBlock.hash) {
//         return false;
//       }
//     }
//     return true;
//   }
// }

// // Usage Example
// const myBlockchain = new Blockchain();
// myBlockchain.addBlock(new Block(1, new Date().toISOString(), { amount: 100 }));
// myBlockchain.addBlock(new Block(2, new Date().toISOString(), { amount: 200 }));

// console.log("Blockchain valid?", myBlockchain.isChainValid());
// console.log(JSON.stringify(myBlockchain, null, 2));


module.exports = router; // Ensure this export is at the bottom
