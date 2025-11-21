// "use client";

// import React, { useState, useEffect } from "react";
// import Navbar from "../../components/Navbar";
// import jsPDF from "jspdf";
// import "../../globals.css";

// export default function SlideCreator() {
//   const [folderStructure, setFolderStructure] = useState([]);
//   const [currentSlides, setCurrentSlides] = useState([]);
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [showFilename, setShowFilename] = useState(false);
//   const [words, setWords] = useState([]);
//   const [newWord, setNewWord] = useState("");

//   const handleFolderSelect = (event) => {
//     const files = Array.from(event.target.files).filter((file) =>
//       file.type.startsWith("image/")
//     );

//     const folderStructure = buildFolderStructure(files);
//     setFolderStructure(folderStructure);

//     const allSlides = flattenSlides(folderStructure);
//     setCurrentSlides(allSlides);
//     setCurrentIndex(0);
//   };

//   const buildFolderStructure = (files) => {
//     const folderMap = {};

//     files.forEach((file) => {
//       const path = file.webkitRelativePath.split("/");
//       const level1 = path[0]; // First-level folder
//       const level2 = path[1]; // Second-level folder
//       const filename = path.slice(2).join("/");

//       if (!folderMap[level1]) folderMap[level1] = {};
//       if (!folderMap[level1][level2]) folderMap[level1][level2] = [];
//       folderMap[level1][level2].push(file);
//     });

//     return Object.entries(folderMap)
//       .map(([level1Name, level2Folders]) => ({
//         folderName: level1Name,
//         subfolders: Object.entries(level2Folders)
//           .map(([level2Name, files]) => ({
//             subfolderName: level2Name,
//             files: files.sort((a, b) => extractNumber(a.name) - extractNumber(b.name)),
//           }))
//           .sort((a, b) => extractNumber(a.subfolderName) - extractNumber(b.subfolderName)),
//       }))
//       .sort((a, b) => extractNumber(a.folderName) - extractNumber(b.folderName));
//   };

//   const extractNumber = (name) => {
//     const match = name.match(/^(\d+)\./); // Match the numeric prefix followed by a dot
//     return match ? parseInt(match[1], 10) : Number.MAX_SAFE_INTEGER;
//   };

//   const flattenSlides = (structure) => {
//     const slides = [];
//     structure.forEach((level1) => {
//       level1.subfolders.forEach((level2) => {
//         level2.files.forEach((file) => {
//           slides.push({
//             level1: level1.folderName,
//             level2: level2.subfolderName,
//             file,
//           });
//         });
//       });
//     });
//     return slides;
//   };

//   const handleNextSlide = () => {
//     setCurrentIndex((prevIndex) => (prevIndex + 1) % currentSlides.length);
//   };

//   const handlePrevSlide = () => {
//     setCurrentIndex((prevIndex) =>
//       (prevIndex - 1 + currentSlides.length) % currentSlides.length
//     );
//   };

//   const handleToggleFilename = () => {
//     setShowFilename((prevState) => !prevState);
//   };

//   const handleExportToPDF = async () => {
//     const pdf = new jsPDF();
//     let pageHeight = pdf.internal.pageSize.height;
//     let yOffset = 10;
//     const margin = 10;
  
//     // Ensure folderStructure contains data and has the expected structure
//     if (folderStructure.length > 0 && folderStructure[0].subfolders) {
//       const level1 = folderStructure[0]; // Only one folder, hence first element
  
//       // Check if the folder has subfolders (for multi-folder or single folder structures)
//       const files = level1.subfolders.flatMap(subfolder => subfolder.files || []);
      
//       if (files.length === 0) {
//         console.error("No files found in the folder structure.");
//         return;
//       }
  
//       // Print the folder name on the top of the page
//       pdf.setFontSize(16);
//       pdf.text(level1.folderName, 10, yOffset);
//       yOffset += 20; // Move yOffset down after the folder name
  
//       // Print each image (one per page with file name under it)
//       for (const file of files) {
//         const imgURL = URL.createObjectURL(file);
//         const img = new Image();
//         img.src = imgURL;
  
//         await new Promise((resolve) => {
//           img.onload = () => {
//             const imgWidth = 190;
//             const imgHeight = (img.height / img.width) * imgWidth;
  
//             if (yOffset + imgHeight + 20 > pageHeight - 20) {
//               pdf.addPage(); // Add a new page if there's not enough space
//               yOffset = margin; // Reset yOffset for the new page
//             }
  
//             // Add the image
//             pdf.addImage(img, "JPEG", 10, yOffset, imgWidth, imgHeight);
//             yOffset += imgHeight + 10; // Move yOffset down after the image
  
//             // Add the file name (without extension) below the image
//             pdf.setFontSize(12);
//             pdf.text(file.name.replace(/\.[^/.]+$/, ""), 10, yOffset);
//             yOffset += 10; // Move yOffset down after the filename
  
//             URL.revokeObjectURL(imgURL); // Clean up the object URL
//             resolve();
//           };
//         });
//       }
  
//       // After all images, add the folder name and list the file names
//       pdf.addPage();
//       pdf.setFontSize(16);
//       pdf.text(level1.folderName, 10, 15); // Folder name at the top
//       yOffset = 25;
  
//       pdf.setFontSize(12);
//       files.forEach((file) => {
//         if (yOffset + 10 > pageHeight - margin) {
//           pdf.addPage(); // Create a new page if it doesn't fit
//           yOffset = margin; // Reset yOffset for the new page
//         }
        
//         // Add the file names (without extensions)
//         pdf.text(file.name.replace(/\.[^/.]+$/, ""), 10, yOffset);
//         yOffset += 10; // Move yOffset down for the next file name
//       });
  
//       // Add a vocabulary page at the end
//       pdf.addPage();
//       pdf.setFontSize(16);
//       pdf.text("Vocabulary", 10, 15); // Title of the page
//       yOffset = 30; // Adjust starting offset below the title
  
//       // Add the words list
//       words.forEach((word, index) => {
//         if (yOffset + 10 > pageHeight - margin) {
//           pdf.addPage(); // Create a new page if it doesn't fit
//           yOffset = margin; // Reset yOffset for the new page
//         }
  
//         pdf.setFontSize(12);
//         pdf.text(`${index + 1}. ${word}`, margin, yOffset);
//         yOffset += 10; // Increase yOffset for the next word
//       });
  
//       // Save the PDF
//       pdf.save("slides.pdf");
//     } else {
//       console.error("Invalid folder structure.");
//     }
//   };
  
//   const handleAddWord = () => {
//     if (newWord.trim() !== "") {
//       setWords([...words, newWord]);
//       setNewWord("");
//     }
//   };

//   const handleDeleteWord = (word) => {
//     setWords(words.filter((w) => w !== word));
//   };

//   const handleDownloadWords = () => {
//     const blob = new Blob([words.join("\n")], { type: "text/plain" });
//     const link = document.createElement("a");
//     link.href = URL.createObjectURL(blob);
//     link.download = "words.txt";
//     link.click();
//   };

//   // Listen for Enter key to add the word
//   const handleKeyDown = (e) => {
//     if (e.key === "Enter") {
//       handleAddWord();
//     }
//   };

//   useEffect(() => {
//     const handleKeyDownEvent = (e) => {
//       if (e.key === "ArrowRight") handleNextSlide();
//       else if (e.key === "ArrowLeft") handlePrevSlide();
//     };

//     window.addEventListener("keydown", handleKeyDownEvent);
//     return () => window.removeEventListener("keydown", handleKeyDownEvent);
//   }, [currentSlides]);

//   return (
//     <div className="center-container">
//       <div className="mt-12 p-4">
//         <h1 className="text-2xl font-bold text-center mb-4">Slide Creator</h1>
//         <div className="text-center mb-6">
//           <input
//             type="file"
//             webkitdirectory=""
//             directory=""
//             multiple
//             onChange={handleFolderSelect}
//             className="cursor-pointer p-2 border rounded-lg"
//           />
//         </div>
//         {currentSlides.length > 0 && (
//           <div className="text-center mb-6">
//             <div
//             //   className="w-full max-w-md h-64 bg-gray-200 flex items-center justify-center border border-black rounded-md mx-auto cursor-pointer relative"
//               className = "slide-preview"
//               onClick={handleToggleFilename}
//             >
//               {showFilename ? (
//                 <p className="text-lg font-semibold text-gray-800">
//                   {currentSlides[currentIndex].file.name.replace(/\.[^/.]+$/, "")}
//                 </p>
//               ) : (
//                 <img
//                   src={URL.createObjectURL(currentSlides[currentIndex].file)}
//                   alt="Slide"
//                   className="h-full object-contain transition-transform"
//                 />
//               )}
//             </div>
//             <div 
//             //   className="flex justify-center gap-4 mt-4">
//               className = "slide-buttons">
//               <button
//                 className="p-2 bg-gray-800 text-white rounded-lg"
//                 onClick={handlePrevSlide}
//               >
//                 Previous
//               </button>
//               <button
//                 className="p-2 bg-gray-800 text-white rounded-lg"
//                 onClick={handleNextSlide}
//               >
//                 Next
//               </button>
//             </div>
//           </div>
//         )}
//         <div className="text-center mb-4">
//           <button
//             onClick={handleExportToPDF}
//             className="p-2 bg-purple-600 text-white rounded-lg"
//           >
//             Export to PDF
//           </button>
//           <button
//             onClick={handleDownloadWords}
//             className="p-2 ml-4 bg-blue-600 text-white rounded-lg"
//           >
//             Download Words
//           </button>
//         </div>

//         {/* Word Input and Add Word Button below the other buttons */}
//         <div className="text-center mb-4">
//           <input
//             type="text"
//             value={newWord}
//             onChange={(e) => setNewWord(e.target.value)}
//             onKeyDown={handleKeyDown}
//             className="p-2 border rounded-lg"
//             placeholder="Type a word"
//           />
//           <button
//             onClick={handleAddWord}
//             className="p-2 ml-2 bg-green-500 text-white rounded-lg"
//           >
//             Add Word
//           </button>
//         </div>

//         {/* Display added words */}
//         <div className="mt-4">
//           <div className="flex flex-wrap justify-center gap-4">
//             {words.map((word, index) => (
//               <div
//                 key={index}
//                 className="flex items-center bg-green-100 p-2 rounded-lg"
//               >
//                 <span>{word}</span>
//                 <button
//                   onClick={() => handleDeleteWord(word)}
//                   className="ml-2 text-green-500"
//                 >
//                   ➔
//                 </button>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

//code 2 some problems but works
// "use client";

// import React, { useState, useEffect } from "react";
// import jsPDF from "jspdf";
// import "../../globals.css";

// export default function SlideCreator() {
//   const [folderStructure, setFolderStructure] = useState([]);
//   const [currentSlides, setCurrentSlides] = useState([]);
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [showFilename, setShowFilename] = useState(false);
//   const [words, setWords] = useState([]);
//   const [newWord, setNewWord] = useState("");

//   const handleFolderSelect = (event) => {
//     const files = Array.from(event.target.files).filter((file) =>
//       file.type.startsWith("image/")
//     );
//     const folderStructure = buildFolderStructure(files);
//     setFolderStructure(folderStructure);
//     const allSlides = flattenSlides(folderStructure);
//     setCurrentSlides(allSlides);
//     setCurrentIndex(0);
//   };

//   const buildFolderStructure = (files) => {
//     const folderMap = {};
//     files.forEach((file) => {
//       const path = file.webkitRelativePath.split("/");
//       const level1 = path[0];
//       const level2 = path[1];
//       if (!folderMap[level1]) folderMap[level1] = {};
//       if (!folderMap[level1][level2]) folderMap[level1][level2] = [];
//       folderMap[level1][level2].push(file);
//     });
//     return Object.entries(folderMap).map(([level1Name, level2Folders]) => ({
//       folderName: level1Name,
//       subfolders: Object.entries(level2Folders)
//         .map(([level2Name, files]) => ({
//           subfolderName: level2Name,
//           files: files.sort((a, b) => extractNumber(a.name) - extractNumber(b.name)),
//         }))
//         .sort((a, b) => extractNumber(a.subfolderName) - extractNumber(b.subfolderName)),
//     }));
//   };

//   const extractNumber = (name) => {
//     const match = name.match(/^(\d+)\./);
//     return match ? parseInt(match[1], 10) : Number.MAX_SAFE_INTEGER;
//   };

//   const flattenSlides = (structure) => {
//     const slides = [];
//     structure.forEach((level1) => {
//       level1.subfolders.forEach((level2) => {
//         level2.files.forEach((file) => {
//           slides.push({ level1: level1.folderName, level2: level2.subfolderName, file });
//         });
//       });
//     });
//     return slides;
//   };

//   const handleNextSlide = () => setCurrentIndex((prev) => (prev + 1) % currentSlides.length);
//   const handlePrevSlide = () =>
//     setCurrentIndex((prev) => (prev - 1 + currentSlides.length) % currentSlides.length);
//   const handleToggleFilename = () => setShowFilename((prev) => !prev);

//   const handleExportToPDF = async () => {
//     const pdf = new jsPDF();
//     let yOffset = 10;
//     const margin = 10;
//     if (folderStructure.length === 0) return;
//     const level1 = folderStructure[0];
//     const files = level1.subfolders.flatMap((s) => s.files || []);
//     if (!files.length) return;

