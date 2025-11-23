import React from 'react';
import '../styles/SkillGapResult.css';

const SkillGapResult = ({ skillGap }) => {
  if (!skillGap || !skillGap.data) {
    return (
      <div className="skill-gap-result">
        <h2>Skill Gap Analysis</h2>
        <p className="no-data">No data available</p>
      </div>
    );
  }

  const { matchedSkills, missingSkills, recommendations, suggestedLearningOrder } = skillGap.data;

  return (
    <div className="skill-gap-result">
      <h2>📊 Skill Gap Analysis</h2>

      <div className="section">
        <h3 className="section-title matched">✅ Matched Skills</h3>
        {matchedSkills && matchedSkills.length > 0 ? (
          <ul className="skill-list">
            {matchedSkills.map((skill, index) => (
              <li key={index} className="skill-item matched-item">{skill}</li>
            ))}
          </ul>
        ) : (
          <p className="empty-message">No matched skills</p>
        )}
      </div>

      <div className="section">
        <h3 className="section-title missing">❌ Missing Skills</h3>
        {missingSkills && missingSkills.length > 0 ? (
          <ul className="skill-list">
            {missingSkills.map((skill, index) => (
              <li key={index} className="skill-item missing-item">{skill}</li>
            ))}
          </ul>
        ) : (
          <p className="empty-message">No missing skills - You're ready!</p>
        )}
      </div>

      <div className="section">
        <h3 className="section-title">💡 Recommendations</h3>
        <p className="recommendation-text">{recommendations}</p>
      </div>

      <div className="section">
        <h3 className="section-title">📚 Suggested Learning Order</h3>
        {suggestedLearningOrder && suggestedLearningOrder.length > 0 ? (
          <ol className="learning-order-list">
            {suggestedLearningOrder.map((skill, index) => (
              <li key={index} className="learning-order-item">
                <span className="order-number">{index + 1}</span>
                <span className="order-skill">{skill}</span>
              </li>
            ))}
          </ol>
        ) : (
          <p className="empty-message">No learning order available</p>
        )}
      </div>
    </div>
  );
};

export default SkillGapResult;
