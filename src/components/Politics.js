import React from 'react';
import { useNavigate } from 'react-router-dom';
import NewsHeadlines from './NewsHeadlines';
import './Politics.css';

const Politics = () => {
  const navigate = useNavigate();

  return (
    <div className="news-container">
      <h1 onClick={() => navigate('/')}>Politics</h1>
      <NewsHeadlines category="politics" />
    </div>
  );
};

export default Politics;
