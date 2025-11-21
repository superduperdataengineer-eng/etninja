// // 'use client';

// // import { useState, useEffect } from 'react';

// // export default function Navbar() {
// //   const [open, setOpen] = useState(false);
// //   const [mounted, setMounted] = useState(false);

// //   useEffect(()=> {
// //     setMounted(true);
// //   },[]);

// //   if (!mounted) return null;

// //   return (
// //     <nav
// //       style={{
// //         background: 'linear-gradient(90deg, #FFD700, #FFC300)',
// //         color: '#000',
// //         padding: '0.75rem 1rem',
// //         display: 'flex',
// //         justifyContent: 'space-between',
// //         alignItems: 'center',
// //         flexWrap: 'wrap',
// //         position: 'sticky',
// //         top: 0,
// //         zIndex: 1000,
// //         boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
// //       }}
// //     >
// //       <button
// //         onClick={() => setOpen(!open)}
// //         className="menu-toggle"
// //         style={{
// //           background: 'none',
// //           border: 'none',
// //           color: '#000',
// //           fontSize: '1.8rem',
// //           cursor: 'pointer',
// //           display: 'none',
// //         }}
// //       >
// //         ☰
// //       </button>

// //       <div className="left-links">
// //           <a href="/" className="nav-link">HOME</a>
// //       </div>

// //       <div className={`menu-links ${open ? 'open' : ''}`}>

// //         {/* Right links */}
// //         <div className="right-links">
// //           <a href="#" className="nav-link">SIGN IN</a>    
// //           <a href="#" className="nav-link"> SIGN UP</a>
// //         </div>
// //       </div>

// //       <style jsx>{`
// //         .menu-links {
// //           display: flex;
// //           justify-content: space-between;
// //           align-items: center;
// //           width: 100%;
// //           gap: 1rem;
// //         }

// //         .left-links, .right-links {
// //           display: flex;
// //           gap: 1rem;
// //         }

// //         .nav-link {
// //           color: #000;
// //           text-decoration: none;
// //           font-weight: 500;
// //         }

// //         .nav-link:hover {
// //           text-decoration: underline;
// //         }

// //         @media (max-width: 768px) {
// //           .menu-toggle {
// //             display: block;
// //           }

// //           .menu-links {
// //             display: none;
// //             flex-direction: column;
// //             gap: 0.5rem;
// //           }

// //           .menu-links.open {
// //             display: flex;
// //           }

// //           .left-links, .right-links {
// //             flex-direction: column;
// //             align-items: flex-start;
// //           }
// //         }
// //       `}</style>
// //     </nav>
// //   );
// // }

// //code 2
// // 'use client';

// // import { useState, useEffect } from 'react';

// // export default function Navbar() {
// //   const [open, setOpen] = useState(false);
// //   const [scrolled, setScrolled] = useState(false);

// //   useEffect(() => {
// //     const handleScroll = () => {
// //       setScrolled(window.scrollY > 20);
// //     };
// //     window.addEventListener('scroll', handleScroll);
// //     return () => window.removeEventListener('scroll', handleScroll);
// //   }, []);

// //   return (
// //     <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
// //       <div className="logo">TEACHTUDOR</div>
// //       <div className={`links ${open ? 'open' : ''}`}>
// //         <a href="/">HOME</a>
// //         <a href="#">SIGN IN</a>
// //         <a href="#">SIGN UP</a>
// //       </div>
// //       <button className={`hamburger ${open ? 'open' : ''}`} onClick={() => setOpen(!open)}>
// //         <span></span>
// //         <span></span>
// //         <span></span>
// //       </button>

// //       <style jsx>{`
// //         .navbar {
// //           position: sticky;
// //           top: 0;
// //           display: flex;
// //           justify-content: space-between;
// //           align-items: center;
// //           padding: 0.75rem 1rem;
// //           backdrop-filter: blur(8px);
// //           background-color: rgba(255, 223, 0, 0.8);
// //           transition: all 0.3s ease;
// //           z-index: 1000;
// //           box-shadow: 0 2px 8px rgba(0,0,0,0.1);
// //         }

// //         .navbar.scrolled {
// //           backdrop-filter: blur(12px);
// //           box-shadow: 0 4px 16px rgba(0,0,0,0.15);
// //         }

