import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import WorldNews from './pages/WorldNews';
import Sports from './pages/Sports';
import Entertainment from './pages/Entertainment';
import Events from './pages/Events';
import FakeNews from './pages/FakeNews';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/world" element={<WorldNews />} />
          <Route path="/sports" element={<Sports />} />
          <Route path="/entertainment" element={<Entertainment />} />
          <Route path="/events" element={<Events />} />
          <Route path="/fake-news" element={<FakeNews />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;