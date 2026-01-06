// 'use client';

// import { useEffect, useState } from 'react';
// import { useSearchParams, useRouter } from 'next/navigation';
// import Papa from 'papaparse';

// export default function VocabSlide() {
//   const router = useRouter();
//   const params = useSearchParams();
//   const storyId = params.get('story');
//   const lang = (params.get('lang') || 'EN').toUpperCase();

//   const [vocab, setVocab] = useState([]);
//   const [stories, setStories] = useState([]);
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [loaded, setLoaded] = useState(false);
//   const [showText, setShowText] = useState(true);

//   const langMap = { EN: 'en', PT: 'pt', ES: 'es', IT: 'it', FR: 'fr', DE: 'de', JA: 'ja' };

//   const normalize = (str) =>
//     str.replace(/[–—]/g, '-').replace(/[“”]/g, '"').trim();

//   useEffect(() => {
//     Promise.all([
//       fetch('/ActionCSV/VocabularyCSV.csv').then(res => res.text()),
//       fetch('/ActionCSV/TitlesCSV.csv').then(res => res.text())
//     ]).then(([vocabText, titlesText]) => {
//       const parsedVocab = Papa.parse(vocabText, {
//         header: true,
//         skipEmptyLines: true,
//         transformHeader: h => h.trim().toLowerCase()
//       }).data;

//       const parsedStories = Papa.parse(titlesText, {
//         header: true,
//         skipEmptyLines: true,
//         transformHeader: h => h.trim().toLowerCase()
//       }).data;

//       const storyVocab = parsedVocab.filter(v => v.story == storyId && v.file && v.en);
//       setVocab(storyVocab);
//       setStories(parsedStories);
//       setLoaded(true);
//     });
//   }, [storyId]);

//   useEffect(() => {
//     const handleKey = (e) => {
//       if (e.key === 'ArrowLeft') handlePrev();
//       if (e.key === 'ArrowRight') handleNext();
//     };
//     window.addEventListener('keydown', handleKey);
//     return () => window.removeEventListener('keydown', handleKey);
//   });

//   if (!loaded || !vocab.length) {
//     return <p style={{ textAlign: 'center', marginTop: '50px' }}>Loading...</p>;
//   }

//   const folderEntry = stories.find(s => s.story == storyId);
//   const folderName = `${storyId}. ${folderEntry?.en?.trim() || 'Story'}`;
//   const encodedFolderName = encodeURIComponent(folderName);

//   const currentVocab = vocab[currentIndex];
//   const fileIndex = currentVocab.file;
//   const safeEnTitle = normalize(currentVocab.en).replace(/\.+$/, '');
//   const fileName = `${fileIndex}. ${safeEnTitle}.jpg`;
//   const encodedFileName = encodeURIComponent(fileName);
//   const imagePath = `/ActionStoriesPics/VocabPics/${encodedFolderName}/${encodedFileName}`;

//   const titleColumn = langMap[lang] || 'en';
//   const word = currentVocab[titleColumn] || currentVocab.en;

//   const handleNext = () => {
//     if (currentIndex < vocab.length - 1) setCurrentIndex(prev => prev + 1);
//   };

//   const handlePrev = () => {
//     if (currentIndex > 0) setCurrentIndex(prev => prev - 1);
//   };

//   const handleBack = () => {
//     router.push(`/blogs/blog5/StorySelector`);
//   };

//   const handleQuiz = () => {
//     router.push(`/blogs/blog5/VocabQuiz?story=${storyId}&lang=${lang}`);
//   };

//   return (
//     <div style={{
//       display: 'flex',
//       flexDirection: 'column',
//       alignItems: 'center',
//       justifyContent: 'center',
//       minHeight: '100vh',
//       backgroundColor: '#faf7e8',
//       textAlign: 'center',
//       position: 'relative',
//       padding: '20px'
//     }}>
//       {/* Back arrow */}
//       <div
//         onClick={handleBack}
//         style={{
//           position: 'absolute',
//           top: '20px',
//           left: '20px',
//           cursor: 'pointer',
//           fontSize: '18px',
//           display: 'flex',
//           alignItems: 'center',
//           gap: '5px',
//           color: '#333',
//           fontWeight: '500'
//         }}
//       >
//         ← <span>Back to Stories</span>
//       </div>

//       {/* Show/Hide Text toggle (discrete, top-right of screen) */}
//       <button
//         onClick={() => setShowText(prev => !prev)}
//         style={{
//           position: 'fixed',
//           top: '70px', // below navbar
//           right: '20px',
//           padding: '4px 8px',
//           fontSize: '12px',
//           borderRadius: '4px',
//           border: 'none',
//           backgroundColor: 'rgba(255,255,255,0.7)',
//           color: '#333',
//           cursor: 'pointer',
//           boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
//           backdropFilter: 'blur(4px)',
//           zIndex: 1000
//         }}
//       >
//         {showText ? 'Hide' : 'Show'}
//       </button>

//       {/* Image */}
//       <img
//         src={imagePath}
//         alt={word}
//         style={{
//           width: '100%',
//           maxWidth: '400px',
//           height: '300px',
//           objectFit: 'contain',
//           borderRadius: '12px',
//           boxShadow: '0 6px 16px rgba(0,0,0,0.25)',
//           transition: '0.3s ease',
//           marginBottom: '10px'
//         }}
//       />

//       {/* Word display */}
//       {showText && (
//         <h2 style={{
//           fontSize: '22px',
//           fontWeight: '600',
//           marginBottom: '30px',
//           color: '#333'
//         }}>
//           {word}
//         </h2>
//       )}

//       {/* Navigation Buttons */}
//       <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginBottom: '20px' }}>
//         <button
//           onClick={handlePrev}
//           disabled={currentIndex === 0}
//           style={{
//             padding: '10px 20px',
//             fontSize: '16px',
//             borderRadius: '8px',
//             cursor: currentIndex === 0 ? 'not-allowed' : 'pointer',
//             backgroundColor: currentIndex === 0 ? '#ccc' : '#f3c200',
//             border: 'none'
//           }}
//         >
//           ← Previous
//         </button>
//         <button
//           onClick={handleNext}
//           disabled={currentIndex === vocab.length - 1}
//           style={{
//             padding: '10px 20px',
//             fontSize: '16px',
//             borderRadius: '8px',
//             cursor: currentIndex === vocab.length - 1 ? 'not-allowed' : 'pointer',
//             backgroundColor: currentIndex === vocab.length - 1 ? '#ccc' : '#f3c200',
//             border: 'none'
//           }}
//         >
//           Next →
//         </button>
//       </div>

//       {/* Quiz button */}
//       {currentIndex === vocab.length - 1 && (
//         <button
//           onClick={handleQuiz}
//           style={{
//             marginTop: '10px',
//             padding: '10px 20px',
//             fontSize: '16px',
//             fontWeight: '600',
//             backgroundColor: '#f3c200',
//             border: 'none',
//             borderRadius: '8px',
//             cursor: 'pointer',
//             boxShadow: '0 4px 8px rgba(0,0,0,0.2)'
//           }}
//         >
//           Start Quiz →
//         </button>
//       )}
//     </div>
//   );
// }


//code 2
// 'use client';

// import { useEffect, useState } from 'react';
// import { useSearchParams, useRouter } from 'next/navigation';
// import Papa from 'papaparse';

// export default function VocabSlideClient() {
//   const router = useRouter();
//   const params = useSearchParams();
//   const storyId = params.get('story');
//   const lang = (params.get('lang') || 'EN').toUpperCase();

//   const [vocab, setVocab] = useState([]);
//   const [stories, setStories] = useState([]);
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [loaded, setLoaded] = useState(false);
//   const [showText, setShowText] = useState(true);

//   const langMap = { EN: 'en', PT: 'pt', ES: 'es', IT: 'it', FR: 'fr', DE: 'de', JA: 'ja' };

//   const normalize = (str) =>
//     str.replace(/[–—]/g, '-').replace(/[“”]/g, '"').trim();

//   useEffect(() => {
//     Promise.all([
//       fetch('/actionCSV/VocabularyCSV.csv').then(res => res.text()),
//       fetch('/actionCSV/TitlesCSV.csv').then(res => res.text())
//     ]).then(([vocabText, titlesText]) => {
//       const parsedVocab = Papa.parse(vocabText, {
//         header: true,
//         skipEmptyLines: true,
//         transformHeader: h => h.trim().toLowerCase()
//       }).data;

//       const parsedStories = Papa.parse(titlesText, {
//         header: true,
//         skipEmptyLines: true,
//         transformHeader: h => h.trim().toLowerCase()
//       }).data;

//       const storyVocab = parsedVocab.filter(v => v.story == storyId && v.file && v.en);
//       setVocab(storyVocab);
//       setStories(parsedStories);
//       setLoaded(true);
//     });
//   }, [storyId]);

//   useEffect(() => {
//     const handleKey = (e) => {
//       if (e.key === 'ArrowLeft') handlePrev();
//       if (e.key === 'ArrowRight') handleNext();
//     };
//     window.addEventListener('keydown', handleKey);
//     return () => window.removeEventListener('keydown', handleKey);
//   });

//   if (!loaded || !vocab.length) {
//     return <p style={{ textAlign: 'center', marginTop: '50px' }}>Loading...</p>;
//   }

//   const folderEntry = stories.find(s => s.story == storyId);
//   const folderName = `${storyId}. ${folderEntry?.en?.trim() || 'Story'}`;
//   const encodedFolderName = encodeURIComponent(folderName);

//   const currentVocab = vocab[currentIndex];
//   const fileIndex = currentVocab.file;
//   const safeEnTitle = normalize(currentVocab.en).replace(/\.+$/, '');
//   const fileName = `${fileIndex}. ${safeEnTitle}.jpg`;
//   const encodedFileName = encodeURIComponent(fileName);
//   const imagePath = `/ActionStoriesPics/VocabPics/${encodedFolderName}/${encodedFileName}`;

//   const titleColumn = langMap[lang] || 'en';
//   const word = currentVocab[titleColumn] || currentVocab.en;

//   const handleNext = () => {
//     if (currentIndex < vocab.length - 1) setCurrentIndex(prev => prev + 1);
//   };

//   const handlePrev = () => {
//     if (currentIndex > 0) setCurrentIndex(prev => prev - 1);
//   };

//   const handleBack = () => {
//     router.push(`/blogs/blog5/StorySelector`);
//   };

//   const handleQuiz = () => {
//     router.push(`/blogs/blog5/VocabQuiz?story=${storyId}&lang=${lang}`);
//   };

//   return (
//     <div style={{
//       display: 'flex',
//       flexDirection: 'column',
//       alignItems: 'center',
//       justifyContent: 'center',
//       minHeight: '100vh',
//       backgroundColor: '#faf7e8',
//       textAlign: 'center',
//       position: 'relative',
//       padding: '20px'
//     }}>
//       {/* Back arrow */}
//       <div
//         onClick={handleBack}
//         style={{
//           position: 'absolute',
//           top: '20px',
//           left: '20px',
//           cursor: 'pointer',
//           fontSize: '18px',
//           display: 'flex',
//           alignItems: 'center',
//           gap: '5px',
//           color: '#333',
//           fontWeight: '500'
//         }}
//       >
//         ← <span>Back to Stories</span>
//       </div>

//       {/* Toggle Text */}
//       <button
//         onClick={() => setShowText(prev => !prev)}
//         style={{
//           position: 'fixed',
//           top: '70px',
//           right: '20px',
//           padding: '4px 8px',
//           fontSize: '12px',
//           borderRadius: '4px',
//           border: 'none',
//           backgroundColor: 'rgba(255,255,255,0.7)',
//           color: '#333',
//           cursor: 'pointer',
//           boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
//           backdropFilter: 'blur(4px)',
//           zIndex: 1000
//         }}
//       >
//         {showText ? 'Hide' : 'Show'}
//       </button>

//       <img
//         src={imagePath}
//         alt={word}
//         style={{
//           width: '100%',
//           maxWidth: '400px',
//           height: '300px',
//           objectFit: 'contain',
//           borderRadius: '12px',
//           boxShadow: '0 6px 16px rgba(0,0,0,0.25)',
//           transition: '0.3s ease',
//           marginBottom: '10px'
//         }}
//       />

//       {showText && (
//         <h2 style={{
//           fontSize: '22px',
//           fontWeight: '600',
//           marginBottom: '30px',
//           color: '#333'
//         }}>
//           {word}
//         </h2>
//       )}

