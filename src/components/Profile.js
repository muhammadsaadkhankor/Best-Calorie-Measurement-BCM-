import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';

const Profile = ({ onNavigate, currentUser, onLogout }) => {
  const { colors } = useTheme();
  const [profileImage, setProfileImage] = useState(currentUser?.profileImage || null);
  
  const userStats = {
    totalMeals: 127,
    avgCalories: 1850,
    streak: 15,
    joinDate: currentUser?.createdAt || '2024-01-15'
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileImage(e.target.result);
        // Save to localStorage for persistence
        const updatedUser = { ...currentUser, profileImage: e.target.result };
        localStorage.setItem('bcm_currentUser', JSON.stringify(updatedUser));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="mobile-safe-area" style={{ padding: '20px 0', minHeight: '100vh', background: colors.background }}>
      <div className="container">
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{ position: 'relative', display: 'inline-block' }}>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              style={{ display: 'none' }}
              id="profile-upload"
            />
            <label
              htmlFor="profile-upload"
              style={{
                width: '80px',
                height: '80px',
                borderRadius: '50%',
                background: profileImage 
                  ? `url(${profileImage}) center/cover` 
                  : 'linear-gradient(135deg, #4CAF50, #45a049)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 16px',
                boxShadow: '0 4px 16px rgba(76, 175, 80, 0.3)',
                cursor: 'pointer',
                position: 'relative',
                overflow: 'hidden',
                transition: 'all 0.3s ease'
              }}
            >
              {!profileImage && (
                <i className="fas fa-user" style={{ fontSize: '32px', color: 'white' }}></i>
              )}
              <div style={{
                position: 'absolute',
                bottom: 0,
                right: 0,
                width: '24px',
                height: '24px',
                borderRadius: '50%',
                background: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
                border: '2px solid white'
              }}>
                <i className="fas fa-camera" style={{ fontSize: '10px', color: '#4CAF50' }}></i>
              </div>
            </label>
          </div>
          <h1 style={{ fontSize: '24px', fontWeight: '700', color: colors.text, marginBottom: '4px' }}>
            {currentUser?.name || 'User'}
          </h1>
          <p style={{ color: colors.textSecondary, fontSize: '14px' }}>
            {currentUser?.email || 'user@bcm.com'}
          </p>
        </div>

        {/* Stats Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '16px',
          marginBottom: '32px'
        }}>
          <div className="card" style={{ textAlign: 'center', padding: '20px', background: colors.surface, border: `1px solid ${colors.border}` }}>
            <div style={{ fontSize: '24px', fontWeight: '700', color: colors.primary, marginBottom: '4px' }}>
              {userStats.totalMeals}
            </div>
            <div style={{ fontSize: '12px', color: colors.textSecondary }}>Total Meals</div>
          </div>
          <div className="card" style={{ textAlign: 'center', padding: '20px', background: colors.surface, border: `1px solid ${colors.border}` }}>
            <div style={{ fontSize: '24px', fontWeight: '700', color: colors.secondary, marginBottom: '4px' }}>
              {userStats.avgCalories}
            </div>
            <div style={{ fontSize: '12px', color: colors.textSecondary }}>Avg Calories</div>
          </div>
          <div className="card" style={{ textAlign: 'center', padding: '20px', background: colors.surface, border: `1px solid ${colors.border}` }}>
            <div style={{ fontSize: '24px', fontWeight: '700', color: '#2196F3', marginBottom: '4px' }}>
              {userStats.streak}
            </div>
            <div style={{ fontSize: '12px', color: colors.textSecondary }}>Day Streak</div>
          </div>
          <div className="card" style={{ textAlign: 'center', padding: '20px', background: colors.surface, border: `1px solid ${colors.border}` }}>
            <div style={{ fontSize: '24px', fontWeight: '700', color: '#9C27B0', marginBottom: '4px' }}>
              {new Date(userStats.joinDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
            </div>
            <div style={{ fontSize: '12px', color: colors.textSecondary }}>Member Since</div>
          </div>
        </div>

        {/* Menu Options */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '32px' }}>
          <button
            onClick={() => onNavigate('dashboard')}
            className="card"
            style={{
              display: 'flex',
              alignItems: 'center',
              padding: '16px',
              border: 'none',
              cursor: 'pointer',
              background: colors.surface,
              textAlign: 'left'
            }}
          >
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              background: 'rgba(76, 175, 80, 0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: '16px'
            }}>
              <i className="fas fa-home" style={{ color: '#4CAF50', fontSize: '16px' }}></i>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: '600', color: colors.text, marginBottom: '2px' }}>Dashboard</div>
              <div style={{ fontSize: '12px', color: colors.textSecondary }}>View your calorie overview</div>
            </div>
            <i className="fas fa-chevron-right" style={{ color: colors.textMuted, fontSize: '12px' }}></i>
          </button>

          <button
            onClick={() => onNavigate('history')}
            className="card"
            style={{
              display: 'flex',
              alignItems: 'center',
              padding: '16px',
              border: 'none',
              cursor: 'pointer',
              background: colors.surface,
              textAlign: 'left'
            }}
          >
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              background: 'rgba(255, 152, 0, 0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: '16px'
            }}>
              <i className="fas fa-history" style={{ color: '#FF9800', fontSize: '16px' }}></i>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: '600', color: colors.text, marginBottom: '2px' }}>Meal History</div>
              <div style={{ fontSize: '12px', color: colors.textSecondary }}>Track your progress over time</div>
            </div>
            <i className="fas fa-chevron-right" style={{ color: colors.textMuted, fontSize: '12px' }}></i>
          </button>

          <button
            onClick={() => onNavigate('settings')}
            className="card"
            style={{
              display: 'flex',
              alignItems: 'center',
              padding: '16px',
              border: 'none',
              cursor: 'pointer',
              background: colors.surface,
              textAlign: 'left',
              width: '100%'
            }}
          >
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              background: 'rgba(33, 150, 243, 0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: '16px'
            }}>
              <i className="fas fa-cog" style={{ color: '#2196F3', fontSize: '16px' }}></i>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: '600', color: colors.text, marginBottom: '2px' }}>Settings</div>
              <div style={{ fontSize: '12px', color: colors.textSecondary }}>Edit profile and app preferences</div>
            </div>
            <i className="fas fa-chevron-right" style={{ color: colors.textMuted, fontSize: '12px' }}></i>
          </button>
        </div>

        {/* Logout Button */}
        <button
          onClick={onLogout}
          style={{
            width: '100%',
            padding: '16px',
            background: 'linear-gradient(135deg, #f44336, #d32f2f)',
            border: 'none',
            borderRadius: '12px',
            color: 'white',
            fontSize: '16px',
            fontWeight: '600',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            boxShadow: '0 4px 12px rgba(244, 67, 54, 0.3)',
            transition: 'all 0.3s ease'
          }}
        >
          <i className="fas fa-sign-out-alt"></i>
          Sign Out
        </button>
      </div>
    </div>
  );
};

export default Profile;