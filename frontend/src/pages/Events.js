import { useState, useEffect } from 'react';

const Events = () => {
  const [currentCarouselIndex, setCurrentCarouselIndex] = useState(0);

  // Use high-quality event images from the internet
  const carouselImages = [
    'https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    'https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2074&q=80',
    'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80'
  ];

  const eventCategories = [
    { name: 'Music', color: 'text-pink-500', icon: '🎵' },
    { name: 'Theater', color: 'text-purple-500', icon: '🎭' },
    { name: 'Sports', color: 'text-green-500', icon: '🏆' },
    { name: 'Arts', color: 'text-blue-500', icon: '🎨' },
    { name: 'Comedy', color: 'text-yellow-500', icon: '🎤' },
    { name: 'Education', color: 'text-indigo-500', icon: '🎓' }
  ];

  const trendingEvents = [
    {
      title: 'Dubai Real Estate Expo',
      date: 'Saturday, Jan 25',
      location: 'Le Royal Méridien Chennai',
      image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1926&q=80',
      url: 'https://www.eventbrite.com/e/upcoming-dubai-real-estate-expo-in-chennai-tickets-1123773319249'
    },
    {
      title: 'Global Startups Club - Startup Networking Chennai 2025',
      date: 'Wednesday, Jan 04',
      location: 'TwoTrees Workspaces Chennai',
      image: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      url: 'https://www.eventbrite.com/e/global-startups-club-lstartup-networking-chennai-2025-tickets-1112575686829'
    },
    {
      title: 'Summer Music Festival',
      date: 'Saturday, July 15',
      location: 'Central Park',
      image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      url: '#'
    },
    {
      title: 'Tech Conference 2025',
      date: 'Monday, Feb 10',
      location: 'Convention Center',
      image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      url: '#'
    },
    {
      title: 'Art Gallery Opening',
      date: 'Friday, Feb 14',
      location: 'Modern Art Museum',
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      url: '#'
    },
    {
      title: 'Food & Wine Festival',
      date: 'Saturday, Feb 22',
      location: 'Downtown Plaza',
      image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      url: '#'
    },
    {
      title: 'Marathon Championship',
      date: 'Sunday, Mar 03',
      location: 'City Stadium',
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      url: '#'
    },
    {
      title: 'Comedy Night Live',
      date: 'Friday, Mar 08',
      location: 'Comedy Club',
      image: 'https://images.unsplash.com/photo-1527224857830-43a7acc85260?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80',
      url: '#'
    },
    {
      title: 'Business Summit 2025',
      date: 'Tuesday, Mar 12',
      location: 'Business Center',
      image: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2012&q=80',
      url: '#'
    },
    {
      title: 'Fashion Week',
      date: 'Thursday, Mar 20',
      location: 'Fashion District',
      image: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      url: '#'
    },
    {
      title: 'Gaming Tournament',
      date: 'Saturday, Mar 29',
      location: 'Gaming Arena',
      image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      url: '#'
    },
    {
      title: 'Cultural Festival',
      date: 'Sunday, Apr 06',
      location: 'Cultural Center',
      image: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      url: '#'
    }
  ];

  const popularCities = [
    { name: 'India', image: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80' },
    { name: 'New York', image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80' },
    { name: 'Japan', image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80' },
    { name: 'Los Angeles', image: 'https://images.unsplash.com/photo-1534190239940-9ba8944ea261?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80' },
    { name: 'Chicago', image: 'https://images.unsplash.com/photo-1477414348463-c0eb7f1359b6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80' }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentCarouselIndex((prev) => (prev + 1) % carouselImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [carouselImages.length]);

  const handleEventClick = (url) => {
    if (url && url !== '#') {
      window.open(url, '_blank');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Carousel */}
      <div className="relative w-full h-96 overflow-hidden mb-12">
        <div 
          className="flex transition-transform duration-500 ease-in-out h-full"
          style={{ transform: `translateX(-${currentCarouselIndex * 100}%)` }}
        >
          {carouselImages.map((image, index) => (
            <div
              key={index}
              className="min-w-full h-full relative"
            >
              <img
                src={image}
                alt={`Event ${index + 1}`}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/1200x400/38a169/white?text=Event+' + (index + 1);
                }}
              />
              <div className="absolute inset-0 bg-black bg-opacity-30"></div>
            </div>
          ))}
        </div>

        {/* Carousel Navigation */}
        <button
          onClick={() => setCurrentCarouselIndex((prev) => 
            prev === 0 ? carouselImages.length - 1 : prev - 1
          )}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-events-accent text-white p-3 rounded-full hover:bg-news-primary transition-all shadow-md"
        >
          ‹
        </button>

        <button
          onClick={() => setCurrentCarouselIndex((prev) => 
            (prev + 1) % carouselImages.length
          )}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-events-accent text-white p-3 rounded-full hover:bg-news-primary transition-all shadow-md"
        >
          ›
        </button>
      </div>

      {/* Event Categories */}
      <div className="max-w-7xl mx-auto px-6 mb-12">
        <div className="bg-white rounded-2xl shadow-md p-8">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {eventCategories.map((category, index) => (
              <div
                key={index}
                className="text-center p-4 rounded-xl hover:bg-gray-50 transition-all cursor-pointer hover:-translate-y-1"
              >
                <div className="text-3xl mb-2">{category.icon}</div>
                <div className={`font-medium ${category.color}`}>{category.name}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Trending Events Grid */}
      <div className="max-w-7xl mx-auto px-6 mb-12">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-news-primary relative pl-4">
            Trending Events
            <span className="absolute left-0 top-1/2 transform -translate-y-1/2 w-1 h-8 bg-events-accent rounded"></span>
          </h2>
          <div className="text-sm text-gray-600">
            {trendingEvents.length} events
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {trendingEvents.map((event, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer hover:-translate-y-2 border border-gray-100 hover:border-events-accent"
              onClick={() => handleEventClick(event.url)}
            >
              <div className="relative overflow-hidden rounded-t-xl">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-48 object-cover transition-transform duration-300 hover:scale-105"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/300x200/38a169/white?text=Event';
                  }}
                />
              </div>
              
              <div className="p-6">
                <h3 className="font-semibold text-gray-900 mb-3 line-clamp-2 leading-tight">
                  {event.title}
                </h3>
                
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <span className="text-events-accent">📅</span>
                    <span>{event.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-events-accent">📍</span>
                    <span>{event.location}</span>
                  </div>
                </div>

                {event.url && event.url !== '#' && (
                  <div className="mt-4 flex items-center gap-2 text-events-accent hover:text-news-primary transition-colors">
                    <span>🔗</span>
                    <span className="font-medium">Learn More</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Popular Cities */}
      <div className="max-w-7xl mx-auto px-6 mb-12">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-news-primary relative pl-4">
            Popular Cities
            <span className="absolute left-0 top-1/2 transform -translate-y-1/2 w-1 h-8 bg-events-accent rounded"></span>
          </h2>
        </div>

        <div className="flex overflow-x-auto gap-6 pb-4">
          {popularCities.map((city, index) => (
            <div
              key={index}
              className="min-w-[200px] h-32 rounded-xl overflow-hidden relative cursor-pointer hover:scale-105 transition-transform shadow-md"
            >
              <img
                src={city.image}
                alt={city.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/200x120/38a169/white?text=' + city.name;
                }}
              />
              <div className="absolute inset-0 bg-black bg-opacity-30 flex items-end">
                <div className="text-white font-semibold text-lg p-4">
                  {city.name}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Events;