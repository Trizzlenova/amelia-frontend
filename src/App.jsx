import { useState, useEffect } from 'react';

// components
import { API_CONFIG } from './apiConfig';
import ApiSection from './components/ApiSection';

// test url: fetch('https://amelia-backend-bf037be2cd8d.herokuapp.com/appointments/')

function App() {
  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      <h1>API Dashboard</h1>
      {Object.keys(API_CONFIG).map((key) => (
        <ApiSection 
          key={key} 
          id={key} 
          config={API_CONFIG[key]} 
        />
      ))}
    </div>
  );
}

export default App;