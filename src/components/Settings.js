import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';

const Settings = ({ onNavigate, currentUser, onLogout }) => {
  const { colors, isDarkMode, toggleDarkMode } = useTheme();
  const [formData, setFormData] = useState({
    name: currentUser?.name || '',
    email: currentUser?.email || ''
  });
  const [isEditing, setIsEditing] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(() => {
    const saved = localStorage.getItem('bcm_notifications');
    return saved ? JSON.parse(saved) : true;
  });

  const toggleNotifications = () => {
    const newValue = !notificationsEnabled;
    setNotificationsEnabled(newValue);
    localStorage.setItem('bcm_notifications', JSON.stringify(newValue));
  };

  const handleSave = () => {
    // Update user data in localStorage
    const updatedUser = { ...currentUser, ...formData };
    localStorage.setItem('bcm_currentUser', JSON.stringify(updatedUser));
    setIsEditing(false);
    
    // Show success message (you could add a toast notification here)
    alert('Profile updated successfully!');
  };

  return (
    <div className="mobile-safe-area" style={{ padding: '20px 0', minHeight: '100vh', background: colors.background }}>
      <div className="container">
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '32px' }}>
          <button
            onClick={() => onNavigate('profile')}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '8px',
              marginRight: '16px'
            }}
          >
            <i className="fas fa-arrow-left" style={{ fontSize: '20px', color: colors.primary }}></i>
          </button>
          <h1 style={{ fontSize: '24px', fontWeight: '700', color: colors.text, margin: 0 }}>
            Settings
          </h1>
        </div>

        {/* Profile Settings */}
        <div className="card" style={{ marginBottom: '24px', padding: '24px', background: colors.surface, border: `1px solid ${colors.border}` }}>
          <h2 style={{ fontSize: '18px', fontWeight: '600', color: colors.text, marginBottom: '20px' }}>
            Profile Information
          </h2>
          
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: colors.textSecondary, marginBottom: '8px' }}>
              Full Name
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              disabled={!isEditing}
              style={{
                width: '100%',
                padding: '12px',
                border: `2px solid ${colors.border}`,
                borderRadius: '8px',
                fontSize: '16px',
                background: isEditing ? colors.surface : colors.input,
                color: isEditing ? colors.text : colors.textSecondary
              }}
            />
          </div>

          <div style={{ marginBottom: '24px' }}>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: colors.textSecondary, marginBottom: '8px' }}>
              Email Address
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              disabled={!isEditing}
              style={{
                width: '100%',
                padding: '12px',
                border: `2px solid ${colors.border}`,
                borderRadius: '8px',
                fontSize: '16px',
                background: isEditing ? colors.surface : colors.input,
                color: isEditing ? colors.text : colors.textSecondary
              }}
            />
          </div>

          {isEditing ? (
            <div style={{ display: 'flex', gap: '12px' }}>
              <button
                onClick={handleSave}
                style={{
                  flex: 1,
                  padding: '12px',
                  background: colors.primary,
                  border: 'none',
                  borderRadius: '8px',
                  color: 'white',
                  fontSize: '16px',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}
              >
                Save Changes
              </button>
              <button
                onClick={() => {
                  setIsEditing(false);
                  setFormData({
                    name: currentUser?.name || '',
                    email: currentUser?.email || ''
                  });
                }}
                style={{
                  flex: 1,
                  padding: '12px',
                  background: 'transparent',
                  border: `2px solid ${colors.border}`,
                  borderRadius: '8px',
                  color: colors.textSecondary,
                  fontSize: '16px',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}
              >
                Cancel
              </button>
            </div>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              style={{
                width: '100%',
                padding: '12px',
                background: colors.primary,
                border: 'none',
                borderRadius: '8px',
                color: 'white',
                fontSize: '16px',
                fontWeight: '600',
                cursor: 'pointer'
              }}
            >
              Edit Profile
            </button>
          )}
        </div>

        {/* App Settings */}
        <div className="card" style={{ marginBottom: '24px', padding: '24px', background: colors.surface, border: `1px solid ${colors.border}` }}>
          <h2 style={{ fontSize: '18px', fontWeight: '600', color: colors.text, marginBottom: '20px' }}>
            App Preferences
          </h2>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <div>
              <div style={{ fontWeight: '600', color: colors.text }}>Notifications</div>
              <div style={{ fontSize: '12px', color: colors.textSecondary }}>Meal reminders and updates</div>
            </div>
            <label style={{ position: 'relative', display: 'inline-block', width: '50px', height: '24px' }}>
              <input type="checkbox" checked={notificationsEnabled} onChange={toggleNotifications} style={{ opacity: 0, width: 0, height: 0 }} />
              <span style={{
                position: 'absolute',
                cursor: 'pointer',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: notificationsEnabled ? colors.primary : '#ccc',
                borderRadius: '24px',
                transition: '0.4s'
              }}>
                <span style={{
                  position: 'absolute',
                  content: '',
                  height: '18px',
                  width: '18px',
                  left: notificationsEnabled ? '29px' : '3px',
                  bottom: '3px',
                  background: 'white',
                  borderRadius: '50%',
                  transition: '0.4s'
                }}></span>
              </span>
            </label>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontWeight: '600', color: colors.text }}>Dark Mode</div>
              <div style={{ fontSize: '12px', color: colors.textSecondary }}>Switch to dark theme</div>
            </div>
            <label style={{ position: 'relative', display: 'inline-block', width: '50px', height: '24px' }}>
              <input type="checkbox" checked={isDarkMode} onChange={toggleDarkMode} style={{ opacity: 0, width: 0, height: 0 }} />
              <span style={{
                position: 'absolute',
                cursor: 'pointer',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: isDarkMode ? colors.primary : '#ccc',
                borderRadius: '24px',
                transition: '0.4s'
              }}>
                <span style={{
                  position: 'absolute',
                  content: '',
                  height: '18px',
                  width: '18px',
                  left: isDarkMode ? '29px' : '3px',
                  bottom: '3px',
                  background: 'white',
                  borderRadius: '50%',
                  transition: '0.4s'
                }}></span>
              </span>
            </label>
          </div>
        </div>

        {/* Danger Zone */}
        <div className="card" style={{ marginBottom: '24px', padding: '24px', background: colors.surface, border: `2px solid ${isDarkMode ? '#4a1a1a' : '#ffebee'}` }}>
          <h2 style={{ fontSize: '18px', fontWeight: '600', color: '#f44336', marginBottom: '20px' }}>
            Account Actions
          </h2>
          
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
    </div>
  );
};

export default Settings;