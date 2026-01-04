// 'use client';

// import { useEffect, useState } from 'react';
// import Papa from 'papaparse';

// export default function StorySelector() {
//   const [stories, setStories] = useState([]);
//   const [vocab, setVocab] = useState([]);
//   const [lang, setLang] = useState('EN');
//   const [hoveredCard, setHoveredCard] = useState(null); // track hovered card

//   const langMap = { EN: 'en', PT: 'pt', ES: 'es', IT: 'it', FR: 'fr', DE: 'de', JA: 'ja' };

//   const hasImages = (story) => {
//   return vocab.some(v => v.story == story.story && v.file && v.en);
// };


//   useEffect(() => {
//     const storedLang = (localStorage.getItem('selectedLanguage') || 'en').toUpperCase();
//     setLang(storedLang);

//     fetch('/ActionCSV/TitlesCSV.csv')
//       .then(res => res.text())
//       .then(csvText => {
//         Papa.parse(csvText, {
//           header: true,
//           skipEmptyLines: true,
//           transformHeader: h => h.trim().toLowerCase(),
//           complete: result => setStories(result.data.filter(r => r.story))
//         });
//       });

//     fetch('/ActionCSV/VocabularyCSV.csv')
//       .then(res => res.text())
//       .then(csvText => {
//         Papa.parse(csvText, {
//           header: true,
//           skipEmptyLines: true,
//           transformHeader: h => h.trim().toLowerCase(),
//           complete: result => setVocab(result.data)
//         });
//       });
//   }, []);

// //   const getRandomImage = (story) => {
// //   if (!vocab.length || !stories.length) return '/placeholder.jpg';

// //   // folderEntry comes from TitlesCSV.csv
// //   const folderEntry = stories.find(s => s.story === story.story);
// //   if (!folderEntry || !folderEntry.en) return '/placeholder.jpg';

// //   const folderName = `${story.story}. ${folderEntry.en.trim()}`;
// //   const encodedFolderName = encodeURIComponent(folderName);

// //   // Get all vocabulary entries for this story that have a File number
// //   const storyVocab = vocab.filter(v => v.story == story.story && v.file && v.en);
// //   if (!storyVocab.length) return '/placeholder.jpg';

// //   // Pick a random entry
// //   const randomEntry = storyVocab[Math.floor(Math.random() * storyVocab.length)];

// //   // Construct the filename using File column and en column
// //   const fileIndex = randomEntry.file; // number from CSV
// //   const safeEnTitle = randomEntry.en.trim().replace(/\.+$/, '');
// //   const fileName = `${fileIndex}. ${safeEnTitle}.jpg`;
// //   const encodedFileName = encodeURIComponent(fileName);

// //   return `/ActionStoriesPics/VocabPics/${encodedFolderName}/${encodedFileName}`;
// // };

// const getRandomImage = (story) => {
//   if (!vocab.length || !stories.length) return null; // return null instead of placeholder

//   const folderName = `${story.story}. ${story.en.trim()}`;
//   const encodedFolderName = encodeURIComponent(folderName);

//   // Only include vocab entries with a file number
//   const storyVocab = vocab.filter(v => v.story == story.story && v.file && v.en);
//   if (!storyVocab.length) return null; // no image, return null

//   // Pick a random entry
//   const randomEntry = storyVocab[Math.floor(Math.random() * storyVocab.length)];

//   const fileIndex = randomEntry.file; // file number from CSV
//   const safeEnTitle = randomEntry.en.trim().replace(/\.+$/, '');
//   const fileName = `${fileIndex}. ${safeEnTitle}.jpg`;
//   const encodedFileName = encodeURIComponent(fileName);

//   return `/ActionStoriesPics/VocabPics/${encodedFolderName}/${encodedFileName}`;
// };




//   return (
//     <div
//       style={{
//         display: 'flex',
//         flexWrap: 'wrap',
//         gap: '15px',
//         justifyContent: 'center',
//         maxWidth: '900px',
//         margin: '20px auto',
//         padding: '20px',
//         boxSizing: 'border-box',
//       }}
//     >
//       {/* {stories.map((story, index) => {
//         const titleColumn = langMap[lang] || 'en';
//         const title = story[titleColumn] || story.en || `Story ${story.story}`;
//         const imageSrc = getRandomImage(story);

//         const isHovered = hoveredCard === index;

//         return (
//           <div
//             key={index}
//             onMouseEnter={() => setHoveredCard(index)}
//             onMouseLeave={() => setHoveredCard(null)}
//             style={{
//               flex: '0 0 calc(25% - 15px)',
//               height: '130px',
//               borderRadius: '12px',
//               overflow: 'hidden',
//               backgroundColor: 'white',
//               position: 'relative',
//               boxShadow: isHovered
//                 ? '0 10px 20px rgba(0,0,0,0.4)'
//                 : '0 4px 8px rgba(0,0,0,0.2)',
//               transform: isHovered ? 'scale(1.08)' : 'scale(1)',
//               transition: 'transform 0.3s ease, box-shadow 0.3s ease',
//               backgroundImage: isHovered
//                 ? 'linear-gradient(145deg, rgba(255,255,255,0.15), rgba(255,255,255,0))'
//                 : 'none',
//               cursor: 'pointer'
//             }}
//           >
//             <img
//               src={imageSrc}
//               alt={title}
//               style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
//             />
//             <div
//               style={{
//                 position: 'absolute',
//                 inset: 0,
//                 backgroundColor: 'rgba(0,0,0,0.35)',
//                 display: 'flex',
//                 alignItems: 'center',
//                 justifyContent: 'center',
//               }}
//             >
//               <p
//                 style={{
//                   color: 'white',
//                   textAlign: 'center',
//                   fontWeight: '600',
//                   padding: '5px',
//                   fontSize: '12px',
//                 }}
//               >
//                 {title}
//               </p>
//             </div>
//           </div>
//         );
//       })} */}
//       {stories
//   .filter(story => hasImages(story)) // only include stories with images
//   .map((story, index) => {
//     const titleColumn = langMap[lang] || 'en';
//     const title = story[titleColumn] || story.en || `Story ${story.story}`;
//     const imageSrc = getRandomImage(story);

