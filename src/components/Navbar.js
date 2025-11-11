import React from 'react';
import { useTheme } from '../context/ThemeContext';

const Navbar = ({ currentPage, onNavigate, currentUser, onLogout }) => {
  const { colors, isDarkMode } = useTheme();
  return (
    <>
      {/* Glassmorphism Navigation Bar */}
      <nav style={{
        background: isDarkMode ? 'rgba(30, 30, 30, 0.95)' : 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        boxShadow: '0 -8px 32px rgba(0, 0, 0, 0.12)',
        padding: '16px 0 24px 0',
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        borderTop: `1px solid ${colors.border}`
      }}>
        {/* Navigation Container */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-around',
          alignItems: 'center',
          maxWidth: '100%',
          position: 'relative',
          padding: '0 20px'
        }}>
          {/* Upload/Camera Tab */}
          <button 
            onClick={() => onNavigate('upload')}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '6px',
              padding: '12px 16px',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              fontSize: '11px',
              fontWeight: '600',
              transition: 'all 0.3s ease',
              color: currentPage === 'upload' ? '#4CAF50' : '#8E8E93',
              minWidth: '70px'
            }}
          >
            <div style={{
              width: '40px',
              height: '40px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '12px',
              background: currentPage === 'upload' 
                ? '#4CAF50' 
                : 'rgba(142, 142, 147, 0.1)',
              transition: 'all 0.3s ease'
            }}>
              <i className="fas fa-camera" style={{ 
                fontSize: '18px',
                color: currentPage === 'upload' ? 'white' : '#8E8E93'
              }}></i>
            </div>
            <span>Scan</span>
          </button>
          
          {/* History Tab */}
          <button 
            onClick={() => onNavigate('history')}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '6px',
              padding: '12px 16px',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              fontSize: '11px',
              fontWeight: '600',
              transition: 'all 0.3s ease',
              color: currentPage === 'history' ? '#4CAF50' : '#8E8E93',
              minWidth: '70px'
            }}
          >
            <div style={{
              width: '40px',
              height: '40px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '12px',
              background: currentPage === 'history' 
                ? 'rgba(76, 175, 80, 0.15)' 
                : 'transparent',
              transition: 'all 0.3s ease'
            }}>
              <i className="fas fa-history" style={{ 
                fontSize: '18px',
                color: currentPage === 'history' ? '#4CAF50' : '#8E8E93'
              }}></i>
            </div>
            <span>History</span>
          </button>
          
          {/* Profile Tab */}
          <button 
            onClick={() => onNavigate('profile')}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '6px',
              padding: '12px 16px',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              fontSize: '11px',
              fontWeight: '600',
              transition: 'all 0.3s ease',
              color: currentPage === 'profile' ? '#4CAF50' : '#8E8E93',
              minWidth: '70px'
            }}
          >
            <div style={{
              width: '40px',
              height: '40px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '12px',
              background: currentPage === 'profile' 
                ? 'rgba(76, 175, 80, 0.15)' 
                : 'transparent',
              transition: 'all 0.3s ease'
            }}>
              <i className="fas fa-user" style={{ 
                fontSize: '18px',
                color: currentPage === 'profile' ? '#4CAF50' : '#8E8E93'
              }}></i>
            </div>
            <span>Profile</span>
          </button>
        </div>
        
        {/* Home Indicator */}
        <div style={{
          width: '134px',
          height: '5px',
          borderRadius: '3px',
          background: 'rgba(0, 0, 0, 0.3)',
          margin: '8px auto 0',
          opacity: 0.6
        }} />
      </nav>
      

      
      {/* CSS Animations */}
      <style>
        {`
          @keyframes pulse {
            0% {
              transform: scale(1);
              opacity: 1;
            }
            50% {
              transform: scale(1.2);
              opacity: 0.7;
            }
            100% {
              transform: scale(1.4);
              opacity: 0;
            }
          }
        `}
      </style>
    </>
  );
};

export default Navbar;