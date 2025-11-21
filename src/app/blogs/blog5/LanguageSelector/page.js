'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LanguageSelector() {
  const router = useRouter();
  const [selectedLang, setSelectedLang] = useState(null);

  const languages = [
    { code: "en", name: "English", flag: "/flags/us.jpg" },
    { code: "pt", name: "Português", flag: "/flags/br.jpg" },
    { code: "es", name: "Español", flag: "/flags/es.jpg" },
    { code: "it", name: "Italiano", flag: "/flags/it.jpg" },
    { code: "fr", name: "Français", flag: "/flags/fr.jpg" },
    { code: "de", name: "Deutsch", flag: "/flags/de.jpg" },
    { code: "ja", name: "日本語", flag: "/flags/jp.jpg" },
  ];

  const handleSelect = (langCode) => {
    setSelectedLang(langCode);
    localStorage.setItem("selectedLanguage", langCode);
    router.push("../blog5/StorySelector");
  };

  return (
  <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-6 -mt-10">
    <div className="flex justify-items-center">
      {languages.map((lang) => (
        <button
          key={lang.code}
          onClick={() => handleSelect(lang.code)}
          className={`relative w-22 h-22 rounded-xl overflow-hidden shadow-lg transition-transform duration-200 ${
            selectedLang === lang.code
              ? "ring-4 ring-blue-500 scale-105"
              : "hover:scale-110 hover:brightness-110"
          }`}
        >
          <img
            src={lang.flag}
            alt={lang.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/20 hover:bg-black/10"></div>
        </button>
      ))}
    </div>
  </div>
);

}