//     const isHovered = hoveredCard === index;

//     return (
//       <div
//         key={index}
//         onMouseEnter={() => setHoveredCard(index)}
//         onMouseLeave={() => setHoveredCard(null)}
//         style={{
//           flex: '0 0 calc(25% - 15px)',
//           height: '130px',
//           borderRadius: '12px',
//           overflow: 'hidden',
//           backgroundColor: 'white',
//           position: 'relative',
//           boxShadow: isHovered
//             ? '0 10px 20px rgba(0,0,0,0.4)'
//             : '0 4px 8px rgba(0,0,0,0.2)',
//           transform: isHovered ? 'scale(1.08)' : 'scale(1)',
//           transition: 'transform 0.3s ease, box-shadow 0.3s ease',
//           backgroundImage: isHovered
//             ? 'linear-gradient(145deg, rgba(255,255,255,0.15), rgba(255,255,255,0))'
//             : 'none',
//           cursor: 'pointer'
//         }}
//       >
//         <img
//           src={imageSrc}
//           alt={title}
//           style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
//         />
//         <div
//           style={{
//             position: 'absolute',
//             inset: 0,
//             backgroundColor: 'rgba(0,0,0,0.35)',
//             display: 'flex',
//             alignItems: 'center',
//             justifyContent: 'center',
//           }}
//         >
//           <p
//             style={{
//               color: 'white',
//               textAlign: 'center',
//               fontWeight: '600',
//               padding: '5px',
//               fontSize: '12px',
//             }}
//           >
//             {title}
//           </p>
//         </div>
//       </div>
//     );
//   })}

//     </div>
//   );
// }

//code 4 works but images don't change
// 'use client';

// import { useEffect, useState } from 'react';
// import Papa from 'papaparse';

// export default function StorySelector() {
//   const [stories, setStories] = useState([]);
//   const [vocab, setVocab] = useState([]);
//   const [lang, setLang] = useState('EN');
//   const [hoveredCard, setHoveredCard] = useState(null);

//   const langMap = { EN: 'en', PT: 'pt', ES: 'es', IT: 'it', FR: 'fr', DE: 'de', JA: 'ja' };

//   useEffect(() => {
//     const storedLang = (localStorage.getItem('selectedLanguage') || 'en').toUpperCase();
//     setLang(storedLang);

//     fetch('/ActionCSV/TitlesCSV.csv')
//       .then(res => res.text())
//       .then(csvText => {
//         Papa.parse(csvText, {
//           header: true,
//           skipEmptyLines: true,
//           transformHeader: h => h.trim().toLowerCase(),
//           complete: result => setStories(result.data.filter(r => r.story))
//         });
//       });

//     fetch('/ActionCSV/VocabularyCSV.csv')
//       .then(res => res.text())
//       .then(csvText => {
//         Papa.parse(csvText, {
//           header: true,
//           skipEmptyLines: true,
//           transformHeader: h => h.trim().toLowerCase(),
//           complete: result => setVocab(result.data)
//         });
//       });
//   }, []);

//   // Precompute the first valid image for a story
//   const getFirstImage = (story) => {
//     const folderEntry = stories.find(s => s.story === story.story);
//     if (!folderEntry || !folderEntry.en) return null;

//     const folderName = `${story.story}. ${folderEntry.en.trim()}`;
//     const encodedFolderName = encodeURIComponent(folderName);

//     const storyVocab = vocab.filter(v => v.story == story.story && v.file && v.en);
//     if (!storyVocab.length) return null;

//     // Pick the first valid entry instead of random
//     const entry = storyVocab[0];
//     const fileIndex = entry.file;
//     const safeEnTitle = entry.en.trim().replace(/\.+$/, '');
//     const fileName = `${fileIndex}. ${safeEnTitle}.jpg`;
//     const encodedFileName = encodeURIComponent(fileName);

//     return `/ActionStoriesPics/VocabPics/${encodedFolderName}/${encodedFileName}`;
//   };

//   return (
//     <div
//       style={{
//         display: 'flex',
//         flexWrap: 'wrap',
//         gap: '15px',
//         justifyContent: 'center',
//         maxWidth: '900px',
//         margin: '20px auto',
//         padding: '20px',
//         boxSizing: 'border-box',
//       }}
//     >
//       {stories
//         .map(story => {
//           const imageSrc = getFirstImage(story);
//           if (!imageSrc) return null; // skip stories without images
//           return story;
//         })
//         .filter(Boolean)
//         .map((story, index) => {
//           const titleColumn = langMap[lang] || 'en';
//           const title = story[titleColumn] || story.en || `Story ${story.story}`;
//           const imageSrc = getFirstImage(story);

//           const isHovered = hoveredCard === index;

//           return (
//             <div
//               key={index}
//               onMouseEnter={() => setHoveredCard(index)}
//               onMouseLeave={() => setHoveredCard(null)}
//               style={{
//                 flex: '0 0 calc(25% - 15px)',
//                 height: '130px',
//                 borderRadius: '12px',
//                 overflow: 'hidden',
//                 backgroundColor: 'white',
//                 position: 'relative',
//                 boxShadow: isHovered
//                   ? '0 10px 20px rgba(0,0,0,0.4)'
//                   : '0 4px 8px rgba(0,0,0,0.2)',
//                 transform: isHovered ? 'scale(1.08)' : 'scale(1)',
//                 transition: 'transform 0.3s ease, box-shadow 0.3s ease',
//                 backgroundImage: isHovered
//                   ? 'linear-gradient(145deg, rgba(255,255,255,0.15), rgba(255,255,255,0))'
//                   : 'none',
//                 cursor: 'pointer'
//               }}
//             >
//               <img
//                 src={imageSrc}
//                 alt={title}
//                 style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
//               />
//               <div
//                 style={{
//                   position: 'absolute',
//                   inset: 0,
//                   backgroundColor: 'rgba(0,0,0,0.35)',
//                   display: 'flex',
//                   alignItems: 'center',
//                   justifyContent: 'center',
//                 }}
//               >
//                 <p
//                   style={{
//                     color: 'white',
//                     textAlign: 'center',
//                     fontWeight: '600',
//                     padding: '5px',
//                     fontSize: '12px',
//                   }}
//                 >
//                   {title}
//                 </p>
//               </div>
//             </div>
//           );
//         })}
//     </div>
//   );
// }