//       <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginBottom: '20px' }}>
//         <button
//           onClick={handlePrev}
//           disabled={currentIndex === 0}
//           style={{
//             padding: '10px 20px',
//             fontSize: '16px',
//             borderRadius: '8px',
//             cursor: currentIndex === 0 ? 'not-allowed' : 'pointer',
//             backgroundColor: currentIndex === 0 ? '#ccc' : '#f3c200',
//             border: 'none'
//           }}
//         >
//           ← Previous
//         </button>
//         <button
//           onClick={handleNext}
//           disabled={currentIndex === vocab.length - 1}
//           style={{
//             padding: '10px 20px',
//             fontSize: '16px',
//             borderRadius: '8px',
//             cursor: currentIndex === vocab.length - 1 ? 'not-allowed' : 'pointer',
//             backgroundColor: currentIndex === vocab.length - 1 ? '#ccc' : '#f3c200',
//             border: 'none'
//           }}
//         >
//           Next →
//         </button>
//       </div>

//       {currentIndex === vocab.length - 1 && (
//         <button
//           onClick={handleQuiz}
//           style={{
//             marginTop: '10px',
//             padding: '10px 20px',
//             fontSize: '16px',
//             fontWeight: '600',
//             backgroundColor: '#f3c200',
//             border: 'none',
//             borderRadius: '8px',
//             cursor: 'pointer',
//             boxShadow: '0 4px 8px rgba(0,0,0,0.2)'
//           }}
//         >
//           Start Quiz →
//         </button>
//       )}
//     </div>
//   );
// }


//code 3 WORKS GREAT NO SOUND
// 'use client';

// import { useEffect, useState } from 'react';
// import { useSearchParams, useRouter } from 'next/navigation';
// import Papa from 'papaparse';

// export default function VocabSlideClient() {
//   const router = useRouter();
//   const params = useSearchParams();
//   const storyId = params.get('story');
//   const lang = (params.get('lang') || 'EN').toUpperCase();

//   const [vocab, setVocab] = useState([]);
//   const [stories, setStories] = useState([]);
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [loaded, setLoaded] = useState(false);
//   const [showText, setShowText] = useState(true);

//   const langMap = { EN: 'en', PT: 'pt', ES: 'es', IT: 'it', FR: 'fr', DE: 'de', JA: 'ja' };

//   const normalize = (str) =>
//     str.replace(/[–—]/g, '-').replace(/[“”]/g, '"').trim();

//   useEffect(() => {
//     Promise.all([
//       fetch('/actionCSV/VocabularyCSV.csv').then(res => res.text()),
//       fetch('/actionCSV/TitlesCSV.csv').then(res => res.text())
//     ]).then(([vocabText, titlesText]) => {
//       const parsedVocab = Papa.parse(vocabText, {
//         header: true,
//         skipEmptyLines: true,
//         transformHeader: h => h.trim().toLowerCase()
//       }).data;

//       const parsedStories = Papa.parse(titlesText, {
//         header: true,
//         skipEmptyLines: true,
//         transformHeader: h => h.trim().toLowerCase()
//       }).data;

//       // case-insensitive matching for story IDs
//       const storyVocab = parsedVocab.filter(
//         v => v.story.toLowerCase() === storyId.toLowerCase() && v.file && v.en
//       );

//       setVocab(storyVocab);
//       setStories(parsedStories);
//       setLoaded(true);
//     });
//   }, [storyId]);

//   useEffect(() => {
//     const handleKey = (e) => {
//       if (e.key === 'ArrowLeft') handlePrev();
//       if (e.key === 'ArrowRight') handleNext();
//     };
//     window.addEventListener('keydown', handleKey);
//     return () => window.removeEventListener('keydown', handleKey);
//   });

//   if (!loaded || !vocab.length) {
//     return <p style={{ textAlign: 'center', marginTop: '50px' }}>Loading...</p>;
//   }

//   const folderEntry = stories.find(s => s.story.toLowerCase() === storyId.toLowerCase());
  
//   // uppercase folder name to match VocabPics folder names
//   const folderName = `${storyId}. ${folderEntry?.en?.trim().toUpperCase() || 'STORY'}`;
//   const encodedFolderName = encodeURIComponent(folderName);

//   const currentVocab = vocab[currentIndex];
//   const fileIndex = currentVocab.file;

//   // uppercase file name to match VocabPics
//   const safeEnTitle = normalize(currentVocab.en).replace(/\.+$/, '').toUpperCase();
//   const fileName = `${fileIndex}. ${safeEnTitle}.jpg`;
//   const encodedFileName = encodeURIComponent(fileName);

//   const imagePath = `/ActionStoriesPics/VocabPics/${encodedFolderName}/${encodedFileName}`;

//   const titleColumn = langMap[lang] || 'en';
//   const word = currentVocab[titleColumn] || currentVocab.en;

//   const handleNext = () => {
//     if (currentIndex < vocab.length - 1) setCurrentIndex(prev => prev + 1);
//   };

//   const handlePrev = () => {
//     if (currentIndex > 0) setCurrentIndex(prev => prev - 1);
//   };

//   const handleBack = () => {
//     router.push(`/blogs/blog5/StorySelector`);
//   };

//   const handleQuiz = () => {
//     router.push(`/blogs/blog5/VocabQuiz?story=${storyId}&lang=${lang}`);
//   };

//   return (
//     <div style={{
//       display: 'flex',
//       flexDirection: 'column',
//       alignItems: 'center',
//       justifyContent: 'center',
//       minHeight: '100vh',
//       backgroundColor: '#faf7e8',
//       textAlign: 'center',
//       position: 'relative',
//       padding: '20px'
//     }}>
//       {/* Back arrow */}
//       <div
//         onClick={handleBack}
//         style={{
//           position: 'absolute',
//           top: '20px',
//           left: '20px',
//           cursor: 'pointer',
//           fontSize: '18px',
//           display: 'flex',
//           alignItems: 'center',
//           gap: '5px',
//           color: '#333',
//           fontWeight: '500'
//         }}
//       >
//         ← <span>Back to Stories</span>
//       </div>

//       {/* Toggle Text */}
//       <button
//         onClick={() => setShowText(prev => !prev)}
//         style={{
//           position: 'fixed',
//           top: '70px',
//           right: '20px',
//           padding: '4px 8px',
//           fontSize: '12px',
//           borderRadius: '4px',
//           border: 'none',
//           backgroundColor: 'rgba(255,255,255,0.7)',
//           color: '#333',
//           cursor: 'pointer',
//           boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
//           backdropFilter: 'blur(4px)',
//           zIndex: 1000
//         }}
//       >
//         {showText ? 'Hide' : 'Show'}
//       </button>

//       <img
//         src={imagePath}
//         alt={word}
//         style={{
//           width: '100%',
//           maxWidth: '400px',
//           height: '300px',
//           objectFit: 'contain',
//           borderRadius: '12px',
//           boxShadow: '0 6px 16px rgba(0,0,0,0.25)',
//           transition: '0.3s ease',
//           marginBottom: '10px'
//         }}
//       />

//       {showText && (
//         <h2 style={{
//           fontSize: '22px',
//           fontWeight: '600',
//           marginBottom: '30px',
//           color: '#333'
//         }}>
//           {word}
//         </h2>
//       )}

//       {/* Navigation Buttons */}
//       <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginBottom: '20px' }}>
//         <button
//           onClick={handlePrev}
//           disabled={currentIndex === 0}
//           style={{
//             padding: '10px 20px',
//             fontSize: '16px',
//             borderRadius: '8px',
//             cursor: currentIndex === 0 ? 'not-allowed' : 'pointer',
//             backgroundColor: currentIndex === 0 ? '#ccc' : '#f3c200',
//             border: 'none'
//           }}
//         >
//           ← Previous
//         </button>
//         <button
//           onClick={handleNext}
//           disabled={currentIndex === vocab.length - 1}
//           style={{
//             padding: '10px 20px',
//             fontSize: '16px',
//             borderRadius: '8px',
//             cursor: currentIndex === vocab.length - 1 ? 'not-allowed' : 'pointer',
//             backgroundColor: currentIndex === vocab.length - 1 ? '#ccc' : '#f3c200',
//             border: 'none'
//           }}
//         >
//           Next →
//         </button>
//       </div>

//       {currentIndex === vocab.length - 1 && (
//         <button
//           onClick={handleQuiz}
//           style={{
//             marginTop: '10px',
//             padding: '10px 20px',
//             fontSize: '16px',
//             fontWeight: '600',
//             backgroundColor: '#f3c200',
//             border: 'none',
//             borderRadius: '8px',
//             cursor: 'pointer',
//             boxShadow: '0 4px 8px rgba(0,0,0,0.2)'
//           }}
//         >
//           Start Quiz →
//         </button>
//       )}
//     </div>
//   );
// }


// code 4 works for english but not other languages
// 'use client';

// import { useEffect, useState } from 'react';
// import { useSearchParams, useRouter } from 'next/navigation';
// import Papa from 'papaparse';

// export default function VocabSlideClient() {
//   const router = useRouter();
//   const params = useSearchParams();
//   const storyId = params.get('story');
//   const lang = (params.get('lang') || 'EN').toUpperCase();

//   const [vocab, setVocab] = useState([]);
//   const [stories, setStories] = useState([]);
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [loaded, setLoaded] = useState(false);
//   const [showText, setShowText] = useState(true);

//   const langMap = { EN: 'en', PT: 'pt', ES: 'es', IT: 'it', FR: 'fr', DE: 'de', JA: 'ja' };

//   const normalize = (str) =>
//     str.replace(/[–—]/g, '-').replace(/[“”]/g, '"').trim();

//   useEffect(() => {
//     Promise.all([
//       fetch('/actionCSV/VocabularyCSV.csv').then(res => res.text()),
//       fetch('/actionCSV/TitlesCSV.csv').then(res => res.text())
//     ]).then(([vocabText, titlesText]) => {
//       const parsedVocab = Papa.parse(vocabText, {
//         header: true,
//         skipEmptyLines: true,
//         transformHeader: h => h.trim().toLowerCase()
//       }).data;

//       const parsedStories = Papa.parse(titlesText, {
//         header: true,
//         skipEmptyLines: true,
//         transformHeader: h => h.trim().toLowerCase()
//       }).data;

//       // case-insensitive matching for story IDs
//       const storyVocab = parsedVocab.filter(
//         v => v.story.toLowerCase() === storyId.toLowerCase() && v.file && v.en
//       );

//       setVocab(storyVocab);
//       setStories(parsedStories);
//       setLoaded(true);
//     });
//   }, [storyId]);

//   useEffect(() => {
//     const handleKey = (e) => {
//       if (e.key === 'ArrowLeft') handlePrev();
//       if (e.key === 'ArrowRight') handleNext();
//     };
//     window.addEventListener('keydown', handleKey);
//     return () => window.removeEventListener('keydown', handleKey);
//   });

//   if (!loaded || !vocab.length) {
//     return <p style={{ textAlign: 'center', marginTop: '50px' }}>Loading...</p>;
//   }

//   const folderEntry = stories.find(s => s.story.toLowerCase() === storyId.toLowerCase());
  
//   // uppercase folder name to match VocabPics folder names
//   const folderName = `${storyId}. ${folderEntry?.en?.trim().toUpperCase() || 'STORY'}`;
//   const encodedFolderName = encodeURIComponent(folderName);

//   const currentVocab = vocab[currentIndex];
//   const fileIndex = currentVocab.file;

//   // uppercase file name to match VocabPics
//   const safeEnTitle = normalize(currentVocab.en).replace(/\.+$/, '').toUpperCase();
//   const fileName = `${fileIndex}. ${safeEnTitle}.jpg`;
//   const encodedFileName = encodeURIComponent(fileName);

//   const imagePath = `/ActionStoriesPics/VocabPics/${encodedFolderName}/${encodedFileName}`;

//   const titleColumn = langMap[lang] || 'en';
//   const word = currentVocab[titleColumn] || currentVocab.en;

//   const handleNext = () => {
//     if (currentIndex < vocab.length - 1) setCurrentIndex(prev => prev + 1);
//   };

//   const handlePrev = () => {
//     if (currentIndex > 0) setCurrentIndex(prev => prev - 1);
//   };

//   const handleBack = () => {
//     router.push(`/blogs/blog5/StorySelector`);
//   };

//   const handleQuiz = () => {
//     router.push(`/blogs/blog5/VocabQuiz?story=${storyId}&lang=${lang}`);
//   };

//   // const playAudio = () => {
//   //   const audioFileName = `${safeEnTitle}.opus`;
//   //   const audioPath = `/actionSounds/${langMap[lang]}/${encodeURIComponent(audioFileName)}`;

//   //   const audio = new Audio(audioPath);