// //         .logo {
// //           font-weight: bold;
// //           font-size: 1.5rem;
// //           cursor: pointer;
// //           transition: transform 0.3s;
// //         }

// //         .logo:hover {
// //           transform: scale(1.05);
// //         }

// //         .links {
// //           display: flex;
// //           gap: 1rem;
// //         }

// //         .links a {
// //           position: relative;
// //           text-decoration: none;
// //           font-weight: 500;
// //           color: #000;
// //           padding: 0.25rem 0;
// //           transition: color 0.2s;
// //         }

// //         .links a::after {
// //           content: '';
// //           position: absolute;
// //           left: 0;
// //           bottom: -2px;
// //           width: 0;
// //           height: 2px;
// //           background-color: #000;
// //           transition: width 0.3s ease;
// //         }

// //         .links a:hover::after {
// //           width: 100%;
// //         }

// //         .hamburger {
// //           display: none;
// //           flex-direction: column;
// //           justify-content: space-between;
// //           width: 24px;
// //           height: 20px;
// //           background: none;
// //           border: none;
// //           cursor: pointer;
// //           padding: 0;
// //         }

// //         .hamburger span {
// //           height: 2px;
// //           width: 100%;
// //           background: #000;
// //           border-radius: 2px;
// //           transition: all 0.3s ease;
// //         }

// //         .hamburger.open span:nth-child(1) {
// //           transform: rotate(45deg) translate(5px, 5px);
// //         }

// //         .hamburger.open span:nth-child(2) {
// //           opacity: 0;
// //         }

// //         .hamburger.open span:nth-child(3) {
// //           transform: rotate(-45deg) translate(5px, -5px);
// //         }

// //         @media (max-width: 768px) {
// //           .hamburger { display: flex; }
// //           .links {
// //             position: fixed;
// //             top: 0;
// //             right: ${open ? '0' : '-100%'};
// //             height: 100vh;
// //             width: 250px;
// //             background: rgba(255, 223, 0, 0.95);
// //             flex-direction: column;
// //             align-items: center;
// //             justify-content: center;
// //             gap: 2rem;
// //             transition: right 0.3s ease;
// //             z-index: 999;
// //           }
// //         }
// //       `}</style>
// //     </nav>
// //   );
// // }

// 'use client';

// import { useState, useEffect } from 'react';

// export default function Navbar() {
//   const [open, setOpen] = useState(false);
//   const [scrolled, setScrolled] = useState(false);

//   useEffect(() => {
//     const handleScroll = () => {
//       setScrolled(window.scrollY > 20);
//     };
//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   return (
//     <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
//       <div className="logo">TEACHTUDOR</div>
//       <div className={`links ${open ? 'open' : ''}`}>
//         <a href="/">HOME</a>
//         <a href="#">SIGN IN</a>
//         <a href="#">SIGN UP</a>
//       </div>
//       <button className={`hamburger ${open ? 'open' : ''}`} onClick={() => setOpen(!open)}>
//         <span></span>
//         <span></span>
//         <span></span>
//       </button>

//       <style jsx>{`
//         .navbar {
//           position: sticky;
//           top: 0;
//           display: flex;
//           justify-content: space-between;
//           align-items: center;
//           padding: 0.75rem 1rem;
//           backdrop-filter: blur(8px);
//           background: linear-gradient(90deg, #fff79a, #f3c200, #b8860b); /* light yellow → dark yellow */
//           transition: all 0.3s ease;
//           z-index: 1000;
//           box-shadow: 0 2px 8px rgba(0,0,0,0.1);
//         }

//         .navbar.scrolled {
//           backdrop-filter: blur(12px);
//           box-shadow: 0 4px 16px rgba(0,0,0,0.15);
//         }

//         .logo {
//           font-weight: bold;
//           font-size: 1.5rem;
//           cursor: pointer;
//           transition: transform 0.3s;
//         }

//         .logo:hover {
//           transform: scale(1.05);
//         }

//         .links {
//           display: flex;
//           gap: 1rem;
//         }

//         .links a {
//           position: relative;
//           text-decoration: none;
//           font-weight: 500;
//           color: #000;
//           padding: 0.25rem 0;
//           transition: color 0.2s;
//         }

