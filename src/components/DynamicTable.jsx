function DynamicTable({ data }) {
  if (!data || data.length === 0) return <p style={{ padding: '20px', color: '#666' }}>No data found.</p>;

  // 1. Get headers from the first object
  const headers = Object.keys(data[0]).filter(key => key !== '_id' && key !== '__v');

  return (
    <div style={{ overflowX: 'auto', marginTop: '20px' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', backgroundColor: '#fff', color: '#333' }}>
        <thead>
          <tr style={{ backgroundColor: '#f4f4f4' }}>
            {headers.map(header => (
              <th key={header} style={{ padding: '12px', borderBottom: '2px solid #ddd', textAlign: 'left', fontSize: '0.85rem' }}>
                {header.toUpperCase()}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index} style={{ borderBottom: '1px solid #eee' }}>
              {headers.map(key => {
                const value = item[key];
                
                return (
                  <td key={key} style={{ padding: '10px', fontSize: '0.85rem' }}>
                    {Array.isArray(value) ? (
                        value.join(', ') 
                        ) : typeof value === 'object' && value !== null ? (
                        value.first_name || value.last_name 
                            ? `${value.first_name || ''} ${value.last_name || ''} (${value.email || ''})`.trim() 
                            : JSON.stringify(value)
                        ) : (
                        value?.toString() || <span style={{ color: '#ccc' }}>N/A</span>
                    )}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DynamicTable;