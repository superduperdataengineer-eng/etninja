//code 4 works great.Plain.Simple.
// 'use client';

// import { adList } from './components/adList';
// import { blogList } from './components/blogList';
// import Link from 'next/link';
// import { useEffect, useState } from 'react';
// // import CharacterFBX from './components/CharacterFBX';
// import dynamic from 'next/dynamic';

// // Dynamically import with ssr: false
// const CharacterFBX = dynamic(() => import('./components/CharacterFBX'), { ssr: false });

// export default function HomePage() {
//   const [scrollX, setScrollX] = useState(0);
//   const [direction, setDirection] = useState(-1); // -1 = left, 1 = right

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setScrollX((prev) => {
//         const newPos = prev + direction * 2; // adjust speed here
//         const maxOffset = 0; // leftmost
//         const minOffset = -1000; // rightmost, adjust based on total banner width

//         // Reverse direction if reaching edges
//         if (newPos <= minOffset) setDirection(1);
//         else if (newPos >= maxOffset) setDirection(-1);

//         return newPos;
//       });
//     }, 30);

//     return () => clearInterval(interval);
//   }, [direction]);

//   return (
//     // <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
//     <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
//       {/* Top Ads Banner */}
//       <div
//         style={{
//           overflow: 'hidden',
//           whiteSpace: 'nowrap',
//           borderRadius: '8px',
//           backgroundColor: '#f6f6f6', // same as page background
//           padding: '4px 0',
//           marginBottom: '2rem',
//           position: 'relative',
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

//       {/* Main Blogs */}
//       <main
//         style={{
//           display: 'grid',
//           gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))',
//           gap: '1rem',
//           justifyItems: 'center',
//           maxWidth: '600px',
//           width: '100%',
//           margin: '0 auto', // centers grid horizontally
//           paddingBottom: '2rem', // optional spacing before footer
//         }}
//       >
//         {blogList.map((blog) => (
//           <div
//             key={blog.id}
//             style={{
//               width: '120px',
//               height: '120px',
//               backgroundColor: 'rgba(255, 223, 0, 0.6)', // transparent thick yellow
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
//                   backgroundColor: '#ffb005ff',
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
//             {/* Main Picture Below Blogs */}
//       <div style={{ display: 'flex', justifyContent: 'center', marginTop: '2rem', marginBottom: '2rem' }}>
//         <div
//           style={{
//             width: '100%',
//             maxWidth: '400px',
//             height: '400px',
//             marginTop: '2rem',
//             marginBottom: '2rem',
//           }}
//         >
//           <CharacterFBX />
//         </div>
//       </div>
//       {/* Inline styles for this page */}
//       <style jsx>{`
//         .responsive-wrapper {
//           max-width: 100%;
//           padding: 10px;
//           margin: 0 auto;
//           box-sizing: border-box;
//           display: flex;
//           flex-direction: column;
//           align-items: center;
//           justify-content: flex-start;
//         }

//         h1, p, button {
//           max-width: 100%;
//           text-align: center;
//         }

//         button {
//           margin-top: 10px;
//         }

//         /* Responsive tweaks */
//         @media (max-width: 768px) {
//           .responsive-wrapper {
//             padding: 5px;
//           }

//           h1 {
//             font-size: 1.2rem;
//           }

//           p, button {
//             font-size: 0.9rem;
//           }
//         }

//         @media (max-width: 480px) {
//           h1 {
//             font-size: 1rem;
//           }

//           p, button {
//             font-size: 0.8rem;
//           }
//         }
//       `}</style>
//     </div>
//   );
// }

//code 5 hides 3d on phone but wraps the fifth blog
// 'use client';

// import { adList } from './components/adList';
// import { blogList } from './components/blogList';
// import Link from 'next/link';
// import { useEffect, useState } from 'react';
// import dynamic from 'next/dynamic';

// // Dynamically import CharacterFBX with SSR disabled
// const CharacterFBX = dynamic(() => import('./components/CharacterFBX'), { ssr: false });

// export default function HomePage() {
//   const [scrollX, setScrollX] = useState(0);
//   const [direction, setDirection] = useState(-1); // -1 = left, 1 = right
//   const [isDesktop, setIsDesktop] = useState(true); // for showing 3D only on tablets/desktops

//   // Scroll banner effect
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setScrollX((prev) => {
//         const newPos = prev + direction * 2; // adjust speed
//         const maxOffset = 0;
//         const minOffset = -1000; // adjust based on banner width

//         if (newPos <= minOffset) setDirection(1);
//         else if (newPos >= maxOffset) setDirection(-1);

//         return newPos;
//       });
//     }, 30);

//     return () => clearInterval(interval);
//   }, [direction]);

//   // Detect screen width for 3D viewer
//   useEffect(() => {
//     const checkWidth = () => setIsDesktop(window.innerWidth > 480);
//     checkWidth();
//     window.addEventListener('resize', checkWidth);
//     return () => window.removeEventListener('resize', checkWidth);
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

//       {/* Main Blogs Grid */}
//       <main
//         style={{
//           display: 'grid',
//           gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))',
//           gap: '1rem',
//           justifyItems: 'center',
//           maxWidth: '600px',
//           width: '100%',
//           margin: '0 auto',
//           paddingBottom: '2rem',
//         }}
//       >
//         {blogList.map((blog) => (
//           <div
//             key={blog.id}
//             style={{
//               width: '120px',
//               height: '120px',
//               backgroundColor: 'rgba(255, 223, 0, 0.6)',
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
//                   backgroundColor: '#ffb005ff',
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

//       {/* 3D Character Viewer */}
//       <div style={{ display: 'flex', justifyContent: 'center', marginTop: '2rem', marginBottom: '2rem' }}>
//         <div style={{ width: '100%', maxWidth: '400px', height: '400px', marginTop: '2rem', marginBottom: '2rem' }}>
//           {isDesktop ? (
//             <CharacterFBX />
//           ) : (
//             <div style={{ textAlign: 'center', padding: '40px', fontSize: '16px', color: '#555' }}>
//               Sorry, this 3D viewer is only available on tablets and desktop.
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Page Styles */}
//       <style jsx>{`
//         .responsive-wrapper {
//           max-width: 100%;
//           padding: 10px;
//           margin: 0 auto;
//           box-sizing: border-box;
//           display: flex;
//           flex-direction: column;
//           align-items: center;
//           justify-content: flex-start;
//         }

//         h1,
//         p,
//         button {
//           max-width: 100%;
//           text-align: center;
//         }

//         button {
//           margin-top: 10px;
//         }

//         @media (max-width: 768px) {
//           .responsive-wrapper {
//             padding: 5px;
//           }

//           h1 {
//             font-size: 1.2rem;
//           }

//           p,
//           button {
//             font-size: 0.9rem;
//           }
//         }

//         @media (max-width: 480px) {
//           h1 {
//             font-size: 1rem;
//           }

//           p,
//           button {
//             font-size: 0.8rem;
//           }
//         }
//       `}</style>
//     </div>
//   );
// }

//code 6
// 'use client';

// import { adList } from './components/adList';
// import { blogList } from './components/blogList';
// import Link from 'next/link';
// import { useEffect, useState } from 'react';
// import dynamic from 'next/dynamic';

// // Dynamically import CharacterFBX with SSR disabled
// const CharacterFBX = dynamic(() => import('./components/CharacterFBX'), { ssr: false });

// export default function HomePage() {
//   const [scrollX, setScrollX] = useState(0);
//   const [direction, setDirection] = useState(-1); // -1 = left, 1 = right

//   // Scroll banner effect
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setScrollX((prev) => {
//         const newPos = prev + direction * 2; // adjust speed
//         const maxOffset = 0;
//         const minOffset = -1000; // adjust based on banner width

//         if (newPos <= minOffset) setDirection(1);
//         else if (newPos >= maxOffset) setDirection(-1);

//         return newPos;
//       });
//     }, 30);

//     return () => clearInterval(interval);
//   }, [direction]);

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

//       {/* Main Blogs Grid */}
//       <main
//         style={{
//           display: 'grid',
//           gridTemplateColumns: 'repeat(5, 1fr)', // desktop default
//           gap: '1rem',
//           justifyItems: 'center',
//           maxWidth: '1000px',
//           width: '100%',
//           margin: '0 auto',
//           paddingBottom: '4rem',
//         }}
//       >
//         {blogList.map((blog) => (
//           <div
//             key={blog.id}
//             style={{
//               width: '100%',
//               maxWidth: '160px',
//               height: '140px',
//               backgroundColor: 'rgba(255, 223, 0, 0.6)',
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
//                   backgroundColor: '#ffb005ff',
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

//       {/* 3D Character Viewer */}
//       <div
//         style={{
//           display: 'flex',
//           justifyContent: 'center',
//           marginTop: '2rem',
//           marginBottom: '2rem',
//           width: '100%',
//         }}
//       >
//         <div
//           style={{
//             width: '100%',
//             maxWidth: '400px',
//             aspectRatio: '1 / 1', // keeps square container
//           }}
//         >
//           <CharacterFBX />
//         </div>
//       </div>

//       {/* Page Styles */}
//       <style jsx>{`
//         .responsive-wrapper {
//           max-width: 100%;
//           padding: 10px;
//           margin: 0 auto;
//           box-sizing: border-box;
//           display: flex;
//           flex-direction: column;
//           align-items: center;
//           justify-content: flex-start;
//         }

//         h1,
//         p,
//         button {
//           max-width: 100%;
//           text-align: center;
//         }

//         button {
//           margin-top: 10px;
//         }

//         /* Responsive Blogs Grid */
//         @media (max-width: 768px) {
//           main {
//             grid-template-columns: repeat(3, 1fr); /* tablet: 3 per row */
//           }
//           .responsive-wrapper {
//             padding: 5px;
//           }

//           h1 {
//             font-size: 1.2rem;
//           }

//           p,
//           button {
//             font-size: 0.9rem;
//           }
//         }

//         @media (max-width: 480px) {
//           main {
//             grid-template-columns: repeat(1, 1fr); /* phone: 1 per row */
//           }
//           h1 {
//             font-size: 1rem;
//           }

//           p,
//           button {
//             font-size: 0.8rem;
//           }
//         }
//       `}</style>
//     </div>
//   );
// }

//code 7 works for computers not tablets or phones
'use client';

import { adList } from './components/adList';
import { blogList } from './components/blogList';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

// Dynamically import CharacterFBX with SSR disabled
const CharacterFBX = dynamic(() => import('./components/CharacterFBX'), { ssr: false });

export default function HomePage() {
  const [scrollX, setScrollX] = useState(0);
  const [direction, setDirection] = useState(-1); // -1 = left, 1 = right

  // Scroll banner effect
  useEffect(() => {
    const interval = setInterval(() => {
      setScrollX((prev) => {
        const newPos = prev + direction * 2; // adjust speed
        const maxOffset = 0;
        const minOffset = -1000; // adjust based on banner width

        if (newPos <= minOffset) setDirection(1);
        else if (newPos >= maxOffset) setDirection(-1);

        return newPos;
      });
    }, 30);

    return () => clearInterval(interval);
  }, [direction]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {/* Top Ads Banner */}
      <div
        style={{
          overflow: 'hidden',
          whiteSpace: 'nowrap',
          borderRadius: '8px',
          backgroundColor: '#f6f6f6',
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

      {/* Main Blogs Grid */}
      <main
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(5, 1fr)', // desktop default
          gap: '1rem',
          justifyItems: 'center',
          maxWidth: '1000px',
          width: '100%',
          margin: '0 auto',
          paddingBottom: '6rem',
        }}
      >
        {blogList.map((blog) => (
          <div
            key={blog.id}
            style={{
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

      {/* 3D Character Viewer + Buttons */}
      <div className="character-grid" style={{ display: 'flex', flexDirection: 'row', gap: '12px', justifyContent: 'center', marginBottom: '4rem' }}>
        {/* Canvas */}
        <div style={{ width: '100%', maxWidth: '400px', aspectRatio: '1 / 1' }}>
          <CharacterFBX />
        </div>

        {/* Buttons Placeholder */}
        <div className="button-columns" style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          {/* Replace with your button components or pass them as props */}
        </div>
      </div>

      {/* Page Styles */}
      <style jsx>{`
        h1,
        p,
        button {
          max-width: 100%;
          text-align: center;
        }

        button {
          margin-top: 10px;
        }

        /* Responsive Blogs Grid */
        @media (max-width: 1024px) {
          main {
            grid-template-columns: repeat(2, 1fr); /* tablets: 2 per row */
          }

          .character-grid {
            flex-direction: column; /* stack canvas above buttons */
            align-items: center;
          }

          .button-columns {
            flex-direction: row;
            flex-wrap: wrap;
            justify-content: center;
            gap: 6px;
            margin-top: 12px;
          }
        }

        @media (max-width: 480px) {
          main {
            grid-template-columns: repeat(2, 1fr); /* phones: 2 per row */
          }

          .character-grid {
            flex-direction: column;
            align-items: center;
          }

          .button-columns {
            flex-direction: column; /* stack buttons vertically under canvas */
            gap: 6px;
            margin-top: 12px;
          }
        }
      `}</style>
    </div>
  );
}

//CODE 8
// 'use client';

// import dynamic from 'next/dynamic';

// // Dynamically import the full homepage as a client component
// const HomePageClient = dynamic(() => import('./HomePageClient'), { ssr: false });

// export default function Page() {
//   return <HomePageClient />;
// }