//         .links a::after {
//           content: '';
//           position: absolute;
//           left: 0;
//           bottom: -2px;
//           width: 0;
//           height: 2px;
//           background-color: #000;
//           transition: width 0.3s ease;
//         }

//         .links a:hover::after {
//           width: 100%;
//         }

//         .hamburger {
//           display: none;
//           flex-direction: column;
//           justify-content: space-between;
//           width: 24px;
//           height: 20px;
//           background: none;
//           border: none;
//           cursor: pointer;
//           padding: 0;
//         }

//         .hamburger span {
//           height: 2px;
//           width: 100%;
//           background: #000;
//           border-radius: 2px;
//           transition: all 0.3s ease;
//         }

//         .hamburger.open span:nth-child(1) {
//           transform: rotate(45deg) translate(5px, 5px);
//         }

//         .hamburger.open span:nth-child(2) {
//           opacity: 0;
//         }

//         .hamburger.open span:nth-child(3) {
//           transform: rotate(-45deg) translate(5px, -5px);
//         }

//         @media (max-width: 768px) {
//           .hamburger { display: flex; }
//           .links {
//             position: fixed;
//             top: 0;
//             right: ${open ? '0' : '-100%'};
//             height: 100vh;
//             width: 250px;
//             background: linear-gradient(180deg, #fff79a, #f3c200, #b8860b); /* gradient for mobile menu */
//             flex-direction: column;
//             align-items: center;
//             justify-content: center;
//             gap: 2rem;
//             transition: right 0.3s ease;
//             z-index: 999;
//           }
//         }
//       `}</style>
//     </nav>
//   );
// }


//CODE 2 works great sign in and sign up screwed up
// 'use client';

// import { useState, useEffect } from 'react';

// export default function Navbar() {
//   const [open, setOpen] = useState(false);
//   const [scrolled, setScrolled] = useState(false);
//   const [mounted, setMounted] = useState(false);

//   useEffect(() => {
//     setMounted(true);
//     const handleScroll = () => {
//       setScrolled(window.scrollY > 20);
//     };
//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   if (!mounted) return null; // prevent hydration mismatch

//   return (
//     <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
//       <div className="logo">TEACHTUDOR</div>

//       <div className={`links ${open ? 'open' : ''}`}>
//         <a href="/">HOME</a>
//         <a href="#">SIGN IN</a>
//         <a href="#">SIGN UP</a>
//       </div>

//       <button
//         className={`hamburger ${open ? 'open' : ''}`}
//         onClick={() => setOpen(!open)}
//         aria-label="Toggle menu"
//       >
//         <span></span>
//         <span></span>
//         <span></span>
//       </button>

//       <style jsx>{`
//         .navbar {
//           position: sticky;
//           top: 0;
//           display: flex;
//           justify-content: space-between;
//           align-items: center;
//           padding: 0.75rem 1rem;
//           backdrop-filter: blur(8px);
//           background: linear-gradient(90deg, #fff79a, #f3c200, #b8860b);
//           transition: all 0.3s ease;
//           z-index: 1000;
//           box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
//         }

//         .navbar.scrolled {
//           backdrop-filter: blur(12px);
//           box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
//         }

//         .logo {
//           font-weight: bold;
//           font-size: 1.5rem;
//           cursor: pointer;
//           transition: transform 0.3s;
//         }

//         .logo:hover {
//           transform: scale(1.05);
//         }

//         .links {
//           display: flex;
//           gap: 1rem;
//         }

//         .links a {
//           position: relative;
//           text-decoration: none;
//           font-weight: 500;
//           color: #000;
//           padding: 0.25rem 0;
//           transition: color 0.2s;
//         }

//         .links a::after {
//           content: '';
//           position: absolute;
//           left: 0;
//           bottom: -2px;
//           width: 0;
//           height: 2px;
//           background-color: #000;
//           transition: width 0.3s ease;
//         }

//         .links a:hover::after {
//           width: 100%;
//         }

//         .hamburger {
//           display: none;
//           flex-direction: column;
//           justify-content: space-between;
//           width: 24px;
//           height: 20px;
//           background: none;
//           border: none;
//           cursor: pointer;
//           padding: 0;
//         }

