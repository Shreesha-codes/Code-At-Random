const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

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

/**
 * @route   POST /api/skill-gap
 * @desc    Analyze skill gaps with detailed recommendations
 * @access  Public
 */
router.post('/', async (req, res, next) => {
  try {
    let { targetRole, currentSkills } = req.body;

    // Validation
    if (!targetRole) {
      return res.status(400).json({
        success: false,
        message: 'targetRole is required'
      });
    }

    if (!currentSkills) {
      return res.status(400).json({
        success: false,
        message: 'currentSkills is required'
      });
    }

    // Normalize currentSkills: handle array or comma-separated string
    if (typeof currentSkills === 'string') {
      currentSkills = currentSkills.split(',').map(skill => skill.trim()).filter(skill => skill.length > 0);
    }

    if (!Array.isArray(currentSkills)) {
      return res.status(400).json({
        success: false,
        message: 'currentSkills must be an array or comma-separated string'
      });
    }

    // Load required skills from roleSkills.json
    const roleSkillsPath = path.join(__dirname, '../data/roleSkills.json');
    let roleSkillsData;
    
    try {
      const fileContent = fs.readFileSync(roleSkillsPath, 'utf8');
      roleSkillsData = JSON.parse(fileContent);
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'Failed to load role skills data'
      });
    }

    // Get required skills for target role
    const requiredSkills = roleSkillsData[targetRole];
    
    if (!requiredSkills) {
      return res.status(404).json({
        success: false,
        message: `Role '${targetRole}' not found. Available roles: ${Object.keys(roleSkillsData).join(', ')}`
      });
    }

    // Normalize for case-insensitive comparison
    const normalizedCurrentSkills = currentSkills.map(skill => skill.toLowerCase().trim());
    const normalizedRequiredSkills = requiredSkills.map(skill => skill.toLowerCase());

    // Compute matched skills
    const matchedSkills = requiredSkills.filter(skill => 
      normalizedCurrentSkills.includes(skill.toLowerCase())
    );

    // Compute missing skills
    const missingSkills = requiredSkills.filter(skill => 
      !normalizedCurrentSkills.includes(skill.toLowerCase())
    );

    // Generate recommendations based on missing skills
    let recommendations = '';
    if (missingSkills.length === 0) {
      recommendations = 'Congratulations! You have all the required skills for this role. Focus on building projects and gaining practical experience.';
    } else if (missingSkills.length === requiredSkills.length) {
      recommendations = 'You are just starting out. Begin with foundational skills and work your way up systematically.';
    } else if (missingSkills.length <= 2) {
      recommendations = `You are almost there! Focus on learning ${missingSkills.join(' and ')} to complete your skill set.`;
    } else {
      recommendations = `You have ${matchedSkills.length} out of ${requiredSkills.length} required skills. Focus on the missing skills to become job-ready.`;
    }

    // Suggested learning order based on typical prerequisites
    const suggestedLearningOrder = getSuggestedLearningOrder(missingSkills, targetRole);

    // Send response
    res.json({
      success: true,
      data: {
        matchedSkills,
        missingSkills,
        recommendations,
        suggestedLearningOrder
      }
    });

  } catch (error) {
    next(error);
  }
});

/**
 * Helper function to determine logical learning order
 */
function getSuggestedLearningOrder(missingSkills, targetRole) {
  // Define learning order based on prerequisites and dependencies
  const learningOrder = {
    'FrontendDeveloper': ['HTML', 'CSS', 'JavaScript', 'React', 'Git'],
    'Backend Developer': ['Java', 'SQL', 'APIs', 'Spring Boot', 'Git'],
    'Data Analyst': ['Excel', 'SQL', 'Python', 'Statistics', 'Dashboards']
  };

  const order = learningOrder[targetRole] || missingSkills;
  
  // Filter to only include missing skills in the correct order
  const normalizedMissingSkills = missingSkills.map(skill => skill.toLowerCase());
  
  return order.filter(skill => 
    normalizedMissingSkills.includes(skill.toLowerCase())
  );
}

module.exports = router;
