import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import './newsHeadlines.css';

const NewsHeadlines = ({ category }) => {
  const [headlines, setHeadlines] = useState([]);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  
  const defaultCategory = "general";
  const currentCategory = category || defaultCategory;

  useEffect(() => {
    const fetchHeadlines = async () => {
      try {
        const response = await axios.get('https://gnews.io/api/v4/top-headlines', {
          params: {
            token: process.env.REACT_APP_GNEWS_API_KEY, // GNews API key
            lang: 'en',
            country: 'in',
            max: 7,
            topic: currentCategory
          },
        });
        setHeadlines(response.data.articles);
      } catch (err) {
        console.error("Error fetching news headlines:", err.response ? err.response.data : err.message);
        setError('Failed to fetch News Headlines. Please come back again later.');
      }
    };

    fetchHeadlines();
  }, [currentCategory]);

  const handleCategoryChange = (newCategory) => {
    navigate(`/${newCategory}`);
  };

  const handleArticleClick = (article) => {
    setSelectedArticle(article);
  };

  const closeModal = () => {
    setSelectedArticle(null);
  };

  const renderNavButtons = () => {
    const categories = ["sports", "technology", "politics", "health", "entertainment"];
    const isHome = location.pathname === "/";
    return (
      <>
        {!isHome && <button onClick={() => navigate('/')}>{'< Home'}</button>}
        {categories.map((cat) => (
          cat !== currentCategory && <button key={cat} onClick={() => handleCategoryChange(cat)}>{cat.charAt(0).toUpperCase() + cat.slice(1)}</button>
        ))}
      </>
    );
  };

  return (
    <div className="news-container">
      {error && <div className="error">{error}</div>}
   
      <div className="navbar">
        {renderNavButtons()}
      </div>
      <div className="news-headlines">
        <h2>Latest News Headlines</h2>
        <ul>
          {headlines.map((article, index) => (
            <li key={index} className="headline-item" onClick={() => handleArticleClick(article)}>
              <img src={article.image} alt={article.title} className="headline-image"/>
              <div className="headline-content">
                <h3>{article.title}</h3>
                <p>{article.source.name} - {new Date(article.publishedAt).toLocaleDateString()}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
      {selectedArticle && (
        <div className="modal" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <span className="close" onClick={closeModal}>&times;</span>
            <h2>{selectedArticle.title}</h2>
            <p>{selectedArticle.source.name} - {new Date(selectedArticle.publishedAt).toLocaleDateString()}</p>
            <p>{selectedArticle.description}</p>
            <p className="read-more"><a href={selectedArticle.url} target="_blank" rel="noopener noreferrer">Read more</a></p>
          </div>
        </div>
      )}
    </div>
  );
};

export default NewsHeadlines;