//     pdf.setFontSize(16);
//     pdf.text(level1.folderName, 10, yOffset);
//     yOffset += 20;

//     for (const file of files) {
//       const imgURL = URL.createObjectURL(file);
//       const img = new Image();
//       img.src = imgURL;
//       await new Promise((resolve) => {
//         img.onload = () => {
//           const imgWidth = 190;
//           const imgHeight = (img.height / img.width) * imgWidth;
//           if (yOffset + imgHeight + 20 > pdf.internal.pageSize.height - 20) {
//             pdf.addPage();
//             yOffset = margin;
//           }
//           pdf.addImage(img, "JPEG", 10, yOffset, imgWidth, imgHeight);
//           yOffset += imgHeight + 10;
//           pdf.setFontSize(12);
//           pdf.text(file.name.replace(/\.[^/.]+$/, ""), 10, yOffset);
//           yOffset += 10;
//           URL.revokeObjectURL(imgURL);
//           resolve();
//         };
//       });
//     }
//     pdf.save("slides.pdf");
//   };

//   const handleAddWord = () => {
//     if (newWord.trim() !== "") {
//       setWords([...words, newWord]);
//       setNewWord("");
//     }
//   };

//   const handleDeleteWord = (word) => setWords(words.filter((w) => w !== word));
//   const handleDownloadWords = () => {
//     const blob = new Blob([words.join("\n")], { type: "text/plain" });
//     const link = document.createElement("a");
//     link.href = URL.createObjectURL(blob);
//     link.download = "words.txt";
//     link.click();
//   };
//   const handleKeyDown = (e) => e.key === "Enter" && handleAddWord();

//   useEffect(() => {
//     const handleKeyDownEvent = (e) => {
//       if (e.key === "ArrowRight") handleNextSlide();
//       else if (e.key === "ArrowLeft") handlePrevSlide();
//     };
//     window.addEventListener("keydown", handleKeyDownEvent);
//     return () => window.removeEventListener("keydown", handleKeyDownEvent);
//   }, [currentSlides]);

//   const buttonStyle = {
//     padding: "10px 20px",
//     margin: "10px",
//     backgroundColor: "#b8860b", // golden dark
//     color: "white",
//     border: "none",
//     borderRadius: "8px",
//     cursor: "pointer",
//     fontWeight: "bold",
//   };

//   const containerStyle = {
//     display: "flex",
//     flexDirection: "column",
//     alignItems: "center",
//     gap: "20px",
//     padding: "20px",
//   };

//   const slideStyle = {
//     width: "400px",
//     height: "300px",
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//     border: "2px solid #b8860b",
//     borderRadius: "10px",
//     overflow: "hidden",
//     cursor: "pointer",
//   };

//   return (
//     <div style={containerStyle}>
//       <h1>Slide Creator</h1>

//       <input type="file" webkitdirectory="" directory="" multiple onChange={handleFolderSelect} />

//       {currentSlides.length > 0 && (
//         <>
//           <div style={slideStyle} onClick={handleToggleFilename}>
//             {showFilename ? (
//               <p>{currentSlides[currentIndex].file.name.replace(/\.[^/.]+$/, "")}</p>
//             ) : (
//               <img
//                 src={URL.createObjectURL(currentSlides[currentIndex].file)}
//                 alt="Slide"
//                 style={{ maxWidth: "100%", maxHeight: "100%" }}
//               />
//             )}
//           </div>

//           <div>
//             <button style={buttonStyle} onClick={handlePrevSlide}>
//               Previous
//             </button>
//             <button style={buttonStyle} onClick={handleNextSlide}>
//               Next
//             </button>
//           </div>

//           <div>
//             <button style={buttonStyle} onClick={handleExportToPDF}>
//               Export to PDF
//             </button>
//             <button style={buttonStyle} onClick={handleDownloadWords}>
//               Download Words
//             </button>
//           </div>

//           <div>
//             <input
//               type="text"
//               value={newWord}
//               onChange={(e) => setNewWord(e.target.value)}
//               onKeyDown={handleKeyDown}
//               placeholder="Type a word"
//             />
//             <button style={buttonStyle} onClick={handleAddWord}>
//               Add Word
//             </button>
//           </div>

//           <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", justifyContent: "center" }}>
//             {words.map((word, index) => (
//               <div
//                 key={index}
//                 style={{
//                   display: "flex",
//                   alignItems: "center",
//                   padding: "5px 10px",
//                   backgroundColor: "#f0e68c",
//                   borderRadius: "6px",
//                 }}
//               >
//                 <span>{word}</span>
//                 <button
//                   onClick={() => handleDeleteWord(word)}
//                   style={{ marginLeft: "5px", cursor: "pointer", fontWeight: "bold", border: "none", background: "none" }}
//                 >
//                   ➔
//                 </button>
//               </div>
//             ))}
//           </div>
//         </>
//       )}
//     </div>
//   );
// }

//code 3 positioning issues
// "use client";

// import React, { useState, useEffect } from "react";
// import jsPDF from "jspdf";
// import "../../globals.css";

// export default function SlideCreator() {
//   const [folderStructure, setFolderStructure] = useState([]);
//   const [currentSlides, setCurrentSlides] = useState([]);
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [showFilename, setShowFilename] = useState(false);
//   const [words, setWords] = useState([]);
//   const [newWord, setNewWord] = useState("");

//   const handleFolderSelect = (event) => {
//     const files = Array.from(event.target.files).filter((file) =>
//       file.type.startsWith("image/")
//     );
//     const folderStructure = buildFolderStructure(files);
//     setFolderStructure(folderStructure);
//     const allSlides = flattenSlides(folderStructure);
//     setCurrentSlides(allSlides);
//     setCurrentIndex(0);
//   };

//   const buildFolderStructure = (files) => {
//     const folderMap = {};
//     files.forEach((file) => {
//       const path = file.webkitRelativePath.split("/");
//       const level1 = path[0];
//       const level2 = path[1];
//       if (!folderMap[level1]) folderMap[level1] = {};
//       if (!folderMap[level1][level2]) folderMap[level1][level2] = [];
//       folderMap[level1][level2].push(file);
//     });
//     return Object.entries(folderMap).map(([level1Name, level2Folders]) => ({
//       folderName: level1Name,
//       subfolders: Object.entries(level2Folders)
//         .map(([level2Name, files]) => ({
//           subfolderName: level2Name,
//           files: files.sort((a, b) => extractNumber(a.name) - extractNumber(b.name)),
//         }))
//         .sort((a, b) => extractNumber(a.subfolderName) - extractNumber(b.subfolderName)),
//     }));
//   };

//   const extractNumber = (name) => {
//     const match = name.match(/^(\d+)\./);
//     return match ? parseInt(match[1], 10) : Number.MAX_SAFE_INTEGER;
//   };

//   const flattenSlides = (structure) => {
//     const slides = [];
//     structure.forEach((level1) => {
//       level1.subfolders.forEach((level2) => {
//         level2.files.forEach((file) => {
//           slides.push({ level1: level1.folderName, level2: level2.subfolderName, file });
//         });
//       });
//     });
//     return slides;
//   };

//   const handleNextSlide = () => setCurrentIndex((prev) => (prev + 1) % currentSlides.length);
//   const handlePrevSlide = () =>
//     setCurrentIndex((prev) => (prev - 1 + currentSlides.length) % currentSlides.length);
//   const handleToggleFilename = () => setShowFilename((prev) => !prev);

//   const handleExportToPDF = async () => {
//     const pdf = new jsPDF();
//     let yOffset = 10;
//     const margin = 10;
//     if (folderStructure.length === 0) return;
//     const level1 = folderStructure[0];
//     const files = level1.subfolders.flatMap((s) => s.files || []);
//     if (!files.length) return;

//     pdf.setFontSize(16);
//     pdf.text(level1.folderName, 10, yOffset);
//     yOffset += 20;

//     for (const file of files) {
//       const imgURL = URL.createObjectURL(file);
//       const img = new Image();
//       img.src = imgURL;
//       await new Promise((resolve) => {
//         img.onload = () => {
//           const imgWidth = 190;
//           const imgHeight = (img.height / img.width) * imgWidth;
//           if (yOffset + imgHeight + 20 > pdf.internal.pageSize.height - 20) {
//             pdf.addPage();
//             yOffset = margin;
//           }
//           pdf.addImage(img, "JPEG", 10, yOffset, imgWidth, imgHeight);
//           yOffset += imgHeight + 10;
//           pdf.setFontSize(12);
//           pdf.text(file.name.replace(/\.[^/.]+$/, ""), 10, yOffset);
//           yOffset += 10;
//           URL.revokeObjectURL(imgURL);
//           resolve();
//         };
//       });
//     }
//     pdf.save("slides.pdf");
//   };

//   const handleAddWord = () => {
//     if (newWord.trim() !== "") {
//       setWords([...words, newWord]);
//       setNewWord("");
//     }
//   };

//   const handleDeleteWord = (word) => setWords(words.filter((w) => w !== word));
//   const handleDownloadWords = () => {
//     const blob = new Blob([words.join("\n")], { type: "text/plain" });
//     const link = document.createElement("a");
//     link.href = URL.createObjectURL(blob);
//     link.download = "words.txt";
//     link.click();
//   };
//   const handleKeyDown = (e) => e.key === "Enter" && handleAddWord();

//   useEffect(() => {
//     const handleKeyDownEvent = (e) => {
//       if (e.key === "ArrowRight") handleNextSlide();
//       else if (e.key === "ArrowLeft") handlePrevSlide();
//     };
//     window.addEventListener("keydown", handleKeyDownEvent);
//     return () => window.removeEventListener("keydown", handleKeyDownEvent);
//   }, [currentSlides]);

//   const buttonStyle = {
//     padding: "10px 20px",
//     margin: "10px",
//     backgroundColor: "#b8860b",
//     color: "white",
//     border: "none",
//     borderRadius: "8px",
//     cursor: "pointer",
//     fontWeight: "bold",
//   };

//   const containerStyle = {
//     display: "flex",
//     flexDirection: "column",
//     alignItems: "center",
//     gap: "20px",
//     padding: "20px",
//     minHeight: "100vh",
//     justifyContent: "center",
//   };

//   const contentRow = {
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "flex-start",
//     gap: "20px",
//     width: "90%",
//     maxWidth: "1200px",
//   };

//   const slideStyle = {
//     width: "400px",
//     height: "300px",
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//     border: "2px solid #b8860b",
//     borderRadius: "10px",
//     overflow: "hidden",
//     cursor: "pointer",
//     flexShrink: 0,
//   };

//   const wordPanelStyle = {
//     flexGrow: 1,
//     height: "300px",
//     border: "2px solid #b8860b",
//     borderRadius: "10px",
//     padding: "10px",
//     overflowY: "auto",
//     display: "flex",
//     flexWrap: "wrap",
//     alignContent: "flex-start",
//     gap: "10px",
//     backgroundColor: "#fffbe6",
//   };

//   const wordChipStyle = {
//     display: "flex",
//     alignItems: "center",
//     padding: "5px 10px",
//     backgroundColor: "#f0e68c",
//     borderRadius: "6px",
//     cursor: "pointer",
//     transition: "background-color 0.2s ease",
//   };

//   return (
//     <div style={containerStyle}>
//       <h1>Slide Creator</h1>

//       <input type="file" webkitdirectory="" directory="" multiple onChange={handleFolderSelect} />

//       {currentSlides.length > 0 && (
//         <>
//           <div style={contentRow}>
//             {/* Left: Slide */}
//             <div style={slideStyle} onClick={handleToggleFilename}>
//               {showFilename ? (
//                 <p>{currentSlides[currentIndex].file.name.replace(/\.[^/.]+$/, "")}</p>
//               ) : (
//                 <img
//                   src={URL.createObjectURL(currentSlides[currentIndex].file)}
//                   alt="Slide"
//                   style={{ maxWidth: "100%", maxHeight: "100%" }}
//                 />
//               )}
//             </div>

//             {/* Right: Word panel */}
//             <div style={wordPanelStyle}>
//               {words.map((word, index) => (
//                 <div
//                   key={index}
//                   style={wordChipStyle}
//                   onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#ffd700")}
//                   onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#f0e68c")}
//                 >
//                   <span>{word}</span>
//                   <button
//                     onClick={() => handleDeleteWord(word)}
//                     style={{
//                       marginLeft: "8px",
//                       cursor: "pointer",
//                       fontWeight: "bold",
//                       border: "none",
//                       background: "none",
//                       color: "#b22222",
//                     }}
//                   >
//                     ✕
//                   </button>
//                 </div>
//               ))}
//             </div>
//           </div>

//           <div>
//             <button style={buttonStyle} onClick={handlePrevSlide}>
//               Previous
//             </button>
//             <button style={buttonStyle} onClick={handleNextSlide}>
//               Next
//             </button>
//           </div>

//           <div>
//             <button style={buttonStyle} onClick={handleExportToPDF}>
//               Export to PDF
//             </button>
//             <button style={buttonStyle} onClick={handleDownloadWords}>
//               Download Words
//             </button>
//           </div>

//           <div>
//             <input
//               type="text"
//               value={newWord}
//               onChange={(e) => setNewWord(e.target.value)}
//               onKeyDown={handleKeyDown}
//               placeholder="Type a word"
//             />
//             <button style={buttonStyle} onClick={handleAddWord}>
//               Add Word
//             </button>
//           </div>
//         </>
//       )}
//     </div>
//   );
// }