//         .hamburger span {
//           height: 2px;
//           width: 100%;
//           background: #000;
//           border-radius: 2px;
//           transition: all 0.3s ease;
//         }

//         .hamburger.open span:nth-child(1) {
//           transform: rotate(45deg) translate(5px, 5px);
//         }

//         .hamburger.open span:nth-child(2) {
//           opacity: 0;
//         }

//         .hamburger.open span:nth-child(3) {
//           transform: rotate(-45deg) translate(5px, -5px);
//         }

//         @media (max-width: 768px) {
//           .hamburger {
//             display: flex;
//           }

//           .links {
//             position: fixed;
//             top: 0;
//             right: ${open ? '0' : '-100%'};
//             height: 100vh;
//             width: 250px;
//             background: linear-gradient(180deg, #fff79a, #f3c200, #b8860b);
//             flex-direction: column;
//             align-items: center;
//             justify-content: center;
//             gap: 2rem;
//             transition: right 0.3s ease;
//             z-index: 999;
//           }
//         }
//       `}</style>
//     </nav>
//   );
// }


//code 3 works good not fully functional
// 'use client';

// import { useState, useEffect } from 'react';

// export default function Navbar() {
//   const [open, setOpen] = useState(false);
//   const [scrolled, setScrolled] = useState(false);
//   const [mounted, setMounted] = useState(false);
//   const [showSignIn, setShowSignIn] = useState(false);
//   const [showSignUp, setShowSignUp] = useState(false);

//   useEffect(() => {
//     setMounted(true);
//     const handleScroll = () => setScrolled(window.scrollY > 20);
//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   if (!mounted) return null;

//   return (
//     <>
//       <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
//         <div className="logo">TEACHTUDOR</div>

//         <div className={`links ${open ? 'open' : ''}`}>
//           <a href="/">HOME</a>
//           <a href="#" onClick={() => setShowSignIn(true)}>SIGN IN</a>
//           <a href="#" onClick={() => setShowSignUp(true)}>SIGN UP</a>
//         </div>

//         <button
//           className={`hamburger ${open ? 'open' : ''}`}
//           onClick={() => setOpen(!open)}
//           aria-label="Toggle menu"
//         >
//           <span></span>
//           <span></span>
//           <span></span>
//         </button>
//       </nav>

//       {/* Sign In Modal */}
//       {showSignIn && (
//         <div className="modal-overlay" onClick={() => setShowSignIn(false)}>
//           <div className="modal" onClick={e => e.stopPropagation()}>
//             <h2>Sign In</h2>
//             <input type="email" placeholder="Email" />
//             <input type="password" placeholder="Password" />
//             <button>Sign In</button>
//             <p>
//               Don't have an account?{' '}
//               <span onClick={() => { setShowSignIn(false); setShowSignUp(true); }}>
//                 Sign Up
//               </span>
//             </p>
//           </div>
//         </div>
//       )}

//       {/* Sign Up Modal */}
//       {showSignUp && (
//         <div className="modal-overlay" onClick={() => setShowSignUp(false)}>
//           <div className="modal" onClick={e => e.stopPropagation()}>
//             <h2>Sign Up</h2>
//             <input type="text" placeholder="Name" />
//             <input type="email" placeholder="Email" />
//             <input type="password" placeholder="Password" />
//             <button>Sign Up</button>
//             <p>
//               Already have an account?{' '}
//               <span onClick={() => { setShowSignUp(false); setShowSignIn(true); }}>
//                 Sign In
//               </span>
//             </p>
//           </div>
//         </div>
//       )}