//code 2 works great but no links USE FOR VIGNETTE
// 'use client';

// import { useEffect, useState } from 'react';
// import Papa from 'papaparse';

// export default function StorySelector() {
//   const [stories, setStories] = useState([]);
//   const [vocab, setVocab] = useState([]);
//   const [lang, setLang] = useState('EN');
//   const [hoveredCard, setHoveredCard] = useState(null);

//   const langMap = { EN: 'en', PT: 'pt', ES: 'es', IT: 'it', FR: 'fr', DE: 'de', JA: 'ja' };

//   useEffect(() => {
//     const storedLang = (localStorage.getItem('selectedLanguage') || 'en').toUpperCase();
//     setLang(storedLang);

//     fetch('/ActionCSV/TitlesCSV.csv')
//       .then(res => res.text())
//       .then(csvText => {
//         Papa.parse(csvText, {
//           header: true,
//           skipEmptyLines: true,
//           transformHeader: h => h.trim().toLowerCase(),
//           complete: result => setStories(result.data.filter(r => r.story))
//         });
//       });

//     fetch('/ActionCSV/VocabularyCSV.csv')
//       .then(res => res.text())
//       .then(csvText => {
//         Papa.parse(csvText, {
//           header: true,
//           skipEmptyLines: true,
//           transformHeader: h => h.trim().toLowerCase(),
//           complete: result => setVocab(result.data)
//         });
//       });
//   }, []);

//   // Only include stories that have at least one valid image
//   const hasImages = (story) => {
//     if (!vocab.length || !stories.length) return false;
//     const folderEntry = stories.find(s => s.story === story.story);
//     if (!folderEntry || !folderEntry.en) return false;

//     const storyVocab = vocab.filter(v => v.story == story.story && v.file && v.en);
//     return storyVocab.length > 0;
//   };

//   const normalize = (str) => str
//   .replace(/[–—]/g, '-')  // en dash and em dash → regular hyphen
//   .replace(/[“”]/g, '"')  // smart quotes → regular quotes
//   .trim();

//   // const getRandomImage = (story) => {
//   //   const folderEntry = stories.find(s => s.story === story.story);
//   //   if (!folderEntry || !folderEntry.en) return '/placeholder.jpg';

//   //   const folderName = `${story.story}. ${folderEntry.en.trim()}`;
//   //   const encodedFolderName = encodeURIComponent(folderName);

//   //   const storyVocab = vocab.filter(v => v.story == story.story && v.file && v.en);
//   //   if (!storyVocab.length) return '/placeholder.jpg';

//   //   const randomEntry = storyVocab[Math.floor(Math.random() * storyVocab.length)];
//   //   const fileIndex = randomEntry.file;
//   //   const safeEnTitle = randomEntry.en.trim().replace(/\.+$/, '');
//   //   const fileName = `${fileIndex}. ${safeEnTitle}.jpg`;
//   //   const encodedFileName = encodeURIComponent(fileName);

//   //   return `/ActionStoriesPics/VocabPics/${encodedFolderName}/${encodedFileName}`;
//   // };
//   const getRandomImage = (story) => {
//   const folderEntry = stories.find(s => s.story === story.story);
//   if (!folderEntry || !folderEntry.en) return '/placeholder.jpg';

//   const folderName = `${story.story}. ${folderEntry.en.trim()}`;
//   const encodedFolderName = encodeURIComponent(folderName);

//   const storyVocab = vocab.filter(v => v.story == story.story && v.file && v.en);
//   if (!storyVocab.length) return '/placeholder.jpg';

//   const randomEntry = storyVocab[Math.floor(Math.random() * storyVocab.length)];
//   const fileIndex = randomEntry.file;

//   // Normalize special characters in the 'en' column
//   const safeEnTitle = normalize(randomEntry.en).replace(/\.+$/, '');
//   const fileName = `${fileIndex}. ${safeEnTitle}.jpg`;
//   const encodedFileName = encodeURIComponent(fileName);

//   return `/ActionStoriesPics/VocabPics/${encodedFolderName}/${encodedFileName}`;
// };

//   return (
//     <div
//       style={{
//         display: 'flex',
//         flexWrap: 'wrap',
//         gap: '15px',
//         justifyContent: 'center',
//         maxWidth: '900px',
//         margin: '20px auto',
//         padding: '20px',
//         boxSizing: 'border-box',
//       }}
//     >
//       {stories
//         .filter(story => hasImages(story)) // only stories with images
//         .map((story, index) => {
//           const titleColumn = langMap[lang] || 'en';
//           const title = story[titleColumn] || story.en || `Story ${story.story}`;
//           const imageSrc = getRandomImage(story); // random each render/hover

//           const isHovered = hoveredCard === index;

