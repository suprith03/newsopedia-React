import React from 'react';
import { useNavigate } from 'react-router-dom';
import NewsHeadlines from './newsHeadlines';
import './Health.css';

const Health = () => {
  const navigate = useNavigate();

  return (
    <div className="news-container">
      <h1 onClick={() => navigate('/')}>Health 😷</h1>
      <NewsHeadlines category="health" />
    </div>
  );
};

export default Health;