//       {/* MERGED CSS */}
//       <style jsx>{`
//         .navbar {
//           position: sticky;
//           top: 0;
//           display: flex;
//           justify-content: space-between;
//           align-items: center;
//           padding: 0.75rem 1rem;
//           backdrop-filter: blur(8px);
//           background: linear-gradient(90deg, #fff79a, #f3c200, #b8860b);
//           transition: all 0.3s ease;
//           z-index: 1000;
//           box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
//         }
//         .navbar.scrolled {
//           backdrop-filter: blur(12px);
//           box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
//         }
//         .logo { font-weight: bold; font-size: 1.5rem; cursor: pointer; transition: transform 0.3s; }
//         .logo:hover { transform: scale(1.05); }
//         .links { display: flex; gap: 1rem; }
//         .links a {
//           position: relative;
//           text-decoration: none;
//           font-weight: 500;
//           color: #000;
//           padding: 0.25rem 0;
//           transition: color 0.2s;
//         }
//         .links a::after {
//           content: '';
//           position: absolute;
//           left: 0;
//           bottom: -2px;
//           width: 0;
//           height: 2px;
//           background-color: #000;
//           transition: width 0.3s ease;
//         }
//         .links a:hover::after { width: 100%; }
//         .hamburger {
//           display: none;
//           flex-direction: column;
//           justify-content: space-between;
//           width: 24px;
//           height: 20px;
//           background: none;
//           border: none;
//           cursor: pointer;
//           padding: 0;
//         }
//         .hamburger span {
//           height: 2px;
//           width: 100%;
//           background: #000;
//           border-radius: 2px;
//           transition: all 0.3s ease;
//         }
//         .hamburger.open span:nth-child(1) { transform: rotate(45deg) translate(5px, 5px); }
//         .hamburger.open span:nth-child(2) { opacity: 0; }
//         .hamburger.open span:nth-child(3) { transform: rotate(-45deg) translate(5px, -5px); }
//         @media (max-width: 768px) {
//           .hamburger { display: flex; }
//           .links {
//             position: fixed;
//             top: 0;
//             right: ${open ? '0' : '-100%'};
//             height: 100vh;
//             width: 250px;
//             background: linear-gradient(180deg, #fff79a, #f3c200, #b8860b);
//             flex-direction: column;
//             align-items: center;
//             justify-content: center;
//             gap: 2rem;
//             transition: right 0.3s ease;
//             z-index: 999;
//           }
//         }

//         /* MODALS */
//         .modal-overlay {
//           position: fixed;
//           inset: 0;
//           backdrop-filter: blur(6px);
//           background: rgba(0,0,0,0.4);
//           display: flex;
//           justify-content: center;
//           align-items: flex-start;
//           padding-top: 5%;
//           z-index: 2000;
//           animation: fadeIn 0.3s ease;
//         }
//         .modal {
//           background: #fff;
//           padding: 2rem;
//           border-radius: 16px;
//           width: 90%;
//           max-width: 400px;
//           box-shadow: 0 12px 30px rgba(0,0,0,0.3);
//           display: flex;
//           flex-direction: column;
//           gap: 1rem;
//           animation: slideDown 0.4s ease;
//         }
//         .modal h2 { margin: 0; }
//         .modal input { padding: 0.5rem; border: 1px solid #ccc; border-radius: 8px; }
//         .modal button {
//           padding: 0.75rem;
//           border: none;
//           background: #f3c200;
//           border-radius: 8px;
//           font-weight: bold;
//           cursor: pointer;
//           transition: background 0.2s;
//         }
//         .modal button:hover { background: #b8860b; }
//         .modal p { font-size: 0.9rem; text-align: center; }
//         .modal p span { color: #f3c200; cursor: pointer; font-weight: bold; }

//         @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
//         @keyframes slideDown { from { transform: translateY(-50px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
//       `}</style>
//     </>
//   );
// }


//code 4
// 'use client';

// import { useState, useEffect } from 'react';
// import { signIn } from "next-auth/react";


// export default function Navbar() {
//   const [open, setOpen] = useState(false);
//   const [scrolled, setScrolled] = useState(false);
//   const [mounted, setMounted] = useState(false);
//   const [showSignIn, setShowSignIn] = useState(false);
//   const [showSignUp, setShowSignUp] = useState(false);

//   useEffect(() => {
//     setMounted(true);
//     const handleScroll = () => setScrolled(window.scrollY > 20);
//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   if (!mounted) return null;

//   return (
//     <>
//       <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
//         <div className="logo">TEACHTUDOR</div>

//         <div className={`links ${open ? 'open' : ''}`}>
//           <a href="/">HOME</a>
//           <a href="#" onClick={() => setShowSignIn(true)}>SIGN IN</a>
//           <a href="#" onClick={() => setShowSignUp(true)}>SIGN UP</a>
//         </div>

