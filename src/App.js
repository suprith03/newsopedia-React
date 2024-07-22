import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import NewsHeadlines from './components/newsHeadlines';
import Sports from './components/Sports';
import Entertainment from './components/Entertainment';
import Politics from './components/Politics';
import Health from './components/Health';
import Technology from './components/Technology';

const Header = () => {
  const location = useLocation();
  return location.pathname === '/' ? <h1>Breaking News</h1> : null;
};

const App = () => {
  return (
    <Router>
      <div>
        <Header />
        <Routes>
          <Route path="/sports" element={<Sports />} />
          <Route path="/entertainment" element={<Entertainment />} />
          <Route path="/politics" element={<Politics />} />
          <Route path="/Health" element={<Health />} />
          <Route path="/technology" element={<Technology />} />
          <Route path="/" element={<NewsHeadlines category="general" />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
