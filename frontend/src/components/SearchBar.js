import { useState, useRef, useEffect } from 'react';
import { Search, Mic, MicOff } from 'lucide-react';

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isVoiceSupported, setIsVoiceSupported] = useState(false);
  const recognitionRef = useRef(null);

  useEffect(() => {
    // Check if browser supports speech recognition
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      setIsVoiceSupported(true);
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onstart = () => {
        setIsListening(true);
      };

      recognitionRef.current.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        // Remove full stops and trim whitespace
        const cleanTranscript = transcript.replace(/\./g, '').trim();
        setSearchTerm(cleanTranscript);
        setIsListening(false);
        
        // Automatically search with voice input
        if (onSearch) {
          onSearch(cleanTranscript);
        }
      };

      recognitionRef.current.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
        
        if (event.error === 'not-allowed') {
          alert('Microphone access denied. Please allow microphone access and try again.');
        } else if (event.error === 'no-speech') {
          alert('No speech detected. Please try again.');
        } else {
          alert('Voice search error. Please try again.');
        }
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, [onSearch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim() && onSearch) {
      onSearch(searchTerm.trim());
    }
  };

  const handleVoiceSearch = () => {
    if (!isVoiceSupported) {
      alert('Voice search is not supported in your browser. Please use Chrome, Edge, or Safari.');
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      try {
        recognitionRef.current.start();
      } catch (error) {
        console.error('Error starting voice recognition:', error);
        alert('Could not start voice search. Please try again.');
      }
    }
  };

  const handleClearSearch = () => {
    setSearchTerm('');
    if (onSearch) {
      onSearch(''); // Clear search results
    }
  };

  return (
    <div className="flex justify-center my-8 px-6">
      <form onSubmit={handleSubmit} className="flex w-full max-w-2xl relative">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder={isListening ? "🎤 Listening..." : "🔍 Search for news..."}
          className={`flex-1 px-6 py-4 text-lg border-2 rounded-l-full focus:outline-none focus:shadow-md transition-all bg-white ${
            isListening 
              ? 'border-red-400 bg-red-50' 
              : 'border-gray-200 focus:border-news-accent'
          }`}
          disabled={isListening}
        />
        
        {searchTerm && (
          <button
            type="button"
            onClick={handleClearSearch}
            className="absolute right-20 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 px-2"
          >
            ✕
          </button>
        )}

        <button
          type="submit"
          disabled={!searchTerm.trim() || isListening}
          className={`px-6 py-4 text-white rounded-r-full font-semibold shadow-md transition-all ${
            searchTerm.trim() && !isListening
              ? 'bg-news-accent hover:bg-news-primary hover:shadow-lg'
              : 'bg-gray-400 cursor-not-allowed'
          }`}
        >
          <Search size={20} />
        </button>

        <button
          type="button"
          onClick={handleVoiceSearch}
          className={`ml-2 px-4 py-4 text-white rounded-full shadow-md hover:shadow-lg transition-all ${
            isListening
              ? 'bg-red-500 hover:bg-red-600 animate-pulse'
              : isVoiceSupported
              ? 'bg-news-secondary hover:bg-news-primary'
              : 'bg-gray-400 cursor-not-allowed'
          }`}
          disabled={!isVoiceSupported}
          title={
            !isVoiceSupported 
              ? 'Voice search not supported in this browser'
              : isListening 
              ? 'Click to stop listening'
              : 'Click to start voice search'
          }
        >
          {isListening ? <MicOff size={20} /> : <Mic size={20} />}
        </button>
      </form>

      {isListening && (
        <div className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 bg-red-100 text-red-800 px-4 py-2 rounded-full text-sm font-medium">
          🎤 Listening... Speak now
        </div>
      )}
    </div>
  );
};

export default SearchBar;