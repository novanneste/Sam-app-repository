import React from 'react';
import './Highlights.css';

function Highlights({ highlights }) {
  const getHighlightIcon = (type) => {
    switch (type) {
      case 'success':
        return '✅';
      case 'warning':
        return '⚠️';
      case 'info':
        return 'ℹ️';
      default:
        return '💡';
    }
  };

  return (
    <div className="highlights">
      <h2>🤖 AI Highlights</h2>
      <p className="highlights-subtitle">
        Personalized insights based on your activity
      </p>
      
      {highlights.length === 0 ? (
        <div className="no-highlights">
          <p>Start logging your water and meals to get AI-powered insights!</p>
        </div>
      ) : (
        <div className="highlights-list">
          {highlights.map((highlight) => (
            <div key={highlight.id} className={`highlight-card ${highlight.type}`}>
              <div className="highlight-icon">
                {getHighlightIcon(highlight.type)}
              </div>
              <div className="highlight-content">
                <h3>{highlight.title}</h3>
                <p>{highlight.message}</p>
              </div>
            </div>
          ))}
        </div>
      )}
      
      <div className="ai-note">
        <p>
          💡 <strong>Note:</strong> These highlights are currently simulated. 
          In production, this would integrate with real AI services like 
          OpenAI or Claude for personalized health recommendations.
        </p>
      </div>
    </div>
  );
}

export default Highlights;
