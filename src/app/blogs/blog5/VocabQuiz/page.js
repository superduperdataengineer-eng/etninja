//code 1 works but few adjustments need to be made
// 'use client';

// import { useEffect, useState, useRef } from 'react';
// import { useSearchParams, useRouter } from 'next/navigation';
// import Papa from 'papaparse';

// export default function VocabQuiz() {
//   const router = useRouter();
//   const params = useSearchParams();
//   const storyId = params.get('story');
//   const lang = (params.get('lang') || 'EN').toUpperCase();

//   const [vocab, setVocab] = useState([]);
//   const [stories, setStories] = useState([]);
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [loaded, setLoaded] = useState(false);
//   const [wordOptions, setWordOptions] = useState([]);
//   const [flashColor, setFlashColor] = useState(null);

//   const langMap = { EN: 'en', PT: 'pt', ES: 'es', IT: 'it', FR: 'fr', DE: 'de', JA: 'ja' };
//   const flashTimeoutRef = useRef(null);

//   // Normalize text
//   const normalize = (str) => str.replace(/[–—]/g, '-').replace(/[“”]/g, '"').trim();

//   // Load CSVs
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

//   // Generate word options whenever currentIndex changes
//   useEffect(() => {
//     if (!loaded || !vocab.length) return;

//     const currentWord = vocab[currentIndex];
//     const otherWords = vocab.filter((_, i) => i !== currentIndex).map(v => v[langMap[lang]] || v.en);

//     const shuffledOthers = shuffleArray(otherWords).slice(0, 8); // 8 random words
//     const correctWord = currentWord[langMap[lang]] || currentWord.en;

//     const options = shuffleArray([...shuffledOthers, correctWord]);
//     setWordOptions(options);
//   }, [currentIndex, loaded, vocab, lang]);

//   // Flash keyboard support
//   useEffect(() => {
//     const handleKey = (e) => {
//       if (e.key === 'ArrowLeft') handlePrev();
//       if (e.key === 'ArrowRight') handleNext();
//     };
//     window.addEventListener('keydown', handleKey);
//     return () => window.removeEventListener('keydown', handleKey);
//   });

//   // Helper to shuffle array
//   const shuffleArray = (arr) => [...arr].sort(() => Math.random() - 0.5);

//   // Navigation handlers
//   const handlePrev = () => {
//     if (currentIndex > 0) setCurrentIndex(prev => prev - 1);
//   };
//   const handleNext = () => {
//     if (currentIndex < vocab.length - 1) setCurrentIndex(prev => prev + 1);
//   };
//   const handleBack = () => {
//     router.push(`/blogs/blog5/StorySelector`);
//   };
//   const handleQuizEnd = () => {
//     router.push(`/blogs/blog5/StorySelector`);
//   };

//   // Handle word click
//   const handleWordClick = (word) => {
//     const currentWord = vocab[currentIndex][langMap[lang]] || vocab[currentIndex].en;
//     if (word === currentWord) {
//       playSound('/sounds/bling.mp3');
//       flashScreen('green');
//       setTimeout(() => {
//         if (currentIndex < vocab.length - 1) setCurrentIndex(prev => prev + 1);
//         else handleQuizEnd();
//       }, 300);
//     } else {
//       playSound('/sounds/error.mp3');
//       flashScreen('red');
//       // reshuffle options
//       const otherWords = vocab.filter((_, i) => i !== currentIndex).map(v => v[langMap[lang]] || v.en);
//       const shuffledOthers = shuffleArray(otherWords).slice(0, 8);
//       const correctWord = currentWord;
//       setWordOptions(shuffleArray([...shuffledOthers, correctWord]));
//     }
//   };

//   const playSound = (src) => {
//     const audio = new Audio(src);
//     audio.play();
//   };

//   const flashScreen = (color) => {
//     setFlashColor(color);
//     if (flashTimeoutRef.current) clearTimeout(flashTimeoutRef.current);
//     flashTimeoutRef.current = setTimeout(() => setFlashColor(null), 300);
//   };

//   if (!loaded || !vocab.length) {
//     return <p style={{ textAlign: 'center', marginTop: '50px' }}>Loading...</p>;
//   }

//   // Current image
//   const currentVocab = vocab[currentIndex];
//   const folderEntry = stories.find(s => s.story == storyId);
//   const folderName = `${storyId}. ${folderEntry?.en?.trim() || 'Story'}`;
//   const encodedFolderName = encodeURIComponent(folderName);
//   const fileIndex = currentVocab.file;
//   const safeEnTitle = normalize(currentVocab.en).replace(/\.+$/, '');
//   const fileName = `${fileIndex}. ${safeEnTitle}.jpg`;
//   const encodedFileName = encodeURIComponent(fileName);
//   const imagePath = `/ActionStoriesPics/VocabPics/${encodedFolderName}/${encodedFileName}`;

//   return (
//     <div style={{ position: 'relative', minHeight: '100vh', backgroundColor: '#faf7e8', padding: '20px' }}>
//       {/* Flash overlay */}
//       {flashColor && (
//         <div style={{
//           position: 'absolute',
//           inset: 0,
//           backgroundColor: flashColor,
//           opacity: 0.3,
//           zIndex: 9999,
//           transition: 'opacity 0.3s'
//         }} />
//       )}