//           return (
//             <div
//               key={index}
//               onMouseEnter={() => setHoveredCard(index)}
//               onMouseLeave={() => setHoveredCard(null)}
//               style={{
//                 flex: '0 0 calc(25% - 15px)',
//                 height: '130px',
//                 borderRadius: '12px',
//                 overflow: 'hidden',
//                 backgroundColor: 'white',
//                 position: 'relative',
//                 boxShadow: isHovered
//                   ? '0 10px 20px rgba(0,0,0,0.4)'
//                   : '0 4px 8px rgba(0,0,0,0.2)',
//                 transform: isHovered ? 'scale(1.08)' : 'scale(1)',
//                 transition: 'transform 0.3s ease, box-shadow 0.3s ease',
//                 backgroundImage: isHovered
//                   ? 'linear-gradient(145deg, rgba(255,255,255,0.15), rgba(255,255,255,0))'
//                   : 'none',
//                 cursor: 'pointer'
//               }}
//             >
//               <img
//                 src={imageSrc}
//                 alt={title}
//                 style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
//               />
//               <div
//                 style={{
//                   position: 'absolute',
//                   inset: 0,
//                   backgroundColor: 'rgba(0,0,0,0.35)',
//                   display: 'flex',
//                   alignItems: 'center',
//                   justifyContent: 'center',
//                 }}
//               >
//                 <p
//                   style={{
//                     color: 'white',
//                     textAlign: 'center',
//                     fontWeight: '600',
//                     padding: '5px',
//                     fontSize: '12px',
//                   }}
//                 >
//                   {title}
//                 </p>
//               </div>
//             </div>
//           );
//         })}
//     </div>
//   );
// }

//CODE 3 
// 'use client';

// import { useEffect, useState } from 'react';
// import { useRouter } from 'next/navigation'; // 👈 import for navigation
// import Papa from 'papaparse';

// export default function StorySelector() {
//   const router = useRouter();
//   const [stories, setStories] = useState([]);
//   const [vocab, setVocab] = useState([]);
//   const [lang, setLang] = useState('EN');
//   const [hoveredCard, setHoveredCard] = useState(null);

//   const langMap = { EN: 'en', PT: 'pt', ES: 'es', IT: 'it', FR: 'fr', DE: 'de', JA: 'ja' };

//   useEffect(() => {
//     const storedLang = (localStorage.getItem('selectedLanguage') || 'en').toUpperCase();
//     setLang(storedLang);

//     fetch('/ActionCSV/TitlesCSV.csv')
//       .then(res => res.text())
//       .then(csvText => {
//         Papa.parse(csvText, {
//           header: true,
//           skipEmptyLines: true,
//           transformHeader: h => h.trim().toLowerCase(),
//           complete: result => setStories(result.data.filter(r => r.story))
//         });
//       });

//     fetch('/ActionCSV/VocabularyCSV.csv')
//       .then(res => res.text())
//       .then(csvText => {
//         Papa.parse(csvText, {
//           header: true,
//           skipEmptyLines: true,
//           transformHeader: h => h.trim().toLowerCase(),
//           complete: result => setVocab(result.data)
//         });
//       });
//   }, []);

//   const normalize = (str) =>
//     str.replace(/[–—]/g, '-').replace(/[“”]/g, '"').trim();

//   const hasImages = (story) => {
//     if (!vocab.length || !stories.length) return false;
//     const folderEntry = stories.find(s => s.story === story.story);
//     if (!folderEntry || !folderEntry.en) return false;
//     const storyVocab = vocab.filter(v => v.story == story.story && v.file && v.en);
//     return storyVocab.length > 0;
//   };

//   const getRandomImage = (story) => {
//     const folderEntry = stories.find(s => s.story === story.story);
//     if (!folderEntry || !folderEntry.en) return '/placeholder.jpg';

//     const folderName = `${story.story}. ${folderEntry.en.trim()}`;
//     const encodedFolderName = encodeURIComponent(folderName);

//     const storyVocab = vocab.filter(v => v.story == story.story && v.file && v.en);
//     if (!storyVocab.length) return '/placeholder.jpg';

//     const randomEntry = storyVocab[Math.floor(Math.random() * storyVocab.length)];
//     const fileIndex = randomEntry.file;
//     const safeEnTitle = normalize(randomEntry.en).replace(/\.+$/, '');
//     const fileName = `${fileIndex}. ${safeEnTitle}.jpg`;
//     const encodedFileName = encodeURIComponent(fileName);

//     return `/ActionStoriesPics/VocabPics/${encodedFolderName}/${encodedFileName}`;
//   };

//   const handleStoryClick = (story) => {
//     router.push(`/blogs/blog5/VocabSlide?story=${story.story}&lang=${lang}`);
//   };


//   return (
//     <div style={{
//       display: 'flex',
//       flexWrap: 'wrap',
//       gap: '15px',
//       justifyContent: 'center',
//       maxWidth: '900px',
//       margin: '20px auto',
//       padding: '20px',
//       boxSizing: 'border-box',
//     }}>
//       {stories.filter(hasImages).map((story, index) => {
//         const titleColumn = langMap[lang] || 'en';
//         const title = story[titleColumn] || story.en || `Story ${story.story}`;
//         const imageSrc = getRandomImage(story);
//         const isHovered = hoveredCard === index;

//         return (
//           <div
//             key={index}
//             onMouseEnter={() => setHoveredCard(index)}
//             onMouseLeave={() => setHoveredCard(null)}
//             onClick={() => handleStoryClick(story)} // 👈 navigate to VocabSlide
//             style={{
//               flex: '0 0 calc(25% - 15px)',
//               height: '130px',
//               borderRadius: '12px',
//               overflow: 'hidden',
//               backgroundColor: 'white',
//               position: 'relative',
//               boxShadow: isHovered
//                 ? '0 10px 20px rgba(0,0,0,0.4)'
//                 : '0 4px 8px rgba(0,0,0,0.2)',
//               transform: isHovered ? 'scale(1.08)' : 'scale(1)',
//               transition: 'transform 0.3s ease, box-shadow 0.3s ease',
//               cursor: 'pointer'
//             }}
//           >
//             <img
//               src={imageSrc}
//               alt={title}
//               style={{ width: '100%', height: '100%', objectFit: 'cover' }}
//             />
//             <div
//               style={{
//                 position: 'absolute',
//                 inset: 0,
//                 backgroundColor: 'rgba(0,0,0,0.35)',
//                 display: 'flex',
//                 alignItems: 'center',
//                 justifyContent: 'center',
//               }}
//             >
//               <p style={{
//                 color: 'white',
//                 textAlign: 'center',
//                 fontWeight: '600',
//                 padding: '5px',
//                 fontSize: '12px',
//               }}>
//                 {title}
//               </p>
//             </div>
//           </div>
//         );
//       })}
//     </div>
//   );
// }


