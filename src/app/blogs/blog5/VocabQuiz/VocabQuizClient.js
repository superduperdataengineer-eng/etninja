//code 1 works great no sound
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
//           className="vocab-word-panel"
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


//code 2 works but bling error sounds overlap with word's
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

//   /* ---------------------------------------------------
//      NEW SMART AUDIO PLAYER (opus → TTS fallback)
//   --------------------------------------------------- */
//   const playVocabularyAudio = async (text, langCode) => {
//     const folder = langCode.toLowerCase();
//     const safe = text
//       .toLowerCase()
//       .replaceAll(" ", "_")
//       .replaceAll("'", "")
//       .replaceAll('"', "")
//       .replaceAll("-", "_");

//     const soundPath = `/actionLineSounds/${folder}/${safe}.opus`;

//     try {
//       const head = await fetch(soundPath, { method: "HEAD" });

//       if (head.ok) {
//         new Audio(soundPath).play();
//         return;
//       }
//     } catch (err) {}

//     // TTS fallback
//     try {
//       const utter = new SpeechSynthesisUtterance(text);
//       utter.lang = folder;
//       window.speechSynthesis.speak(utter);
//     } catch (err) {}
//   };

//   /* Image click → play correct vocabulary audio */
//   const playImageAudio = () => {
//     const word = vocab[currentIndex][langMap[lang]] || vocab[currentIndex].en;
//     playVocabularyAudio(word, langMap[lang]);
//   };

//   /* ---------------------------------------------------
//      LOAD CSVs
//   --------------------------------------------------- */
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

//   /* ---------------------------------------------------
//      SET WORD OPTIONS
//   --------------------------------------------------- */
//   useEffect(() => {
//     if (!loaded || !vocab.length) return;

//     const currentWord = vocab[currentIndex];
//     const otherWords = vocab
//       .filter((_, i) => i !== currentIndex)
//       .map(v => v[langMap[lang]] || v.en);

//     const shuffledOthers = shuffleArray(otherWords).slice(0, 8);
//     const correctWord = currentWord[langMap[lang]] || currentWord.en;

//     setWordOptions(shuffleArray([...shuffledOthers, correctWord]));
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

//   /* ---------------------------------------------------
//      WORD CLICK (now includes audio)
//   --------------------------------------------------- */
//   const handleWordClick = (word, index) => {
//     if (quizFinished) return;

//     // 🔊 PLAY AUDIO OF CLICKED OPTION
//     playVocabularyAudio(word, langMap[lang]);

//     const correctWord = vocab[currentIndex][langMap[lang]] || vocab[currentIndex].en;

//     if (word === correctWord) {
//       setHighlightIndex(index);
//       setHighlightColor('green');
//       new Audio('/sounds/bling.mp3').play();

//       setTimeout(() => {
//         if (currentIndex < vocab.length - 1) setCurrentIndex(prev => prev + 1);
//         else setQuizFinished(true);
//       }, 300);

//     } else {
//       setHighlightIndex(index);
//       setHighlightColor('red');
//       new Audio('/sounds/error.mp3').play();

//       const otherWords = vocab
//         .filter((_, i) => i !== currentIndex)
//         .map(v => v[langMap[lang]] || v.en);

//       const shuffledOthers = shuffleArray(otherWords).slice(0, 8);
//       const correctWordFinal = correctWord;

//       setTimeout(() => {
//         setWordOptions(shuffleArray([...shuffledOthers, correctWordFinal]));
//         setHighlightIndex(null);
//         setHighlightColor(null);
//       }, 300);
//     }
//   };

//   if (!loaded || !vocab.length)
//     return <p style={{ textAlign: 'center', marginTop: '50px' }}>Loading...</p>;

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
      
//       {/* Restart icon */}
//       <div
//         onClick={resetQuiz}
//         style={{ cursor: 'pointer', fontSize: '32px', color: '#f3c200', position: 'absolute', top: '20px', right: '20px' }}
//         title="Restart Quiz"
//       >
//         <FiRefreshCw />
//       </div>

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
//           marginBottom: '20px',
//           justifyContent: 'center'
//         }}
//       >
//         ← Back to Story Selection
//       </div>

