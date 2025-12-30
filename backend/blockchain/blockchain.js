const crypto = require("crypto");

class Block {
  constructor(index, timestamp, newsHash, previousHash = "") {
    this.index = index;
    this.timestamp = timestamp;
    this.newsHash = newsHash;
    this.previousHash = previousHash;
    this.hash = this.calculateHash();
  }

  calculateHash() {
    return crypto
      .createHash("sha256")
      .update(
        this.index +
        this.timestamp +
        this.newsHash +
        this.previousHash
      )
      .digest("hex");
  }
}

class Blockchain {
  constructor() {
    this.chain = [this.createGenesisBlock()];
  }

  createGenesisBlock() {
    return new Block(0, Date.now(), "GENESIS", "0");
  }

  getLatestBlock() {
    return this.chain[this.chain.length - 1];
  }

  addNewsHash(newsHash) {
    const newBlock = new Block(
      this.chain.length,
      Date.now(),
      newsHash,
      this.getLatestBlock().hash
    );
    this.chain.push(newBlock);
    return newBlock;
  }

  verifyNewsHash(newsHash) {
    return this.chain.some(block => block.newsHash === newsHash);
  }

  getChain() {
    return this.chain;
  }
}

module.exports = new Blockchain();