//code 4 still some minor positioning issues, add word buttons show up before it's meant to
// "use client";

// import React, { useState, useEffect } from "react";
// import jsPDF from "jspdf";
// import "../../globals.css";

// export default function SlideCreator() {
//   const [folderStructure, setFolderStructure] = useState([]);
//   const [currentSlides, setCurrentSlides] = useState([]);
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [showFilename, setShowFilename] = useState(false);
//   const [words, setWords] = useState([]);
//   const [newWord, setNewWord] = useState("");

//   const handleFolderSelect = (event) => {
//     const files = Array.from(event.target.files).filter((file) =>
//       file.type.startsWith("image/")
//     );
//     const folderStructure = buildFolderStructure(files);
//     setFolderStructure(folderStructure);
//     const allSlides = flattenSlides(folderStructure);
//     setCurrentSlides(allSlides);
//     setCurrentIndex(0);
//   };

//   const buildFolderStructure = (files) => {
//     const folderMap = {};
//     files.forEach((file) => {
//       const path = file.webkitRelativePath.split("/");
//       const level1 = path[0];
//       const level2 = path[1];
//       if (!folderMap[level1]) folderMap[level1] = {};
//       if (!folderMap[level1][level2]) folderMap[level1][level2] = [];
//       folderMap[level1][level2].push(file);
//     });
//     return Object.entries(folderMap).map(([level1Name, level2Folders]) => ({
//       folderName: level1Name,
//       subfolders: Object.entries(level2Folders)
//         .map(([level2Name, files]) => ({
//           subfolderName: level2Name,
//           files: files.sort((a, b) => extractNumber(a.name) - extractNumber(b.name)),
//         }))
//         .sort((a, b) => extractNumber(a.subfolderName) - extractNumber(b.subfolderName)),
//     }));
//   };

//   const extractNumber = (name) => {
//     const match = name.match(/^(\d+)\./);
//     return match ? parseInt(match[1], 10) : Number.MAX_SAFE_INTEGER;
//   };

//   const flattenSlides = (structure) => {
//     const slides = [];
//     structure.forEach((level1) => {
//       level1.subfolders.forEach((level2) => {
//         level2.files.forEach((file) => {
//           slides.push({ level1: level1.folderName, level2: level2.subfolderName, file });
//         });
//       });
//     });
//     return slides;
//   };

//   const handleNextSlide = () => setCurrentIndex((prev) => (prev + 1) % currentSlides.length);
//   const handlePrevSlide = () =>
//     setCurrentIndex((prev) => (prev - 1 + currentSlides.length) % currentSlides.length);
//   const handleToggleFilename = () => setShowFilename((prev) => !prev);

//   const handleExportToPDF = async () => {
//     const pdf = new jsPDF();
//     let yOffset = 10;
//     const margin = 10;
//     if (folderStructure.length === 0) return;
//     const level1 = folderStructure[0];
//     const files = level1.subfolders.flatMap((s) => s.files || []);
//     if (!files.length) return;

//     pdf.setFontSize(16);
//     pdf.text(level1.folderName, 10, yOffset);
//     yOffset += 20;

//     for (const file of files) {
//       const imgURL = URL.createObjectURL(file);
//       const img = new Image();
//       img.src = imgURL;
//       await new Promise((resolve) => {
//         img.onload = () => {
//           const imgWidth = 190;
//           const imgHeight = (img.height / img.width) * imgWidth;
//           if (yOffset + imgHeight + 20 > pdf.internal.pageSize.height - 20) {
//             pdf.addPage();
//             yOffset = margin;
//           }
//           pdf.addImage(img, "JPEG", 10, yOffset, imgWidth, imgHeight);
//           yOffset += imgHeight + 10;
//           pdf.setFontSize(12);
//           pdf.text(file.name.replace(/\.[^/.]+$/, ""), 10, yOffset);
//           yOffset += 10;
//           URL.revokeObjectURL(imgURL);
//           resolve();
//         };
//       });
//     }
//     pdf.save("slides.pdf");
//   };

//   const handleAddWord = () => {
//     if (newWord.trim() !== "") {
//       setWords([...words, newWord]);
//       setNewWord("");
//     }
//   };

//   const handleDeleteWord = (word) => setWords(words.filter((w) => w !== word));
//   const handleDownloadWords = () => {
//     const blob = new Blob([words.join("\n")], { type: "text/plain" });
//     const link = document.createElement("a");
//     link.href = URL.createObjectURL(blob);
//     link.download = "words.txt";
//     link.click();
//   };
//   const handleKeyDown = (e) => e.key === "Enter" && handleAddWord();

//   useEffect(() => {
//     const handleKeyDownEvent = (e) => {
//       if (e.key === "ArrowRight") handleNextSlide();
//       else if (e.key === "ArrowLeft") handlePrevSlide();
//     };
//     window.addEventListener("keydown", handleKeyDownEvent);
//     return () => window.removeEventListener("keydown", handleKeyDownEvent);
//   }, [currentSlides]);

//   const buttonStyle = {
//     padding: "8px 16px",
//     margin: "4px",
//     backgroundColor: "#b8860b",
//     color: "white",
//     border: "none",
//     borderRadius: "8px",
//     cursor: "pointer",
//     fontWeight: "bold",
//   };

//   const topBarStyle = {
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "space-between",
//     padding: "10px 20px",
//     backgroundColor: "#fff8dc",
//     borderBottom: "2px solid #b8860b",
//     position: "sticky",
//     top: 0,
//     zIndex: 1000,
//   };

//   const leftBarGroup = { display: "flex", alignItems: "center", gap: "10px" };
//   const rightBarGroup = { display: "flex", alignItems: "center", gap: "10px" };

//   const mainContainer = {
//     display: "flex",
//     flexDirection: "column",
//     alignItems: "center",
//     padding: "20px",
//     gap: "20px",
//   };

//   const contentRow = {
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "flex-start",
//     gap: "20px",
//     width: "90%",
//     maxWidth: "1200px",
//   };

//   const slideStyle = {
//     width: "400px",
//     height: "300px",
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//     border: "2px solid #b8860b",
//     borderRadius: "10px",
//     overflow: "hidden",
//     cursor: "pointer",
//     flexShrink: 0,
//   };

//   const wordPanelStyle = {
//     flexGrow: 1,
//     height: "300px",
//     border: "2px solid #b8860b",
//     borderRadius: "10px",
//     padding: "10px",
//     overflowY: "auto",
//     display: "flex",
//     flexWrap: "wrap",
//     alignContent: "flex-start",
//     gap: "10px",
//     backgroundColor: "#fffbe6",
//   };

//   const wordChipStyle = {
//     display: "flex",
//     alignItems: "center",
//     padding: "5px 10px",
//     backgroundColor: "#f0e68c",
//     borderRadius: "6px",
//     cursor: "pointer",
//     transition: "background-color 0.2s ease",
//   };

//   return (
//     <div>
//       {/* Top bar */}
//       <div style={topBarStyle}>
//         <div style={leftBarGroup}>
//           <h2>Slide Creator</h2>
//           <input
//             type="file"
//             webkitdirectory=""
//             directory=""
//             multiple
//             onChange={handleFolderSelect}
//           />
//         </div>

//         <div style={rightBarGroup}>
//           <input
//             type="text"
//             value={newWord}
//             onChange={(e) => setNewWord(e.target.value)}
//             onKeyDown={handleKeyDown}
//             placeholder="Type a word"
//           />
//           <button style={buttonStyle} onClick={handleAddWord}>
//             Add Word
//           </button>
//           <button style={buttonStyle} onClick={handleExportToPDF}>
//             Export to PDF
//           </button>
//           <button style={buttonStyle} onClick={handleDownloadWords}>
//             Download Words
//           </button>
//         </div>
//       </div>

//       {/* Main content */}
//       <div style={mainContainer}>
//         {currentSlides.length > 0 && (
//           <>
//             <div style={contentRow}>
//               {/* Left: Slide */}
//               <div style={slideStyle} onClick={handleToggleFilename}>
//                 {showFilename ? (
//                   <p>{currentSlides[currentIndex].file.name.replace(/\.[^/.]+$/, "")}</p>
//                 ) : (
//                   <img
//                     src={URL.createObjectURL(currentSlides[currentIndex].file)}
//                     alt="Slide"
//                     style={{ maxWidth: "100%", maxHeight: "100%" }}
//                   />
//                 )}
//               </div>

//               {/* Right: Word panel */}
//               <div style={wordPanelStyle}>
//                 {words.map((word, index) => (
//                   <div
//                     key={index}
//                     style={wordChipStyle}
//                     onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#ffd700")}
//                     onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#f0e68c")}
//                   >
//                     <span>{word}</span>
//                     <button
//                       onClick={() => handleDeleteWord(word)}
//                       style={{
//                         marginLeft: "8px",
//                         cursor: "pointer",
//                         fontWeight: "bold",
//                         border: "none",
//                         background: "none",
//                         color: "#b22222",
//                       }}
//                     >
//                       ✕
//                     </button>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             <div>
//               <button style={buttonStyle} onClick={handlePrevSlide}>
//                 Previous
//               </button>
//               <button style={buttonStyle} onClick={handleNextSlide}>
//                 Next
//               </button>
//             </div>
//           </>
//         )}
//       </div>
//     </div>
//   );
// }

//code 5 export to pdf is quirky
// 'use client';

// import React, { useState, useEffect } from "react";
// import jsPDF from "jspdf";
// import "../../globals.css";

// export default function SlideCreator() {
//   const [folderStructure, setFolderStructure] = useState([]);
//   const [currentSlides, setCurrentSlides] = useState([]);
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [showFilename, setShowFilename] = useState(false);
//   const [words, setWords] = useState([]);
//   const [newWord, setNewWord] = useState("");

//   const handleFolderSelect = (event) => {
//     const files = Array.from(event.target.files).filter((file) =>
//       file.type.startsWith("image/")
//     );
//     const folderStructure = buildFolderStructure(files);
//     setFolderStructure(folderStructure);
//     const allSlides = flattenSlides(folderStructure);
//     setCurrentSlides(allSlides);
//     setCurrentIndex(0);
//   };

//   const buildFolderStructure = (files) => {
//     const folderMap = {};
//     files.forEach((file) => {
//       const path = file.webkitRelativePath.split("/");
//       const level1 = path[0];
//       const level2 = path[1];
//       if (!folderMap[level1]) folderMap[level1] = {};
//       if (!folderMap[level1][level2]) folderMap[level1][level2] = [];
//       folderMap[level1][level2].push(file);
//     });
//     return Object.entries(folderMap).map(([level1Name, level2Folders]) => ({
//       folderName: level1Name,
//       subfolders: Object.entries(level2Folders)
//         .map(([level2Name, files]) => ({
//           subfolderName: level2Name,
//           files: files.sort((a, b) => extractNumber(a.name) - extractNumber(b.name)),
//         }))
//         .sort((a, b) => extractNumber(a.subfolderName) - extractNumber(b.subfolderName)),
//     }));
//   };

//   const extractNumber = (name) => {
//     const match = name.match(/^(\d+)\./);
//     return match ? parseInt(match[1], 10) : Number.MAX_SAFE_INTEGER;
//   };

//   const flattenSlides = (structure) => {
//     const slides = [];
//     structure.forEach((level1) => {
//       level1.subfolders.forEach((level2) => {
//         level2.files.forEach((file) => {
//           slides.push({ level1: level1.folderName, level2: level2.subfolderName, file });
//         });
//       });
//     });
//     return slides;
//   };

//   const handleNextSlide = () => setCurrentIndex((prev) => (prev + 1) % currentSlides.length);
//   const handlePrevSlide = () =>
//     setCurrentIndex((prev) => (prev - 1 + currentSlides.length) % currentSlides.length);
//   const handleToggleFilename = () => setShowFilename((prev) => !prev);

//   const handleExportToPDF = async () => {
//     const pdf = new jsPDF();
//     let yOffset = 10;
//     const margin = 10;
//     if (folderStructure.length === 0) return;
//     const level1 = folderStructure[0];
//     const files = level1.subfolders.flatMap((s) => s.files || []);
//     if (!files.length) return;

//     pdf.setFontSize(16);
//     pdf.text(level1.folderName, 10, yOffset);
//     yOffset += 20;

//     for (const file of files) {
//       const imgURL = URL.createObjectURL(file);
//       const img = new Image();
//       img.src = imgURL;
//       await new Promise((resolve) => {
//         img.onload = () => {
//           const imgWidth = 190;
//           const imgHeight = (img.height / img.width) * imgWidth;
//           if (yOffset + imgHeight + 20 > pdf.internal.pageSize.height - 20) {
//             pdf.addPage();
//             yOffset = margin;
//           }
//           pdf.addImage(img, "JPEG", 10, yOffset, imgWidth, imgHeight);
//           yOffset += imgHeight + 10;
//           pdf.setFontSize(12);
//           pdf.text(file.name.replace(/\.[^/.]+$/, ""), 10, yOffset);
//           yOffset += 10;
//           URL.revokeObjectURL(imgURL);
//           resolve();
//         };
//       });
//     }
//     pdf.save("slides.pdf");
//   };