//   //   // Fail silently if file not found
//   //   audio.onerror = () => {};
//   //   audio.play().catch(() => {});
//   // };
//   const playAudio = () => {
//     const audioFileName = `${safeEnTitle}.opus`;
//     const audioPath = `/actionSounds/${langMap[lang]}/${encodeURIComponent(audioFileName)}`;

//     const audio = new Audio(audioPath);

//     let ttsFallbackTriggered = false;

//     // If file not found → fallback to TTS automatically
//     audio.onerror = () => {
//       if (!ttsFallbackTriggered) {
//         ttsFallbackTriggered = true;
//         playTTS();
//       }
//     };

//     audio.play().catch(() => {
//       if (!ttsFallbackTriggered) {
//         ttsFallbackTriggered = true;
//         playTTS();
//       }
//     });
//   };

//   // -------------------------
//   // TTS FALLBACK
//   // -------------------------
//   const playTTS = () => {
//     const utter = new SpeechSynthesisUtterance(word);

//     // voice auto-selection by lang
//     const languageCode = langMap[lang] || 'en';
//     utter.lang = languageCode;

//     speechSynthesis.speak(utter);
//   };

//   return (
//     <div style={{
//       display: 'flex',
//       flexDirection: 'column',
//       alignItems: 'center',
//       justifyContent: 'center',
//       minHeight: '100vh',
//       backgroundColor: '#faf7e8',
//       textAlign: 'center',
//       position: 'relative',
//       padding: '20px'
//     }}>
//       {/* Back arrow */}
//       <div
//         onClick={handleBack}
//         style={{
//           position: 'absolute',
//           top: '20px',
//           left: '20px',
//           cursor: 'pointer',
//           fontSize: '18px',
//           display: 'flex',
//           alignItems: 'center',
//           gap: '5px',
//           color: '#333',
//           fontWeight: '500'
//         }}
//       >
//         ← <span>Back to Stories</span>
//       </div>

//       {/* Toggle Text */}
//       <button
//         onClick={() => setShowText(prev => !prev)}
//         style={{
//           position: 'fixed',
//           top: '70px',
//           right: '20px',
//           padding: '4px 8px',
//           fontSize: '12px',
//           borderRadius: '4px',
//           border: 'none',
//           backgroundColor: 'rgba(255,255,255,0.7)',
//           color: '#333',
//           cursor: 'pointer',
//           boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
//           backdropFilter: 'blur(4px)',
//           zIndex: 1000
//         }}
//       >
//         {showText ? 'Hide' : 'Show'}
//       </button>

//       <img
//         src={imagePath}
//         alt={word}
//         onClick={playAudio}
//         style={{
//           width: '100%',
//           maxWidth: '400px',
//           height: '300px',
//           objectFit: 'contain',
//           borderRadius: '12px',
//           boxShadow: '0 6px 16px rgba(0,0,0,0.25)',
//           transition: '0.3s ease',
//           marginBottom: '10px',
//           cursor: 'pointer',
//           userSelect: 'none'
//         }}
//       />


//       {showText && (
//         <h2
//           onClick={playAudio}
//           style={{
//             fontSize: '22px',
//             fontWeight: '600',
//             marginBottom: '30px',
//             color: '#333',
//             cursor: 'pointer',
//             userSelect: 'none'
//           }}
//         >
//           {word}
//         </h2>
//       )}

//       {/* Navigation Buttons */}
//       <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginBottom: '20px' }}>
//         <button
//           onClick={handlePrev}
//           disabled={currentIndex === 0}
//           style={{
//             padding: '10px 20px',
//             fontSize: '16px',
//             borderRadius: '8px',
//             cursor: currentIndex === 0 ? 'not-allowed' : 'pointer',
//             backgroundColor: currentIndex === 0 ? '#ccc' : '#f3c200',
//             border: 'none'
//           }}
//         >
//           ← Previous
//         </button>
//         <button
//           onClick={handleNext}
//           disabled={currentIndex === vocab.length - 1}
//           style={{
//             padding: '10px 20px',
//             fontSize: '16px',
//             borderRadius: '8px',
//             cursor: currentIndex === vocab.length - 1 ? 'not-allowed' : 'pointer',
//             backgroundColor: currentIndex === vocab.length - 1 ? '#ccc' : '#f3c200',
//             border: 'none'
//           }}
//         >
//           Next →
//         </button>
//       </div>

//       {currentIndex === vocab.length - 1 && (
//         <button
//           onClick={handleQuiz}
//           style={{
//             marginTop: '10px',
//             padding: '10px 20px',
//             fontSize: '16px',
//             fontWeight: '600',
//             backgroundColor: '#f3c200',
//             border: 'none',
//             borderRadius: '8px',
//             cursor: 'pointer',
//             boxShadow: '0 4px 8px rgba(0,0,0,0.2)'
//           }}
//         >
//           Start Quiz →
//         </button>
//       )}
//     </div>
//   );
// }

//code 5 works but issues with sound
// 'use client';

// import { useEffect, useState } from 'react';
// import { useSearchParams, useRouter } from 'next/navigation';
// import Papa from 'papaparse';

// export default function VocabSlideClient() {
//   const router = useRouter();
//   const params = useSearchParams();
//   const storyId = params.get('story');
//   const lang = (params.get('lang') || 'EN').toUpperCase();

//   const [vocab, setVocab] = useState([]);
//   const [stories, setStories] = useState([]);
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [loaded, setLoaded] = useState(false);
//   const [showText, setShowText] = useState(true);
//   const [voices, setVoices] = useState([]);

//   const langMap = { EN: 'en', PT: 'pt', ES: 'es', IT: 'it', FR: 'fr', DE: 'de', JA: 'ja' };

//   const normalize = (str) =>
//     str.replace(/[–—]/g, '-').replace(/[“”]/g, '"').trim();

//   useEffect(() => {
//     Promise.all([
//       fetch('/actionCSV/VocabularyCSV.csv').then(res => res.text()),
//       fetch('/actionCSV/TitlesCSV.csv').then(res => res.text())
//     ]).then(([vocabText, titlesText]) => {
//       const parsedVocab = Papa.parse(vocabText, {
//         header: true,
//         skipEmptyLines: true,
//         transformHeader: h => h.trim().toLowerCase()
//       }).data;

//       const parsedStories = Papa.parse(titlesText, {
//         header: true,
//         skipEmptyLines: true,
//         transformHeader: h => h.trim().toLowerCase()
//       }).data;

//       // case-insensitive matching for story IDs
//       const storyVocab = parsedVocab.filter(
//         v => v.story.toLowerCase() === storyId.toLowerCase() && v.file && v.en
//       );

//       setVocab(storyVocab);
//       setStories(parsedStories);
//       setLoaded(true);
//     });
//   }, [storyId]);

//   useEffect(() => {
//     const loadVoices = () => {
//       const v = speechSynthesis.getVoices();
//       if (v.length > 0) setVoices(v);
//     };

//     loadVoices();
//     speechSynthesis.onvoiceschanged = loadVoices;
//   }, []);

//   useEffect(() => {
//     const handleKey = (e) => {
//       if (e.key === 'ArrowLeft') handlePrev();
//       if (e.key === 'ArrowRight') handleNext();
//     };
//     window.addEventListener('keydown', handleKey);
//     return () => window.removeEventListener('keydown', handleKey);
//   });

//   if (!loaded || !vocab.length) {
//     return <p style={{ textAlign: 'center', marginTop: '50px' }}>Loading...</p>;
//   }

//   const folderEntry = stories.find(s => s.story.toLowerCase() === storyId.toLowerCase());
  
//   // uppercase folder name to match VocabPics folder names
//   const folderName = `${storyId}. ${folderEntry?.en?.trim().toUpperCase() || 'STORY'}`;
//   const encodedFolderName = encodeURIComponent(folderName);

//   const currentVocab = vocab[currentIndex];
//   const fileIndex = currentVocab.file;

//   // uppercase file name to match VocabPics
//   const safeEnTitle = normalize(currentVocab.en).replace(/\.+$/, '').toUpperCase();
//   const fileName = `${fileIndex}. ${safeEnTitle}.jpg`;
//   const encodedFileName = encodeURIComponent(fileName);

//   const imagePath = `/ActionStoriesPics/VocabPics/${encodedFolderName}/${encodedFileName}`;

//   const titleColumn = langMap[lang] || 'en';
//   const word = currentVocab[titleColumn] || currentVocab.en;

//   const handleNext = () => {
//     if (currentIndex < vocab.length - 1) setCurrentIndex(prev => prev + 1);
//   };

//   const handlePrev = () => {
//     if (currentIndex > 0) setCurrentIndex(prev => prev - 1);
//   };

//   const handleBack = () => {
//     router.push(`/blogs/blog5/StorySelector`);
//   };

//   const handleQuiz = () => {
//     router.push(`/blogs/blog5/VocabQuiz?story=${storyId}&lang=${lang}`);
//   };

//   // const playAudio = () => {
//   //   const audioFileName = `${safeEnTitle}.opus`;
//   //   const audioPath = `/actionSounds/${langMap[lang]}/${encodeURIComponent(audioFileName)}`;

//   //   const audio = new Audio(audioPath);

//   //   // Fail silently if file not found
//   //   audio.onerror = () => {};
//   //   audio.play().catch(() => {});
//   // };
//   const playAudio = () => {
//     const audioFileName = `${safeEnTitle}.opus`;
//     const audioPath = `/actionSounds/${langMap[lang]}/${encodeURIComponent(audioFileName)}`;

//     const audio = new Audio(audioPath);

//     let ttsFallbackTriggered = false;

//     // If file not found → fallback to TTS automatically
//     audio.onerror = () => {
//       if (!ttsFallbackTriggered) {
//         ttsFallbackTriggered = true;
//         playTTS();
//       }
//     };

//     audio.play().catch(() => {
//       if (!ttsFallbackTriggered) {
//         ttsFallbackTriggered = true;
//         playTTS();
//       }
//     });
//   };

//   // -------------------------
//   // TTS FALLBACK
//   // -------------------------
//   const playTTS = () => {
//     const utter = new SpeechSynthesisUtterance(word);
//     const languageCode = langMap[lang] || 'en';

//     // Try to find a matching voice
//     const voice = voices.find(v => v.lang.toLowerCase().startsWith(languageCode));

//     if (voice) {
//       utter.voice = voice;
//     } else {
//       // No matching installed voice → let browser pick, OR polyfill later
//       utter.lang = languageCode;
//     }

//     speechSynthesis.speak(utter);
//   };


//   return (
//     <div style={{
//       display: 'flex',
//       flexDirection: 'column',
//       alignItems: 'center',
//       justifyContent: 'center',
//       minHeight: '100vh',
//       backgroundColor: '#faf7e8',
//       textAlign: 'center',
//       position: 'relative',
//       padding: '20px'
//     }}>
//       {/* Back arrow */}
//       <div
//         onClick={handleBack}
//         style={{
//           position: 'absolute',
//           top: '20px',
//           left: '20px',
//           cursor: 'pointer',
//           fontSize: '18px',
//           display: 'flex',
//           alignItems: 'center',
//           gap: '5px',
//           color: '#333',
//           fontWeight: '500'
//         }}
//       >
//         ← <span>Back to Stories</span>
//       </div>

//       {/* Toggle Text */}
//       <button
//         onClick={() => setShowText(prev => !prev)}
//         style={{
//           position: 'fixed',
//           top: '70px',
//           right: '20px',
//           padding: '4px 8px',
//           fontSize: '12px',
//           borderRadius: '4px',
//           border: 'none',
//           backgroundColor: 'rgba(255,255,255,0.7)',
//           color: '#333',
//           cursor: 'pointer',
//           boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
//           backdropFilter: 'blur(4px)',
//           zIndex: 1000
//         }}
//       >
//         {showText ? 'Hide' : 'Show'}
//       </button>

//       <img
//         src={imagePath}
//         alt={word}
//         onClick={playAudio}
//         style={{
//           width: '100%',
//           maxWidth: '400px',
//           height: '300px',
//           objectFit: 'contain',
//           borderRadius: '12px',
//           boxShadow: '0 6px 16px rgba(0,0,0,0.25)',
//           transition: '0.3s ease',
//           marginBottom: '10px',
//           cursor: 'pointer',
//           userSelect: 'none'
//         }}
//       />


//       {showText && (
//         <h2
//           onClick={playAudio}
//           style={{
//             fontSize: '22px',
//             fontWeight: '600',
//             marginBottom: '30px',
//             color: '#333',
//             cursor: 'pointer',
//             userSelect: 'none'
//           }}
//         >
//           {word}
//         </h2>
//       )}

