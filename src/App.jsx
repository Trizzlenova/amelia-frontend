import { useState, useEffect } from 'react';

// components
import { API_CONFIG } from './apiConfig';
import ApiSection from './components/ApiSection'
import Filter from './components/Filter';

// test url: fetch('https://amelia-backend-bf037be2cd8d.herokuapp.com/appointments/')

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [copied, setCopied] = useState(false);

  // Logic to filter the keys
  const filteredResourceKeys = Object.keys(API_CONFIG).filter((key) =>
    API_CONFIG[key].title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCopyBaseUrl = (endpoint) => {
    const baseUrl = `https://amelia-backend-bf037be2cd8d.herokuapp.com${endpoint}`;
    navigator.clipboard.writeText(baseUrl);

    e.stopPropagation(); // Prevents the dropdown from toggling when clicking the icon
    navigator.clipboard.writeText(fullUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div style={{ 
      width: '100%', maxWidth: '1200px', margin: '0 auto', padding: '40px 20px',
      color: '#fff', minHeight: '100vh', fontFamily: 'Inter, sans-serif'
    }}>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '10px' }}>Amelia Academy API Dashboard</h1>
      
      {/* Render the Filter Component */}
      <Filter 
        searchTerm={searchTerm} 
        setSearchTerm={setSearchTerm} 
        resultsCount={filteredResourceKeys.length} 
      />

      <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
        {filteredResourceKeys.length > 0 ? (
          filteredResourceKeys.map((resourceKey) => {

            const resource = API_CONFIG[resourceKey];
            const baseEndpoint = resource.actions[0]?.endpoint || '';

            return (
              <div key={resourceKey} style={{ width: '100%' }}>
                <h2 style={{ 
                  borderBottom: '1px solid #333', 
                  paddingBottom: '12px', 
                  marginBottom: '20px',
                  color: '#eee',
                  display: 'flex', 
                  alignItems: 'center',
                  gap: '12px'
                }}>
                  {resource.title}
                  
                  <span 
                    onClick={() => handleCopyBaseUrl(baseEndpoint)}
                    title="Copy Base URL"
                    style={{ 
                      cursor: 'pointer', 
                      fontSize: '0.9rem', 
                      opacity: 0.5,
                      transition: 'opacity 0.2s'
                    }}
                    onMouseEnter={(e) => e.target.style.opacity = 1}
                    onMouseLeave={(e) => e.target.style.opacity = 0.5}
                  >
                    🔗
                  </span>
                </h2>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {resource.actions.map((action, index) => (
                    <ApiSection key={`${resourceKey}-${index}`} config={action} />
                  ))}
                </div>
              </div>
            );
          })
        ) : (
          <div style={{ textAlign: 'center', marginTop: '50px', color: '#555' }}>
            <h2>No resources found matching your search.</h2>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;