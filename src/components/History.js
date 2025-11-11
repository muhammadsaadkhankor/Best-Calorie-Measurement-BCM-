import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import mealService from '../services/meals';

const History = ({ onNavigate, currentUser }) => {
  const { colors } = useTheme();
  const [activeFilter, setActiveFilter] = useState('Today');
  const userId = currentUser?.id || 'guest';
  const userMeals = mealService.getTodaysMeals(userId);
  const totalCalories = mealService.getTotalCaloriesToday(userId);
  
  const mealHistory = {
    'Today': userMeals.length > 0 ? userMeals : [],
    'Week': [
      { date: 'Today', calories: 1530, meals: 4 },
      { date: 'Yesterday', calories: 1890, meals: 5 },
      { date: 'Tuesday', calories: 1650, meals: 4 },
      { date: 'Monday', calories: 1720, meals: 4 },
      { date: 'Sunday', calories: 2100, meals: 5 },
      { date: 'Saturday', calories: 1980, meals: 4 },
      { date: 'Friday', calories: 1750, meals: 4 }
    ],
    'Month': [
      { week: 'This Week', avgCalories: 1745, totalMeals: 29 },
      { week: 'Last Week', avgCalories: 1820, totalMeals: 32 },
      { week: '2 Weeks Ago', avgCalories: 1690, totalMeals: 28 },
      { week: '3 Weeks Ago', avgCalories: 1780, totalMeals: 31 }
    ]
  };

  const filters = ['Today', 'Week', 'Month'];

  const renderTodayView = () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {userMeals.length > 0 ? userMeals.map((meal, index) => (
        <div key={index} className="card" style={{ padding: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '4px' }}>
                <span style={{ 
                  fontSize: '12px', 
                  fontWeight: '600', 
                  color: '#4CAF50',
                  background: '#f1f8e9',
                  padding: '4px 8px',
                  borderRadius: '12px'
                }}>
                  {meal.type}
                </span>
                <span style={{ fontSize: '14px', color: '#666' }}>{meal.time}</span>
              </div>
              <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#333' }}>
                {meal.name}
              </h3>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '18px', fontWeight: '700', color: '#4CAF50' }}>
                {meal.calories} kcal
              </div>
            </div>
          </div>
        </div>
      )) : (
        <div style={{ 
          textAlign: 'center', 
          padding: '48px',
          color: '#666'
        }}>
          <i className="fas fa-utensils" style={{ fontSize: '48px', marginBottom: '16px', opacity: 0.3 }}></i>
          <p>No meals logged today</p>
          <button 
            className="btn btn-primary"
            onClick={() => onNavigate('upload')}
            style={{ marginTop: '16px' }}
          >
            Add Your First Meal
          </button>
        </div>
      )}
    </div>
  );

  const renderWeekView = () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      {mealHistory.Week.map((day, index) => (
        <div key={index} style={{ 
          padding: '20px', 
          background: colors.surface,
          borderRadius: '12px',
          boxShadow: `0 2px 8px ${colors.shadow}`,
          border: `1px solid ${colors.border}`
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h3 style={{ fontSize: '16px', fontWeight: '600', color: colors.text, marginBottom: '4px' }}>
                {day.date}
              </h3>
              <p style={{ fontSize: '14px', color: colors.textSecondary }}>
                {day.meals} meals logged
              </p>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '18px', fontWeight: '700', color: '#4CAF50' }}>
                {day.calories} kcal
              </div>
              <div style={{ 
                fontSize: '12px', 
                color: day.calories > 2000 ? '#FF5722' : day.calories < 1500 ? '#FF9800' : '#4CAF50'
              }}>
                {day.calories > 2000 ? 'Over goal' : day.calories < 1500 ? 'Under goal' : 'On track'}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderMonthView = () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      {mealHistory.Month.map((week, index) => (
        <div key={index} style={{ 
          padding: '20px', 
          background: colors.surface,
          borderRadius: '12px',
          boxShadow: `0 2px 8px ${colors.shadow}`,
          border: `1px solid ${colors.border}`
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h3 style={{ fontSize: '16px', fontWeight: '600', color: colors.text, marginBottom: '4px' }}>
                {week.week}
              </h3>
              <p style={{ fontSize: '14px', color: colors.textSecondary }}>
                {week.totalMeals} meals logged
              </p>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '18px', fontWeight: '700', color: '#4CAF50' }}>
                {week.avgCalories} kcal
              </div>
              <div style={{ fontSize: '12px', color: colors.textSecondary }}>
                avg per day
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderContent = () => {
    switch (activeFilter) {
      case 'Today':
        return renderTodayView();
      case 'Week':
        return renderWeekView();
      case 'Month':
        return renderMonthView();
      default:
        return renderTodayView();
    }
  };

  return (
    <div className="mobile-safe-area" style={{ padding: '20px 0', minHeight: '100vh', background: colors.background }}>
      <div className="container">
          <div style={{ marginBottom: '32px' }}>
            <h1 style={{ fontSize: '32px', fontWeight: '700', color: '#333', marginBottom: '8px' }}>
              Meal History
            </h1>
            <p style={{ color: '#666', fontSize: '16px' }}>
              Track your calorie intake over time
            </p>
          </div>

          <div style={{ 
            display: 'flex', 
            gap: '8px', 
            marginBottom: '32px',
            background: colors.surface,
            padding: '4px',
            borderRadius: '12px',
            width: 'fit-content'
          }}>
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                style={{
                  padding: '8px 16px',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  background: activeFilter === filter ? '#4CAF50' : 'transparent',
                  color: activeFilter === filter ? 'white' : colors.textSecondary
                }}
              >
                {filter}
              </button>
            ))}
          </div>

          {activeFilter === 'Today' && (
            <div className="card" style={{ marginBottom: '24px', background: 'linear-gradient(135deg, #4CAF50, #45a049)', color: 'white' }}>
              <div style={{ textAlign: 'center' }}>
                <h2 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '8px' }}>
                  Today's Summary
                </h2>
                <div style={{ 
                  display: 'grid', 
                  gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))', 
                  gap: '16px'
                }}>
                  <div>
                    <div style={{ fontSize: '24px', fontWeight: '700' }}>{totalCalories}</div>
                    <div style={{ fontSize: '12px', opacity: 0.9 }}>Calories</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '20px', fontWeight: '600' }}>{userMeals.length}</div>
                    <div style={{ fontSize: '12px', opacity: 0.9 }}>Meals</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '20px', fontWeight: '600' }}>{Math.round((totalCalories / 2000) * 100)}%</div>
                    <div style={{ fontSize: '12px', opacity: 0.9 }}>Goal</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {renderContent()}

          <div style={{ textAlign: 'center', marginTop: '32px' }}>
            <button 
              className="btn btn-primary"
              onClick={() => onNavigate('upload')}
              style={{ fontSize: '16px', padding: '12px 24px' }}
            >
              <i className="fas fa-plus" style={{ marginRight: '8px' }}></i>
              Log New Meal
            </button>
          </div>
        </div>
      </div>
  );
};

export default History;