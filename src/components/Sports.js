import React from 'react';
import { useNavigate } from 'react-router-dom';
import NewsHeadlines from './newsHeadlines';
import './Sports.css';

const Sports = () => {
  const navigate = useNavigate();

  return (
    <div className="news-container">
      <h1 onClick={() => navigate('/')}>Sports ⚽️</h1>
      <NewsHeadlines category="sports" />
    </div>
  );
};

export default Sports;