//   const handleAddWord = () => {
//     if (newWord.trim() !== "") {
//       setWords([...words, newWord]);
//       setNewWord("");
//     }
//   };

//   const handleDeleteWord = (word) => setWords(words.filter((w) => w !== word));
//   const handleDownloadWords = () => {
//     const blob = new Blob([words.join("\n")], { type: "text/plain" });
//     const link = document.createElement("a");
//     link.href = URL.createObjectURL(blob);
//     link.download = "words.txt";
//     link.click();
//   };

//   const handleKeyDown = (e) => e.key === "Enter" && handleAddWord();

//   useEffect(() => {
//     const handleKeyDownEvent = (e) => {
//       if (e.key === "ArrowRight") handleNextSlide();
//       else if (e.key === "ArrowLeft") handlePrevSlide();
//     };
//     window.addEventListener("keydown", handleKeyDownEvent);
//     return () => window.removeEventListener("keydown", handleKeyDownEvent);
//   }, [currentSlides]);

//   // --- Styles ---
//   const buttonStyle = {
//     padding: "8px 16px",
//     margin: "4px",
//     backgroundColor: "#b8860b",
//     color: "white",
//     border: "none",
//     borderRadius: "8px",
//     cursor: "pointer",
//     fontWeight: "bold",
//   };

//   const topBarStyle = {
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "space-between",
//     padding: "10px 20px",
//     backgroundColor: "#fff8dc",
//     borderBottom: "2px solid #b8860b",
//     position: "sticky",
//     top: 0,
//     zIndex: 1000,
//   };

//   const leftBarGroup = { display: "flex", alignItems: "center", gap: "10px" };
//   const rightBarGroup = { display: "flex", alignItems: "center", gap: "10px" };

//   const mainContainer = {
//     display: "flex",
//     flexDirection: "column",
//     alignItems: "center",
//     padding: "20px",
//     gap: "20px",
//     minHeight: "calc(100vh - 60px)", // ensures footer stays at bottom
//   };

//   const contentRow = {
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "flex-start",
//     gap: "20px",
//     width: "90%",
//     maxWidth: "1200px",
//   };

//   const slideStyle = {
//     width: "400px",
//     height: "300px",
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//     border: "2px solid #b8860b",
//     borderRadius: "10px",
//     overflow: "hidden",
//     cursor: "pointer",
//     flexShrink: 0,
//   };

//   const wordPanelStyle = {
//     flexGrow: 1,
//     height: "300px",
//     border: "2px solid #b8860b",
//     borderRadius: "10px",
//     padding: "10px",
//     overflowY: "auto",
//     display: "flex",
//     flexWrap: "wrap",
//     alignContent: "flex-start",
//     gap: "10px",
//     backgroundColor: "#fffbe6",
//   };

//   const wordChipStyle = {
//     display: "flex",
//     alignItems: "center",
//     padding: "5px 10px",
//     backgroundColor: "#f0e68c",
//     borderRadius: "6px",
//     cursor: "pointer",
//     transition: "background-color 0.2s ease",
//   };

//   return (
//     <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
//       {/* Top bar */}
//       <div style={topBarStyle}>
//         <div style={leftBarGroup}>
//           <h2>Slide Creator</h2>
//           <input
//             type="file"
//             webkitdirectory=""
//             directory=""
//             multiple
//             onChange={handleFolderSelect}
//           />
//         </div>

//         {/* Show these only after selecting slides */}
//         {currentSlides.length > 0 && (
//           <div style={rightBarGroup}>
//             <input
//               type="text"
//               value={newWord}
//               onChange={(e) => setNewWord(e.target.value)}
//               onKeyDown={handleKeyDown}
//               placeholder="Type a word"
//             />
//             <button style={buttonStyle} onClick={handleAddWord}>
//               Add Word
//             </button>
//             <button style={buttonStyle} onClick={handleExportToPDF}>
//               Export to PDF
//             </button>
//             <button style={buttonStyle} onClick={handleDownloadWords}>
//               Download Words
//             </button>
//           </div>
//         )}
//       </div>

//       {/* Main content */}
//       <div style={mainContainer}>
//         {currentSlides.length > 0 && (
//           <>
//             <div style={contentRow}>
//               {/* Left: Slide */}
//               <div style={slideStyle} onClick={handleToggleFilename}>
//                 {showFilename ? (
//                   <p>{currentSlides[currentIndex].file.name.replace(/\.[^/.]+$/, "")}</p>
//                 ) : (
//                   <img
//                     src={URL.createObjectURL(currentSlides[currentIndex].file)}
//                     alt="Slide"
//                     style={{ maxWidth: "100%", maxHeight: "100%" }}
//                   />
//                 )}
//               </div>

//               {/* Right: Word panel */}
//               <div style={wordPanelStyle}>
//                 {words.map((word, index) => (
//                   <div
//                     key={index}
//                     style={wordChipStyle}
//                     onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#ffd700")}
//                     onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#f0e68c")}
//                   >
//                     <span>{word}</span>
//                     <button
//                       onClick={() => handleDeleteWord(word)}
//                       style={{
//                         marginLeft: "8px",
//                         cursor: "pointer",
//                         fontWeight: "bold",
//                         border: "none",
//                         background: "none",
//                         color: "#b22222",
//                       }}
//                     >
//                       ✕
//                     </button>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             <div>
//               <button style={buttonStyle} onClick={handlePrevSlide}>
//                 Previous
//               </button>
//               <button style={buttonStyle} onClick={handleNextSlide}>
//                 Next
//               </button>
//             </div>
//           </>
//         )}
//       </div>
//     </div>
//   );
// }

//code 6 works great
// 'use client';

// import React, { useState, useEffect } from "react";
// import jsPDF from "jspdf";
// import "../../globals.css";

// export default function SlideCreator() {
//   const [folderStructure, setFolderStructure] = useState([]);
//   const [currentSlides, setCurrentSlides] = useState([]);
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [showFilename, setShowFilename] = useState(false);
//   const [words, setWords] = useState([]);
//   const [newWord, setNewWord] = useState("");

//   const handleFolderSelect = (event) => {
//     const files = Array.from(event.target.files).filter((file) =>
//       file.type.startsWith("image/")
//     );
//     const folderStructure = buildFolderStructure(files);
//     setFolderStructure(folderStructure);
//     const allSlides = flattenSlides(folderStructure);
//     setCurrentSlides(allSlides);
//     setCurrentIndex(0);
//   };

//   const buildFolderStructure = (files) => {
//     const folderMap = {};
//     files.forEach((file) => {
//       const path = file.webkitRelativePath.split("/");
//       const level1 = path[0];
//       const level2 = path[1];
//       if (!folderMap[level1]) folderMap[level1] = {};
//       if (!folderMap[level1][level2]) folderMap[level1][level2] = [];
//       folderMap[level1][level2].push(file);
//     });
//     return Object.entries(folderMap).map(([level1Name, level2Folders]) => ({
//       folderName: level1Name,
//       subfolders: Object.entries(level2Folders)
//         .map(([level2Name, files]) => ({
//           subfolderName: level2Name,
//           files: files.sort((a, b) => extractNumber(a.name) - extractNumber(b.name)),
//         }))
//         .sort((a, b) => extractNumber(a.subfolderName) - extractNumber(b.subfolderName)),
//     }));
//   };

//   const extractNumber = (name) => {
//     const match = name.match(/^(\d+)\./);
//     return match ? parseInt(match[1], 10) : Number.MAX_SAFE_INTEGER;
//   };

//   const flattenSlides = (structure) => {
//     const slides = [];
//     structure.forEach((level1) => {
//       level1.subfolders.forEach((level2) => {
//         level2.files.forEach((file) => {
//           slides.push({ level1: level1.folderName, level2: level2.subfolderName, file });
//         });
//       });
//     });
//     return slides;
//   };

//   const handleNextSlide = () => setCurrentIndex((prev) => (prev + 1) % currentSlides.length);
//   const handlePrevSlide = () =>
//     setCurrentIndex((prev) => (prev - 1 + currentSlides.length) % currentSlides.length);
//   const handleToggleFilename = () => setShowFilename((prev) => !prev);

// //   const handleExportToPDF = async () => {
// //   if (folderStructure.length === 0) return;
// //   const pdf = new jsPDF("p", "mm", "a4");
// //   const pageWidth = pdf.internal.pageSize.width;
// //   const pageHeight = pdf.internal.pageSize.height;
// //   const margin = 10;

// //   // Flatten slides with title (filename)
// //   const slides = flattenSlides(folderStructure).map((s, index) => ({
// //     file: s.file,
// //     // title: s.file.name.replace(/\.[^/.]+$/, ""),
// //     title: s.file.name.replace(/^\d+\.?\s*/, "").replace(/\.[^/.]+$/, ""),
// //     number: index + 1,
// //   }));

// //   // --- Page 1: PICTURE LIST ---
// //   pdf.setFontSize(20);
// //   pdf.text("PICTURE LIST", pageWidth / 2, 20, { align: "center" });

// //   const imgWidth = 55; // each image width
// //   const imgHeight = 40; // approx height
// //   const spacingX = 10;
// //   const spacingY = 20;
// //   let x = margin;
// //   let y = 30;

// //   for (let i = 0; i < slides.length; i++) {
// //     const slide = slides[i];
// //     const imgURL = URL.createObjectURL(slide.file);
// //     const img = new Image();
// //     img.src = imgURL;

// //     // Await loading each image
// //     await new Promise((resolve) => {
// //       img.onload = () => {
// //         pdf.addImage(img, "JPEG", x, y, imgWidth, imgHeight);
// //         // Slide number and word
// //         pdf.setFontSize(10);
// //         pdf.text(`${slide.number}. ${slide.title}`, x + imgWidth / 2, y + imgHeight + 5, { align: "center" });

// //         URL.revokeObjectURL(imgURL);

// //         // Update x, y for 3 per row
// //         if ((i + 1) % 3 === 0) {
// //           x = margin;
// //           y += imgHeight + spacingY + 10;
// //         } else {
// //           x += imgWidth + spacingX;
// //         }

// //         // Add new page if space runs out
// //         if (y + imgHeight + 30 > pageHeight) {
// //           pdf.addPage();
// //           y = margin;
// //           x = margin;
// //         }
// //         resolve();
// //       };
// //     });
// //   }

// //   // --- Page 2: SUMMARY OF PICTURES ---
// //   pdf.addPage();
// //   pdf.setFontSize(20);
// //   pdf.text("SUMMARY OF PICTURES", pageWidth / 2, 20, { align: "center" });
// //   pdf.setFontSize(12);
// //   let ySummary = 30;
// //   slides.forEach((slide, idx) => {
// //     pdf.text(`${idx + 1}. ${slide.title}`, margin, ySummary);
// //     ySummary += 8;
// //     if (ySummary > pageHeight - margin) {
// //       pdf.addPage();
// //       ySummary = margin;
// //     }
// //   });

// //   // --- Page 3: VOCABULARY LIST ---
// //   pdf.addPage();
// //   pdf.setFontSize(20);
// //   pdf.text("VOCABULARY LIST", pageWidth / 2, 20, { align: "center" });
// //   pdf.setFontSize(12);
// //   let yWords = 30;
// //   words.forEach((word, idx) => {
// //     pdf.text(`- ${word}`, margin, yWords);
// //     yWords += 8;
// //     if (yWords > pageHeight - margin) {
// //       pdf.addPage();
// //       yWords = margin;
// //     }
// //   });

// //   pdf.save("slides.pdf");
// // };
// const handleExportToPDF = async () => {
//   if (folderStructure.length === 0) return;
//   const pdf = new jsPDF("p", "mm", "a4");
//   const pageWidth = pdf.internal.pageSize.width;
//   const pageHeight = pdf.internal.pageSize.height;
//   const margin = 10;

//   // Flatten slides with title (filename)
//   const slides = flattenSlides(folderStructure).map((s, index) => ({
//     file: s.file,
//     title: s.file.name.replace(/^\d+\.?\s*/, "").replace(/\.[^/.]+$/, ""),
//     number: index + 1,
//   }));

//   // --- Page 1: PICTURE LIST ---
//   pdf.setFontSize(20);
//   pdf.text("PICTURE LIST", pageWidth / 2, 20, { align: "center" });

//   const imgWidth = 55; // image width
//   const imgHeight = 40; // approximate height
//   const spacingX = 10;
//   const spacingY = 20;
//   let x = margin;
//   let y = 30;

//   for (let i = 0; i < slides.length; i++) {
//     const slide = slides[i];
//     const imgURL = URL.createObjectURL(slide.file);
//     const img = new Image();
//     img.src = imgURL;

//     await new Promise((resolve) => {
//       img.onload = () => {
//         pdf.addImage(img, "JPEG", x, y, imgWidth, imgHeight);
//         pdf.setFontSize(10);
//         pdf.text(`${slide.number}. ${slide.title}`, x + imgWidth / 2, y + imgHeight + 5, { align: "center" });
//         URL.revokeObjectURL(imgURL);

//         if ((i + 1) % 3 === 0) {
//           x = margin;
//           y += imgHeight + spacingY + 10;
//         } else {
//           x += imgWidth + spacingX;
//         }

//         if (y + imgHeight + 30 > pageHeight) {
//           pdf.addPage();
//           y = margin;
//           x = margin;
//         }
//         resolve();
//       };
//     });
//   }

