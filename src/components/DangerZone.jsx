import { useState } from 'react';

function DangerZone({ endpoint, onConfirm }) {
  const [isConfirming, setIsConfirming] = useState(false);

  return (
    <div style={{ padding: '30px', backgroundColor: '#fff5f5', border: '1px solid #f93e3e', borderRadius: '4px', textAlign: 'center' }}>
      <h4 style={{ color: '#c53030', marginTop: 0 }}>Danger Zone</h4>
      <p style={{ color: '#666' }}>Permanently wipe the <strong>{endpoint}</strong> collection.</p>

      {!isConfirming ? (
        <button onClick={() => setIsConfirming(true)} style={{ padding: '10px 25px', backgroundColor: '#f93e3e', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          Clear Database
        </button>
      ) : (
        <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
          <button onClick={() => { onConfirm(); setIsConfirming(false); }} style={{ padding: '10px 25px', backgroundColor: '#c53030', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
            Yes, Delete Everything
          </button>
          <button onClick={() => setIsConfirming(false)} style={{ padding: '10px 25px', backgroundColor: '#eee', borderRadius: '4px', cursor: 'pointer' }}>
            Cancel
          </button>
        </div>
      )}
    </div>
  );
}

export default DangerZone;