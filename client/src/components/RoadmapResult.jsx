import React from 'react';
import '../styles/RoadmapResult.css';

const RoadmapResult = ({ roadmap }) => {
  if (!roadmap || !roadmap.data || !roadmap.data.roadmap) {
    return (
      <div className="roadmap-result">
        <h2>Learning Roadmap</h2>
        <p className="no-data">No roadmap available</p>
      </div>
    );
  }

  const { role, roadmap: phases } = roadmap.data;

  return (
    <div className="roadmap-result">
      <h2>🗺️ Learning Roadmap</h2>
      <p className="role-title">Target Role: <strong>{role}</strong></p>

      <div className="phases-container">
        {phases.map((phase, index) => (
          <div key={index} className="phase-card">
            <div className="phase-header">
              <h3 className="phase-title">{phase.phase}</h3>
              <span className="phase-duration">{phase.duration}</span>
            </div>
            <ul className="phase-items">
              {phase.items.map((item, itemIndex) => (
                <li key={itemIndex} className="phase-item">
                  <span className="bullet">•</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RoadmapResult;
