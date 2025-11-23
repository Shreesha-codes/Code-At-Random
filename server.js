require('dotenv').config();
const express = require('express');
const cors = require('cors');

// Import routes
const skillGapRouter = require('./routes/skillGap');
const roadmapRouter = require('./routes/roadmap');
const newsRouter = require('./routes/news');

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check route
app.get('/', (req, res) => {
  res.json({ 
    message: 'Skill-Gap Analyzer API',
    version: '1.0.0',
    status: 'running'
  });
});

// Mount routes
app.use('/api/skill-gap', skillGapRouter);
app.use('/api/roadmap', roadmapRouter);
app.use('/api/news', newsRouter);

// 404 Handler - Must be after all routes
app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
    path: req.originalUrl
  });
});

// Error handling middleware - Must be last
app.use((err, req, res, next) => {
  console.error('Error:', err.stack);
  
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});

// Start server
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
  });
}

// Export app for deployment
module.exports = app;
