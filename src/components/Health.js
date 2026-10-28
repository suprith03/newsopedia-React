import React from 'react';
import { useNavigate } from 'react-router-dom';
import NewsHeadlines from './NewsHeadlines';
import './Health.css';

const Health = () => {
  const navigate = useNavigate();

  return (
    <main className="page-shell">
      <h1 onClick={() => navigate('/')}>Health</h1>
      <NewsHeadlines category="health" />
    </main>
  );
};

export default Health;
