const express = require('express');
const axios = require('axios');
const router = express.Router();
require('dotenv').config();

const NEWS_API_KEY = "8702a1547afb65ab04eac0dc787631bc";

// Mock data for fallback
const mockArticles = [
  {
    title: "Breaking: Technology Advances in 2024",
    description: "Latest developments in artificial intelligence and machine learning are reshaping industries worldwide.",
    content: "The technology sector continues to evolve rapidly with new innovations in AI, blockchain, and quantum computing leading the way.",
    source: "Tech News Daily",
    url: "https://example.com/tech-news",
    image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    publishedAt: new Date().toISOString()
  },
  {
    title: "Global Markets Show Strong Performance",
    description: "Stock markets around the world are experiencing significant growth as economic indicators improve.",
    content: "Financial analysts report positive trends across major markets with technology and healthcare sectors leading gains.",
    source: "Financial Times",
    url: "https://example.com/market-news",
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    publishedAt: new Date().toISOString()
  },
  {
    title: "Climate Change Summit Reaches Agreement",
    description: "World leaders agree on new environmental policies to combat climate change effects.",
    content: "The international summit concluded with commitments to reduce carbon emissions and invest in renewable energy.",
    source: "Environmental News",
    url: "https://example.com/climate-news",
    image: "https://images.unsplash.com/photo-1569163139394-de44cb5894c6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    publishedAt: new Date().toISOString()
  },
  {
    title: "Sports Championship Finals This Weekend",
    description: "Major sporting events are scheduled with record-breaking attendance expected.",
    content: "Athletes from around the world will compete in what promises to be an exciting championship weekend.",
    source: "Sports Central",
    url: "https://example.com/sports-news",
    image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    publishedAt: new Date().toISOString()
  },
  {
    title: "Entertainment Industry Embraces Digital Transformation",
    description: "Streaming services and digital platforms are changing how we consume entertainment content.",
    content: "The entertainment industry continues to adapt to digital trends with new platforms and content delivery methods.",
    source: "Entertainment Weekly",
    url: "https://example.com/entertainment-news",
    image: "https://images.unsplash.com/photo-1489599904472-84978f312f2e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    publishedAt: new Date().toISOString()
  }
];

