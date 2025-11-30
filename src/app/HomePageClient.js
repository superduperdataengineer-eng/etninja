// // 'use client';

// // import { adList } from './components/adList';
// // import { blogList } from './components/blogList';
// // import Link from 'next/link';
// // import { useEffect, useState } from 'react';
// // import dynamic from 'next/dynamic';

// // const CharacterFBX = dynamic(() => import('./components/CharacterFBX'), { ssr: false });

// // export default function HomePage() {
// //   const [scrollX, setScrollX] = useState(0);
// //   const [direction, setDirection] = useState(-1); // -1 = left, 1 = right

// //   // Scroll banner effect
// //   useEffect(() => {
// //     const interval = setInterval(() => {
// //       setScrollX((prev) => {
// //         const newPos = prev + direction * 2;
// //         if (newPos <= -1000) setDirection(1);
// //         else if (newPos >= 0) setDirection(-1);
// //         return newPos;
// //       });
// //     }, 30);

// //     return () => clearInterval(interval);
// //   }, [direction]);

// //   return (
// //     <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
// //       {/* Top Ads Banner */}
// //       <div style={{ overflow: 'hidden', whiteSpace: 'nowrap', borderRadius: '8px', backgroundColor: '#f6f6f6', padding: '4px 0', marginBottom: '2rem', position: 'relative' }}>
// //         <div style={{ display: 'inline-flex', transform: `translateX(${scrollX}px)`, transition: 'transform 0.03s linear' }}>
// //           {adList.map((ad) => (
// //             <a key={ad.id} href={ad.productUrl} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', margin: '0 10px', minWidth: '80px', height: '40px' }}>
// //               <img src={ad.imageUrl} alt={ad.name} style={{ maxHeight: '30px', objectFit: 'contain' }} />
// //             </a>
// //           ))}
// //         </div>
// //       </div>

// //       {/* Main Blogs Grid */}
// //       <main style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '1rem', justifyItems: 'center', maxWidth: '1000px', width: '100%', margin: '0 auto', paddingBottom: '6rem' }}>
// //         {blogList.map((blog) => (
// //           <div key={blog.id} style={{ width: '100%', maxWidth: '160px', height: '140px', backgroundColor: 'rgba(255, 223, 0, 0.6)', borderRadius: '8px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center', textAlign: 'center', padding: '8px', cursor: 'pointer', boxShadow: '0 4px 12px rgba(0,0,0,0.2)', transition: 'transform 0.2s, box-shadow 0.2s' }}>
// //             <h4 style={{ fontSize: '12px', margin: '0', flexGrow: 1 }}>{blog.title}</h4>

// //             {/* Yellow button row */}
// //             <div style={{ display: 'flex', gap: '4px', marginTop: '6px' }}>
// //               <div style={{ backgroundColor: 'none', padding: '4px 8px', borderRadius: '4px' }}>
// //                 <Link href={`/blogs/blog${blog.id}`}>
// //                   <button style={{ border: 'none', backgroundColor: 'orange', cursor: 'pointer', fontSize: '10px' }}>Try Now</button>
// //                 </Link>
// //               </div>
// //             </div>

// //           </div>
// //         ))}
// //       </main>

// //       {/* 3D Character Viewer + Buttons */}
// //       <div className="character-grid" style={{ display: 'flex', flexDirection: 'row', gap: '12px', justifyContent: 'center', marginBottom: '4rem' }}>
// //         <div style={{ width: '100%', maxWidth: '400px', aspectRatio: '1 / 1' }}>
// //           <CharacterFBX />
// //         </div>
        
// //       </div>
// //     </div>
// //   );
// // }


// //code 2
// 'use client';

// import { adList } from './components/adList';
// import { blogList } from './components/blogList';
// import Link from 'next/link';
// import { useEffect, useState } from 'react';
// import dynamic from 'next/dynamic';

// const CharacterFBX = dynamic(() => import('./components/CharacterFBX'), { ssr: false });

// export default function HomePage() {
//   const [scrollX, setScrollX] = useState(0);
//   const [direction, setDirection] = useState(-1); // -1 = left, 1 = right

