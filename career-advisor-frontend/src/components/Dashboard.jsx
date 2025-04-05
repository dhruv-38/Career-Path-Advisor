// src/components/Dashboard.jsx
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Dashboard = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="dashboard-container">
      <h2>Welcome, {user?.name || 'User'}!</h2>
      
      <div className="dashboard-content">
        <p>
          This platform helps you discover career paths that match your skills and interests.
        </p>
        
        <div className="dashboard-cards">
          <div className="dashboard-card">
            <h3>Your Profile</h3>
            <p>Update your skills and career interests to get personalized recommendations.</p>
            <Link to="/profile" className="card-link">
              Manage Profile
            </Link>
          </div>
          
          <div className="dashboard-card">
            <h3>Career Recommendations</h3>
            <p>Get AI-powered career suggestions based on your profile information.</p>
            <Link to="/recommendations" className="card-link">
              View Recommendations
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