//code 4 works beautiful but no arrow to go back to languageselector
// 'use client';

// import { useEffect, useState } from 'react';
// import { useRouter } from 'next/navigation'; // 👈 import for navigation
// import Papa from 'papaparse';

// export default function StorySelector() {
//   const router = useRouter();
//   const [stories, setStories] = useState([]);
//   const [vocab, setVocab] = useState([]);
//   const [lang, setLang] = useState('EN');
//   const [hoveredCard, setHoveredCard] = useState(null);

//   const langMap = { EN: 'en', PT: 'pt', ES: 'es', IT: 'it', FR: 'fr', DE: 'de', JA: 'ja' };

//   useEffect(() => {
//     const storedLang = (localStorage.getItem('selectedLanguage') || 'en').toUpperCase();
//     setLang(storedLang);

//     fetch('/ActionCSV/TitlesCSV.csv')
//       .then(res => res.text())
//       .then(csvText => {
//         Papa.parse(csvText, {
//           header: true,
//           skipEmptyLines: true,
//           transformHeader: h => h.trim().toLowerCase(),
//           complete: result => setStories(result.data.filter(r => r.story))
//         });
//       });

//     fetch('/ActionCSV/VocabularyCSV.csv')
//       .then(res => res.text())
//       .then(csvText => {
//         Papa.parse(csvText, {
//           header: true,
//           skipEmptyLines: true,
//           transformHeader: h => h.trim().toLowerCase(),
//           complete: result => setVocab(result.data)
//         });
//       });
//   }, []);

//   const normalize = (str) =>
//     str.replace(/[–—]/g, '-').replace(/[“”]/g, '"').trim();

//   const hasImages = (story) => {
//     if (!vocab.length || !stories.length) return false;
//     const folderEntry = stories.find(s => s.story === story.story);
//     if (!folderEntry || !folderEntry.en) return false;
//     const storyVocab = vocab.filter(v => v.story == story.story && v.file && v.en);
//     return storyVocab.length > 0;
//   };

//   const getRandomImage = (story) => {
//     const folderEntry = stories.find(s => s.story === story.story);
//     if (!folderEntry || !folderEntry.en) return '/placeholder.jpg';

//     const folderName = `${story.story}. ${folderEntry.en.trim()}`;
//     const encodedFolderName = encodeURIComponent(folderName);

//     const storyVocab = vocab.filter(v => v.story == story.story && v.file && v.en);
//     if (!storyVocab.length) return '/placeholder.jpg';

//     const randomEntry = storyVocab[Math.floor(Math.random() * storyVocab.length)];
//     const fileIndex = randomEntry.file;
//     const safeEnTitle = normalize(randomEntry.en).replace(/\.+$/, '');
//     const fileName = `${fileIndex}. ${safeEnTitle}.jpg`;
//     const encodedFileName = encodeURIComponent(fileName);

//     return `/ActionStoriesPics/VocabPics/${encodedFolderName}/${encodedFileName}`;
//   };

//   const handleStoryClick = (story) => {
//     router.push(`/blogs/blog5/VocabSlide?story=${story.story}&lang=${lang}`);
//   };


//   return (
//     <div style={{
//       display: 'flex',
//       flexWrap: 'wrap',
//       gap: '15px',
//       justifyContent: 'center',
//       maxWidth: '900px',
//       margin: '20px auto',
//       padding: '20px',
//       boxSizing: 'border-box',
//     }}>
//       {stories.filter(hasImages).map((story, index) => {
//         const titleColumn = langMap[lang] || 'en';
//         const title = story[titleColumn] || story.en || `Story ${story.story}`;
//         const imageSrc = getRandomImage(story);
//         const isHovered = hoveredCard === index;

//         return (
//           <div
//             key={index}
//             onMouseEnter={() => setHoveredCard(index)}
//             onMouseLeave={() => setHoveredCard(null)}
//             onClick={() => handleStoryClick(story)} // 👈 navigate to VocabSlide
//             style={{
//               flex: '0 0 calc(25% - 15px)',
//               height: '130px',
//               borderRadius: '12px',
//               overflow: 'hidden',
//               backgroundColor: 'white',
//               position: 'relative',
//               boxShadow: isHovered
//                 ? '0 10px 20px rgba(0,0,0,0.4)'
//                 : '0 4px 8px rgba(0,0,0,0.2)',
//               transform: isHovered ? 'scale(1.08)' : 'scale(1)',
//               transition: 'transform 0.3s ease, box-shadow 0.3s ease',
//               cursor: 'pointer'
//             }}
//           >
//             <img
//               src={imageSrc}
//               alt={title}
//               style={{ width: '100%', height: '100%', objectFit: 'cover' }}
//             />
//             <div
//               style={{
//                 position: 'absolute',
//                 inset: 0,
//                 backgroundColor: 'rgba(0,0,0,0.35)',
//                 display: 'flex',
//                 alignItems: 'center',
//                 justifyContent: 'center',
//               }}
//             >
//               <p style={{
//                 color: 'white',
//                 textAlign: 'center',
//                 fontWeight: '600',
//                 padding: '5px',
//                 fontSize: '12px',
//               }}>
//                 {title}
//               </p>
//             </div>
//           </div>
//         );
//       })}
//     </div>
//   );
// }


//code 5 Works great, love it!!
// 'use client';

// import { useEffect, useState } from 'react';
// import { useRouter } from 'next/navigation'; // 👈 import for navigation
// import Papa from 'papaparse';

