import React, { useState, useEffect } from 'react';

const TipsWidget = () => {
  const [currentTip, setCurrentTip] = useState(0);

  const healthyTips = [
    { tip: "Drink water before meals", icon: "fas fa-tint" },
    { tip: "Use smaller plates", icon: "fas fa-utensils" },
    { tip: "Eat slowly for 20 minutes", icon: "fas fa-clock" },
    { tip: "Include protein in every meal", icon: "fas fa-dumbbell" },
    { tip: "Aim for 5 colors on your plate", icon: "fas fa-palette" },
    { tip: "Walk 10 minutes after eating", icon: "fas fa-walking" }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTip((prev) => (prev + 1) % healthyTips.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  const tip = healthyTips[currentTip];

  return (
    <div className="card" style={{ 
      background: 'linear-gradient(135deg, #4CAF50, #45a049)', 
      color: 'white',
      marginBottom: '24px'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <i className={tip.icon} style={{ fontSize: '24px' }}></i>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: '12px', opacity: 0.9, marginBottom: '4px' }}>
            💡 Healthy Tip
          </div>
          <div style={{ fontSize: '14px', fontWeight: '500' }}>
            {tip.tip}
          </div>
        </div>
        <div style={{ display: 'flex', gap: '4px' }}>
          {healthyTips.map((_, index) => (
            <div
              key={index}
              style={{
                width: '4px',
                height: '4px',
                borderRadius: '50%',
                background: index === currentTip ? 'white' : 'rgba(255,255,255,0.5)'
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TipsWidget;