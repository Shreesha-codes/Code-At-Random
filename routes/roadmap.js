const express = require('express');
const router = express.Router();
const { generateRoadmap } = require('../utils/roadmapGenerator');

/**
 * @route   POST /api/roadmap/generate
 * @desc    Generate a personalized learning roadmap
 * @access  Public
 */
router.post('/generate', async (req, res, next) => {
  try {
    const { missingSkills, targetRole, timeframe } = req.body;

    // Validation
    if (!missingSkills || !Array.isArray(missingSkills)) {
      return res.status(400).json({
        success: false,
        message: 'Please provide missing skills as an array'
      });
    }

    if (!targetRole) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a target role'
      });
    }

    // Sample learning resources (in production, fetch from database)
    const learningResources = {
      'JavaScript': {
        beginner: ['freeCodeCamp', 'MDN Web Docs', 'JavaScript.info'],
        intermediate: ['You Don\'t Know JS', 'Eloquent JavaScript'],
        duration: '4-6 weeks'
      },
      'React': {
        beginner: ['React Official Docs', 'React for Beginners'],
        intermediate: ['Advanced React Patterns', 'React Performance'],
        duration: '3-4 weeks'
      },
      'Node.js': {
        beginner: ['Node.js Official Docs', 'The Net Ninja Node.js'],
        intermediate: ['Node.js Design Patterns', 'Advanced Node.js'],
        duration: '4-5 weeks'
      },
      'Python': {
        beginner: ['Python.org Tutorial', 'Automate the Boring Stuff'],
        intermediate: ['Fluent Python', 'Effective Python'],
        duration: '3-4 weeks'
      }
    };

    // Generate roadmap phases
    const roadmap = missingSkills.map((skill, index) => {
      const resources = learningResources[skill] || {
        beginner: ['Online courses', 'Official documentation'],
        intermediate: ['Advanced tutorials', 'Practice projects'],
        duration: '3-4 weeks'
      };

      return {
        phase: index + 1,
        skill,
        duration: resources.duration,
        resources: resources.beginner,
        advancedResources: resources.intermediate,
        milestones: [
          `Understand ${skill} fundamentals`,
          `Build a project using ${skill}`,
          `Contribute to open source using ${skill}`
        ]
      };
    });

    const totalDuration = roadmap.length * 4; // Average 4 weeks per skill

    res.json({
      success: true,
      data: {
        targetRole,
        totalSkills: missingSkills.length,
        estimatedDuration: `${totalDuration} weeks`,
        roadmap,
        tips: [
          'Practice daily for at least 1-2 hours',
          'Build projects to reinforce learning',
          'Join online communities for support',
          'Document your learning journey'
        ]
      }
    });

  } catch (error) {
    next(error);
  }
});

/**
 * @route   GET /api/roadmap/templates
 * @desc    Get roadmap templates for different roles
 * @access  Public
 */
router.get('/templates', (req, res, next) => {
  try {
    const templates = [
      {
        role: 'Full Stack Developer',
        duration: '6-12 months',
        phases: [
          { name: 'Frontend Basics', skills: ['HTML', 'CSS', 'JavaScript'] },
          { name: 'Frontend Framework', skills: ['React', 'Redux'] },
          { name: 'Backend Development', skills: ['Node.js', 'Express', 'MongoDB'] },
          { name: 'DevOps & Deployment', skills: ['Git', 'Docker', 'AWS'] }
        ]
      },
      {
        role: 'Data Scientist',
        duration: '8-12 months',
        phases: [
          { name: 'Programming Foundation', skills: ['Python', 'SQL'] },
          { name: 'Data Analysis', skills: ['Pandas', 'NumPy', 'Matplotlib'] },
          { name: 'Machine Learning', skills: ['Scikit-learn', 'TensorFlow'] },
          { name: 'Advanced Topics', skills: ['Deep Learning', 'NLP', 'Computer Vision'] }
        ]
      }
    ];

    res.json({
      success: true,
      count: templates.length,
      data: templates
    });
  } catch (error) {
    next(error);
  }
});

/**
 * @route   POST /api/roadmap
 * @desc    Generate a 3-phase learning roadmap for a role
 * @access  Public
 */
router.post('/', async (req, res, next) => {
  try {
    const { role } = req.body;

    // Validation
    if (!role) {
      return res.status(400).json({
        success: false,
        message: 'role is required'
      });
    }

    // Generate roadmap using utility function
    const roadmap = generateRoadmap(role);

    res.json({
      success: true,
      data: {
        role,
        roadmap
      }
    });

  } catch (error) {
    next(error);
  }
});

module.exports = router;
