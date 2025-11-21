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


//code 3
'use client';

import { useEffect, useState } from 'react';
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

  const langMap = { EN: 'en', PT: 'pt', ES: 'es', IT: 'it', FR: 'fr', DE: 'de', JA: 'ja' };

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
        style={{
          width: '100%',
          maxWidth: '400px',
          height: '300px',
          objectFit: 'contain',
          borderRadius: '12px',
          boxShadow: '0 6px 16px rgba(0,0,0,0.25)',
          transition: '0.3s ease',
          marginBottom: '10px'
        }}
      />

      {showText && (
        <h2 style={{
          fontSize: '22px',
          fontWeight: '600',
          marginBottom: '30px',
          color: '#333'
        }}>
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
