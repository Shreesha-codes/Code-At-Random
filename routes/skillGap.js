const express = require('express');
const router = express.Router();

/**
 * @route   POST /api/skill-gap/analyze
 * @desc    Analyze skill gaps between current and target skills
 * @access  Public
 */
router.post('/analyze', async (req, res, next) => {
  try {
    const { currentSkills, targetRole } = req.body;

    // Validation
    if (!currentSkills || !Array.isArray(currentSkills)) {
      return res.status(400).json({
        success: false,
        message: 'Please provide current skills as an array'
      });
    }

    if (!targetRole) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a target role'
      });
    }

    // Sample target role skills (in production, fetch from database)
    const targetSkills = {
      'Full Stack Developer': ['JavaScript', 'React', 'Node.js', 'Express', 'MongoDB', 'REST API', 'Git'],
      'Frontend Developer': ['HTML', 'CSS', 'JavaScript', 'React', 'TypeScript', 'Redux', 'Webpack'],
      'Backend Developer': ['Node.js', 'Express', 'MongoDB', 'PostgreSQL', 'REST API', 'Docker', 'AWS'],
      'Data Scientist': ['Python', 'Machine Learning', 'Pandas', 'NumPy', 'SQL', 'Statistics', 'TensorFlow']
    };

    const requiredSkills = targetSkills[targetRole] || [];
    
    // Calculate skill gaps
    const normalizedCurrentSkills = currentSkills.map(skill => skill.toLowerCase().trim());
    const normalizedRequiredSkills = requiredSkills.map(skill => skill.toLowerCase());
    
    const missingSkills = requiredSkills.filter(skill => 
      !normalizedCurrentSkills.includes(skill.toLowerCase())
    );
    
    const matchedSkills = requiredSkills.filter(skill => 
      normalizedCurrentSkills.includes(skill.toLowerCase())
    );

    const gapPercentage = requiredSkills.length > 0 
      ? Math.round((missingSkills.length / requiredSkills.length) * 100)
      : 0;

    res.json({
      success: true,
      data: {
        targetRole,
        requiredSkills,
        currentSkills,
        matchedSkills,
        missingSkills,
        gapPercentage,
        recommendation: gapPercentage > 50 
          ? 'Consider starting with fundamentals and building up gradually'
          : gapPercentage > 20
          ? 'You have a good foundation. Focus on the missing skills'
          : 'You are well-prepared for this role!'
      }
    });

  } catch (error) {
    next(error);
  }
});

/**
 * @route   GET /api/skill-gap/roles
 * @desc    Get list of available roles
 * @access  Public
 */
router.get('/roles', (req, res, next) => {
  try {
    const roles = [
      { id: 1, name: 'Full Stack Developer', category: 'Development' },
      { id: 2, name: 'Frontend Developer', category: 'Development' },
      { id: 3, name: 'Backend Developer', category: 'Development' },
      { id: 4, name: 'Data Scientist', category: 'Data Science' },
      { id: 5, name: 'DevOps Engineer', category: 'Operations' },
      { id: 6, name: 'Mobile Developer', category: 'Development' }
    ];

    res.json({
      success: true,
      count: roles.length,
      data: roles
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
