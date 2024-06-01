import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './newsHeadlines.css';

const NewsHeadlines = () => {
  const [headlines, setHeadlines] = useState([]);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHeadlines = async () => {
      try {
        const response = await axios.get('https://newsapi.org/v2/top-headlines', { //fetch data
          params: {
            country: 'in',
            apiKey: process.env.REACT_APP_NEWS_API_KEY,//fetch api-key from .env (hidden in .gitignore)
          },
        });
        setHeadlines(response.data.articles.slice(0, 7)); 
      } catch (err) {
        console.error("Error fetching news headlines:", err.response ? err.response.data : err.message);
        setError('Failed to fetch news headlines. Please try again later.'); // if cannot fetch data, error meessage.
      }
    };

    fetchHeadlines();
  }, []);

  const handleArticleClick = (article) => {
    setSelectedArticle(article);
  };

  const closeModal = () => {
    setSelectedArticle(null);
  };

  return (
    <div className="news-container">
      {error && <div className="error">{error}</div>}
      <h1>Today's News.. </h1>
      <div className="news-headlines">
        <h2>Latest News Headlines</h2>
        <ul>
          {headlines.map((article, index) => (
            <li key={index} className="headline-item" onClick={() => handleArticleClick(article)}>
              <h3>{article.title}</h3>
              <p>{article.source.name} - {new Date(article.publishedAt).toLocaleDateString()}</p>
            </li>
          ))}
        </ul>
      </div>
      {selectedArticle && (
        <div className="model" onClick={closeModal}>
          <div className="model-content" onClick={(e) => e.stopPropagation()}>
            <span className="close" onClick={closeModal}>&times;</span>
            <h2>{selectedArticle.title}</h2>
            <p>{selectedArticle.source.name} - {new Date(selectedArticle.publishedAt).toLocaleDateString()}</p>
            <p>{selectedArticle.content || selectedArticle.description}</p>
            <p className="read-more"><a href={selectedArticle.url} target="_blank" rel="noopener noreferrer">Read more</a></p>
          </div>
        </div>
      )}
    </div>
  );
};

export default NewsHeadlines;
