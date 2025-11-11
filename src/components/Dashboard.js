import React from 'react';
import mealService from '../services/meals';
import TipsWidget from './TipsWidget';

const Dashboard = ({ onNavigate, currentUser }) => {
  const userName = currentUser?.name?.split(' ')[0] || 'User';
  const userId = currentUser?.id || 'guest';
  const todaysMeals = mealService.getTodaysMeals(userId);
  const totalCalories = mealService.getTotalCaloriesToday(userId);
  
  return (
    <div className="mobile-safe-area" style={{ padding: '20px 0', minHeight: '100vh' }}>
      <div className="container">
        <div style={{ marginBottom: '24px', padding: '16px 0' }}>
          <h1 style={{ fontSize: '24px', fontWeight: '700', color: '#333', marginBottom: '8px' }}>
            Good morning, {userName}!
          </h1>
          <p style={{ color: '#666', fontSize: '14px' }}>
            Let's track your nutrition goals today
          </p>
        </div>

        <div style={{ 
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          marginBottom: '24px'
        }}>
          <div className="card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#333' }}>Daily Calories</h3>
              <div className="progress-circle">
                <div className="progress-text">
                  <div style={{ fontSize: '16px', fontWeight: '700' }}>{totalCalories}</div>
                  <div style={{ fontSize: '12px', color: '#666' }}>/ 2,000</div>
                </div>
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', color: '#666' }}>
              <span>Remaining: {2000 - totalCalories} kcal</span>
              <span>{Math.round((totalCalories / 2000) * 100)}% complete</span>
            </div>
          </div>

          <div className="card">
            <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#333', marginBottom: '16px' }}>
              Macronutrients
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                  <span style={{ fontSize: '14px', color: '#666' }}>Carbs</span>
                  <span style={{ fontSize: '14px', fontWeight: '600' }}>180g / 250g</span>
                </div>
                <div style={{ 
                  height: '8px', 
                  background: '#e0e0e0', 
                  borderRadius: '4px',
                  overflow: 'hidden'
                }}>
                  <div style={{ 
                    width: '72%', 
                    height: '100%', 
                    background: '#4CAF50',
                    borderRadius: '4px'
                  }}></div>
                </div>
              </div>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                  <span style={{ fontSize: '14px', color: '#666' }}>Protein</span>
                  <span style={{ fontSize: '14px', fontWeight: '600' }}>95g / 120g</span>
                </div>
                <div style={{ 
                  height: '8px', 
                  background: '#e0e0e0', 
                  borderRadius: '4px',
                  overflow: 'hidden'
                }}>
                  <div style={{ 
                    width: '79%', 
                    height: '100%', 
                    background: '#FF9800',
                    borderRadius: '4px'
                  }}></div>
                </div>
              </div>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                  <span style={{ fontSize: '14px', color: '#666' }}>Fat</span>
                  <span style={{ fontSize: '14px', fontWeight: '600' }}>45g / 65g</span>
                </div>
                <div style={{ 
                  height: '8px', 
                  background: '#e0e0e0', 
                  borderRadius: '4px',
                  overflow: 'hidden'
                }}>
                  <div style={{ 
                    width: '69%', 
                    height: '100%', 
                    background: '#2196F3',
                    borderRadius: '4px'
                  }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <button 
            className="btn btn-secondary"
            onClick={() => onNavigate('upload')}
            style={{ 
              fontSize: '18px', 
              padding: '16px 32px',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              margin: '0 auto'
            }}
          >
            <i className="fas fa-plus"></i>
            Add Meal
          </button>
        </div>

        <div className="card">
          <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#333', marginBottom: '16px' }}>
            Recent Meals
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {todaysMeals.length > 0 ? (
              todaysMeals.map((meal, index) => (
                <div key={index} style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center',
                  padding: '12px',
                  background: '#f8f9fa',
                  borderRadius: '8px'
                }}>
                  <div>
                    <div style={{ fontWeight: '600', fontSize: '14px' }}>{meal.type}</div>
                    <div style={{ fontSize: '12px', color: '#666' }}>{meal.name}</div>
                  </div>
                  <div style={{ fontWeight: '600', color: '#4CAF50' }}>{meal.calories} kcal</div>
                </div>
              ))
            ) : (
              <div style={{ 
                textAlign: 'center', 
                padding: '32px',
                color: '#666',
                fontSize: '14px'
              }}>
                No meals logged today. Start by adding your first meal!
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;