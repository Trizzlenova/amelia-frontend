function ApiHeader({ fullUrl, config, isOpen, setIsOpen, methodColors, methodLightColors }) {
  const formattedEndpoint = fullUrl.split('/').map(part => 
    part.startsWith(':') ? (
        <span key={part} style={{ color: '#a566e4ff', fontWeight: 'bold' }}>{part}</span>
    ) : part
  ).reduce((prev, curr) => [prev, '/', curr]);

  return (
    <div 
      onClick={() => setIsOpen(!isOpen)} 
      style={{ 
        display: 'flex', alignItems: 'center', width: '100%', padding: '4px 10px', 
        backgroundColor: methodLightColors[config.method], color: '#3b4151',
        border: `1px solid ${methodColors[config.method]}`,
        borderRadius: '4px', cursor: 'pointer', boxSizing: 'border-box'
      }}
    >
      <span style={{ 
        backgroundColor: methodColors[config.method], color: 'white', 
        padding: '6px 12px', borderRadius: '4px', fontWeight: 'bold', 
        fontSize: '0.85rem', marginRight: '15px', minWidth: '80px', textAlign: 'center'
      }}>
        {config.method}
      </span>
      <div style={{ flexGrow: 1, display: 'flex', alignItems: 'baseline', gap: '10px' }}>
        <code style={{ fontWeight: 'bold', color: '#3b4151' }}>{formattedEndpoint}</code>
        <span style={{ color: '#666', fontSize: '0.85rem' }}>{config.description}</span>
      </div>
      <span style={{ fontSize: '0.9rem', transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: '0.2s' }}>▼</span>
    </div>
  );
}

export default ApiHeader;