//   // --- Page 2: SUMMARY OF PICTURES (Table style) ---
//   pdf.addPage();
//   pdf.setFontSize(20);
//   pdf.text("SUMMARY OF PICTURES", pageWidth / 2, 20, { align: "center" });

//   const tableX = margin;
//   let tableY = 30;
//   const colWidth = (pageWidth - 2 * margin) / 2;
//   const rowHeight = 10;
//   pdf.setFontSize(12);

//   slides.forEach((slide, idx) => {
//     const col = idx % 2;
//     if (col === 0 && idx !== 0) tableY += rowHeight;
//     const textX = tableX + col * colWidth + colWidth / 2;
//     pdf.text(`${idx + 1}. ${slide.title}`, textX, tableY, { align: "center" });

//     if (tableY + rowHeight > pageHeight - margin) {
//       pdf.addPage();
//       tableY = margin;
//     }
//   });

//   // --- Page 3: VOCABULARY LIST (Table style) ---
//   pdf.addPage();
//   pdf.setFontSize(20);
//   pdf.text("VOCABULARY LIST", pageWidth / 2, 20, { align: "center" });

//   tableY = 30;
//   const wordsPerRow = 3;
//   const wordColWidth = (pageWidth - 2 * margin) / wordsPerRow;
//   pdf.setFontSize(12);

//   words.forEach((word, idx) => {
//     const col = idx % wordsPerRow;
//     if (col === 0 && idx !== 0) tableY += rowHeight;
//     const textX = tableX + col * wordColWidth + wordColWidth / 2;
//     pdf.text(`${word}`, textX, tableY, { align: "center" });

//     if (tableY + rowHeight > pageHeight - margin) {
//       pdf.addPage();
//       tableY = margin;
//     }
//   });

//   pdf.save("slides.pdf");
// };



//   const handleAddWord = () => {
//     if (newWord.trim() !== "") {
//       setWords([...words, newWord]);
//       setNewWord("");
//     }
//   };

//   const handleDeleteWord = (word) => setWords(words.filter((w) => w !== word));
//   const handleDownloadWords = () => {
//     const blob = new Blob([words.join("\n")], { type: "text/plain" });
//     const link = document.createElement("a");
//     link.href = URL.createObjectURL(blob);
//     link.download = "words.txt";
//     link.click();
//   };

//   const handleKeyDown = (e) => e.key === "Enter" && handleAddWord();

//   useEffect(() => {
//     const handleKeyDownEvent = (e) => {
//       if (e.key === "ArrowRight") handleNextSlide();
//       else if (e.key === "ArrowLeft") handlePrevSlide();
//     };
//     window.addEventListener("keydown", handleKeyDownEvent);
//     return () => window.removeEventListener("keydown", handleKeyDownEvent);
//   }, [currentSlides]);

//   // --- Styles ---
//   const buttonStyle = {
//     padding: "8px 16px",
//     margin: "4px",
//     backgroundColor: "#b8860b",
//     color: "white",
//     border: "none",
//     borderRadius: "8px",
//     cursor: "pointer",
//     fontWeight: "bold",
//   };

//   const topBarStyle = {
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "space-between",
//     padding: "10px 20px",
//     backgroundColor: "#fff8dc",
//     borderBottom: "2px solid #b8860b",
//     position: "sticky",
//     top: 0,
//     zIndex: 1000,
//   };

//   const leftBarGroup = { display: "flex", alignItems: "center", gap: "10px" };
//   const rightBarGroup = { display: "flex", alignItems: "center", gap: "10px", marginLeft: "20px" };

//   const mainContainer = {
//     display: "flex",
//     flexDirection: "column",
//     alignItems: "center",
//     padding: "20px",
//     gap: "20px",
//     minHeight: "calc(100vh - 60px)", // ensures footer stays at bottom
//   };

//   const contentRow = {
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "flex-start",
//     gap: "20px",
//     width: "90%",
//     maxWidth: "1200px",
//   };

//   const slideStyle = {
//     width: "400px",
//     height: "300px",
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//     border: "2px solid #b8860b",
//     borderRadius: "10px",
//     overflow: "hidden",
//     cursor: "pointer",
//     flexShrink: 0,
//   };

//   const wordPanelStyle = {
//     flexGrow: 1,
//     height: "300px",
//     border: "2px solid #b8860b",
//     borderRadius: "10px",
//     padding: "10px",
//     overflowY: "auto",
//     display: "flex",
//     flexWrap: "wrap",
//     alignContent: "flex-start",
//     gap: "10px",
//     backgroundColor: "#fffbe6",
//   };

//   const wordChipStyle = {
//     display: "flex",
//     alignItems: "center",
//     padding: "5px 10px",
//     backgroundColor: "#f0e68c",
//     borderRadius: "6px",
//     cursor: "pointer",
//     transition: "background-color 0.2s ease",
//   };

//   return (
//     <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
//       {/* Top bar */}
//       <div style={topBarStyle}>
//         <div style={leftBarGroup}>
//           <h2>Slide Creator</h2>
//           <input
//             type="file"
//             webkitdirectory=""
//             directory=""
//             multiple
//             onChange={handleFolderSelect}
//           />
//         </div>

//         {/* Show these only after selecting slides */}
//         {currentSlides.length > 0 && (
//           <div style={rightBarGroup}>
//             <input
//               type="text"
//               value={newWord}
//               onChange={(e) => setNewWord(e.target.value)}
//               onKeyDown={handleKeyDown}
//               placeholder="Type a word"
//             />
//             <button style={buttonStyle} onClick={handleAddWord}>
//               Add Word
//             </button>
//             <button style={buttonStyle} onClick={handleExportToPDF}>
//               Export to PDF
//             </button>
//             <button style={buttonStyle} onClick={handleDownloadWords}>
//               Download Words
//             </button>
//           </div>
//         )}
//       </div>

//       {/* Main content */}
//       <div style={mainContainer}>
//         {currentSlides.length > 0 && (
//           <>
//             <div style={contentRow}>
//               {/* Left: Slide */}
//               <div style={slideStyle} onClick={handleToggleFilename}>
//                 {showFilename ? (
//                   <p>{currentSlides[currentIndex].file.name.replace(/\.[^/.]+$/, "")}</p>
//                 ) : (
//                   <img
//                     src={URL.createObjectURL(currentSlides[currentIndex].file)}
//                     alt="Slide"
//                     style={{ maxWidth: "100%", maxHeight: "100%" }}
//                   />
//                 )}
//               </div>

//               {/* Right: Word panel */}
//               <div style={wordPanelStyle}>
//                 {words.map((word, index) => (
//                   <div
//                     key={index}
//                     style={wordChipStyle}
//                     onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#ffd700")}
//                     onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#f0e68c")}
//                   >
//                     <span>{word}</span>
//                     <button
//                       onClick={() => handleDeleteWord(word)}
//                       style={{
//                         marginLeft: "8px",
//                         cursor: "pointer",
//                         fontWeight: "bold",
//                         border: "none",
//                         background: "none",
//                         color: "#b22222",
//                       }}
//                     >
//                       ✕
//                     </button>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             <div>
//               <button style={buttonStyle} onClick={handlePrevSlide}>
//                 Previous
//               </button>
//               <button style={buttonStyle} onClick={handleNextSlide}>
//                 Next
//               </button>
//             </div>
//           </>
//         )}
//       </div>
//     </div>
//   );
// }

//code 7 are you ready to jumble missing fill in the blank in order
// 'use client';

// import React, { useState, useEffect } from "react";
// import jsPDF from "jspdf";
// import "../../globals.css";

// export default function SlideCreator() {
//   const [folderStructure, setFolderStructure] = useState([]);
//   const [currentSlides, setCurrentSlides] = useState([]);
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [showFilename, setShowFilename] = useState(false);
//   const [words, setWords] = useState([]);
//   const [newWord, setNewWord] = useState("");

//   const handleFolderSelect = (event) => {
//     const files = Array.from(event.target.files).filter((file) =>
//       file.type.startsWith("image/")
//     );
//     const folderStructure = buildFolderStructure(files);
//     setFolderStructure(folderStructure);
//     const allSlides = flattenSlides(folderStructure);
//     setCurrentSlides(allSlides);
//     setCurrentIndex(0);
//   };

//   const buildFolderStructure = (files) => {
//     const folderMap = {};
//     files.forEach((file) => {
//       const path = file.webkitRelativePath.split("/");
//       const level1 = path[0];
//       const level2 = path[1];
//       if (!folderMap[level1]) folderMap[level1] = {};
//       if (!folderMap[level1][level2]) folderMap[level1][level2] = [];
//       folderMap[level1][level2].push(file);
//     });
//     return Object.entries(folderMap).map(([level1Name, level2Folders]) => ({
//       folderName: level1Name,
//       subfolders: Object.entries(level2Folders)
//         .map(([level2Name, files]) => ({
//           subfolderName: level2Name,
//           files: files.sort((a, b) => extractNumber(a.name) - extractNumber(b.name)),
//         }))
//         .sort((a, b) => extractNumber(a.subfolderName) - extractNumber(b.subfolderName)),
//     }));
//   };

//   const extractNumber = (name) => {
//     const match = name.match(/^(\d+)\./);
//     return match ? parseInt(match[1], 10) : Number.MAX_SAFE_INTEGER;
//   };

//   const flattenSlides = (structure) => {
//     const slides = [];
//     structure.forEach((level1) => {
//       level1.subfolders.forEach((level2) => {
//         level2.files.forEach((file) => {
//           slides.push({ level1: level1.folderName, level2: level2.subfolderName, file });
//         });
//       });
//     });
//     return slides;
//   };

//   const handleNextSlide = () => setCurrentIndex((prev) => (prev + 1) % currentSlides.length);
//   const handlePrevSlide = () =>
//     setCurrentIndex((prev) => (prev - 1 + currentSlides.length) % currentSlides.length);
//   const handleToggleFilename = () => setShowFilename((prev) => !prev);

// const handleExportToPDF = async () => {
//   if (folderStructure.length === 0) return;
//   const pdf = new jsPDF("p", "mm", "a4");
//   const pageWidth = pdf.internal.pageSize.width;
//   const pageHeight = pdf.internal.pageSize.height;
//   const margin = 10;

//   // Flatten slides with clean titles
//   const slides = flattenSlides(folderStructure).map((s, index) => ({
//     file: s.file,
//     title: s.file.name.replace(/^\d+\.?\s*/, "").replace(/\.[^/.]+$/, ""),
//     number: index + 1,
//   }));

//   // --- PAGE 1: PICTURE LIST ---
//   pdf.setFontSize(20);
//   pdf.text("PICTURE LIST", pageWidth / 2, 20, { align: "center" });

//   const imgWidth = 55;
//   const imgHeight = 40;
//   const spacingX = 10;
//   const spacingY = 25; // more vertical spacing to fit text neatly
//   let x = margin;
//   let y = 30;

//   for (let i = 0; i < slides.length; i++) {
//     const slide = slides[i];
//     const imgURL = URL.createObjectURL(slide.file);
//     const img = new Image();
//     img.src = imgURL;

//     await new Promise((resolve) => {
//       img.onload = () => {
//         // add image
//         pdf.addImage(img, "JPEG", x, y, imgWidth, imgHeight);

//         // add wrapped text below
//         const title = `${slide.number}. ${slide.title}`;
//         pdf.setFontSize(10);

//         const textY = y + imgHeight + 5;
//         const textX = x + imgWidth / 2;

//         // wrap text manually so it doesn’t overlap
//         const maxTextWidth = imgWidth - 4;
//         const splitText = pdf.splitTextToSize(title, maxTextWidth);
//         splitText.forEach((line, idx) => {
//           pdf.text(line, textX, textY + idx * 4, { align: "center" });
//         });

//         URL.revokeObjectURL(imgURL);

//         // spacing and layout
//         const rowHeight = imgHeight + spacingY + splitText.length * 4;
//         if ((i + 1) % 3 === 0) {
//           x = margin;
//           y += rowHeight;
//         } else {
//           x += imgWidth + spacingX;
//         }

//         // new page if overflowing
//         if (y + imgHeight + 40 > pageHeight) {
//           pdf.addPage();
//           y = margin;
//           x = margin;
//         }
//         resolve();
//       };
//     });
//   }

//   // --- PAGE 2: "ARE YOU READY TO JUMBLE?" ---
//   pdf.addPage();
//   pdf.setFontSize(20);
//   pdf.text("ARE YOU READY TO JUMBLE?", pageWidth / 2, 20, { align: "center" });

//   // randomize slides
//   const shuffledSlides = [...slides].sort(() => Math.random() - 0.5);
//   x = margin;
//   y = 30;

//   for (let i = 0; i < shuffledSlides.length; i++) {
//     const slide = shuffledSlides[i];
//     const imgURL = URL.createObjectURL(slide.file);
//     const img = new Image();
//     img.src = imgURL;

//     await new Promise((resolve) => {
//       img.onload = () => {
//         // draw image
//         pdf.addImage(img, "JPEG", x, y, imgWidth, imgHeight);
//         URL.revokeObjectURL(imgURL);

//         // draw blank line for students
//         const lineY = y + imgHeight + 8;
//         pdf.setDrawColor(0);
//         pdf.line(x + 5, lineY, x + imgWidth - 5, lineY);

