import React, { useState } from 'react';
import { Shield, AlertTriangle, CheckCircle, Search } from 'lucide-react';

const FakeNews = () => {
  const [inputText, setInputText] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleCheck = async () => {
    if (!inputText.trim()) return;

    setLoading(true);
    // Simulate fake news detection (replace with actual API call)
    setTimeout(() => {
      const isReliable = Math.random() > 0.5; // Random for demo
      setResult({
        isReliable,
        confidence: Math.floor(Math.random() * 30) + 70,
        sources: isReliable ? ['Reuters', 'BBC', 'AP News'] : ['Unknown', 'Unverified'],
        analysis: isReliable 
          ? 'This content appears to be from reliable sources and contains factual information.'
          : 'This content may contain misleading information. Please verify with trusted sources.'
      });
      setLoading(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page Header */}
      <div className="bg-gradient-to-r from-news-highlight to-news-accent text-white py-16 px-6 text-center mb-12">
        <div className="max-w-4xl mx-auto">
          <Shield size={64} className="mx-auto mb-4 opacity-90" />
          <h1 className="text-5xl font-bold mb-4">Rumour Check</h1>
          <p className="text-xl opacity-90">
            Verify news authenticity and fight misinformation with our fact-checking tool
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 pb-12">
        {/* Input Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
            <Search className="text-news-accent" />
            Check News Authenticity
          </h2>
          
          <div className="space-y-4">
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Paste the news article, headline, or claim you want to verify..."
              className="w-full h-32 p-4 border-2 border-gray-200 rounded-xl focus:border-news-accent focus:outline-none resize-none"
            />
            
            <button
              onClick={handleCheck}
              disabled={!inputText.trim() || loading}
              className="w-full bg-news-accent text-white py-3 px-6 rounded-xl font-semibold hover:bg-news-primary transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  Analyzing...
                </>
              ) : (
                <>
                  <Shield size={20} />
                  Check for Misinformation
                </>
              )}
            </button>
          </div>
        </div>

        {/* Results Section */}
        {result && (
          <div className="bg-white rounded-2xl shadow-lg p-8 animate-fade-in">
            <div className="flex items-center gap-3 mb-6">
              {result.isReliable ? (
                <CheckCircle className="text-green-500" size={32} />
              ) : (
                <AlertTriangle className="text-red-500" size={32} />
              )}
              <h3 className="text-2xl font-bold text-gray-900">
                {result.isReliable ? 'Likely Reliable' : 'Potentially Misleading'}
              </h3>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Confidence Score</h4>
                <div className="bg-gray-200 rounded-full h-3 mb-2">
                  <div 
                    className={`h-3 rounded-full ${result.isReliable ? 'bg-green-500' : 'bg-red-500'}`}
                    style={{ width: `${result.confidence}%` }}
                  ></div>
                </div>
                <p className="text-sm text-gray-600">{result.confidence}% confidence</p>
              </div>

              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Sources Found</h4>
                <div className="space-y-1">
                  {result.sources.map((source, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${result.isReliable ? 'bg-green-500' : 'bg-red-500'}`}></div>
                      <span className="text-sm text-gray-700">{source}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-6 p-4 bg-gray-50 rounded-xl">
              <h4 className="font-semibold text-gray-900 mb-2">Analysis</h4>
              <p className="text-gray-700">{result.analysis}</p>
            </div>
          </div>
        )}

        {/* Tips Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mt-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Tips to Identify Fake News</h3>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex gap-3">
                <div className="w-6 h-6 bg-news-accent rounded-full flex items-center justify-center text-white text-sm font-bold">1</div>
                <div>
                  <h4 className="font-semibold text-gray-900">Check the Source</h4>
                  <p className="text-gray-600 text-sm">Verify if the news comes from a reputable, established news organization.</p>
                </div>
              </div>
              
              <div className="flex gap-3">
                <div className="w-6 h-6 bg-news-accent rounded-full flex items-center justify-center text-white text-sm font-bold">2</div>
                <div>
                  <h4 className="font-semibold text-gray-900">Look for Citations</h4>
                  <p className="text-gray-600 text-sm">Reliable news articles cite their sources and provide evidence.</p>
                </div>
              </div>
              
              <div className="flex gap-3">
                <div className="w-6 h-6 bg-news-accent rounded-full flex items-center justify-center text-white text-sm font-bold">3</div>
                <div>
                  <h4 className="font-semibold text-gray-900">Check Multiple Sources</h4>
                  <p className="text-gray-600 text-sm">Cross-reference the information with other trusted news outlets.</p>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex gap-3">
                <div className="w-6 h-6 bg-news-accent rounded-full flex items-center justify-center text-white text-sm font-bold">4</div>
                <div>
                  <h4 className="font-semibold text-gray-900">Examine the URL</h4>
                  <p className="text-gray-600 text-sm">Be wary of suspicious URLs or sites that mimic legitimate news sources.</p>
                </div>
              </div>
              
              <div className="flex gap-3">
                <div className="w-6 h-6 bg-news-accent rounded-full flex items-center justify-center text-white text-sm font-bold">5</div>
                <div>
                  <h4 className="font-semibold text-gray-900">Check the Date</h4>
                  <p className="text-gray-600 text-sm">Ensure the news is current and not an old story being recirculated.</p>
                </div>
              </div>
              
              <div className="flex gap-3">
                <div className="w-6 h-6 bg-news-accent rounded-full flex items-center justify-center text-white text-sm font-bold">6</div>
                <div>
                  <h4 className="font-semibold text-gray-900">Be Skeptical of Sensational Headlines</h4>
                  <p className="text-gray-600 text-sm">Clickbait headlines often indicate unreliable content.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FakeNews;