//       {/* Back link */}
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

//       <div style={{ display: 'flex', gap: '40px', alignItems: 'flex-start', flexWrap: 'wrap', justifyContent: 'center' }}>
//         {/* Image */}
//         <img
//           src={imagePath}
//           alt={currentVocab[langMap[lang]] || currentVocab.en}
//           style={{
//             width: '400px',
//             height: '300px',
//             objectFit: 'contain',
//             borderRadius: '12px',
//             boxShadow: '0 6px 16px rgba(0,0,0,0.25)'
//           }}
//         />

//         {/* Word panel */}
//         <div style={{
//           display: 'grid',
//           gridTemplateColumns: 'repeat(3, 1fr)',
//           gridGap: '12px',
//           maxWidth: '300px'
//         }}>
//           {wordOptions.map((word, i) => (
//             <div
//               key={i}
//               onClick={() => handleWordClick(word)}
//               style={{
//                 padding: '10px',
//                 backgroundColor: '#fff',
//                 borderRadius: '8px',
//                 boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
//                 textAlign: 'center',
//                 cursor: 'pointer',
//                 fontWeight: '500',
//                 userSelect: 'none'
//               }}
//             >
//               {word}
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }


//code 2 works but some quirk with panel and image sizes as well as no refresh button
// 'use client';

// import { useEffect, useState, useRef } from 'react';
// import { useSearchParams, useRouter } from 'next/navigation';
// import Papa from 'papaparse';

// export default function VocabQuiz() {
//   const router = useRouter();
//   const params = useSearchParams();
//   const storyId = params.get('story');
//   const lang = (params.get('lang') || 'EN').toUpperCase();

//   const [vocab, setVocab] = useState([]);
//   const [stories, setStories] = useState([]);
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [loaded, setLoaded] = useState(false);
//   const [wordOptions, setWordOptions] = useState([]);
//   const [highlightIndex, setHighlightIndex] = useState(null); // which word is highlighted
//   const [highlightColor, setHighlightColor] = useState(null); // green or red
//   const [quizFinished, setQuizFinished] = useState(false);

//   const langMap = { EN: 'en', PT: 'pt', ES: 'es', IT: 'it', FR: 'fr', DE: 'de', JA: 'ja' };
//   const flashTimeoutRef = useRef(null);

//   const normalize = (str) => str.replace(/[–—]/g, '-').replace(/[“”]/g, '"').trim();

//   // Load CSVs
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

//   // Generate word options
//   useEffect(() => {
//     if (!loaded || !vocab.length) return;

//     const currentWord = vocab[currentIndex];
//     const otherWords = vocab.filter((_, i) => i !== currentIndex).map(v => v[langMap[lang]] || v.en);

//     const shuffledOthers = shuffleArray(otherWords).slice(0, 8);
//     const correctWord = currentWord[langMap[lang]] || currentWord.en;

//     const options = shuffleArray([...shuffledOthers, correctWord]);
//     setWordOptions(options);
//     setHighlightIndex(null);
//     setHighlightColor(null);
//   }, [currentIndex, loaded, vocab, lang]);

//   // Helper to shuffle
//   const shuffleArray = (arr) => [...arr].sort(() => Math.random() - 0.5);

//   // Navigation handlers
//   const handleBack = () => router.push(`/blogs/blog5/StorySelector`);
//   const goToFullStory = () => router.push(`/blogs/blog5/FullStory?story=${storyId}&lang=${lang}`);

//   // Handle word click
//   const handleWordClick = (word, index) => {
//     if (quizFinished) return;

//     const currentWord = vocab[currentIndex][langMap[lang]] || vocab[currentIndex].en;
//     if (word === currentWord) {
//       setHighlightIndex(index);
//       setHighlightColor('green');
//       playSound('/sounds/bling.mp3');

//       setTimeout(() => {
//         if (currentIndex < vocab.length - 1) {
//           setCurrentIndex(prev => prev + 1);
//         } else {
//           setQuizFinished(true);
//         }
//       }, 300);
//     } else {
//       setHighlightIndex(index);
//       setHighlightColor('red');
//       playSound('/sounds/error.mp3');

//       // reshuffle options
//       const otherWords = vocab.filter((_, i) => i !== currentIndex).map(v => v[langMap[lang]] || v.en);
//       const shuffledOthers = shuffleArray(otherWords).slice(0, 8);
//       const correctWord = currentWord;
//       setTimeout(() => {
//         setWordOptions(shuffleArray([...shuffledOthers, correctWord]));
//         setHighlightIndex(null);
//         setHighlightColor(null);
//       }, 300);
//     }
//   };

//   const playSound = (src) => {
//     const audio = new Audio(src);
//     audio.play();
//   };

//   if (!loaded || !vocab.length) return <p style={{ textAlign: 'center', marginTop: '50px' }}>Loading...</p>;