//   // Scroll banner effect
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setScrollX((prev) => {
//         const newPos = prev + direction * 2;
//         if (newPos <= -1000) setDirection(1);
//         else if (newPos >= 0) setDirection(-1);
//         return newPos;
//       });
//     }, 30);

//     return () => clearInterval(interval);
//   }, [direction]);

//   return (
//     <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
//       {/* Top Ads Banner */}
//       <div style={{ overflow: 'hidden', whiteSpace: 'nowrap', borderRadius: '8px', backgroundColor: '#f6f6f6', padding: '4px 0', marginBottom: '2rem', position: 'relative' }}>
//         <div style={{ display: 'inline-flex', transform: `translateX(${scrollX}px)`, transition: 'transform 0.03s linear' }}>
//           {adList.map((ad) => (
//             <a key={ad.id} href={ad.productUrl} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', margin: '0 10px', minWidth: '80px', height: '40px' }}>
//               <img src={ad.imageUrl} alt={ad.name} style={{ maxHeight: '30px', objectFit: 'contain' }} />
//             </a>
//           ))}
//         </div>
//       </div>

//       {/* Main Blogs Grid */}
//       <main style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '1rem', justifyItems: 'center', maxWidth: '1000px', width: '100%', margin: '0 auto', paddingBottom: '6rem' }}>
//         {blogList.map((blog) => (
//           <div key={blog.id} style={{ width: '100%', maxWidth: '160px', height: '140px', backgroundColor: 'rgba(255, 223, 0, 0.6)', borderRadius: '8px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center', textAlign: 'center', padding: '8px', cursor: 'pointer', boxShadow: '0 4px 12px rgba(0,0,0,0.2)', transition: 'transform 0.2s, box-shadow 0.2s' }}>
//             <h4 style={{ fontSize: '12px', margin: '0', flexGrow: 1 }}>{blog.title}</h4>

//             {/* Yellow button row */}
//             <div style={{ display: 'flex', gap: '4px', marginTop: '6px' }}>
//               <div style={{ backgroundColor: 'none', padding: '4px 8px', borderRadius: '4px' }}>
//                 <Link href={`/blogs/blog${blog.id}`}>
//                   <button style={{ border: 'none', backgroundColor: 'orange', cursor: 'pointer', fontSize: '10px' }}>Try Now</button>
//                 </Link>
//               </div>
//             </div>

//           </div>
//         ))}
//       </main>

//       {/* 3D Character Viewer + Buttons */}
//       <div className="character-grid" style={{ display: 'flex', flexDirection: 'row', gap: '12px', justifyContent: 'center', marginBottom: '4rem' }}>
//         <div style={{ width: '100%', maxWidth: '400px', aspectRatio: '1 / 1' }}>
//           <CharacterFBX />
//         </div>
        
//       </div>
//     </div>
//   );
// }


//code 3 need a lot of work for tablets and phones/ good for computers
// 'use client';

// import { adList } from './components/adList';
// import { blogList } from './components/blogList';
// import Link from 'next/link';
// import { useEffect, useState } from 'react';
// import dynamic from 'next/dynamic';

// const CharacterFBX = dynamic(() => import('./components/CharacterFBX'), { ssr: false });

// export default function HomePage() {
//   const [scrollX, setScrollX] = useState(0);
//   const [direction, setDirection] = useState(-1); // -1 = left, 1 = right

//   // Scroll banner effect
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setScrollX((prev) => {
//         const newPos = prev + direction * 2;
//         if (newPos <= -1000) setDirection(1);
//         else if (newPos >= 0) setDirection(-1);
//         return newPos;
//       });
//     }, 30);

//     return () => clearInterval(interval);
//   }, [direction]);

//   return (
//     <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', padding: '0 1rem' }}>
//       {/* Top Ads Banner */}
//       <div style={{
//         overflow: 'hidden',
//         whiteSpace: 'nowrap',
//         borderRadius: '8px',
//         backgroundColor: '#f6f6f6',
//         padding: '4px 0',
//         marginBottom: '2rem',
//         position: 'relative'
//       }}>
//         <div style={{
//           display: 'inline-flex',
//           transform: `translateX(${scrollX}px)`,
//           transition: 'transform 0.03s linear'
//         }}>
//           {adList.map((ad) => (
//             <a key={ad.id} href={ad.productUrl} target="_blank" rel="noopener noreferrer"
//                style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', margin: '0 10px', minWidth: '80px', height: '40px' }}>
//               <img src={ad.imageUrl} alt={ad.name} style={{ maxHeight: '30px', objectFit: 'contain' }} />
//             </a>
//           ))}
//         </div>
//       </div>

//       {/* Main Blogs Grid */}
//       <main style={{
//         display: 'grid',
//         gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
//         gap: '1rem',
//         justifyItems: 'center',
//         maxWidth: '1200px',
//         width: '100%',
//         margin: '0 auto',
//         paddingBottom: '6rem'
//       }}>
//         {blogList.map((blog) => (
//           <div key={blog.id} style={{
//             width: '100%',
//             maxWidth: '160px',
//             height: '140px',
//             backgroundColor: 'rgba(255, 223, 0, 0.6)',
//             borderRadius: '8px',
//             display: 'flex',
//             flexDirection: 'column',
//             justifyContent: 'space-between',
//             alignItems: 'center',
//             textAlign: 'center',
//             padding: '8px',
//             cursor: 'pointer',
//             boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
//             transition: 'transform 0.2s, box-shadow 0.2s'
//           }}>
//             <h4 style={{ fontSize: '12px', margin: '0', flexGrow: 1 }}>{blog.title}</h4>
//             <div style={{ display: 'flex', gap: '4px', marginTop: '6px' }}>
//               <div style={{ padding: '4px 8px', borderRadius: '4px' }}>
//                 <Link href={`/blogs/blog${blog.id}`}>
//                   <button style={{ border: 'none', backgroundColor: 'orange', cursor: 'pointer', fontSize: '10px' }}>Try Now</button>
//                 </Link>
//               </div>
//             </div>
//           </div>
//         ))}
//       </main>

//       {/* 3D Character Viewer */}
//       <div className="character-grid" style={{
//         display: 'flex',
//         flexDirection: 'row',
//         gap: '12px',
//         justifyContent: 'center',
//         flexWrap: 'wrap',
//         marginBottom: '4rem'
//       }}>
//         <div style={{ width: '100%', maxWidth: '400px', aspectRatio: '1 / 1' }}>
//           <CharacterFBX />
//         </div>
//       </div>
//     </div>
//   );
// }


//code 4
'use client';

import { adList } from './components/adList';
import { blogList } from './components/blogList';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

const CharacterFBX = dynamic(() => import('./components/CharacterFBX'), { ssr: false });

export default function HomePage() {
  const [scrollX, setScrollX] = useState(0);
  const [direction, setDirection] = useState(-1); // -1 = left, 1 = right

  // Scroll banner effect
  useEffect(() => {
    const interval = setInterval(() => {
      setScrollX((prev) => {
        const newPos = prev + direction * 2;
        if (newPos <= -1000) setDirection(1);
        else if (newPos >= 0) setDirection(-1);
        return newPos;
      });
    }, 30);

    return () => clearInterval(interval);
  }, [direction]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', padding: '0 1rem' }}>
      {/* Top Ads Banner */}
      <div style={{
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        borderRadius: '8px',
        backgroundColor: '#f6f6f6',
        padding: '4px 0',
        marginBottom: '2rem',
        position: 'relative'
      }}>
        <div style={{
          display: 'inline-flex',
          transform: `translateX(${scrollX}px)`,
          transition: 'transform 0.03s linear'
        }}>
          {adList.map((ad) => (
            <a key={ad.id} href={ad.productUrl} target="_blank" rel="noopener noreferrer"
               style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', margin: '0 10px', minWidth: '80px', height: '40px' }}>
              <img src={ad.imageUrl} alt={ad.name} style={{ maxHeight: '30px', objectFit: 'contain' }} />
            </a>
          ))}
        </div>
      </div>

      {/* Main Blogs Grid */}
      <main style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
        gap: '1rem',
        justifyItems: 'center',
        maxWidth: '1200px',
        width: '100%',
        margin: '0 auto',
        paddingBottom: '6rem'
      }}>
        {blogList.map((blog) => (
          <div key={blog.id} style={{
            width: '100%',
            maxWidth: '160px',
            height: '140px',
            backgroundColor: 'rgba(255, 223, 0, 0.6)',
            borderRadius: '8px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'center',
            textAlign: 'center',
            padding: '8px',
            cursor: 'pointer',
            boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
            transition: 'transform 0.2s, box-shadow 0.2s'
          }}>
            <h4 style={{ fontSize: '12px', margin: '0', flexGrow: 1 }}>{blog.title}</h4>
            <div style={{ display: 'flex', gap: '4px', marginTop: '6px' }}>
              <div style={{ padding: '4px 8px', borderRadius: '4px' }}>
                <Link href={`/blogs/blog${blog.id}`}>
                  <button style={{ border: 'none', backgroundColor: 'orange', cursor: 'pointer', fontSize: '10px' }}>Try Now</button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </main>

      {/* 3D Character Viewer + Buttons */}
      <div className="character-grid" style={{
        display: 'flex',
        flexDirection: 'row',
        gap: '12px',
        justifyContent: 'center',
        alignItems: 'center',
        flexWrap: 'wrap',
        marginBottom: '4rem'
      }}>
        

        {/* Character */}
        <div style={{ width: '100%', maxWidth: '400px', aspectRatio: '1 / 1' }}>
          <CharacterFBX />
        </div>

        
      </div>

      {/* Responsive styles for tablets and mobiles */}
      <style jsx>{`
        /* Tablet layout: max-width 1024px */
        @media (max-width: 1024px) {
          .character-grid {
            flex-direction: column;
            align-items: center;
          }

          .left-btn, .right-btn {
            display: none; /* hide initially */
            margin: 8px 0;
          }

          /* Show buttons underneath the character */
          .character-grid button {
            display: inline-block;
          }
        }

        /* Mobile layout: max-width 600px */
        @media (max-width: 600px) {
          .character-grid button {
            width: 80%;
            max-width: 200px;
            text-align: center;
          }
        }
      `}</style>
    </div>
  );
}
