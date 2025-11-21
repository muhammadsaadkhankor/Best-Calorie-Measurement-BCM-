import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import AuthScreen from './components/AuthScreen';
import PhotoCapture from './components/PhotoCapture';
import Results from './components/Results';
import ProfileScreen from './components/ProfileScreen';
import HistoryScreen from './components/HistoryScreen';

export default function App() {
  const [currentView, setCurrentView] = useState('auth');
  const [results, setResults] = useState(null);
  const [user, setUser] = useState(null);
  const [globalTheme, setGlobalTheme] = useState('Light');
  const [userProfilePhoto, setUserProfilePhoto] = useState(null);
  const [mealHistory, setMealHistory] = useState([]);

  const handleLogin = (userData) => {
    setUser(userData);
    setCurrentView('capture');
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentView('auth');
    setResults(null);
  };

  const handleResults = (data) => {
    setResults(data);
    setCurrentView('results');
    
    // Add meal to history
    const newMeal = {
      id: Date.now(),
      timestamp: new Date().toISOString(),
      ...data
    };
    setMealHistory(prev => [newMeal, ...prev]);
  };

  const handleBack = () => {
    setCurrentView('capture');
    setResults(null);
  };

  const handleShowProfile = () => {
    setCurrentView('profile');
  };

  const handleShowHistory = () => {
    setCurrentView('history');
  };

  const handleUpdateProfile = (updatedUser) => {
    setUser(updatedUser);
  };

  const handleUpdateProfilePhoto = (photoUri) => {
    setUserProfilePhoto(photoUri);
  };

  const handleBackToCapture = () => {
    setCurrentView('capture');
  };

  return (
    <>
      <StatusBar style="auto" />
      {currentView === 'auth' && (
        <AuthScreen onLogin={handleLogin} globalTheme={globalTheme} />
      )}
      {currentView === 'capture' && (
        <PhotoCapture 
          onResults={handleResults} 
          user={user}
          onShowProfile={handleShowProfile}
          onShowHistory={handleShowHistory}
          onLogout={handleLogout}
          globalTheme={globalTheme}
          setGlobalTheme={setGlobalTheme}
          userProfilePhoto={userProfilePhoto}
        />
      )}
      {currentView === 'results' && (
        <Results data={results} onBack={handleBack} globalTheme={globalTheme} />
      )}
      {currentView === 'profile' && (
        <ProfileScreen 
          user={user}
          onUpdateProfile={handleUpdateProfile}
          onLogout={handleLogout}
          onBack={handleBackToCapture}
          globalTheme={globalTheme}
          setGlobalTheme={setGlobalTheme}
          userProfilePhoto={userProfilePhoto}
          onUpdateProfilePhoto={handleUpdateProfilePhoto}
        />
      )}
      {currentView === 'history' && (
        <HistoryScreen 
          onBack={handleBackToCapture}
          globalTheme={globalTheme}
          mealHistory={mealHistory}
          setMealHistory={setMealHistory}
        />
      )}
    </>
  );
}