// 'use client';

// import { useState } from "react";
// import { useRouter } from "next/navigation";

// export default function LanguageSelector() {
//   const router = useRouter();
//   const [selectedLang, setSelectedLang] = useState(null);

//   const languages = [
//     { code: "en", name: "English", flag: "/flags/us.jpg" },
//     { code: "pt", name: "Português", flag: "/flags/br.jpg" },
//     { code: "es", name: "Español", flag: "/flags/es.jpg" },
//     { code: "it", name: "Italiano", flag: "/flags/it.jpg" },
//     { code: "fr", name: "Français", flag: "/flags/fr.jpg" },
//     { code: "de", name: "Deutsch", flag: "/flags/de.jpg" },
//     { code: "ja", name: "日本語", flag: "/flags/jp.jpg" },
//     { code: "nl", name: "Nederlands", flag: "/flags/nl.jpg" }
//   ];

//   const handleSelect = (langCode) => {
//     setSelectedLang(langCode);
//     localStorage.setItem("selectedLanguage", langCode);
//     router.push("../blog5/StorySelector");
//   };

//   return (
//   <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-6 -mt-10">
//     <div className="flex justify-items-center">
//       {languages.map((lang) => (
//         <button
//           key={lang.code}
//           onClick={() => handleSelect(lang.code)}
//           className={`relative w-22 h-22 rounded-xl overflow-hidden shadow-lg transition-transform duration-200 ${
//             selectedLang === lang.code
//               ? "ring-4 ring-blue-500 scale-105"
//               : "hover:scale-110 hover:brightness-110"
//           }`}
//         >
//           <img
//             src={lang.flag}
//             alt={lang.name}
//             className="w-full h-full object-cover"
//           />
//           <div className="absolute inset-0 bg-black/20 hover:bg-black/10"></div>
//         </button>
//       ))}
//     </div>
//   </div>
// );

// }

//code 2
'use client';

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function LanguageSelector() {
  const router = useRouter();
  const [selectedLang, setSelectedLang] = useState(null);
  const [windowWidth, setWindowWidth] = useState(0);

  const languages = [
    { code: "en", name: "English", flag: "/flags/us.jpg" },
    { code: "pt", name: "Português", flag: "/flags/br.jpg" },
    { code: "es", name: "Español", flag: "/flags/es.jpg" },
    { code: "it", name: "Italiano", flag: "/flags/it.jpg" },
    { code: "fr", name: "Français", flag: "/flags/fr.jpg" },
    { code: "de", name: "Deutsch", flag: "/flags/de.jpg" },
    { code: "ja", name: "日本語", flag: "/flags/jp.jpg" },
    { code: "nl", name: "Nederlands", flag: "/flags/nl.jpg" }
  ];

  const handleSelect = (langCode) => {
    setSelectedLang(langCode);
    localStorage.setItem("selectedLanguage", langCode);
    router.push("../blog5/StorySelector");
  };

  // Track window width for responsive layout
  useEffect(() => {
    const updateWidth = () => setWindowWidth(window.innerWidth);
    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  // Determine number of flags per row and flag size
  const getLayout = () => {
    if (windowWidth < 640) return { perRow: 1, flagSize: 140 };   // phones: 1 per row
    if (windowWidth < 1024) return { perRow: 3, flagSize: 100 };  // tablets: 3 per row
    return { perRow: 4, flagSize: 140 };                          // desktop: 4 per row
  };

  const { perRow, flagSize } = getLayout();

  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        minHeight: '100vh',
        backgroundColor: '#fafafa',
        gap: '8px',
        padding: '20px',
        boxSizing: 'border-box'
      }}
    >
      {languages.map((lang, index) => (
        <div
          key={lang.code}
          style={{
            width: `${flagSize}px`,
            height: `${flagSize}px`,
            flex: `0 0 ${100 / perRow - 2}%`, // leave small gap
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            cursor: 'pointer'
          }}
          onClick={() => handleSelect(lang.code)}
        >
          <img
            src={lang.flag}
            alt={lang.name}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              borderRadius: '8px'
            }}
          />
        </div>
      ))}
    </div>
  );
}
