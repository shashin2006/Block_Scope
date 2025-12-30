# BlockScope - Design Document

## Project Overview

**BlockScope** is a blockchain-based news verification platform designed to combat misinformation by providing immutable news verification through Ethereum smart contracts. The platform combines modern news aggregation with blockchain technology to create a trustworthy news ecosystem.

## System Architecture

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    FRONTEND LAYER                           │
│  React 18 + Tailwind CSS + React Router                    │
│  ┌──────────────────────────────────────────────────────┐  │
│  │ Pages: Home, WorldNews, Sports, Entertainment,       │  │
│  │        Events, FakeNews                              │  │
│  │ Components: Header, NewsCard, NewsModal, Carousel    │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                           ↓ HTTP/REST API
┌─────────────────────────────────────────────────────────────┐
│                    BACKEND LAYER                            │
│  Node.js + Express + Ethereum Integration                  │
│  ┌──────────────────────────────────────────────────────┐  │
│  │ Routes: /news/*, /blockchain/*                       │  │
│  │ Services: ethereum.js, news aggregation             │  │
│  │ Middleware: CORS, body-parser                        │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                           ↓ ethers.js
┌─────────────────────────────────────────────────────────────┐
│                    BLOCKCHAIN LAYER                         │
│  Ethereum + Hardhat + Solidity Smart Contracts            │
│  ┌──────────────────────────────────────────────────────┐  │
│  │ Smart Contract: NewsRegistry.sol                     │  │
│  │ Functions: storeHash, verifyHash, getNewsData        │  │
│  │ Events: NewsStored, NewsVerified                     │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                           ↓ External APIs
┌─────────────────────────────────────────────────────────────┐
│                    EXTERNAL SERVICES                        │
│  ┌──────────────────────────────────────────────────────┐  │
│  │ GNews API - News aggregation                         │  │
│  │ IP Geolocation API - User location                   │  │
│  │ Alchemy RPC - Ethereum network access               │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

## Core Components

### 1. Frontend Components

#### Pages
- **Home**: Landing page with news carousel, global/local news sections
- **WorldNews**: International news coverage
- **Sports**: Sports news with 12+ categories
- **Entertainment**: Celebrity and entertainment news
- **Events**: Local and global events
- **FakeNews**: News verification and misinformation detection

#### Reusable Components
- **Header**: Navigation bar with routing
- **NewsCard**: Individual article display
- **NewsModal**: Full article popup
- **NewsSection**: News container with filtering
- **SearchBar**: Real-time search functionality
- **Carousel**: Hero section with featured content

### 2. Backend Services

#### News Service
- **Global News Aggregation**: Fetches international news
- **Country-Specific News**: Location-based news filtering
- **Category News**: Sports, entertainment, events filtering
- **Mock Data Fallback**: Ensures functionality when APIs fail

#### Blockchain Service (ethereum.js)
- **Smart Contract Interaction**: ethers.js integration
- **Hash Storage**: Store news hashes on Ethereum
- **Hash Verification**: Verify news authenticity
- **Transaction Management**: Handle blockchain transactions
- **Event Logging**: Track verification events

### 3. Smart Contract (NewsRegistry.sol)

#### Data Structures
```solidity
struct NewsData {
    bytes32 hash;
    address storedBy;
    uint256 timestamp;
    string source;
    bool exists;
}
```

#### Core Functions
- `storeHash(bytes32 hash, string source)`: Store news hash
- `verifyHash(bytes32 hash)`: Check hash existence
- `getNewsData(bytes32 hash)`: Retrieve news metadata
- `getStats()`: Get contract statistics

## Design Patterns

### 1. Service Layer Pattern
- Separation of concerns between routes and business logic
- Dedicated services for Ethereum interaction and news aggregation
- Centralized error handling and logging

### 2. Repository Pattern
- Smart contract acts as immutable data repository
- Consistent interface for blockchain operations
- Event-driven architecture for transparency

### 3. Fallback Pattern
- Mock data fallback when external APIs fail
- Graceful degradation of functionality
- Ensures application availability

### 4. Component-Based Architecture
- Reusable React components
- Props-based data flow
- Modular and maintainable frontend structure

## Data Flow

### News Verification Flow
1. User submits news content
2. Backend generates SHA256 hash
3. Hash stored on Ethereum smart contract
4. Transaction confirmed and event emitted
5. User can verify by submitting same content
6. Backend checks blockchain for hash existence
7. Verification result returned with metadata

### News Aggregation Flow
1. Frontend requests news by category/location
2. Backend calls external news APIs
3. Data processed and formatted
4. Fallback to mock data if APIs fail
5. News articles returned to frontend
6. Articles displayed in responsive cards

## Security Considerations

### Smart Contract Security
- Input validation for hash storage
- Prevention of duplicate hash storage
- Access control for sensitive operations
- Event logging for transparency
- Gas optimization for cost efficiency

### Backend Security
- CORS configuration for cross-origin requests
- Input sanitization and validation
- Error handling without information leakage
- Rate limiting for API endpoints
- Secure environment variable management

### Frontend Security
- XSS prevention through React's built-in protections
- Secure API communication over HTTPS
- Input validation on client side
- Safe handling of external content

## Performance Considerations

### Frontend Optimization
- Component memoization for expensive renders
- Lazy loading for images and content
- Efficient state management
- Responsive design for mobile performance

### Backend Optimization
- Connection pooling for database operations
- Caching for frequently accessed data
- Asynchronous operations for blockchain calls
- Error handling with retry mechanisms

### Blockchain Optimization
- Gas-efficient smart contract design
- Batch operations where possible
- Event indexing for efficient queries
- Local network for development testing

## Scalability Design

### Horizontal Scaling
- Stateless backend design
- Load balancer compatibility
- Microservices architecture potential
- Database sharding capabilities

### Vertical Scaling
- Efficient memory usage
- CPU optimization for hash operations
- Network optimization for API calls
- Storage optimization for blockchain data

## Technology Choices Rationale

### Frontend: React 18
- **Pros**: Modern hooks, concurrent features, large ecosystem
- **Cons**: Learning curve, bundle size
- **Alternative**: Vue.js, Angular

### Backend: Node.js + Express
- **Pros**: JavaScript ecosystem, fast development, npm packages
- **Cons**: Single-threaded limitations
- **Alternative**: Python Flask, Java Spring

### Blockchain: Ethereum + Hardhat
- **Pros**: Mature ecosystem, extensive tooling, community support
- **Cons**: Gas costs, scalability limitations
- **Alternative**: Polygon, Binance Smart Chain

### Styling: Tailwind CSS
- **Pros**: Utility-first, responsive design, small bundle
- **Cons**: Learning curve, HTML verbosity
- **Alternative**: Bootstrap, Material-UI

## Future Enhancements

### Phase 2 Features
- User authentication and profiles
- News source reputation scoring
- Advanced AI-powered fake news detection
- Social sharing and commenting system

### Phase 3 Features
- Mobile application (React Native)
- Real-time notifications
- Advanced analytics dashboard
- Multi-language support

### Phase 4 Features
- Decentralized storage (IPFS)
- Token-based incentive system
- Cross-chain compatibility
- Advanced machine learning integration

## Deployment Architecture

### Development Environment
- Local Hardhat network for blockchain testing
- React development server (port 3000)
- Express backend server (port 3002)
- Hot reloading for rapid development

### Production Environment
- Ethereum mainnet or testnet deployment
- CDN for static asset delivery
- Load balancer for backend scaling
- Database clustering for high availability

## Monitoring and Logging

### Application Monitoring
- Error tracking and reporting
- Performance metrics collection
- User analytics and behavior tracking
- API response time monitoring

### Blockchain Monitoring
- Transaction success/failure rates
- Gas usage optimization
- Smart contract event monitoring
- Network health checking

This design document provides a comprehensive overview of the BlockScope platform architecture, ensuring maintainability, scalability, and security while delivering a robust news verification solution.