import React, { useState, useEffect, useRef } from "react";
import { MdDelete, MdContentCopy, MdVolumeUp, MdCheck } from "react-icons/md";
import CountUp from "../../Reactbits/CountUp/CountUp";
import SplitText from "../../Reactbits/SplitText/SplitText";
import Aurora from "../../Reactbits/Aurora/Aurora";
import { MdSwapHoriz } from "react-icons/md";
import BG from "../assets/BG.png";
import LANG from "../assets/Lang.svg";
import { MdOutlineDelete, MdKeyboardVoice } from "react-icons/md";
import { MdFavoriteBorder, MdFavorite } from "react-icons/md";
import { MdShare } from "react-icons/md";
import GradientText from "../../Reactbits/GradientText/GradientText";

const Transa = () => {
  const [inputText, setInputText] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  const [language, setLanguage] = useState("en");
  const [detectedLang, setDetectedLang] = useState("");
  const [liked, setLiked] = useState(false);
  const [copied, setCopied] = useState(false);
  const [inputcopied, setInputCopied] = useState(false);
  const recognitionRef = useRef(null);
  const textRef = useRef(null);

  // const handleTranslate = async () => {
  //   try {
  //     const response = await fetch("http://localhost:8080/api/translate", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         text: inputText,
  //         targetLanguage: language,
  //       }),
  //     });

  //     const data = await response.json();
  //     setTranslatedText(data.translatedText || "Translation failed");
  //     if (data.detectedLang) {
  //       setDetectedLang(data.detectedLang);
  //     }
  //   } catch (error) {
  //     console.error("Translation error:", error);
  //     setTranslatedText(`Error: ${error.message}`);
  //   }
  // };

  const handleTranslate = async () => {
    try {
      const payload = {
        text: inputText,
        targetLanguage: language,
      };
      console.log("Body:", JSON.stringify(payload, null, 2));

      const response = await fetch("http://localhost:8080/api/translate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      console.log("Response object:", response);

      const data = await response.json();
      console.log("Response JSON data:", data);

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

  const handleCopyInput = () => {
    if (textRef.current) {
      textRef.current.select();
      navigator.clipboard.writeText(textRef.current.value).then(() => {
        setInputCopied(true);
        setTimeout(() => setInputCopied(false), 3000);
      });
    }
  };
  const handleMicInput = () => {
    if (!("webkitSpeechRecognition" in window)) {
      alert("Speech recognition not supported in this browser.");
      return;
    }

    const recognition = new window.webkitSpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = "en-US";

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setInputText((prev) => prev + " " + transcript);
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
    };

    recognition.start();
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

  const handleSpeakOut = () => {
    if (!translatedText.trim()) return;

    const utterance = new SpeechSynthesisUtterance(translatedText);
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
      <div className="flex flex-col items-center justify-center ">
        <Aurora />
        {/* Headline Section */}
        <div className="w-full flex flex-col max-w-3xl text-center mb-6 -mt-20">
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
            seconds. Perfect for communication, learning, and global reach.
          </p>
        </div>
        <div
          className="w-full m-2 max-w-5xl mt-10 sm:mt-0 mx-auto text-white rounded-lg shadow-lg pb-4  relative "
          style={{
            backgroundImage: `url(${BG})`,

            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-gray-900/40 backdrop-blur-xl border border-white/20 rounded-lg z-0"></div>

          <div className="relative z-10 space-y-4 p-4">
            <div className=" absolute right-2 -top-12 opacity-80 hover:scale-105 transition-all ease-in">
              <img src={LANG} alt="" className="h-18 sm:h-full " />
            </div>
            <div className="flex gap-4 border-b border-gray-700 pb-2">
              <button className="text-gray-300 font-semibold">Text</button>
            </div>

            <div className="flex justify-between rounded-md px-3 py-2 bg-white/10 backdrop-blur-md border border-white/20 items-center gap-4">
              <div className="flex-1">
                <span className="w-full font-extralight bg-transparent text-white">
                  Detect Language
                </span>
              </div>

              <button
                className="text-gray-300 hover:text-white"
                title="Swap Languages"
              >
                <MdSwapHoriz size={28} />
              </button>

              {/* <div className="flex-1">
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="w-full font-extralight bg-transparent text-white focus:outline-none focus:ring-0"
                >
                  <option value="af">Afrikaans</option>
                  <option value="am">Amharic</option>
                  <option value="ar">Arabic</option>
                  <option value="az">Azerbaijani</option>
                  <option value="be">Belarusian</option>
                  <option value="bg">Bulgarian</option>
                  <option value="bn">Bengali</option>
                  <option value="bs">Bosnian</option>
                  <option value="ca">Catalan</option>
                  <option value="ceb">Cebuano</option>
                  <option value="cs">Czech</option>
                  <option value="cy">Welsh</option>
                  <option value="da">Danish</option>
                  <option value="de">German</option>
                  <option value="el">Greek</option>
                  <option value="en">English</option>
                  <option value="eo">Esperanto</option>
                  <option value="es">Spanish</option>
                  <option value="et">Estonian</option>
                  <option value="eu">Basque</option>
                  <option value="fa">Persian</option>
                  <option value="fi">Finnish</option>
                  <option value="fr">French</option>
                  <option value="ga">Irish</option>
                  <option value="gl">Galician</option>
                  <option value="gu">Gujarati</option>
                  <option value="ha">Hausa</option>
                  <option value="hi">Hindi</option>
                  <option value="hmn">Hmong</option>
                  <option value="hr">Croatian</option>
                  <option value="ht">Haitian Creole</option>
                  <option value="hu">Hungarian</option>
                  <option value="hy">Armenian</option>
                  <option value="id">Indonesian</option>
                  <option value="ig">Igbo</option>
                  <option value="is">Icelandic</option>
                  <option value="it">Italian</option>
                  <option value="iw">Hebrew</option>
                  <option value="ja">Japanese</option>
                  <option value="jw">Javanese</option>
                  <option value="ka">Georgian</option>
                  <option value="kk">Kazakh</option>
                  <option value="km">Khmer</option>
                  <option value="kn">Kannada</option>
                  <option value="ko">Korean</option>
                  <option value="la">Latin</option>
                  <option value="lo">Lao</option>
                  <option value="lt">Lithuanian</option>
                  <option value="lv">Latvian</option>
                  <option value="mg">Malagasy</option>
                  <option value="mi">Maori</option>
                  <option value="mk">Macedonian</option>
                  <option value="ml">Malayalam</option>
                  <option value="mn">Mongolian</option>
                  <option value="mr">Marathi</option>
                  <option value="ms">Malay</option>
                  <option value="mt">Maltese</option>
                  <option value="my">Myanmar (Burmese)</option>
                  <option value="ne">Nepali</option>
                  <option value="nl">Dutch</option>
                  <option value="no">Norwegian</option>
                  <option value="pa">Punjabi</option>
                  <option value="pl">Polish</option>
                  <option value="pt">Portuguese</option>
                  <option value="ro">Romanian</option>
                  <option value="ru">Russian</option>
                  <option value="si">Sinhala</option>
                  <option value="sk">Slovak</option>
                  <option value="sl">Slovenian</option>
                  <option value="so">Somali</option>
                  <option value="sq">Albanian</option>
                  <option value="sr">Serbian</option>
                  <option value="su">Sundanese</option>
                  <option value="sv">Swedish</option>
                  <option value="sw">Swahili</option>
                  <option value="ta">Tamil</option>
                  <option value="te">Telugu</option>
                  <option value="th">Thai</option>
                  <option value="tr">Turkish</option>
                  <option value="uk">Ukrainian</option>
                  <option value="ur">Urdu</option>
                  <option value="uz">Uzbek</option>
                  <option value="vi">Vietnamese</option>
                  <option value="xh">Xhosa</option>
                  <option value="yi">Yiddish</option>
                  <option value="yo">Yoruba</option>
                  <option value="zh">Chinese</option>
                  <option value="zu">Zulu</option>
                </select>
              </div> */}

              <div className="flex-1 relative w-full max-w-md">
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="w-full text-white font-light focus:outline-none focus:ring-0"
                >
                  {/* Map this later for flag support */}
                  <option value="af">Afrikaans</option>
                  <option value="am">Amharic</option>
                  <option value="ar">Arabic</option>
                  <option value="az">Azerbaijani</option>
                  <option value="be">Belarusian</option>
                  <option value="bg">Bulgarian</option>
                  <option value="bn">Bengali</option>
                  <option value="bs">Bosnian</option>
                  <option value="ca">Catalan</option>
                  <option value="ceb">Cebuano</option>
                  <option value="cs">Czech</option>
                  <option value="cy">Welsh</option>
                  <option value="da">Danish</option>
                  <option value="de">German</option>
                  <option value="el">Greek</option>
                  <option value="en">English</option>
                  <option value="eo">Esperanto</option>
                  <option value="es">Spanish</option>
                  <option value="et">Estonian</option>
                  <option value="eu">Basque</option>
                  <option value="fa">Persian</option>
                  <option value="fi">Finnish</option>
                  <option value="fr">French</option>
                  <option value="ga">Irish</option>
                  <option value="gl">Galician</option>
                  <option value="gu">Gujarati</option>
                  <option value="ha">Hausa</option>
                  <option value="hi">Hindi</option>
                  <option value="hmn">Hmong</option>
                  <option value="hr">Croatian</option>
                  <option value="ht">Haitian Creole</option>
                  <option value="hu">Hungarian</option>
                  <option value="hy">Armenian</option>
                  <option value="id">Indonesian</option>
                  <option value="ig">Igbo</option>
                  <option value="is">Icelandic</option>
                  <option value="it">Italian</option>
                  <option value="iw">Hebrew</option>
                  <option value="ja">Japanese</option>
                  <option value="jw">Javanese</option>
                  <option value="ka">Georgian</option>
                  <option value="kk">Kazakh</option>
                  <option value="km">Khmer</option>
                  <option value="kn">Kannada</option>
                  <option value="ko">Korean</option>
                  <option value="la">Latin</option>
                  <option value="lo">Lao</option>
                  <option value="lt">Lithuanian</option>
                  <option value="lv">Latvian</option>
                  <option value="mg">Malagasy</option>
                  <option value="mi">Maori</option>
                  <option value="mk">Macedonian</option>
                  <option value="ml">Malayalam</option>
                  <option value="mn">Mongolian</option>
                  <option value="mr">Marathi</option>
                  <option value="ms">Malay</option>
                  <option value="mt">Maltese</option>
                  <option value="my">Myanmar (Burmese)</option>
                  <option value="ne">Nepali</option>
                  <option value="nl">Dutch</option>
                  <option value="no">Norwegian</option>
                  <option value="pa">Punjabi</option>
                  <option value="pl">Polish</option>
                  <option value="pt">Portuguese</option>
                  <option value="ro">Romanian</option>
                  <option value="ru">Russian</option>
                  <option value="si">Sinhala</option>
                  <option value="sk">Slovak</option>
                  <option value="sl">Slovenian</option>
                  <option value="so">Somali</option>
                  <option value="sq">Albanian</option>
                  <option value="sr">Serbian</option>
                  <option value="su">Sundanese</option>
                  <option value="sv">Swedish</option>
                  <option value="sw">Swahili</option>
                  <option value="ta">Tamil</option>
                  <option value="te">Telugu</option>
                  <option value="th">Thai</option>
                  <option value="tr">Turkish</option>
                  <option value="uk">Ukrainian</option>
                  <option value="ur">Urdu</option>
                  <option value="uz">Uzbek</option>
                  <option value="vi">Vietnamese</option>
                  <option value="xh">Xhosa</option>
                  <option value="yi">Yiddish</option>
                  <option value="yo">Yoruba</option>
                  <option value="zh">Chinese</option>
                  <option value="zu">Zulu</option>
                  {/* ... rest of your options */}
                </select>
                {/* Optional dropdown icon */}

              </div>
            </div>

            {/* Text Areas */}
            <div className="flex flex-col mt-7 md:flex-row gap-1">
              {/* Input Box */}
              <div className="relative w-full rounded-l-md bg-white/10 backdrop-blur-md border border-white/20 md:w-1/2 p-2">
                {/* Top-right icon actions */}
                {/* Top-right icon actions */}
                <div className="absolute -top-5 right-0 flex gap-3 bg-gradient-to-b from-black/80 to-transparent px-4 py-2 rounded-full hover:scale-104 transition-all ease-in">
                  {/* Speak Icon - Blue */}
                  <button
                    onClick={handleSpeak}
                    className="text-blue-400 hover:text-blue-600 transition-colors"
                    title="Speak"
                  >
                    <MdVolumeUp size={22} />
                  </button>

                  {/* Mic Icon - Green */}
                  <button
                    onClick={handleMicInput}
                    className="text-green-400 hover:text-green-600 transition-colors"
                    title="Mic Input"
                  >
                    <MdKeyboardVoice size={22} />
                  </button>

                  <button
                    onClick={handleCopyInput}
                    className={`text-blue-400 hover:text-blue-600 transition-colors`}
                    title="Copy"
                  >
                    {inputcopied ? (
                      <MdCheck size={22} />
                    ) : (
                      <MdContentCopy size={22} />
                    )}
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
                  ref={textRef}
                  className="w-full h-60 text-white bg-transparent resize-none focus:outline-none focus:ring-0"
                  placeholder="Enter text..."
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                />
                <div className="text-right text-sm text-gray-300 mt-1">
                  {characterCount} / <CountUp />
                </div>
              </div>

              {/* Output Box */}
              <div className="relative w-full mt-7 md:mt-0  md:w-1/2 bg-white/10 backdrop-blur-md border border-white/20 rounded-r-md p-2">
                <div className="flex justify-between items-center">
                  <div className="absolute -top-5 right-0 flex gap-3 bg-gradient-to-b from-black/80 to-transparent px-4 py-2 rounded-full hover:scale-104 transition-all ease-in">
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
                      onClick={handleSpeakOut}
                      className="text-blue-400 hover:text-blue-600 transition-colors"
                      title="Speak"
                    >
                      <MdVolumeUp size={22} />
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

                <p className="text-gray-100 whitespace-pre-wrap h-full overflow-auto">
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
              <button onClick={handleTranslate}>
                <GradientText
                  colors={[
                    "#40ffaa",
                    "#4079ff",
                    "#40ffaa",
                    "#4079ff",
                    "#40ffaa",
                  ]}
                  animationSpeed={3}
                  showBorder={true}
                  className="custom-class px-4 py-2"
                >
                  Translate
                </GradientText>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Transa;
