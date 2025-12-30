import React from 'react';
import { Calendar, MapPin, ExternalLink } from 'lucide-react';

const NewsCard = ({ article, onClick, className = "" }) => {
  const handleClick = () => {
    if (onClick) {
      onClick(article);
    }
  };

  return (
    <div 
      className={`news-card ${className}`}
      onClick={handleClick}
    >
      <div className="relative overflow-hidden">
        <img
          src={article.image || 'https://via.placeholder.com/300x160/3182ce/white?text=News'}
          alt={article.title}
          className="w-full h-40 object-cover transition-transform duration-300 hover:scale-105"
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/300x160/3182ce/white?text=News';
          }}
        />
        {article.source && (
          <div className="absolute top-2 left-2 bg-news-primary text-white px-2 py-1 rounded-md text-xs font-medium">
            {article.source}
          </div>
        )}
      </div>
      
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 leading-tight">
          {article.title}
        </h3>
        
        <p className="text-gray-600 text-sm mb-3 line-clamp-3 leading-relaxed">
          {article.description || 'No description available.'}
        </p>
        
        <div className="flex items-center justify-between text-xs text-gray-500">
          {article.publishedAt && (
            <div className="flex items-center gap-1">
              <Calendar size={12} />
              <span>{new Date(article.publishedAt).toLocaleDateString()}</span>
            </div>
          )}
          
          {article.url && (
            <div className="flex items-center gap-1 text-news-accent hover:text-news-primary transition-colors">
              <ExternalLink size={12} />
              <span>Read more</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NewsCard;