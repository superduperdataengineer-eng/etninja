// 'use client';

// import { useEffect, useState } from 'react';
// import { useSearchParams, useRouter } from 'next/navigation';
// import Papa from 'papaparse';

// export default function VocabSlide() {
//   const [vocab, setVocab] = useState([]);
//   const [stories, setStories] = useState([]);
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [lang, setLang] = useState('EN');
//   const searchParams = useSearchParams();
//   const router = useRouter();

//   const storyNumber = searchParams.get('story');
//   const langMap = { EN: 'en', PT: 'pt', ES: 'es', IT: 'it', FR: 'fr', DE: 'de', JA: 'ja' };

//   useEffect(() => {
//     const storedLang = (localStorage.getItem('selectedLanguage') || 'en').toUpperCase();
//     setLang(storedLang);

//     fetch('/ActionCSV/TitlesCSV.csv')
//       .then(res => res.text())
//       .then(text => {
//         Papa.parse(text, {
//           header: true,
//           skipEmptyLines: true,
//           transformHeader: h => h.trim().toLowerCase(),
//           complete: result => setStories(result.data),
//         });
//       });

//     fetch('/ActionCSV/VocabularyCSV.csv')
//       .then(res => res.text())
//       .then(text => {
//         Papa.parse(text, {
//           header: true,
//           skipEmptyLines: true,
//           transformHeader: h => h.trim().toLowerCase(),
//           complete: result => setVocab(result.data),
//         });
//       });
//   }, []);

//   const storyEntry = stories.find(s => s.story === storyNumber);
//   const storyName = storyEntry ? storyEntry.en?.trim() : '';
//   const folderName = storyEntry ? encodeURIComponent(`${storyNumber}. ${storyName}`) : '';

//   const slides = vocab.filter(v => v.story === storyNumber && v.file && v.en);
//   const langColumn = langMap[lang] || 'en';

//   const currentSlide = slides[currentIndex];

//   const handleNext = () => {
//     setCurrentIndex((prev) => (prev + 1 < slides.length ? prev + 1 : 0));
//   };

//   const handlePrev = () => {
//     setCurrentIndex((prev) => (prev - 1 >= 0 ? prev - 1 : slides.length - 1));
//   };

//   const goBack = () => {
//     router.push('/StorySelector');
//   };

//   const normalize = (str) => str
//     .replace(/[–—]/g, '-')  // replace en/em dash
//     .replace(/[“”]/g, '"')  // replace smart quotes
//     .trim();

//   const getImagePath = (entry) => {
//     if (!entry) return '/placeholder.jpg';
//     const fileIndex = entry.file;
//     const safeEnTitle = normalize(entry.en).replace(/\.+$/, '');
//     const encodedFile = encodeURIComponent(`${fileIndex}. ${safeEnTitle}.jpg`);
//     return `/ActionStoriesPics/VocabPics/${folderName}/${encodedFile}`;
//   };

//   if (!currentSlide) return <p style={{ textAlign: 'center', marginTop: '3rem' }}>Loading slides...</p>;

//   return (
//     <div className="center-container">
//       <h2 style={{ marginBottom: '1rem', textAlign: 'center' }}>
//         {storyEntry ? storyEntry[langColumn] || storyEntry.en : `Story ${storyNumber}`}
//       </h2>

//       <div className="slide-wrapper">
//         <div className="slide-preview">
//           <img src={getImagePath(currentSlide)} alt={currentSlide.en} />
//         </div>

//         <p style={{ marginTop: '1rem', fontWeight: '600', fontSize: '1.1rem' }}>
//           {currentSlide[langColumn] || currentSlide.en}
//         </p>

//         <div className="slide-buttons">
//           <button className="secondary" onClick={handlePrev}>← Previous</button>
//           <button className="primary" onClick={handleNext}>Next →</button>
//         </div>

