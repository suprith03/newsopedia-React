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
        const response = await axios.get('https://newsdata.io/api/1/news', { //fetch data
          params: {
            country: 'in',
            apiKey: process.env.REACT_APP_NEWSDATA_API_KEY, //api keys in .env
            language: 'en',
            category: 'top'
          },
        });
        setHeadlines(response.data.results.slice(0, 7)); // no.of headlines
      } catch (err) {
        console.error("Error fetching news headlines:", err.response ? err.response.data : err.message);
        setError('Failed to fetch news headlines. Please try again later.'); // if unable to fetch data , error occurs
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
      <h1>Top-News</h1>
      <div className="news-headlines">
        <h2>Latest News Headlines</h2>
        <ul>
          {headlines.map((article, index) => (
            <li key={index} className="headline-item" onClick={() => handleArticleClick(article)}>
              <h3>{article.title}</h3>
              <p>{article.source_id} - {new Date(article.pubDate).toLocaleDateString()}</p>
            </li>
          ))}
        </ul>
      </div>
      {selectedArticle && (
        <div className="modal" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <span className="close" onClick={closeModal}>&times;</span>
            <h2>{selectedArticle.title}</h2>
            <p>{selectedArticle.source_id} - {new Date(selectedArticle.pubDate).toLocaleDateString()}</p>
            <p>{selectedArticle.description}</p>
            <p className="read-more"><a href={selectedArticle.link} target="_blank" rel="noopener noreferrer">Read more</a></p>
          </div>
        </div>
      )}
    </div>
  );
};

export default NewsHeadlines;