// export default function StorySelector() {
//   const router = useRouter();
//   const [stories, setStories] = useState([]);
//   const [vocab, setVocab] = useState([]);
//   const [lang, setLang] = useState('EN');
//   const [hoveredCard, setHoveredCard] = useState(null);

//   const langMap = { EN: 'en', PT: 'pt', ES: 'es', IT: 'it', FR: 'fr', DE: 'de', JA: 'ja' };

//   useEffect(() => {
//     const storedLang = (localStorage.getItem('selectedLanguage') || 'en').toUpperCase();
//     setLang(storedLang);

//     fetch('/actionCSV/TitlesCSV.csv')
//       .then(res => res.text())
//       .then(csvText => {
//         Papa.parse(csvText, {
//           header: true,
//           skipEmptyLines: true,
//           transformHeader: h => h.trim().toLowerCase(),
//           complete: result => setStories(result.data.filter(r => r.story))
//         });
//       });

//     fetch('/actionCSV/VocabularyCSV.csv')
//       .then(res => res.text())
//       .then(csvText => {
//         Papa.parse(csvText, {
//           header: true,
//           skipEmptyLines: true,
//           transformHeader: h => h.trim().toLowerCase(),
//           complete: result => setVocab(result.data)
//         });
//       });
//   }, []);

//   const normalize = (str) =>
//     str.replace(/[–—]/g, '-').replace(/[“”]/g, '"').trim();

//   const hasImages = (story) => {
//     if (!vocab.length || !stories.length) return false;
//     const folderEntry = stories.find(s => s.story === story.story);
//     if (!folderEntry || !folderEntry.en) return false;
//     const storyVocab = vocab.filter(v => v.story == story.story && v.file && v.en);
//     return storyVocab.length > 0;
//   };

//   const getRandomImage = (story) => {
//     const folderEntry = stories.find(s => s.story === story.story);
//     if (!folderEntry || !folderEntry.en) return '/placeholder.jpg';

//     const folderName = `${story.story}. ${folderEntry.en.trim()}`;
//     const encodedFolderName = encodeURIComponent(folderName);

//     const storyVocab = vocab.filter(v => v.story == story.story && v.file && v.en);
//     if (!storyVocab.length) return '/placeholder.jpg';

//     const randomEntry = storyVocab[Math.floor(Math.random() * storyVocab.length)];
//     const fileIndex = randomEntry.file;
//     const safeEnTitle = normalize(randomEntry.en).replace(/\.+$/, '');
//     const fileName = `${fileIndex}. ${safeEnTitle}.jpg`;
//     const encodedFileName = encodeURIComponent(fileName);

//     return `/ActionStoriesPics/VocabPics/${encodedFolderName}/${encodedFileName}`;
//   };

//   const handleStoryClick = (story) => {
//     router.push(`/blogs/blog5/VocabSlide?story=${story.story}&lang=${lang}`);
//   };

//   const handleBackToLanguage = () => {
//     router.push(`/blogs/blog5/LanguageSelector`);
//   };

//   return (
//     <div style={{
//       display: 'flex',
//       flexDirection: 'column',
//       alignItems: 'center',
//       gap: '15px',
//       maxWidth: '900px',
//       margin: '20px auto',
//       padding: '20px',
//       boxSizing: 'border-box',
//     }}>
//       {/* Story cards */}
//       <div style={{
//         display: 'flex',
//         flexWrap: 'wrap',
//         gap: '15px',
//         justifyContent: 'center',
//         width: '100%'
//       }}>
//         {stories.filter(hasImages).map((story, index) => {
//           const titleColumn = langMap[lang] || 'en';
//           const title = story[titleColumn] || story.en || `Story ${story.story}`;
//           const imageSrc = getRandomImage(story);
//           const isHovered = hoveredCard === index;

//           return (
//             <div
//               key={index}
//               onMouseEnter={() => setHoveredCard(index)}
//               onMouseLeave={() => setHoveredCard(null)}
//               onClick={() => handleStoryClick(story)}
//               style={{
//                 flex: '0 0 calc(25% - 15px)',
//                 height: '130px',
//                 borderRadius: '12px',
//                 overflow: 'hidden',
//                 backgroundColor: 'white',
//                 position: 'relative',
//                 boxShadow: isHovered
//                   ? '0 10px 20px rgba(0,0,0,0.4)'
//                   : '0 4px 8px rgba(0,0,0,0.2)',
//                 transform: isHovered ? 'scale(1.08)' : 'scale(1)',
//                 transition: 'transform 0.3s ease, box-shadow 0.3s ease',
//                 cursor: 'pointer'
//               }}
//             >
//               <img
//                 src={imageSrc}
//                 alt={title}
//                 style={{ width: '100%', height: '100%', objectFit: 'cover' }}
//               />
//               <div style={{
//                 position: 'absolute',
//                 inset: 0,
//                 backgroundColor: 'rgba(0,0,0,0.35)',
//                 display: 'flex',
//                 alignItems: 'center',
//                 justifyContent: 'center',
//               }}>
//                 <p style={{
//                   color: 'white',
//                   textAlign: 'center',
//                   fontWeight: '600',
//                   padding: '5px',
//                   fontSize: '12px',
//                 }}>
//                   {title}
//                 </p>
//               </div>
//             </div>
//           );
//         })}
//       </div>

//       {/* Back arrow below all stories */}
//       <div
//         onClick={handleBackToLanguage}
//         style={{
//           cursor: 'pointer',
//           fontSize: '16px',
//           color: '#333',
//           display: 'flex',
//           alignItems: 'center',
//           gap: '5px',
//           fontWeight: '500',
//           marginTop: '20px'
//         }}
//       >
//         ← <span>Back to Language choice</span>
//       </div>
//     </div>
//   );
// }

//code 6 works on localhost:3000
// 'use client';

// import { useEffect, useState } from 'react';
// import { useRouter } from 'next/navigation'; // 👈 import for navigation
// import Papa from 'papaparse';

