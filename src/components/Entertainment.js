import React from 'react';
import { useNavigate } from 'react-router-dom';
import NewsHeadlines from './newsHeadlines';
import './Entertainment.css';

const Entertainment = () => {
  const navigate = useNavigate();

  return (
    <div className="news-container">
      <h1 onClick={() => navigate('/')}>Entertainment</h1>
      <NewsHeadlines category="entertainment" />
    </div>
  );
};

export default Entertainment;
