'use client';

import React, { useEffect, useState } from 'react';

export default function TheKidJsonPage() {
  const [jsonData, setJsonData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('/thekid/pdfText/sections.json')
      .then((res) => {
        if (!res.ok) throw new Error('JSON file not found');
        return res.json();
      })
      .then((data) => setJsonData(data))
      .catch((err) => setError(err.message));
  }, []);

  const renderTable = (data) => {
    if (!data) return <p>Loading JSON...</p>;

    if (Array.isArray(data) && data.length > 0 && typeof data[0] === 'object') {
      const headers = Object.keys(data[0]);
      return (
        <table border="1" cellPadding="5" style={{ borderCollapse: 'collapse', marginBottom: '40px' }}>
          <thead>
            <tr>{headers.map((h) => <th key={h}>{h}</th>)}</tr>
          </thead>
          <tbody>
            {data.map((row, idx) => (
              <tr key={idx}>
                {headers.map((h) => <td key={h}>{row[h]}</td>)}
              </tr>
            ))}
          </tbody>
        </table>
      );
    }

    if (typeof data === 'object') {
      return (
        <table border="1" cellPadding="5" style={{ borderCollapse: 'collapse', marginBottom: '40px' }}>
          <thead>
            <tr><th>Key</th><th>Value</th></tr>
          </thead>
          <tbody>
            {Object.entries(data).map(([k, v]) => (
              <tr key={k}>
                <td>{k}</td>
                <td>{typeof v === 'object' ? JSON.stringify(v, null, 2) : v}</td>
              </tr>
            ))}
          </tbody>
        </table>
      );
    }

    return <p>No displayable data</p>;
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Charlie Chaplin JSON</h1>
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      {renderTable(jsonData)}
    </div>
  );
}
