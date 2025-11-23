import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { analyzeSkillGap, generateRoadmap } from '../services/api';
import '../styles/CareerInput.css';

const CareerInput = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    targetRole: '',
    currentSkills: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validation
    if (!formData.targetRole.trim()) {
      setError('Please enter a target role');
      return;
    }

    if (!formData.currentSkills.trim()) {
      setError('Please enter your current skills');
      return;
    }

    setLoading(true);

    try {
      // Step 1: Convert currentSkills to array (split by comma)
      const skillsArray = formData.currentSkills
        .split(',')
        .map(skill => skill.trim())
        .filter(skill => skill.length > 0);

      if (skillsArray.length === 0) {
        setError('Please enter at least one skill');
        setLoading(false);
        return;
      }

      // Step 2: Call both APIs
      const [skillGapResult, roadmapResult] = await Promise.all([
        analyzeSkillGap({
          targetRole: formData.targetRole,
          currentSkills: skillsArray
        }),
        generateRoadmap({
          role: formData.targetRole
        })
      ]);

      // Step 3: Save results in localStorage
      localStorage.setItem('skillGap', JSON.stringify(skillGapResult));
      localStorage.setItem('roadmap', JSON.stringify(roadmapResult));
      localStorage.setItem('targetRole', formData.targetRole);

      // Step 4: Navigate to dashboard
      navigate('/dashboard');

    } catch (err) {
      console.error('Error analyzing career path:', err);
      setError(err.message || 'Failed to analyze career path. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="career-input-container">
      {/* Animated planets */}
      <div className="planet planet-1"></div>
      <div className="planet planet-2"></div>
      <div className="planet planet-3"></div>
      <div className="planet planet-4"></div>
      
      <div className="career-input-card">
        <h1>🚀 Analyze Your Career Path</h1>
        <p className="subtitle">
          Enter your target role and current skills to get personalized insights
        </p>

        <form onSubmit={handleSubmit} className="career-form">
          <div className="form-group">
            <label htmlFor="targetRole">Target Role *</label>
            <input
              type="text"
              id="targetRole"
              name="targetRole"
              value={formData.targetRole}
              onChange={handleChange}
              placeholder="e.g., frontend developer, BACKEND DEVELOPER, data analyst"
              className="input-field"
              disabled={loading}
            />
            <small className="hint">
              Available roles (case-insensitive): FrontendDeveloper, Backend Developer, Data Analyst
            </small>
          </div>

          <div className="form-group">
            <label htmlFor="currentSkills">Current Skills *</label>
            <textarea
              id="currentSkills"
              name="currentSkills"
              value={formData.currentSkills}
              onChange={handleChange}
              placeholder="e.g., html, CSS, JAVASCRIPT, git (case-insensitive)"
              className="textarea-field"
              rows="4"
              disabled={loading}
            />
            <small className="hint">
              Enter your skills separated by commas
            </small>
          </div>

          {error && (
            <div className="error-message">
             
              {error}
            </div>
          )}

          <button
            type="submit"
            className="submit-button"
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="spinner"></span>
                Analyzing...
              </>
            ) : (
              'Analyze My Career Path'
            )}
          </button>
        </form>

        <div className="example-section">
          <h3>Example Input</h3>
          <div className="example-box">
            <p><strong>Target Role:</strong> Backend Developer</p>
            <p><strong>Current Skills:</strong> Java, Git, SQL</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CareerInput;
