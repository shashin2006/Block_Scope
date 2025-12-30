# The BlockScope - React Frontend

A modern, responsive news platform built with React and Tailwind CSS.

## Features

- 🏠 **Home Page**: Global and local news with carousel
- 🌍 **World News**: International news coverage
- ⚽ **Sports**: Latest sports news and updates
- 🎬 **Entertainment**: Celebrity news and entertainment updates
- 📅 **Events**: Discover local and global events
- 🛡️ **Fake News Checker**: Verify news authenticity

## Tech Stack

- **React 18** - Modern React with hooks
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Client-side routing
- **Axios** - HTTP client for API calls
- **Lucide React** - Beautiful icons

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

4. Open [http://localhost:3001](http://localhost:3001) to view it in the browser.

### Backend Setup

Make sure your backend server is running on `http://localhost:3000` before starting the frontend.

## Available Scripts

- `npm start` - Runs the app in development mode
- `npm build` - Builds the app for production
- `npm test` - Launches the test runner
- `npm eject` - Ejects from Create React App (one-way operation)

## API Endpoints

The frontend connects to these backend endpoints:

- `GET /news/global-news` - Fetch global news
- `GET /news/country-news` - Fetch country-specific news
- `GET /news/country-category-news` - Fetch category-specific news (sports, entertainment)

## Project Structure

```
frontend/
├── public/
├── src/
│   ├── components/
│   │   ├── Header.js
│   │   ├── NewsCard.js
│   │   ├── NewsModal.js
│   │   ├── NewsSection.js
│   │   ├── SearchBar.js
│   │   └── Carousel.js
│   ├── pages/
│   │   ├── Home.js
│   │   ├── WorldNews.js
│   │   ├── Sports.js
│   │   ├── Entertainment.js
│   │   ├── Events.js
│   │   └── FakeNews.js
│   ├── services/
│   │   └── api.js
│   ├── App.js
│   ├── index.js
│   └── index.css
├── package.json
├── tailwind.config.js
└── README.md
```

## Features

### Responsive Design
- Mobile-first approach
- Responsive navigation
- Adaptive layouts for all screen sizes

### Modern UI/UX
- Clean, professional design
- Smooth animations and transitions
- Interactive components
- Loading states and error handling

### News Features
- Article previews with images
- Modal popups for full articles
- Category-based news filtering
- Multi-language support
- Search functionality

### Performance
- Optimized images
- Lazy loading
- Efficient API calls
- Smooth scrolling and navigation

## Customization

### Colors
Update the color scheme in `tailwind.config.js`:

```javascript
colors: {
  'news-primary': '#1a365d',
  'news-secondary': '#2d3748',
  'news-accent': '#3182ce',
  // ... other colors
}
```

### Components
All components are modular and can be easily customized or extended.

## Deployment

1. Build the project:
   ```bash
   npm run build
   ```

2. Deploy the `build` folder to your hosting service.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is licensed under the MIT License.