//       {/* Navigation Buttons */}
//       <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginBottom: '20px' }}>
//         <button
//           onClick={handlePrev}
//           disabled={currentIndex === 0}
//           style={{
//             padding: '10px 20px',
//             fontSize: '16px',
//             borderRadius: '8px',
//             cursor: currentIndex === 0 ? 'not-allowed' : 'pointer',
//             backgroundColor: currentIndex === 0 ? '#ccc' : '#f3c200',
//             border: 'none'
//           }}
//         >
//           ← Previous
//         </button>
//         <button
//           onClick={handleNext}
//           disabled={currentIndex === vocab.length - 1}
//           style={{
//             padding: '10px 20px',
//             fontSize: '16px',
//             borderRadius: '8px',
//             cursor: currentIndex === vocab.length - 1 ? 'not-allowed' : 'pointer',
//             backgroundColor: currentIndex === vocab.length - 1 ? '#ccc' : '#f3c200',
//             border: 'none'
//           }}
//         >
//           Next →
//         </button>
//       </div>

//       {currentIndex === vocab.length - 1 && (
//         <button
//           onClick={handleQuiz}
//           style={{
//             marginTop: '10px',
//             padding: '10px 20px',
//             fontSize: '16px',
//             fontWeight: '600',
//             backgroundColor: '#f3c200',
//             border: 'none',
//             borderRadius: '8px',
//             cursor: 'pointer',
//             boxShadow: '0 4px 8px rgba(0,0,0,0.2)'
//           }}
//         >
//           Start Quiz →
//         </button>
//       )}
//     </div>
//   );
// }


//code 6 works for everything? or does it except english is robotic
// 'use client';

// import { useEffect, useState } from 'react';
// import { useSearchParams, useRouter } from 'next/navigation';
// import Papa from 'papaparse';

// export default function VocabSlideClient() {
//   const router = useRouter();
//   const params = useSearchParams();
//   const storyId = params.get('story');
//   const lang = (params.get('lang') || 'EN').toUpperCase();

//   const [vocab, setVocab] = useState([]);
//   const [stories, setStories] = useState([]);
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [loaded, setLoaded] = useState(false);
//   const [showText, setShowText] = useState(true);
//   const [voices, setVoices] = useState([]);

//   const langMap = { EN: 'en', PT: 'pt', ES: 'es', IT: 'it', FR: 'fr', DE: 'de', JA: 'ja' };

//   const normalize = (str) =>
//     str.replace(/[–—]/g, '-').replace(/[“”]/g, '"').trim();

//   useEffect(() => {
//     Promise.all([
//       fetch('/actionCSV/VocabularyCSV.csv').then(res => res.text()),
//       fetch('/actionCSV/TitlesCSV.csv').then(res => res.text())
//     ]).then(([vocabText, titlesText]) => {
//       const parsedVocab = Papa.parse(vocabText, {
//         header: true,
//         skipEmptyLines: true,
//         transformHeader: h => h.trim().toLowerCase()
//       }).data;

//       const parsedStories = Papa.parse(titlesText, {
//         header: true,
//         skipEmptyLines: true,
//         transformHeader: h => h.trim().toLowerCase()
//       }).data;

//       // case-insensitive matching for story IDs
//       const storyVocab = parsedVocab.filter(
//         v => v.story.toLowerCase() === storyId.toLowerCase() && v.file && v.en
//       );

//       setVocab(storyVocab);
//       setStories(parsedStories);
//       setLoaded(true);
//     });
//   }, [storyId]);

//   useEffect(() => {
//     const loadVoices = () => {
//       const v = speechSynthesis.getVoices();
//       if (v.length > 0) setVoices(v);
//     };

//     loadVoices();
//     speechSynthesis.onvoiceschanged = loadVoices;
//   }, []);

//   useEffect(() => {
//     const handleKey = (e) => {
//       if (e.key === 'ArrowLeft') handlePrev();
//       if (e.key === 'ArrowRight') handleNext();
//     };
//     window.addEventListener('keydown', handleKey);
//     return () => window.removeEventListener('keydown', handleKey);
//   });

//   if (!loaded || !vocab.length) {
//     return <p style={{ textAlign: 'center', marginTop: '50px' }}>Loading...</p>;
//   }

//   const folderEntry = stories.find(s => s.story.toLowerCase() === storyId.toLowerCase());
  
//   // uppercase folder name to match VocabPics folder names
//   const folderName = `${storyId}. ${folderEntry?.en?.trim().toUpperCase() || 'STORY'}`;
//   const encodedFolderName = encodeURIComponent(folderName);

//   const currentVocab = vocab[currentIndex];
//   const fileIndex = currentVocab.file;

//   // uppercase file name to match VocabPics
//   const safeEnTitle = normalize(currentVocab.en).replace(/\.+$/, '').toUpperCase();
//   const fileName = `${fileIndex}. ${safeEnTitle}.jpg`;
//   const encodedFileName = encodeURIComponent(fileName);

//   const imagePath = `/ActionStoriesPics/VocabPics/${encodedFolderName}/${encodedFileName}`;

//   const titleColumn = langMap[lang] || 'en';
//   const word = currentVocab[titleColumn] || currentVocab.en;

//   const handleNext = () => {
//     if (currentIndex < vocab.length - 1) setCurrentIndex(prev => prev + 1);
//   };

//   const handlePrev = () => {
//     if (currentIndex > 0) setCurrentIndex(prev => prev - 1);
//   };

//   const handleBack = () => {
//     router.push(`/blogs/blog5/StorySelector`);
//   };

//   const handleQuiz = () => {
//     router.push(`/blogs/blog5/VocabQuiz?story=${storyId}&lang=${lang}`);
//   };

//   // const playAudio = () => {
//   //   const audioFileName = `${safeEnTitle}.opus`;
//   //   const audioPath = `/actionSounds/${langMap[lang]}/${encodeURIComponent(audioFileName)}`;

//   //   const audio = new Audio(audioPath);

//   //   // Fail silently if file not found
//   //   audio.onerror = () => {};
//   //   audio.play().catch(() => {});
//   // };
//   // -------------------------
// // UNIVERSAL AUDIO → TTS FALLBACK
// // -------------------------
// const playAudio = async () => {
//   const langCode = langMap[lang] || "en";
//   const fileName = `${safeEnTitle}.m4a`;
//   const audioPath = `/actionSounds/${langCode}/${encodeURIComponent(fileName)}`;

//   const audio = new Audio(audioPath);
//   let usedTTS = false;

//   // Try to preload the file (Chrome needs this to avoid long delay)
//   try {
//     await new Promise((resolve, reject) => {
//       audio.oncanplaythrough = resolve;
//       audio.onerror = reject;
//     });

//     // If loaded properly → play it
//     audio.play().catch(() => playTTS());
//     return;
//   } catch (e) {
//     // File missing OR failed to load
//     usedTTS = true;
//     playTTS();
//   }
// };

// // -------------------------
// // TTS FALLBACK (Android/iPhone/Desktop)
// // -------------------------
// const playTTS = () => {
//   const language = langMap[lang] || "en";
//   const utter = new SpeechSynthesisUtterance(word);

//   // Force language (required for Android)
//   utter.lang = language;

//   // Pick matching installed voice (if available)
//   const voice = voices.find(v =>
//     v.lang.toLowerCase().startsWith(language)
//   );
//   if (voice) utter.voice = voice;

//   utter.rate = 1;
//   utter.pitch = 1;

//   speechSynthesis.cancel();
//   speechSynthesis.speak(utter);
// };



//   return (
//     <div style={{
//       display: 'flex',
//       flexDirection: 'column',
//       alignItems: 'center',
//       justifyContent: 'center',
//       minHeight: '100vh',
//       backgroundColor: '#faf7e8',
//       textAlign: 'center',
//       position: 'relative',
//       padding: '20px'
//     }}>
//       {/* Back arrow */}
//       <div
//         onClick={handleBack}
//         style={{
//           position: 'absolute',
//           top: '20px',
//           left: '20px',
//           cursor: 'pointer',
//           fontSize: '18px',
//           display: 'flex',
//           alignItems: 'center',
//           gap: '5px',
//           color: '#333',
//           fontWeight: '500'
//         }}
//       >
//         ← <span>Back to Stories</span>
//       </div>

//       {/* Toggle Text */}
//       <button
//         onClick={() => setShowText(prev => !prev)}
//         style={{
//           position: 'fixed',
//           top: '70px',
//           right: '20px',
//           padding: '4px 8px',
//           fontSize: '12px',
//           borderRadius: '4px',
//           border: 'none',
//           backgroundColor: 'rgba(255,255,255,0.7)',
//           color: '#333',
//           cursor: 'pointer',
//           boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
//           backdropFilter: 'blur(4px)',
//           zIndex: 1000
//         }}
//       >
//         {showText ? 'Hide' : 'Show'}
//       </button>

//       <img
//         src={imagePath}
//         alt={word}
//         onClick={playAudio}
//         style={{
//           width: '100%',
//           maxWidth: '400px',
//           height: '300px',
//           objectFit: 'contain',
//           borderRadius: '12px',
//           boxShadow: '0 6px 16px rgba(0,0,0,0.25)',
//           transition: '0.3s ease',
//           marginBottom: '10px',
//           cursor: 'pointer',
//           userSelect: 'none'
//         }}
//       />


//       {showText && (
//         <h2
//           onClick={playAudio}
//           style={{
//             fontSize: '22px',
//             fontWeight: '600',
//             marginBottom: '30px',
//             color: '#333',
//             cursor: 'pointer',
//             userSelect: 'none'
//           }}
//         >
//           {word}
//         </h2>
//       )}

//       {/* Navigation Buttons */}
//       <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginBottom: '20px' }}>
//         <button
//           onClick={handlePrev}
//           disabled={currentIndex === 0}
//           style={{
//             padding: '10px 20px',
//             fontSize: '16px',
//             borderRadius: '8px',
//             cursor: currentIndex === 0 ? 'not-allowed' : 'pointer',
//             backgroundColor: currentIndex === 0 ? '#ccc' : '#f3c200',
//             border: 'none'
//           }}
//         >
//           ← Previous
//         </button>
//         <button
//           onClick={handleNext}
//           disabled={currentIndex === vocab.length - 1}
//           style={{
//             padding: '10px 20px',
//             fontSize: '16px',
//             borderRadius: '8px',
//             cursor: currentIndex === vocab.length - 1 ? 'not-allowed' : 'pointer',
//             backgroundColor: currentIndex === vocab.length - 1 ? '#ccc' : '#f3c200',
//             border: 'none'
//           }}
//         >
//           Next →
//         </button>
//       </div>

//       {currentIndex === vocab.length - 1 && (
//         <button
//           onClick={handleQuiz}
//           style={{
//             marginTop: '10px',
//             padding: '10px 20px',
//             fontSize: '16px',
//             fontWeight: '600',
//             backgroundColor: '#f3c200',
//             border: 'none',
//             borderRadius: '8px',
//             cursor: 'pointer',
//             boxShadow: '0 4px 8px rgba(0,0,0,0.2)'
//           }}
//         >
//           Start Quiz →
//         </button>
//       )}
//     </div>
//   );
// }


//code 7 works except  on edge the vocab voice is robotic for english only in edge.
// 'use client';

// import { useEffect, useState } from 'react';
// import { useSearchParams, useRouter } from 'next/navigation';
// import Papa from 'papaparse';

// export default function VocabSlideClient() {
//   const router = useRouter();
//   const params = useSearchParams();
//   const storyId = params.get('story');
//   const lang = (params.get('lang') || 'EN').toUpperCase();

//   const [vocab, setVocab] = useState([]);
//   const [stories, setStories] = useState([]);
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [loaded, setLoaded] = useState(false);
//   const [showText, setShowText] = useState(true);
//   const [voices, setVoices] = useState([]);

//   const langMap = { EN: 'en', PT: 'pt', ES: 'es', IT: 'it', FR: 'fr', DE: 'de', JA: 'ja' };

//   const normalize = (str) =>
//     str.replace(/[–—]/g, '-').replace(/[“”]/g, '"').trim();

//   useEffect(() => {
//     Promise.all([
//       fetch('/actionCSV/VocabularyCSV.csv').then(res => res.text()),
//       fetch('/actionCSV/TitlesCSV.csv').then(res => res.text())
//     ]).then(([vocabText, titlesText]) => {
//       const parsedVocab = Papa.parse(vocabText, {
//         header: true,
//         skipEmptyLines: true,
//         transformHeader: h => h.trim().toLowerCase()
//       }).data;

//       const parsedStories = Papa.parse(titlesText, {
//         header: true,
//         skipEmptyLines: true,
//         transformHeader: h => h.trim().toLowerCase()
//       }).data;

