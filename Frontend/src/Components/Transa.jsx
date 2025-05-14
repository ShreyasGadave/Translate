import React, { useState, useEffect } from "react";
import { MdDelete, MdContentCopy, MdVolumeUp, MdCheck } from "react-icons/md";
import CountUp from "../../Reactbits/CountUp/CountUp";
import SplitText from "../../Reactbits/SplitText/SplitText";
import Aurora from "../../Reactbits/Aurora/Aurora";
import { MdSwapHoriz } from "react-icons/md";
import BG from "../assets/BG.png";
import { MdOutlineDelete } from "react-icons/md";
import { MdFavoriteBorder, MdFavorite } from "react-icons/md";
import { MdShare } from "react-icons/md";

const Transa = () => {
  const [inputText, setInputText] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  const [language, setLanguage] = useState("en");
  const [detectedLang, setDetectedLang] = useState("");
  const [liked, setLiked] = useState(false);
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

  const handleCopy = () => {
    if (translatedText) {
      navigator.clipboard.writeText(translatedText).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 3000); // Show ✓ for 3 seconds
      });
    }
  };

  const handleClear = () => {
    setInputText("");
    setTranslatedText("");
    setDetectedLang("");
  };

  const handleSpeak = () => {
    if (!inputText.trim()) return;

    const utterance = new SpeechSynthesisUtterance(inputText);
    const voices = speechSynthesis.getVoices();

    // Try to select a female voice (this depends on browser support)
    const femaleVoice = voices.find(
      (voice) =>
        voice.name.toLowerCase().includes("female") ||
        voice.name.toLowerCase().includes("woman") ||
        voice.name.toLowerCase().includes("google uk english female")
    );

    // Fallback to first voice if not found
    utterance.voice = femaleVoice || voices[0];
    utterance.lang = "en-US";
    utterance.rate = 1;
    utterance.pitch = 1.2; // Slightly higher pitch for a more feminine tone

    speechSynthesis.speak(utterance);
  };

  const characterCount = inputText.length;

  useEffect(() => {
    window.speechSynthesis.onvoiceschanged = () => {
      speechSynthesis.getVoices(); // triggers voice loading
    };
  }, []);

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
        <div
          className="w-full max-w-5xl mx-auto text-white rounded-lg shadow-lg pb-4 space-y-4 relative "
          style={{
            backgroundImage: `url(${BG})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {/* Glassmorphism Overlay */}
          <div className="absolute inset-0 bg-gray-900/40 backdrop-blur-xl border border-white/20 rounded-lg z-0"></div>

          {/* Content Layer */}
          <div className="relative z-10 space-y-4 p-4">
            {/* Tabs */}
            <div className="flex gap-4 border-b border-gray-700 pb-2">
              <button className="text-gray-300 font-semibold">Text</button>
            </div>

            {/* Language Selectors and Swap */}
            <div className="flex justify-between rounded-md px-3 py-2 bg-white/10 backdrop-blur-md border border-white/20 items-center gap-4">
              <div className="flex-1">
                <span className="w-full font-normal bg-transparent text-white">
                  Detect Language
                </span>
              </div>

              <button
                className="text-gray-300 hover:text-white"
                title="Swap Languages"
              >
                <MdSwapHoriz size={28} />
              </button>

              <div className="flex-1">
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="w-full font-normal bg-transparent text-white focus:outline-none focus:ring-0"
                >
                  <option value="en">English</option>
                  <option value="hi">Hindi</option>
                  <option value="es">Spanish</option>
                  <option value="fr">French</option>
                  <option value="de">German</option>
                  <option value="zh">Chinese</option>
                </select>
              </div>
            </div>

            {/* Text Areas */}
            <div className="flex flex-col md:flex-row gap-2">
              {/* Input Box */}
              <div className="relative w-full rounded-md bg-white/10 backdrop-blur-md border border-white/20 md:w-1/2 p-3">
                {/* Top-right icon actions */}
                <div className="absolute top-3 right-3 flex gap-3">
                  {/* Speak Icon - Blue */}
                  <button
                    onClick={handleSpeak}
                    className="text-blue-400 hover:text-blue-600 transition-colors"
                    title="Speak"
                  >
                    <MdVolumeUp size={22} />
                  </button>

                  {/* Clear Icon - Red */}
                  <button
                    onClick={handleClear}
                    className="text-red-400 hover:text-red-600 transition-colors"
                    title="Clear"
                  >
                    <MdOutlineDelete size={22} />
                  </button>
                </div>

                {/* Textarea */}
                <textarea
                  className="w-full h-60 text-white bg-transparent p-1 resize-none focus:outline-none focus:ring-0"
                  placeholder="Enter text..."
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                />

                {/* Character Count */}
                <div className="text-right text-sm text-gray-300 mt-1">
                  {characterCount} / 5,000
                </div>
              </div>

              {/* Output Box */}
              <div className="relative w-full md:w-1/2 bg-white/10 backdrop-blur-md border border-white/20 rounded-md p-4">
                <div className="flex justify-between items-center mb-2">
                  <div className="absolute top-3 right-3 flex gap-3">
                    <button
                      onClick={() => setLiked(!liked)}
                      className={`transition-colors ${
                        liked
                          ? "text-red-500"
                          : "text-pink-400 hover:text-pink-600"
                      }`}
                      title="Like"
                    >
                      {liked ? (
                        <MdFavorite size={22} />
                      ) : (
                        <MdFavoriteBorder size={22} />
                      )}
                    </button>

                    <button
                      onClick={() => {
                        if (!translatedText) return;

                        if (navigator.share) {
                          navigator
                            .share({
                              text: translatedText,
                              title: "Shared Translation",
                            })
                            .catch((error) =>
                              console.error("Share failed:", error)
                            );
                        } else {
                          alert("Sharing is not supported on this device.");
                        }
                      }}
                      className="text-green-400 hover:text-green-600 transition-colors"
                      title="Share"
                    >
                      <MdShare size={22} />
                    </button>

                    <button
                      onClick={handleCopy}
                      className={`text-blue-400 hover:text-blue-600 transition-colors`}
                      title="Copy"
                    >
                      {copied ? (
                        <MdCheck size={22} />
                      ) : (
                        <MdContentCopy size={22} />
                      )}
                    </button>
                  </div>
                </div>

                <p className="text-gray-100 whitespace-pre-wrap h-40 overflow-auto">
                  {translatedText || (
                    <span className="text-gray-400">
                      Translation will appear here...
                    </span>
                  )}
                </p>
              </div>
            </div>

            {/* Translate Button */}
            <div className="flex justify-end">
             <div className="p-[2px] rounded-md  inline-block">
<div className="p-[2px] rounded-md bg-gradient-to-r from-[#00d8ff] via-[#7cff67] to-[#00d8ff] inline-block">
  <button
    onClick={handleTranslate}
    className="bg-black text-gray-300 px-6 py-2 rounded-md w-full h-full"
  >
    Translate
  </button>
</div>

</div>

            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Transa;