//         <button
//           style={{ marginTop: '2rem', backgroundColor: '#6b7280', color: 'white', padding: '0.5rem 1rem', borderRadius: '0.5rem' }}
//           onClick={goBack}
//         >
//           ⬅ Back to Stories
//         </button>
//       </div>
//     </div>
//   );
// }


//code 2 not complete
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
//     if (currentIndex < vocab.length - 1) {
//       setCurrentIndex(prev => prev + 1);
//     }
//   };

//   const handlePrev = () => {
//     if (currentIndex > 0) {
//       setCurrentIndex(prev => prev - 1);
//     }
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
//       position: 'relative'
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

//       {/* Image */}
//       <img
//         src={imagePath}
//         alt={word}
//         style={{
//           width: '320px',
//           height: '240px',
//           objectFit: 'cover',
//           borderRadius: '12px',
//           boxShadow: '0 6px 16px rgba(0,0,0,0.25)',
//           marginBottom: '20px',
//           transition: '0.3s ease'
//         }}
//       />

//       {/* Word */}
//       <h2 style={{
//         fontSize: '22px',
//         fontWeight: '600',
//         marginBottom: '30px',
//         color: '#333'
//       }}>
//         {word}
//       </h2>

//       {/* Navigation Arrows */}
//       <div style={{ display: 'flex', justifyContent: 'center', gap: '40px' }}>
//         <button
//           onClick={handlePrev}
//           disabled={currentIndex === 0}
//           style={{
//             background: 'none',
//             border: 'none',
//             fontSize: '30px',
//             cursor: currentIndex === 0 ? 'default' : 'pointer',
//             opacity: currentIndex === 0 ? 0.3 : 1
//           }}
//         >
//           ←
//         </button>
//         <button
//           onClick={handleNext}
//           disabled={currentIndex === vocab.length - 1}
//           style={{
//             background: 'none',
//             border: 'none',
//             fontSize: '30px',
//             cursor: currentIndex === vocab.length - 1 ? 'default' : 'pointer',
//             opacity: currentIndex === vocab.length - 1 ? 0.3 : 1
//           }}
//         >
//           →
//         </button>
//       </div>

//       {/* Quiz button (only on last slide) */}
//       {currentIndex === vocab.length - 1 && (
//         <button
//           onClick={handleQuiz}
//           style={{
//             marginTop: '40px',
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


//code 3 works great, but show text button is ugly as fuck
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
//     if (currentIndex < vocab.length - 1) {
//       setCurrentIndex(prev => prev + 1);
//     }
//   };

//   const handlePrev = () => {
//     if (currentIndex > 0) {
//       setCurrentIndex(prev => prev - 1);
//     }
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

//       {/* Image */}
//       <img
//         src={imagePath}
//         alt={word}
//         style={{
//           width: '100%',
//           maxWidth: '400px',
//           height: '300px',
//           objectFit: 'contain', // ✅ fit fully inside
//           borderRadius: '12px',
//           boxShadow: '0 6px 16px rgba(0,0,0,0.25)',
//           marginBottom: '20px',
//           transition: '0.3s ease'
//         }}
//       />

//       {/* Word toggle */}
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

//       <button
//         onClick={() => setShowText(prev => !prev)}
//         style={{
//           marginBottom: '20px',
//           padding: '6px 12px',
//           fontSize: '14px',
//           borderRadius: '6px',
//           border: '1px solid #333',
//           backgroundColor: '#fff',
//           cursor: 'pointer'
//         }}
//       >
//         {showText ? 'Hide Text' : 'Show Text'}
//       </button>

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


//code 4 transferred to another
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


//new page.js
'use client';

import dynamic from 'next/dynamic';
import { Suspense } from 'react';

const VocabSlideClient = dynamic(() => import('./VocabSlideClient'), {
  ssr: false,
});

export default function VocabSlidePage() {
  return (
    <Suspense fallback={<p style={{ textAlign: 'center', marginTop: '50px' }}>Loading slides...</p>}>
      <VocabSlideClient />
    </Suspense>
  );
}