//       // case-insensitive matching for story IDs
//       const storyVocab = parsedVocab.filter(
//         v => v.story.toLowerCase() === storyId.toLowerCase() && v.file && v.en
//       );

//       setVocab(storyVocab);
//       setStories(parsedStories);
//       setLoaded(true);
//     });
//   }, [storyId]);

//   useEffect(() => {
//     const loadVoices = () => {
//       const v = speechSynthesis.getVoices();
//       if (v.length > 0) setVoices(v);
//     };

//     loadVoices();
//     speechSynthesis.onvoiceschanged = loadVoices;
//   }, []);

//   useEffect(() => {
//     const handleKey = (e) => {
//       if (e.key === 'ArrowLeft') handlePrev();
//       if (e.key === 'ArrowRight') handleNext();
//     };
//     window.addEventListener('keydown', handleKey);
//     return () => window.removeEventListener('keydown', handleKey);
//   });

//   if (!loaded || !vocab.length) {
//     return <p style={{ textAlign: 'center', marginTop: '50px' }}>Loading...</p>;
//   }

//   const folderEntry = stories.find(s => s.story.toLowerCase() === storyId.toLowerCase());
  
//   // uppercase folder name to match VocabPics folder names
//   const folderName = `${storyId}. ${folderEntry?.en?.trim().toUpperCase() || 'STORY'}`;
//   const encodedFolderName = encodeURIComponent(folderName);

//   const currentVocab = vocab[currentIndex];
//   const fileIndex = currentVocab.file;

//   // uppercase file name to match VocabPics
//   const safeEnTitle = normalize(currentVocab.en).replace(/\.+$/, '').toUpperCase();
//   const fileName = `${fileIndex}. ${safeEnTitle}.jpg`;
//   const encodedFileName = encodeURIComponent(fileName);

//   const imagePath = `/ActionStoriesPics/VocabPics/${encodedFolderName}/${encodedFileName}`;

//   const titleColumn = langMap[lang] || 'en';
//   const word = currentVocab[titleColumn] || currentVocab.en;

//   const handleNext = () => {
//     if (currentIndex < vocab.length - 1) setCurrentIndex(prev => prev + 1);
//   };

//   const handlePrev = () => {
//     if (currentIndex > 0) setCurrentIndex(prev => prev - 1);
//   };

//   const handleBack = () => {
//     router.push(`/blogs/blog5/StorySelector`);
//   };

//   const handleQuiz = () => {
//     router.push(`/blogs/blog5/VocabQuiz?story=${storyId}&lang=${lang}`);
//   };

//   // const playAudio = () => {
//   //   const audioFileName = `${safeEnTitle}.opus`;
//   //   const audioPath = `/actionSounds/${langMap[lang]}/${encodeURIComponent(audioFileName)}`;

//   //   const audio = new Audio(audioPath);

//   //   // Fail silently if file not found
//   //   audio.onerror = () => {};
//   //   audio.play().catch(() => {});
//   // };
//   // -------------------------
// // UNIVERSAL AUDIO → TTS FALLBACK
// // -------------------------
// const playAudio = async () => {
//   const langCode = langMap[lang] || "en";
//   const fileName = `${safeEnTitle}.m4a`;
//   const audioPath = `/actionSounds/${langCode}/${encodeURIComponent(fileName)}`;

//   const audio = new Audio(audioPath);
//   let usedTTS = false;

//   // Try to preload the file (Chrome needs this to avoid long delay)
//   try {
//     await new Promise((resolve, reject) => {
//       audio.oncanplaythrough = resolve;
//       audio.onerror = reject;
//     });

//     // If loaded properly → play it
//     audio.play().catch(() => playTTS());
//     return;
//   } catch (e) {
//     // File missing OR failed to load
//     usedTTS = true;
//     playTTS();
//   }
// };

// // -------------------------
// // TTS FALLBACK (Android/iPhone/Desktop)
// // -------------------------
// // -------------------------
// // TTS FALLBACK WITH MULTI-LANGUAGE NATURAL VOICES
// // -------------------------
// const playTTS = () => {
//   const language = langMap[lang] || "en";
//   const utter = new SpeechSynthesisUtterance(word);
//   utter.lang = language;

//   // --- Per-language preferred natural voices ---
//   const preferredVoicesByLang = {
//     en: [
//       "Google UK English Male",
//       "Google UK English Female",
//       "Google US English",
//       "Microsoft Aria Online (Natural)",
//       "Microsoft Jenny Online (Natural)",
//       "Samantha",     // iOS
//       "Daniel"        // macOS
//     ],
//     pt: [
//       "Google português do Brasil",
//       "Microsoft Francisca Online (Natural)",
//       "Luciana"
//     ],
//     es: [
//       "Google español",
//       "Microsoft Helena Online (Natural)",
//       "Monica"
//     ],
//     fr: [
//       "Google français",
//       "Microsoft Sylvie Online (Natural)",
//       "Amélie"
//     ],
//     de: [
//       "Google deutsch",
//       "Microsoft Katja Online (Natural)"
//     ],
//     it: [
//       "Google italiano",
//       "Microsoft Isabella Online (Natural)"
//     ],
//     ja: [
//       "Google 日本語",
//       "Microsoft Nanami Online (Natural)"
//     ]
//   };

//   const preferredList = preferredVoicesByLang[language] || [];

//   // 1. Try high-quality natural voices for this language
//   let voice =
//     voices.find(v => preferredList.includes(v.name)) ||

//     // 2. Otherwise ANY voice starting with the lang ("es", "pt", etc.)
//     voices.find(v => v.lang.toLowerCase().startsWith(language)) ||

//     // 3. Last fallback: any system voice at all
//     voices[0];

//   if (voice) utter.voice = voice;

//   // Make it sound more natural
//   utter.rate = 0.9;
//   utter.pitch = 1;

//   speechSynthesis.cancel();
//   speechSynthesis.speak(utter);
// };

//   return (
//     <div style={{
//       display: 'flex',
//       flexDirection: 'column',
//       alignItems: 'center',
//       justifyContent: 'center',
//       minHeight: '100vh',
//       backgroundColor: '#faf7e8',
//       textAlign: 'center',
//       position: 'relative',
//       padding: '20px'
//     }}>
//       {/* Back arrow */}
//       <div
//         onClick={handleBack}
//         style={{
//           position: 'absolute',
//           top: '20px',
//           left: '20px',
//           cursor: 'pointer',
//           fontSize: '18px',
//           display: 'flex',
//           alignItems: 'center',
//           gap: '5px',
//           color: '#333',
//           fontWeight: '500'
//         }}
//       >
//         ← <span>Back to Stories</span>
//       </div>

//       {/* Toggle Text */}
//       <button
//         onClick={() => setShowText(prev => !prev)}
//         style={{
//           position: 'fixed',
//           top: '70px',
//           right: '20px',
//           padding: '4px 8px',
//           fontSize: '12px',
//           borderRadius: '4px',
//           border: 'none',
//           backgroundColor: 'rgba(255,255,255,0.7)',
//           color: '#333',
//           cursor: 'pointer',
//           boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
//           backdropFilter: 'blur(4px)',
//           zIndex: 1000
//         }}
//       >
//         {showText ? 'Hide' : 'Show'}
//       </button>

//       <img
//         src={imagePath}
//         alt={word}
//         onClick={playAudio}
//         style={{
//           width: '100%',
//           maxWidth: '400px',
//           height: '300px',
//           objectFit: 'contain',
//           borderRadius: '12px',
//           boxShadow: '0 6px 16px rgba(0,0,0,0.25)',
//           transition: '0.3s ease',
//           marginBottom: '10px',
//           cursor: 'pointer',
//           userSelect: 'none'
//         }}
//       />


//       {showText && (
//         <h2
//           onClick={playAudio}
//           style={{
//             fontSize: '22px',
//             fontWeight: '600',
//             marginBottom: '30px',
//             color: '#333',
//             cursor: 'pointer',
//             userSelect: 'none'
//           }}
//         >
//           {word}
//         </h2>
//       )}

//       {/* Navigation Buttons */}
//       <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginBottom: '20px' }}>
//         <button
//           onClick={handlePrev}
//           disabled={currentIndex === 0}
//           style={{
//             padding: '10px 20px',
//             fontSize: '16px',
//             borderRadius: '8px',
//             cursor: currentIndex === 0 ? 'not-allowed' : 'pointer',
//             backgroundColor: currentIndex === 0 ? '#ccc' : '#f3c200',
//             border: 'none'
//           }}
//         >
//           ← Previous
//         </button>
//         <button
//           onClick={handleNext}
//           disabled={currentIndex === vocab.length - 1}
//           style={{
//             padding: '10px 20px',
//             fontSize: '16px',
//             borderRadius: '8px',
//             cursor: currentIndex === vocab.length - 1 ? 'not-allowed' : 'pointer',
//             backgroundColor: currentIndex === vocab.length - 1 ? '#ccc' : '#f3c200',
//             border: 'none'
//           }}
//         >
//           Next →
//         </button>
//       </div>

//       {currentIndex === vocab.length - 1 && (
//         <button
//           onClick={handleQuiz}
//           style={{
//             marginTop: '10px',
//             padding: '10px 20px',
//             fontSize: '16px',
//             fontWeight: '600',
//             backgroundColor: '#f3c200',
//             border: 'none',
//             borderRadius: '8px',
//             cursor: 'pointer',
//             boxShadow: '0 4px 8px rgba(0,0,0,0.2)'
//           }}
//         >
//           Start Quiz →
//         </button>
//       )}
//     </div>
//   );
// }

//code 8 works great with exception of androids(english phon and apple no sound)-firefox never
// 'use client';

// import { useEffect, useState } from 'react';
// import { useSearchParams, useRouter } from 'next/navigation';
// import Papa from 'papaparse';

// export default function VocabSlideClient() {
//   const router = useRouter();
//   const params = useSearchParams();
//   const storyId = params.get('story');
//   const lang = (params.get('lang') || 'EN').toUpperCase();

//   const [vocab, setVocab] = useState([]);
//   const [stories, setStories] = useState([]);
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [loaded, setLoaded] = useState(false);
//   const [showText, setShowText] = useState(true);
//   const [voices, setVoices] = useState([]);

//   const langMap = { EN: 'en', PT: 'pt', ES: 'es', IT: 'it', FR: 'fr', DE: 'de', JA: 'ja' };

//   const normalize = (str) =>
//     str.replace(/[–—]/g, '-').replace(/[“”]/g, '"').trim();

//   useEffect(() => {
//     Promise.all([
//       fetch('/actionCSV/VocabularyCSV.csv').then(res => res.text()),
//       fetch('/actionCSV/TitlesCSV.csv').then(res => res.text())
//     ]).then(([vocabText, titlesText]) => {
//       const parsedVocab = Papa.parse(vocabText, {
//         header: true,
//         skipEmptyLines: true,
//         transformHeader: h => h.trim().toLowerCase()
//       }).data;

//       const parsedStories = Papa.parse(titlesText, {
//         header: true,
//         skipEmptyLines: true,
//         transformHeader: h => h.trim().toLowerCase()
//       }).data;

//       // case-insensitive matching for story IDs
//       const storyVocab = parsedVocab.filter(
//         v => v.story.toLowerCase() === storyId.toLowerCase() && v.file && v.en
//       );

//       setVocab(storyVocab);
//       setStories(parsedStories);
//       setLoaded(true);
//     });
//   }, [storyId]);

//   useEffect(() => {
//     const loadVoices = () => {
//       const v = speechSynthesis.getVoices();
//       if (v.length > 0) setVoices(v);
//     };

//     loadVoices();
//     speechSynthesis.onvoiceschanged = loadVoices;
//   }, []);

//   useEffect(() => {
//     const handleKey = (e) => {
//       if (e.key === 'ArrowLeft') handlePrev();
//       if (e.key === 'ArrowRight') handleNext();
//     };
//     window.addEventListener('keydown', handleKey);
//     return () => window.removeEventListener('keydown', handleKey);
//   });

//   if (!loaded || !vocab.length) {
//     return <p style={{ textAlign: 'center', marginTop: '50px' }}>Loading...</p>;
//   }

//   const folderEntry = stories.find(s => s.story.toLowerCase() === storyId.toLowerCase());
  
//   // uppercase folder name to match VocabPics folder names
//   const folderName = `${storyId}. ${folderEntry?.en?.trim().toUpperCase() || 'STORY'}`;
//   const encodedFolderName = encodeURIComponent(folderName);

//   const currentVocab = vocab[currentIndex];
//   const fileIndex = currentVocab.file;

