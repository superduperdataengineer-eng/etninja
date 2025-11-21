// 'use client';

// import { useEffect, useState, useRef } from 'react';
// import { useSearchParams, useRouter } from 'next/navigation';
// import Papa from 'papaparse';

// export default function FullStoryContent() {
//   const router = useRouter();
//   const params = useSearchParams();
//   const storyId = params.get('story');
//   const lang = (params.get('lang') || 'EN').toUpperCase();

//   const [lines, setLines] = useState([]);
//   const [loaded, setLoaded] = useState(false);
//   const [folderName, setFolderName] = useState('');
//   const [currentIndex, setCurrentIndex] = useState(0);

//   const scrollRef = useRef(null);

//   const langMap = { EN: 'en', PT: 'pt', ES: 'es', IT: 'it', FR: 'fr', DE: 'de', JA: 'ja' };

//   const normalize = (str) => str.replace(/[–—]/g, '-').replace(/[“”]/g, '"').trim();

//   useEffect(() => {
//     // Load TitlesCSV first to get folder name
//     fetch('/ActionCSV/TitlesCSV.csv')
//       .then(res => res.text())
//       .then(titlesText => {
//         const parsedTitles = Papa.parse(titlesText, {
//           header: true,
//           skipEmptyLines: true,
//           transformHeader: h => h.trim().toLowerCase()
//         }).data;

//         const storyEntry = parsedTitles.find(s => s.story === storyId);
//         if (!storyEntry) return;

//         // include story number in folder name
//         setFolderName(`${storyEntry.story}. ${storyEntry.en}`);

//         // Now load LinesCSV
//         fetch('/ActionCSV/LinesCSV.csv')
//           .then(res => res.text())
//           .then(linesText => {
//             const parsedLines = Papa.parse(linesText, {
//               header: true,
//               skipEmptyLines: true,
//               transformHeader: h => h.trim().toLowerCase()
//             }).data;

//             const storyLines = parsedLines
//               .filter(line => line.story === storyId)
//               .sort((a, b) => {
//                 return Number(a.storyline || a['']) - Number(b.storyline || b['']);
//               });

//             setLines(storyLines);
//             setLoaded(true);
//           });
//       });
//   }, [storyId]);

//   const handlePrev = () => {
//     if (currentIndex > 0) setCurrentIndex(prev => prev - 1);
//   };

//   const handleNext = () => {
//     if (currentIndex < lines.length - 1) setCurrentIndex(prev => prev + 1);
//   };

//   const handleBack = () => {
//     router.push(`/blogs/blog5/StorySelector`);
//   };

//   if (!loaded) {
//     return <p style={{ textAlign: 'center', marginTop: '50px' }}>Loading Full Story...</p>;
//   }

//   const currentLine = lines[currentIndex];
//   const fileTitle = normalize(currentLine.en);
//   const encodedFolderName = encodeURIComponent(folderName);
//   const encodedFileName = encodeURIComponent(`${fileTitle}.jpg`);
//   const imagePath = `/ActionStoriesPics/LinePics/${encodedFolderName}/${encodedFileName}`;

//   return (
//     <div style={{ minHeight: '100vh', backgroundColor: '#faf7e8', padding: '20px' }}>
//       {/* Back button */}
//       <div
//         onClick={handleBack}
//         style={{
//           cursor: 'pointer',
//           fontSize: '16px',
//           display: 'flex',
//           alignItems: 'center',
//           gap: '5px',
//           color: '#333',
//           fontWeight: '500',
//           marginBottom: '20px'
//         }}
//       >
//         ← Back to Story Selection
//       </div>

//       <div style={{ display: 'flex', gap: '40px', flexWrap: 'wrap', justifyContent: 'center' }}>
//         {/* Image */}
//         <img
//           src={imagePath}
//           alt={currentLine[langMap[lang]] || currentLine.en}
//           style={{
//             width: '400px',
//             height: '300px',
//             objectFit: 'contain',
//             borderRadius: '12px',
//             boxShadow: '0 6px 16px rgba(0,0,0,0.25)'
//           }}
//         />

//         {/* Scrollable panel */}
//         <div
//           ref={scrollRef}
//           style={{
//             maxHeight: '300px',
//             overflowY: 'auto',
//             minWidth: '300px',
//             backgroundColor: '#fff',
//             padding: '10px',
//             borderRadius: '12px',
//             boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
//           }}
//         >
//           {lines.slice(0, currentIndex + 1).map((line, idx) => (
//             <p key={idx} style={{ margin: '8px 0', fontWeight: '500' }}>
//               {line[langMap[lang]] || line.en}
//             </p>
//           ))}
//         </div>
//       </div>

//       {/* Navigation buttons */}
//       <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '20px' }}>
//         <button
//           onClick={handlePrev}
//           disabled={currentIndex === 0}
//           style={{
//             padding: '12px 24px',
//             fontSize: '16px',
//             fontWeight: '600',
//             backgroundColor: currentIndex === 0 ? '#ccc' : '#f3c200',
//             border: 'none',
//             borderRadius: '8px',
//             cursor: currentIndex === 0 ? 'default' : 'pointer',
//             boxShadow: '0 4px 8px rgba(0,0,0,0.2)'
//           }}
//         >
//           ← Previous
//         </button>