//   // Current image
//   const currentVocab = vocab[currentIndex];
//   const folderEntry = stories.find(s => s.story == storyId);
//   const folderName = `${storyId}. ${folderEntry?.en?.trim() || 'Story'}`;
//   const encodedFolderName = encodeURIComponent(folderName);
//   const fileIndex = currentVocab.file;
//   const safeEnTitle = normalize(currentVocab.en).replace(/\.+$/, '');
//   const fileName = `${fileIndex}. ${safeEnTitle}.jpg`;
//   const encodedFileName = encodeURIComponent(fileName);
//   const imagePath = `/ActionStoriesPics/VocabPics/${encodedFolderName}/${encodedFileName}`;

//   return (
//     <div style={{ minHeight: '100vh', backgroundColor: '#faf7e8', padding: '20px', textAlign: 'center' }}>
//       {/* Back link */}
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

//       <div style={{ display: 'flex', justifyContent: 'center', gap: '40px', flexWrap: 'wrap', alignItems: 'center' }}>
//         {/* Image */}
//         <img
//           src={imagePath}
//           alt={currentVocab[langMap[lang]] || currentVocab.en}
//           style={{
//             width: '400px',
//             height: '300px',
//             objectFit: 'contain',
//             borderRadius: '12px',
//             boxShadow: '0 6px 16px rgba(0,0,0,0.25)'
//           }}
//         />

//         {/* Word panel */}
//         <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gridGap: '12px', maxWidth: '300px', alignSelf: 'center' }}>
//           {wordOptions.map((word, i) => (
//             <div
//               key={i}
//               onClick={() => handleWordClick(word, i)}
//               style={{
//                 padding: '10px',
//                 backgroundColor: highlightIndex === i ? highlightColor : '#fff',
//                 borderRadius: '8px',
//                 boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
//                 textAlign: 'center',
//                 cursor: quizFinished ? 'not-allowed' : 'pointer',
//                 fontWeight: '500',
//                 userSelect: 'none',
//                 transition: 'background-color 0.2s ease'
//               }}
//             >
//               {word}
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Go to Full Story button */}
//       {quizFinished && (
//         <button
//           onClick={goToFullStory}
//           style={{
//             marginTop: '30px',
//             padding: '12px 24px',
//             fontSize: '16px',
//             fontWeight: '600',
//             backgroundColor: '#f3c200',
//             border: 'none',
//             borderRadius: '8px',
//             cursor: 'pointer',
//             boxShadow: '0 4px 8px rgba(0,0,0,0.2)'
//           }}
//         >
//           Go to Full Story →
//         </button>
//       )}
//     </div>
//   );
// }


//code 3  great however the ... dots are no good
// 'use client';

// import { useEffect, useState, useRef } from 'react';
// import { useSearchParams, useRouter } from 'next/navigation';
// import Papa from 'papaparse';
// import { FiRefreshCw } from 'react-icons/fi'; // recycle/refresh icon

// export default function VocabQuiz() {
//   const router = useRouter();
//   const params = useSearchParams();
//   const storyId = params.get('story');
//   const lang = (params.get('lang') || 'EN').toUpperCase();

//   const [vocab, setVocab] = useState([]);
//   const [stories, setStories] = useState([]);
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [loaded, setLoaded] = useState(false);
//   const [wordOptions, setWordOptions] = useState([]);
//   const [highlightIndex, setHighlightIndex] = useState(null);
//   const [highlightColor, setHighlightColor] = useState(null);
//   const [quizFinished, setQuizFinished] = useState(false);

//   const langMap = { EN: 'en', PT: 'pt', ES: 'es', IT: 'it', FR: 'fr', DE: 'de', JA: 'ja' };
//   const flashTimeoutRef = useRef(null);

//   const normalize = (str) => str.replace(/[–—]/g, '-').replace(/[“”]/g, '"').trim();

//   // Load CSVs
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

//   // Generate word options
//   useEffect(() => {
//     if (!loaded || !vocab.length) return;

//     const currentWord = vocab[currentIndex];
//     const otherWords = vocab.filter((_, i) => i !== currentIndex).map(v => v[langMap[lang]] || v.en);

//     const shuffledOthers = shuffleArray(otherWords).slice(0, 8);
//     const correctWord = currentWord[langMap[lang]] || currentWord.en;

//     const options = shuffleArray([...shuffledOthers, correctWord]);
//     setWordOptions(options);
//     setHighlightIndex(null);
//     setHighlightColor(null);
//   }, [currentIndex, loaded, vocab, lang]);

//   const shuffleArray = (arr) => [...arr].sort(() => Math.random() - 0.5);

//   // Navigation handlers
//   const handleBack = () => router.push(`/blogs/blog5/StorySelector`);
//   const goToFullStory = () => router.push(`/blogs/blog5/FullStory?story=${storyId}&lang=${lang}`);

//   // Reset quiz
//   const handleReset = () => {
//     setCurrentIndex(0);
//     setQuizFinished(false);
//   };

//   // Handle word click
//   const handleWordClick = (word, index) => {
//     if (quizFinished) return;

//     const currentWord = vocab[currentIndex][langMap[lang]] || vocab[currentIndex].en;
//     if (word === currentWord) {
//       setHighlightIndex(index);
//       setHighlightColor('green');
//       playSound('/sounds/bling.mp3');

