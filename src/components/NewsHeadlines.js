import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import './NewsHeadlines.css';

const NewsHeadlines = ({ category }) => {
  const [headlines, setHeadlines] = useState([]);
  const [totalArticles, setTotalArticles] = useState(0);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [error, setError] = useState(null);
  const [theme, setTheme] = useState(() => (
    window.localStorage.getItem('news-theme') === 'dark' ? 'dark' : 'light'
  ));
  const navigate = useNavigate();
  const location = useLocation();
  
  const defaultCategory = "general";
  const currentCategory = category || defaultCategory;
  const pageSize = 8;
  const totalPages = Math.max(1, Math.ceil(totalArticles / pageSize));

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    window.localStorage.setItem('news-theme', theme);
  }, [theme]);

  useEffect(() => {
    let isCurrentRequest = true;

    const fetchHeadlines = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await axios.get('/.netlify/functions/news', {
          params: {
            category: currentCategory,
            lang: 'en',
            country: 'in',
            max: pageSize,
            page
          },
        });
        if (isCurrentRequest) {
          setHeadlines(response.data.articles);
          setTotalArticles(response.data.totalArticles || 0);
        }
      } catch (err) {
        if (isCurrentRequest) {
          console.error("Error fetching news headlines:", err.response ? err.response.data : err.message);
          setError('Failed to fetch News Headlines. Please come back again later.');
        }
      } finally {
        if (isCurrentRequest) {
          setIsLoading(false);
        }
      }
    };

    fetchHeadlines();
    return () => {
      isCurrentRequest = false;
    };
  }, [currentCategory, page]);

  const handleCategoryChange = (newCategory) => {
    navigate(`/${newCategory}`);
  };

  const handleArticleClick = (article) => {
    setSelectedArticle(article);
  };

  const closeModal = () => {
    setSelectedArticle(null);
  };

  const toggleTheme = () => {
    setTheme((currentTheme) => currentTheme === 'light' ? 'dark' : 'light');
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
        <button
          className="theme-toggle"
          type="button"
          onClick={toggleTheme}
          aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
          role="switch"
          aria-checked={theme === 'dark'}
        >
          <span className="theme-toggle-label">{theme === 'light' ? 'Light' : 'Dark'}</span>
          <span className="theme-switch-track" aria-hidden="true">
            <span className="theme-switch-thumb">{theme === 'light' ? '☀' : '☾'}</span>
          </span>
        </button>
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
        <ul aria-busy={isLoading}>
          {headlines.map((article, index) => (
            <li
              key={article.url || `${article.title}-${index}`}
              className="headline-item"
              onClick={() => handleArticleClick(article)}
              tabIndex={0}
              onKeyDown={(event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                  event.preventDefault();
                  handleArticleClick(article);
                }
              }}
            >
              <img src={article.image} alt="" className="headline-image"/>
              <div className="headline-content">
                <h3>{article.title}</h3>
                <p>{article.source.name} - {new Date(article.publishedAt).toLocaleDateString()}</p>
              </div>
            </li>
          ))}
        </ul>
        <nav className="pagination" aria-label="Headlines pages">
          <button
            type="button"
            className="pagination-button"
            onClick={() => setPage((currentPage) => Math.max(1, currentPage - 1))}
            disabled={page === 1 || isLoading}
            aria-label="Previous page of headlines"
          >
            <span aria-hidden="true">←</span>
            <span>Previous</span>
          </button>
          <span className="pagination-status" aria-live="polite">
            Page {page} of {totalPages}
          </span>
          <button
            type="button"
            className="pagination-button"
            onClick={() => setPage((currentPage) => Math.min(totalPages, currentPage + 1))}
            disabled={page >= totalPages || isLoading}
            aria-label="Next page of headlines"
          >
            <span>Next</span>
            <span aria-hidden="true">→</span>
          </button>
        </nav>
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
