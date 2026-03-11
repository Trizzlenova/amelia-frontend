import { useState } from 'react';
import ApiHeader from './ApiHeader';
import DangerZone from './DangerZone';
import DynamicForm from './DynamicForm';
import DynamicTable from './DynamicTable';
import CopyJsonButton from './CopyJsonButton';

// url: https://amelia-backend-bf037be2cd8d.herokuapp.com${config.endpoint}

const methodColors = { GET: '#61affe', POST: '#49cc90', PUT: '#fca130', DELETE: '#f93e3e' };
const methodLightColors = { GET: '#ebf3fb', POST: '#e8f6f0', PUT: '#fff7e6', DELETE: '#fff0f0' };

function ApiSection({ config }) {
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");
  const fullUrl = `https://amelia-backend-bf037be2cd8d.herokuapp.com${config.endpoint}`;

  const handleFormSubmit = async (formData) => {
    const isGet = config.method === 'GET';
    const isDelete = config.method === 'DELETE';
    const isPut = config.method === 'PUT';

    let url = fullUrl;

    if (config.isPathParams) {
        Object.keys(formData).forEach(key => {
            url = url.replace(`:${key}`, formData[key]);
        });
    } else if (isGet) {
        // Standard GET with Query Params (?reason=text)
        url = `${fullUrl}?${new URLSearchParams(formData)}`;
    }

    let payload = { ...formData };

    Object.keys(formData).forEach(key => {
        if (key.includes('.')) {
            const [parent, child] = key.split('.');
            if (!payload[parent]) payload[parent] = {};
            payload[parent][child] = formData[key];
        } else {
            payload[key] = formData[key];
        }
    });

    if (payload.visitors) {
        ['guests', 'passwords'].forEach(key => {
            let val = payload.visitors[key];
            // If it's not already a JSON string (starting with [), wrap it
            if (typeof val === 'string' && !val.trim().startsWith('[')) {
                payload.visitors[key] = JSON.stringify(val.split(',').map(s => s.trim()));
            }
        });
    }
    
    const options = {
      method: config.method,
      headers: isGet ? {} : { 'Content-Type': 'application/json' },
      body: isGet ? null : JSON.stringify(formData)
    };

    try {
        const response = await fetch(url, options);
        const result = await response.json();

        if (response.ok && !result.error) {
            if (isGet) {
                const keys = Object.keys(result);
                let actualData = result;

                if (keys.length === 2 && keys.includes('error')) {
                    const dataKey = keys.find(k => k !== 'error');
                    actualData = result[dataKey];
                } 
    
                setData(Array.isArray(actualData) ? actualData : [actualData]);
            } else if (isDelete) {
                setData([]);
                setSuccessMessage("User database cleared.");
            } else if (isPut) {
                setSuccessMessage(result.result || "Update successful!");
            } else {
                setData(prev => [...prev, result]);
                setSuccessMessage("User created successfully!");
            }
        } else {
            const errorMessage = result.error || "Update failed. Please check your inputs.";
            alert(`Backend Error: ${errorMessage}`);
        }
        setTimeout(() => setSuccessMessage(""), 5000);
    } catch (e) {
        console.error("API Error:", e);
    }
  };

  return (
    <div style={{ marginBottom: '15px' }}>
      <ApiHeader fullUrl={fullUrl} config={config} isOpen={isOpen} setIsOpen={setIsOpen} methodColors={methodColors} methodLightColors={methodLightColors} />

      {isOpen && (
        <div style={{ padding: '20px', border: '1px solid #ddd', borderTop: 'none', backgroundColor: '#fafafa' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
                <p style={{ margin: 0, color: '#3b4151' }}>{config.description}</p>
                <div style={{ textAlign: 'right' }}>
                    <a href={fullUrl} target="_blank" rel="noreferrer" style={{ 
                    color: '#4990e2', fontSize: '0.9rem', textDecoration: 'none', fontWeight: 'bold' 
                    }}>
                    View Live JSON ↗
                    </a>
                </div>
            </div>
          
          {/* GET */}
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

          {/* POST */}
          {config.method === 'POST' && (
            <>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', color: '#3b4151' }}>
                <h4>Parameters</h4>
                <CopyJsonButton fields={config.fields} />
              </div>
              <DynamicForm fields={config.fields} onSubmit={handleFormSubmit} />
            </>
          )}



          {/* PUT */}
          {config.method === 'PUT' && (
            <>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                <h4 style={{ color: '#3b4151', margin: 0 }}>Parameters</h4>
                </div>
                
                <div style={{ marginTop: '15px' }}>
                    <DynamicForm fields={config.fields} onSubmit={handleFormSubmit} />
                </div>
            </>
            )}
          
          {/* DELETE */}
          {config.method === 'DELETE' && <DangerZone endpoint={config.trueEndpoint} onConfirm={() => handleFormSubmit({})} />}

          {successMessage && <div style={{ marginTop: '10px', color: '#1a5c3d', backgroundColor: '#e8f6f0', padding: '10px', borderRadius: '4px' }}>✓ {successMessage}</div>}
          
          {data.length > 0 && <DynamicTable data={data} />}
        </div>
      )}
    </div>
  );
}

export default ApiSection;