//       setTimeout(() => {
//         if (currentIndex < vocab.length - 1) {
//           setCurrentIndex(prev => prev + 1);
//         } else {
//           setQuizFinished(true);
//         }
//       }, 300);
//     } else {
//       setHighlightIndex(index);
//       setHighlightColor('red');
//       playSound('/sounds/error.mp3');

//       const otherWords = vocab.filter((_, i) => i !== currentIndex).map(v => v[langMap[lang]] || v.en);
//       const shuffledOthers = shuffleArray(otherWords).slice(0, 8);
//       const correctWord = currentWord;
//       setTimeout(() => {
//         setWordOptions(shuffleArray([...shuffledOthers, correctWord]));
//         setHighlightIndex(null);
//         setHighlightColor(null);
//       }, 300);
//     }
//   };

//   const playSound = (src) => {
//     const audio = new Audio(src);
//     audio.play();
//   };

//   if (!loaded || !vocab.length) return <p style={{ textAlign: 'center', marginTop: '50px' }}>Loading...</p>;

//   // Current image
//   const currentVocab = vocab[currentIndex];
//   const folderEntry = stories.find(s => s.story == storyId);
//   const folderName = `${storyId}. ${folderEntry?.en?.trim() || 'Story'}`;
//   const encodedFolderName = encodeURIComponent(folderName);
//   const fileIndex = currentVocab.file;
//   const safeEnTitle = normalize(currentVocab.en).replace(/\.+$/, '');
//   const fileName = `${fileIndex}. ${safeEnTitle}.jpg`;
//   const encodedFileName = encodeURIComponent(fileName);
//   const imagePath = `/ActionStoriesPics/VocabPics/${encodedFolderName}/${encodedFileName}`;

//   return (
//     <div style={{ minHeight: '100vh', backgroundColor: '#faf7e8', padding: '20px', textAlign: 'center' }}>
//       {/* Back link */}
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

//       <div style={{ display: 'flex', justifyContent: 'center', gap: '40px', flexWrap: 'wrap', alignItems: 'center' }}>
//         {/* Fixed-size image */}
//         <img
//           src={imagePath}
//           alt={currentVocab[langMap[lang]] || currentVocab.en}
//           style={{
//             width: '400px',
//             height: '300px',
//             minWidth: '400px',
//             minHeight: '300px',
//             objectFit: 'contain',
//             borderRadius: '12px',
//             boxShadow: '0 6px 16px rgba(0,0,0,0.25)'
//           }}
//         />

//         {/* Fixed-size word panel */}
//         <div style={{
//           display: 'grid',
//           gridTemplateColumns: 'repeat(3, 100px)',
//           gridTemplateRows: 'repeat(3, 50px)',
//           gap: '12px',
//           maxWidth: '320px',
//           minWidth: '320px',
//           minHeight: '170px',
//           alignSelf: 'center'
//         }}>
//           {wordOptions.map((word, i) => (
//             <div
//               key={i}
//               onClick={() => handleWordClick(word, i)}
//               style={{
//                 padding: '5px',
//                 fontSize: '14px',
//                 overflow: 'hidden',
//                 textOverflow: 'ellipsis',
//                 whiteSpace: 'nowrap',
//                 backgroundColor: highlightIndex === i ? highlightColor : '#fff',
//                 borderRadius: '8px',
//                 boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
//                 textAlign: 'center',
//                 cursor: quizFinished ? 'not-allowed' : 'pointer',
//                 fontWeight: '500',
//                 userSelect: 'none',
//                 transition: 'background-color 0.2s ease'
//               }}
//               title={word} // show full word on hover
//             >
//               {word}
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Refresh icon */}
//       <div style={{ marginTop: '20px', cursor: 'pointer' }} onClick={handleReset}>
//         <FiRefreshCw size={32} color="#f3c200" title="Restart Quiz" />
//       </div>

//       {/* Go to Full Story button */}
//       {quizFinished && (
//         <button
//           onClick={goToFullStory}
//           style={{
//             marginTop: '30px',
//             padding: '12px 24px',
//             fontSize: '16px',
//             fontWeight: '600',
//             backgroundColor: '#f3c200',
//             border: 'none',
//             borderRadius: '8px',
//             cursor: 'pointer',
//             boxShadow: '0 4px 8px rgba(0,0,0,0.2)'
//           }}
//         >
//           Go to Full Story →
//         </button>
//       )}
//     </div>
//   );
// }

//code 3 better still cutting off words
// 'use client';

// import { useEffect, useState, useRef } from 'react';
// import { useSearchParams, useRouter } from 'next/navigation';
// import Papa from 'papaparse';
// import { FiRefreshCw } from 'react-icons/fi';

// export default function VocabQuiz() {
//   const router = useRouter();
//   const params = useSearchParams();
//   const storyId = params.get('story');
//   const lang = (params.get('lang') || 'EN').toUpperCase();

//   const [vocab, setVocab] = useState([]);
//   const [stories, setStories] = useState([]);
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [loaded, setLoaded] = useState(false);
//   const [wordOptions, setWordOptions] = useState([]);
//   const [highlightIndex, setHighlightIndex] = useState(null);
//   const [highlightColor, setHighlightColor] = useState(null);
//   const [quizFinished, setQuizFinished] = useState(false);

