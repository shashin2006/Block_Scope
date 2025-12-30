import React from 'react';
import { X, ExternalLink, Calendar, User } from 'lucide-react';

const NewsModal = ({ article, isOpen, onClose }) => {
  if (!isOpen || !article) return null;

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl animate-fade-in">
        {/* Header */}
        <div className="bg-news-primary text-white p-6 rounded-t-2xl flex justify-between items-center">
          <h2 className="text-xl font-bold">News Article</h2>
          <button
            onClick={onClose}
            className="text-white hover:bg-white hover:bg-opacity-20 p-2 rounded-full transition-all"
          >
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {article.image && (
            <img
              src={article.image}
              alt={article.title}
              className="w-full h-80 object-cover rounded-xl mb-6"
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/800x300/3182ce/white?text=News+Image';
              }}
            />
          )}

          <h1 className="text-3xl font-bold text-news-primary mb-4 leading-tight">
            {article.title}
          </h1>

          <div className="flex flex-wrap gap-6 mb-6 text-gray-600">
            {article.source && (
              <div className="flex items-center gap-2">
                <User size={16} />
                <span className="font-medium">Source: {article.source}</span>
              </div>
            )}
            
            {article.publishedAt && (
              <div className="flex items-center gap-2">
                <Calendar size={16} />
                <span>Publis
hed: {new Date(article.publishedAt).toLocaleDateString()}</span>
              </div>
            )}
          </div>

          <div className="prose max-w-none text-gray-700 leading-relaxed mb-6">
            <p className="text-lg">
              {article.content || article.description || 'Full content not available.'}
            </p>
          </div>

          {article.url && (
            <div className="border-t pt-6">
              <a
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-news-accent text-white px-6 py-3 rounded-lg font-medium hover:bg-news-primary transition-all hover:-translate-y-0.5 shadow-md"
              >
                <ExternalLink size={18} />
                Read Full Article
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NewsModal;