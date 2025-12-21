'use client';

import React, { useEffect, useState } from 'react';
import Papa from 'papaparse';

export default function CEFRGrammarPage() {
  const [csvFiles, setCsvFiles] = useState([]);

  useEffect(() => {
    const files = [
      { path: '/cefr/CEFR UNFETTERED.csv', title: 'CEFR UNFETTERED' },
      { path: '/cefr/amadeusgrammar.csv', title: 'Amadeus Grammar' },
    ];

    files.forEach(async (file) => {
      const response = await fetch(file.path);
      const csvText = await response.text();
      const parsed = Papa.parse(csvText, { header: true });
      setCsvFiles((prev) => [...prev, { ...file, data: parsed.data }]);
    });
  }, []);

  const renderTable = (data) => {
    if (!data || data.length === 0) return <p>No data found</p>;

    const headers = Object.keys(data[0]);

    return (
      <table border="1" cellPadding="5" style={{ borderCollapse: 'collapse', marginBottom: '40px' }}>
        <thead>
          <tr>
            {headers.map((header) => (
              <th key={header}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, idx) => (
            <tr key={idx}>
              {headers.map((header) => (
                <td key={header}>{row[header]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  return (
    <div style={{ padding: '20px' }}>
      {csvFiles.map((file, idx) => (
        <div key={idx}>
          <h1>{file.title}</h1>
          {renderTable(file.data)}
        </div>
      ))}
    </div>
  );
}
