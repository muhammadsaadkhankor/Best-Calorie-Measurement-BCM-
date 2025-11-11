import React, { useState, useEffect } from 'react';
import mealService from '../services/meals';

const Results = ({ onNavigate, currentUser }) => {
  const [estimation, setEstimation] = useState(null);
  
  useEffect(() => {
    const savedEstimation = localStorage.getItem('lastEstimation');
    if (savedEstimation) {
      setEstimation(JSON.parse(savedEstimation));
    }
  }, []);
  
  if (!estimation) {
    return (
      <div style={{ padding: '32px 0', minHeight: 'calc(100vh - 80px)', textAlign: 'center' }}>
        <p>No estimation data found. Please upload an image first.</p>
        <button className="btn btn-primary" onClick={() => onNavigate('upload')}>Upload Image</button>
      </div>
    );
  }
  
  const { totalCalories, confidence, foodItems } = estimation;

  const handleSaveToLog = () => {
    const userId = currentUser?.id || 'guest';
    const mealType = new Date().getHours() < 11 ? 'Breakfast' : 
                    new Date().getHours() < 15 ? 'Lunch' : 
                    new Date().getHours() < 18 ? 'Snack' : 'Dinner';
    
    mealService.addMeal(userId, {
      name: foodItems.map(f => f.name).join(', '),
      calories: totalCalories,
      type: mealType,
      confidence: confidence
    });
    
    localStorage.removeItem('lastEstimation');
    
    setTimeout(() => {
      onNavigate('dashboard');
    }, 500);
  };

  return (
    <div style={{ padding: '32px 0', minHeight: 'calc(100vh - 80px)' }}>
      <div className="container">
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <h1 style={{ fontSize: '32px', fontWeight: '700', color: '#333', marginBottom: '8px' }}>
              Analysis Results
            </h1>
            <p style={{ color: '#666', fontSize: '16px' }}>
              AI has identified the following items in your meal
            </p>
          </div>

          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
            gap: '16px',
            marginBottom: '32px'
          }}>
            {foodItems.map((food, index) => (
              <div key={index} className="card" style={{ padding: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#333' }}>
                    {food.name}
                  </h3>
                  <span style={{ 
                    fontSize: '18px', 
                    fontWeight: '700', 
                    color: '#4CAF50',
                    background: '#f1f8e9',
                    padding: '4px 12px',
                    borderRadius: '20px'
                  }}>
                    {food.calories} kcal
                  </span>
                </div>
                <div style={{ 
                  textAlign: 'center',
                  padding: '8px',
                  background: '#f8f9fa',
                  borderRadius: '6px',
                  fontSize: '12px',
                  color: '#666'
                }}>
                  <div style={{ fontWeight: '600', color: '#4CAF50' }}>{food.weight}{food.unit}</div>
                  <div>Weight</div>
                </div>
              </div>
            ))}
          </div>

          <div className="card" style={{ marginBottom: '32px', background: 'linear-gradient(135deg, #4CAF50, #45a049)', color: 'white' }}>
            <div style={{ textAlign: 'center' }}>
              <h2 style={{ fontSize: '24px', fontWeight: '700', marginBottom: '16px' }}>
                Estimated Calories
              </h2>
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', 
                gap: '16px'
              }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '32px', fontWeight: '700' }}>{totalCalories}</div>
                  <div style={{ fontSize: '14px', opacity: 0.9 }}>Calories</div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '24px', fontWeight: '600' }}>{confidence}%</div>
                  <div style={{ fontSize: '14px', opacity: 0.9 }}>Confidence</div>
                </div>
              </div>
            </div>
          </div>

          <div style={{ 
            display: 'flex', 
            gap: '16px', 
            justifyContent: 'center',
            flexWrap: 'wrap'
          }}>
            <button 
              className="btn btn-primary"
              onClick={handleSaveToLog}
              style={{ fontSize: '16px', padding: '12px 32px' }}
            >
              <i className="fas fa-save" style={{ marginRight: '8px' }}></i>
              Save to Log
            </button>
            <button 
              className="btn btn-outline"
              onClick={() => onNavigate('upload')}
              style={{ fontSize: '16px', padding: '12px 32px' }}
            >
              <i className="fas fa-redo" style={{ marginRight: '8px' }}></i>
              Analyze Another
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Results;