// Extended mock data for specific categories
const mockSportsArticles = [
  {
    title: "World Cup 2024 Qualifiers: Exciting Matches Ahead",
    description: "Teams from around the globe compete for their chance to qualify for the upcoming World Cup tournament.",
    content: "The qualification rounds have been intense with several upsets and outstanding performances from underdog teams.",
    source: "Sports World",
    url: "https://example.com/world-cup-news",
    image: "https://via.placeholder.com/300x160/38a169/white?text=World+Cup",
    publishedAt: new Date().toISOString()
  },
  {
    title: "NBA Season Highlights: Record-Breaking Performances",
    description: "This season has seen incredible individual performances and team achievements across the league.",
    content: "Several players have broken long-standing records while teams battle for playoff positions.",
    source: "Basketball Today",
    url: "https://example.com/nba-news",
    image: "https://via.placeholder.com/300x160/38a169/white?text=NBA+News",
    publishedAt: new Date().toISOString()
  },
  {
    title: "Olympic Training: Athletes Prepare for Paris 2024",
    description: "Olympic hopefuls are in intensive training as they prepare for the upcoming Paris Olympics.",
    content: "Training facilities worldwide are buzzing with activity as athletes fine-tune their skills.",
    source: "Olympic News",
    url: "https://example.com/olympic-news",
    image: "https://via.placeholder.com/300x160/38a169/white?text=Olympics",
    publishedAt: new Date().toISOString()
  },
  {
    title: "Tennis Grand Slam: Unexpected Winners Emerge",
    description: "The latest Grand Slam tournament has produced some surprising results and new champions.",
    content: "Young players are making their mark while established champions face new challenges.",
    source: "Tennis Weekly",
    url: "https://example.com/tennis-news",
    image: "https://via.placeholder.com/300x160/38a169/white?text=Tennis",
    publishedAt: new Date().toISOString()
  },
  {
    title: "Football Transfer Window: Major Signings Announced",
    description: "Top clubs have made significant signings during this transfer window, reshaping team dynamics.",
    content: "Record-breaking transfer fees and strategic moves are defining this transfer period.",
    source: "Football Central",
    url: "https://example.com/football-news",
    image: "https://via.placeholder.com/300x160/38a169/white?text=Football",
    publishedAt: new Date().toISOString()
  },
  {
    title: "Marathon Season: Runners Set New Personal Bests",
    description: "Marathon events worldwide are seeing exceptional performances from both amateur and professional runners.",
    content: "Training techniques and nutrition advances are helping runners achieve new personal records.",
    source: "Running Times",
    url: "https://example.com/marathon-news",
    image: "https://via.placeholder.com/300x160/38a169/white?text=Marathon",
    publishedAt: new Date().toISOString()
  },
  {
    title: "Swimming Championships: New World Records Set",
    description: "The international swimming championships have witnessed multiple world records being broken.",
    content: "Advanced training methods and improved techniques are pushing swimmers to new limits.",
    source: "Swim News",
    url: "https://example.com/swimming-news",
    image: "https://via.placeholder.com/300x160/38a169/white?text=Swimming",
    publishedAt: new Date().toISOString()
  },
  {
    title: "Cricket World Series: Thrilling Matches Continue",
    description: "The cricket world series continues with nail-biting matches and outstanding individual performances.",
    content: "Teams are showcasing exceptional skills in both batting and bowling departments.",
    source: "Cricket Today",
    url: "https://example.com/cricket-news",
    image: "https://via.placeholder.com/300x160/38a169/white?text=Cricket",
    publishedAt: new Date().toISOString()
  },
  {
    title: "Golf Major Championships: Rising Stars Shine",
    description: "Young golfers are making their presence felt in major championships with impressive performances.",
    content: "The next generation of golf talent is challenging established players for major titles.",
    source: "Golf Digest",
    url: "https://example.com/golf-news",
    image: "https://via.placeholder.com/300x160/38a169/white?text=Golf",
    publishedAt: new Date().toISOString()
  },
  {
    title: "Winter Sports Season: Skiing and Snowboarding Updates",
    description: "The winter sports season is in full swing with exciting competitions in skiing and snowboarding.",
    content: "Athletes are competing in various disciplines while preparing for upcoming winter championships.",
    source: "Winter Sports Weekly",
    url: "https://example.com/winter-sports-news",
    image: "https://via.placeholder.com/300x160/38a169/white?text=Winter+Sports",
    publishedAt: new Date().toISOString()
  },
  {
    title: "Esports Tournament: Gaming Champions Crowned",
    description: "The latest esports tournament has concluded with new champions emerging in various gaming categories.",
    content: "Professional gaming continues to grow with increasing prize pools and global viewership.",
    source: "Esports Central",
    url: "https://example.com/esports-news",
    image: "https://via.placeholder.com/300x160/38a169/white?text=Esports",
    publishedAt: new Date().toISOString()
  },
  {
    title: "Fitness Trends: New Workout Routines Gain Popularity",
    description: "Innovative fitness routines and training methods are becoming popular among athletes and fitness enthusiasts.",
    content: "Personal trainers and fitness experts are developing new approaches to physical conditioning.",
    source: "Fitness Today",
    url: "https://example.com/fitness-news",
    image: "https://via.placeholder.com/300x160/38a169/white?text=Fitness",
    publishedAt: new Date().toISOString()
  }
];

