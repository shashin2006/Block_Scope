import React, { useState, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import NewsCard from './NewsCard';

const NewsSection = ({ title, articles, onArticleClick, accentColor = 'news-accent' }) => {
  const [currentScroll, setCurrentScroll] = useState(0);
  const scrollContainerRef = useRef(null);
  const scrollAmount = 320;

  const handlePrevClick = () => {
    const newScroll = Math.max(0, currentScroll - scrollAmount);
    setCurrentScroll(newScroll);
    if (scrollContainerRef.current) {
      scrollContainerRef.current.style.transform = `translateX(-${newScroll}px)`;
    }
  };

  const handleNextClick = () => {
    if (scrollContainerRef.current) {
      const maxScroll = scrollContainerRef.current.scrollWidth - scrollContainerRef.current.parentElement.clientWidth;
      const newScroll = Math.min(maxScroll, currentScroll + scrollAmount);
      setCurrentScroll(newScroll);
      scrollContainerRef.current.style.transform = `translateX(-${newScroll}px)`;
    }
  };

  const canScrollPrev = currentScroll > 0;
  const canScrollNext = scrollContainerRef.current && 
    currentScroll < (scrollContainerRef.current.scrollWidth - scrollContainerRef.current.parentElement?.clientWidth);

  return (
    <section className="max-w-7xl mx-auto px-6 py-12 animate-slide-up">
      <div className="section-header">
        <h2 className={`section-title text-${accentColor}`}>{title}</h2>
      </div>

      <div className="relative overflow-hidden rounded-xl">
        <button
          className={`nav-arrow prev ${!canScrollPrev ? 'opacity-50 cursor-not-allowed' : ''}`}
          onClick={handlePrevClick}
          disabled={!canScrollPrev}
        >
          <ChevronLeft size={20} />
        </button>

        <div 
          ref={scrollContainerRef}
          className="flex gap-6 transition-transform duration-500 ease-out py-2"
        >
          {articles.map((article, index) => (
            <NewsCard
              key={index}
              article={article}
              onClick={onArticleClick}
              className="min-w-[300px] max-w-[300px]"
            />
          ))}
        </div>

        <button
          className={`nav-arrow next ${!canScrollNext ? 'opacity-50 cursor-not-allowed' : ''}`}
          onClick={handleNextClick}
          disabled={!canScrollNext}
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </section>
  );
};

export default NewsSection;