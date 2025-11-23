/**
 * Generate a 3-phase learning roadmap for a specific role
 * @param {string} role - Target role
 * @returns {Array} Array of 3 phases with duration and items
 */
function generateRoadmap(role) {
  const roadmaps = {
    'FrontendDeveloper': [
      {
        phase: 'Phase 1',
        duration: '1–2 months',
        items: ['HTML', 'CSS', 'JavaScript Basics', 'Git', 'Responsive Design']
      },
      {
        phase: 'Phase 2',
        duration: '2 months',
        items: ['React', 'Component Architecture', 'State Management', 'APIs Integration', 'Build Tools']
      },
      {
        phase: 'Phase 3',
        duration: '1–2 months',
        items: ['Portfolio Projects', 'Deployment (Vercel/Netlify)', 'Performance Optimization', 'Testing Basics']
      }
    ],
    'Backend Developer': [
      {
        phase: 'Phase 1',
        duration: '1–2 months',
        items: ['Java', 'OOP', 'Git', 'Basic Algorithms', 'SQL Fundamentals']
      },
      {
        phase: 'Phase 2',
        duration: '2 months',
        items: ['Spring Boot', 'SQL', 'APIs', 'Database Design', 'Authentication']
      },
      {
        phase: 'Phase 3',
        duration: '1–2 months',
        items: ['Deployment', 'Projects', 'System Design Basics', 'Docker', 'Cloud Basics']
      }
    ],
    'Data Analyst': [
      {
        phase: 'Phase 1',
        duration: '1–2 months',
        items: ['Excel', 'SQL Basics', 'Statistics Fundamentals', 'Data Cleaning', 'Git']
      },
      {
        phase: 'Phase 2',
        duration: '2 months',
        items: ['Python', 'Pandas', 'Data Visualization', 'Dashboards', 'Advanced SQL']
      },
      {
        phase: 'Phase 3',
        duration: '1–2 months',
        items: ['Real Projects', 'Tableau/Power BI', 'Reporting', 'Portfolio Building', 'Business Metrics']
      }
    ]
  };

  // Return role-specific roadmap or generic fallback
  return roadmaps[role] || [
    {
      phase: 'Phase 1',
      duration: '1–2 months',
      items: ['Basics', 'Fundamentals', 'Core Concepts', 'Version Control', 'Problem Solving']
    },
    {
      phase: 'Phase 2',
      duration: '2 months',
      items: ['Tools & Technologies', 'Frameworks', 'Best Practices', 'Advanced Concepts', 'APIs']
    },
    {
      phase: 'Phase 3',
      duration: '1–2 months',
      items: ['Projects & Portfolio', 'Deployment', 'Testing', 'System Design', 'Interview Prep']
    }
  ];
}

module.exports = { generateRoadmap };