// export default function StorySelector() {
//   const router = useRouter();
//   const [stories, setStories] = useState([]);
//   const [vocab, setVocab] = useState([]);
//   const [lang, setLang] = useState('EN');
//   const [hoveredCard, setHoveredCard] = useState(null);

//   const langMap = { EN: 'en', PT: 'pt', ES: 'es', IT: 'it', FR: 'fr', DE: 'de', JA: 'ja' };

//   useEffect(() => {
//     const storedLang = (localStorage.getItem('selectedLanguage') || 'en').toUpperCase();
//     setLang(storedLang);

//     const timestamp = new Date().getTime(); // cache-busting

//     fetch(`/actionCSV/TitlesCSV.csv?v=${timestamp}`)
//       .then(res => res.text())
//       .then(csvText => {
//         Papa.parse(csvText, {
//           header: true,
//           skipEmptyLines: true,
//           transformHeader: h => h.trim().toLowerCase(),
//           complete: result => setStories(result.data.filter(r => r.story))
//         });
//       });

//     fetch(`/actionCSV/VocabularyCSV.csv?v=${timestamp}`)
//       .then(res => res.text())
//       .then(csvText => {
//         Papa.parse(csvText, {
//           header: true,
//           skipEmptyLines: true,
//           transformHeader: h => h.trim().toLowerCase(),
//           complete: result => setVocab(result.data)
//         });
//       });
//   }, []);

//   const normalize = (str) =>
//     str.replace(/[–—]/g, '-').replace(/[“”]/g, '"').trim();

//   const hasImages = (story) => {
//     if (!vocab.length || !stories.length) return false;
//     const folderEntry = stories.find(s => s.story === story.story);
//     if (!folderEntry || !folderEntry.en) return false;
//     const storyVocab = vocab.filter(v => v.story == story.story && v.file && v.en);
//     return storyVocab.length > 0;
//   };

//   const getRandomImage = (story) => {
//     const folderEntry = stories.find(s => s.story === story.story);
//     if (!folderEntry || !folderEntry.en) return '/placeholder.jpg';

//     const folderName = `${story.story}. ${folderEntry.en.trim()}`;
//     const encodedFolderName = encodeURIComponent(folderName);

//     const storyVocab = vocab.filter(v => v.story == story.story && v.file && v.en);
//     if (!storyVocab.length) return '/placeholder.jpg';

//     const randomEntry = storyVocab[Math.floor(Math.random() * storyVocab.length)];
//     const fileIndex = randomEntry.file;
//     const safeEnTitle = normalize(randomEntry.en).replace(/\.+$/, '');
//     const fileName = `${fileIndex}. ${safeEnTitle}.jpg`;
//     const encodedFileName = encodeURIComponent(fileName);

//     return `/ActionStoriesPics/VocabPics/${encodedFolderName}/${encodedFileName}`;
//   };

//   const handleStoryClick = (story) => {
//     router.push(`/blogs/blog5/VocabSlide?story=${story.story}&lang=${lang}`);
//   };

//   const handleBackToLanguage = () => {
//     router.push(`/blogs/blog5/LanguageSelector`);
//   };

//   return (
//     <div style={{
//       display: 'flex',
//       flexDirection: 'column',
//       alignItems: 'center',
//       gap: '15px',
//       maxWidth: '900px',
//       margin: '20px auto',
//       padding: '20px',
//       boxSizing: 'border-box',
//     }}>
//       {/* Story cards */}
//       <div style={{
//         display: 'flex',
//         flexWrap: 'wrap',
//         gap: '15px',
//         justifyContent: 'center',
//         width: '100%'
//       }}>
//         {stories.filter(hasImages).map((story, index) => {
//           const titleColumn = langMap[lang] || 'en';
//           const title = story[titleColumn] || story.en || `Story ${story.story}`;
//           const imageSrc = getRandomImage(story);
//           const isHovered = hoveredCard === index;

//           return (
//             <div
//               key={index}
//               onMouseEnter={() => setHoveredCard(index)}
//               onMouseLeave={() => setHoveredCard(null)}
//               onClick={() => handleStoryClick(story)}
//               style={{
//                 flex: '0 0 calc(25% - 15px)',
//                 height: '130px',
//                 borderRadius: '12px',
//                 overflow: 'hidden',
//                 backgroundColor: 'white',
//                 position: 'relative',
//                 boxShadow: isHovered
//                   ? '0 10px 20px rgba(0,0,0,0.4)'
//                   : '0 4px 8px rgba(0,0,0,0.2)',
//                 transform: isHovered ? 'scale(1.08)' : 'scale(1)',
//                 transition: 'transform 0.3s ease, box-shadow 0.3s ease',
//                 cursor: 'pointer'
//               }}
//             >
//               <img
//                 src={imageSrc}
//                 alt={title}
//                 style={{ width: '100%', height: '100%', objectFit: 'cover' }}
//               />
//               <div style={{
//                 position: 'absolute',
//                 inset: 0,
//                 backgroundColor: 'rgba(0,0,0,0.35)',
//                 display: 'flex',
//                 alignItems: 'center',
//                 justifyContent: 'center',
//               }}>
//                 <p style={{
//                   color: 'white',
//                   textAlign: 'center',
//                   fontWeight: '600',
//                   padding: '5px',
//                   fontSize: '12px',
//                 }}>
//                   {title}
//                 </p>
//               </div>
//             </div>
//           );
//         })}
//       </div>

//       {/* Back arrow below all stories */}
//       <div
//         onClick={handleBackToLanguage}
//         style={{
//           cursor: 'pointer',
//           fontSize: '16px',
//           color: '#333',
//           display: 'flex',
//           alignItems: 'center',
//           gap: '5px',
//           fontWeight: '500',
//           marginTop: '20px'
//         }}
//       >
//         ← <span>Back to Language choice</span>
//       </div>
//     </div>
//   );
// }


//code 7
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Papa from 'papaparse';

