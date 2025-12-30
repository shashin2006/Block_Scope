import { useState, useEffect } from 'react';
import NewsCard from '../components/NewsCard';
import NewsModal from '../components/NewsModal';
import { fetchCategoryNews } from '../services/api';
import { Trophy } from 'lucide-react';

const Sports = () => {
  const [articles, setArticles] = useState([]);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSportsNews();
  }, []);

  const loadSportsNews = async () => {
    setLoading(true);
    try {
      const data = await fetchCategoryNews('sports', 'en');
      if (data.success) {
        setArticles(data.articles);
      }
    } catch (error) {
      console.error('Error loading sports news:', error);
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
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-sports-accent mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading sports news...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page Header */}
      <div className="bg-gradient-to-r from-sports-accent to-news-accent text-white py-16 px-6 text-center mb-12">
        <div className="max-w-4xl mx-auto">
          <Trophy size={64} className="mx-auto mb-4 opacity-90" />
          <h1 className="text-5xl font-bold mb-4">Sports News</h1>
          <p className="text-xl opacity-90">
            Stay updated with the latest sports news and highlights from around the world
          </p>
        </div>
      </div>

      {/* Sports News Grid */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-news-primary relative pl-4">
            Latest Sports News
            <span className="absolute left-0 top-1/2 transform -translate-y-1/2 w-1 h-8 bg-sports-accent rounded"></span>
          </h2>
          <div className="text-sm text-gray-600">
            {articles.length} articles
          </div>
        </div>

        {articles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {articles.map((article, index) => (
              <NewsCard
                key={index}
                article={article}
                onClick={handleArticleClick}
                className="w-full"
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <Trophy size={64} className="mx-auto mb-4 text-gray-400" />
            <p className="text-gray-600 text-lg">No sports news available at the moment.</p>
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

export default Sports;