//       <div style={{ display: 'flex', justifyContent: 'center', gap: '40px', flexWrap: 'wrap', alignItems: 'center' }}>

//         {/* IMAGE with click-to-play */}
//         <img
//           src={imagePath}
//           onClick={playImageAudio}
//           alt={currentVocab[langMap[lang]] || currentVocab.en}
//           style={{
//             width: '400px',
//             height: '300px',
//             objectFit: 'contain',
//             borderRadius: '12px',
//             boxShadow: '0 6px 16px rgba(0,0,0,0.25)',
//             cursor: 'pointer'
//           }}
//         />

//         {/* Answer grid */}
//         <div
//           className="vocab-word-panel"
//           style={{
//             display: 'grid',
//             gridTemplateColumns: 'repeat(3, 1fr)',
//             gridGap: '16px',
//             width: '420px',
//             height: '300px',
//             alignSelf: 'center',
//             justifyItems: 'center',
//             alignItems: 'center'
//           }}
//         >
//           {wordOptions.map((word, i) => (
//             <div
//               key={i}
//               onClick={() => handleWordClick(word, i)}
//               style={{
//                 width: '140px',
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
//                 overflowWrap: 'break-word'
//               }}
//             >
//               {word}
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Show Full Story button */}
//       <div style={{ marginTop: '80px' }}>
//         {quizFinished && (
//           <button
//             onClick={goToFullStory}
//             style={{
//               padding: '12px 24px',
//               fontSize: '16px',
//               fontWeight: '600',
//               backgroundColor: '#f3c200',
//               border: 'none',
//               borderRadius: '8px',
//               cursor: 'pointer',
//               boxShadow: '0 4px 8px rgba(0,0,0,0.2)'
//             }}
//           >
//             Go to Full Story →
//           </button>
//         )}
//       </div>
//     </div>
//   );
// }

//code 3 too much of a delay on word sounds
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

//   /* ---------------------------------------------------
//      PLAY SEQUENCE: first sound → wait → secondAction()
//   --------------------------------------------------- */
//   const playSequential = (firstSrc, secondAction) => {
//     const a = new Audio(firstSrc);

//     a.onended = () => {
//       secondAction();
//     };

//     a.play().catch(() => {
//       // Mobile autoplay block → just run next action
//       secondAction();
//     });
//   };

//   /* ---------------------------------------------------
//      SMART AUDIO PLAYER (opus → TTS fallback)
//   --------------------------------------------------- */
//   const playVocabularyAudio = async (text, langCode) => {
//     const folder = langCode.toLowerCase();
//     const safe = text
//       .toLowerCase()
//       .replaceAll(" ", "_")
//       .replaceAll("'", "")
//       .replaceAll('"', "")
//       .replaceAll("-", "_");

//     const soundPath = `/actionSounds/${folder}/${safe}.opus`;

//     try {
//       const head = await fetch(soundPath, { method: "HEAD" });

//       if (head.ok) {
//         new Audio(soundPath).play();
//         return;
//       }
//     } catch (err) {}

//     // TTS fallback
//     try {
//       const utter = new SpeechSynthesisUtterance(text);
//       utter.lang = folder;
//       window.speechSynthesis.speak(utter);
//     } catch (err) {}
//   };

//   /* Image click → play correct vocabulary audio */
//   const playImageAudio = () => {
//     const word = vocab[currentIndex][langMap[lang]] || vocab[currentIndex].en;
//     playVocabularyAudio(word, langMap[lang]);
//   };

//   /* ---------------------------------------------------
//      LOAD CSVs
//   --------------------------------------------------- */
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

//   /* ---------------------------------------------------
//      SET WORD OPTIONS
//   --------------------------------------------------- */
//   useEffect(() => {
//     if (!loaded || !vocab.length) return;

//     const currentWord = vocab[currentIndex];
//     const otherWords = vocab
//       .filter((_, i) => i !== currentIndex)
//       .map(v => v[langMap[lang]] || v.en);

