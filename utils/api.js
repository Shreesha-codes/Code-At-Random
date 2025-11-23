const axios = require('axios');

/**
 * Create axios instance with base configuration
 */
const apiClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});

/**
 * Request interceptor for logging (optional)
 */
apiClient.interceptors.request.use(
  (config) => {
    // You can add auth tokens here if needed
    // config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

/**
 * Response interceptor for consistent error handling
 */
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Consistent error handling
    const errorMessage = error.response?.data?.message || error.message || 'An error occurred';
    const statusCode = error.response?.status || 500;
    
    console.error(`API Error [${statusCode}]:`, errorMessage);
    
    // Return structured error
    return Promise.reject({
      message: errorMessage,
      status: statusCode,
      data: error.response?.data
    });
  }
);

/**
 * Analyze skill gap between current skills and target role
 * @param {Object} payload - { targetRole, currentSkills }
 * @returns {Promise} Response data
 */
const analyzeSkillGap = async (payload) => {
  try {
    const response = await apiClient.post('/skill-gap', payload);
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * Generate learning roadmap for a role
 * @param {Object} payload - { role }
 * @returns {Promise} Response data
 */
const generateRoadmap = async (payload) => {
  try {
    const response = await apiClient.post('/roadmap', payload);
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * Get latest tech news from HackerNews
 * @returns {Promise} Response data
 */
const getNews = async () => {
  try {
    const response = await apiClient.get('/news');
    return response.data;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  analyzeSkillGap,
  generateRoadmap,
  getNews,
  apiClient
};
