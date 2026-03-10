// src/components/DynamicForm.jsx
import { useState } from 'react';

function DynamicForm({ fields, onSubmit }) {
  const [formData, setFormData] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({}); // Clear inputs
  };

  return (
    <form onSubmit={handleSubmit} style={{ padding: '1rem', border: '1px solid #ccc' }}>
      <h3>Add New Entry</h3>
      {fields.map((field) => (
        <div key={field} style={{ marginBottom: '10px' }}>
          <label style={{ display: 'block', textTransform: 'capitalize' }}>{field}:</label>
          <input 
            name={field} 
            value={formData[field] || ''} 
            onChange={handleChange} 
            required 
          />
        </div>
      ))}
      <button type="submit">Submit</button>
    </form>
  );
}

export default DynamicForm;