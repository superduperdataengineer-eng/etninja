// 'use client';

// import './globals.css';
// import { adList } from './components/adList';
// import { useEffect, useState } from 'react';
// import {blogList} from './components/blogList';
// import Link from 'next/link';

// export default function HomePage() {
//   const leftAdsFull = adList.slice(0, Math.ceil(adList.length / 2));
//   const rightAdsFull = adList.slice(Math.ceil(adList.length / 2));

//   const slotsCount = 10;

//   // Initialize 10 ads per side
//   const [leftAds, setLeftAds] = useState(leftAdsFull.slice(0, slotsCount));
//   const [rightAds, setRightAds] = useState(rightAdsFull.slice(0, slotsCount));

//   // Fade states for simultaneous fade
//   const [fade, setFade] = useState(true);

//   useEffect(() => {
//     const timer = setInterval(() => {
//       // Trigger fade out
//       setFade(false);

//       setTimeout(() => {
//         // Pick new ads randomly for all slots
//         const newLeft = Array.from({ length: slotsCount }, () => leftAdsFull[Math.floor(Math.random() * leftAdsFull.length)]);
//         const newRight = Array.from({ length: slotsCount }, () => rightAdsFull[Math.floor(Math.random() * rightAdsFull.length)]);

//         setLeftAds(newLeft);
//         setRightAds(newRight);

//         // Fade in
//         setFade(true);
//       }, 500); // match transition duration
//     }, 4000); // change every 4 seconds

//     return () => clearInterval(timer);
//   }, [leftAdsFull, rightAdsFull]);

//   const renderAd = (ad) => (
//     <a
//       key={ad.id}
//       href={ad.productUrl}
//       target="_blank"
//       rel="noopener noreferrer"
//       style={{
//         height: '150px',
//         width: '100%',
//         backgroundColor: '#fff',
//         borderRadius: '4px',
//         display: 'flex',
//         flexDirection: 'column',
//         justifyContent: 'center',
//         alignItems: 'center',
//         textAlign: 'center',
//         padding: '0.5rem',
//         textDecoration: 'none',
//         color: 'inherit',
//         opacity: fade ? 1 : 0,
//         transition: 'opacity 0.5s ease-in-out',
//       }}
//     >
//       <img
//         src={ad.imageUrl}
//         alt={ad.name}
//         style={{ maxHeight: '80px', marginBottom: '0.5rem', objectFit: 'contain' }}
//       />
//       <span>{ad.name}</span>
//     </a>
//   );

//   return (
//     <div
//       style={{
//         display: 'flex',
//         flexDirection: 'row',
//         gap: '1rem',
//         padding: '1rem',
//         maxWidth: '1200px',
//         margin: '0 auto',
//       }}
//     >
//       {/* Left Ads */}
//       <aside
//         style={{
//           flex: '1',
//           backgroundColor: '#fff',
//           padding: '1rem',
//           borderRadius: '5px',
//           minWidth: '150px',
//           display: 'flex',
//           flexDirection: 'column',
//           gap: '1rem',
//         }}
//       >
//         {leftAds.map((ad, idx) => (
//           <div key={idx} style={{ height: '150px' }}>
//             {renderAd(ad)}
//           </div>
//         ))}
//       </aside>

//       {/* Main Blogs */}
//       <main
//         style={{
//           flex: '3',
//           display: 'flex',
//           flexWrap: 'wrap',
//           gap: '1rem',
//           justifyContent: 'center',
//         }}
//       >
//         {blogList.map((blog) => (
//         <article
//           key={blog.id}
//           style={{
//             backgroundColor: '#fff',
//             borderRadius: '5px',
//             boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
//             flex: '1 1 calc(50% - 0.5rem)',
//             aspectRatio: '1 / 1', // more natural square
//             display: 'flex',
//             flexDirection: 'column',
//             justifyContent: 'center',
//             alignItems: 'center',
//             padding: '1rem',
//             boxSizing: 'border-box',
//             cursor: 'pointer', // indicates clickable
//             transition: 'transform 0.2s',
//           }}
//           onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.03)'}
//           onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
//         >
//           <Link
//             href={`/blogs/blog${blog.id}`} // dynamic link
//             style={{ textDecoration: 'none', color: 'inherit', width: '100%', textAlign: 'center' }}
//           >
//             <h2>{blog.title}</h2>
//           </Link>
//         </article>
//       ))}

//       </main>

