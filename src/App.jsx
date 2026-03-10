import { useState, useEffect } from 'react';

// components
import { API_CONFIG } from './apiConfig';
import ApiSection from './components/ApiSection';

// test url: fetch('https://amelia-backend-bf037be2cd8d.herokuapp.com/appointments/')

function App() {
  return (
    <div style={{ 
      width: '100%', 
      maxWidth: '1200px', // Limits width on ultra-wide screens but stays large
      margin: '0 auto', 
      padding: '40px 20px',
      color: '#fff', // Assuming you want to keep the dark theme from your screenshot
      minHeight: '100vh'
    }}>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '30px' }}>API Dashboard</h1>
      
      {Object.keys(API_CONFIG).map((resourceKey) => {
        const resource = API_CONFIG[resourceKey];
        return (
          <div key={resourceKey} style={{ marginBottom: '50px', width: '100%' }}>
            <h2 style={{ 
              borderBottom: '1px solid #444', 
              paddingBottom: '10px', 
              marginBottom: '20px',
              fontSize: '1.5rem'
            }}>
              {resource.title}
            </h2>
            
            {/* This container ensures child sections stack vertically and fill width */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {resource.actions.map((action, index) => (
                <ApiSection 
                  key={`${resourceKey}-${index}`} 
                  config={action} 
                />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default App;