//         <button
//           className={`hamburger ${open ? 'open' : ''}`}
//           onClick={() => setOpen(!open)}
//           aria-label="Toggle menu"
//         >
//           <span></span>
//           <span></span>
//           <span></span>
//         </button>
//       </nav>

//       {showSignIn && (
//         <div className="modal-overlay" onClick={() => setShowSignIn(false)}>
//           <div className="modal" onClick={e => e.stopPropagation()}>
//             <h2>Sign In</h2>
//             <input type="email" placeholder="Email" />
//             <input type="password" placeholder="Password" />
//             <button>Sign In</button>
//             <p>
//               Don't have an account?{' '}
//               <span onClick={() => { setShowSignIn(false); setShowSignUp(true); }}>
//                 Sign Up
//               </span>
//             </p>
//           </div>
//         </div>
//       )}

//       {/* Sign Up Modal */}
//       {showSignUp && (
//         <div className="modal-overlay" onClick={() => setShowSignUp(false)}>
//           <div className="modal" onClick={e => e.stopPropagation()}>
//             <h2>Sign Up</h2>
//             <button onClick={() => signIn('google')}>Sign in with Google</button>
//             <button onClick={() => signIn('github')}>Sign in with GitHub</button>
//             <button onClick={() => signIn('facebook')}>Sign in with Facebook</button>
//             <button onClick={() => signIn('twitter')}>Sign in with Twitter</button>
//             <button onClick={() => signIn('apple')}>Sign in with Apple</button>
//             <button onClick={() => signIn('linkedin')}>Sign in with LinkedIn</button>
//             <button onClick={() => signIn('yahoo')}>Sign in with Yahoo</button>
//             <p>
//               Already have an account?{' '}
//               <span onClick={() => { setShowSignUp(false); setShowSignIn(true); }}>
//                 Sign In
//               </span>
//             </p>
//           </div>
//         </div>
//       )}

//       {/* MERGED CSS */}
//       <style jsx>{`
//         .navbar {
//           position: sticky;
//           top: 0;
//           display: flex;
//           justify-content: space-between;
//           align-items: center;
//           padding: 0.75rem 1rem;
//           backdrop-filter: blur(8px);
//           background: linear-gradient(90deg, #fff79a, #f3c200, #b8860b);
//           transition: all 0.3s ease;
//           z-index: 1000;
//           box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
//         }
//         .navbar.scrolled {
//           backdrop-filter: blur(12px);
//           box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
//         }
//         .logo { font-weight: bold; font-size: 1.5rem; cursor: pointer; transition: transform 0.3s; }
//         .logo:hover { transform: scale(1.05); }
//         .links { display: flex; gap: 1rem; }
//         .links a {
//           position: relative;
//           text-decoration: none;
//           font-weight: 500;
//           color: #000;
//           padding: 0.25rem 0;
//           transition: color 0.2s;
//         }
//         .links a::after {
//           content: '';
//           position: absolute;
//           left: 0;
//           bottom: -2px;
//           width: 0;
//           height: 2px;
//           background-color: #000;
//           transition: width 0.3s ease;
//         }
//         .links a:hover::after { width: 100%; }
//         .hamburger {
//           display: none;
//           flex-direction: column;
//           justify-content: space-between;
//           width: 24px;
//           height: 20px;
//           background: none;
//           border: none;
//           cursor: pointer;
//           padding: 0;
//         }
//         .hamburger span {
//           height: 2px;
//           width: 100%;
//           background: #000;
//           border-radius: 2px;
//           transition: all 0.3s ease;
//         }
//         .hamburger.open span:nth-child(1) { transform: rotate(45deg) translate(5px, 5px); }
//         .hamburger.open span:nth-child(2) { opacity: 0; }
//         .hamburger.open span:nth-child(3) { transform: rotate(-45deg) translate(5px, -5px); }
//         @media (max-width: 768px) {
//           .hamburger { display: flex; }
//           .links {
//             position: fixed;
//             top: 0;
//             right: ${open ? '0' : '-100%'};
//             height: 100vh;
//             width: 250px;
//             background: linear-gradient(180deg, #fff79a, #f3c200, #b8860b);
//             flex-direction: column;
//             align-items: center;
//             justify-content: center;
//             gap: 2rem;
//             transition: right 0.3s ease;
//             z-index: 999;
//           }
//         }

