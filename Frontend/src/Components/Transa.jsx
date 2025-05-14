import React, { useState } from "react";
import { MdDelete, MdContentCopy } from "react-icons/md";
import CountUp from "../../Reactbits/CountUp/CountUp";
import SplitText from "../../Reactbits/SplitText/SplitText";

const Transa = () => {
  const [inputText, setInputText] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  const [language, setLanguage] = useState("en");
  const [detectedLang, setDetectedLang] = useState("");
  const [copied, setCopied] = useState(false);

  const handleTranslate = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/translate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: inputText,
          targetLanguage: language,
        }),
      });

      const data = await response.json();
      setTranslatedText(data.translatedText || "Translation failed");
      if (data.detectedLang) {
        setDetectedLang(data.detectedLang);
      }
    } catch (error) {
      console.error("Translation error:", error);
      setTranslatedText(`Error: ${error.message}`);
    }
  };

  const handleClear = () => {
    setInputText("");
    setTranslatedText("");
    setDetectedLang("");
  };

  const handleCopy = () => {
    if (translatedText) {
      navigator.clipboard.writeText(translatedText);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    }
  };

const characterCount = inputText.length;;

  return (
    <>   <SplitText/>
    <div className="bg-gray-100 flex items-center justify-center p-6 ">
          
      <div className="w-full max-w-2xl bg-white shadow-md rounded-lg p-6">
    
        {/* Textarea with delete icon */}
        <div className="relative mb-1">
          <textarea
            className="w-full h-32 p-3 pr-10 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter text in any language..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          />
          <button
            onClick={handleClear}
            className="absolute top-2 right-2 text-gray-500 hover:text-red-600"
            title="Clear"
          >
            <MdDelete size={24} />
          </button>
        </div>

        {/* Word counter */}
        <div className="text-right text-sm text-gray-600 mb-4">
         {characterCount} / <CountUp/>
        </div>

        {/* Language selector & translate button */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
          <label className="flex flex-col sm:flex-row sm:items-center gap-2 font-medium text-gray-700">
            Translate to:
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="en">English</option>
              <option value="es">Spanish</option>
              <option value="fr">French</option>
              <option value="de">German</option>
              <option value="hi">Hindi</option>
              <option value="zh">Chinese</option>
            </select>
          </label>

          <button
            onClick={handleTranslate}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-md transition"
          >
            Translate
          </button>
        </div>

        {/* Output + Copy */}
        <div className="bg-gray-50 border border-gray-200 rounded-md p-4 relative">
          <h3 className="text-lg font-semibold mb-2">Translation:</h3>
          <p className="text-gray-800 whitespace-pre-wrap">{translatedText}</p>
          {detectedLang && (
            <p className="text-sm text-gray-500 mt-2">
              Detected source language: {detectedLang}
            </p>
          )}

          {translatedText && (
            <button
              onClick={handleCopy}
              className="absolute top-4 right-4 text-blue-600 hover:text-blue-800"
              title="Copy"
            >
              <MdContentCopy size={20} />
            </button>
          )}
          {copied && <p className="text-green-600 mt-2 text-sm">Copied!</p>}
        </div>
      </div>
    </div>
    </>
  );
};

export default Transa;
