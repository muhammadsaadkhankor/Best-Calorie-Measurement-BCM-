import React from 'react';

const Results = ({ data, onBack }) => {
  if (!data) return null;

  return (
    <div style={{ padding: '20px 0', minHeight: '100vh' }}>
      <div className="container">
        <button 
          className="btn btn-outline" 
          onClick={onBack}
          style={{ marginBottom: '20px' }}
        >
          <i className="fas fa-arrow-left"></i>
          Back to Camera
        </button>

        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <h1 style={{ fontSize: '32px', fontWeight: '700', marginBottom: '16px' }}>
            Analysis Results
          </h1>
          <p style={{ color: '#666', fontSize: '16px' }}>
            AI-powered nutrition analysis
          </p>
        </div>

        <div className="card" style={{ marginBottom: '24px' }}>
          <div style={{ textAlign: 'center' }}>
            <h2 style={{ fontSize: '48px', fontWeight: '700', color: '#4CAF50', marginBottom: '8px' }}>
              {data.totalCalories}
            </h2>
            <p style={{ fontSize: '18px', color: '#666', marginBottom: '16px' }}>
              Total Calories
            </p>
            <div style={{ 
              background: '#f8f9fa', 
              padding: '12px', 
              borderRadius: '8px',
              display: 'inline-block'
            }}>
              <span style={{ fontSize: '14px', color: '#666' }}>
                Confidence: {data.confidence}%
              </span>
            </div>
          </div>
        </div>

        {data.macronutrients && (
          <div className="card" style={{ marginBottom: '24px' }}>
            <h3 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '16px' }}>
              Macronutrients
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '24px', fontWeight: '700', color: '#FF9800' }}>
                  {data.macronutrients.protein}g
                </div>
                <div style={{ fontSize: '14px', color: '#666' }}>Protein</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '24px', fontWeight: '700', color: '#2196F3' }}>
                  {data.macronutrients.carbs}g
                </div>
                <div style={{ fontSize: '14px', color: '#666' }}>Carbs</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '24px', fontWeight: '700', color: '#9C27B0' }}>
                  {data.macronutrients.fat}g
                </div>
                <div style={{ fontSize: '14px', color: '#666' }}>Fat</div>
              </div>
            </div>
          </div>
        )}

        <div className="card">
          <h3 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '16px' }}>
            Detected Food Items
          </h3>
          {data.foodItems.map((item, index) => (
            <div 
              key={index}
              style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                padding: '12px 0',
                borderBottom: index < data.foodItems.length - 1 ? '1px solid #eee' : 'none'
              }}
            >
              <div>
                <div style={{ fontSize: '16px', fontWeight: '600' }}>
                  {item.name}
                </div>
                <div style={{ fontSize: '14px', color: '#666' }}>
                  {item.weight}{item.unit}
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '16px', fontWeight: '600', color: '#4CAF50' }}>
                  {item.calories} cal
                </div>
                {item.protein !== undefined && (
                  <div style={{ fontSize: '12px', color: '#666' }}>
                    P: {item.protein}g | C: {item.carbs}g | F: {item.fat}g
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Results;