'use client';
import { useEffect, useState } from "react";
import Papa from "papaparse";

export default function MaterialPage() {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Fetch CSV from the public folder
    fetch("/material/materialListClean.csv")
      .then((response) => response.text())
      .then((csvText) => {
        // Parse CSV text
        const parsed = Papa.parse(csvText, { header: true });
        setData(parsed.data);
      })
      .catch((err) => console.error("Error loading CSV:", err));
  }, []);

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Material List</h1>
      {data.length > 0 ? (
        <table border="1" cellPadding="5" cellSpacing="0">
          <thead>
            <tr>
              {Object.keys(data[0]).map((key) => (
                <th key={key}>{key}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, idx) => (
              <tr key={idx}>
                {Object.values(row).map((value, i) => (
                  <td key={i}>{value}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Loading CSV...</p>
      )}
    </div>
  );
}
