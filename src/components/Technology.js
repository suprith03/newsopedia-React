import React from 'react';
import { useNavigate } from 'react-router-dom';
import NewsHeadlines from './NewsHeadlines';
import './Technology.css';

const Technology = () => {
  const navigate = useNavigate();

  return (
    <main className="page-shell">
      <h1 onClick={() => navigate('/')}>Technology</h1>
      <NewsHeadlines category="technology" />
    </main>
  );
};

export default Technology;