//         // move layout
//         if ((i + 1) % 3 === 0) {
//           x = margin;
//           y += imgHeight + spacingY + 10;
//         } else {
//           x += imgWidth + spacingX;
//         }

//         // new page if overflow
//         if (y + imgHeight + 30 > pageHeight) {
//           pdf.addPage();
//           y = margin;
//           x = margin;
//         }
//         resolve();
//       };
//     });
//   }

//   // --- PAGE 3: SUMMARY OF PICTURES ---
//   pdf.addPage();
//   pdf.setFontSize(20);
//   pdf.text("SUMMARY OF PICTURES", pageWidth / 2, 20, { align: "center" });

//   const tableX = margin;
//   let tableY = 30;
//   const colWidth = (pageWidth - 2 * margin) / 2;
//   const rowHeight = 10;
//   pdf.setFontSize(12);

//   slides.forEach((slide, idx) => {
//     const col = idx % 2;
//     if (col === 0 && idx !== 0) tableY += rowHeight;
//     const textX = tableX + col * colWidth + colWidth / 2;
//     pdf.text(`${idx + 1}. ${slide.title}`, textX, tableY, { align: "center" });

//     if (tableY + rowHeight > pageHeight - margin) {
//       pdf.addPage();
//       tableY = margin;
//     }
//   });

//   // --- PAGE 4: VOCABULARY LIST ---
//   pdf.addPage();
//   pdf.setFontSize(20);
//   pdf.text("VOCABULARY LIST", pageWidth / 2, 20, { align: "center" });

//   tableY = 30;
//   const wordsPerRow = 3;
//   const wordColWidth = (pageWidth - 2 * margin) / wordsPerRow;
//   pdf.setFontSize(12);

//   words.forEach((word, idx) => {
//     const col = idx % wordsPerRow;
//     if (col === 0 && idx !== 0) tableY += rowHeight;
//     const textX = tableX + col * wordColWidth + wordColWidth / 2;
//     pdf.text(`${word}`, textX, tableY, { align: "center" });

//     if (tableY + rowHeight > pageHeight - margin) {
//       pdf.addPage();
//       tableY = margin;
//     }
//   });

//   pdf.save("slides.pdf");
// };

//   const handleAddWord = () => {
//     if (newWord.trim() !== "") {
//       setWords([...words, newWord]);
//       setNewWord("");
//     }
//   };

//   const handleDeleteWord = (word) => setWords(words.filter((w) => w !== word));
//   const handleDownloadWords = () => {
//     const blob = new Blob([words.join("\n")], { type: "text/plain" });
//     const link = document.createElement("a");
//     link.href = URL.createObjectURL(blob);
//     link.download = "words.txt";
//     link.click();
//   };

//   const handleKeyDown = (e) => e.key === "Enter" && handleAddWord();

//   useEffect(() => {
//     const handleKeyDownEvent = (e) => {
//       if (e.key === "ArrowRight") handleNextSlide();
//       else if (e.key === "ArrowLeft") handlePrevSlide();
//     };
//     window.addEventListener("keydown", handleKeyDownEvent);
//     return () => window.removeEventListener("keydown", handleKeyDownEvent);
//   }, [currentSlides]);

//   // --- Styles ---
//   const buttonStyle = {
//     padding: "8px 16px",
//     margin: "4px",
//     backgroundColor: "#b8860b",
//     color: "white",
//     border: "none",
//     borderRadius: "8px",
//     cursor: "pointer",
//     fontWeight: "bold",
//   };

//   const topBarStyle = {
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "space-between",
//     padding: "10px 20px",
//     backgroundColor: "#fff8dc",
//     borderBottom: "2px solid #b8860b",
//     position: "sticky",
//     top: 0,
//     zIndex: 1000,
//   };

//   const leftBarGroup = { display: "flex", alignItems: "center", gap: "10px" };
//   const rightBarGroup = { display: "flex", alignItems: "center", gap: "10px", marginLeft: "20px" };

//   const mainContainer = {
//     display: "flex",
//     flexDirection: "column",
//     alignItems: "center",
//     padding: "20px",
//     gap: "20px",
//     minHeight: "calc(100vh - 60px)", // ensures footer stays at bottom
//   };

//   const contentRow = {
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "flex-start",
//     gap: "20px",
//     width: "90%",
//     maxWidth: "1200px",
//   };

//   const slideStyle = {
//     width: "400px",
//     height: "300px",
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//     border: "2px solid #b8860b",
//     borderRadius: "10px",
//     overflow: "hidden",
//     cursor: "pointer",
//     flexShrink: 0,
//   };

//   const wordPanelStyle = {
//     flexGrow: 1,
//     height: "300px",
//     border: "2px solid #b8860b",
//     borderRadius: "10px",
//     padding: "10px",
//     overflowY: "auto",
//     display: "flex",
//     flexWrap: "wrap",
//     alignContent: "flex-start",
//     gap: "10px",
//     backgroundColor: "#fffbe6",
//   };

//   const wordChipStyle = {
//     display: "flex",
//     alignItems: "center",
//     padding: "5px 10px",
//     backgroundColor: "#f0e68c",
//     borderRadius: "6px",
//     cursor: "pointer",
//     transition: "background-color 0.2s ease",
//   };

//   return (
//     <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
//       {/* Top bar */}
//       <div style={topBarStyle}>
//         <div style={leftBarGroup}>
//           <h2>Slide Creator</h2>
//           <input
//             type="file"
//             webkitdirectory=""
//             directory=""
//             multiple
//             onChange={handleFolderSelect}
//           />
//         </div>

//         {/* Show these only after selecting slides */}
//         {currentSlides.length > 0 && (
//           <div style={rightBarGroup}>
//             <input
//               type="text"
//               value={newWord}
//               onChange={(e) => setNewWord(e.target.value)}
//               onKeyDown={handleKeyDown}
//               placeholder="Type a word"
//             />
//             <button style={buttonStyle} onClick={handleAddWord}>
//               Add Word
//             </button>
//             <button style={buttonStyle} onClick={handleExportToPDF}>
//               Export to PDF
//             </button>
//             <button style={buttonStyle} onClick={handleDownloadWords}>
//               Download Words
//             </button>
//           </div>
//         )}
//       </div>

//       {/* Main content */}
//       <div style={mainContainer}>
//         {currentSlides.length > 0 && (
//           <>
//             <div style={contentRow}>
//               {/* Left: Slide */}
//               <div style={slideStyle} onClick={handleToggleFilename}>
//                 {showFilename ? (
//                   <p>{currentSlides[currentIndex].file.name.replace(/\.[^/.]+$/, "")}</p>
//                 ) : (
//                   <img
//                     src={URL.createObjectURL(currentSlides[currentIndex].file)}
//                     alt="Slide"
//                     style={{ maxWidth: "100%", maxHeight: "100%" }}
//                   />
//                 )}
//               </div>

//               {/* Right: Word panel */}
//               <div style={wordPanelStyle}>
//                 {words.map((word, index) => (
//                   <div
//                     key={index}
//                     style={wordChipStyle}
//                     onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#ffd700")}
//                     onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#f0e68c")}
//                   >
//                     <span>{word}</span>
//                     <button
//                       onClick={() => handleDeleteWord(word)}
//                       style={{
//                         marginLeft: "8px",
//                         cursor: "pointer",
//                         fontWeight: "bold",
//                         border: "none",
//                         background: "none",
//                         color: "#b22222",
//                       }}
//                     >
//                       ✕
//                     </button>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             <div>
//               <button style={buttonStyle} onClick={handlePrevSlide}>
//                 Previous
//               </button>
//               <button style={buttonStyle} onClick={handleNextSlide}>
//                 Next
//               </button>
//             </div>
//           </>
//         )}
//       </div>
//     </div>
//   );
// }

//code 8 works great
// 'use client';

// import React, { useState, useEffect } from "react";
// import jsPDF from "jspdf";
// import "../../globals.css";

// export default function SlideCreator() {
//   const [folderStructure, setFolderStructure] = useState([]);
//   const [currentSlides, setCurrentSlides] = useState([]);
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [showFilename, setShowFilename] = useState(false);
//   const [words, setWords] = useState([]);
//   const [newWord, setNewWord] = useState("");

//   const handleFolderSelect = (event) => {
//     const files = Array.from(event.target.files).filter((file) =>
//       file.type.startsWith("image/")
//     );
//     const folderStructure = buildFolderStructure(files);
//     setFolderStructure(folderStructure);
//     const allSlides = flattenSlides(folderStructure);
//     setCurrentSlides(allSlides);
//     setCurrentIndex(0);
//   };

//   const buildFolderStructure = (files) => {
//     const folderMap = {};
//     files.forEach((file) => {
//       const path = file.webkitRelativePath.split("/");
//       const level1 = path[0];
//       const level2 = path[1];
//       if (!folderMap[level1]) folderMap[level1] = {};
//       if (!folderMap[level1][level2]) folderMap[level1][level2] = [];
//       folderMap[level1][level2].push(file);
//     });
//     return Object.entries(folderMap).map(([level1Name, level2Folders]) => ({
//       folderName: level1Name,
//       subfolders: Object.entries(level2Folders)
//         .map(([level2Name, files]) => ({
//           subfolderName: level2Name,
//           files: files.sort((a, b) => extractNumber(a.name) - extractNumber(b.name)),
//         }))
//         .sort((a, b) => extractNumber(a.subfolderName) - extractNumber(b.subfolderName)),
//     }));
//   };

//   const extractNumber = (name) => {
//     const match = name.match(/^(\d+)\./);
//     return match ? parseInt(match[1], 10) : Number.MAX_SAFE_INTEGER;
//   };

//   const flattenSlides = (structure) => {
//     const slides = [];
//     structure.forEach((level1) => {
//       level1.subfolders.forEach((level2) => {
//         level2.files.forEach((file) => {
//           slides.push({ level1: level1.folderName, level2: level2.subfolderName, file });
//         });
//       });
//     });
//     return slides;
//   };

//   const handleNextSlide = () => setCurrentIndex((prev) => (prev + 1) % currentSlides.length);
//   const handlePrevSlide = () =>
//     setCurrentIndex((prev) => (prev - 1 + currentSlides.length) % currentSlides.length);
//   const handleToggleFilename = () => setShowFilename((prev) => !prev);

// const handleExportToPDF = async () => {
//   if (folderStructure.length === 0) return;
//   const pdf = new jsPDF("p", "mm", "a4");
//   const pageWidth = pdf.internal.pageSize.width;
//   const pageHeight = pdf.internal.pageSize.height;
//   const margin = 10;

//   const slides = flattenSlides(folderStructure).map((s, index) => ({
//     file: s.file,
//     title: s.file.name.replace(/^\d+\.?\s*/, "").replace(/\.[^/.]+$/, ""),
//     number: index + 1,
//   }));

//   // --- PAGE 1: PICTURE LIST ---
//   pdf.setFontSize(20);
//   pdf.text("PICTURE LIST", pageWidth / 2, 20, { align: "center" });

//   const imgWidth = 55;
//   const imgHeight = 40;
//   const spacingX = 10;
//   const spacingY = 25;
//   let x = margin;
//   let y = 30;

//   for (let i = 0; i < slides.length; i++) {
//     const slide = slides[i];
//     const imgURL = URL.createObjectURL(slide.file);
//     const img = new Image();
//     img.src = imgURL;

//     await new Promise((resolve) => {
//       img.onload = () => {
//         pdf.addImage(img, "JPEG", x, y, imgWidth, imgHeight);
//         const title = `${slide.number}. ${slide.title}`;
//         pdf.setFontSize(10);
//         const textY = y + imgHeight + 5;
//         const textX = x + imgWidth / 2;
//         const splitText = pdf.splitTextToSize(title, imgWidth - 4);
//         splitText.forEach((line, idx) => {
//           pdf.text(line, textX, textY + idx * 4, { align: "center" });
//         });
//         URL.revokeObjectURL(imgURL);

//         const rowHeight = imgHeight + spacingY + splitText.length * 4;
//         if ((i + 1) % 3 === 0) {
//           x = margin;
//           y += rowHeight;
//         } else {
//           x += imgWidth + spacingX;
//         }
//         if (y + imgHeight + 40 > pageHeight) {
//           pdf.addPage();
//           y = margin;
//           x = margin;
//         }
//         resolve();
//       };
//     });
//   }

//   // --- PAGE 2: FILL IN THE BLANKS (same order, numbered, with blank lines) ---
// pdf.addPage();
// pdf.setFontSize(20);
// pdf.text("FILL IN THE BLANKS", pageWidth / 2, 20, { align: "center" });

// x = margin;
// y = 30;

// for (let i = 0; i < slides.length; i++) {
//   const slide = slides[i];
//   const imgURL = URL.createObjectURL(slide.file);
//   const img = new Image();
//   img.src = imgURL;

//   await new Promise((resolve) => {
//     img.onload = () => {
//       pdf.addImage(img, "JPEG", x, y, imgWidth, imgHeight);

//       // centered short line with number
//       const lineY = y + imgHeight + 6;
//       const lineLength = imgWidth * 0.6;
//       const lineX = x + (imgWidth - lineLength) / 2;
//       pdf.setDrawColor(0);
//       pdf.line(lineX, lineY, lineX + lineLength, lineY);

