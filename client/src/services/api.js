import axios from 'axios';

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
 * Response interceptor for consistent error handling
 */
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const errorMessage = error.response?.data?.message || error.message || 'An error occurred';
    const statusCode = error.response?.status || 500;
    
    console.error(`API Error [${statusCode}]:`, errorMessage);
    
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
export const analyzeSkillGap = async (payload) => {
  const response = await apiClient.post('/skill-gap', payload);
  return response.data;
};

/**
 * Generate learning roadmap for a role
 * @param {Object} payload - { role }
 * @returns {Promise} Response data
 */
export const generateRoadmap = async (payload) => {
  const response = await apiClient.post('/roadmap', payload);
  return response.data;
};

/**
 * Get latest tech news from HackerNews
 * @returns {Promise} Response data
 */
export const getNews = async () => {
  const response = await apiClient.get('/news');
  return response.data;
};

export default apiClient;
