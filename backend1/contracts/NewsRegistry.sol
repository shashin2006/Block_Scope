// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract NewsRegistry {
    // Mapping to store news hashes
    mapping(bytes32 => bool) private storedHashes;
    
    // Mapping to store news metadata
    mapping(bytes32 => NewsData) private newsData;
    
    // Counter for total news stored
    uint256 public totalNewsStored;
    
    struct NewsData {
        bytes32 hash;
        address storedBy;
        uint256 timestamp;
        string source;
        bool exists;
    }
    
    // Events for transparency and logging
    event NewsStored(
        bytes32 indexed hash, 
        address indexed by, 
        uint256 timestamp,
        string source
    );
    
    event NewsVerified(
        bytes32 indexed hash, 
        address indexed by, 
        bool verified
    );
    
    /**
     * @dev Store a news hash on the blockchain
     * @param hash The SHA256 hash of the news content
     * @param source The source of the news (optional)
     */
    function storeHash(bytes32 hash, string memory source) external {
        require(hash != bytes32(0), "Hash cannot be empty");
        require(!storedHashes[hash], "Hash already exists");
        
        storedHashes[hash] = true;
        newsData[hash] = NewsData({
            hash: hash,
            storedBy: msg.sender,
            timestamp: block.timestamp,
            source: source,
            exists: true
        });
        
        totalNewsStored++;
        
        emit NewsStored(hash, msg.sender, block.timestamp, source);
    }
    
    /**
     * @dev Verify if a news hash exists on the blockchain
     * @param hash The SHA256 hash to verify
     * @return bool True if hash exists, false otherwise
     */
    function verifyHash(bytes32 hash) external view returns (bool) {
        return storedHashes[hash];
    }
    
    /**
     * @dev Get detailed information about stored news
     * @param hash The SHA256 hash to query
     * @return NewsData struct with all information
     */
    function getNewsData(bytes32 hash) external view returns (NewsData memory) {
        require(storedHashes[hash], "Hash does not exist");
        return newsData[hash];
    }
    
    /**
     * @dev Verify hash and emit event for logging
     * @param hash The SHA256 hash to verify
     * @return bool True if hash exists, false otherwise
     */
    function verifyHashWithEvent(bytes32 hash) external returns (bool) {
        bool verified = storedHashes[hash];
        emit NewsVerified(hash, msg.sender, verified);
        return verified;
    }
    
    /**
     * @dev Get contract statistics
     * @return totalStored Total number of news hashes stored
     */
    function getStats() external view returns (uint256 totalStored) {
        return totalNewsStored;
    }
}