//   const langMap = { EN: 'en', PT: 'pt', ES: 'es', IT: 'it', FR: 'fr', DE: 'de', JA: 'ja' };

//   const normalize = (str) => str.replace(/[–—]/g, '-').replace(/[“”]/g, '"').trim();

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
//     if (!loaded || !vocab.length) return;

//     const currentWord = vocab[currentIndex];
//     const otherWords = vocab.filter((_, i) => i !== currentIndex).map(v => v[langMap[lang]] || v.en);
//     const shuffledOthers = shuffleArray(otherWords).slice(0, 8);
//     const correctWord = currentWord[langMap[lang]] || currentWord.en;
//     const options = shuffleArray([...shuffledOthers, correctWord]);
//     setWordOptions(options);
//     setHighlightIndex(null);
//     setHighlightColor(null);
//   }, [currentIndex, loaded, vocab, lang]);

//   const shuffleArray = (arr) => [...arr].sort(() => Math.random() - 0.5);
//   const handleBack = () => router.push(`/blogs/blog5/StorySelector`);
//   const goToFullStory = () => router.push(`/blogs/blog5/FullStory?story=${storyId}&lang=${lang}`);
//   const resetQuiz = () => {
//     setCurrentIndex(0);
//     setQuizFinished(false);
//   };

//   const handleWordClick = (word, index) => {
//     if (quizFinished) return;
//     const currentWord = vocab[currentIndex][langMap[lang]] || vocab[currentIndex].en;
//     if (word === currentWord) {
//       setHighlightIndex(index);
//       setHighlightColor('green');
//       playSound('/sounds/bling.mp3');
//       setTimeout(() => {
//         if (currentIndex < vocab.length - 1) setCurrentIndex(prev => prev + 1);
//         else setQuizFinished(true);
//       }, 300);
//     } else {
//       setHighlightIndex(index);
//       setHighlightColor('red');
//       playSound('/sounds/error.mp3');
//       const otherWords = vocab.filter((_, i) => i !== currentIndex).map(v => v[langMap[lang]] || v.en);
//       const shuffledOthers = shuffleArray(otherWords).slice(0, 8);
//       const correctWord = currentWord;
//       setTimeout(() => {
//         setWordOptions(shuffleArray([...shuffledOthers, correctWord]));
//         setHighlightIndex(null);
//         setHighlightColor(null);
//       }, 300);
//     }
//   };

//   const playSound = (src) => {
//     const audio = new Audio(src);
//     audio.play();
//   };

//   if (!loaded || !vocab.length) return <p style={{ textAlign: 'center', marginTop: '50px' }}>Loading...</p>;

//   const currentVocab = vocab[currentIndex];
//   const folderEntry = stories.find(s => s.story == storyId);
//   const folderName = `${storyId}. ${folderEntry?.en?.trim() || 'Story'}`;
//   const encodedFolderName = encodeURIComponent(folderName);
//   const fileIndex = currentVocab.file;
//   const safeEnTitle = normalize(currentVocab.en).replace(/\.+$/, '');
//   const fileName = `${fileIndex}. ${safeEnTitle}.jpg`;
//   const encodedFileName = encodeURIComponent(fileName);
//   const imagePath = `/ActionStoriesPics/VocabPics/${encodedFolderName}/${encodedFileName}`;

//   return (
//     <div style={{ minHeight: '100vh', backgroundColor: '#faf7e8', padding: '20px', textAlign: 'center' }}>
//       <div
//         onClick={handleBack}
//         style={{ cursor: 'pointer', fontSize: '16px', display: 'flex', alignItems: 'center', gap: '5px', color: '#333', fontWeight: '500', marginBottom: '20px' }}
//       >
//         ← Back to Story Selection
//       </div>

//       <div style={{ display: 'flex', justifyContent: 'center', gap: '40px', flexWrap: 'wrap', alignItems: 'center' }}>
//         {/* Image */}
//         <img
//           src={imagePath}
//           alt={currentVocab[langMap[lang]] || currentVocab.en}
//           style={{ width: '400px', height: '300px', objectFit: 'contain', borderRadius: '12px', boxShadow: '0 6px 16px rgba(0,0,0,0.25)' }}
//         />

//         {/* Word panel */}
//         <div
//           style={{
//             display: 'grid',
//             gridTemplateColumns: 'repeat(3, 1fr)',
//             gridGap: '12px',
//             maxWidth: '320px',
//             height: '300px',
//             alignSelf: 'center',
//             justifyItems: 'center',
//             alignItems: 'center',
//           }}
//         >
//           {wordOptions.map((word, i) => (
//             <div
//               key={i}
//               onClick={() => handleWordClick(word, i)}
//               style={{
//                 width: '100px',
//                 height: '90px',
//                 padding: '5px',
//                 backgroundColor: highlightIndex === i ? highlightColor : '#fff',
//                 borderRadius: '8px',
//                 boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
//                 textAlign: 'center',
//                 cursor: quizFinished ? 'not-allowed' : 'pointer',
//                 fontWeight: '500',
//                 userSelect: 'none',
//                 transition: 'background-color 0.2s ease',
//                 display: 'flex',
//                 alignItems: 'center',
//                 justifyContent: 'center',
//                 whiteSpace: 'normal', // allow wrapping
//                 wordBreak: 'break-word',
//                 overflowWrap: 'break-word',
//               }}
//             >
//               {word}
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Refresh icon */}
//       <div
//         onClick={resetQuiz}
//         style={{ cursor: 'pointer', fontSize: '28px', marginTop: '20px', color: '#f3c200', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}
//         title="Restart Quiz"
//       >
//         <FiRefreshCw />
//       </div>

