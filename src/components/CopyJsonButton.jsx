import { useState } from 'react';
import { generateJsonTemplate } from '../utils'; // Your utility file

function CopyJsonButton({ fields }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const template = generateJsonTemplate(fields);
    await navigator.clipboard.writeText(template);
    
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button 
      onClick={handleCopy}
      style={{
        padding: '5px 10px',
        backgroundColor: copied ? '#49cc90' : '#f0f0f0',
        color: copied ? 'white' : '#333',
        border: '1px solid #ccc',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '0.8rem'
      }}
    >
      {copied ? 'Copied!' : 'Copy JSON Template'}
    </button>
  );
}

export default CopyJsonButton;