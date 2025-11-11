import React, { useState, useEffect } from 'react';

const SplashScreen = ({ onComplete }) => {
  const [currentSlogan, setCurrentSlogan] = useState(0);
  const [fadeClass, setFadeClass] = useState('fade-in');

  const slogans = [
    "Smart Visual Calorie Tracker",
    "AI-Powered Calorie Measurement",
    "Count Calories, Stay Healthy"
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 4000);

    const sloganTimer = setInterval(() => {
      setFadeClass('fade-out');
      setTimeout(() => {
        setCurrentSlogan((prev) => (prev + 1) % slogans.length);
        setFadeClass('fade-in');
      }, 300);
    }, 1200);

    return () => {
      clearTimeout(timer);
      clearInterval(sloganTimer);
    };
  }, [onComplete]);

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      background: 'linear-gradient(135deg, #4CAF50 0%, #45a049 50%, #4CAF50 100%)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 9999,
      animation: 'slideUp 0.8s ease-out'
    }}>
      <style>
        {`
          @keyframes slideUp {
            from { transform: translateY(100%); }
            to { transform: translateY(0); }
          }
          @keyframes pulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.05); }
          }
          @keyframes bounce {
            0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
            40% { transform: translateY(-10px); }
            60% { transform: translateY(-5px); }
          }
          .fade-in {
            opacity: 1;
            transition: opacity 0.3s ease-in;
          }
          .fade-out {
            opacity: 0;
            transition: opacity 0.3s ease-out;
          }
        `}
      </style>
      
      <div style={{
        textAlign: 'center',
        color: 'white',
        animation: 'bounce 2s ease-in-out infinite'
      }}>
        <div style={{
          marginBottom: '24px',
          animation: 'pulse 2s ease-in-out infinite'
        }}>
          <img 
            src="/bcm.png" 
            alt="BCM Logo" 
            style={{ 
              height: '120px', 
              width: 'auto',
              filter: 'brightness(0) invert(1)',
              marginBottom: '16px'
            }} 
          />
          <h1 style={{
            fontSize: '48px',
            fontWeight: '700',
            margin: '0',
            textShadow: '0 4px 8px rgba(0,0,0,0.3)',
            letterSpacing: '2px'
          }}>
            BCM
          </h1>
        </div>
        
        <p 
          className={fadeClass}
          style={{
            fontSize: '20px',
            fontWeight: '300',
            margin: '0',
            textShadow: '0 2px 4px rgba(0,0,0,0.3)',
            minHeight: '24px'
          }}
        >
          {slogans[currentSlogan]}
        </p>
      </div>

      <div style={{
        position: 'absolute',
        bottom: '40px',
        display: 'flex',
        gap: '8px'
      }}>
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: 'rgba(255,255,255,0.5)',
              animation: `pulse 1.5s ease-in-out infinite ${i * 0.2}s`
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default SplashScreen;