//   // uppercase file name to match VocabPics
//   const safeEnTitle = normalize(currentVocab.en).replace(/\.+$/, '').toUpperCase();
//   const fileName = `${fileIndex}. ${safeEnTitle}.jpg`;
//   const encodedFileName = encodeURIComponent(fileName);

//   const imagePath = `/ActionStoriesPics/VocabPics/${encodedFolderName}/${encodedFileName}`;

//   const titleColumn = langMap[lang] || 'en';
//   const word = currentVocab[titleColumn] || currentVocab.en;

//   const handleNext = () => {
//     if (currentIndex < vocab.length - 1) setCurrentIndex(prev => prev + 1);
//   };

//   const handlePrev = () => {
//     if (currentIndex > 0) setCurrentIndex(prev => prev - 1);
//   };

//   const handleBack = () => {
//     router.push(`/blogs/blog5/StorySelector`);
//   };

//   const handleQuiz = () => {
//     router.push(`/blogs/blog5/VocabQuiz?story=${storyId}&lang=${lang}`);
//   };

//   // const playAudio = () => {
//   //   const audioFileName = `${safeEnTitle}.opus`;
//   //   const audioPath = `/actionSounds/${langMap[lang]}/${encodeURIComponent(audioFileName)}`;

//   //   const audio = new Audio(audioPath);

//   //   // Fail silently if file not found
//   //   audio.onerror = () => {};
//   //   audio.play().catch(() => {});
//   // };
//   // -------------------------
// // UNIVERSAL AUDIO → TTS FALLBACK
// // -------------------------
// const playAudio = async () => {
//   const langCode = langMap[lang] || "en";
//   const fileName = `${safeEnTitle}.m4a`;
//   const audioPath = `/actionSounds/${langCode}/${encodeURIComponent(fileName)}`;

//   const audio = new Audio(audioPath);
//   let usedTTS = false;

//   // Try to preload the file (Chrome needs this to avoid long delay)
//   try {
//     await new Promise((resolve, reject) => {
//       audio.oncanplaythrough = resolve;
//       audio.onerror = reject;
//     });

//     // If loaded properly → play it
//     audio.play().catch(() => playTTS());
//     return;
//   } catch (e) {
//     // File missing OR failed to load
//     usedTTS = true;
//     playTTS();
//   }
// };

// // -------------------------
// // TTS FALLBACK (Android/iPhone/Desktop)
// // -------------------------
// // -------------------------
// // TTS FALLBACK WITH MULTI-LANGUAGE NATURAL VOICES
// // -------------------------
// const playTTS = () => {
//   const language = langMap[lang] || "en";
//   const utter = new SpeechSynthesisUtterance(word);
//   utter.lang = language;

//   const ua = navigator.userAgent.toLowerCase();

//   const isChrome = ua.includes("chrome") && !ua.includes("edg");
//   const isEdge   = ua.includes("edg");
//   const isSafari = ua.includes("safari") && !ua.includes("chrome");
//   const isIOS    = /iphone|ipad|ipod/.test(ua);
//   const isAndroid = ua.includes("android");

//   // MASTER LIST of voices by LANGUAGE (browser-independent)
//   const voiceCandidates = {
//     en: [
//       "Google US English", "Google UK English Male", "Google UK English Female",
//       "Microsoft Aria", "Microsoft Jenny", "Microsoft Guy",
//       "Samantha", "Daniel"
//     ],
//     pt: [
//       "Google português do Brasil", "Luciana", "Microsoft Francisca"
//     ],
//     es: [
//       "Google español", "Monica", "Microsoft Helena", "Microsoft Laura"
//     ],
//     fr: [
//       "Google français", "Amélie", "Microsoft Sylvie", "Microsoft Remy"
//     ],
//     de: [
//       "Google deutsch", "Microsoft Katja", "Anna"
//     ],
//     it: [
//       "Google italiano", "Microsoft Isabella", "Alice"
//     ],
//     ja: [
//       "Google 日本語", "Kyoko", "Microsoft Nanami"
//     ]
//   };

//   const preferredList = voiceCandidates[language] || [];

//   // CHOOSE BEST VOICE THAT ACTUALLY EXISTS IN THIS DEVICE
//   let bestVoice =
//     voices.find(v => preferredList.some(p => v.name.toLowerCase().includes(p.toLowerCase()))) ||

//     // If none found, pick any matching language voice
//     voices.find(v => v.lang && v.lang.toLowerCase().startsWith(language)) ||

//     // Final fallback
//     voices[0];

//   if (bestVoice) utter.voice = bestVoice;

//   // Natural sounding defaults (safe for every browser)
//   utter.rate = isIOS ? 0.85 : 0.9;
//   utter.pitch = 1;

//   speechSynthesis.cancel();
//   speechSynthesis.speak(utter);
// };


//   return (
//     <div style={{
//       display: 'flex',
//       flexDirection: 'column',
//       alignItems: 'center',
//       justifyContent: 'center',
//       minHeight: '100vh',
//       backgroundColor: '#faf7e8',
//       textAlign: 'center',
//       position: 'relative',
//       padding: '20px'
//     }}>
//       {/* Back arrow */}
//       <div
//         onClick={handleBack}
//         style={{
//           position: 'absolute',
//           top: '20px',
//           left: '20px',
//           cursor: 'pointer',
//           fontSize: '18px',
//           display: 'flex',
//           alignItems: 'center',
//           gap: '5px',
//           color: '#333',
//           fontWeight: '500'
//         }}
//       >
//         ← <span>Back to Stories</span>
//       </div>

//       {/* Toggle Text */}
//       <button
//         onClick={() => setShowText(prev => !prev)}
//         style={{
//           position: 'fixed',
//           top: '70px',
//           right: '20px',
//           padding: '4px 8px',
//           fontSize: '12px',
//           borderRadius: '4px',
//           border: 'none',
//           backgroundColor: 'rgba(255,255,255,0.7)',
//           color: '#333',
//           cursor: 'pointer',
//           boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
//           backdropFilter: 'blur(4px)',
//           zIndex: 1000
//         }}
//       >
//         {showText ? 'Hide' : 'Show'}
//       </button>

//       <img
//         src={imagePath}
//         alt={word}
//         onClick={playAudio}
//         style={{
//           width: '100%',
//           maxWidth: '400px',
//           height: '300px',
//           objectFit: 'contain',
//           borderRadius: '12px',
//           boxShadow: '0 6px 16px rgba(0,0,0,0.25)',
//           transition: '0.3s ease',
//           marginBottom: '10px',
//           cursor: 'pointer',
//           userSelect: 'none'
//         }}
//       />


//       {showText && (
//         <h2
//           onClick={playAudio}
//           style={{
//             fontSize: '22px',
//             fontWeight: '600',
//             marginBottom: '30px',
//             color: '#333',
//             cursor: 'pointer',
//             userSelect: 'none'
//           }}
//         >
//           {word}
//         </h2>
//       )}

//       {/* Navigation Buttons */}
//       <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginBottom: '20px' }}>
//         <button
//           onClick={handlePrev}
//           disabled={currentIndex === 0}
//           style={{
//             padding: '10px 20px',
//             fontSize: '16px',
//             borderRadius: '8px',
//             cursor: currentIndex === 0 ? 'not-allowed' : 'pointer',
//             backgroundColor: currentIndex === 0 ? '#ccc' : '#f3c200',
//             border: 'none'
//           }}
//         >
//           ← Previous
//         </button>
//         <button
//           onClick={handleNext}
//           disabled={currentIndex === vocab.length - 1}
//           style={{
//             padding: '10px 20px',
//             fontSize: '16px',
//             borderRadius: '8px',
//             cursor: currentIndex === vocab.length - 1 ? 'not-allowed' : 'pointer',
//             backgroundColor: currentIndex === vocab.length - 1 ? '#ccc' : '#f3c200',
//             border: 'none'
//           }}
//         >
//           Next →
//         </button>
//       </div>

//       {currentIndex === vocab.length - 1 && (
//         <button
//           onClick={handleQuiz}
//           style={{
//             marginTop: '10px',
//             padding: '10px 20px',
//             fontSize: '16px',
//             fontWeight: '600',
//             backgroundColor: '#f3c200',
//             border: 'none',
//             borderRadius: '8px',
//             cursor: 'pointer',
//             boxShadow: '0 4px 8px rgba(0,0,0,0.2)'
//           }}
//         >
//           Start Quiz →
//         </button>
//       )}
//     </div>
//   );
// }

//code 9 good but spelling tts issue
// 'use client';

// import { useEffect, useState, useRef } from 'react';
// import { useSearchParams, useRouter } from 'next/navigation';
// import Papa from 'papaparse';

// export default function VocabSlideClient() {
//   const router = useRouter();
//   const params = useSearchParams();
//   const storyId = params.get('story');
//   const lang = (params.get('lang') || 'EN').toUpperCase();

//   const [vocab, setVocab] = useState([]);
//   const [stories, setStories] = useState([]);
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [loaded, setLoaded] = useState(false);
//   const [showText, setShowText] = useState(true);
//   const [voices, setVoices] = useState([]);

//   const voicesLoadedRef = useRef(false);
//   const voicesLoadPromiseRef = useRef(null);

//   const langMap = { EN: 'en', PT: 'pt', ES: 'es', IT: 'it', FR: 'fr', DE: 'de', JA: 'ja', NL: 'nl' };

//   const normalize = (str) =>
//     str.replace(/[–—]/g, '-').replace(/[“”]/g, '"').trim();

//   useEffect(() => {
//     Promise.all([
//       fetch('/actionCSV/VocabularyCSV.csv').then(res => res.text()),
//       fetch('/actionCSV/TitlesCSV.csv').then(res => res.text())
//     ]).then(([vocabText, titlesText]) => {
//       const parsedVocab = Papa.parse(vocabText, {
//         header: true,
//         skipEmptyLines: true,
//         transformHeader: h => h.trim().toLowerCase()
//       }).data;

//       const parsedStories = Papa.parse(titlesText, {
//         header: true,
//         skipEmptyLines: true,
//         transformHeader: h => h.trim().toLowerCase()
//       }).data;

//       // case-insensitive matching for story IDs
//       const storyVocab = parsedVocab.filter(
//         v => v.story.toLowerCase() === storyId.toLowerCase() && v.file && v.en
//       );

//       setVocab(storyVocab);
//       setStories(parsedStories);
//       setLoaded(true);
//     });
//   }, [storyId]);

//   // keep voices state updated (useful for UI / debugging)
//   useEffect(() => {
//     const loadVoicesOnce = () => {
//       const v = speechSynthesis.getVoices();
//       if (v.length > 0) {
//         setVoices(v);
//         voicesLoadedRef.current = true;
//         if (voicesLoadPromiseRef.current) {
//           voicesLoadPromiseRef.current.resolve(v);
//           voicesLoadPromiseRef.current = null;
//         }
//       }
//     };

//     loadVoicesOnce();
//     speechSynthesis.onvoiceschanged = loadVoicesOnce;

//     // cleanup
//     return () => {
//       try { speechSynthesis.onvoiceschanged = null; } catch (e) {}
//     };
//   }, []);

//   // helper: returns a promise that resolves when voices are available
//   const waitForVoices = (timeout = 3000) => {
//     if (voicesLoadedRef.current) return Promise.resolve(speechSynthesis.getVoices());

//     if (voicesLoadPromiseRef.current) return voicesLoadPromiseRef.current.promise;

//     let resolveFn, rejectFn;
//     const promise = new Promise((resolve, reject) => {
//       resolveFn = resolve;
//       rejectFn = reject;
//     });

//     voicesLoadPromiseRef.current = {
//       promise,
//       resolve: (v) => resolveFn(v),
//       reject: (err) => rejectFn(err),
//     };

//     // poll as extra fallback (some Android/Edge environments)
//     const start = Date.now();
//     const id = setInterval(() => {
//       const v = speechSynthesis.getVoices();
//       if (v.length > 0) {
//         clearInterval(id);
//         voicesLoadedRef.current = true;
//         setVoices(v);
//         if (voicesLoadPromiseRef.current) {
//           voicesLoadPromiseRef.current.resolve(v);
//           voicesLoadPromiseRef.current = null;
//         }
//       } else if (Date.now() - start > timeout) {
//         clearInterval(id);
//         // resolve anyway with whatever voices exist (maybe empty)
//         const fallback = speechSynthesis.getVoices();
//         voicesLoadedRef.current = fallback.length > 0;
//         setVoices(fallback);
//         if (voicesLoadPromiseRef.current) {
//           voicesLoadPromiseRef.current.resolve(fallback);
//           voicesLoadPromiseRef.current = null;
//         }
//       }
//     }, 250);

