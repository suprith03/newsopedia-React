import React from 'react';
import { useNavigate } from 'react-router-dom';
import NewsHeadlines from './NewsHeadlines';
import './Technology.css';

const Technology = () => {
  const navigate = useNavigate();

  return (
    <div className="news-container">
      <h1 onClick={() => navigate('/')}>Technology</h1>
      <NewsHeadlines category="technology" />
    </div>
  );
};

export default Technology;
