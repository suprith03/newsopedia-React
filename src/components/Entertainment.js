import React from 'react';
import { useNavigate } from 'react-router-dom';
import NewsHeadlines from './NewsHeadlines';
import './Entertainment.css';

const Entertainment = () => {
  const navigate = useNavigate();

  return (
    <main className="page-shell">
      <h1 onClick={() => navigate('/')}>Entertainment</h1>
      <NewsHeadlines category="entertainment" />
    </main>
  );
};

export default Entertainment;
