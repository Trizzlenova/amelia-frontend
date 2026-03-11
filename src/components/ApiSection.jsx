import { useState } from 'react';
import ApiHeader from './ApiHeader';
import DangerZone from './DangerZone';
import DynamicForm from './DynamicForm';
import DynamicTable from './DynamicTable';
import CopyJsonButton from './CopyJsonButton';

// url: https://amelia-backend-bf037be2cd8d.herokuapp.com${config.endpoint}

const methodColors = { GET: '#61affe', POST: '#49cc90', DELETE: '#f93e3e' };
const methodLightColors = { GET: '#ebf3fb', POST: '#e8f6f0', DELETE: '#fff0f0' };

function ApiSection({ config }) {
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");
  const fullUrl = `https://amelia-backend-bf037be2cd8d.herokuapp.com${config.endpoint}`;

  const handleFormSubmit = async (formData) => {
    const isGet = config.method === 'GET';
    const isDelete = config.method === 'DELETE';
    const url = isGet ? `${fullUrl}?${new URLSearchParams(formData)}` : fullUrl;
    
    const options = {
      method: config.method,
      headers: isGet ? {} : { 'Content-Type': 'application/json' },
      body: isGet ? null : JSON.stringify(formData)
    };

    try {
      const response = await fetch(url, options);
      const result = await response.json();
      if (isGet) setData(result);
      else if (isDelete) {
        setData([]);
        setSuccessMessage("The database was cleared successfully.");
      } else {
        setData(prev => [...prev, result]);
        setSuccessMessage("Post successful!");
      }
      setTimeout(() => setSuccessMessage(""), 5000);
    } catch (e) { console.error(e); }
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

          {config.method === 'POST' && (
            <>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', color: '#3b4151' }}>
                <h4>Parameters</h4>
                <CopyJsonButton fields={config.fields} />
              </div>
              <DynamicForm fields={config.fields} onSubmit={handleFormSubmit} />
            </>
          )}

          {config.method === 'DELETE' && <DangerZone endpoint={config.trueEndpoint} onConfirm={() => handleFormSubmit({})} />}

          {successMessage && <div style={{ marginTop: '10px', color: '#1a5c3d', backgroundColor: '#e8f6f0', padding: '10px', borderRadius: '4px' }}>✓ {successMessage}</div>}
          
          {data.length > 0 && <DynamicTable data={data} />}
        </div>
      )}
    </div>
  );
}

export default ApiSection;