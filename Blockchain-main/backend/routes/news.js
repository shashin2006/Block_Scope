const express = require('express');
const axios = require('axios');
const router = express.Router();
require('dotenv').config();

const NEWS_API_KEY = "b25d20e17130c9af88e530aa1e8f0c0e";
router.get('/global-news', async (req, res) => {
  try {
    const response = await axios.get('https://gnews.io/api/v4/top-headlines', {
      params: {
        apikey: NEWS_API_KEY,
        lang: req.query.lang || 'ta',
      },
    });

    const articles = response.data.articles.slice(0, 6).map(article => ({
      title: article.title,
      description: article.description,
      content: article.content,
      source: article.source.name,
      url: article.url,
      publishedAt: article.publishedAt,
      image: article.image || null,
    }));

    res.json({ success: true, articles });
  } catch (error) {
    console.error('Error Error', error);
    res.status(500).json({ success: false, error: 'Failed to fetch global news' });
  }
});




// Fetch Country-Specific and Language-Specific News
router.get('/country-news', async (req, res) => {
  try {
    console.log('Fetching country-specific and language-specific news...');
    
    
    const ipResponse = await axios.get('https://api.ipify.org?format=json');
    const ipAddress = ipResponse.data.ip;
    console.log('User IP Address:', ipAddress);

    
    const locationResponse = await axios.get(`http://ip-api.com/json/${ipAddress}`);
    const locationData = locationResponse.data;

    if (!locationData || !locationData.countryCode) {
      throw new Error('Unable to determine location from IP address.');
    }

    const country = locationData.countryCode.toLowerCase(); 
    const lang = req.query.lang || "en"; 
    console.log('Determined Country Code:', country);
    console.log('Requested Language:', lang);

    // Fetch news specific to the country and language
    const newsResponse = await axios.get('https://gnews.io/api/v4/top-headlines', {
      params: {
        apikey: NEWS_API_KEY,
        lang: lang, 
        country: country, 
      },
    });

    // Extract and map articles including image
    const articles = newsResponse.data.articles.slice(0, 6).map(article => ({
      title: article.title,
      description: article.description,
      content: article.content,
      source: article.source.name,
      url: article.url,
      publishedAt: article.publishedAt,
      image: article.image || null, 
    }));

    console.log('Fetched Articles:', articles);

    
    res.json({
      success: true,
      location: {
        ip: ipAddress,
        city: locationData.city,
        region: locationData.regionName,
        country: locationData.country,
      },
      language: lang,
      articles,
    });
  } catch (error) {
    console.error('Error fetching news:', error.message);
    res.status(500).json({
      success: false,
      error: error.response?.data?.message || 'Failed to fetch news',
    });
  }
});


router.get('/country-category-news', async (req, res) => {
    try {
      const category = req.query.category || 'sports'; 
      const lang = req.query.lang || 'en'; 
  
      console.log('Fetching news for category:', category);
      console.log('Language:', lang);
  
      // Fetch the user's IP address
      const ipResponse = await axios.get('https://api.ipify.org?format=json');
      const ipAddress = ipResponse.data.ip;
      console.log('User IP Address:', ipAddress);
  
      // Fetch geolocation data based on the IP address
      const locationResponse = await axios.get(`http://ip-api.com/json/${ipAddress}`);
      const locationData = locationResponse.data;
  
      if (!locationData || !locationData.countryCode) {
        throw new Error('Unable to determine location from IP address.');
      }
  
      const country = locationData.countryCode.toLowerCase(); 
      console.log('Determined Country Code:', country);
  
     
      const newsResponse = await axios.get('https://gnews.io/api/v4/top-headlines', {
        params: {
          apikey: NEWS_API_KEY,
          lang: lang, 
          country: country, 
          topic: category, 
        },
      });
  
      
      const articles = newsResponse.data.articles.slice(0, 5).map(article => ({
        title: article.title,
        description: article.description,
        content: article.content,
        source: article.source.name,
        url: article.url,
        publishedAt: article.publishedAt,
        image: article.image || null, 
      }));
  
      console.log('Fetched Articles:', articles);
  
      
      res.json({
        success: true,
        location: {
          ip: ipAddress,
          city: locationData.city,
          region: locationData.regionName,
          country: locationData.country,
        },
        category: category,
        language: lang,
        articles,
      });
    } catch (error) {
      console.error('Error fetching news:', error.message);
      res.status(500).json({
        success: false,
        error: error.response?.data?.message || 'Failed to fetch country-category news',
      });
    }
  });



  

  
module.exports = router;
