// import fs from "fs";
// import path from "path";

// const MAX_BYTES = 30_000;   // per file
// const MAX_LINES = 400;

// export default function RootFilesPage() {
//   const root = process.cwd();
//   const indexPath = path.join(root, "root-index.json");
//   const files = JSON.parse(fs.readFileSync(indexPath, "utf8"));

//   return (
//     <main style={{ padding: 24, fontFamily: "monospace" }}>
//       <h1>Root Files (Whitelisted)</h1>

//       {files.map((name, i) => {
//         const filePath = path.join(root, name);
//         let content = "";

//         try {
//           const stat = fs.statSync(filePath);

//           if (stat.size > MAX_BYTES) {
//             content = `[SKIPPED: ${stat.size} bytes]`;
//           } else {
//             const raw = fs.readFileSync(filePath, "utf8");
//             content = raw.split("\n").slice(0, MAX_LINES).join("\n");
//           }
//         } catch {
//           content = "[UNREADABLE]";
//         }

//         return (
//           <section key={i} style={{ marginBottom: 36 }}>
//             <h2>{name}</h2>
//             <pre
//               style={{
//                 background: "#111",
//                 color: "#0f0",
//                 padding: 16,
//                 whiteSpace: "pre-wrap",
//                 overflowX: "auto"
//               }}
//             >
//               {content}
//             </pre>
//           </section>
//         );
//       })}
//     </main>
//   );
// }

export default function Page() {
  return null;
}
