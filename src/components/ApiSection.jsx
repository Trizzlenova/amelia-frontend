import { useState } from 'react';
import DynamicForm from './DynamicForm';
import DynamicTable from './DynamicTable';
import CopyJsonButton from './CopyJsonButton'; // Import it!

// url: https://amelia-backend-bf037be2cd8d.herokuapp.com${config.endpoint}


function ApiSection({ id, config }) {

    const BASE_URL = 'https://amelia-backend-bf037be2cd8d.herokuapp.com'
    let fullUrl = `${BASE_URL}${config.endpoint}`

    const [isOpen, setIsOpen] = useState(false);
    const [data, setData] = useState([]);
    const [successMessage, setSuccessMessage] = useState("");

    // Helper to get color based on method
    const methodColors = {
        GET: '#61affe',
        POST: '#49cc90',
        PUT: '#fca130',
        DELETE: '#f93e3e'
    };


    const handleFormSubmit = async (formData) => {
        const isGet = config.method === 'GET';
        const url = isGet 
            ? `${fullUrl}?${new URLSearchParams(formData)}` 
            : fullUrl;

        const options = {
            method: config.method,
            headers: isGet ? {} : { 'Content-Type': 'application/json' },
            body: isGet ? null : JSON.stringify(formData)
        };

        try {
            const response = await fetch(url, options);
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            
            const result = await response.json();

            // Single logic gate for state updates
            if (isGet) {
                setData(result);
            } else {
                setData(prev => [...prev, result]);
                setSuccessMessage("The post to your database was successful!");
                setTimeout(() => setSuccessMessage(""), 5000);
            }
        } catch (error) {
            console.error("API call failed:", error);
            alert("Request failed. Check console for details.");
        }
    };

    return (
        <div style={{ marginBottom: '10px' }}>
            {/* 1. The Main Header Bar */}
            <div 
                onClick={() => setIsOpen(!isOpen)} 
                style={{ 
                display: 'flex', 
                alignItems: 'center', 
                width: '100%', 
                padding: '8px', 
                backgroundColor: config.method === 'GET' ? '#ebf3fb' : '#e8f6f0', 
                border: `1px solid ${config.method === 'GET' ? '#61affe' : '#49cc90'}`,
                borderRadius: '4px', 
                cursor: 'pointer'
                }}
            >
                {/* Method Badge */}
                <span style={{ 
                backgroundColor: config.method === 'GET' ? '#61affe' : '#49cc90', 
                color: 'white', 
                padding: '4px 10px', 
                borderRadius: '4px', 
                fontWeight: 'bold',
                fontSize: '0.85rem',
                marginRight: '15px'
                }}>
                {config.method}
                </span>

                {/* URL and Description (Flex-Grow pushes the arrow to the right) */}
                <div style={{ flexGrow: 1, display: 'flex', alignItems: 'baseline', gap: '10px' }}>
                <code style={{ fontWeight: '600', color: '#3b4151' }}>{fullUrl}</code>
                <span style={{ color: '#555', fontSize: '0.85rem' }}>{config.description}</span>
                </div>

                {/* 2. THE ARROW ICON */}
                <span style={{ 
                fontSize: '1.2rem', 
                color: '#3b4151', 
                paddingRight: '10px',
                fontWeight: 'bold',
                userSelect: 'none', // Prevents highlighting the arrow text on click
                // Optional: Add a smooth rotation transition
                transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                transition: 'transform 0.2s ease-in-out'
                }}>
                ▼
                </span>
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
                {successMessage && (
                <div style={{
                    marginTop: '20px',
                    padding: '12px',
                    backgroundColor: '#e8f6f0', // Light green background
                    border: '1px solid #49cc90', // Strong green border
                    borderRadius: '4px',
                    color: '#1a5c3d',           // Dark green text for readability
                    fontWeight: 'bold',
                    fontSize: '0.9rem',
                    textAlign: 'center'
                }}>
                    ✓ {successMessage}
                </div>
                )}
                {/* Only show table if we have data from a search/get */}
                {data.length > 0 && (
                <>
                    <hr style={{ margin: '20px 0', color: '#3b4151' }} />
                    <DynamicTable data={data} />
                </>
                )}
            </div>
            )}
        </div>
    );
}

export default ApiSection;