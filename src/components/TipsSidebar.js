import React, { useState, useEffect } from 'react';

const TipsSidebar = () => {
  const [currentTip, setCurrentTip] = useState(0);

  const healthyTips = [
    { tip: "Drink water before meals to help control appetite", icon: "fas fa-tint" },
    { tip: "Use smaller plates to naturally reduce portion sizes", icon: "fas fa-utensils" },
    { tip: "Eat slowly - it takes 20 minutes to feel full", icon: "fas fa-clock" },
    { tip: "Include protein in every meal to stay satisfied", icon: "fas fa-dumbbell" },
    { tip: "Aim for 5 different colors on your plate", icon: "fas fa-palette" },
    { tip: "Take a 10-minute walk after eating", icon: "fas fa-walking" }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTip((prev) => (prev + 1) % healthyTips.length);
    }, 10000); // Change tip every 10 seconds
    return () => clearInterval(interval);
  }, []);

  const tip = healthyTips[currentTip];

  return (
    <div style={{
      position: 'fixed',
      left: '0',
      top: '80px',
      width: '280px',
      height: 'calc(100vh - 80px)',
      background: 'linear-gradient(135deg, #f8f9fa, #e9ecef)',
      borderRight: '1px solid #e0e0e0',
      zIndex: 50,
      padding: '20px',
      boxShadow: '2px 0 10px rgba(0,0,0,0.1)'
    }}>
      <div style={{ marginBottom: '24px' }}>
        <h3 style={{ 
          fontSize: '18px', 
          fontWeight: '600', 
          color: '#4CAF50',
          marginBottom: '8px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          <i className="fas fa-lightbulb"></i>
          Healthy Tips
        </h3>
      </div>

      <div style={{
        background: 'white',
        borderRadius: '12px',
        padding: '20px',
        marginBottom: '20px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '16px' }}>
          <i 
            className={tip.icon} 
            style={{ 
              fontSize: '32px', 
              color: '#4CAF50',
              marginBottom: '12px'
            }}
          ></i>
        </div>
        
        <p style={{
          fontSize: '14px',
          color: '#666',
          lineHeight: '1.5',
          textAlign: 'center',
          margin: '0'
        }}>
          {tip.tip}
        </p>
      </div>

      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '4px',
        marginBottom: '20px'
      }}>
        {healthyTips.map((_, index) => (
          <div
            key={index}
            style={{
              width: '6px',
              height: '6px',
              borderRadius: '50%',
              background: index === currentTip ? '#4CAF50' : '#ddd',
              cursor: 'pointer'
            }}
            onClick={() => setCurrentTip(index)}
          />
        ))}
      </div>

      <div style={{
        background: 'white',
        borderRadius: '8px',
        padding: '16px',
        fontSize: '12px',
        color: '#666',
        textAlign: 'center'
      }}>
        <i className="fas fa-heart" style={{ color: '#e91e63', marginRight: '4px' }}></i>
        Tips refresh every 10 seconds
      </div>
    </div>
  );
};

export default TipsSidebar;