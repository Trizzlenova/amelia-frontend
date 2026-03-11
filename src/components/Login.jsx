import React, { useState } from 'react';

const Login = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('https://amelia-backend-bf037be2cd8d.herokuapp.com/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      // Your backend returns a string on success or error
      if (typeof data === 'string' && data.includes('You created a user')) {
        onLoginSuccess(data);
      } else {
        setError("Invalid email or password");
      }
    } catch (err) {
      setError("Invalid email or password");
    }
  };

  return (
    <div style={{
      height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#111'
    }}>
      <form onSubmit={handleSubmit} style={{
        backgroundColor: '#1e1e1e', padding: '40px', borderRadius: '12px', width: '100%', maxWidth: '400px',
        boxShadow: '0 10px 25px rgba(0,0,0,0.5)', border: '1px solid #333'
      }}>
        <h2 style={{ color: '#fff', marginBottom: '20px', textAlign: 'center' }}>Amelia Academy Login</h2>
        
        {error && <p style={{ color: '#ff4d4d', textAlign: 'center', fontSize: '0.9rem' }}>{error}</p>}

        <input
          type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}
          required style={inputStyle}
        />
        <input
          type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}
          required style={inputStyle}
        />
        
        <button type="submit" style={buttonStyle}>Login</button>
      </form>
    </div>
  );
};

const inputStyle = {
  width: '100%', padding: '12px', marginBottom: '15px', borderRadius: '6px', border: '1px solid #444',
  backgroundColor: '#2a2a2a', color: '#fff', outline: 'none', boxSizing: 'border-box'
};

const buttonStyle = {
  width: '100%', padding: '12px', borderRadius: '6px', border: 'none', backgroundColor: '#a566e4',
  color: '#fff', fontWeight: 'bold', cursor: 'pointer', transition: 'background 0.2s'
};

export default Login;