//       {/* Right Ads */}
//       <aside
//         style={{
//           flex: '1',
//           backgroundColor: '#fff',
//           padding: '1rem',
//           borderRadius: '5px',
//           minWidth: '150px',
//           display: 'flex',
//           flexDirection: 'column',
//           gap: '1rem',
//         }}
//       >
//         {rightAds.map((ad, idx) => (
//           <div key={idx} style={{ height: '150px' }}>
//             {renderAd(ad)}
//           </div>
//         ))}
//       </aside>

//       <style jsx>{`
//         @media (max-width: 1024px) {
//           div[style*='flex-direction: row'] {
//             flex-direction: column;
//           }
//           aside {
//             width: 100%;
//             margin-bottom: 1rem;
//           }
//           main article {
//             flex: 1 1 100% !important;
//           }
//         }
//       `}</style>
//     </div>
//   );
// }


//code 2 boxes look good
// 'use client';

// import './globals.css';
// import { adList } from './components/adList';
// import { blogList } from './components/blogList';
// import Link from 'next/link';

// export default function HomePage() {
//   return (
//     <div
//       style={{
//         display: 'flex',
//         gap: '2rem',
//         padding: '2rem',
//         maxWidth: '1200px',
//         margin: '0 auto',
//       }}
//     >
//       {/* Left Ads */}
//       <aside
//         style={{
//           flex: '1',
//           display: 'flex',
//           flexDirection: 'column',
//           gap: '1rem',
//         }}
//       >
//         {adList.map((ad) => (
//           <a
//             key={ad.id}
//             href={ad.productUrl}
//             target="_blank"
//             rel="noopener noreferrer"
//             style={{
//               height: '150px',
//               backgroundColor: '#fff',
//               border: '2px dashed #888',
//               borderRadius: '6px',
//               display: 'flex',
//               flexDirection: 'column',
//               alignItems: 'center',
//               justifyContent: 'center',
//               textAlign: 'center',
//               padding: '0.5rem',
//               textDecoration: 'none',
//               color: '#333',
//             }}
//           >
//             <img
//               src={ad.imageUrl}
//               alt={ad.name}
//               style={{ maxHeight: '80px', marginBottom: '0.5rem', objectFit: 'contain' }}
//             />
//             <span>{ad.name}</span>
//           </a>
//         ))}
//       </aside>

//       {/* Right Blogs as small squares */}
//       <main
//         style={{
//           flex: '3',
//           display: 'grid',
//           gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))',
//           gap: '1rem',
//           justifyItems: 'center',
//         }}
//       >
//         {blogList.map((blog) => (
//           <div
//             key={blog.id}
//             style={{
//               width: '120px',
//               height: '120px',
//               backgroundColor: '#fff',
//               border: '1px solid #ccc',
//               borderRadius: '8px',
//               display: 'flex',
//               flexDirection: 'column',
//               justifyContent: 'space-between',
//               alignItems: 'center',
//               textAlign: 'center',
//               padding: '8px',
//               cursor: 'pointer',
//               transition: 'transform 0.2s, box-shadow 0.2s',
//             }}
//             onMouseEnter={(e) => {
//               e.currentTarget.style.transform = 'scale(1.05)';
//               e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.2)';
//             }}
//             onMouseLeave={(e) => {
//               e.currentTarget.style.transform = 'scale(1)';
//               e.currentTarget.style.boxShadow = 'none';
//             }}
//           >
//             <h4 style={{ fontSize: '12px', margin: '0', flexGrow: 1 }}>{blog.title}</h4>
//             <Link href={`/blogs/blog${blog.id}`}>
//               <button
//                 style={{
//                   padding: '4px 6px',
//                   fontSize: '10px',
//                   borderRadius: '4px',
//                   border: 'none',
//                   backgroundColor: '#0070f3',
//                   color: '#fff',
//                   cursor: 'pointer',
//                 }}
//               >
//                 Try Now
//               </button>
//             </Link>
//           </div>
//         ))}
//       </main>
//     </div>
//   );
// }


//code 3
// 'use client';

// import { adList } from './components/adList';
// import { blogList } from './components/blogList';
// import Link from 'next/link';
// import { useEffect, useState } from 'react';

// export default function HomePage() {
//   const [scrollLeft, setScrollLeft] = useState(0);
//   const [scrollRight, setScrollRight] = useState(0);

//   useEffect(() => {
//     const leftInterval = setInterval(() => {
//       setScrollLeft((prev) => (prev > -1000 ? prev - 2 : 0));
//     }, 30);

//     const rightInterval = setInterval(() => {
//       setScrollRight((prev) => (prev < 1000 ? prev + 2 : 0));
//     }, 30);

