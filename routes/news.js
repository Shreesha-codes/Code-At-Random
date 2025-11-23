const express = require('express');
const axios = require('axios');
const router = express.Router();

/**
 * @route   GET /api/news
 * @desc    Get latest tech news from HackerNews API
 * @access  Public
 */
router.get('/', async (req, res, next) => {
  try {
    // Step 1: Fetch top stories
    const topStoriesResponse = await axios.get('https://hacker-news.firebaseio.com/v0/topstories.json');
    const topStoryIds = topStoriesResponse.data;

    // Step 2: Select first 5 IDs
    const selectedIds = topStoryIds.slice(0, 5);

    // Step 3: Fetch full story for each ID
    const storyPromises = selectedIds.map(id => 
      axios.get(`https://hacker-news.firebaseio.com/v0/item/${id}.json`)
    );

    const storyResponses = await Promise.all(storyPromises);

    // Step 4: Format and return array of objects
    const news = storyResponses.map(response => {
      const story = response.data;
      return {
        id: story.id,
        title: story.title,
        url: story.url || `https://news.ycombinator.com/item?id=${story.id}`,
        score: story.score,
        time: story.time,
        type: story.type,
        by: story.by
      };
    });

    res.json({
      success: true,
      count: news.length,
      data: news
    });

  } catch (error) {
    console.error('Error fetching HackerNews data:', error.message);
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch news from HackerNews API',
      error: error.message
    });
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