const mockEntertainmentArticles = [
  {
    title: "Hollywood Blockbusters: Summer Movie Season Preview",
    description: "Get ready for an exciting summer with highly anticipated blockbuster movies hitting theaters.",
    content: "Major studios are releasing their biggest productions with star-studded casts and cutting-edge special effects.",
    source: "Hollywood Reporter",
    url: "https://example.com/hollywood-news",
    image: "https://via.placeholder.com/300x160/9f7aea/white?text=Hollywood",
    publishedAt: new Date().toISOString()
  },
  {
    title: "Streaming Wars: New Platforms Launch Original Content",
    description: "Streaming services are investing heavily in original programming to attract and retain subscribers.",
    content: "Competition among streaming platforms is driving innovation in content creation and delivery.",
    source: "Streaming News",
    url: "https://example.com/streaming-news",
    image: "https://via.placeholder.com/300x160/9f7aea/white?text=Streaming",
    publishedAt: new Date().toISOString()
  },
  {
    title: "Music Industry: New Albums from Top Artists",
    description: "Several chart-topping artists are releasing new albums that are already generating buzz among fans.",
    content: "The music industry continues to evolve with artists experimenting with new sounds and collaboration styles.",
    source: "Music Weekly",
    url: "https://example.com/music-news",
    image: "https://via.placeholder.com/300x160/9f7aea/white?text=Music",
    publishedAt: new Date().toISOString()
  },
  {
    title: "Television Awards Season: Outstanding Performances Recognized",
    description: "The television awards season celebrates exceptional performances and groundbreaking shows.",
    content: "This year's nominees represent diverse storytelling and outstanding artistic achievements in television.",
    source: "TV Guide",
    url: "https://example.com/tv-news",
    image: "https://via.placeholder.com/300x160/9f7aea/white?text=TV+Awards",
    publishedAt: new Date().toISOString()
  },
  {
    title: "Celebrity Fashion: Red Carpet Trends and Style Icons",
    description: "Fashion experts analyze the latest red carpet looks and emerging style trends from celebrity events.",
    content: "Designers and stylists are pushing creative boundaries with innovative fashion choices.",
    source: "Fashion Entertainment",
    url: "https://example.com/fashion-news",
    image: "https://via.placeholder.com/300x160/9f7aea/white?text=Fashion",
    publishedAt: new Date().toISOString()
  },
  {
    title: "Gaming Industry: New Video Game Releases Generate Excitement",
    description: "The gaming industry is buzzing with highly anticipated video game releases across multiple platforms.",
    content: "Game developers are incorporating advanced graphics and immersive storytelling techniques.",
    source: "Gaming News",
    url: "https://example.com/gaming-news",
    image: "https://via.placeholder.com/300x160/9f7aea/white?text=Gaming",
    publishedAt: new Date().toISOString()
  },
  {
    title: "Broadway Shows: New Productions Open to Critical Acclaim",
    description: "Broadway's latest productions are receiving rave reviews from critics and audiences alike.",
    content: "Theater productions are showcasing innovative staging and powerful performances from talented casts.",
    source: "Broadway News",
    url: "https://example.com/broadway-news",
    image: "https://via.placeholder.com/300x160/9f7aea/white?text=Broadway",
    publishedAt: new Date().toISOString()
  },
  {
    title: "Film Festivals: Independent Movies Gain Recognition",
    description: "Film festivals worldwide are showcasing independent films that are gaining critical recognition.",
    content: "Independent filmmakers are telling unique stories that resonate with diverse audiences.",
    source: "Film Festival News",
    url: "https://example.com/film-festival-news",
    image: "https://via.placeholder.com/300x160/9f7aea/white?text=Film+Festival",
    publishedAt: new Date().toISOString()
  },
  {
    title: "Social Media Influencers: New Trends in Digital Content",
    description: "Social media influencers are setting new trends in digital content creation and audience engagement.",
    content: "Content creators are exploring innovative formats and platforms to connect with their audiences.",
    source: "Digital Media Today",
    url: "https://example.com/social-media-news",
    image: "https://via.placeholder.com/300x160/9f7aea/white?text=Social+Media",
    publishedAt: new Date().toISOString()
  },
  {
    title: "Animation Studios: Breakthrough Techniques in Animated Films",
    description: "Animation studios are pioneering new techniques that are revolutionizing animated storytelling.",
    content: "Advanced animation technology is enabling more realistic and emotionally engaging animated content.",
    source: "Animation Weekly",
    url: "https://example.com/animation-news",
    image: "https://via.placeholder.com/300x160/9f7aea/white?text=Animation",
    publishedAt: new Date().toISOString()
  },
  {
    title: "Comedy Shows: Stand-up Comedians Tour Major Cities",
    description: "Popular stand-up comedians are embarking on major tours, bringing laughter to audiences nationwide.",
    content: "Comedy venues are experiencing increased attendance as audiences seek entertainment and humor.",
    source: "Comedy Central News",
    url: "https://example.com/comedy-news",
    image: "https://via.placeholder.com/300x160/9f7aea/white?text=Comedy",
    publishedAt: new Date().toISOString()
  },
  {
    title: "Documentary Films: Real Stories Capture Global Attention",
    description: "Documentary filmmakers are creating compelling content that addresses important social and environmental issues.",
    content: "Documentaries are gaining popularity as audiences seek informative and thought-provoking content.",
    source: "Documentary News",
    url: "https://example.com/documentary-news",
    image: "https://via.placeholder.com/300x160/9f7aea/white?text=Documentary",
    publishedAt: new Date().toISOString()
  }
];