//         /* MODALS */
//         .modal-overlay {
//           position: fixed;
//           inset: 0;
//           backdrop-filter: blur(6px);
//           background: rgba(0,0,0,0.4);
//           display: flex;
//           justify-content: center;
//           align-items: flex-start;
//           padding-top: 5%;
//           z-index: 2000;
//           animation: fadeIn 0.3s ease;
//         }
//         .modal {
//           background: #fff;
//           padding: 2rem;
//           border-radius: 16px;
//           width: 90%;
//           max-width: 400px;
//           box-shadow: 0 12px 30px rgba(0,0,0,0.3);
//           display: flex;
//           flex-direction: column;
//           gap: 1rem;
//           animation: slideDown 0.4s ease;
//         }
//         .modal h2 { margin: 0; }
//         .modal input { padding: 0.5rem; border: 1px solid #ccc; border-radius: 8px; }
//         .modal button {
//           padding: 0.75rem;
//           border: none;
//           background: #f3c200;
//           border-radius: 8px;
//           font-weight: bold;
//           cursor: pointer;
//           transition: background 0.2s;
//         }

//         .modal-overlay {
//           position: fixed;
//           inset: 0;
//           backdrop-filter: blur(6px);
//           background: rgba(0,0,0,0.4);
//           display: flex;
//           justify-content: center;
//           align-items: flex-start;
//           padding: 2rem 1rem; /* more padding */
//           overflow-y: auto; /* allows scrolling if modal is tall */
//           z-index: 2000;
//           animation: fadeIn 0.3s ease;
//         }

//         .modal {
//           background: #fff;
//           padding: 2rem;
//           border-radius: 16px;
//           width: 100%;
//           max-width: 400px;
//           box-shadow: 0 12px 30px rgba(0,0,0,0.3);
//           display: flex;
//           flex-direction: column;
//           gap: 1rem;
//           max-height: 90vh; /* ensures modal doesn't exceed viewport */
//           overflow-y: auto; /* scroll inside modal if content is too big */
//           animation: slideDown 0.4s ease;
//         }

//         .modal button:hover { background: #b8860b; }
//         .modal p { font-size: 0.9rem; text-align: center; }
//         .modal p span { color: #f3c200; cursor: pointer; font-weight: bold; }

//         @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
//         @keyframes slideDown { from { transform: translateY(-50px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
//       `}</style>
//     </>
//   );
// }

//code 5
'use client';

