import { useState, useEffect } from 'react';
import { Carousel } from '../components/Carousel';
import NewsSection from '../components/NewsSection';
import SearchBar from '../components/SearchBar';
import NewsModal from '../components/NewsModal';
import { fetchGlobalNews, fetchCountryNews } from '../services/api';

const Home = () => {
  const [globalNews, setGlobalNews] = useState([]);
  const [localNews, setLocalNews] = useState([]);
  const [filteredGlobalNews, setFilteredGlobalNews] = useState([]);
  const [filteredLocalNews, setFilteredLocalNews] = useState([]);
  const [locationInfo, setLocationInfo] = useState(null);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  const carouselItems = [
    {
      image: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      title: 'Local News',
      description: 'Stay updated with news from your area'
    },
    {
      image: 'https://images.unsplash.com/photo-1586339949916-3e9457bef6d3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      title: 'Global News',
      description: 'World news at your fingertips'
    },
    {
      image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      title: 'Events',
      description: 'Discover events happening near you'
    }
  ];

  useEffect(() => {
    loadNews();
  }, []);

  useEffect(() => {
    // Filter news when search query changes
    if (searchQuery.trim()) {
      setIsSearching(true);
      const query = searchQuery.toLowerCase();
      
      const filteredGlobal = globalNews.filter(article =>
        article.title.toLowerCase().includes(query) ||
        article.description?.toLowerCase().includes(query) ||
        article.content?.toLowerCase().includes(query) ||
        article.source?.toLowerCase().includes(query)
      );
      
      const filteredLocal = localNews.filter(article =>
        article.title.toLowerCase().includes(query) ||
        article.description?.toLowerCase().includes(query) ||
        article.content?.toLowerCase().includes(query) ||
        article.source?.toLowerCase().includes(query)
      );
      
      setFilteredGlobalNews(filteredGlobal);
      setFilteredLocalNews(filteredLocal);
    } else {
      setIsSearching(false);
      setFilteredGlobalNews(globalNews);
      setFilteredLocalNews(localNews);
    }
  }, [searchQuery, globalNews, localNews]);

  const loadNews = async () => {
    setLoading(true);
    try {
      const [globalData, localData] = await Promise.all([
        fetchGlobalNews('en'),
        fetchCountryNews('en')
      ]);

      if (globalData.success) {
        setGlobalNews(globalData.articles);
        setFilteredGlobalNews(globalData.articles);
      }

      if (localData.success) {
        setLocalNews(localData.articles);
        setFilteredLocalNews(localData.articles);
        setLocationInfo(localData.location);
      }
    } catch (error) {
      console.error('Error loading news:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleArticleClick = (article) => {
    setSelectedArticle(article);
    setIsModalOpen(true);
  };

  const handleSearch = (searchTerm) => {
    setSearchQuery(searchTerm);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-news-accent mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading news...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Carousel */}
      <div className="mb-12">
        <Carousel items={carouselItems} />
      </div>

      {/* Search Bar */}
      <SearchBar onSearch={handleSearch} />

      {/* Search Results Info */}
      {isSearching && (
        <div className="max-w-7xl mx-auto px-6 mb-6">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-blue-800 font-medium">
              🔍 Search results for: "<span className="font-bold">{searchQuery}</span>"
            </p>
            <p className="text-blue-600 text-sm mt-1">
              Found {filteredGlobalNews.length + filteredLocalNews.length} articles
            </p>
          </div>
        </div>
      )}

      {/* No Results Message */}
      {isSearching && filteredGlobalNews.length === 0 && filteredLocalNews.length === 0 && (
        <div className="max-w-7xl mx-auto px-6 mb-12">
          <div className="text-center py-16 bg-white rounded-xl shadow-sm">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No articles found</h3>
            <p className="text-gray-500">
              Try searching with different keywords or check your spelling.
            </p>
          </div>
        </div>
      )}

      {/* Global News Section */}
      {filteredGlobalNews.length > 0 && (
        <NewsSection
          title={isSearching ? `Global News Results (${filteredGlobalNews.length})` : "Global News"}
          articles={filteredGlobalNews}
          onArticleClick={handleArticleClick}
          accentColor="news-accent"
        />
      )}

      {/* Local News Section */}
      {filteredLocalNews.length > 0 && (
        <NewsSection
          title={
            isSearching 
              ? `Local News Results (${filteredLocalNews.length})` 
              : `Local News${locationInfo ? ` - ${locationInfo}` : ''}`
          }
          articles={filteredLocalNews}
          onArticleClick={handleArticleClick}
          accentColor="world-accent"
        />
      )}

      {/* News Modal */}
      <NewsModal
        article={selectedArticle}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default Home;