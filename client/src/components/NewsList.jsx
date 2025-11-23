import React from 'react';
import '../styles/NewsList.css';

const NewsList = ({ news, loading, error }) => {
  if (loading) {
    return (
      <div className="news-list">
        <h2> Latest Tech News</h2>
        <div className="loading-state">
          <div className="spinner"></div>
          <p>Loading news...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="news-list">
        <h2> Latest Tech News</h2>
        <div className="error-state">
          <p> {error}</p>
        </div>
      </div>
    );
  }

  if (!news || news.length === 0) {
    return (
      <div className="news-list">
        <h2> Latest Tech News</h2>
        <p className="no-data">No news available</p>
      </div>
    );
  }

  return (
    <div className="news-list">
      <h2> Latest Tech News</h2>
      <div className="news-grid">
        {news.map((article) => (
          <div key={article.id} className="news-card">
            <a 
              href={article.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="news-title"
            >
              {article.title}
            </a>
            <div className="news-meta">
              <span className="news-score"> {article.score} points</span>
              <span className="news-author"> {article.by}</span>
              <span className="news-type"> {article.type}</span>
            </div>
            <div className="news-date">
               {new Date(article.time * 1000).toLocaleString()}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewsList;