//       // number label centered below the image
//       pdf.setFontSize(10);
//       pdf.text(`${slide.number}`, x + imgWidth / 2, lineY + 5, { align: "center" });

//       URL.revokeObjectURL(imgURL);

//       if ((i + 1) % 3 === 0) {
//         x = margin;
//         y += imgHeight + spacingY + 10;
//       } else {
//         x += imgWidth + spacingX;
//       }

//       if (y + imgHeight + 30 > pageHeight) {
//         pdf.addPage();
//         y = margin;
//         x = margin;
//       }
//       resolve();
//     };
//   });
// }

//   // --- PAGE 3: ARE YOU READY TO JUMBLE? ---
//   pdf.addPage();
//   pdf.setFontSize(20);
//   pdf.text("ARE YOU READY TO JUMBLE?", pageWidth / 2, 20, { align: "center" });

//   const shuffledSlides = [...slides].sort(() => Math.random() - 0.5);
//   x = margin;
//   y = 30;

//   for (let i = 0; i < shuffledSlides.length; i++) {
//     const slide = shuffledSlides[i];
//     const imgURL = URL.createObjectURL(slide.file);
//     const img = new Image();
//     img.src = imgURL;

//     await new Promise((resolve) => {
//       img.onload = () => {
//         pdf.addImage(img, "JPEG", x, y, imgWidth, imgHeight);
//         URL.revokeObjectURL(imgURL);

//         const lineY = y + imgHeight + 8;
//         pdf.setDrawColor(0);
//         pdf.line(x + 5, lineY, x + imgWidth - 5, lineY);

//         if ((i + 1) % 3 === 0) {
//           x = margin;
//           y += imgHeight + spacingY + 10;
//         } else {
//           x += imgWidth + spacingX;
//         }
//         if (y + imgHeight + 30 > pageHeight) {
//           pdf.addPage();
//           y = margin;
//           x = margin;
//         }
//         resolve();
//       };
//     });
//   }

//   // // --- PAGE 4: SUMMARY OF PICTURES ---
//   // pdf.addPage();
//   // pdf.setFontSize(20);
//   // pdf.text("SUMMARY OF PICTURES", pageWidth / 2, 20, { align: "center" });

//   // const tableX = margin;
//   // let tableY = 30;
//   // const colWidth = (pageWidth - 2 * margin) / 2;
//   // const rowHeight = 10;
//   // pdf.setFontSize(12);

//   // slides.forEach((slide, idx) => {
//   //   const col = idx % 2;
//   //   if (col === 0 && idx !== 0) tableY += rowHeight;
//   //   const textX = tableX + col * colWidth + colWidth / 2;
//   //   pdf.text(`${idx + 1}. ${slide.title}`, textX, tableY, { align: "center" });
//   //   if (tableY + rowHeight > pageHeight - margin) {
//   //     pdf.addPage();
//   //     tableY = margin;
//   //   }
//   // });

//   // --- PAGE 4: SUMMARY OF PICTURES ---
// pdf.addPage();
// pdf.setFontSize(20);
// pdf.text("SUMMARY OF PICTURES", pageWidth / 2, 20, { align: "center" });

// let tableY = 30;
// pdf.setFontSize(12);

// const colWidth = (pageWidth - 2 * margin) / 2 - 5; // small gap between columns
// const rowHeight = 10; // base height per line

// for (let i = 0; i < slides.length; i++) {
//   const col = i % 2;
//   const x = margin + col * (colWidth + 10); // add small horizontal spacing
//   const slideTitle = `${i + 1}. ${slides[i].title}`;

//   // wrap long text
//   const splitTitle = pdf.splitTextToSize(slideTitle, colWidth - 5);
//   const linesUsed = splitTitle.length;

//   // print each line with spacing
//   splitTitle.forEach((line, idx) => {
//     pdf.text(line, x + colWidth / 2, tableY + idx * 5, { align: "center" });
//   });

//   // after both columns filled, move down
//   if (col === 1 || i === slides.length - 1) {
//     // find max vertical height used by wrapped lines
//     const maxLines = Math.max(
//       splitTitle.length,
//       slides[i - 1] ? pdf.splitTextToSize(`${i}. ${slides[i - 1].title}`, colWidth - 5).length : 1
//     );
//     tableY += maxLines * 7 + 5; // 7 per line + extra padding
//   }

//   // page break if near bottom
//   if (tableY + rowHeight > pageHeight - margin) {
//     pdf.addPage();
//     pdf.setFontSize(20);
//     pdf.text("SUMMARY OF PICTURES (continued)", pageWidth / 2, 20, { align: "center" });
//     tableY = 30;
//     pdf.setFontSize(12);
//   }
// }


//   // --- PAGE 5: VOCABULARY LIST ---
//   // pdf.addPage();
//   // pdf.setFontSize(20);
//   // pdf.text("VOCABULARY LIST", pageWidth / 2, 20, { align: "center" });

//   // tableY = 30;
//   // const wordsPerRow = 3;
//   // const wordColWidth = (pageWidth - 2 * margin) / wordsPerRow;
//   // pdf.setFontSize(12);

//   // words.forEach((word, idx) => {
//   //   const col = idx % wordsPerRow;
//   //   if (col === 0 && idx !== 0) tableY += rowHeight;
//   //   const textX = tableX + col * wordColWidth + wordColWidth / 2;
//   //   pdf.text(`${word}`, textX, tableY, { align: "center" });

//   //   if (tableY + rowHeight > pageHeight - margin) {
//   //     pdf.addPage();
//   //     tableY = margin;
//   //   }
//   // }

//   // --- PAGE 5: VOCABULARY LIST ---
// pdf.addPage();
// pdf.setFontSize(20);
// pdf.text("VOCABULARY LIST", pageWidth / 2, 20, { align: "center" });

// tableY = 30;
// pdf.setFontSize(12);

// const maxCols = 6;
// const usableWidth = pageWidth - 2 * margin;

// for (let i = 0; i < words.length; i++) {
//   const remaining = words.length - i;
//   const colsThisRow = Math.min(remaining, maxCols);
//   const colWidth = usableWidth / colsThisRow;

//   for (let col = 0; col < colsThisRow; col++) {
//     const wordIndex = i + col;
//     if (wordIndex >= words.length) break;

//     const textX = margin + col * colWidth + colWidth / 2;
//     pdf.text(`${words[wordIndex]}`, textX, tableY, { align: "center" });
//   }

//   tableY += rowHeight;
//   i += colsThisRow - 1;

//   if (tableY + rowHeight > pageHeight - margin) {
//     pdf.addPage();
//     pdf.setFontSize(20);
//     pdf.text("VOCABULARY (continued)", pageWidth / 2, 20, { align: "center" });
//     tableY = 30;
//     pdf.setFontSize(12);
//   }
// };

//   pdf.save("slides.pdf");
// };



//   const handleAddWord = () => {
//     if (newWord.trim() !== "") {
//       setWords([...words, newWord]);
//       setNewWord("");
//     }
//   };

//   const handleDeleteWord = (word) => setWords(words.filter((w) => w !== word));
//   const handleDownloadWords = () => {
//     const blob = new Blob([words.join("\n")], { type: "text/plain" });
//     const link = document.createElement("a");
//     link.href = URL.createObjectURL(blob);
//     link.download = "words.txt";
//     link.click();
//   };

//   const handleKeyDown = (e) => e.key === "Enter" && handleAddWord();

//   useEffect(() => {
//     const handleKeyDownEvent = (e) => {
//       if (e.key === "ArrowRight") handleNextSlide();
//       else if (e.key === "ArrowLeft") handlePrevSlide();
//     };
//     window.addEventListener("keydown", handleKeyDownEvent);
//     return () => window.removeEventListener("keydown", handleKeyDownEvent);
//   }, [currentSlides]);

//   // --- Styles ---
//   const buttonStyle = {
//     padding: "8px 16px",
//     margin: "4px",
//     backgroundColor: "#b8860b",
//     color: "white",
//     border: "none",
//     borderRadius: "8px",
//     cursor: "pointer",
//     fontWeight: "bold",
//   };

//   const topBarStyle = {
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "space-between",
//     padding: "10px 20px",
//     backgroundColor: "#fff8dc",
//     borderBottom: "2px solid #b8860b",
//     position: "sticky",
//     top: 0,
//     zIndex: 1000,
//   };

//   const leftBarGroup = { display: "flex", alignItems: "center", gap: "10px" };
//   const rightBarGroup = { display: "flex", alignItems: "center", gap: "10px", marginLeft: "20px" };

//   const mainContainer = {
//     display: "flex",
//     flexDirection: "column",
//     alignItems: "center",
//     padding: "20px",
//     gap: "20px",
//     minHeight: "calc(100vh - 60px)", // ensures footer stays at bottom
//   };

//   const contentRow = {
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "flex-start",
//     gap: "20px",
//     width: "90%",
//     maxWidth: "1200px",
//   };

//   const slideStyle = {
//     width: "400px",
//     height: "300px",
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//     border: "2px solid #b8860b",
//     borderRadius: "10px",
//     overflow: "hidden",
//     cursor: "pointer",
//     flexShrink: 0,
//   };

//   const wordPanelStyle = {
//     flexGrow: 1,
//     height: "300px",
//     border: "2px solid #b8860b",
//     borderRadius: "10px",
//     padding: "10px",
//     overflowY: "auto",
//     display: "flex",
//     flexWrap: "wrap",
//     alignContent: "flex-start",
//     gap: "10px",
//     backgroundColor: "#fffbe6",
//   };

//   const wordChipStyle = {
//     display: "flex",
//     alignItems: "center",
//     padding: "5px 10px",
//     backgroundColor: "#f0e68c",
//     borderRadius: "6px",
//     cursor: "pointer",
//     transition: "background-color 0.2s ease",
//   };

//   return (
//     <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
//       {/* Top bar */}
//       <div style={topBarStyle}>
//         <div style={leftBarGroup}>
//           <h2>Slide Creator</h2>
//           <input
//             type="file"
//             webkitdirectory=""
//             directory=""
//             multiple
//             onChange={handleFolderSelect}
//           />
//         </div>

//         {/* Show these only after selecting slides */}
//         {currentSlides.length > 0 && (
//           <div style={rightBarGroup}>
//             <input
//               type="text"
//               value={newWord}
//               onChange={(e) => setNewWord(e.target.value)}
//               onKeyDown={handleKeyDown}
//               placeholder="Type a word"
//             />
//             <button style={buttonStyle} onClick={handleAddWord}>
//               Add Word
//             </button>
//             <button style={buttonStyle} onClick={handleExportToPDF}>
//               Export to PDF
//             </button>
//             <button style={buttonStyle} onClick={handleDownloadWords}>
//               Download Words
//             </button>
//           </div>
//         )}
//       </div>

//       {/* Main content */}
//       <div style={mainContainer}>
//         {currentSlides.length > 0 && (
//           <>
//             <div style={contentRow}>
//               {/* Left: Slide */}
//               <div style={slideStyle} onClick={handleToggleFilename}>
//                 {showFilename ? (
//                   <p>{currentSlides[currentIndex].file.name.replace(/\.[^/.]+$/, "")}</p>
//                 ) : (
//                   <img
//                     src={URL.createObjectURL(currentSlides[currentIndex].file)}
//                     alt="Slide"
//                     style={{ maxWidth: "100%", maxHeight: "100%" }}
//                   />
//                 )}
//               </div>

//               {/* Right: Word panel */}
//               <div style={wordPanelStyle}>
//                 {words.map((word, index) => (
//                   <div
//                     key={index}
//                     style={wordChipStyle}
//                     onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#ffd700")}
//                     onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#f0e68c")}
//                   >
//                     <span>{word}</span>
//                     <button
//                       onClick={() => handleDeleteWord(word)}
//                       style={{
//                         marginLeft: "8px",
//                         cursor: "pointer",
//                         fontWeight: "bold",
//                         border: "none",
//                         background: "none",
//                         color: "#b22222",
//                       }}
//                     >
//                       ✕
//                     </button>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             <div>
//               <button style={buttonStyle} onClick={handlePrevSlide}>
//                 Previous
//               </button>
//               <button style={buttonStyle} onClick={handleNextSlide}>
//                 Next
//               </button>
//             </div>
//           </>
//         )}
//       </div>
//     </div>
//   );
// }

//code 9 FINAL VERSION
'use client';

import React, { useState, useEffect } from "react";
import jsPDF from "jspdf";
import "../../globals.css";