//     return promise;
//   };

//   useEffect(() => {
//     const handleKey = (e) => {
//       if (e.key === 'ArrowLeft') handlePrev();
//       if (e.key === 'ArrowRight') handleNext();
//     };
//     window.addEventListener('keydown', handleKey);
//     return () => window.removeEventListener('keydown', handleKey);
//   });

//   if (!loaded || !vocab.length) {
//     return <p style={{ textAlign: 'center', marginTop: '50px' }}>Loading...</p>;
//   }

//   const folderEntry = stories.find(s => s.story.toLowerCase() === storyId.toLowerCase());
  
//   // uppercase folder name to match VocabPics folder names
//   const folderName = `${storyId}. ${folderEntry?.en?.trim().toUpperCase() || 'STORY'}`;
//   const encodedFolderName = encodeURIComponent(folderName);

//   const currentVocab = vocab[currentIndex];
//   const fileIndex = currentVocab.file;

//   // uppercase file name to match VocabPics
//   const safeEnTitle = normalize(currentVocab.en).replace(/\.+$/, '').toUpperCase();
//   const fileName = `${fileIndex}. ${safeEnTitle}.jpg`;
//   const encodedFileName = encodeURIComponent(fileName);

//   const imagePath = `/ActionStoriesPics/VocabPics/${encodedFolderName}/${encodedFileName}`;

//   const titleColumn = langMap[lang] || 'en';
//   const word = currentVocab[titleColumn] || currentVocab.en;

//   const handleNext = () => {
//     if (currentIndex < vocab.length - 1) setCurrentIndex(prev => prev + 1);
//   };

//   const handlePrev = () => {
//     if (currentIndex > 0) setCurrentIndex(prev => prev - 1);
//   };

//   const handleBack = () => {
//     router.push(`/blogs/blog5/StorySelector`);
//   };

//   const handleQuiz = () => {
//     router.push(`/blogs/blog5/VocabQuiz?story=${storyId}&lang=${lang}`);
//   };

//   // -------------------------
//   // UNIVERSAL AUDIO → TTS FALLBACK (improved)
//   // -------------------------
//   const playAudio = async () => {
//     const langCode = langMap[lang] || "en";
//     const fileNameAudio = `${safeEnTitle}.m4a`;
//     const audioPath = `/actionSounds/${langCode}/${encodeURIComponent(fileNameAudio)}`;

//     const audio = new Audio(audioPath);

//     try {
//       await new Promise((resolve, reject) => {
//         audio.oncanplaythrough = resolve;
//         audio.onerror = reject;
//         // attempt to load
//         audio.load();
//       });

//       // If loaded properly → play it (user gesture required)
//       await audio.play().catch(() => {
//         // if playback blocked, fallback to TTS
//         playTTS();
//       });
//       return;
//     } catch (e) {
//       // File missing OR failed to load → fallback to TTS
//       playTTS();
//     }
//   };

//   // -------------------------
//   // Robust TTS: wait for voices, pick best voice per language+browser, retry logic
//   // -------------------------
//   const playTTS = async () => {
//     const language = langMap[lang] || "en";
//     const text = word;

//     // Make sure this is called from a user gesture (onClick). iOS/Safari will mute otherwise.
//     // Wait for voices to populate (Android/Edge need this)
//     try {
//       await waitForVoices(3500);
//     } catch (e) {
//       // continue even if voices didn't arrive
//       console.warn('voices load wait failed', e);
//     }

//     const ua = navigator.userAgent.toLowerCase();
//     const isIOS = /iphone|ipad|ipod/.test(ua);
//     const isEdge = ua.includes("edg");
//     const isChrome = ua.includes("chrome") && !ua.includes("edg");
//     const isSafari = ua.includes("safari") && !ua.includes("chrome");
//     const isAndroid = ua.includes("android");

//     const allVoices = speechSynthesis.getVoices() || voices || [];

//     // MASTER list of candidate names (broad matching)
//     const voiceCandidates = {
//       en: ["google us english", "google uk english", "microsoft aria", "microsoft jenny", "samantha", "daniel"],
//       pt: ["português do brasil", "luciana", "microsoft francisca"],
//       es: ["google español", "monica", "microsoft helena", "microsoft laura"],
//       fr: ["google français", "amélie", "microsoft sylvie", "microsoft remy"],
//       de: ["google deutsch", "microsoft katja", "anna"],
//       it: ["google italiano", "microsoft isabella", "alice"],
//       ja: ["google 日本語", "kyoko", "microsoft nanami"],
//       nl: ["google nederlands", "microsoft renee", "microsoft bert"]
//     };

//     const preferred = voiceCandidates[language] || [];

//     // try multiple strategies to choose the best available voice
//     const chooseVoice = () => {
//       // 1) name contains one of preferred phrases (case-insensitive)
//       let v = allVoices.find(voice =>
//         preferred.some(p => voice.name?.toLowerCase().includes(p))
//       );
//       if (v) return v;

//       // 2) exact lang match (voice.lang startsWith language code)
//       v = allVoices.find(voice =>
//         voice.lang && voice.lang.toLowerCase().startsWith(language)
//       );
//       if (v) return v;

//       // 3) for Edge try voices whose name contains 'microsoft' + language-specific hint
//       if (isEdge) {
//         v = allVoices.find(voice => voice.name?.toLowerCase().includes('microsoft') && voice.lang?.toLowerCase().startsWith(language));
//         if (v) return v;
//       }

//       // 4) chrome-specific fuzzy: prefer Google voices if Chrome
//       if (isChrome) {
//         v = allVoices.find(voice => voice.name?.toLowerCase().includes('google') && voice.lang?.toLowerCase().startsWith(language));
//         if (v) return v;
//       }

//       // 5) fallback: first voice that has any language set
//       if (allVoices.length > 0) return allVoices[0];

//       // 6) no voices available -> null
//       return null;
//     };

//     let selectedVoice = chooseVoice();

//     // On Android sometimes the first selection is still not language-correct.
//     // Retry once after a short pause if language doesn't match.
//     if (isAndroid && selectedVoice && !(selectedVoice.lang || '').toLowerCase().startsWith(language)) {
//       // try to wait briefly and re-read voices
//       await new Promise(r => setTimeout(r, 300));
//       const fresh = speechSynthesis.getVoices();
//       if (fresh.length > allVoices.length) {
//         // try picking again from fresh list
//         const newSel = fresh.find(voice =>
//           preferred.some(p => voice.name?.toLowerCase().includes(p))
//         ) || fresh.find(voice => voice.lang?.toLowerCase().startsWith(language));
//         if (newSel) selectedVoice = newSel;
//       }
//     }

//     // Build utterance
//     const utter = new SpeechSynthesisUtterance(text);

//     // Prefer selected voice if available
//     if (selectedVoice) {
//       utter.voice = selectedVoice;
//       // Some browsers expect utter.lang to match voice.lang
//       if (selectedVoice.lang) utter.lang = selectedVoice.lang;
//       else utter.lang = language;
//     } else {
//       // no voice found — still set lang to encourage correct phonetics
//       utter.lang = language;
//     }

//     // Per-platform rate tweaks
//     utter.rate = isIOS ? 0.85 : 0.9;
//     if (language === 'ja') utter.rate = 0.82;

//     utter.pitch = 1;

//     // Cancel any ongoing and speak
//     try {
//       speechSynthesis.cancel();
//       speechSynthesis.speak(utter);
//     } catch (e) {
//       console.warn('speechSynthesis error', e);
//     }
//   };

//   return (
//     <div style={{
//       display: 'flex',
//       flexDirection: 'column',
//       alignItems: 'center',
//       justifyContent: 'center',
//       minHeight: '100vh',
//       backgroundColor: '#faf7e8',
//       textAlign: 'center',
//       position: 'relative',
//       padding: '20px'
//     }}>
//       {/* Back arrow */}
//       <div
//         onClick={handleBack}
//         style={{
//           position: 'absolute',
//           top: '20px',
//           left: '20px',
//           cursor: 'pointer',
//           fontSize: '18px',
//           display: 'flex',
//           alignItems: 'center',
//           gap: '5px',
//           color: '#333',
//           fontWeight: '500'
//         }}
//       >
//         ← <span>Back to Stories</span>
//       </div>

//       {/* Toggle Text */}
//       <button
//         onClick={() => setShowText(prev => !prev)}
//         style={{
//           position: 'fixed',
//           top: '70px',
//           right: '20px',
//           padding: '4px 8px',
//           fontSize: '12px',
//           borderRadius: '4px',
//           border: 'none',
//           backgroundColor: 'rgba(255,255,255,0.7)',
//           color: '#333',
//           cursor: 'pointer',
//           boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
//           backdropFilter: 'blur(4px)',
//           zIndex: 1000
//         }}
//       >
//         {showText ? 'Hide' : 'Show'}
//       </button>

//       <img
//         src={imagePath}
//         alt={word}
//         onClick={playAudio} // user gesture — required for iOS sound
//         style={{
//           width: '100%',
//           maxWidth: '400px',
//           height: '300px',
//           objectFit: 'contain',
//           borderRadius: '12px',
//           boxShadow: '0 6px 16px rgba(0,0,0,0.25)',
//           transition: '0.3s ease',
//           marginBottom: '10px',
//           cursor: 'pointer',
//           userSelect: 'none'
//         }}
//       />


//       {showText && (
//         <h2
//           onClick={playAudio} // also allow clicking the word
//           style={{
//             fontSize: '22px',
//             fontWeight: '600',
//             marginBottom: '30px',
//             color: '#333',
//             cursor: 'pointer',
//             userSelect: 'none'
//           }}
//         >
//           {word}
//         </h2>
//       )}

//       {/* Navigation Buttons */}
//       <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginBottom: '20px' }}>
//         <button
//           onClick={handlePrev}
//           disabled={currentIndex === 0}
//           style={{
//             padding: '10px 20px',
//             fontSize: '16px',
//             borderRadius: '8px',
//             cursor: currentIndex === 0 ? 'not-allowed' : 'pointer',
//             backgroundColor: currentIndex === 0 ? '#ccc' : '#f3c200',
//             border: 'none'
//           }}
//         >
//           ← Previous
//         </button>
//         <button
//           onClick={handleNext}
//           disabled={currentIndex === vocab.length - 1}
//           style={{
//             padding: '10px 20px',
//             fontSize: '16px',
//             borderRadius: '8px',
//             cursor: currentIndex === vocab.length - 1 ? 'not-allowed' : 'pointer',
//             backgroundColor: currentIndex === vocab.length - 1 ? '#ccc' : '#f3c200',
//             border: 'none'
//           }}
//         >
//           Next →
//         </button>
//       </div>

//       {currentIndex === vocab.length - 1 && (
//         <button
//           onClick={handleQuiz}
//           style={{
//             marginTop: '10px',
//             padding: '10px 20px',
//             fontSize: '16px',
//             fontWeight: '600',
//             backgroundColor: '#f3c200',
//             border: 'none',
//             borderRadius: '8px',
//             cursor: 'pointer',
//             boxShadow: '0 4px 8px rgba(0,0,0,0.2)'
//           }}
//         >
//           Start Quiz →
//         </button>
//       )}
//     </div>
//   );
// }

//code 10
'use client';

import { useEffect, useState, useRef } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Papa from 'papaparse';

