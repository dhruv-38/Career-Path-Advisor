// src/components/User/ProfileForm.jsx
import React, { useState } from 'react';
import { userService } from '../../services/api';

const ProfileForm = ({ profile, onSuccess, onCancel }) => {
  const [formData, setFormData] = useState({
    name: profile.name || '',
    careerInterests: profile.careerInterests || '',
    skills: profile.skills || ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const response = await userService.updateProfile(formData);
      onSuccess(response.data.user);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update profile. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="profile-form">
      {error && <div className="error-message">{error}</div>}
      
      <div className="form-group">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>
      
      <div className="form-group">
        <label htmlFor="careerInterests">Career Interests</label>
        <textarea
          id="careerInterests"
          name="careerInterests"
          value={formData.careerInterests}
          onChange={handleChange}
          placeholder="E.g., Software Development, Data Science, Marketing"
          rows="3"
        />
      </div>
      
      <div className="form-group">
        <label htmlFor="skills">Skills</label>
        <textarea
          id="skills"
          name="skills"
          value={formData.skills}
          onChange={handleChange}
          placeholder="E.g., JavaScript, React, Communication, Leadership"
          rows="3"
        />
      </div>
      
      <div className="form-actions">
        <button type="submit" disabled={loading}>
          {loading ? 'Saving...' : 'Save Changes'}
        </button>
        <button type="button" onClick={onCancel} className="cancel-button">
          Cancel
        </button>
      </div>
    </form>
  );
};

export default ProfileForm;