//         <button
//           onClick={handleNext}
//           disabled={currentIndex >= lines.length - 1}
//           style={{
//             padding: '12px 24px',
//             fontSize: '16px',
//             fontWeight: '600',
//             backgroundColor: currentIndex >= lines.length - 1 ? '#ccc' : '#f3c200',
//             border: 'none',
//             borderRadius: '8px',
//             cursor: currentIndex >= lines.length - 1 ? 'default' : 'pointer',
//             boxShadow: '0 4px 8px rgba(0,0,0,0.2)'
//           }}
//         >
//           Next →
//         </button>
//       </div>
//     </div>
//   );
// }


//code 2
'use client';
import { useEffect, useState, useRef } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Papa from 'papaparse';

export default function FullStoryContent() {
  const router = useRouter();
  const params = useSearchParams();
  const storyId = params.get('story');
  const lang = (params.get('lang') || 'EN').toUpperCase();

  const [lines, setLines] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [folderName, setFolderName] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  const scrollRef = useRef(null);
  const langMap = { EN: 'en', PT: 'pt', ES: 'es', IT: 'it', FR: 'fr', DE: 'de', JA: 'ja' };

  const normalize = (str) => str.replace(/[–—]/g, '-').replace(/[“”]/g, '"').trim();

  useEffect(() => {
    fetch('/actionCSV/TitlesCSV.csv')
      .then(res => res.text())
      .then(titlesText => {
        const parsedTitles = Papa.parse(titlesText, { header: true, skipEmptyLines: true, transformHeader: h => h.trim().toLowerCase() }).data;
        const storyEntry = parsedTitles.find(s => s.story === storyId);
        if (!storyEntry) return;

        setFolderName(`${storyEntry.story}. ${storyEntry.en}`);

        fetch('/actionCSV/LinesCSV.csv')
          .then(res => res.text())
          .then(linesText => {
            const parsedLines = Papa.parse(linesText, { header: true, skipEmptyLines: true, transformHeader: h => h.trim().toLowerCase() }).data;
            const storyLines = parsedLines
              .filter(line => line.story === storyId)
              .sort((a, b) => Number(a.storyline || a['']) - Number(b.storyline || b['']));
            setLines(storyLines);
            setLoaded(true);
          });
      });
  }, [storyId]);

  const handlePrev = () => { if (currentIndex > 0) setCurrentIndex(prev => prev - 1); };
  const handleNext = () => { if (currentIndex < lines.length - 1) setCurrentIndex(prev => prev + 1); };
  const handleBack = () => { router.push(`/blogs/blog5/StorySelector`); };

  if (!loaded) return <p style={{ textAlign: 'center', marginTop: '50px' }}>Loading Full Story...</p>;

  const currentLine = lines[currentIndex];
  const fileTitle = normalize(currentLine.en);
  const encodedFolderName = encodeURIComponent(folderName);
  const encodedFileName = encodeURIComponent(`${fileTitle}.jpg`);
  const imagePath = `/ActionStoriesPics/LinePics/${encodedFolderName}/${encodedFileName}`;

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#faf7e8', padding: '20px' }}>
      <div onClick={handleBack} style={{ cursor: 'pointer', fontSize: '16px', display: 'flex', alignItems: 'center', gap: '5px', color: '#333', fontWeight: '500', marginBottom: '20px' }}>
        ← Back to Story Selection
      </div>

      <div style={{ display: 'flex', gap: '40px', flexWrap: 'wrap', justifyContent: 'center' }}>
        <img src={imagePath} alt={currentLine[langMap[lang]] || currentLine.en} style={{ width: '400px', height: '300px', objectFit: 'contain', borderRadius: '12px', boxShadow: '0 6px 16px rgba(0,0,0,0.25)' }} />

        <div ref={scrollRef} style={{ maxHeight: '300px', overflowY: 'auto', minWidth: '300px', backgroundColor: '#fff', padding: '10px', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.2)' }}>
          {lines.slice(0, currentIndex + 1).map((line, idx) => (
            <p key={idx} style={{ margin: '8px 0', fontWeight: '500' }}>{line[langMap[lang]] || line.en}</p>
          ))}
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '20px' }}>
        <button onClick={handlePrev} disabled={currentIndex === 0} style={{ padding: '12px 24px', fontSize: '16px', fontWeight: '600', backgroundColor: currentIndex === 0 ? '#ccc' : '#f3c200', border: 'none', borderRadius: '8px', cursor: currentIndex === 0 ? 'default' : 'pointer', boxShadow: '0 4px 8px rgba(0,0,0,0.2)' }}>
          ← Previous
        </button>

        <button onClick={handleNext} disabled={currentIndex >= lines.length - 1} style={{ padding: '12px 24px', fontSize: '16px', fontWeight: '600', backgroundColor: currentIndex >= lines.length - 1 ? '#ccc' : '#f3c200', border: 'none', borderRadius: '8px', cursor: currentIndex >= lines.length - 1 ? 'default' : 'pointer', boxShadow: '0 4px 8px rgba(0,0,0,0.2)' }}>
          Next →
        </button>
      </div>
    </div>
  );
}
