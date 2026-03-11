import React, { useState } from 'react';

function DynamicForm({ fields, onSubmit }) {
  const [formData, setFormData] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({}); 
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
      {fields.map((field) => (
        <div key={field} style={{ display: 'flex', flexDirection: 'column' }}>
          <label style={{ 
            fontSize: '0.85rem', 
            fontWeight: 'bold', 
            color: '#3b4151',
            marginBottom: '5px',
            textTransform: 'capitalize'
          }}>
            {field.replace(/([A-Z])/g, ' $1')} {/* Add spaces to camelCase */}
          </label>
          <input
            name={field}
            type={field.toLowerCase().includes('date') ? 'date' : field.toLowerCase().includes('time') ? 'time' : 'text'}
            value={formData[field] || ''}
            onChange={handleChange}
            placeholder={field}
            style={{
              padding: '10px',
              borderRadius: '4px',
              border: '1px solid #d8d8d8',
              backgroundColor: '#fff',      
              color: '#333',                
              fontSize: '1rem'
            }}
          />
        </div>
      ))}
      <button type="submit" style={{
        padding: '10px 20px',
        backgroundColor: '#1b1b1b',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        fontWeight: 'bold',
        width: 'fit-content'
      }}>
        Submit
      </button>
    </form>
  );
}

export default DynamicForm;