// 🌍 Global News
router.get('/global-news', async (req, res) => {
  try {
    console.log('🌍 Fetching global news...');
    
    // Try real API first
    const response = await axios.get('https://gnews.io/api/v4/top-headlines', {
      params: {
        apikey: NEWS_API_KEY,
        lang: req.query.lang || 'en',
      },
      timeout: 5000 // 5 second timeout
    });

    console.log('✅ Global news fetched successfully from API');
    const articles = response.data.articles.slice(0, 6).map(a => ({
      title: a.title,
      description: a.description,
      content: a.content,
      source: a.source.name,
      url: a.url,
      image: a.image || null,
      publishedAt: a.publishedAt
    }));

    res.json({ success: true, articles });
  } catch (err) {
    console.error('❌ Global news API failed, using mock data:', err.message);
    
    // Return mock data as fallback
    const articles = mockArticles.slice(0, 6);
    res.json({ 
      success: true, 
      articles,
      mock: true,
      message: "Using mock data - API unavailable"
    });
  }
});

// 🌎 Country News
router.get('/country-news', async (req, res) => {
  try {
    console.log('🌎 Fetching country news...');
    
    // Try real API first
    const ipResponse = await axios.get('https://api.ipify.org?format=json', { timeout: 3000 });
    const ip = ipResponse.data.ip;
    console.log('📍 IP:', ip);

    const locationResponse = await axios.get(`http://ip-api.com/json/${ip}`, { timeout: 3000 });
    const loc = locationResponse.data;
    console.log('🗺️ Location:', loc.country, loc.countryCode);

    const response = await axios.get('https://gnews.io/api/v4/top-headlines', {
      params: {
        apikey: NEWS_API_KEY,
        country: loc.countryCode.toLowerCase(),
        lang: req.query.lang || 'en',
      },
      timeout: 5000
    });

    console.log('✅ Country news fetched successfully from API');
    const articles = response.data.articles.slice(0, 6).map(a => ({
      title: a.title,
      description: a.description,
      content: a.content,
      source: a.source.name,
      url: a.url,
      image: a.image || null,
      publishedAt: a.publishedAt
    }));

    res.json({ success: true, location: loc.country, articles });
  } catch (err) {
    console.error('❌ Country news API failed, using mock data:', err.message);
    
    // Return mock data as fallback
    const articles = mockArticles.slice(0, 6);
    res.json({ 
      success: true, 
      location: "Your Location",
      articles,
      mock: true,
      message: "Using mock data - API unavailable"
    });
  }
});

// 🏷 Category News
router.get('/country-category-news', async (req, res) => {
  try {
    const category = req.query.category || "sports";
    const lang = req.query.lang || "en";
    console.log(`🏷️ Fetching ${category} news...`);

    // Try real API first
    const ipResponse = await axios.get('https://api.ipify.org?format=json', { timeout: 3000 });
    const ip = ipResponse.data.ip;
    
    const locationResponse = await axios.get(`http://ip-api.com/json/${ip}`, { timeout: 3000 });
    const loc = locationResponse.data;

    const response = await axios.get('https://gnews.io/api/v4/top-headlines', {
      params: {
        apikey: NEWS_API_KEY,
        topic: category,
        country: loc.countryCode.toLowerCase(),
        lang
      },
      timeout: 5000
    });

    console.log(`✅ ${category} news fetched successfully from API`);
    const articles = response.data.articles.slice(0, 15).map(a => ({
      title: a.title,
      description: a.description,
      content: a.content,
      source: a.source.name,
      url: a.url,
      image: a.image || null,
      publishedAt: a.publishedAt
    }));

    res.json({
      success: true,
      category,
      articles
    });
  } catch (err) {
    console.error(`❌ ${req.query.category || 'category'} news API failed, using mock data:`, err.message);
    
    // Return category-specific mock data with more articles
    let categoryArticles = [];
    const cat = req.query.category || 'sports';
    
    if (cat.toLowerCase() === 'sports') {
      categoryArticles = mockSportsArticles;
    } else if (cat.toLowerCase() === 'entertainment') {
      categoryArticles = mockEntertainmentArticles;
    } else {
      // For other categories, filter from general mock articles
      categoryArticles = mockArticles.filter(article => {
        return article.title.toLowerCase().includes(cat) || 
               article.description.toLowerCase().includes(cat);
      });
    }
    
    // If no category-specific articles, return general mock data
    const articles = categoryArticles.length > 0 ? categoryArticles : mockArticles.slice(0, 15);
    
    res.json({ 
      success: true, 
      category: req.query.category || 'sports',
      articles,
      mock: true,
      message: "Using mock data - API unavailable"
    });
  }
});

module.exports = router;
