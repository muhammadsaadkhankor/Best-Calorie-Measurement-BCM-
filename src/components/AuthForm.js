import React, { useState } from 'react';
import authService from '../services/auth';

const AuthForm = ({ onLogin, initialMode, onClose }) => {
  const [isSignUp, setIsSignUp] = useState(initialMode === 'signup');
  const [formData, setFormData] = useState({ email: '', password: '', name: '', phone: '' });
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginMethod, setLoginMethod] = useState('email'); // 'email' or 'phone'

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    try {
      if (isSignUp) {
        if (!formData.name.trim()) {
          setError('Name is required');
          return;
        }
        const user = authService.signUp(formData);
        onLogin(user);
      } else {
        const loginData = loginMethod === 'email' 
          ? { email: formData.email, password: formData.password }
          : { email: formData.phone, password: formData.password };
        const user = authService.signIn(loginData);
        onLogin(user);
      }
    } catch (error) {
      setError(error.message);
    }
  };

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
      {/* Header */}
      <div style={{
        padding: '20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        color: 'white'
      }}>
        <button
          onClick={onClose}
          style={{
            background: 'rgba(255,255,255,0.2)',
            border: 'none',
            color: 'white',
            fontSize: '20px',
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <i className="fas fa-arrow-left"></i>
        </button>
        <h2 style={{ margin: 0, fontSize: '20px', fontWeight: '600' }}>
          {isSignUp ? 'Create Account' : 'Welcome Back'}
        </h2>
        <div style={{ width: '40px' }}></div>
      </div>

      {/* Content */}
      <div style={{
        flex: 1,
        background: 'white',
        borderTopLeftRadius: '24px',
        borderTopRightRadius: '24px',
        padding: '32px 24px',
        marginTop: '20px',
        minHeight: 'calc(100vh - 80px)'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <h1 style={{ fontSize: '28px', fontWeight: '700', color: '#333', marginBottom: '8px' }}>
            {isSignUp ? 'Join BCM' : 'Sign In'}
          </h1>
          <p style={{ color: '#666', fontSize: '16px' }}>
            {isSignUp ? 'Start tracking your calories today' : 'Continue your calorie journey'}
          </p>
        </div>

        <form onSubmit={handleSubmit} style={{ maxWidth: '400px', margin: '0 auto' }}>
          {isSignUp && (
            <div style={{ marginBottom: '20px' }}>
              <input
                type="text"
                placeholder="Full Name"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                style={{
                  width: '100%',
                  padding: '16px',
                  border: '2px solid #f0f0f0',
                  borderRadius: '12px',
                  fontSize: '16px',
                  background: '#fafafa',
                  transition: 'all 0.3s ease'
                }}
                onFocus={(e) => e.target.style.borderColor = '#4CAF50'}
                onBlur={(e) => e.target.style.borderColor = '#f0f0f0'}
                required
              />
            </div>
          )}

          {/* Login Method Toggle */}
          <div style={{
            display: 'flex',
            background: '#f8f9fa',
            borderRadius: '12px',
            padding: '4px',
            marginBottom: '20px'
          }}>
            <button
              type="button"
              onClick={() => setLoginMethod('email')}
              style={{
                flex: 1,
                padding: '12px',
                border: 'none',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                background: loginMethod === 'email' ? '#4CAF50' : 'transparent',
                color: loginMethod === 'email' ? 'white' : '#666'
              }}
            >
              <i className="fas fa-envelope" style={{ marginRight: '8px' }}></i>
              Email
            </button>
            <button
              type="button"
              onClick={() => setLoginMethod('phone')}
              style={{
                flex: 1,
                padding: '12px',
                border: 'none',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                background: loginMethod === 'phone' ? '#4CAF50' : 'transparent',
                color: loginMethod === 'phone' ? 'white' : '#666'
              }}
            >
              <i className="fas fa-phone" style={{ marginRight: '8px' }}></i>
              Phone
            </button>
          </div>

          {/* Single Email/Phone Input */}
          <div style={{ marginBottom: '20px' }}>
            <input
              type={loginMethod === 'email' ? 'email' : 'tel'}
              placeholder={loginMethod === 'email' ? 'Email Address' : 'Phone Number'}
              value={loginMethod === 'email' ? formData.email : formData.phone}
              onChange={(e) => {
                if (loginMethod === 'email') {
                  setFormData({...formData, email: e.target.value, phone: ''});
                } else {
                  setFormData({...formData, phone: e.target.value, email: ''});
                }
              }}
              style={{
                width: '100%',
                padding: '16px',
                border: '2px solid #f0f0f0',
                borderRadius: '12px',
                fontSize: '16px',
                background: '#fafafa',
                transition: 'all 0.3s ease'
              }}
              onFocus={(e) => e.target.style.borderColor = '#4CAF50'}
              onBlur={(e) => e.target.style.borderColor = '#f0f0f0'}
              required
            />
          </div>

          {/* Password Input */}
          <div style={{ marginBottom: '32px', position: 'relative' }}>
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              style={{
                width: '100%',
                padding: '16px 50px 16px 16px',
                border: '2px solid #f0f0f0',
                borderRadius: '12px',
                fontSize: '16px',
                background: '#fafafa',
                transition: 'all 0.3s ease'
              }}
              onFocus={(e) => e.target.style.borderColor = '#4CAF50'}
              onBlur={(e) => e.target.style.borderColor = '#f0f0f0'}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              style={{
                position: 'absolute',
                right: '16px',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: '#4CAF50',
                fontSize: '18px',
                padding: '4px'
              }}
            >
              <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
            </button>
          </div>

          {error && (
            <div style={{ 
              color: '#f44336', 
              fontSize: '14px', 
              marginBottom: '16px',
              textAlign: 'center',
              padding: '12px',
              background: '#ffebee',
              borderRadius: '8px'
            }}>
              {error}
            </div>
          )}

          <button 
            type="submit"
            style={{
              width: '100%',
              padding: '16px',
              background: 'linear-gradient(135deg, #4CAF50, #45a049)',
              border: 'none',
              borderRadius: '12px',
              color: 'white',
              fontSize: '16px',
              fontWeight: '600',
              cursor: 'pointer',
              marginBottom: '24px',
              boxShadow: '0 4px 12px rgba(76, 175, 80, 0.3)',
              transition: 'all 0.3s ease'
            }}
          >
            {isSignUp ? 'Create Account' : 'Sign In'}
          </button>
        </form>
        
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          margin: '24px 0',
          color: '#666',
          fontSize: '14px',
          maxWidth: '400px',
          marginLeft: 'auto',
          marginRight: 'auto'
        }}>
          <div style={{ flex: 1, height: '1px', background: '#e0e0e0' }}></div>
          <span style={{ padding: '0 16px' }}>or</span>
          <div style={{ flex: 1, height: '1px', background: '#e0e0e0' }}></div>
        </div>
        
        <button
          onClick={() => {
            const googleUser = {
              id: Date.now(),
              name: 'Google User',
              email: 'user@gmail.com',
              isGoogleUser: true
            };
            onLogin(googleUser);
          }}
          style={{
            width: '100%',
            maxWidth: '400px',
            margin: '0 auto',
            display: 'block',
            padding: '16px',
            border: '2px solid #f0f0f0',
            borderRadius: '12px',
            background: 'white',
            fontSize: '16px',
            cursor: 'pointer',
            marginBottom: '24px',
            transition: 'all 0.3s ease'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px' }}>
            <svg width="20" height="20" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Continue with Google
          </div>
        </button>

        <div style={{ textAlign: 'center', maxWidth: '400px', margin: '0 auto' }}>
          <button
            onClick={() => {
              setIsSignUp(!isSignUp);
              setError('');
              setFormData({ email: '', password: '', name: '', phone: '' });
            }}
            style={{
              background: 'none',
              border: 'none',
              color: '#4CAF50',
              cursor: 'pointer',
              fontSize: '16px',
              fontWeight: '500'
            }}
          >
            {isSignUp ? 'Already have an account? Sign In' : "Don't have an account? Create one"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;