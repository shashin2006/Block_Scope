import axios from 'axios';

const API_BASE_URL = 'https://block-scope-1.onrender.com';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

// Global News
export const fetchGlobalNews = async (language = 'en') => {
  try {
    const response = await api.get('/news/global-news', {
      params: { lang: language }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching global news:', error);
    throw error;
  }
};

// Country-specific News
export const fetchCountryNews = async (language = 'en') => {
  try {
    const response = await api.get('/news/country-news', {
      params: { lang: language }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching country news:', error);
    throw error;
  }
};

// Category-specific News (Sports, Entertainment, etc.)
export const fetchCategoryNews = async (category, language = 'en') => {
  try {
    const response = await api.get('/news/country-category-news', {
      params: { 
        category: category,
        lang: language 
      }
    });
    return response.data;
  } catch (error) {
    console.error(`Error fetching ${category} news:`, error);
    throw error;
  }
};

export default api;