//     const shuffledOthers = shuffleArray(otherWords).slice(0, 8);
//     const correctWord = currentWord[langMap[lang]] || currentWord.en;

//     setWordOptions(shuffleArray([...shuffledOthers, correctWord]));
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

//   /* ---------------------------------------------------
//      WORD CLICK — NOW SEQUENTIAL AUDIO FIXED
//   --------------------------------------------------- */
//   const handleWordClick = (word, index) => {
//     if (quizFinished) return;

//     const correctWord = vocab[currentIndex][langMap[lang]] || vocab[currentIndex].en;

//     if (word === correctWord) {
//       setHighlightIndex(index);
//       setHighlightColor('green');

//       // ⬇️ Wait for bling.opus → then play word audio
//       playSequential('/sounds/bling.mp3', () => {
//         playVocabularyAudio(correctWord, langMap[lang]);
//       });

//       setTimeout(() => {
//         if (currentIndex < vocab.length - 1) setCurrentIndex(prev => prev + 1);
//         else setQuizFinished(true);
//       }, 300);

//     } else {
//       setHighlightIndex(index);
//       setHighlightColor('red');

//       // ⬇️ Wait for error.opus → then play WRONG word audio
//       playSequential('/sounds/error.mp3', () => {
//         playVocabularyAudio(word, langMap[lang]);
//       });

//       const otherWords = vocab
//         .filter((_, i) => i !== currentIndex)
//         .map(v => v[langMap[lang]] || v.en);

//       const shuffledOthers = shuffleArray(otherWords).slice(0, 8);
//       const correctWordFinal = correctWord;

//       setTimeout(() => {
//         setWordOptions(shuffleArray([...shuffledOthers, correctWordFinal]));
//         setHighlightIndex(null);
//         setHighlightColor(null);
//       }, 300);
//     }
//   };

//   if (!loaded || !vocab.length)
//     return <p style={{ textAlign: 'center', marginTop: '50px' }}>Loading...</p>;

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
      
//       {/* Restart icon */}
//       <div
//         onClick={resetQuiz}
//         style={{ cursor: 'pointer', fontSize: '32px', color: '#f3c200', position: 'absolute', top: '20px', right: '20px' }}
//         title="Restart Quiz"
//       >
//         <FiRefreshCw />
//       </div>

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
//           marginBottom: '20px',
//           justifyContent: 'center'
//         }}
//       >
//         ← Back to Story Selection
//       </div>

//       <div style={{ display: 'flex', justifyContent: 'center', gap: '40px', flexWrap: 'wrap', alignItems: 'center' }}>

//         {/* IMAGE with click-to-play */}
//         <img
//           src={imagePath}
//           onClick={playImageAudio}
//           alt={currentVocab[langMap[lang]] || currentVocab.en}
//           style={{
//             width: '400px',
//             height: '300px',
//             objectFit: 'contain',
//             borderRadius: '12px',
//             boxShadow: '0 6px 16px rgba(0,0,0,0.25)',
//             cursor: 'pointer'
//           }}
//         />

//         {/* Answer grid */}
//         <div
//           className="vocab-word-panel"
//           style={{
//             display: 'grid',
//             gridTemplateColumns: 'repeat(3, 1fr)',
//             gridGap: '16px',
//             width: '420px',
//             height: '300px',
//             alignSelf: 'center',
//             justifyItems: 'center',
//             alignItems: 'center'
//           }}
//         >
//           {wordOptions.map((word, i) => (
//             <div
//               key={i}
//               onClick={() => handleWordClick(word, i)}
//               style={{
//                 width: '140px',
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
//                 overflowWrap: 'break-word'
//               }}
//             >
//               {word}
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Show Full Story button */}
//       <div style={{ marginTop: '80px' }}>
//         {quizFinished && (
//           <button
//             onClick={goToFullStory}
//             style={{
//               padding: '12px 24px',
//               fontSize: '16px',
//               fontWeight: '600',
//               backgroundColor: '#f3c200',
//               border: 'none',
//               borderRadius: '8px',
//               cursor: 'pointer',
//               boxShadow: '0 4px 8px rgba(0,0,0,0.2)'
//             }}
//           >
//             Go to Full Story →
//           </button>
//         )}
//       </div>
//     </div>
//   );
// }

