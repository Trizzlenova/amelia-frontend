import { useState } from 'react';
import { generateJsonTemplate } from '../utils';

function CopyJsonButton({ fields }) {
  const [copied, setCopied] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleCopy = async () => {
    const template = generateJsonTemplate(fields);
    await navigator.clipboard.writeText(template);
    
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const buttonStyle = {
    padding: '4px 16px',
    margin: '0px',
    backgroundColor: copied ? '#49cc90' : 'white',
    color: copied ? 'white' : '#4e0d90ff',
    width: 'fit-content',
    height: 'fit-content',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '0.85rem',
    fontWeight: 'bold',
    transition: 'all 0.2s ease',
    boxShadow: isHovered ? '0 4px 8px rgba(0,0,0,0.2)' : '0 2px 4px rgba(0,0,0,0.1)',
    transform: isHovered ? 'translateY(-1px)' : 'translateY(0)',
    outline: 'none',
  };

  return (
    <button 
      onClick={handleCopy}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={buttonStyle}
    >
      {copied ? '✓ Copied!' : 'Copy JSON Template'}
    </button>
  );
}

export default CopyJsonButton;