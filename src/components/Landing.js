import React, { useState } from 'react';
import AuthForm from './AuthForm';

const Landing = ({ onLogin, onNavigate }) => {
  const [showAuth, setShowAuth] = useState(false);

  if (showAuth) {
    return (
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: 'linear-gradient(135deg, #4CAF50 0%, #45a049 100%)',
        zIndex: 1000,
        overflow: 'auto'
      }}>
        <AuthForm onLogin={onLogin} initialMode={showAuth} onClose={() => setShowAuth(false)} />
      </div>
    );
  }

  return (
    <div style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)'
    }}>
      <div className="container">
        <div style={{ textAlign: 'center', padding: '0 16px' }}>
          <div style={{ marginBottom: '32px' }}>
            <div style={{ marginBottom: '16px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
              <img src="/bcm.png" alt="BCM Logo" style={{ height: '100px', width: 'auto' }} />
              <h1 style={{ 
                fontSize: '32px', 
                fontWeight: '700', 
                color: '#4CAF50', 
                margin: '0',
                textShadow: '0 2px 4px rgba(0,0,0,0.1)'
              }}>
                BCM
              </h1>
            </div>
            <p style={{ 
              fontSize: '18px', 
              color: '#666', 
              fontWeight: '300',
              lineHeight: '1.4',
              marginBottom: '12px'
            }}>
              Smart Visual Calorie Tracker
            </p>
            <p style={{ 
              fontSize: '14px', 
              color: '#888', 
              lineHeight: '1.5',
              padding: '0 20px'
            }}>
              Take photos of your meals and let AI measure calories automatically
            </p>
          </div>
          
          <div style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            gap: '16px',
            alignItems: 'center'
          }}>
            <button 
              className="btn btn-primary"
              onClick={() => setShowAuth('signin')}
              style={{ width: '100%', maxWidth: '280px' }}
            >
              Sign In
            </button>
            <button 
              className="btn btn-outline"
              onClick={() => setShowAuth('signup')}
              style={{ width: '100%', maxWidth: '280px' }}
            >
              Create Account
            </button>
            <button 
              className="btn"
              onClick={() => onLogin({ name: 'Guest User', email: 'guest@bcm.com', isGuest: true })}
              style={{ 
                width: '100%',
                maxWidth: '280px',
                background: 'transparent',
                color: '#666',
                border: '1px solid #ddd'
              }}
            >
              Continue as Guest
            </button>
          </div>
          
          <div style={{ 
            marginTop: '32px',
            display: 'flex',
            justifyContent: 'center'
          }}>
            <div style={{ textAlign: 'center' }}>
              <i className="fas fa-calculator" style={{ fontSize: '32px', color: '#FF9800', marginBottom: '8px' }}></i>
              <p style={{ fontSize: '14px', color: '#666' }}>Calorie Counting</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;