export default function VocabSlideClient() {
  const router = useRouter();
  const params = useSearchParams();
  const storyId = params.get('story');
  const lang = (params.get('lang') || 'EN').toUpperCase();

  const [vocab, setVocab] = useState([]);
  const [stories, setStories] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [showText, setShowText] = useState(true);
  const [voices, setVoices] = useState([]);

  const voicesLoadedRef = useRef(false);
  const voicesLoadPromiseRef = useRef(null);

  const langMap = { EN: 'en', PT: 'pt', ES: 'es', IT: 'it', FR: 'fr', DE: 'de', JA: 'ja', NL: 'nl' };

  const normalize = (str) =>
    str.replace(/[–—]/g, '-').replace(/[“”]/g, '"').trim();

  useEffect(() => {
    Promise.all([
      fetch('/actionCSV/VocabularyCSV.csv').then(res => res.text()),
      fetch('/actionCSV/TitlesCSV.csv').then(res => res.text())
    ]).then(([vocabText, titlesText]) => {
      const parsedVocab = Papa.parse(vocabText, {
        header: true,
        skipEmptyLines: true,
        transformHeader: h => h.trim().toLowerCase()
      }).data;

      const parsedStories = Papa.parse(titlesText, {
        header: true,
        skipEmptyLines: true,
        transformHeader: h => h.trim().toLowerCase()
      }).data;

      // case-insensitive matching for story IDs
      const storyVocab = parsedVocab.filter(
        v => v.story.toLowerCase() === storyId.toLowerCase() && v.file && v.en
      );

      setVocab(storyVocab);
      setStories(parsedStories);
      setLoaded(true);
    });
  }, [storyId]);

  // keep voices state updated (useful for UI / debugging)
  useEffect(() => {
    const loadVoicesOnce = () => {
      const v = speechSynthesis.getVoices();
      if (v.length > 0) {
        setVoices(v);
        voicesLoadedRef.current = true;
        if (voicesLoadPromiseRef.current) {
          voicesLoadPromiseRef.current.resolve(v);
          voicesLoadPromiseRef.current = null;
        }
      }
    };

    loadVoicesOnce();
    speechSynthesis.onvoiceschanged = loadVoicesOnce;

    // cleanup
    return () => {
      try { speechSynthesis.onvoiceschanged = null; } catch (e) {}
    };
  }, []);

  // helper: returns a promise that resolves when voices are available
  const waitForVoices = (timeout = 3000) => {
    if (voicesLoadedRef.current) return Promise.resolve(speechSynthesis.getVoices());

    if (voicesLoadPromiseRef.current) return voicesLoadPromiseRef.current.promise;

    let resolveFn, rejectFn;
    const promise = new Promise((resolve, reject) => {
      resolveFn = resolve;
      rejectFn = reject;
    });

    voicesLoadPromiseRef.current = {
      promise,
      resolve: (v) => resolveFn(v),
      reject: (err) => rejectFn(err),
    };

    // poll as extra fallback (some Android/Edge environments)
    const start = Date.now();
    const id = setInterval(() => {
      const v = speechSynthesis.getVoices();
      if (v.length > 0) {
        clearInterval(id);
        voicesLoadedRef.current = true;
        setVoices(v);
        if (voicesLoadPromiseRef.current) {
          voicesLoadPromiseRef.current.resolve(v);
          voicesLoadPromiseRef.current = null;
        }
      } else if (Date.now() - start > timeout) {
        clearInterval(id);
        // resolve anyway with whatever voices exist (maybe empty)
        const fallback = speechSynthesis.getVoices();
        voicesLoadedRef.current = fallback.length > 0;
        setVoices(fallback);
        if (voicesLoadPromiseRef.current) {
          voicesLoadPromiseRef.current.resolve(fallback);
          voicesLoadPromiseRef.current = null;
        }
      }
    }, 250);

    return promise;
  };

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  });

  if (!loaded || !vocab.length) {
    return <p style={{ textAlign: 'center', marginTop: '50px' }}>Loading...</p>;
  }

  const folderEntry = stories.find(s => s.story.toLowerCase() === storyId.toLowerCase());
  
  // uppercase folder name to match VocabPics folder names
  const folderName = `${storyId}. ${folderEntry?.en?.trim().toUpperCase() || 'STORY'}`;
  const encodedFolderName = encodeURIComponent(folderName);

  const currentVocab = vocab[currentIndex];
  const fileIndex = currentVocab.file;

  // uppercase file name to match VocabPics
  const safeEnTitle = normalize(currentVocab.en).replace(/\.+$/, '').toUpperCase();
  const fileName = `${fileIndex}. ${safeEnTitle}.jpg`;
  const encodedFileName = encodeURIComponent(fileName);

  const imagePath = `/ActionStoriesPics/VocabPics/${encodedFolderName}/${encodedFileName}`;

  const titleColumn = langMap[lang] || 'en';
  const word = currentVocab[titleColumn] || currentVocab.en;

  const handleNext = () => {
    if (currentIndex < vocab.length - 1) setCurrentIndex(prev => prev + 1);
  };

  const handlePrev = () => {
    if (currentIndex > 0) setCurrentIndex(prev => prev - 1);
  };

  const handleBack = () => {
    router.push(`/blogs/blog5/StorySelector`);
  };

  const handleQuiz = () => {
    router.push(`/blogs/blog5/VocabQuiz?story=${storyId}&lang=${lang}`);
  };

  // -------------------------
  // UNIVERSAL AUDIO → TTS FALLBACK (improved)
  // -------------------------
  const playAudio = async () => {
    const langCode = langMap[lang] || "en";
    const fileNameAudio = `${safeEnTitle}.m4a`;
    const audioPath = `/actionSounds/${langCode}/${encodeURIComponent(fileNameAudio)}`;

    const audio = new Audio(audioPath);

    try {
      await new Promise((resolve, reject) => {
        audio.oncanplaythrough = resolve;
        audio.onerror = reject;
        // attempt to load
        audio.load();
      });

      // If loaded properly → play it (user gesture required)
      await audio.play().catch(() => {
        // if playback blocked, fallback to TTS
        playTTS();
      });
      return;
    } catch (e) {
      // File missing OR failed to load → fallback to TTS
      playTTS();
    }
  };

  // -------------------------
  // Robust TTS: wait for voices, pick best voice per language+browser, retry logic
  // -------------------------
  const playTTS = async () => {
    const language = langMap[lang] || "en";
    // const text = word;
    let text = word.trim();

    // Chrome fix: prevent spelling for short words
    if (text.length <= 3) {
      text = text + '\u00A0'; // non-breaking space
    }


    // Make sure this is called from a user gesture (onClick). iOS/Safari will mute otherwise.
    // Wait for voices to populate (Android/Edge need this)
    // try {
    //   await waitForVoices(3500);
    // } catch (e) {
    //   // continue even if voices didn't arrive
    //   console.warn('voices load wait failed', e);
    // }

    const ua = navigator.userAgent.toLowerCase();
    const isIOS = /iphone|ipad|ipod/.test(ua);
    const isEdge = ua.includes("edg");
    const isChrome = ua.includes("chrome") && !ua.includes("edg");
    const isSafari = ua.includes("safari") && !ua.includes("chrome");
    const isAndroid = ua.includes("android");

    const allVoices = speechSynthesis.getVoices() || voices || [];

    // MASTER list of candidate names (broad matching)
    const voiceCandidates = {
      en: ["google us english", "google uk english", "microsoft aria", "microsoft jenny", "samantha", "daniel"],
      pt: ["português do brasil", "luciana", "microsoft francisca"],
      es: ["google español", "monica", "microsoft helena", "microsoft laura"],
      fr: ["google français", "amélie", "microsoft sylvie", "microsoft remy"],
      de: ["google deutsch", "microsoft katja", "anna"],
      it: ["google italiano", "microsoft isabella", "alice"],
      ja: ["google 日本語", "kyoko", "microsoft nanami"],
      nl: ["google nederlands", "microsoft renee", "microsoft bert"]
    };

    const preferred = voiceCandidates[language] || [];

    // try multiple strategies to choose the best available voice
    const chooseVoice = () => {
      // 1) name contains one of preferred phrases (case-insensitive)
      let v = allVoices.find(voice =>
        preferred.some(p => voice.name?.toLowerCase().includes(p))
      );
      if (v) return v;

      // 2) exact lang match (voice.lang startsWith language code)
      v = allVoices.find(voice =>
        voice.lang && voice.lang.toLowerCase().startsWith(language)
      );
      if (v) return v;

      // 3) for Edge try voices whose name contains 'microsoft' + language-specific hint
      if (isEdge) {
        v = allVoices.find(voice => voice.name?.toLowerCase().includes('microsoft') && voice.lang?.toLowerCase().startsWith(language));
        if (v) return v;
      }

      // 4) chrome-specific fuzzy: prefer Google voices if Chrome
      if (isChrome) {
        v = allVoices.find(voice => voice.name?.toLowerCase().includes('google') && voice.lang?.toLowerCase().startsWith(language));
        if (v) return v;
      }

      // 5) fallback: first voice that has any language set
      if (allVoices.length > 0) return allVoices[0];

      // 6) no voices available -> null
      return null;
    };

    let selectedVoice = chooseVoice();

    // On Android sometimes the first selection is still not language-correct.
    // Retry once after a short pause if language doesn't match.
    if (isAndroid && selectedVoice && !(selectedVoice.lang || '').toLowerCase().startsWith(language)) {
      // try to wait briefly and re-read voices
      await new Promise(r => setTimeout(r, 300));
      const fresh = speechSynthesis.getVoices();
      if (fresh.length > allVoices.length) {
        // try picking again from fresh list
        const newSel = fresh.find(voice =>
          preferred.some(p => voice.name?.toLowerCase().includes(p))
        ) || fresh.find(voice => voice.lang?.toLowerCase().startsWith(language));
        if (newSel) selectedVoice = newSel;
      }
    }

    // Build utterance
    const utter = new SpeechSynthesisUtterance(text);

    // Prefer selected voice if available
    if (selectedVoice) {
      utter.voice = selectedVoice;
      // Some browsers expect utter.lang to match voice.lang
      if (selectedVoice.lang) utter.lang = selectedVoice.lang;
      else utter.lang = language;
    } else {
      // no voice found — still set lang to encourage correct phonetics
      utter.lang = language;
    }

    // Per-platform rate tweaks
    utter.rate = isIOS ? 0.85 : 0.9;
    if (language === 'ja') utter.rate = 0.82;

    utter.pitch = 1;

    // Cancel any ongoing and speak
    try {
      // speechSynthesis.cancel();
      // speechSynthesis.speak(utter);
      speechSynthesis.resume();

      if (speechSynthesis.speaking) {
        speechSynthesis.cancel();
      }

      speechSynthesis.speak(utter);


    } catch (e) {
      console.warn('speechSynthesis error', e);
    }
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      backgroundColor: '#faf7e8',
      textAlign: 'center',
      position: 'relative',
      padding: '20px'
    }}>
      {/* Back arrow */}
      <div
        onClick={handleBack}
        style={{
          position: 'absolute',
          top: '20px',
          left: '20px',
          cursor: 'pointer',
          fontSize: '18px',
          display: 'flex',
          alignItems: 'center',
          gap: '5px',
          color: '#333',
          fontWeight: '500'
        }}
      >
        ← <span>Back to Stories</span>
      </div>

      {/* Toggle Text */}
      <button
        onClick={() => setShowText(prev => !prev)}
        style={{
          position: 'fixed',
          top: '70px',
          right: '20px',
          padding: '4px 8px',
          fontSize: '12px',
          borderRadius: '4px',
          border: 'none',
          backgroundColor: 'rgba(255,255,255,0.7)',
          color: '#333',
          cursor: 'pointer',
          boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
          backdropFilter: 'blur(4px)',
          zIndex: 1000
        }}
      >
        {showText ? 'Hide' : 'Show'}
      </button>

      <img
        src={imagePath}
        alt={word}
        onClick={playAudio} // user gesture — required for iOS sound
        style={{
          width: '100%',
          maxWidth: '400px',
          height: '300px',
          objectFit: 'contain',
          borderRadius: '12px',
          boxShadow: '0 6px 16px rgba(0,0,0,0.25)',
          transition: '0.3s ease',
          marginBottom: '10px',
          cursor: 'pointer',
          userSelect: 'none'
        }}
      />


      {showText && (
        <h2
          onClick={playAudio} // also allow clicking the word
          style={{
            fontSize: '22px',
            fontWeight: '600',
            marginBottom: '30px',
            color: '#333',
            cursor: 'pointer',
            userSelect: 'none'
          }}
        >
          {word}
        </h2>
      )}

      {/* Navigation Buttons */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginBottom: '20px' }}>
        <button
          onClick={handlePrev}
          disabled={currentIndex === 0}
          style={{
            padding: '10px 20px',
            fontSize: '16px',
            borderRadius: '8px',
            cursor: currentIndex === 0 ? 'not-allowed' : 'pointer',
            backgroundColor: currentIndex === 0 ? '#ccc' : '#f3c200',
            border: 'none'
          }}
        >
          ← Previous
        </button>
        <button
          onClick={handleNext}
          disabled={currentIndex === vocab.length - 1}
          style={{
            padding: '10px 20px',
            fontSize: '16px',
            borderRadius: '8px',
            cursor: currentIndex === vocab.length - 1 ? 'not-allowed' : 'pointer',
            backgroundColor: currentIndex === vocab.length - 1 ? '#ccc' : '#f3c200',
            border: 'none'
          }}
        >
          Next →
        </button>
      </div>

      {currentIndex === vocab.length - 1 && (
        <button
          onClick={handleQuiz}
          style={{
            marginTop: '10px',
            padding: '10px 20px',
            fontSize: '16px',
            fontWeight: '600',
            backgroundColor: '#f3c200',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            boxShadow: '0 4px 8px rgba(0,0,0,0.2)'
          }}
        >
          Start Quiz →
        </button>
      )}
    </div>
  );
}