//     return () => {
//       clearInterval(leftInterval);
//       clearInterval(rightInterval);
//     };
//   }, []);

//   return (
//     <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
//       {/* Top Ads Banner */}
//       <div
//         style={{
//           overflow: 'hidden',
//           whiteSpace: 'nowrap',
//           borderRadius: '8px',
//           backgroundColor: '#f3f3f3',
//           padding: '8px 0',
//           marginBottom: '2rem',
//           position: 'relative',
//         }}
//       >
//         <div
//           style={{
//             display: 'inline-flex',
//             transform: `translateX(${scrollLeft}px)`,
//             transition: 'transform 0.03s box-shadow 0.3s',
//           }}
//         >
//           {adList.map((ad) => (
//             <a
//               key={ad.id}
//               href={ad.productUrl}
//               target="_blank"
//               rel="noopener noreferrer"
//               style={{
//                 display: 'inline-flex',
//                 alignItems: 'center',
//                 justifyContent: 'center',
//                 margin: '0 10px',
//                 minWidth: '100px',
//                 height: '40px',
//                 backgroundColor: '#f3f3f3',
//                 borderRadius: '0px',
//                 boxShadow: 'none',
//                 textDecoration: 'none',
//                 color: '#333',
//                 padding: '0px',
//               }}
//             >
//               <img
//                 src={ad.imageUrl}
//                 alt={ad.name}
//                 style={{ maxHeight: '50px', objectFit: 'contain' }}
//               />
//             </a>
//           ))}
//         </div>
//       </div>

//       {/* Main Blogs */}
//       <main
//         style={{
//           display: 'grid',
//           gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))',
//           gap: '1rem',
//           justifyItems: 'center',
//         }}
//       >
//         {blogList.map((blog) => (
//           <div
//             key={blog.id}
//             style={{
//               width: '120px',
//               height: '120px',
//               backgroundColor: 'rgba(255, 223, 0, 0.6)', // thick transparent yellow
//               borderRadius: '8px',
//               display: 'flex',
//               flexDirection: 'column',
//               justifyContent: 'space-between',
//               alignItems: 'center',
//               textAlign: 'center',
//               padding: '8px',
//               cursor: 'pointer',
//               boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
//               transition: 'transform 0.2s, box-shadow 0.2s',
//             }}
//             onMouseEnter={(e) => {
//               e.currentTarget.style.transform = 'scale(1.05)';
//               e.currentTarget.style.boxShadow = '0 6px 16px rgba(0,0,0,0.3)';
//             }}
//             onMouseLeave={(e) => {
//               e.currentTarget.style.transform = 'scale(1)';
//               e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.2)';
//             }}
//           >
//             <h4 style={{ fontSize: '12px', margin: '0', flexGrow: 1 }}>{blog.title}</h4>
//             <Link href={`/blogs/blog${blog.id}`}>
//               <button
//                 style={{
//                   padding: '4px 6px',
//                   fontSize: '10px',
//                   borderRadius: '4px',
//                   border: 'none',
//                   backgroundColor: '#0070f3',
//                   color: '#fff',
//                   cursor: 'pointer',
//                 }}
//               >
//                 Try Now
//               </button>
//             </Link>
//           </div>
//         ))}
//       </main>
//     </div>
//   );
// }

//code 4 works great.Plain.Simple.
'use client';

