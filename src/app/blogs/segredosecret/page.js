// import fs from 'fs';
// import path from 'path';

// function readImageFolders(baseDir, webBase) {
//   const result = [];

//   const folders = fs.readdirSync(baseDir, { withFileTypes: true });

//   for (const folder of folders) {
//     if (!folder.isDirectory()) continue;

//     const folderPath = path.join(baseDir, folder.name);
//     const files = fs
//       .readdirSync(folderPath)
//       .filter(f => /\.(jpg|jpeg|png|webp|gif)$/i.test(f));

//     if (files.length === 0) continue;

//     result.push({
//       title: folder.name,
//       images: files.map(file => ({
//         src: `${webBase}/${folder.name}/${file}`,
//         name: file
//       }))
//     });
//   }

//   return result;
// }

// export default function Page() {
//   const publicDir = path.join(process.cwd(), 'public');

//   const linePics = readImageFolders(
//     path.join(publicDir, 'ActionStoriesPics', 'LinePics'),
//     '/ActionStoriesPics/LinePics'
//   );

//   const vocabPics = readImageFolders(
//     path.join(publicDir, 'ActionStoriesPics', 'VocabPics'),
//     '/ActionStoriesPics/VocabPics'
//   );

//   return (
//     <div style={{ padding: 20 }}>
//       <h1>Line Pictures</h1>

//       {linePics.map(folder => (
//         <div key={folder.title} style={{ marginBottom: 40 }}>
//           <h3>{folder.title}</h3>

//           <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
//             {folder.images.map(img => (
//               <img
//                 key={img.src}
//                 src={img.src}
//                 alt={img.name}
//                 style={{ width: 160 }}
//               />
//             ))}
//           </div>
//         </div>
//       ))}

//       <h1>Vocabulary Pictures</h1>

//       {vocabPics.map(folder => (
//         <div key={folder.title} style={{ marginBottom: 40 }}>
//           <h3>{folder.title}</h3>

//           <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
//             {folder.images.map(img => (
//               <img
//                 key={img.src}
//                 src={img.src}
//                 alt={img.name}
//                 style={{ width: 160 }}
//               />
//             ))}
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// }

//code 2
// import fs from 'fs';
// import path from 'path';

// function extractNumber(name) {
//   const match = name.match(/^(\d+)/);
//   return match ? parseInt(match[1], 10) : 9999;
// }

// function readImageFolders(baseDir, webBase) {
//   const folders = fs
//     .readdirSync(baseDir, { withFileTypes: true })
//     .filter(d => d.isDirectory())
//     .sort((a, b) => extractNumber(a.name) - extractNumber(b.name));

//   return folders.map(folder => {
//     const folderPath = path.join(baseDir, folder.name);

//     const images = fs
//       .readdirSync(folderPath)
//       .filter(f => /\.(jpg|jpeg|png|webp|gif)$/i.test(f))
//       .sort((a,b) => extractNumber(a) - extractNumber(b))
//       .map(file => ({
//         name: file,
//         src: `${webBase}/${folder.name}/${file}`
//       }));

//     return {
//       title: folder.name,
//       images
//     };
//   });
// }

// export default function Page() {
//   const publicDir = path.join(process.cwd(), 'public');

//   const linePics = readImageFolders(
//     path.join(publicDir, 'ActionStoriesPics', 'LinePics'),
//     '/ActionStoriesPics/LinePics'
//   );

//   const vocabPics = readImageFolders(
//     path.join(publicDir, 'ActionStoriesPics', 'VocabPics'),
//     '/ActionStoriesPics/VocabPics'
//   );

//   return (
//     <div style={{ padding: 24 }}>
//       <h1>Line Pictures</h1>

//       {linePics.map(section => (
//         <section key={section.title} style={{ marginBottom: 48 }}>
//           <h3>{section.title}</h3>

//           <div
//             style={{
//               display: 'grid',
//               gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
//               gap: 24
//             }}
//           >
//             {section.images.map(img => (
//               <div
//                 key={img.src}
//                 style={{
//                   textAlign: 'center'
//                 }}
//               >
//                 <img
//                   src={encodeURI(img.src)}
//                   alt={img.name}
//                   style={{
//                     width: '100%',
//                     height: 'auto',
//                     display: 'block'
//                   }}
//                 />
//                 <div
//                   style={{
//                     marginTop: 6,
//                     fontSize: 12,
//                     wordBreak: 'break-word'
//                   }}
//                 >
//                   {img.name}
//                 </div>
//               </div>
//             ))}
//           </div>
//         </section>
//       ))}

