import { useState } from 'react';
import DynamicForm from './DynamicForm';
import DynamicTable from './DynamicTable';
import CopyJsonButton from './CopyJsonButton'; // Import it!

// url: https://amelia-backend-bf037be2cd8d.herokuapp.com${config.endpoint}


function ApiSection({ id, config }) {

    const BASE_URL = 'https://amelia-backend-bf037be2cd8d.herokuapp.com'
    const fullUrl = `${BASE_URL}${config.endpoint}`

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
        let options = { method: config.method };
        let url = `${BASE_URL}${config.endpoint}`;
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
            {/* The Header Bar (Clickable) */}
            <div 
            onClick={() => setIsOpen(!isOpen)} 
            style={{ 
                display: 'flex', 
                alignItems: 'center', 
                width: '100%', // Crucial for full-width
                padding: '8px', 
                backgroundColor: config.method === 'GET' ? '#ebf3fb' : '#e8f6f0', // Light background for the bar
                border: `1px solid ${config.method === 'GET' ? '#61affe' : '#49cc90'}`,
                borderRadius: '4px', 
                cursor: 'pointer',
                transition: 'background-color 0.2s'
            }}
            >
            <span style={{ 
                backgroundColor: config.method === 'GET' ? '#61affe' : '#49cc90', 
                color: 'white', 
                padding: '6px 12px', 
                borderRadius: '4px', 
                fontWeight: 'bold',
                fontSize: '0.85rem',
                minWidth: '80px',
                textAlign: 'center',
                marginRight: '15px'
            }}>
                {config.method}
            </span>
            <code style={{ fontWeight: '600', color: '#3b4151' }}>{fullUrl}</code>
            </div>

            {isOpen && (
            <div style={{ padding: '20px', border: '1px solid #ddd', borderTop: 'none', backgroundColor: '#fafafa' }}>
                
                {/* Header Row: Description and External Link */}
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
                <p style={{ margin: 0, color: '#3b4151' }}>{config.description}</p>
                
                {/* Link to actual live JSON on Heroku */}
                <div style={{ textAlign: 'right' }}>
                    <a href={fullUrl} target="_blank" rel="noreferrer" style={{ 
                    color: '#4990e2', fontSize: '0.9rem', textDecoration: 'none', fontWeight: 'bold' 
                    }}>
                    View Live JSON ↗
                    </a>
                </div>
                </div>

                {/* Conditional Schema Block: Only shows for GET */}
                {config.method === 'GET' && config.schema && (
                <div style={{ marginBottom: '20px' }}>
                    <div style={{ fontSize: '0.85rem', marginBottom: '10px' }}>
                    {/* <span style={{ fontWeight: 'bold', borderBottom: '2px solid #3b4151', paddingBottom: '2px' }}>Example Value</span> */}
                    <span style={{ color: '#3b4151' }}>Example Schema</span>
                    </div>
                    <pre style={{ 
                    backgroundColor: '#333', color: '#fff', padding: '20px', borderRadius: '4px', 
                    overflowX: 'auto', fontSize: '0.9rem' 
                    }}>
                    <code>{JSON.stringify(config.schema, null, 2)}</code>
                    </pre>
                </div>
                )}

                {/* 2. Hide Parameters and Form IF the method is GET */}
                {config.method !== 'GET' && (
                <>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '20px' }}>
                    <h4 style={{ margin: 0, color: '#3b4151' }}>Parameters</h4>
                    {config.method === 'POST' && <CopyJsonButton fields={config.fields} />}
                    </div>
                    
                    <div style={{ marginTop: '15px' }}>
                    <DynamicForm fields={config.fields} onSubmit={handleFormSubmit} />
                    </div>
                </>
                )}
                {/* Only show table if we have data from a search/get */}
                {data.length > 0 && (
                <>
                    <hr style={{ margin: '20px 0' }} />
                    <DynamicTable data={data} />
                </>
                )}
            </div>
            )}
        </div>
    );
}

export default ApiSection;