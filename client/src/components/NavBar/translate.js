import { useEffect } from "react";
import { db } from "../../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

const Translate = () => {
  // Function to log to Firestore
  const logToFirebase = async (event, data = {}) => {
    try {
      await addDoc(collection(db, "translateLogs"), {
        event,
        timestamp: serverTimestamp(),
        ...data,
      });
    } catch (err) {
      console.error("Error logging to Firebase:", err);
    }
  };

  const googleTranslateElementInit = () => {
    try {
      //logToFirebase("googleTranslateElementInit called");

      new window.google.translate.TranslateElement(
        {
          pageLanguage: "en",
          autoDisplay: false,
        },
        "google_translate_element"
      );

      // Poll for the dropdown to appear
      const interval = setInterval(() => {
       // logToFirebase("Polling for language dropdown...");

        const selectElement = document.querySelector(".goog-te-combo");
        if (selectElement) {
        //  logToFirebase("Language dropdown detected");

          clearInterval(interval);

          selectElement.addEventListener("change", () => {
            logToFirebase("Language changed", { selectedLanguage: selectElement.value });
          });
        }
      }, 500);
    } catch (err) {
     // logToFirebase("Error in googleTranslateElementInit", { error: err.toString() });
      console.error("Error in googleTranslateElementInit", err);
    }
  };

  useEffect(() => {
   // logToFirebase("useEffect triggered");

    // Define global callback before adding the script
    window.googleTranslateElementInit = googleTranslateElementInit;

    // Check if script is already added
    if (!document.querySelector('script[src="//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"]')) {
      const addScript = document.createElement("script");
      addScript.src = "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      addScript.async = true;
     // logToFirebase("Adding Google Translate script");
      document.body.appendChild(addScript);
    } else {
      // Script already loaded, just call init manually
      googleTranslateElementInit();
    }

    // Do NOT remove the script on unmount to avoid issues
  }, []);

  return <div id="google_translate_element"></div>;
};

export default Translate;