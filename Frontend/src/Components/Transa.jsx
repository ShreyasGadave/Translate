import React, { useState } from "react";
import { MdDelete, MdContentCopy } from "react-icons/md";
import CountUp from "../../Reactbits/CountUp/CountUp";
import SplitText from "../../Reactbits/SplitText/SplitText";
import Aurora from "../../Reactbits/Aurora/Aurora";
import { MdSwapHoriz } from "react-icons/md";

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

  const characterCount = inputText.length;

  return (
    <>
      <div className="bg-black flex flex-col items-center justify-center ">
        <Aurora />
        {/* Headline Section */}
        <div className="w-full flex flex-col max-w-3xl text-center mb-6 -mt-10">
          {/* <SplitText text={AlphaTranslate} className="" /> */}
          <SplitText
            text="AlphaTranslate"
            className="text-3xl font-bold text-gray-300"
            delay={50}
            animationFrom={{ opacity: 0, transform: "translateY(30px)" }}
            animationTo={{ opacity: 1, transform: "translateY(0)" }}
            easing="easeOutQuart"
          />
          <p className="text-gray-400">
            Easily translate text from any language to your desired language in
            seconds. Our smart translator detects the source language
            automatically and provides accurate translations using advanced AI.
            Perfect for communication, learning, and global reach.
          </p>
        </div>

        <div className="w-full max-w-5xl mx-auto bg-gray-900 text-white rounded-lg shadow-lg p-4 space-y-4">
          {/* Tabs */}
          <div className="flex gap-4 border-b border-gray-700 pb-2">
            <button className="text-gray-400 font-semibold">Text</button>
         
          </div>

          {/* Language Selectors and Swap */}
          <div className="flex justify-between items-center gap-4">
            <div className="flex-1">
              <select
                // value={sourceLang}
                // onChange={(e) => setSourceLang(e.target.value)}
                className="w-full bg-gray-800 border border-gray-600 rounded-md px-3 py-2 text-white"
              >
                <option value="hi">Hindi</option>
                <option value="en">English</option>
                <option value="en">English</option>
                <option value="es">Spanish</option>
                <option value="fr">French</option>
                <option value="de">German</option>
                <option value="hi">Hindi</option>
                <option value="zh">Chinese</option>
                {/* Add more */}
              </select>
            </div>

            <button
              // onClick={swapLanguages}
              className="text-gray-400 hover:text-white"
              title="Swap Languages"
            >
              <MdSwapHoriz size={28} />
            </button>

            <div className="flex-1">
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="w-full bg-gray-800 border border-gray-600 rounded-md px-3 py-2 text-white"
              >
                <option value="en">English</option>
                <option value="hi">Hindi</option>
                <option value="en">English</option>
                <option value="es">Spanish</option>
                <option value="fr">French</option>
                <option value="de">German</option>
                <option value="hi">Hindi</option>
                <option value="zh">Chinese</option>
                {/* Add more */}
              </select>
            </div>
          </div>

          {/* Text Areas */}
          <div className="flex flex-col md:flex-row gap-4">
            {/* Input Box */}
            <div className="relative w-full bg-gray-800 md:w-1/2 p-3">
              <textarea
                className="w-full h-60  text-white p-1 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter text..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
              />
             
              <div className="text-right flex justify-end items-center gap-2 text-sm text-gray-400 mt-1">
                 <button
                onClick={handleClear}
                className="top-3 text-gray-500 hover:text-red-600"
                title="Clear"
              >
                <MdDelete size={25} />
              </button>
                {characterCount} / <CountUp />
              </div>
            </div>

            {/* Output Box */}
            <div className="relative w-full md:w-1/2 bg-gray-800 rounded-lg p-4">
              <h3 className="text-lg font-semibold mb-2">Translation:</h3>
              <p className="text-gray-100 whitespace-pre-wrap h-40 overflow-auto">
                {translatedText || (
                  <span className="text-gray-500">
                    Translation will appear here...
                  </span>
                )}
              </p>

              {detectedLang && (
                <p className="text-sm text-gray-400 mt-2">
                  Detected Language:{" "}
                  <span className="font-medium">{detectedLang}</span>
                </p>
              )}

              {translatedText && (
                <button
                  onClick={handleCopy}
                  className="absolute top-4 right-4 text-blue-400 hover:text-blue-600"
                  title="Copy"
                >
                  <MdContentCopy size={20} />
                </button>
              )}
              {copied && <p className="text-green-500 mt-2 text-sm">Copied!</p>}
            </div>
          </div>

          {/* Translate Button */}
          <div className="flex justify-end">
            <button
              onClick={handleTranslate}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md"
            >
              Translate
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Transa;
