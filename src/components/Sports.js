import React from 'react';
import { useNavigate } from 'react-router-dom';
import NewsHeadlines from './NewsHeadlines';
import './Sports.css';

const Sports = () => {
  const navigate = useNavigate();

  return (
    <main className="page-shell">
      <h1 onClick={() => navigate('/')}>Sports</h1>
      <NewsHeadlines category="sports" />
    </main>
  );
};

export default Sports;
