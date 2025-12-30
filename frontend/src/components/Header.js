import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const location = useLocation();

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'ta', name: 'Tamil' },
    { code: 'hi', name: 'Hindi' },
    { code: 'es', name: 'Spanish' },
    { code: 'fr', name: 'French' },
    { code: 'de', name: 'German' },
    { code: 'it', name: 'Italian' },
    { code: 'ja', name: 'Japanese' },
  ];

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/world', label: 'World' },
    { path: '/sports', label: 'Sports' },
    { path: '/entertainment', label: 'Entertainment' },
    { path: '/events', label: 'Events' },
    { path: '/fake-news', label: 'Rumour Check' },
  ];

  return (
    <>
      {/* Language Bar */}
      <div className="bg-news-primary py-3 px-5 text-center shadow-sm">
        <div className="flex justify-center gap-4 flex-wrap">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => setSelectedLanguage(lang.code)}
              className={`language-btn ${selectedLanguage === lang.code ? 'active' : ''}`}
            >
              {lang.name}
            </button>
          ))}
        </div>
      </div>

      {/* Main Header */}
      <header className="bg-white py-5 px-5 flex justify-between items-center sticky top-0 z-50 shadow-md border-b-4 border-news-highlight">
        <div className="flex items-center gap-4">
          <img 
            src="/logo.jpg" 
            alt="Logo" 
            className="h-12 rounded-lg transition-transform hover:scale-105"
            onError={(e) => {
              e.target.style.display = 'none';
            }}
          />
          <h1 className="text-3xl font-bold text-news-primary tracking-tight">
            The BlockScope
          </h1>
        </div>
        
        <button className="bg-news-highlight text-white px-6 py-2.5 rounded-full font-semibold hover:bg-red-600 transition-all hover:-translate-y-0.5 shadow-sm">
          Sign In
        </button>
      </header>

      {/* Navigation */}
      <nav className="bg-news-secondary shadow-sm">
        <div className="flex justify-center">
          <div className="hidden md:flex">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-6 py-4 font-medium transition-all relative group ${
                  location.pathname === item.path
                    ? 'bg-news-accent text-white'
                    : 'text-white hover:bg-white hover:bg-opacity-10'
                }`}
              >
                {item.label}
                <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-news-accent transition-all group-hover:w-4/5"></span>
              </Link>
            ))}
          </div>
          
          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white p-4"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-news-secondary border-t border-gray-600">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`block px-6 py-3 font-medium transition-all ${
                  location.pathname === item.path
                    ? 'bg-news-accent text-white'
                    : 'text-white hover:bg-white hover:bg-opacity-10'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </div>
        )}
      </nav>
    </>
  );
};

export default Header;