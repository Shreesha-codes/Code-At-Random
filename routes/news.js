const express = require('express');
const axios = require('axios');
const router = express.Router();

/**
 * @route   GET /api/news
 * @desc    Get latest tech news and articles
 * @access  Public
 */
router.get('/', async (req, res, next) => {
  try {
    const { category = 'technology', limit = 10 } = req.query;

    // Sample news data (in production, integrate with news API like NewsAPI.org)
    const sampleNews = [
      {
        id: 1,
        title: 'The Future of Web Development in 2024',
        description: 'Exploring upcoming trends in web development including AI integration and new frameworks.',
        source: 'Tech Crunch',
        url: 'https://example.com/article-1',
        publishedAt: new Date().toISOString(),
        category: 'development'
      },
      {
        id: 2,
        title: 'AI and Machine Learning: Latest Breakthroughs',
        description: 'Recent advances in artificial intelligence and their impact on various industries.',
        source: 'MIT Technology Review',
        url: 'https://example.com/article-2',
        publishedAt: new Date(Date.now() - 86400000).toISOString(),
        category: 'ai'
      },
      {
        id: 3,
        title: 'Cloud Computing Trends for Developers',
        description: 'How cloud technologies are shaping modern application development.',
        source: 'InfoQ',
        url: 'https://example.com/article-3',
        publishedAt: new Date(Date.now() - 172800000).toISOString(),
        category: 'cloud'
      },
      {
        id: 4,
        title: 'React 19: What\'s New and Exciting',
        description: 'A comprehensive look at the new features in React 19.',
        source: 'Dev.to',
        url: 'https://example.com/article-4',
        publishedAt: new Date(Date.now() - 259200000).toISOString(),
        category: 'development'
      },
      {
        id: 5,
        title: 'Cybersecurity Best Practices for 2024',
        description: 'Essential security practices every developer should know.',
        source: 'Security Weekly',
        url: 'https://example.com/article-5',
        publishedAt: new Date(Date.now() - 345600000).toISOString(),
        category: 'security'
      }
    ];

    // Filter by category if specified
    let filteredNews = sampleNews;
    if (category !== 'all') {
      filteredNews = sampleNews.filter(article => 
        article.category === category || category === 'technology'
      );
    }

    // Limit results
    const limitedNews = filteredNews.slice(0, parseInt(limit));

    res.json({
      success: true,
      count: limitedNews.length,
      data: limitedNews
    });

  } catch (error) {
    next(error);
  }
});

/**
 * @route   GET /api/news/categories
 * @desc    Get available news categories
 * @access  Public
 */
router.get('/categories', (req, res, next) => {
  try {
    const categories = [
      { id: 1, name: 'Development', slug: 'development' },
      { id: 2, name: 'AI & Machine Learning', slug: 'ai' },
      { id: 3, name: 'Cloud Computing', slug: 'cloud' },
      { id: 4, name: 'Cybersecurity', slug: 'security' },
      { id: 5, name: 'Mobile', slug: 'mobile' },
      { id: 6, name: 'DevOps', slug: 'devops' }
    ];

    res.json({
      success: true,
      count: categories.length,
      data: categories
    });
  } catch (error) {
    next(error);
  }
});

/**
 * @route   GET /api/news/:id
 * @desc    Get single news article by ID
 * @access  Public
 */
router.get('/:id', (req, res, next) => {
  try {
    const { id } = req.params;

    // Sample detailed article (in production, fetch from database)
    const article = {
      id: parseInt(id),
      title: 'The Future of Web Development in 2024',
      description: 'Exploring upcoming trends in web development including AI integration and new frameworks.',
      content: 'Full article content would go here...',
      author: 'John Doe',
      source: 'Tech Crunch',
      url: 'https://example.com/article-1',
      imageUrl: 'https://example.com/image.jpg',
      publishedAt: new Date().toISOString(),
      category: 'development',
      tags: ['web development', 'AI', 'frameworks']
    };

    res.json({
      success: true,
      data: article
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
