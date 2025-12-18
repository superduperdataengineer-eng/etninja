// "use client";

// import VideoPlayer from "./VideoPlayer";

// export default function Page() {
//   return (
//     <div
//       style={{
//         width: "100vw",
//         height: "100vh",
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//       }}
//     >
//       <VideoPlayer url="https://www.youtube.com/watch?v=eEbF6OP-34M" />
//     </div>
//   );
// }


//code 2 works but no sound
// "use client";

// import { useState, useEffect } from "react";
// import VideoPlayer from "./VideoPlayer";

// export default function Page() {
//   const [sections, setSections] = useState([]);
//   const [selectedIndex, setSelectedIndex] = useState(null);

//   useEffect(() => {
//     async function loadSections() {
//       try {
//         const res = await fetch("/thekid/pdfText/sections.json");
//         const data = await res.json();
//         // Access the sections array from the JSON object
//         setSections(data.sections || []);
//         console.log("Sections loaded:", data.sections?.length || 0);
//       } catch (err) {
//         console.error("Failed to load sections JSON:", err);
//       }
//     }
//     loadSections();
//   }, []);

//   return (
//     <div
//       style={{
//         width: "100vw",
//         minHeight: "100vh",
//         padding: "20px",
//         background: "#ffffffff",
//         color: "white",
//         display: "flex",
//         flexDirection: "column",
//         alignItems: "center",
//         gap: "30px",
//       }}
//     >
//       {/* VIDEO PLAYER */}
//       <VideoPlayer url="https://www.youtube.com/watch?v=eEbF6OP-34M" />

//       {/* SECTION BUTTONS */}
//       <div
//         style={{
//           width: "80%",
//           display: "grid",
//           gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
//           gap: "12px",
//         }}
//       >
//         {sections.map((section, i) => (
//           <button
//             key={i}
//             onClick={() => setSelectedIndex(i)}
//             style={{
//               padding: "12px",
//               borderRadius: "10px",
//               background: selectedIndex === i ? "#444" : "#222",
//               color: "white",
//               border: "1px solid #333",
//               cursor: "pointer",
//             }}
//           >
//             Section {section.number}
//           </button>
//         ))}
//       </div>

//       {/* SECTION TEXT */}
//       <div
//         style={{
//           width: "80%",
//           background: "#222",
//           padding: "20px",
//           borderRadius: "10px",
//           minHeight: "200px",
//           whiteSpace: "pre-wrap",
//           lineHeight: "1.6",
//           marginBottom: "40px",
//         }}
//       >
//         {selectedIndex !== null ? (
//           <>
//             <h2 style={{ marginBottom: "10px" }}>
//               Section {sections[selectedIndex].number}
//             </h2>
//             <p>{sections[selectedIndex].text}</p>
//           </>
//         ) : (
//           <p style={{ opacity: 0.7 }}>Select a section above to view the text.</p>
//         )}
//       </div>
//     </div>
//   );
// }


//code 3
"use client";

import { useState, useEffect } from "react";
import VideoPlayer from "./VideoPlayer";

export default function Page() {
  const [sections, setSections] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(0); // default first section

  // Load sections JSON
  useEffect(() => {
    async function loadSections() {
      try {
        const res = await fetch("/thekid/pdfText/sections.json");
        const data = await res.json();
        setSections(data.sections || []);
        console.log("Sections loaded:", data.sections?.length || 0);
      } catch (err) {
        console.error("Failed to load sections JSON:", err);
      }
    }
    loadSections();
  }, []);

  // Get audio URL for a section
  const getAudioUrl = (sectionNumber) => `/thekid/sounds/${sectionNumber}.m4a`;

  return (
    <div
      style={{
        width: "100%",
        minHeight: "100vh",
        padding: "20px",
        background: "#ffffffff",
        color: "white",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "30px",
        boxSizing: "border-box",
      }}
    >
      {/* VIDEO PLAYER */}
      <div
        style={{
          maxWidth: "900px",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          margin: "0 auto",
        }}
      >
        <VideoPlayer
          url="https://www.youtube.com/watch?v=Lih7_P_hdNg&t=787s"
        />
      </div>

      {/* SECTION TEXT */}
      <div
        style={{
          maxWidth: "900px",
          width: "100%",
          background: "#222",
          padding: "20px",
          borderRadius: "10px",
          minHeight: "400px",
          whiteSpace: "pre-wrap",
          lineHeight: "1.6",
          overflowY: "auto",
          boxSizing: "border-box",
        }}
      >
        {sections[selectedIndex] ? (
          <>
            <h2 style={{ marginBottom: "10px" }}>
              Section {sections[selectedIndex].number}
            </h2>
            <p>{sections[selectedIndex].text}</p>
          </>
        ) : (
          <p style={{ opacity: 0.7 }}>Loading sections...</p>
        )}
      </div>

      {/* AUDIO PLAYER UNDER TEXT */}
      {sections[selectedIndex] && (
        <div
          style={{
            maxWidth: "900px",
            width: "100%",
            display: "flex",
            justifyContent: "center",
            margin: "0px auto",
          }}
        >
          <audio
            key={sections[selectedIndex].number} // <-- this forces reload
            controls
            style={{ width: "100%" }}
          >
            <source
              src={getAudioUrl(sections[selectedIndex].number)}
              type="audio/mp4"
            />
            Your browser does not support the audio element.
          </audio>
        </div>
      )}

      {/* SECTION BUTTONS */}
      <div
        style={{
          maxWidth: "900px",
          width: "100%",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
          gap: "12px",
          justifyItems: "center",
          margin: "0 auto",
        }}
      >
        {sections.map((section, i) => (
          <button
            key={i}
            onClick={() => setSelectedIndex(i)}
            style={{
              padding: "12px",
              borderRadius: "10px",
              background: selectedIndex === i ? "#444" : "#222",
              color: "white",
              border: "1px solid #333",
              cursor: "pointer",
              width: "100%",
            }}
          >
            Section {section.number}
          </button>
        ))}
      </div>
    </div>
  );
}