export default function SlideCreator() {
  const [folderStructure, setFolderStructure] = useState([]);
  const [currentSlides, setCurrentSlides] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showFilename, setShowFilename] = useState(false);
  const [words, setWords] = useState([]);
  const [newWord, setNewWord] = useState("");

  const handleFolderSelect = (event) => {
    const files = Array.from(event.target.files).filter((file) =>
      file.type.startsWith("image/")
    );
    const folderStructure = buildFolderStructure(files);
    setFolderStructure(folderStructure);
    const allSlides = flattenSlides(folderStructure);
    setCurrentSlides(allSlides);
    setCurrentIndex(0);
  };

  const buildFolderStructure = (files) => {
    const folderMap = {};
    files.forEach((file) => {
      const path = file.webkitRelativePath.split("/");
      const level1 = path[0];
      const level2 = path[1];
      if (!folderMap[level1]) folderMap[level1] = {};
      if (!folderMap[level1][level2]) folderMap[level1][level2] = [];
      folderMap[level1][level2].push(file);
    });
    return Object.entries(folderMap).map(([level1Name, level2Folders]) => ({
      folderName: level1Name,
      subfolders: Object.entries(level2Folders)
        .map(([level2Name, files]) => ({
          subfolderName: level2Name,
          files: files.sort((a, b) => extractNumber(a.name) - extractNumber(b.name)),
        }))
        .sort((a, b) => extractNumber(a.subfolderName) - extractNumber(b.subfolderName)),
    }));
  };

  const extractNumber = (name) => {
    const match = name.match(/^(\d+)\./);
    return match ? parseInt(match[1], 10) : Number.MAX_SAFE_INTEGER;
  };

  const flattenSlides = (structure) => {
    const slides = [];
    structure.forEach((level1) => {
      level1.subfolders.forEach((level2) => {
        level2.files.forEach((file) => {
          slides.push({ level1: level1.folderName, level2: level2.subfolderName, file });
        });
      });
    });
    return slides;
  };

  const handleNextSlide = () => setCurrentIndex((prev) => (prev + 1) % currentSlides.length);
  const handlePrevSlide = () =>
    setCurrentIndex((prev) => (prev - 1 + currentSlides.length) % currentSlides.length);
  const handleToggleFilename = () => setShowFilename((prev) => !prev);

const handleExportToPDF = async () => {
  if (folderStructure.length === 0) return;
  const pdf = new jsPDF("p", "mm", "a4");
  const pageWidth = pdf.internal.pageSize.width;
  const pageHeight = pdf.internal.pageSize.height;
  const margin = 10;

  const slides = flattenSlides(folderStructure).map((s, index) => ({
    file: s.file,
    title: s.file.name.replace(/^\d+\.?\s*/, "").replace(/\.[^/.]+$/, ""),
    number: index + 1,
  }));

  // --- PAGE 1: PICTURE LIST ---
  pdf.setFontSize(20);
  pdf.text("PICTURE LIST", pageWidth / 2, 20, { align: "center" });

  const imgWidth = 55;
  const imgHeight = 40;
  const spacingX = 10;
  const spacingY = 25;
  let x = margin;
  let y = 30;

  for (let i = 0; i < slides.length; i++) {
    const slide = slides[i];
    const imgURL = URL.createObjectURL(slide.file);
    const img = new Image();
    img.src = imgURL;

    await new Promise((resolve) => {
      img.onload = () => {
        pdf.addImage(img, "JPEG", x, y, imgWidth, imgHeight);
        const title = `${slide.number}. ${slide.title}`;
        pdf.setFontSize(10);
        const textY = y + imgHeight + 5;
        const textX = x + imgWidth / 2;
        const splitText = pdf.splitTextToSize(title, imgWidth - 4);
        splitText.forEach((line, idx) => {
          pdf.text(line, textX, textY + idx * 4, { align: "center" });
        });
        URL.revokeObjectURL(imgURL);

        const rowHeight = imgHeight + spacingY + splitText.length * 4;
        if ((i + 1) % 3 === 0) {
          x = margin;
          y += rowHeight;
        } else {
          x += imgWidth + spacingX;
        }
        if (y + imgHeight + 40 > pageHeight) {
          pdf.addPage();
          y = margin;
          x = margin;
        }
        resolve();
      };
    });
  }

  // --- PAGE 2: FILL IN THE BLANKS (same order, numbered, with blank lines) ---
pdf.addPage();
pdf.setFontSize(20);
pdf.text("FILL IN THE BLANKS", pageWidth / 2, 20, { align: "center" });

x = margin;
y = 30;

for (let i = 0; i < slides.length; i++) {
  const slide = slides[i];
  const imgURL = URL.createObjectURL(slide.file);
  const img = new Image();
  img.src = imgURL;

  await new Promise((resolve) => {
    img.onload = () => {
      pdf.addImage(img, "JPEG", x, y, imgWidth, imgHeight);

      // centered short line with number
      const lineY = y + imgHeight + 6;
      const lineLength = imgWidth * 0.6;
      const lineX = x + (imgWidth - lineLength) / 2;
      pdf.setDrawColor(0);
      pdf.line(lineX, lineY, lineX + lineLength, lineY);

      // number label centered below the image
      pdf.setFontSize(10);
      pdf.text(`${slide.number}`, x + imgWidth / 2, lineY + 5, { align: "center" });

      URL.revokeObjectURL(imgURL);

      if ((i + 1) % 3 === 0) {
        x = margin;
        y += imgHeight + spacingY + 10;
      } else {
        x += imgWidth + spacingX;
      }

      if (y + imgHeight + 30 > pageHeight) {
        pdf.addPage();
        y = margin;
        x = margin;
      }
      resolve();
    };
  });
}

  // --- PAGE 3: ARE YOU READY TO JUMBLE? ---
  pdf.addPage();
  pdf.setFontSize(20);
  pdf.text("ARE YOU READY TO JUMBLE?", pageWidth / 2, 20, { align: "center" });

  const shuffledSlides = [...slides].sort(() => Math.random() - 0.5);
  x = margin;
  y = 30;

  for (let i = 0; i < shuffledSlides.length; i++) {
    const slide = shuffledSlides[i];
    const imgURL = URL.createObjectURL(slide.file);
    const img = new Image();
    img.src = imgURL;

    await new Promise((resolve) => {
      img.onload = () => {
        pdf.addImage(img, "JPEG", x, y, imgWidth, imgHeight);
        URL.revokeObjectURL(imgURL);

        const lineY = y + imgHeight + 8;
        pdf.setDrawColor(0);
        pdf.line(x + 5, lineY, x + imgWidth - 5, lineY);

        if ((i + 1) % 3 === 0) {
          x = margin;
          y += imgHeight + spacingY + 10;
        } else {
          x += imgWidth + spacingX;
        }
        if (y + imgHeight + 30 > pageHeight) {
          pdf.addPage();
          y = margin;
          x = margin;
        }
        resolve();
      };
    });
  }

  // --- PAGE 4: SUMMARY OF PICTURES ---
  pdf.addPage();
  pdf.setFontSize(20);
  pdf.text("SUMMARY OF PICTURES", pageWidth / 2, 20, { align: "center" });

  let tableY = 30;
  pdf.setFontSize(12);

  const colWidth = (pageWidth - 2 * margin) / 2 - 5; // small gap between columns
  const rowHeight = 10; // base height per line

  for (let i = 0; i < slides.length; i++) {
    const col = i % 2;
    const x = margin + col * (colWidth + 10); // add small horizontal spacing
    const slideTitle = `${i + 1}. ${slides[i].title}`;

    // wrap long text
    const splitTitle = pdf.splitTextToSize(slideTitle, colWidth - 5);
    const linesUsed = splitTitle.length;

    // print each line with spacing
    splitTitle.forEach((line, idx) => {
      pdf.text(line, x + colWidth / 2, tableY + idx * 5, { align: "center" });
    });

    // after both columns filled, move down
    if (col === 1 || i === slides.length - 1) {
      // find max vertical height used by wrapped lines
      const maxLines = Math.max(
        splitTitle.length,
        slides[i - 1] ? pdf.splitTextToSize(`${i}. ${slides[i - 1].title}`, colWidth - 5).length : 1
      );
      tableY += maxLines * 7 + 5; // 7 per line + extra padding
    }

    // page break if near bottom
    if (tableY + rowHeight > pageHeight - margin) {
      pdf.addPage();
      pdf.setFontSize(20);
      pdf.text("SUMMARY OF PICTURES (continued)", pageWidth / 2, 20, { align: "center" });
      tableY = 30;
      pdf.setFontSize(12);
    }
  }

  // --- PAGE 5: VOCABULARY LIST ---
  pdf.addPage();
  pdf.setFontSize(20);
  pdf.text("VOCABULARY LIST", pageWidth / 2, 20, { align: "center" });

  tableY = 30;
  pdf.setFontSize(12);

  const maxCols = 6;
  const usableWidth = pageWidth - 2 * margin;

  for (let i = 0; i < words.length; i++) {
    const remaining = words.length - i;
    const colsThisRow = Math.min(remaining, maxCols);
    const colWidth = usableWidth / colsThisRow;

    for (let col = 0; col < colsThisRow; col++) {
      const wordIndex = i + col;
      if (wordIndex >= words.length) break;

      const textX = margin + col * colWidth + colWidth / 2;
      pdf.text(`${words[wordIndex]}`, textX, tableY, { align: "center" });
    }

    tableY += rowHeight;
    i += colsThisRow - 1;

    if (tableY + rowHeight > pageHeight - margin) {
      pdf.addPage();
      pdf.setFontSize(20);
      pdf.text("VOCABULARY (continued)", pageWidth / 2, 20, { align: "center" });
      tableY = 30;
      pdf.setFontSize(12);
    }
  };

    pdf.save("slides.pdf");
  };



  const handleAddWord = () => {
    if (newWord.trim() !== "") {
      setWords([...words, newWord]);
      setNewWord("");
    }
  };

  const handleDeleteWord = (word) => setWords(words.filter((w) => w !== word));
  const handleDownloadWords = () => {
    const blob = new Blob([words.join("\n")], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "words.txt";
    link.click();
  };

  const handleKeyDown = (e) => e.key === "Enter" && handleAddWord();

  useEffect(() => {
    const handleKeyDownEvent = (e) => {
      if (e.key === "ArrowRight") handleNextSlide();
      else if (e.key === "ArrowLeft") handlePrevSlide();
    };
    window.addEventListener("keydown", handleKeyDownEvent);
    return () => window.removeEventListener("keydown", handleKeyDownEvent);
  }, [currentSlides]);

  // --- Styles ---
  const buttonStyle = {
    padding: "8px 16px",
    margin: "4px",
    backgroundColor: "#b8860b",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "bold",
  };

  const topBarStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "10px 20px",
    backgroundColor: "#fff8dc",
    borderBottom: "2px solid #b8860b",
    position: "sticky",
    top: 0,
    zIndex: 1000,
  };

  const leftBarGroup = { display: "flex", alignItems: "center", gap: "10px" };
  const rightBarGroup = { display: "flex", alignItems: "center", gap: "10px", marginLeft: "20px" };

  const mainContainer = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "20px",
    gap: "20px",
    minHeight: "calc(100vh - 60px)", // ensures footer stays at bottom
  };

  const contentRow = {
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    gap: "20px",
    width: "90%",
    maxWidth: "1200px",
  };

  const slideStyle = {
    width: "400px",
    height: "300px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: "2px solid #b8860b",
    borderRadius: "10px",
    overflow: "hidden",
    cursor: "pointer",
    flexShrink: 0,
  };

  const wordPanelStyle = {
    flexGrow: 1,
    height: "300px",
    border: "2px solid #b8860b",
    borderRadius: "10px",
    padding: "10px",
    overflowY: "auto",
    display: "flex",
    flexWrap: "wrap",
    alignContent: "flex-start",
    gap: "10px",
    backgroundColor: "#fffbe6",
  };

  const wordChipStyle = {
    display: "flex",
    alignItems: "center",
    padding: "5px 10px",
    backgroundColor: "#f0e68c",
    borderRadius: "6px",
    cursor: "pointer",
    transition: "background-color 0.2s ease",
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      {/* Top bar */}
      <div style={topBarStyle}>
        <div style={leftBarGroup}>
          <h2>Slide Creator</h2>
          <input
            type="file"
            webkitdirectory=""
            directory=""
            multiple
            onChange={handleFolderSelect}
          />
        </div>

        {/* Show these only after selecting slides */}
        {currentSlides.length > 0 && (
          <div style={rightBarGroup}>
            <input
              type="text"
              value={newWord}
              onChange={(e) => setNewWord(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type a word"
            />
            <button style={buttonStyle} onClick={handleAddWord}>
              Add Word
            </button>
            <button style={buttonStyle} onClick={handleExportToPDF}>
              Export to PDF
            </button>
            <button style={buttonStyle} onClick={handleDownloadWords}>
              Download Words
            </button>
          </div>
        )}
      </div>

      {/* Main content */}
      <div style={mainContainer}>
        {currentSlides.length > 0 && (
          <>
            <div style={contentRow}>
              {/* Left: Slide */}
              <div style={slideStyle} onClick={handleToggleFilename}>
                {showFilename ? (
                  <p>{currentSlides[currentIndex].file.name.replace(/\.[^/.]+$/, "")}</p>
                ) : (
                  <img
                    src={URL.createObjectURL(currentSlides[currentIndex].file)}
                    alt="Slide"
                    style={{ maxWidth: "100%", maxHeight: "100%" }}
                  />
                )}
              </div>

              {/* Right: Word panel */}
              <div style={wordPanelStyle}>
                {words.map((word, index) => (
                  <div
                    key={index}
                    style={wordChipStyle}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#ffd700")}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#f0e68c")}
                  >
                    <span>{word}</span>
                    <button
                      onClick={() => handleDeleteWord(word)}
                      style={{
                        marginLeft: "8px",
                        cursor: "pointer",
                        fontWeight: "bold",
                        border: "none",
                        background: "none",
                        color: "#b22222",
                      }}
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <button style={buttonStyle} onClick={handlePrevSlide}>
                Previous
              </button>
              <button style={buttonStyle} onClick={handleNextSlide}>
                Next
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}