export default function StorySelector() {
  const router = useRouter();
  const [stories, setStories] = useState([]);
  const [vocab, setVocab] = useState([]);
  const [lang, setLang] = useState('EN');
  const [hoveredCard, setHoveredCard] = useState(null);

  const langMap = { EN: 'en', PT: 'pt', ES: 'es', IT: 'it', FR: 'fr', DE: 'de', JA: 'ja', NL: 'nl' };

  useEffect(() => {
    const storedLang = (localStorage.getItem('selectedLanguage') || 'en').toUpperCase();
    setLang(storedLang);

    const timestamp = new Date().getTime(); // force fresh fetch

    const fetchCSV = async (path) => {
      try {
        const res = await fetch(`${path}?v=${timestamp}`);
        if (!res.ok) throw new Error(`Failed to fetch ${path}`);
        const csvText = await res.text();
        return new Promise((resolve, reject) => {
          Papa.parse(csvText, {
            header: true,
            skipEmptyLines: true,
            transformHeader: h => h.trim().toLowerCase(),
            complete: (result) => resolve(result.data),
            error: (err) => reject(err),
          });
        });
      } catch (err) {
        console.error(err);
        return [];
      }
    };

    const loadData = async () => {
      const [storiesData, vocabData] = await Promise.all([
        fetchCSV('/actionCSV/TitlesCSV.csv'),
        fetchCSV('/actionCSV/VocabularyCSV.csv')
      ]);
      setStories(storiesData.filter(r => r.story));
      setVocab(vocabData);
    };

    loadData();
  }, []);

  const normalize = str => str.replace(/[–—]/g, '-').replace(/[“”]/g, '"').trim();

  const hasImages = story => {
    if (!vocab.length || !stories.length) return false;
    const storyVocab = vocab.filter(v => v.story === story.story && v.file && v.en);
    return storyVocab.length > 0;
  };

  // const getRandomImage = story => {
  //   const folderEntry = stories.find(s => s.story === story.story);
  //   if (!folderEntry || !folderEntry.en) return '/placeholder.jpg';

  //   const folderName = `${story.story}. ${folderEntry.en.trim().toUpperCase()}`;
  //   const encodedFolderName = encodeURIComponent(folderName);

  //   const storyVocab = vocab.filter(v => v.story === story.story && v.file && v.en);
  //   if (!storyVocab.length) return '/placeholder.jpg';

  //   const randomEntry = storyVocab[Math.floor(Math.random() * storyVocab.length)];
  //   const fileIndex = randomEntry.file;
  //   const safeEnTitle = normalize(randomEntry.en).replace(/\.+$/, '');
  //   const fileName = `${fileIndex}. ${safeEnTitle}.jpg`;
  //   const encodedFileName = encodeURIComponent(fileName);

  //   return `/ActionStoriesPics/VocabPics/${encodedFolderName}/${encodedFileName}`;
  // };
  const getRandomImage = story => {
  // Find story entry case-insensitively
  const folderEntry = stories.find(
    s => s.story.toLowerCase() === story.story.toLowerCase()
  );
  if (!folderEntry || !folderEntry.en) return '/placeholder.jpg';

  // Construct folder name (uppercase for display, doesn't affect matching)
  const folderName = `${story.story}. ${folderEntry.en.trim().toUpperCase()}`;
  const encodedFolderName = encodeURIComponent(folderName);

  // Filter vocab case-insensitively
  const storyVocab = vocab.filter(
    v =>
      v.story.toLowerCase() === story.story.toLowerCase() &&
      v.file &&
      v.en
  );
  if (!storyVocab.length) return '/placeholder.jpg';

  // Pick a random entry
  const randomEntry = storyVocab[Math.floor(Math.random() * storyVocab.length)];
  const fileIndex = randomEntry.file;
  const safeEnTitle = normalize(randomEntry.en).replace(/\.+$/, '');
  const fileName = `${fileIndex}. ${safeEnTitle}.jpg`;
  const encodedFileName = encodeURIComponent(fileName);

  return `/ActionStoriesPics/VocabPics/${encodedFolderName}/${encodedFileName}`;
};


  const handleStoryClick = story => {
    router.push(`/blogs/blog5/VocabSlide?story=${story.story}&lang=${lang}`);
  };

  const handleBackToLanguage = () => {
    router.push(`/blogs/blog5/LanguageSelector`);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '15px', maxWidth: '900px', margin: '20px auto', padding: '20px', boxSizing: 'border-box' }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '15px', justifyContent: 'center', width: '100%' }}>
        {stories.filter(hasImages).map((story, index) => {
          const titleColumn = langMap[lang] || 'en';
          const title = story[titleColumn] || story.en || `Story ${story.story}`;
          const imageSrc = getRandomImage(story);
          const isHovered = hoveredCard === index;

          return (
            <div key={index} onMouseEnter={() => setHoveredCard(index)} onMouseLeave={() => setHoveredCard(null)} onClick={() => handleStoryClick(story)}
              style={{ flex: '0 0 calc(25% - 15px)', height: '130px', borderRadius: '12px', overflow: 'hidden', backgroundColor: 'white', position: 'relative', boxShadow: isHovered ? '0 10px 20px rgba(0,0,0,0.4)' : '0 4px 8px rgba(0,0,0,0.2)', transform: isHovered ? 'scale(1.08)' : 'scale(1)', transition: 'transform 0.3s ease, box-shadow 0.3s ease', cursor: 'pointer' }}>
              <img src={imageSrc} alt={title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.35)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <p style={{ color: 'white', textAlign: 'center', fontWeight: '600', padding: '5px', fontSize: '12px' }}>{title}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div onClick={handleBackToLanguage} style={{ cursor: 'pointer', fontSize: '16px', color: '#333', display: 'flex', alignItems: 'center', gap: '5px', fontWeight: '500', marginTop: '20px' }}>
        ← <span>Back to Language choice</span>
      </div>
    </div>
  );
}