//       {/* Full Story Button */}
//       {quizFinished && (
//         <button
//           onClick={goToFullStory}
//           style={{ marginTop: '30px', padding: '12px 24px', fontSize: '16px', fontWeight: '600', backgroundColor: '#f3c200', border: 'none', borderRadius: '8px', cursor: 'pointer', boxShadow: '0 4px 8px rgba(0,0,0,0.2)' }}
//         >
//           Go to Full Story →
//         </button>
//       )}
//     </div>
//   );
// }

//code 4 MUCH BETTER BUT NOT QUITE
// 'use client';

// import { useEffect, useState, useRef } from 'react';
// import { useSearchParams, useRouter } from 'next/navigation';
// import Papa from 'papaparse';
// import { FiRefreshCw } from 'react-icons/fi';

// export default function VocabQuiz() {
//   const router = useRouter();
//   const params = useSearchParams();
//   const storyId = params.get('story');
//   const lang = (params.get('lang') || 'EN').toUpperCase();

//   const [vocab, setVocab] = useState([]);
//   const [stories, setStories] = useState([]);
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [loaded, setLoaded] = useState(false);
//   const [wordOptions, setWordOptions] = useState([]);
//   const [highlightIndex, setHighlightIndex] = useState(null);
//   const [highlightColor, setHighlightColor] = useState(null);
//   const [quizFinished, setQuizFinished] = useState(false);

//   const langMap = { EN: 'en', PT: 'pt', ES: 'es', IT: 'it', FR: 'fr', DE: 'de', JA: 'ja' };

//   const normalize = (str) => str.replace(/[–—]/g, '-').replace(/[“”]/g, '"').trim();

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
//     if (!loaded || !vocab.length) return;

//     const currentWord = vocab[currentIndex];
//     const otherWords = vocab.filter((_, i) => i !== currentIndex).map(v => v[langMap[lang]] || v.en);
//     const shuffledOthers = shuffleArray(otherWords).slice(0, 8);
//     const correctWord = currentWord[langMap[lang]] || currentWord.en;
//     const options = shuffleArray([...shuffledOthers, correctWord]);
//     setWordOptions(options);
//     setHighlightIndex(null);
//     setHighlightColor(null);
//   }, [currentIndex, loaded, vocab, lang]);

//   const shuffleArray = (arr) => [...arr].sort(() => Math.random() - 0.5);
//   const handleBack = () => router.push(`/blogs/blog5/StorySelector`);
//   const goToFullStory = () => router.push(`/blogs/blog5/FullStory?story=${storyId}&lang=${lang}`);
//   const resetQuiz = () => {
//     setCurrentIndex(0);
//     setQuizFinished(false);
//   };

//   const handleWordClick = (word, index) => {
//     if (quizFinished) return;
//     const currentWord = vocab[currentIndex][langMap[lang]] || vocab[currentIndex].en;
//     if (word === currentWord) {
//       setHighlightIndex(index);
//       setHighlightColor('green');
//       playSound('/sounds/bling.mp3');
//       setTimeout(() => {
//         if (currentIndex < vocab.length - 1) setCurrentIndex(prev => prev + 1);
//         else setQuizFinished(true);
//       }, 300);
//     } else {
//       setHighlightIndex(index);
//       setHighlightColor('red');
//       playSound('/sounds/error.mp3');
//       const otherWords = vocab.filter((_, i) => i !== currentIndex).map(v => v[langMap[lang]] || v.en);
//       const shuffledOthers = shuffleArray(otherWords).slice(0, 8);
//       const correctWord = currentWord;
//       setTimeout(() => {
//         setWordOptions(shuffleArray([...shuffledOthers, correctWord]));
//         setHighlightIndex(null);
//         setHighlightColor(null);
//       }, 300);
//     }
//   };

//   const playSound = (src) => {
//     const audio = new Audio(src);
//     audio.play();
//   };

//   if (!loaded || !vocab.length) return <p style={{ textAlign: 'center', marginTop: '50px' }}>Loading...</p>;

//   const currentVocab = vocab[currentIndex];
//   const folderEntry = stories.find(s => s.story == storyId);
//   const folderName = `${storyId}. ${folderEntry?.en?.trim() || 'Story'}`;
//   const encodedFolderName = encodeURIComponent(folderName);
//   const fileIndex = currentVocab.file;
//   const safeEnTitle = normalize(currentVocab.en).replace(/\.+$/, '');
//   const fileName = `${fileIndex}. ${safeEnTitle}.jpg`;
//   const encodedFileName = encodeURIComponent(fileName);
//   const imagePath = `/ActionStoriesPics/VocabPics/${encodedFolderName}/${encodedFileName}`;

