import React, { useState, useEffect } from 'react';
import NewsCard from '../components/NewsCard';
import NewsModal from '../components/NewsModal';
import { fetchGlobalNews } from '../services/api';
import { Globe } from 'lucide-react';

const WorldNews = () => {
  const [articles, setArticles] = useState([]);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [selectedLanguage, setSelectedLanguage] = useState('en');

  useEffect(() => {
    loadNews();
  }, [selectedLanguage]);

  const loadNews = async () => {
    setLoading(true);
    try {
      const data = await fetchGlobalNews(selectedLanguage);
      if (data.success) {
        setArticles(data.articles);
      }
    } catch (error) {
      console.error('Error loading world news:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleArticleClick = (article) => {
    setSelectedArticle(article);
    setIsModalOpen(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-world-accent mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading world news...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page Header */}
      <div className="bg-gradient-to-r from-world-accent to-news-accent text-white py-16 px-6 text-center mb-12">
        <div className="max-w-4xl mx-auto">
          <Globe size={64} className="mx-auto mb-4 opacity-90" />
          <h1 className="text-5xl font-bold mb-4">World News</h1>
          <p className="text-xl opacity-90">
            Stay informed with the latest global news and international updates
          </p>
        </div>
      </div>

      {/* News Grid */}
      <div className="max-w-7xl mx-auto px-6 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article, index) => (
            <NewsCard
              key={index}
              article={article}
              onClick={handleArticleClick}
              className="animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            />
          ))}
        </div>

        {articles.length === 0 && (
          <div className="text-center py-16">
            <Globe size={64} className="mx-auto mb-4 text-gray-400" />
            <p className="text-gray-600 text-lg">No world news available at the moment.</p>
          </div>
        )}
      </div>

      {/* News Modal */}
      <NewsModal
        article={selectedArticle}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default WorldNews;