import { adList } from './components/adList';
import { blogList } from './components/blogList';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function HomePage() {
  const [scrollX, setScrollX] = useState(0);
  const [direction, setDirection] = useState(-1); // -1 = left, 1 = right

  useEffect(() => {
    const interval = setInterval(() => {
      setScrollX((prev) => {
        const newPos = prev + direction * 2; // adjust speed here
        const maxOffset = 0; // leftmost
        const minOffset = -1000; // rightmost, adjust based on total banner width

        // Reverse direction if reaching edges
        if (newPos <= minOffset) setDirection(1);
        else if (newPos >= maxOffset) setDirection(-1);

        return newPos;
      });
    }, 30);

    return () => clearInterval(interval);
  }, [direction]);

  return (
    // <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {/* Top Ads Banner */}
      <div
        style={{
          overflow: 'hidden',
          whiteSpace: 'nowrap',
          borderRadius: '8px',
          backgroundColor: '#f6f6f6', // same as page background
          padding: '4px 0',
          marginBottom: '2rem',
          position: 'relative',
        }}
      >
        <div
          style={{
            display: 'inline-flex',
            transform: `translateX(${scrollX}px)`,
            transition: 'transform 0.03s linear',
          }}
        >
          {adList.map((ad) => (
            <a
              key={ad.id}
              href={ad.productUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 10px',
                minWidth: '80px',
                height: '40px',
                backgroundColor: 'transparent',
                textDecoration: 'none',
                color: '#333',
                padding: '0px',
              }}
            >
              <img
                src={ad.imageUrl}
                alt={ad.name}
                style={{ maxHeight: '30px', objectFit: 'contain' }}
              />
            </a>
          ))}
        </div>
      </div>

      {/* Main Blogs */}
      <main
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))',
          gap: '1rem',
          justifyItems: 'center',
          maxWidth: '600px',
          width: '100%',
          margin: '0 auto', // centers grid horizontally
          paddingBottom: '2rem', // optional spacing before footer
        }}
      >
        {blogList.map((blog) => (
          <div
            key={blog.id}
            style={{
              width: '120px',
              height: '120px',
              backgroundColor: 'rgba(255, 223, 0, 0.6)', // transparent thick yellow
              borderRadius: '8px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              alignItems: 'center',
              textAlign: 'center',
              padding: '8px',
              cursor: 'pointer',
              boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
              transition: 'transform 0.2s, box-shadow 0.2s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.05)';
              e.currentTarget.style.boxShadow = '0 6px 16px rgba(0,0,0,0.3)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.2)';
            }}
          >
            <h4 style={{ fontSize: '12px', margin: '0', flexGrow: 1 }}>{blog.title}</h4>
            <Link href={`/blogs/blog${blog.id}`}>
              <button
                style={{
                  padding: '4px 6px',
                  fontSize: '10px',
                  borderRadius: '4px',
                  border: 'none',
                  backgroundColor: '#ffb005ff',
                  color: '#fff',
                  cursor: 'pointer',
                }}
              >
                Try Now
              </button>
            </Link>
          </div>
        ))}
      </main>
    </div>
  );
}

//code 4.5



//code 5 works but kinda ugly
// 'use client';

// import { adList } from './components/adList';
// import { blogList } from './components/blogList';
// import Link from 'next/link';
// import { useEffect, useState } from 'react';
// import Papa from 'papaparse';

// export default function HomePage() {
//   const [scrollX, setScrollX] = useState(0);
//   const [direction, setDirection] = useState(-1);
//   const [backgroundImages, setBackgroundImages] = useState([]);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setScrollX((prev) => {
//         const newPos = prev + direction * 2;
//         const maxOffset = 0;
//         const minOffset = -1000;

//         if (newPos <= minOffset) setDirection(1);
//         else if (newPos >= maxOffset) setDirection(-1);

//         return newPos;
//       });
//     }, 30);

//     return () => clearInterval(interval);
//   }, [direction]);

//   const normalize = (str) =>
//     str
//       .replace(/[–—]/g, '-') 
//       .replace(/[“”]/g, '"') 
//       .replace(/[?<>:"/\\|*]/g, '') 
//       .trim();

//   useEffect(() => {
//     let titles = {};

//     // 1️⃣ Load TitlesCSV to map story number -> EN title
//     fetch('/ActionCSV/TitlesCSV.csv')
//       .then(res => res.text())
//       .then(csvText => {
//         Papa.parse(csvText, {
//           header: true,
//           skipEmptyLines: true,
//           transformHeader: h => h.trim().toLowerCase(),
//           complete: result => {
//             result.data.forEach(row => {
//               titles[row.story] = normalize(row.en); // EN column for folder name
//             });

//             // 2️⃣ Load VocabularyCSV next
//             fetch('/ActionCSV/VocabularyCSV.csv')
//               .then(res2 => res2.text())
//               .then(csvText2 => {
//                 Papa.parse(csvText2, {
//                   header: true,
//                   skipEmptyLines: true,
//                   transformHeader: h => h.trim().toLowerCase(),
//                   complete: result2 => {
//                     const rows = result2.data.filter(r => r.story && r.file && r.en);
//                     const selected = [];

//                     for (let i = 0; i < 12; i++) {
//                       const random = rows[Math.floor(Math.random() * rows.length)];
//                       const storyNum = random.story;

//                       // Folder name comes from TitlesCSV using storyNum
//                       const folderTitle = titles[storyNum] || 'Unknown Story';
//                       const folderName = `${storyNum}. ${folderTitle}`;
//                       const encodedFolder = encodeURIComponent(folderName);

//                       // File name comes from VocabularyCSV
//                       const safeWord = normalize(random.en).replace(/\.+$/, '');
//                       const fileName = `${random.file}. ${safeWord}.jpg`;
//                       const encodedFileName = encodeURIComponent(fileName);

