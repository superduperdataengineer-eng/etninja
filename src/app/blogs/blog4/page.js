"use client";

import { useState, useEffect } from "react";
import Papa from "papaparse";
import Navbar from "../../components/Navbar";
import { v4 as uuidv4 } from "uuid"; //Import UUID Generator

export default function Home() {
  
  const [words, setWords] = useState([]);
  const [selectedLevels, setSelectedLevels] = useState([]);
  const [randomWord, setRandomWord] = useState(null);
  const [knownWords, setKnownWords] = useState({ A1: 0, A2: 0, B1: 0, B2: 0, C1: 0, C2: 0 });
  const [unknownWords, setUnknownWords] = useState({ A1: 0, A2: 0, B1: 0, B2: 0, C1: 0, C2: 0 });
  const [seenWords, setSeenWords] = useState({ A1: 0, A2: 0, B1: 0, B2: 0, C1: 0, C2: 0 });
  const [testedWords, setTestedWords] = useState([]);
  const [confidenceMessage, setConfidenceMessage] = useState("");
  const [confidenceInterval, setConfidenceInterval] = useState(null);
  const [standardError, setStandardError] = useState(null);
  const [lastClicked, setLastClicked] = useState(null);
  const [isReady, setIsReady] = useState(false);
  const [isTesting, setIsTesting] = useState(false);
  // const [isTestStarted, setIsTestStarted] = useState(false);//track checkboxes
  const [isTestStopped, setIsTestStopped] = useState(false)
  const [userId, setUserId] = useState("");
  const [username, setUsername] = useState("");
  const [isUsernameRequired, setIsUsernameRequired] = useState(false);
  const [isBirthdayRequired, setIsBirthdayRequired] = useState(false);
  const [gender, setGender] = useState(""); // Add this line for gender state
  const [height, setHeight] = useState("");
  const [yearsOfStudy, setYearsOfStudy] = useState("");
  const [educationLevel, setEducationLevel] = useState("");
  const [occupation, setOccupation] = useState("");
  const [birthday, setBirthday] = useState("");
  const [nativeLanguage, setNativeLanguage] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [drone, setDrone] = useState("");
  const [color, setColor] = useState("");
  const [level, setLevel] = useState("");
  const [exposure, setExposure] = useState("");
  const [method, setMethod] = useState([]);
  const [comment, setComment] = useState("");
  const [timeOfDay, setTimeOfDay] = useState("")//new one
  const [learningStyle, setLearningStyle] = useState("");//new one
  const [startTime, setStartTime] = useState(null);
  const [testDate, setTestDate] = useState("");
  let [testDuration, setTestDuration] = useState(0);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [intervalId, setIntervalId] = useState(null);
  const [timerRunning, setTimerRunning] = useState(false); // Timer status
  const [showReadyButton, setShowReadyButton] = useState(false);
  const [takeTest, setTakeTest] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  let [totalAmount, setTotalAmount] = useState(0);

  // Function to generate a unique ID
  const generateUserId = () => {
    return uuidv4(); // Generates a random UUID
  };

  // Auto-start testing when levels are selected
  useEffect(() => {
    if (selectedLevels.length > 0) {
      setIsTesting(true);
    }
    // Parse the CSV file directly after page loads
    parseCSVFile();
  }, [selectedLevels]);
  // }, []);

  // A separate useEffect for handling userId generation
  useEffect(() => {
    if (!userId) {
        const newId = generateUserId();  // Example function
        setUserId(newId);
    }
  }, []); // Runs only once on mount
 
  // Calculate duration when test ends
  useEffect(() => {
    if (isTesting) {
        const startTime = Date.now();
        setStartTime(startTime);
        // setStartTime(Date.now());
        setTestDate(new Date().toISOString().split("T")[0]);
 
        // const newInterval = setInterval(() => {
        //     setElapsedTime(prev => prev + 1);
        // }, 1000);
        const newInterval = setInterval(() => {
          setElapsedTime(Date.now() - startTime); // Get the exact elapsed time
        }, 10); // Update every 10ms for smoother updates
 
        setIntervalId(newInterval);
    } else {
        clearInterval(intervalId);
    }
 
    return () => clearInterval(intervalId); // Cleanup function
 }, [isTesting]);
  
  const startTest = () => {
    // setElapsedTime(0); // Reset elapsed time
    setStartTime(Date.now()); // Start timing immediately
    setElapsedTime(0);
    setTestDate(new Date().toISOString().split("T")[0]); // Record test date
    setIsTesting(true);
    setShowReadyButton(true);
    getRandomWord();
 };

 const stopTest = () => {
  setIsTesting(false);
  clearInterval(intervalId); // Ensure we stop the timer properly

  // Convert elapsedTime from milliseconds to minutes and seconds
  const totalMilliseconds = elapsedTime;
  const totalSeconds = Math.floor(elapsedTime / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;  
  const milliseconds = totalMilliseconds % 1000;
  setTestDuration(`${minutes}m ${seconds}s ${milliseconds}ms`);
  };

  // Parse CSV using PapaParse
  const parseCSVFile = () => {
    const csvFilePath = '/cefr/CEFR UNFETTERED.csv'; // Path to the CSV file inside the public folder
    fetch(csvFilePath)
      .then((response) => response.text())
      .then((csvText) => {
        Papa.parse(csvText, {
          complete: (result) => {
						const parsedWordsMap = new Map();
                result.data.forEach((row, index) => {
                    if (!row.headword || !row.headword.trim() || !row.CEFR) {
                      console.warn(`Skipping invalid row at index ${index}:`, row);
                      return; // Skip invalid rows completely
                    }
                  
                    // Make sure to remove any accidental whitespace
                    parsedWordsMap.set(row.headword.trim(), {
                      headword: row.headword.trim(),
                      CEFR: row.CEFR.trim().toUpperCase(),
                    });
                  });

						setWords(Array.from(parsedWordsMap.values()));
          },
          header: true,
        });
      })
      .catch((error) => {
        console.error('Error loading CSV file:', error);
      });
  };
 
// Retrieve lastClickTime from sessionStorage or initialize it
  let lastClickTime = null;

  if (typeof window !== "undefined") {
    lastClickTime = sessionStorage.getItem("lastClickTime")
      ? parseInt(sessionStorage.getItem("lastClickTime"), 10)
      : null;
  }

  //resetSessionData
  const resetSessionData = () => {
    console.log("Resetting session data...");

    // Reset word-related states
    setWords([]);
    setSelectedLevels([]);
    setRandomWord(null);
    setKnownWords({ A1: 0, A2: 0, B1: 0, B2: 0, C1: 0, C2: 0 });
    setUnknownWords({ A1: 0, A2: 0, B1: 0, B2: 0, C1: 0, C2: 0 });
    setSeenWords({ A1: 0, A2: 0, B1: 0, B2: 0, C1: 0, C2: 0 });
    setTestedWords([]);

    // Reset confidence and statistics
    setConfidenceMessage("");
    setConfidenceInterval(null);
    setStandardError(null);

    // Reset test session states
    setLastClicked(null);
    setIsReady(false);
    setIsTesting(false);
    setIsTestStopped(false);
    setIsSubmitted(false);
    setShowReadyButton(false);

    // Reset user information
    setUserId("");
    setUsername("");
    setIsUsernameRequired(false);
    setIsBirthdayRequired(false);
    setGender("");
    setHeight("");
    setYearsOfStudy("");
    setEducationLevel("");
    setOccupation("");
    setBirthday("");
    setNativeLanguage("");
    setCountry("");
    setCity("");
    setState("");

    // Reset miscellaneous form states
    setDrone("");
    setColor("");
    setLevel("");
    setExposure("");
    setMethod([]);
    setComment("");
    setTakeTest("");

    // Reset timing and test duration
    setStartTime(null);
    setTestDate("");
    setTestDuration(0);
    setElapsedTime(0);
    setTimerRunning(false);

    // Stop and clear timer
    if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(null);
    }

    // Clear localStorage and sessionStorage
    localStorage.clear();
    sessionStorage.clear();

    
    console.log("Session data reset complete.");
  };

  useEffect(() => {
    const simplePopstate = () => {
        console.log("Simple popstate event fired!");
    };

    window.addEventListener("popstate", simplePopstate);

    return () => {
        window.removeEventListener("popstate", simplePopstate);
    };
}, []);

  // useEffect(() => {

  //   // Ensure there's an entry in history so "popstate" triggers when pressing back
  //   window.history.pushState(null, "", window.location.href);
  //   const handleBackButton = () => {
  //     resetSessionData();
  //     localStorage.clear();
  //     sessionStorage.clear();

  //     // Delay the reload slightly to ensure storage is cleared first
  //     setTimeout(() => {
  //       window.location.replace(window.location.href); // Force full reload
  //       // window.location.reload();
  //     }, 10);
  //   };

  //   window.addEventListener("popstate", handleBackButton);

  //   return () => {
  //     window.removeEventListener("popstate", handleBackButton);
  //   };
  // }, []);


  // const saveTally = async (word, type) => {
  //     try {
  //         if (!randomWord || !randomWord.CEFR ) {
  //             console.warn("No valid randomWord found.");
  //             return;
  //         }

  //         let storedKnown = JSON.parse(sessionStorage.getItem("knownWords")) || {};
  //         let storedUnknown = JSON.parse(sessionStorage.getItem("unknownWords")) || {};
  //         let storedSeen = JSON.parse(sessionStorage.getItem("seenWords")) || {};

  //         // Get current timestamp
  //         let lastClickTime = sessionStorage.getItem("lastClickTime");
  //         const currentTime = Date.now();
  //         const timeBetweenClicks = lastClickTime !== null ? (currentTime - lastClickTime) / 1000 : "First Click";

  //         // Store the new timestamp for future calls
  //         // lastClickTime = currentTime;
  //         sessionStorage.setItem("lastClickTime", currentTime.toString());

  //         // Update the word counts
  //         if (type === "known") {
  //             storedKnown[randomWord.CEFR] = (storedKnown[randomWord.CEFR] || 0) + 1;
  //         } else if (type === "unknown") {
  //             storedUnknown[randomWord.CEFR] = (storedUnknown[randomWord.CEFR] || 0) + 1;
  //         } else if (type === "seen") {
  //             storedSeen[randomWord.CEFR] = (storedSeen[randomWord.CEFR] || 0) + 1;
  //         }

  //         // Save updated data back to sessionStorage
  //         sessionStorage.setItem("knownWords", JSON.stringify(storedKnown));
  //         sessionStorage.setItem("unknownWords", JSON.stringify(storedUnknown));
  //         sessionStorage.setItem("seenWords", JSON.stringify(storedSeen));
  //         sessionStorage.setItem("lastClickTime", currentTime.toString());

  //         // Calculate totals
  //         const totalKnown = Object.values(storedKnown).reduce((a, b) => a + b, 0);
  //         const totalUnknown = Object.values(storedUnknown).reduce((a, b) => a + b, 0);
  //         const totalSeen = Object.values(storedSeen).reduce((a, b) => a + b, 0);

  //         // Send data to backend
  //         const res = await fetch('/api/saveWordTally3', {
  //             method: 'POST',
  //             headers: { 'Content-Type': 'application/json' },
  //             body: JSON.stringify({
  //                 word: word || randomWord.word,
  //                 knownCount: totalKnown,
  //                 unknownCount: totalUnknown,
  //                 seenCount: totalSeen,
  //                 totalCount: totalKnown + totalUnknown + totalSeen,
  //                 timeBetweenClicks,
  //                 levels: {
  //                     A1: storedKnown["A1"] || 0,
  //                     A2: storedKnown["A2"] || 0,
  //                     B1: storedKnown["B1"] || 0,
  //                     B2: storedKnown["B2"] || 0,
  //                     C1: storedKnown["C1"] || 0,
  //                     C2: storedKnown["C2"] || 0,
  //                     A1_unknown: storedUnknown["A1"] || 0,
  //                     A2_unknown: storedUnknown["A2"] || 0,
  //                     B1_unknown: storedUnknown["B1"] || 0,
  //                     B2_unknown: storedUnknown["B2"] || 0,
  //                     C1_unknown: storedUnknown["C1"] || 0,
  //                     C2_unknown: storedUnknown["C2"] || 0,
  //                     A1_seen: storedSeen["A1"] || 0,
  //                     A2_seen: storedSeen["A2"] || 0,
  //                     B1_seen: storedSeen["B1"] || 0,
  //                     B2_seen: storedSeen["B2"] || 0,
  //                     C1_seen: storedSeen["C1"] || 0,
  //                     C2_seen: storedSeen["C2"] || 0,
  //                 }
  //             }),
  //         });

  //         if (!res.ok) throw new Error('Failed to save tally');
  //         console.log('Tally saved successfully!', { storedKnown, storedUnknown, storedSeen, timeBetweenClicks });

  //     } catch (error) {
  //         console.error('Error saving tally:', error);
  //     }
  // };

  // Handle checkbox selection for levels
  // const saveTally = async (word, type) => {
  //   try {
  //     // Input validation: Ensure randomWord and its CEFR property exist
  //     if (!randomWord || !randomWord.CEFR) {
  //       console.warn("Invalid state: randomWord or randomWord.CEFR is undefined.");
  //       return; // Exit if input is invalid
  //     }
  
  //     // Retrieve stored tallies from sessionStorage, defaulting to empty objects
  //     const storedKnown = JSON.parse(sessionStorage.getItem("knownWords")) || {};
  //     const storedUnknown = JSON.parse(sessionStorage.getItem("unknownWords")) || {};
  //     const storedSeen = JSON.parse(sessionStorage.getItem("seenWords")) || {};
  
  //     let timeBetweenClicks;
  
  //     // Check if this is the first click of a new session (after reset)
  //     // if (!sessionStorage.getItem("sessionStarted")) {
  //     //   timeBetweenClicks = "First Click";
  //     //   sessionStorage.setItem("sessionStarted", "true"); // Mark session as started
  //     // } 
  //     if (Object.keys(storedKnown).length === 0 && !sessionStorage.getItem("sessionStarted")) {
  //       timeBetweenClicks = "First Click";
  //       sessionStorage.setItem("sessionStarted", "true");
  //     }
  //     else {
  //       // Calculate time between clicks for subsequent interactions
  //       const lastClickTime = sessionStorage.getItem("lastClickTime");
  //       const currentTime = Date.now();
  //       timeBetweenClicks = lastClickTime
  //         ? (currentTime - parseInt(lastClickTime, 10)) / 1000
  //         : "First Click"; // Handle potential null or invalid lastClickTime
  //     }
  
  //     // Update lastClickTime for the next interaction
  //     sessionStorage.setItem("lastClickTime", Date.now().toString());
  
  //     // Increment word counts based on interaction type (known, unknown, seen)
  //     if (type === "known") {
  //       storedKnown[randomWord.CEFR] = (storedKnown[randomWord.CEFR] || 0) + 1;
  //     } else if (type === "unknown") {
  //       storedUnknown[randomWord.CEFR] = (storedUnknown[randomWord.CEFR] || 0) + 1;
  //     } else if (type === "seen") {
  //       storedSeen[randomWord.CEFR] = (storedSeen[randomWord.CEFR] || 0) + 1;
  //     }
  
  //     // Store updated tallies back into sessionStorage
  //     sessionStorage.setItem("knownWords", JSON.stringify(storedKnown));
  //     sessionStorage.setItem("unknownWords", JSON.stringify(storedUnknown));
  //     sessionStorage.setItem("seenWords", JSON.stringify(storedSeen));
  
  //     // Calculate total counts for all word types
  //     const totalKnown = Object.values(storedKnown).reduce((a, b) => a + b, 0);
  //     const totalUnknown = Object.values(storedUnknown).reduce((a, b) => a + b, 0);
  //     const totalSeen = Object.values(storedSeen).reduce((a, b) => a + b, 0);
  
  //     // Prepare data for the backend API call
  //     const payload = {
  //       word: word || randomWord.word,
  //       knownCount: totalKnown,
  //       unknownCount: totalUnknown,
  //       seenCount: totalSeen,
  //       totalCount: totalKnown + totalUnknown + totalSeen,
  //       timeBetweenClicks,
  //       levels: {
  //         A1: storedKnown["A1"] || 0,
  //         A2: storedKnown["A2"] || 0,
  //         B1: storedKnown["B1"] || 0,
  //         B2: storedKnown["B2"] || 0,
  //         C1: storedKnown["C1"] || 0,
  //         C2: storedKnown["C2"] || 0,
  //         A1_unknown: storedUnknown["A1"] || 0,
  //         A2_unknown: storedUnknown["A2"] || 0,
  //         B1_unknown: storedUnknown["B1"] || 0,
  //         B2_unknown: storedUnknown["B2"] || 0,
  //         C1_unknown: storedUnknown["C1"] || 0,
  //         C2_unknown: storedUnknown["C2"] || 0,
  //         A1_seen: storedSeen["A1"] || 0,
  //         A2_seen: storedSeen["A2"] || 0,
  //         B1_seen: storedSeen["B1"] || 0,
  //         B2_seen: storedSeen["B2"] || 0,
  //         C1_seen: storedSeen["C1"] || 0,
  //         C2_seen: storedSeen["C2"] || 0,
  //       },
  //     };
  
  //     // Send data to the backend API
  //     const response = await fetch("/api/saveWordTally3", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify(payload),
  //     });
  
  //     // Check for successful API response
  //     if (!response.ok) {
  //       const errorData = await response.json(); // Attempt to read error message from response
  //       const errorMessage = errorData?.message || `Failed to save tally: ${response.status} ${response.statusText}`;
  //       throw new Error(errorMessage);
  //     }
  
  //     // Log success message with relevant data
  //     console.log("Tally saved successfully!", {
  //       storedKnown,
  //       storedUnknown,
  //       storedSeen,
  //       timeBetweenClicks,
  //     });
  //   } catch (error) {
  //     // Handle errors gracefully
  //     console.error("Error saving tally:", error);
  //     // Optionally, provide user feedback or retry logic here
  //   }
  // };
  
  useEffect(() => {
    // Store the initial URL so we can detect back navigation properly
    const initialURL = window.location.href;

    // Add a new state entry so pressing back triggers "popstate"
    window.history.pushState({}, "", initialURL);

    const handleBackButton = () => {
        resetSessionData();
        localStorage.clear();
        sessionStorage.clear();

        setTimeout(() => {
            if (window.location.pathname !== "/") {
                window.location.replace(window.location.origin); // Redirect to main page
            } else {
                window.location.reload(); // Otherwise, just refresh
            }
        }, 10);
    };

    // Listen for browser back button events
    window.addEventListener("popstate", handleBackButton);

    // Extra Edge fix: Ensure popstate triggers by adding a second history entry
    setTimeout(() => {
        window.history.pushState({}, "", initialURL);
    }, 100);

    return () => {
        window.removeEventListener("popstate", handleBackButton);
    };
}, []);

  
  const saveTally = async (word, type) => {
    try {

      // Retrieve or generate UniqueID
      let uniqueID = sessionStorage.getItem("UniqueID");
      if (!uniqueID) {
          uniqueID = `user_${Date.now()}_${Math.floor(Math.random() * 10000)}`;
          sessionStorage.setItem("UniqueID", uniqueID);
      }

      // let firstName =username || sessionStorage.getItem("firstName") || "Unknown";

      // 1. Input Validation: Ensure randomWord and its CEFR property are valid
      if (!randomWord || !randomWord.CEFR) {
        console.warn("Invalid state: randomWord or randomWord.CEFR is undefined.");
        return; // Exit early if input is invalid
      }

      // 2. Retrieve Stored Tallies: Fetch from sessionStorage or initialize empty objects
      const storedKnown = JSON.parse(sessionStorage.getItem("knownWords")) || {};
      const storedUnknown = JSON.parse(sessionStorage.getItem("unknownWords")) || {};
      const storedSeen = JSON.parse(sessionStorage.getItem("seenWords")) || {};

  
      let timeBetweenClicks;
  
      // 3. Reset Detection and Time Calculation:
      if (Object.keys(storedKnown).length === 0 && !sessionStorage.getItem("sessionStarted")) {
        // 3.1. New Session: If storedKnown is empty and session hasn't started, it's a reset
        timeBetweenClicks = "First Click";
        sessionStorage.setItem("sessionStarted", "true"); // Mark session as started
      } else {
        // 3.2. Subsequent Clicks: Calculate time between clicks
        const lastClickTime = sessionStorage.getItem("lastClickTime");
        const currentTime = Date.now();
        timeBetweenClicks = lastClickTime
          ? (currentTime - parseInt(lastClickTime, 10)) / 1000
          : "First Click"; // Handle potential null or invalid lastClickTime
      }
  
      // 4. Update lastClickTime: Store current timestamp for next calculation
      sessionStorage.setItem("lastClickTime", Date.now().toString());
  
      // 5. Increment Word Counts: Update tallies based on interaction type
      if (type === "known") {
        storedKnown[randomWord.CEFR] = (storedKnown[randomWord.CEFR] || 0) + 1;
      } else if (type === "unknown") {
        storedUnknown[randomWord.CEFR] = (storedUnknown[randomWord.CEFR] || 0) + 1;
      } else if (type === "seen") {
        storedSeen[randomWord.CEFR] = (storedSeen[randomWord.CEFR] || 0) + 1;
      }
  
      // 6. Store Updated Tallies: Save updated tallies back to sessionStorage
      sessionStorage.setItem("knownWords", JSON.stringify(storedKnown));
      sessionStorage.setItem("unknownWords", JSON.stringify(storedUnknown));
      sessionStorage.setItem("seenWords", JSON.stringify(storedSeen));
  
      // 7. Calculate Total Counts: Sum up counts for each word type
      const totalKnown = Object.values(storedKnown).reduce((a, b) => a + b, 0);
      const totalUnknown = Object.values(storedUnknown).reduce((a, b) => a + b, 0);
      const totalSeen = Object.values(storedSeen).reduce((a, b) => a + b, 0);

      setTotalAmount(totalKnown + totalUnknown + totalSeen);

      // 8. Prepare Payload: Create object for backend API request
      const payload = {
        uniqueID,
        word: word || randomWord.word,
        knownCount: totalKnown,
        unknownCount: totalUnknown,
        seenCount: totalSeen,
        totalCount: totalKnown + totalUnknown + totalSeen,
        timeBetweenClicks,
        levels: {
          A1: storedKnown["A1"] || 0,
          A2: storedKnown["A2"] || 0,
          B1: storedKnown["B1"] || 0,
          B2: storedKnown["B2"] || 0,
          C1: storedKnown["C1"] || 0,
          C2: storedKnown["C2"] || 0,
          A1_unknown: storedUnknown["A1"] || 0,
          A2_unknown: storedUnknown["A2"] || 0,
          B1_unknown: storedUnknown["B1"] || 0,
          B2_unknown: storedUnknown["B2"] || 0,
          C1_unknown: storedUnknown["C1"] || 0,
          C2_unknown: storedUnknown["C2"] || 0,
          A1_seen: storedSeen["A1"] || 0,
          A2_seen: storedSeen["A2"] || 0,
          B1_seen: storedSeen["B1"] || 0,
          B2_seen: storedSeen["B2"] || 0,
          C1_seen: storedSeen["C1"] || 0,
          C2_seen: storedSeen["C2"] || 0,
        },
      };
  
      // 9. Send Data to Backend API: Make POST request
      const response = await fetch("/api/saveWordTally3", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
  
      // 10. Handle API Response: Check for success and handle errors
      if (!response.ok) {
        // 10.1. Attempt to parse error message from JSON
        let errorMessage = `Failed to save tally: ${response.status} ${response.statusText}`;
        try{
            const errorData = await response.json();
            errorMessage = errorData?.message || errorMessage;
        } catch(parseError){
            console.warn("Could not parse error response", parseError);
        }
        throw new Error(errorMessage); // Throw error with detailed message
      }
  
      // 11. Log Success: Console log success message with relevant data
      console.log("Tally saved successfully!", {
        storedKnown,
        storedUnknown,
        storedSeen,
        timeBetweenClicks,
      });
    } catch (error) {
      // 12. Handle Errors Gracefully: Catch and log any errors
      console.error("Error saving tally:", error);
      // 12.1. Consider adding user feedback or retry logic here
    }
  };
  
  const handleCheckboxChange = (level) => {
    setSelectedLevels((prevSelectedLevels) => {
      if (prevSelectedLevels.includes(level)) {
        return prevSelectedLevels.filter((item) => item !== level);
      } else {
        return [...prevSelectedLevels, level];
      }
    });
  };

    //get randomword1
    // Randomly pick a word from the selected levels
    // const getRandomWord = () => {
    //   if (selectedLevels.length === 0 || words.length === 0 || !isTesting) return;

    //   // Filter words based on selected CEFR levels
    //   const filteredWords = words.filter((word) => selectedLevels.includes(word.CEFR));

    //   if (filteredWords.length === 0) return;

    //   // Exclude already tested words
    //   const untestedWords = filteredWords.filter(
    //     (word) => !testedWords.some((testedWord) => testedWord.headword === word.headword)
    //   );

    //   if (untestedWords.length === 0) return; // No more untested words

    // 	// Pick a random word from the untested words
    // 	const randomIndex = Math.floor(Math.random() * untestedWords.length);
    // 	const word = untestedWords[randomIndex];

    //   setRandomWord(word);
    //   setTestedWords((prev) => [...prev, word]); // Increment the number of tested words
    // };

    //get randomword2
    // const getRandomWord = () => {
    //   if (selectedLevels.length === 0 || words.length === 0 || !isTesting) return;
    
    //   // Filter words based on selected CEFR levels
    //   const filteredWords = words.filter((word) => selectedLevels.includes(word.CEFR));
    
    //   if (filteredWords.length === 0) return;
    
    //   // Use a Set for tested word lookups (faster than array `.some()`)
    //   const testedWordSet = new Set(testedWords.map((w) => w.headword));
    
    //   // Exclude already tested words
    //   const untestedWords = filteredWords.filter((word) => !testedWordSet.has(word.headword));
    
    //   if (untestedWords.length === 0) return; // No more untested words
    
    //   // Pick a random word
    //   const randomIndex = Math.floor(Math.random() * untestedWords.length);
    //   const word = untestedWords[randomIndex];
    
    //   setRandomWord(word);
    //   setTestedWords((prev) => [...prev, word]); // Add new word safely
    // };

    //getRandomWord3
    // const getRandomWord = () => {
    //   if (selectedLevels.length === 0 || words.length === 0 || !isTesting) return;
    
    //   // Filter words based on selected CEFR levels
    //   const filteredWords = words.filter((word) => selectedLevels.includes(word.CEFR));
    
    //   if (filteredWords.length === 0) return;
    
    //   // Use a Set for tested word lookups
    //   setTestedWords((prevTestedWords) => {
    //       const testedWordSet = new Set(prevTestedWords.map((w) => w.headword));

    //       // Exclude already tested words
    //       const untestedWords = filteredWords.filter((word) => !testedWordSet.has(word.headword));

    //       if (untestedWords.length === 0) return prevTestedWords; // No more untested words

    //       // Pick a random word
    //       const randomIndex = Math.floor(Math.random() * untestedWords.length);
    //       const word = untestedWords[randomIndex];

    //       setRandomWord(word);
    //       return [...prevTestedWords, word]; // Add new word safely
    //   });
    // };

    //getRandomWord1
    const getRandomWord = () => {
      if (selectedLevels.length === 0 || words.length === 0 || !isTesting) return;

      // Filter words based on selected CEFR levels
      const filteredWords = words.filter((word) => selectedLevels.includes(word.CEFR));

      if (filteredWords.length === 0) return;

      // Use a Set for tested word lookups
      const testedWordSet = new Set(testedWords.map((w) => w.headword));

      // Exclude already tested words
      const untestedWords = filteredWords.filter((word) => !testedWordSet.has(word.headword));

      if (untestedWords.length === 0) return; // No more untested words

      // Pick a random word
      const randomIndex = Math.floor(Math.random() * untestedWords.length);
      const word = untestedWords[randomIndex];

      setRandomWord(word); // Display new word but don't count it yet
  };

  //handle Click to avoid double counting of first word
  // const handleClick = (word, level, type) => {
  //   setTestedWords((prev) => {
  //       if (!prev.some((w) => w.headword === word.headword)) {
  //           return [...prev, word]; // Only add if not already in testedWords
  //       }
  //       return prev;
  //   });

  //   if (type === "known") {
  //       setKnownWords((prev) => ({ ...prev, [level]: (prev[level] || 0) + 1 }));
  //   } else if (type === "unknown") {
  //       setUnknownWords((prev) => ({ ...prev, [level]: (prev[level] || 0) + 1 }));
  //   } else if (type === "seen") {
  //       setSeenWords((prev) => ({ ...prev, [level]: (prev[level] || 0) + 1 }));
  //   }

  //   setLastClicked(type);
  //   getRandomWord();
  // };

  // Function to handle when the user interacts with the word

    //NEW CODE MARKUK
  //   const markAsKnown = () => {
  //     if (randomWord) {
  //         setKnownWords(prev => ({
  //             ...prev,
  //             [randomWord.CEFR]: (prev[randomWord.CEFR] || 0) + 1
  //         }));

  //         saveTally(randomWord.headword, "known");
  //         getRandomWord(); // Fetch new word
  //     }
  // };

  // const markAsUnknown = () => {
  //     if (randomWord) {
  //         setUnknownWords(prev => ({
  //             ...prev,
  //             [randomWord.CEFR]: (prev[randomWord.CEFR] || 0) + 1
  //         }));

  //         saveTally(randomWord.headword, "unknown");
  //         getRandomWord(); // Fetch new word
  //     }
  // };

  // const markAsSeen = () => {
  //   if (randomWord) {
  //       setSeenWords(prev => ({
  //           ...prev,
  //           [randomWord.CEFR]: (prev[randomWord.CEFR] || 0) + 1
  //       }));

  //       saveTally(randomWord.headword, "seen");
  //       getRandomWord(); // Fetch a new word
  //   }
  // };

  //New mark functions
  const markAsKnown = () => {
    if (randomWord) {
        setTestedWords((prev) => {
            if (!prev.some((w) => w.headword === randomWord.headword)) {
                return [...prev, randomWord]; // ✅ Add only if not already tested
            }
            return prev;
        });

        setKnownWords(prev => ({
            ...prev,
            [randomWord.CEFR]: (prev[randomWord.CEFR] || 0) + 1
        }));

        saveTally(randomWord.headword, "known");
        getRandomWord(); // Fetch new word
    }
  };
  const markAsUnknown = () => {
    if (randomWord) {
        setTestedWords((prev) => {
            if (!prev.some((w) => w.headword === randomWord.headword)) {
                return [...prev, randomWord];
            }
            return prev;
        });

        setUnknownWords(prev => ({
            ...prev,
            [randomWord.CEFR]: (prev[randomWord.CEFR] || 0) + 1
        }));

        saveTally(randomWord.headword, "unknown");
        getRandomWord();
    }
  };

  const markAsSeen = () => {
    if (randomWord) {
        setTestedWords((prev) => {
            if (!prev.some((w) => w.headword === randomWord.headword)) {
                return [...prev, randomWord];
            }
            return prev;
        });

        setSeenWords(prev => ({
            ...prev,
            [randomWord.CEFR]: (prev[randomWord.CEFR] || 0) + 1
        }));

        saveTally(randomWord.headword, "seen");
        getRandomWord();
    }
  };

  const calculateResults = async () => {

    if (
      !username || !birthday || !gender ||
      !height || !yearsOfStudy || !educationLevel ||
      !occupation || !nativeLanguage || !country ||
      !city || !state || !drone || !takeTest || !level ||
      !exposure || !method || !comment
    ) {
      alert("Please fill in all required fields before submitting.");
      return false; // Stop function if any field is empty
    }

    const totalKnown = Object.values(knownWords).reduce((a, b) => a + b, 0);
    const totalUnknown = Object.values(unknownWords).reduce((a, b) => a + b, 0);
    const totalSeen = Object.values(seenWords).reduce((a, b) => a + b, 0);
    // const testedCount = testedWords.length;
    const totalTested = testedWords.length;

    // setTotalTested(testedCount);

    if (totalTested <501) {
      setConfidenceMessage("You need more words for testing.");
      return false;
    }

    // Standard error (SE) of the proportion
    // const proportionKnown = totalKnown / totalTested;

    // Prevent division by zero
    const proportionKnown = totalTested > 0 ? totalKnown / totalTested : 0;

    // const SE = Math.sqrt((proportionKnown * (1 - proportionKnown)) / totalTested);
    // Avoid invalid square root and division errors
    
    // const SE = totalTested > 1 && proportionKnown > 0 && proportionKnown < 1
    // ? Math.sqrt((proportionKnown * (1 - proportionKnown)) / totalTested)
    // : null; // Set SE to 0 if there's not enough data

    const SE = totalTested > 1
    ? Math.sqrt((proportionKnown * (1 - proportionKnown)) / totalTested)
    : 0; // Set SE to 0 if there's not enough data


    // 95% Confidence Interval
    // const CI = [
    //   Math.max(0, Math.min((proportionKnown - 1.96 * SE) * 100, 100)),
    //   Math.max(0, Math.min((proportionKnown + 1.96 * SE) * 100, 100))
    // ];
    // 95% Confidence Interval, constrained within [0, 100]
    const CI = [
      Math.max(0, Math.min((proportionKnown - 1.96 * SE) * 100, 100)),
      Math.max(0, Math.min((proportionKnown + 1.96 * SE) * 100, 100))
    ];

    // setStandardError(SE.toFixed(3));
    // setStandardError(Number.isFinite(SE) ? SE.toFixed(3) : "N/A");
    // setStandardError(Number.isFinite(SE) ? Number(SE) : null);
    setStandardError(Number.isFinite(SE) ? Number(SE) : 0);
    setConfidenceInterval(CI);
    setConfidenceMessage(`You know approximately ${Math.round(proportionKnown * 100)}% of the words in the list.`);

    // Generate a unique test ID (if not already handled in the backend)
    const uniqueID = userId || `test-${Date.now()}`;

    // Auto-calculate test date if not already set
    // const testDate = testDate || new Date().toISOString().split("T")[0];
    const testDate = new Date().toISOString().split("T")[0]; // Ensures testDate is always initialized

    // Prepare test result object in **EXACT COLUMN ORDER**
    const testResults = {
      UniqueID: uniqueID,
      FirstName: username,
      TestDate: testDate,
      TestDuration: testDuration/1000,
      Birthday: birthday,
      Gender: gender,
      Height: height,
      YearsOfStudy: yearsOfStudy,
      EducationLevel: educationLevel,
      Occupation: occupation,
      NativeLanguage: nativeLanguage,
      Country: country,
      City: city,
      State: state,
      // ConfidenceInterval: `${CI[0].toFixed(2)}% - ${CI[1].toFixed(2)}%`,
      ConfidenceInterval: CI && CI[0] !== null && CI[1] !== null 
      ? `${CI[0].toFixed(2)}% - ${CI[1].toFixed(2)}%`
      : "N/A",
      // StandardError: SE.toFixed(3),
      StandardError: SE !== null && SE !== undefined ? SE.toFixed(3) : "N/A",
      TotalKnown: totalKnown,
      TotalUnknown: totalUnknown,
      TotalSeen: totalSeen,
      TotalTested: totalTested,
      TestStatus: takeTest,
      Drone: drone,
      Color: color,
      TimeOfDay: timeOfDay,//new one
      LearningStyle: learningStyle,//new one
      Level: level,
      Exposure: exposure,
      Method: method.join(' '),
      Comment: comment,
      A1_Known: knownWords.A1 || 0,
      A2_Known: knownWords.A2 || 0,
      B1_Known: knownWords.B1 || 0,
      B2_Known: knownWords.B2 || 0,
      C1_Known: knownWords.C1 || 0,
      C2_Known: knownWords.C2 || 0,
      A1_Unknown: unknownWords.A1 || 0,
      A2_Unknown: unknownWords.A2 || 0,
      B1_Unknown: unknownWords.B1 || 0,
      B2_Unknown: unknownWords.B2 || 0,
      C1_Unknown: unknownWords.C1 || 0,
      C2_Unknown: unknownWords.C2 || 0,
      A1_SeenBefore: seenWords.A1 || 0,
      A2_SeenBefore: seenWords.A2 || 0,
      B1_SeenBefore: seenWords.B1 || 0,
      B2_SeenBefore: seenWords.B2 || 0,
      C1_SeenBefore: seenWords.C1 || 0,
      C2_SeenBefore: seenWords.C2 || 0,
    };

    try {
      const response = await fetch("/api/saveTestResults3", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(testResults),
      });

      // const responseData = await response.json().catch(() => null); // Try to parse response JSON, or return null

      const responseText = await response.text(); // Get raw response
      let responseData;
      try {
        responseData = JSON.parse(responseText);
      } catch (e) {
        responseData = responseText; // Fallback in case of non-JSON response
      }

      console.log("Server Response:", responseData);

      if (!response.ok) {
        throw new Error(`Failed to save test results. Status: ${response.status}`);
      }

      // if (!response.ok) throw new Error("Failed to save test results");

      console.log("Test results saved successfully");

      return true; // ✅ Success
    } catch (error) {
      console.error("Error saving test results:", error);
      alert("An error occurred while submitting. Please try again.");
      return false; // ✅ Failure (keeps button enabled)
    }
  };

  const handleStop = () => {
    setIsTestStopped(true);
    stopTest(); // Stop the timer properly
    // if (!username.trim()) {
    //   alert("Please enter a username before submitting the test.");
    //   // setIsUsernameRequired(true);

    //   return;
    // }

    setTestDuration(elapsedTime);
    console.log("code is running");
    console.log(elapsedTime);

    // testDuration = elapsedTime; // Capture final time
    // calculateResults(testDuration); // Pass test duration to results calculation
  };

  const handleSubmit = async() => {
    console.log("Submit button clicked...................");

    if (isSubmitted) return; // Prevent multiple submissions

    console.log("Submitting.......................");

    const success = await calculateResults(); // Ensure function returns true/false

    if (success) {
      setIsSubmitted(true); // ✅ Only disable button after successful submission
    } else {
      console.log("Submission failed, re-enabling button.");
    }
  };


  const handleChange = (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions, (option) => option.value);
    setMethod(selectedOptions);
  };

  const getTotalWords = () => {
    return Object.values(knownWords).reduce((a, b) => a + b, 0) + 
            Object.values(unknownWords).reduce((a, b) => a + b, 0) + 
            Object.values(seenWords).reduce((a, b) => a + b, 0);
  };

  //NEW CSS
  return (
    <div>
      {/* Timer Display */}
      <div className="mt-16 timer">
        {elapsedTime > 0 ? `Time: ${(elapsedTime / 1000).toFixed(3)}s` : "00:000s"}
      </div>

      <div className="container">
        <h1>"By proceeding, you agree to participate in this vocabulary study. Your responses, including demographic and test data, 
          will be used for research purposes only. No personally 
          identifiable information is collected, and your data remains anonymous. 
          Participation is voluntary, and you may exit at any time."</h1>

        {/* CEFR Level Selection */}
        <div className="checkbox-group">
          {["A1", "A2", "B1", "B2", "C1", "C2"].map((level) => (
            <div key={level} className="checkbox-item">
              <input type="checkbox" id={level} onChange={() => handleCheckboxChange(level)} disabled={isTestStopped} />
              <label htmlFor={level}>{level}</label>
            </div>
          ))}
        </div>

        {/* Start Test Button */}
        <button className="go-button" onClick= {startTest} disabled={!selectedLevels.length || isTestStopped}>
          Go!
        </button>

        {/* Word Display & Known/Unknown Buttons */}
        {randomWord && (
        <div className="result">
          <p className="fade-in">{randomWord.headword}</p>
          <div className="button-group">
            <button onClick={markAsUnknown} disabled ={isTestStopped} className="known-unknown-btn unknown-btn">
              Unknown
            </button>
            <button onClick={markAsKnown} disabled ={isTestStopped} className="known-unknown-btn known-btn">
              Known
            </button>
            <button onClick={markAsSeen} disabled ={isTestStopped} className="known-unknown-btn seen-btn">
              Seen
            </button>
          </div>
        </div>
      )}

        {/* Stop Button */}
        {showReadyButton &&(
          <button onClick={() => handleStop()} disabled ={isSubmitted || (totalAmount <525)} className="ready-button">
            Stop
          </button>
        )}

  {showReadyButton && isTestStopped &&(
  <div className="user-info">
    <div className="form-container">

      <div className = "form-group">
        <label>First Name:</label>
        <input type="text" title="Enter your name" placeholder="Enter First Name" value={username} onChange={(e) => { setUsername(e.target.value)}} required />
      </div>

      <div className = "form-group">
        <label htmlFor="test-date">Test Date:</label>
        <input id="test-date" type="date" defaultValue={testDate} readOnly required/>
      </div>

      <div className = "form-group">
        <label htmlFor="test-duration">Test Duration (seconds):</label>
        <input id="test-duration" type="text" value={testDuration.toFixed(3)/1000} readOnly required/>
      </div>

      <div className = "form-group">
        <label>Birthday:</label>
        <input type="date" title="Enter your Birthday" value={birthday} onChange={(e) => setBirthday(e.target.value)} required />
      </div>

      <div className = "form-group">
        <label>Gender:</label>
        <input type="text" title="Enter your Gender" placeholder="Gender" value={gender} onChange={(e) => setGender(e.target.value)} required />
      </div> 
       
      <div className = "form-group">
        <label>Height:</label>
        <input type="text" title="Enter your Height" placeholder="Height" value={height} onChange={(e) => setHeight(e.target.value)} required />
      </div>

      <div className = "form-group">
        <label>Years of Study:</label>
        <input type="number" title="Enter years of study" placeholder="Years of Study" value={yearsOfStudy} onChange={(e) => setYearsOfStudy(e.target.value)} required />
      </div>
        {/* <label>Education Level:</label>
        <input type="text" placeholder="Education Level" value={educationLevel} onChange={(e) => setEducationLevel(e.target.value)} required /> */}
      

      <div className = "form-group">
        <label>Education Level</label>
        <select title="Enter Education level" value={educationLevel} required onChange={(e) => setEducationLevel(e.target.value)}>
          <option value="">Select</option>
          <option value="Less than High School">Less than High School</option>
          <option value="High School">High School</option>
          <option value="Associate/Technical">Associate/Technical</option>
          <option value="Bachelor's">Bachelor's Degree</option>
          <option value="Master's">Master's Degree</option>
          <option value="PhD">Ph.D</option>
        </select>
      </div>

      <div className = "form-group">
        <label>Occupation:</label>
        <input type="text" title="Enter occupation" placeholder="Occupation" value={occupation} onChange={(e) => setOccupation(e.target.value)} required />
      </div>
            
      <div className = "form-group">
        <label>Native Language:</label>
        <input type="text" title="Enter native language" placeholder="Native Language" value={nativeLanguage} onChange={(e) => setNativeLanguage(e.target.value)} required />
      </div>

      <div className = "form-group">
        <label>Country:</label>
        <input type="text" title="Enter Country" placeholder="Country" value={country} onChange={(e) => setCountry(e.target.value)} required />
      </div>

      <div className = "form-group">
        <label>City:</label>
        <input type="text" title="Enter City" placeholder="City" value={city} onChange={(e) => setCity(e.target.value)} required />
      </div>

      <div className = "form-group">
        <label>State/Region:</label>
        <input type="text" title="Enter State" placeholder="State/Region" value={state} onChange={(e) => setState(e.target.value)} required />
      </div>

      <div className = "form-group">
        <label>Do you support the drone program?</label>
        <select title="Enter yes or no" value={drone} required onChange={(e) => setDrone(e.target.value)}>
          <option value="">Select</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
          <option value="Don't Know">Don't Know</option>
        </select>
      </div>

      <div className = "form-group">
        <label>Did you take a Grammar CEFR Test?</label>
        <select title="Enter Test Status" value={takeTest} required onChange={(e) => setTakeTest(e.target.value)}>
          <option value="">Select</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
          <option value="Don't Know">Don't Know</option>
        </select>
      </div>
      
      <div className = "form-group">
        <label>What Level CEFR English are you?</label>
        <select title="Enter CEFR Level" value={level} required onChange={(e) => setLevel(e.target.value)}>
          <option value="">Select</option>
          <option value="A1">A1</option>
          <option value="A2">A2</option>
          <option value="B1">B1</option>
          <option value="B2">B2</option>
          <option value="C1">C1</option>
          <option value="C2">C2</option>
          <option value="Native">Native</option>
          <option value="DK">I Don't Know</option>
        </select>
      </div>

      <div className = "form-group">
        <label>How often are you exposed to English?</label>
        <select title="Enter frequency" value={exposure} required onChange={(e) => setExposure(e.target.value)}>
        
          <option value="">Select</option>
          <option value="Constantly">Constantly 90-100%</option>
          <option value="Daily">Daily 70-90%</option>
          <option value="Regularly">Regularly 50-70%</option>
          <option value="Several Times a Week">Several Times a Week 30-50%</option>
          <option value="Weekly">Weekly 15-30%</option>
          <option value="Occasionally">Occasionally 5-15%</option>
          <option value="Rarely">Rarely 1-5%</option>
          <option value="Hardly Ever">Hardly Ever 0-1%</option>
          <option value="Never">Never 0%</option>
        </select>
      </div>

      <div className = "form-group">
        <label htmlFor="multi-select">How do you get exposed (CTRL Multiple)?</label>
        <select title="Enter multiple" id="multi-select" value={method} required onChange={handleChange} multiple>

          <option value="Movies">Movies</option>
          <option value="TV shows">TV shows</option>
          <option value="Books">Books</option>
          <option value="School">School</option>
          <option value="Apps">Apps</option>
          <option value="Tutor">Tutor</option>
          <option value="Work">Work</option>
          <option value="Magazines">Magazines</option>
          <option value="Podcasts">Podcasts</option>
          <option value="Music">Music</option>
          <option value="News articles">News articles</option>
          <option value="Online forums">Online forums</option>
          <option value="Social media">Social media</option>
          <option value="Video games">Video games</option>
          <option value="Radio">Radio</option>
          <option value="Lectures">Lectures</option>
          <option value="Conversations">Conversations</option>
          <option value="Emails">Emails</option>
          <option value="Websites">Websites</option>
          <option value="Text messages">Text messages</option>
          <option value="Blogs">Blogs</option>
          <option value="Speeches">Speeches</option>
          <option value="Interviews">Interviews</option>
        </select>
      </div>

      <div className = "form-group">
        <label>What is your learning style?</label>
        {/* <select title="Enter learning Style" value={learningStyle} required onChange={(e) => setLearningStyle(e.target.value)}> */}
        <select
            name="learningStyle"
            title="Enter learning Style"
            value={learningStyle}
            required
            onChange={(e) => {
              console.log("Dropdown changed to:", e.target.value);
              setLearningStyle(e.target.value);
            }}
>
          <option value="" disabled>Select your learning style</option>
          <option value="Visual">Visual (Images, charts, diagrams, videos)</option>
          <option value="Auditory">Auditory (Listening, lectures, discussions, podcasts)</option>
          <option value="Reading/Writing">Reading/Writing (Books, articles, note-taking)</option>
          <option value="Kinesthetic">Kinesthetic (Hands-on activities, role-playing, movement)</option>
          <option value="Logical">Logical (Problem-solving, puzzles, patterns, analysis)</option>
          <option value="Social">Social (Group discussions, study groups, teamwork)</option>
          <option value="Solitary">Solitary (Self-study, reflection, independent research)</option>
          <option value="Multimodal">Multimodal (A mix of multiple styles)</option>
        </select>
      </div>

      <div className = "form-group">
        <label>Time A.M/P.M ?</label>
        <input type="text"  title="Enter time" placeholder="i.e. 10 A.M/P.M." value={timeOfDay} onChange={(e) => setTimeOfDay(e.target.value)} required />
      </div>

      <div className = "form-group">
        <label>Comments:</label>
        <input type="text" title="Enter Comments:" placeholder="Comments" value={comment} onChange={(e) => setComment(e.target.value)} required />
      </div>

      <div className = "form-group">
        <label>What is your favorite color?</label>
        <input type="text" title="Enter Color" placeholder="Favorite Color" value={color} onChange={(e) => setColor(e.target.value)} required />
      </div>
      
      <button onClick={handleSubmit} disabled={isSubmitted} className="ready-button">Submit Test</button>
    </div>
  </div>
  
  )}
        {/* Confidence Interval & Standard Error */}
        {confidenceMessage && (
          <div className="confidence-message">
            <p>{confidenceMessage}</p>
            {confidenceInterval && (
              <p>
                95% Confidence Interval: [{Math.round(confidenceInterval[0])}%,{" "}
                {Math.round(confidenceInterval[1])}%]
                <br />MORE WORDS MEAN MORE PRECISION!!!!
              </p>
            )}
            {/* {standardError && <p>Standard Error: {standardError.toFixed(3)}</p>} */}
            {/* {standardError !== null && !isNaN(standardError) && (<p>Standard Error: {standardError.toFixed(3)}</p> */}
            {standardError !== null && !isNaN(standardError) ? (
              // <p>Standard Error: {standardError.toFixed(3)}</p>
              <p>Standard Error: {Number.isFinite(standardError) ? standardError.toFixed(3) : "N/A"}</p>
            ) : (
              <p>Standard Error: N/A</p>
            )}

          </div>
        )}

        {/* Word Counter */}
        <div className="word-counter">
          <h3>Word Counts</h3>
          <div className="word-counts">
            <div className="known-column">
              <h4>Known</h4>
              {["A1", "A2", "B1", "B2", "C1", "C2"].map((level) => (
                <p key={level}>
                  {level}: {knownWords[level]}
                </p>
              ))}
            </div>
            <div className="unknown-column">
              <h4>Unknown</h4>
              {["A1", "A2", "B1", "B2", "C1", "C2"].map((level) => (
                <p key={level}>
                  {level}: {unknownWords[level]}
                </p>
              ))}
            </div>
            <div className="seen-column">
              <h4>Seen</h4>
              {["A1", "A2", "B1", "B2", "C1", "C2"].map((level) => (
                  <p key={level}>
                      {level}: {seenWords[level]}
                  </p>
              ))}
            </div>

          </div>
          <div className="total-count">
            <p>Total Words: {getTotalWords()}</p>
          </div>
        </div>

        <style jsx>{`
                .user-info {
                  display: flex;
                  justify-content: center;
                  margin: 20px;
                }

                .form-container {
                  display: grid;
                  padding: 15px;
                  border: 1px solid black;
                  grid-template-columns: auto 1fr;
                  gap: 20px;
                  align-items: center;
                }

                .form-group {
                  display: flex;
                  flex-wrap: wrap;
                  
                  gap: 16px; /* Space between label and input */
                }

                .form-container label {
                  font-weight: bold;
                }

                .form-container input,
                .form-container select {
                  width: 100%;
                  padding: 8px;
                  border: 1px solid gray;
                  border-radius: 4px;
                }

                .ready-button {
                  grid-column: span 4; /* Make the submit button full width */
                  margin-top: 10px;
                  padding: 10px;
                  background-color: #007bff;
                  color: white;
                  border: none;
                  cursor: pointer;
                  font-size: 16px;
                  border-radius: 4px;
                }

                .ready-button:hover {
                  background-color: #0056b3;
                }

                .container {
                  text-align: center;
                  margin-top: 20px;
                }

                .timer {
                  position: absolute;
                  top: 10px;
                  right: 20px;
                  font-size: 18px;
                  font-weight: bold;
                  color: #ff4500;
                }

                .checkbox-group {
                  display: flex;
                  justify-content: center;
                  gap: 20px;
                  margin: 20px 0;
                }

                .go-button {
                  padding: 10px 20px;
                  background-color: #007bff;
                  color: white;
                  border: none;
                  cursor: pointer;
                  font-size: 16px;
                  border-radius: 5px;
                  margin-top: 20px;
                }

                .result {
                      margin-top: 20px;
                      margin-top:20px;
                      gap: 20px; /* Add spacing between buttons */
                }
                .known-unknown-btn {
                    padding: 10px 15px;
                    font-size: 16px;
                    border: none;
                    cursor: pointer;
                    border-radius: 5px;
                }
                .unknown-btn {
                    background-color: #ff4d4d; /* Red */
                    color: white;
                }
                .known-btn {
                    background-color: #4caf50; /* Green */
                    color: white;
                }
                .seen-btn {
                    background-color: #ffa500; /* Orange */
                    color: white;
                }
                .unknown-btn:hover {
                    background-color: #e63939;
                }
                .known-btn:hover {
                    background-color: #3d8b40;
                }
                .seen-btn:hover {
                    background-color: #ff8c00;
                }

              .fade-in {
                font-size: 50px;
                font-weight: bold;
                color: #333;
                animation: fadeIn 1.5s ease-in-out;
                margin-bottom: 15px; /* Space between word and buttons */
              }

              
              .word-counter {
                margin-top: 40px;
                text-align: left;
                margin: 0 10%;
              }

              .word-counts {
                display: flex;
                justify-content: space-between;
              }

              .known-column, .unknown-column {
                width: 45%;
              }

              .total-count {
                margin-top: 20px;
                font-weight: bold;
              }

              .button-group {
                display: flex;
                justify-content: center;
                gap: 20px;/* Space between buttons*/
              }

              @keyframes fadeIn {
                from {
                  opacity: 0;
                }
                to {
                  opacity: 1;
                }
              }

               /* Tablets: 2 columns */
              @media (max-width: 1024px) {
                .form-container {
                  grid-template-columns: repeat(2, 1fr);
                }
              }

              /* Phones & small tablets: 1 column */
              @media (max-width: 768px) {
                .form-container {
                  display: flex;
                  flex-direction: column; /* Force everything into one column */
                }

                .form-group {
                  width: 100%;
                }
              }

              /* Extra small screens (≤ 480px): Ensure full-width inputs */
              @media (max-width: 480px) {
                .form-container {
                  grid-template-columns: 1fr;
                  width: 100%;
                  padding: 10px;
                }
                .form-container input,
                .form-container select,
                .form-container button {
                  width: 100%;
                }
        `}</style>
      </div>
    </div>
  );
};

  