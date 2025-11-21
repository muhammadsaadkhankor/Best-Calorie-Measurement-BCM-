import React, { useState } from 'react';
import PhotoCapture from './components/PhotoCapture';
import Results from './components/Results';

function App() {
  const [currentView, setCurrentView] = useState('capture');
  const [results, setResults] = useState(null);

  const handleResults = (data) => {
    setResults(data);
    setCurrentView('results');
  };

  const handleBack = () => {
    setCurrentView('capture');
    setResults(null);
  };

  return (
    <div className="App">
      {currentView === 'capture' && (
        <PhotoCapture onResults={handleResults} />
      )}
      {currentView === 'results' && (
        <Results data={results} onBack={handleBack} />
      )}
    </div>
  );
}

export default App;