// // src/app/layout.js
// 'use client';

// import './globals.css';
// import Navbar from './components/Navbar';
// import Footer from './components/Footer';
// import Header from './components/Header';
// import { SessionProvider } from 'next-auth/react';
// import { Analytics } from "@vercel/analytics/next";


// export default function RootLayout({ children }) {
//   return (
//     <html lang="en">
//       <body>
//         <SessionProvider>
//           {/* <Header/> */}
//           <Navbar />
//           <main>{children}</main>
//           <Footer />
//           <Analytics />
//         </SessionProvider>
//       </body>
//     </html>
//   );
// }


//code 2
// import './globals.css';
// import Navbar from './components/Navbar';
// import Footer from './components/Footer';
// import { Analytics } from '@vercel/analytics/next';
// import Providers from './Providers'; // 👈 import the wrapper

// export default function RootLayout({ children }) {
//   return (
//     <html lang="en">
//       <body>
//         <Providers>
//           <Navbar />
//           <main>{children}</main>
//           <Footer />
//         </Providers>
//         <Analytics />
//       </body>
//     </html>
//   );
// }


//code 3 works
// 'use client';

// import './globals.css';
// import Navbar from './components/Navbar';
// import Footer from './components/Footer';
// import { Analytics } from '@vercel/analytics/next'; // recommended for app router
// import Providers from './Providers';

// export default function RootLayout({ children }) {
//   return (
//     <html lang="en">
//       <body>
//         <Providers>
//           <Navbar />
//           <main>{children}</main>
//           <Footer />
//         </Providers>
//         <Analytics /> {/* ✅ outside Providers */}
//       </body>
//     </html>
//   );
// }


//code 4 with metadata
import './globals.css';
import Navbar from './components/Navbar'; // client component
import Footer from './components/Footer'; // client component
import { Analytics } from '@vercel/analytics/next';
import Providers from './Providers';

// ✅ Server-side metadata export
export const metadata = {
  title: 'ETNINJA',
  description: 'ETNINJA – ESL resources, tools, and learning platform',
  icons: { icon: '/favicon.ico' },
  openGraph: {
    title: 'ETNINJA.COM',
    description: 'ETNINJA.COM – ESL resources, tools, and learning platform',
    url: 'ETNINJA.COM',
    siteName: 'ETNINJA',
    images: [{ url: '/images/og-image.png', width: 1200, height: 630 }],
    locale: 'en_US',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <Navbar /> {/* client component */}
          <main>{children}</main>
          <Footer /> {/* client component */}
        </Providers>
        <Analytics />
      </body>
    </html>
  );
}