//       <h1>Vocabulary Pictures</h1>

//       {vocabPics.map(section => (
//         <section key={section.title} style={{ marginBottom: 48 }}>
//           <h3>{section.title}</h3>

//           <div
//             style={{
//               display: 'grid',
//               gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
//               gap: 24
//             }}
//           >
//             {section.images.map(img => (
//               <div key={img.src} style={{ textAlign: 'center' }}>
//                 <img
//                   src={encodeURI(img.src)}
//                   alt={img.name}
//                   style={{
//                     width: '100%',
//                     height: 'auto',
//                     display: 'block'
//                   }}
//                 />
//                 <div
//                   style={{
//                     marginTop: 6,
//                     fontSize: 12,
//                     wordBreak: 'break-word'
//                   }}
//                 >
//                   {img.name}
//                 </div>
//               </div>
//             ))}
//           </div>
//         </section>
//       ))}
//     </div>
//   );
// }


//code 3
export const dynamic = 'force-static';
import fs from 'fs';
import path from 'path';

/* ---------- helpers (server-only) ---------- */

function extractNumber(name) {
  const match = name.match(/^(\d+)/);
  return match ? parseInt(match[1], 10) : 9999;
}

function getData() {
  const publicDir = path.join(process.cwd(), 'public');

  function readImageFolders(baseDir, webBase) {
    return fs
      .readdirSync(baseDir, { withFileTypes: true })
      .filter(d => d.isDirectory())
      .sort((a, b) => extractNumber(a.name) - extractNumber(b.name))
      .map(folder => {
        const folderPath = path.join(baseDir, folder.name);

        const images = fs
          .readdirSync(folderPath)
          .filter(f => /\.(jpg|jpeg|png|webp|gif)$/i.test(f))
          .sort((a, b) => extractNumber(a) - extractNumber(b))
          .map(file => ({
            name: file,
            src: `${webBase}/${folder.name}/${file}`
          }));

        return {
          title: folder.name,
          images
        };
      });
  }

  return {
    linePics: readImageFolders(
      path.join(publicDir, 'ActionStoriesPics', 'LinePics'),
      '/ActionStoriesPics/LinePics'
    ),
    vocabPics: readImageFolders(
      path.join(publicDir, 'ActionStoriesPics', 'VocabPics'),
      '/ActionStoriesPics/VocabPics'
    ),
    linesCSV: fs.readFileSync(
      path.join(publicDir, 'actionCSV', 'LinesCSV.csv'),
      'utf-8'
    ),
    titlesCSV: fs.readFileSync(
      path.join(publicDir, 'actionCSV', 'TitlesCSV.csv'),
      'utf-8'
    ),
    vocabCSV: fs.readFileSync(
      path.join(publicDir, 'actionCSV', 'VocabularyCSV.csv'),
      'utf-8'
    )
  };
}

/* ---------- PAGE COMPONENT ---------- */

export default function Page() {
  const {
    linePics,
    vocabPics,
    linesCSV,
    titlesCSV,
    vocabCSV
  } = getData();

  return (
    <div style={{ padding: 24 }}>

      <h1>Line Pictures</h1>

      {linePics.map(folder => (
        <div key={folder.title} style={{ marginBottom: 40 }}>
          <h3>{folder.title}</h3>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
              gap: 16
            }}
          >
            {folder.images.map(img => (
              <div key={img.src} style={{ textAlign: 'center' }}>
                <img
                  src={encodeURI(img.src)}
                  alt={img.name}
                  style={{ width: '100%', height: 'auto' }}
                />
                <div style={{ fontSize: 12, marginTop: 4 }}>
                  {img.name}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      <h1>Vocabulary Pictures</h1>

      {vocabPics.map(folder => (
        <div key={folder.title} style={{ marginBottom: 40 }}>
          <h3>{folder.title}</h3>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
              gap: 16
            }}
          >
            {folder.images.map(img => (
              <div key={img.src} style={{ textAlign: 'center' }}>
                <img
                  src={encodeURI(img.src)}
                  alt={img.name}
                  style={{ width: '100%', height: 'auto' }}
                />
                <div style={{ fontSize: 12, marginTop: 4 }}>
                  {img.name}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      <h1>CSV Data</h1>

      <h3>LinesCSV.csv</h3>
      <pre>{linesCSV}</pre>

      <h3>TitlesCSV.csv</h3>
      <pre>{titlesCSV}</pre>

      <h3>VocabularyCSV.csv</h3>
      <pre>{vocabCSV}</pre>

    </div>
  );
}