//   return (
//     <div style={{ minHeight: '100vh', backgroundColor: '#faf7e8', padding: '20px', textAlign: 'center' }}>
//       <div
//         onClick={handleBack}
//         style={{ cursor: 'pointer', fontSize: '16px', display: 'flex', alignItems: 'center', gap: '5px', color: '#333', fontWeight: '500', marginBottom: '20px' }}
//       >
//         ← Back to Story Selection
//       </div>

//       <div style={{ display: 'flex', justifyContent: 'center', gap: '40px', flexWrap: 'wrap', alignItems: 'center' }}>
//         {/* Image */}
//         <img
//           src={imagePath}
//           alt={currentVocab[langMap[lang]] || currentVocab.en}
//           style={{ width: '400px', height: '300px', objectFit: 'contain', borderRadius: '12px', boxShadow: '0 6px 16px rgba(0,0,0,0.25)' }}
//         />

//         {/* Word panel */}
//         <div
//           style={{
//             display: 'grid',
//             gridTemplateColumns: 'repeat(3, 1fr)',
//             gridGap: '16px',
//             maxWidth: '360px',
//             height: '300px',
//             alignSelf: 'center',
//             justifyItems: 'center',
//             alignItems: 'center',
//           }}
//         >
//           {wordOptions.map((word, i) => (
//             <div
//               key={i}
//               onClick={() => handleWordClick(word, i)}
//               style={{
//                 width: '120px',
//                 height: '100px',
//                 padding: '8px',
//                 backgroundColor: highlightIndex === i ? highlightColor : '#fff',
//                 borderRadius: '10px',
//                 boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
//                 textAlign: 'center',
//                 cursor: quizFinished ? 'not-allowed' : 'pointer',
//                 fontWeight: '500',
//                 userSelect: 'none',
//                 transition: 'background-color 0.2s ease',
//                 display: 'flex',
//                 alignItems: 'center',
//                 justifyContent: 'center',
//                 whiteSpace: 'normal',
//                 wordBreak: 'break-word',
//                 overflowWrap: 'break-word',
//               }}
//             >
//               {word}
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Refresh icon */}
//       <div
//         onClick={resetQuiz}
//         style={{ cursor: 'pointer', fontSize: '32px', marginTop: '20px', color: '#f3c200', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}
//         title="Restart Quiz"
//       >
//         <FiRefreshCw />
//       </div>

//       {/* Full Story Button */}
//       {quizFinished && (
//         <button
//           onClick={goToFullStory}
//           style={{ marginTop: '30px', padding: '12px 24px', fontSize: '16px', fontWeight: '600', backgroundColor: '#f3c200', border: 'none', borderRadius: '8px', cursor: 'pointer', boxShadow: '0 4px 8px rgba(0,0,0,0.2)' }}
//         >
//           Go to Full Story →
//         </button>
//       )}
//     </div>
//   );
// }


//CODE 5 transferred to VocabQuizClient.js
// 'use client';

// import { useEffect, useState } from 'react';
// import { useSearchParams, useRouter } from 'next/navigation';
// import Papa from 'papaparse';
// import { FiRefreshCw } from 'react-icons/fi';

// export default function VocabQuiz() {
//   const router = useRouter();
//   const params = useSearchParams();
//   const storyId = params.get('story');
//   const lang = (params.get('lang') || 'EN').toUpperCase();

//   const [vocab, setVocab] = useState([]);
//   const [stories, setStories] = useState([]);
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [loaded, setLoaded] = useState(false);
//   const [wordOptions, setWordOptions] = useState([]);
//   const [highlightIndex, setHighlightIndex] = useState(null);
//   const [highlightColor, setHighlightColor] = useState(null);
//   const [quizFinished, setQuizFinished] = useState(false);

//   const langMap = { EN: 'en', PT: 'pt', ES: 'es', IT: 'it', FR: 'fr', DE: 'de', JA: 'ja' };

//   const normalize = (str) => str.replace(/[–—]/g, '-').replace(/[“”]/g, '"').trim();

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
//     if (!loaded || !vocab.length) return;

//     const currentWord = vocab[currentIndex];
//     const otherWords = vocab.filter((_, i) => i !== currentIndex).map(v => v[langMap[lang]] || v.en);
//     const shuffledOthers = shuffleArray(otherWords).slice(0, 8);
//     const correctWord = currentWord[langMap[lang]] || currentWord.en;
//     const options = shuffleArray([...shuffledOthers, correctWord]);
//     setWordOptions(options);
//     setHighlightIndex(null);
//     setHighlightColor(null);
//   }, [currentIndex, loaded, vocab, lang]);

//   const shuffleArray = (arr) => [...arr].sort(() => Math.random() - 0.5);
//   const handleBack = () => router.push(`/blogs/blog5/StorySelector`);
//   const goToFullStory = () => router.push(`/blogs/blog5/FullStory?story=${storyId}&lang=${lang}`);
//   const resetQuiz = () => {
//     setCurrentIndex(0);
//     setQuizFinished(false);
//   };

