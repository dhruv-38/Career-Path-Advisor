// src/components/User/Profile.jsx
import React, { useState, useEffect } from 'react';
import { userService } from '../../services/api';
import ProfileForm from './ProfileForm';

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const response = await userService.getProfile();
      setProfile(response.data);
      setError('');
    } catch (err) {
      setError('Failed to load profile. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateSuccess = (updatedProfile) => {
    setProfile(updatedProfile);
    setIsEditing(false);
    setSuccess('Profile updated successfully!');
    setTimeout(() => setSuccess(''), 3000);
  };

  if (loading) return <div className="loading">Loading profile...</div>;

  return (
    <div className="profile-container">
      <h2>User Profile</h2>
      
      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">{success}</div>}
      
      {isEditing ? (
        <ProfileForm 
          profile={profile} 
          onSuccess={handleUpdateSuccess} 
          onCancel={() => setIsEditing(false)} 
        />
      ) : (
        profile && (
          <div className="profile-details">
            <div className="profile-field">
              <strong>Name:</strong> {profile.name}
            </div>
            <div className="profile-field">
              <strong>Email:</strong> {profile.email}
            </div>
            <div className="profile-field">
              <strong>Career Interests:</strong> {profile.careerInterests || 'Not specified'}
            </div>
            <div className="profile-field">
              <strong>Skills:</strong> {profile.skills || 'Not specified'}
            </div>
            <button onClick={() => setIsEditing(true)} className="edit-button">
              Edit Profile
            </button>
          </div>
        )
      )}
    </div>
  );
};

export default Profile;
