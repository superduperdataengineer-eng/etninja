"use client"; // needed to fetch files from public

import { useEffect, useState } from "react";

export default function AllCSVPage() {
  const [allJsonData, setAllJsonData] = useState([]);

  // Your actual JSON files in public/actionCSV
  const files = [
    "LinesCSV.json",
    "newACTION.json",
    "TitlesCSV.json",
    "VOCABULARYCOPYCSVNEW.json",
    "VocabularyCSV.json"
  ];

  useEffect(() => {
    async function fetchJsonFiles() {
      const dataArray = await Promise.all(
        files.map(async (file) => {
          const res = await fetch(`/actionCSV/${file}`);
          const data = await res.json();
          return { fileName: file, data };
        })
      );
      setAllJsonData(dataArray);
    }

    fetchJsonFiles();
  }, []);

  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>All CSV JSON Files as Tables</h1>

      {allJsonData.length === 0 && <p>Loading JSON files…</p>}

      {allJsonData.map(({ fileName, data }) => {
        if (!Array.isArray(data) || data.length === 0) return null;

        const headers = Object.keys(data[0]);

        return (
          <div key={fileName} style={{ marginBottom: "4rem" }}>
            <h2 style={{ marginBottom: "1rem" }}>{fileName}</h2>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr>
                  {headers.map((header) => (
                    <th
                      key={header}
                      style={{
                        border: "1px solid #999",
                        padding: "0.5rem",
                        backgroundColor: "#eee",
                        textAlign: "left",
                      }}
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.map((row, i) => (
                  <tr key={i}>
                    {headers.map((header) => (
                      <td
                        key={header}
                        style={{ border: "1px solid #999", padding: "0.5rem" }}
                      >
                        {row[header]}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      })}
    </div>
  );
}
