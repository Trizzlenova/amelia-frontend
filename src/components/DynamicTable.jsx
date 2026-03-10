function DynamicTable({ data }) {
  if (data.length === 0) return <p>No data found.</p>;

  // 1. Get the keys from the first object to use as table headers
  // We filter out '_id' because it's usually just an ugly database string
  const headers = Object.keys(data[0]).filter(key => key !== '_id' && key !== '__v');

  return (
    <table>
      <thead>
        <tr>
          {headers.map(header => <th key={header}>{header}</th>)}
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr key={index}>
            {headers.map(key => (
              <td key={key}>{item[key]?.toString()}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default DynamicTable;