import { useState, useEffect } from 'react';
import { useSession, signIn, signOut } from "next-auth/react";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [showSignIn, setShowSignIn] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);

  const { data: session } = useSession();

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!mounted) return null;

  return (
    <>
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="logo">TEACHTUDOR</div>

        <div className={`links ${open ? 'open' : ''}`}>
          <a href="/">HOME</a>
          {session ? (
            <a href="#" onClick={() => signOut()}>SIGN OUT</a>
          ) : (
            <>
              {/* <a href="#" onClick={() => setShowSignIn(true)}>SIGN IN</a> */}
              {/* <a href="#" onClick={() => setShowSignUp(true)}>SIGN OUT</a> */}
              {/* <a href="#" onClick={() => setShowSignUp(true)}>SIGN IN</a> */}
            </>
          )}
        </div>

        <button
          className={`hamburger ${open ? 'open' : ''}`}
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </nav>

      {/* Sign In Modal
      {showSignIn && (
        <div className="modal-overlay" onClick={() => setShowSignIn(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <h2>Sign In</h2>
            <input type="email" placeholder="Email" />
            <input type="password" placeholder="Password" />
            <button>Sign In</button>
            <p>
              Don't have an account?{' '}
              <span onClick={() => { setShowSignIn(false); setShowSignUp(true); }}>
                Sign Up
              </span>
            </p>
          </div>
        </div>
      )} */}

      {/* Sign Up Modal */}
      {showSignUp && (
        <div className="modal-overlay" onClick={() => setShowSignUp(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <h2>Sign Up</h2>
            <button onClick={() => signIn('google')}>Sign in with Google</button>
            <button onClick={() => signIn('github')}>Sign in with GitHub</button>
            <button onClick={() => signIn('facebook')}>Sign in with Facebook</button>
            <button onClick={() => signIn('twitter')}>Sign in with Twitter</button>
            <button onClick={() => signIn('apple')}>Sign in with Apple</button>
            <button onClick={() => signIn('linkedin')}>Sign in with LinkedIn</button>
            <button onClick={() => signIn('yahoo')}>Sign in with Yahoo</button>
            {/* <p>
              Already have an account?{' '}
              <span onClick={() => { setShowSignUp(false); setShowSignIn(true); }}>
                Sign In
              </span>
            </p> */}
          </div>
        </div>
      )}

      {/* MERGED CSS */}
      <style jsx>{`
        .navbar {
          position: sticky;
          top: 0;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0.75rem 1rem;
          backdrop-filter: blur(8px);
          background: linear-gradient(90deg, #fff79a, #f3c200, #b8860b);
          transition: all 0.3s ease;
          z-index: 1000;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }
        .navbar.scrolled {
          backdrop-filter: blur(12px);
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
        }
        .logo { font-weight: bold; font-size: 1.5rem; cursor: pointer; transition: transform 0.3s; }
        .logo:hover { transform: scale(1.05); }
        .links { display: flex; gap: 1rem; }
        .links a {
          position: relative;
          text-decoration: none;
          font-weight: 500;
          color: #000;
          padding: 0.25rem 0;
          transition: color 0.2s;
        }
        .links a::after {
          content: '';
          position: absolute;
          left: 0;
          bottom: -2px;
          width: 0;
          height: 2px;
          background-color: #000;
          transition: width 0.3s ease;
        }
        .links a:hover::after { width: 100%; }
        .hamburger {
          display: none;
          flex-direction: column;
          justify-content: space-between;
          width: 24px;
          height: 20px;
          background: none;
          border: none;
          cursor: pointer;
          padding: 0;
        }
        .hamburger span {
          height: 2px;
          width: 100%;
          background: #000;
          border-radius: 2px;
          transition: all 0.3s ease;
        }
        .hamburger.open span:nth-child(1) { transform: rotate(45deg) translate(5px, 5px); }
        .hamburger.open span:nth-child(2) { opacity: 0; }
        .hamburger.open span:nth-child(3) { transform: rotate(-45deg) translate(5px, -5px); }
        @media (max-width: 768px) {
          .hamburger { display: flex; }
          .links {
            position: fixed;
            top: 0;
            right: ${open ? '0' : '-100%'};
            height: 100vh;
            width: 250px;
            background: linear-gradient(180deg, #fff79a, #f3c200, #b8860b);
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: 2rem;
            transition: right 0.3s ease;
            z-index: 999;
          }
        }

        /* MODALS */
        .modal-overlay {
          position: fixed;
          inset: 0;
          backdrop-filter: blur(6px);
          background: rgba(0,0,0,0.4);
          display: flex;
          justify-content: center;
          align-items: flex-start;
          padding: 2rem 1rem;
          overflow-y: auto;
          z-index: 2000;
          animation: fadeIn 0.3s ease;
        }

        .modal {
          background: #fff;
          padding: 2rem;
          border-radius: 16px;
          width: 100%;
          max-width: 400px;
          box-shadow: 0 12px 30px rgba(0,0,0,0.3);
          display: flex;
          flex-direction: column;
          gap: 1rem;
          max-height: 90vh;
          overflow-y: auto;
          animation: slideDown 0.4s ease;
        }

        .modal h2 { margin: 0; }
        .modal input { padding: 0.5rem; border: 1px solid #ccc; border-radius: 8px; }
        .modal button {
          padding: 0.75rem;
          border: none;
          background: #f3c200;
          border-radius: 8px;
          font-weight: bold;
          cursor: pointer;
          transition: background 0.2s;
        }
        .modal button:hover { background: #b8860b; }
        .modal p { font-size: 0.9rem; text-align: center; }
        .modal p span { color: #f3c200; cursor: pointer; font-weight: bold; }

        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideDown { from { transform: translateY(-50px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
      `}</style>
    </>
  );
}