//code 4
'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Papa from 'papaparse';
import { FiRefreshCw } from 'react-icons/fi';

export default function VocabQuiz() {
  const router = useRouter();
  const params = useSearchParams();
  const storyId = params.get('story');
  const lang = (params.get('lang') || 'EN').toUpperCase();

  const [vocab, setVocab] = useState([]);
  const [stories, setStories] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [wordOptions, setWordOptions] = useState([]);
  const [highlightIndex, setHighlightIndex] = useState(null);
  const [highlightColor, setHighlightColor] = useState(null);
  const [quizFinished, setQuizFinished] = useState(false);

  const langMap = { EN: 'en', PT: 'pt', ES: 'es', IT: 'it', FR: 'fr', DE: 'de', JA: 'ja' };

  const normalize = (str) =>
    str.replace(/[–—]/g, '-').replace(/[“”]/g, '"').trim();

  /* --------------------------------------------
     SMART VOCAB AUDIO (OPUS → TTS fallback)
  -------------------------------------------- */
  const playVocabularyAudio = async (text, langCode) => {
    const folder = langCode.toLowerCase();
    const safe = text
      .toLowerCase()
      .replaceAll(" ", "_")
      .replaceAll("'", "")
      .replaceAll('"', "")
      .replaceAll("-", "_");

    const soundPath = `/actionSounds/${folder}/${safe}.opus`;

    try {
      const head = await fetch(soundPath, { method: "HEAD" });
      if (head.ok) {
        new Audio(soundPath).play();
        return;
      }
    } catch (err) {}

    // TTS fallback
    try {
      const utter = new SpeechSynthesisUtterance(text);
      utter.lang = folder;
      window.speechSynthesis.speak(utter);
    } catch (err) {}
  };

  /* Image click → play vocab audio */
  const playImageAudio = () => {
    const word = vocab[currentIndex][langMap[lang]] || vocab[currentIndex].en;
    playVocabularyAudio(word, langMap[lang]);
  };

  /* --------------------------------------------
     LOAD CSVs
  -------------------------------------------- */
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

      const storyVocab = parsedVocab.filter(
        v => v.story == storyId && v.file && v.en
      );

      setVocab(storyVocab);
      setStories(parsedStories);
      setLoaded(true);
    });
  }, [storyId]);

  /* --------------------------------------------
     SET WORD OPTIONS
  -------------------------------------------- */
  useEffect(() => {
    if (!loaded || !vocab.length) return;

    const currentWord = vocab[currentIndex];
    const otherWords = vocab
      .filter((_, i) => i !== currentIndex)
      .map(v => v[langMap[lang]] || v.en);

    const shuffledOthers = shuffleArray(otherWords).slice(0, 8);
    const correctWord = currentWord[langMap[lang]] || currentWord.en;

    setWordOptions(shuffleArray([...shuffledOthers, correctWord]));
    setHighlightIndex(null);
    setHighlightColor(null);
  }, [currentIndex, loaded, vocab, lang]);

  const shuffleArray = (arr) => [...arr].sort(() => Math.random() - 0.5);

  const handleBack = () =>
    router.push(`/blogs/blog5/StorySelector`);

  const goToFullStory = () =>
    router.push(`/blogs/blog5/FullStory?story=${storyId}&lang=${lang}`);

  const resetQuiz = () => {
    setCurrentIndex(0);
    setQuizFinished(false);
  };

  /* --------------------------------------------
     WORD CLICK — ONLY PLAYS THE WORD
  -------------------------------------------- */
  const handleWordClick = (word, index) => {
    if (quizFinished) return;

    const correctWord =
      vocab[currentIndex][langMap[lang]] || vocab[currentIndex].en;

    // instant feedback color
    setHighlightIndex(index);
    setHighlightColor(word === correctWord ? 'green' : 'red');

    // 🔥 JUST PLAY THE WORD — no bling, no error, no delay
    playVocabularyAudio(word, langMap[lang]);

    // UI timing stays the same
    setTimeout(() => {
      if (word === correctWord) {
        if (currentIndex < vocab.length - 1)
          setCurrentIndex(prev => prev + 1);
        else
          setQuizFinished(true);
      } else {
        const otherWords = vocab
          .filter((_, i) => i !== currentIndex)
          .map(v => v[langMap[lang]] || v.en);

        const shuffledOthers = shuffleArray(otherWords).slice(0, 8);
        const correctWordFinal = correctWord;

        setWordOptions(
          shuffleArray([...shuffledOthers, correctWordFinal])
        );
        setHighlightIndex(null);
        setHighlightColor(null);
      }
    }, 300);
  };

  if (!loaded || !vocab.length)
    return (
      <p style={{ textAlign: 'center', marginTop: '50px' }}>
        Loading...
      </p>
    );

  const currentVocab = vocab[currentIndex];
  const folderEntry = stories.find(s => s.story == storyId);
  const folderName = `${storyId}. ${folderEntry?.en?.trim() || 'Story'}`;
  const encodedFolderName = encodeURIComponent(folderName);
  const fileIndex = currentVocab.file;
  const safeEnTitle = normalize(currentVocab.en).replace(/\.+$/, '');
  const fileName = `${fileIndex}. ${safeEnTitle}.jpg`;
  const encodedFileName = encodeURIComponent(fileName);
  const imagePath = `/ActionStoriesPics/VocabPics/${encodedFolderName}/${encodedFileName}`;

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: '#faf7e8',
        padding: '20px',
        textAlign: 'center',
        position: 'relative'
      }}
    >
      {/* Restart icon */}
      <div
        onClick={resetQuiz}
        style={{
          cursor: 'pointer',
          fontSize: '32px',
          color: '#f3c200',
          position: 'absolute',
          top: '20px',
          right: '20px'
        }}
        title="Restart Quiz"
      >
        <FiRefreshCw />
      </div>

      <div
        onClick={handleBack}
        style={{
          cursor: 'pointer',
          fontSize: '16px',
          display: 'flex',
          alignItems: 'center',
          gap: '5px',
          color: '#333',
          fontWeight: '500',
          marginBottom: '20px',
          justifyContent: 'center'
        }}
      >
        ← Back to Story Selection
      </div>

      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '40px',
          flexWrap: 'wrap',
          alignItems: 'center'
        }}
      >
        {/* IMAGE with click-to-play */}
        <img
          src={imagePath}
          onClick={playImageAudio}
          alt={currentVocab[langMap[lang]] || currentVocab.en}
          style={{
            width: '400px',
            height: '300px',
            objectFit: 'contain',
            borderRadius: '12px',
            boxShadow: '0 6px 16px rgba(0,0,0,0.25)',
            cursor: 'pointer'
          }}
        />

        {/* Answer grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gridGap: '16px',
            width: '420px',
            height: '300px',
            alignSelf: 'center',
            justifyItems: 'center',
            alignItems: 'center'
          }}
        >
          {wordOptions.map((word, i) => (
            <div
              key={i}
              onClick={() => handleWordClick(word, i)}
              style={{
                width: '140px',
                height: '100px',
                padding: '8px',
                backgroundColor:
                  highlightIndex === i ? highlightColor : '#fff',
                borderRadius: '10px',
                boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
                textAlign: 'center',
                cursor: quizFinished ? 'not-allowed' : 'pointer',
                fontWeight: '500',
                userSelect: 'none',
                transition: 'background-color 0.2s ease',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                whiteSpace: 'normal',
                wordBreak: 'break-word',
                overflowWrap: 'break-word'
              }}
            >
              {word}
            </div>
          ))}
        </div>
      </div>

      {/* Show Full Story button */}
      <div style={{ marginTop: '80px' }}>
        {quizFinished && (
          <button
            onClick={goToFullStory}
            style={{
              padding: '12px 24px',
              fontSize: '16px',
              fontWeight: '600',
              backgroundColor: '#f3c200',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              boxShadow: '0 4px 8px rgba(0,0,0,0.2)'
            }}
          >
            Go to Full Story →
          </button>
        )}
      </div>
    </div>
  );
}
