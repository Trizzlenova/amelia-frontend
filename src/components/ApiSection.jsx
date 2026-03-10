import { useState } from 'react';
import DynamicForm from './DynamicForm';
import DynamicTable from './DynamicTable';
import CopyJsonButton from './CopyJsonButton'; // Import it!

// url: https://amelia-backend-bf037be2cd8d.herokuapp.com${config.endpoint}


function ApiSection({ id, config }) {

    const BASE_URL = 'https://amelia-backend-bf037be2cd8d.herokuapp.com'
    const [isOpen, setIsOpen] = useState(false);
    const [data, setData] = useState([]);

    // Helper to get color based on method
    const methodColors = {
        GET: '#61affe',
        POST: '#49cc90',
        PUT: '#fca130',
        DELETE: '#f93e3e'
    };


    const handleFormSubmit = async (formData) => {
        let url = `https://amelia-backend-bf037be2cd8d.herokuapp.com${config.endpoint}`;
        let options = { method: config.method };

        // If it's a GET, append params to URL
        if (config.method === 'GET') {
            const params = new URLSearchParams(formData).toString();
            url = `${url}?${params}`;
        } else {
            // If it's a POST/PUT, send JSON
            options.headers = { 'Content-Type': 'application/json' };
            options.body = JSON.stringify(formData);
        }

        try {
            const response = await fetch(url, options);
            const result = await response.json();

            // Update your table state!
            if (config.method === 'GET') {
            // For GET, we assume the response is the new list to display
            setData(result);
            } else {
            // For POST, we assume the response is the single new item created
            setData([...data, result]);
            }
        } catch (error) {
            console.error("API call failed:", error);
            alert("Something went wrong with the request.");
        }
    };

    return (
    <div style={{ marginBottom: '20px' }}>
        {/* 1. Title Header (Outside the clickable box) */}
        <h3 style={{ marginBottom: '5px' }}>{config.label}</h3>

        {/* 2. The Clickable "Swagger" Bar */}
        <div 
    onClick={() => setIsOpen(!isOpen)} 
    style={{ 
        display: 'flex',          // This keeps everything in a row
        alignItems: 'center',     // This centers them vertically
        gap: '12px',              // This gives them breathing room
        padding: '10px', 
        backgroundColor: '#f7f7f7', 
        cursor: 'pointer',
        borderBottom: isOpen ? '1px solid #ddd' : 'none'
    }}
    >
    {/* The Method Badge */}
    <span style={{ 
        backgroundColor: methodColors[config.method], 
        color: 'white', 
        padding: '4px 8px', 
        borderRadius: '4px',
        fontWeight: 'bold',
        minWidth: '60px',
        textAlign: 'center'
    }}>
        {config.method}
    </span>

    {/* The Full URL */}
    <code style={{ fontSize: '1rem', fontWeight: '600', color: '#333' }}>
        {BASE_URL}{config.endpoint}
    </code>
    
    {/* The Description */}
    <span style={{ color: '#666', fontSize: '0.9rem', marginLeft: 'auto' }}>
        {config.description}
    </span>
    </div>

      {/* 3. Collapsible Content */}
      {isOpen && (
        <div style={{ padding: '20px', border: '1px solid #ddd' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h4>Form Payload</h4>
            <CopyJsonButton fields={config.fields} />
            </div>
            
            <DynamicForm fields={config.fields} onSubmit={handleFormSubmit} />
            <hr />
            <DynamicTable data={data} />
        </div>
      )}
    </div>
  );
}

export default ApiSection;