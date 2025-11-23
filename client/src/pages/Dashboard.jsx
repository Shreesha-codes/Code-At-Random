import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getNews } from '../services/api';
import SkillGapResult from '../components/SkillGapResult';
import RoadmapResult from '../components/RoadmapResult';
import NewsList from '../components/NewsList';
import '../styles/Dashboard.css';

const Dashboard = () => {
  const navigate = useNavigate();
  const [skillGap, setSkillGap] = useState(null);
  const [roadmap, setRoadmap] = useState(null);
  const [news, setNews] = useState([]);
  const [newsLoading, setNewsLoading] = useState(true);
  const [newsError, setNewsError] = useState('');
  const [targetRole, setTargetRole] = useState('');

  useEffect(() => {
    // Load data from localStorage
    const storedSkillGap = localStorage.getItem('skillGap');
    const storedRoadmap = localStorage.getItem('roadmap');
    const storedRole = localStorage.getItem('targetRole');

    if (!storedSkillGap || !storedRoadmap) {
      // Redirect to home if no data
      navigate('/');
      return;
    }

    try {
      setSkillGap(JSON.parse(storedSkillGap));
      setRoadmap(JSON.parse(storedRoadmap));
      setTargetRole(storedRole || 'Unknown');
    } catch (error) {
      console.error('Error parsing localStorage data:', error);
      navigate('/');
      return;
    }

    // Fetch news
    fetchNews();
  }, [navigate]);

  const fetchNews = async () => {
    setNewsLoading(true);
    setNewsError('');
    try {
      const response = await getNews();
      setNews(response.data || []);
    } catch (error) {
      console.error('Error fetching news:', error);
      setNewsError(error.message || 'Failed to load news');
    } finally {
      setNewsLoading(false);
    }
  };

  const handleStartOver = () => {
    localStorage.removeItem('skillGap');
    localStorage.removeItem('roadmap');
    localStorage.removeItem('targetRole');
    navigate('/');
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>Career Analysis Dashboard</h1>
        <p className="dashboard-subtitle">
          Analyzing path for: <strong>{targetRole}</strong>
        </p>
        <button onClick={handleStartOver} className="start-over-button">
          ← Start Over
        </button>
      </header>

      <div className="dashboard-layout">
        <div className="left-column">
          <SkillGapResult skillGap={skillGap} />
        </div>

        <div className="right-column">
          <RoadmapResult roadmap={roadmap} />
        </div>
      </div>

      <div className="bottom-section">
        <NewsList news={news} loading={newsLoading} error={newsError} />
      </div>
    </div>
  );
};

export default Dashboard;