//   const handleWordClick = (word, index) => {
//     if (quizFinished) return;
//     const currentWord = vocab[currentIndex][langMap[lang]] || vocab[currentIndex].en;
//     if (word === currentWord) {
//       setHighlightIndex(index);
//       setHighlightColor('green');
//       playSound('/sounds/bling.mp3');
//       setTimeout(() => {
//         if (currentIndex < vocab.length - 1) setCurrentIndex(prev => prev + 1);
//         else setQuizFinished(true);
//       }, 300);
//     } else {
//       setHighlightIndex(index);
//       setHighlightColor('red');
//       playSound('/sounds/error.mp3');
//       const otherWords = vocab.filter((_, i) => i !== currentIndex).map(v => v[langMap[lang]] || v.en);
//       const shuffledOthers = shuffleArray(otherWords).slice(0, 8);
//       const correctWord = currentWord;
//       setTimeout(() => {
//         setWordOptions(shuffleArray([...shuffledOthers, correctWord]));
//         setHighlightIndex(null);
//         setHighlightColor(null);
//       }, 300);
//     }
//   };

//   const playSound = (src) => {
//     const audio = new Audio(src);
//     audio.play();
//   };

//   if (!loaded || !vocab.length) return <p style={{ textAlign: 'center', marginTop: '50px' }}>Loading...</p>;

//   const currentVocab = vocab[currentIndex];
//   const folderEntry = stories.find(s => s.story == storyId);
//   const folderName = `${storyId}. ${folderEntry?.en?.trim() || 'Story'}`;
//   const encodedFolderName = encodeURIComponent(folderName);
//   const fileIndex = currentVocab.file;
//   const safeEnTitle = normalize(currentVocab.en).replace(/\.+$/, '');
//   const fileName = `${fileIndex}. ${safeEnTitle}.jpg`;
//   const encodedFileName = encodeURIComponent(fileName);
//   const imagePath = `/ActionStoriesPics/VocabPics/${encodedFolderName}/${encodedFileName}`;

//   return (
//     <div style={{ minHeight: '100vh', backgroundColor: '#faf7e8', padding: '20px', textAlign: 'center', position: 'relative' }}>
//       {/* Refresh icon top-right */}
//       <div
//         onClick={resetQuiz}
//         style={{ cursor: 'pointer', fontSize: '32px', color: '#f3c200', position: 'absolute', top: '20px', right: '20px' }}
//         title="Restart Quiz"
//       >
//         <FiRefreshCw />
//       </div>

//       <div
//         onClick={handleBack}
//         style={{ cursor: 'pointer', fontSize: '16px', display: 'flex', alignItems: 'center', gap: '5px', color: '#333', fontWeight: '500', marginBottom: '20px', justifyContent: 'center' }}
//       >
//         ← Back to Story Selection
//       </div>

//       {/* Main content: image + panel */}
//       <div style={{ display: 'flex', justifyContent: 'center', gap: '40px', flexWrap: 'wrap', alignItems: 'center' }}>
//         {/* Image */}
//         <img
//           src={imagePath}
//           alt={currentVocab[langMap[lang]] || currentVocab.en}
//           style={{ width: '400px', height: '300px', objectFit: 'contain', borderRadius: '12px', boxShadow: '0 6px 16px rgba(0,0,0,0.25)' }}
//         />

//         {/* Word panel */}
//         <div
//           style={{
//             display: 'grid',
//             gridTemplateColumns: 'repeat(3, 1fr)',
//             gridGap: '16px',
//             width: '420px', // wider than before
//             height: '300px',
//             alignSelf: 'center',
//             justifyItems: 'center',
//             alignItems: 'center',
//           }}
//         >
//           {wordOptions.map((word, i) => (
//             <div
//               key={i}
//               onClick={() => handleWordClick(word, i)}
//               style={{
//                 width: '140px', // increased width
//                 height: '100px',
//                 padding: '8px',
//                 backgroundColor: highlightIndex === i ? highlightColor : '#fff',
//                 borderRadius: '10px',
//                 boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
//                 textAlign: 'center',
//                 cursor: quizFinished ? 'not-allowed' : 'pointer',
//                 fontWeight: '500',
//                 userSelect: 'none',
//                 transition: 'background-color 0.2s ease',
//                 display: 'flex',
//                 alignItems: 'center',
//                 justifyContent: 'center',
//                 whiteSpace: 'normal',
//                 wordBreak: 'break-word',
//                 overflowWrap: 'break-word',
//               }}
//             >
//               {word}
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Full Story Button below image + panel */}
//       <div style={{ marginTop: '80px' }}>
//         {quizFinished && (
//           <button
//             onClick={goToFullStory}
//             style={{ padding: '12px 24px', fontSize: '16px', fontWeight: '600', backgroundColor: '#f3c200', border: 'none', borderRadius: '8px', cursor: 'pointer', boxShadow: '0 4px 8px rgba(0,0,0,0.2)' }}
//           >
//             Go to Full Story →
//           </button>
//         )}
//       </div>
//     </div>
//   );
// }


//new page.js
'use client';

import { Suspense } from 'react';
import VocabQuizClient from './VocabQuizClient';

export default function VocabQuizPage() {
  return (
    <Suspense fallback={<p style={{ textAlign: 'center', marginTop: '50px' }}>Loading Quiz...</p>}>
      <VocabQuizClient />
    </Suspense>
  );
}