//                       selected.push(`/ActionStoriesPics/VocabPics/${encodedFolder}/${encodedFileName}`);
//                     }

//                     setBackgroundImages(selected);
//                   }
//                 });
//               });
//           }
//         });
//       });
//   }, []);

//   return (
//     <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
//       {/* Top Ads Banner */}
//       <div
//         style={{
//           overflow: 'hidden',
//           whiteSpace: 'nowrap',
//           borderRadius: '8px',
//           backgroundColor: '#f6f6f6',
//           padding: '4px 0',
//           marginBottom: '2rem',
//           position: 'relative',
//           zIndex: 2,
//         }}
//       >
//         <div
//           style={{
//             display: 'inline-flex',
//             transform: `translateX(${scrollX}px)`,
//             transition: 'transform 0.03s linear',
//           }}
//         >
//           {adList.map((ad) => (
//             <a
//               key={ad.id}
//               href={ad.productUrl}
//               target="_blank"
//               rel="noopener noreferrer"
//               style={{
//                 display: 'inline-flex',
//                 alignItems: 'center',
//                 justifyContent: 'center',
//                 margin: '0 10px',
//                 minWidth: '80px',
//                 height: '40px',
//                 backgroundColor: 'transparent',
//                 textDecoration: 'none',
//                 color: '#333',
//                 padding: '0px',
//               }}
//             >
//               <img
//                 src={ad.imageUrl}
//                 alt={ad.name}
//                 style={{ maxHeight: '30px', objectFit: 'contain' }}
//               />
//             </a>
//           ))}
//         </div>
//       </div>

//       {/* Main Blogs with light vocab image collage background */}
//       <div
//         style={{
//           position: 'relative',
//           flex: 1,
//           width: '100%',
//           display: 'flex',
//           justifyContent: 'center',
//           alignItems: 'flex-start',
//         }}
//       >
//         {/* Light blurred background */}
//         <div
//           style={{
//             position: 'absolute',
//             inset: 0,
//             overflow: 'hidden',
//             zIndex: 0,
//             display: 'flex',
//             flexWrap: 'wrap',
//             opacity: 0.3,
//             filter: 'blur(0px) brightness(1)',
//           }}
//         >
//           {backgroundImages.map((src, i) => (
//             <img
//               key={i}
//               src={src}
//               alt="vocab background"
//               style={{
//                 width: '25%',
//                 height: 'auto',
//                 objectFit: 'cover',
//               }}
//               onError={(e) => (e.currentTarget.style.display = 'none')}
//             />
//           ))}
//         </div>

//         {/* Blog grid */}
//         <main
//           style={{
//             display: 'grid',
//             gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))',
//             gap: '1rem',
//             justifyItems: 'center',
//             maxWidth: '600px',
//             width: '100%',
//             margin: '0 auto',
//             paddingBottom: '2rem',
//             position: 'relative',
//             zIndex: 1,
//           }}
//         >
//           {blogList.map((blog) => (
//             <div
//               key={blog.id}
//               style={{
//                 width: '120px',
//                 height: '120px',
//                 backgroundColor: 'rgba(255, 223, 0, 0.6)',
//                 borderRadius: '8px',
//                 display: 'flex',
//                 flexDirection: 'column',
//                 justifyContent: 'space-between',
//                 alignItems: 'center',
//                 textAlign: 'center',
//                 padding: '8px',
//                 cursor: 'pointer',
//                 boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
//                 transition: 'transform 0.2s, box-shadow 0.2s',
//               }}
//               onMouseEnter={(e) => {
//                 e.currentTarget.style.transform = 'scale(1.05)';
//                 e.currentTarget.style.boxShadow = '0 6px 16px rgba(0,0,0,0.3)';
//               }}
//               onMouseLeave={(e) => {
//                 e.currentTarget.style.transform = 'scale(1)';
//                 e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.2)';
//               }}
//             >
//               <h4 style={{ fontSize: '12px', margin: '0', flexGrow: 1 }}>{blog.title}</h4>
//               <Link href={`/blogs/blog${blog.id}`}>
//                 <button
//                   style={{
//                     padding: '4px 6px',
//                     fontSize: '10px',
//                     borderRadius: '4px',
//                     border: 'none',
//                     backgroundColor: '#ffb005ff',
//                     color: '#fff',
//                     cursor: 'pointer',
//                   }}
//                 >
//                   Try Now
//                 </button>
//               </Link>
//             </div>
//           ))}
//         </main>
//       </div>
//     </div>
//   );
// }

