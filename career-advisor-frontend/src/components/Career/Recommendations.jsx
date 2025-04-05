// src/components/Career/Recommendations.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { careerService } from '../../services/api';

const Recommendations = () => {
  const [recommendations, setRecommendations] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchRecommendations();
  }, []);

  const fetchRecommendations = async () => {
    try {
      setLoading(true);
      const response = await careerService.getRecommendations();
      setRecommendations(response.data.recommendations);
      setError('');
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Failed to load recommendations';
      setError(errorMessage);
      
      // If user needs to update profile first
      if (errorMessage.includes('update your profile')) {
        setTimeout(() => {
          navigate('/profile');
        }, 3000);
      }
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="loading">Generating career recommendations...</div>;
  }

  return (
    <div className="recommendations-container">
      <h2>Your Career Recommendations</h2>
      
      {error ? (
        <div className="error-container">
          <div className="error-message">{error}</div>
          {error.includes('update your profile') && (
            <p>Redirecting to profile page to update your information...</p>
          )}
        </div>
      ) : (
        <div className="recommendations-content">
          {recommendations.split('\n').map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
      )}
      
      <button onClick={fetchRecommendations} className="refresh-button">
        Refresh Recommendations
      </button>
    </div>
  );
};

export default Recommendations;
