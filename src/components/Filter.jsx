import React from 'react';

function Filter({ searchTerm, setSearchTerm, resultsCount }) {
  return (
    <div style={{ marginBottom: '40px' }}>
      <div style={{ position: 'relative' }}>
        <input 
          autoFocus
          type="text"
          placeholder="Search resources (e.g. 'Appointments')..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            width: '100%',
            padding: '14px 20px',
            borderRadius: '8px',
            border: '1px solid #444',
            backgroundColor: '#1a1a1a',
            color: '#fff',
            fontSize: '1.1rem',
            outline: 'none',
            boxShadow: '0 4px 6px rgba(0,0,0,0.3)'
          }}
        />
        {searchTerm && (
          <button 
            onClick={() => setSearchTerm("")}
            style={{
              position: 'absolute',
              right: '15px',
              top: '50%',
              transform: 'translateY(-50%)',
              background: 'none',
              border: 'none',
              color: '#888',
              cursor: 'pointer',
              fontSize: '1.2rem'
            }}
          >
            ✕
          </button>
        )}
      </div>
      {searchTerm && (
        <p style={{ marginTop: '12px', color: '#61affe', fontSize: '0.9rem', fontWeight: 'bold' }}>
          Found {resultsCount} resource{resultsCount !== 1 ? 's' : ''} matching "{searchTerm}"
        </p>
      )}
    </div>
  );
}

export default Filter;