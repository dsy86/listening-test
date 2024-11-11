// src/Test.js
import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const wordBank = [
  // 您可以在这里添加更多的单词
    "water",
    "card",
    "centre",
    "group",
    "insurance",
    "research",
    "essay",
    "vocabulary",
    "transport",
    "wood",
    "park",
    "exhibition",
    "museum",
    "Spanish",
    "garden",
    "data",
    "garage",
    "sports",
    "range",
    "hotel",
    "club",
    "ancient",
    "office",
    "government",
    "access",
    "manager",
    "flexible",
    "north",
    "interview",
    "business",
    "service",
    "staff",
    "area",
    "public",
    "cave",
    "restaurant",
    "course",
    "computer",
    "pool",
    "application",
    "gallery",
    "entertainment",
    "material",
    "animals",
    "species",
    "equipment",
    "presentation",
    "feedback",
    "department",
    "website",
    "academic",
    "children",
    "October",
    "original",
    "health",
    "facilities",
    "temperature",
    "by cash",
    "factory",
    "training",
    "drama",
    "forest",
    "music",
    "local",
    "parking",
    "station",
    "initial",
    "social",
    "special",
    "history",
    "central",
    "Japanese",
    "plants",
    "cinema",
    "media",
    "relationship",
    "safety",
    "analysis",
    "kitchen",
    "internet",
    "regular",
    "natural",
    "cost",
    "golf",
    "income",
    "reception",
    "weekend",
    "credit",
    "various",
    "sailing",
    "supermarket",
    "submit",
    "concern",
    "teenagers",
    "campus",
    "speed",
    "Sydney",
    "tennis",
    "science",
    "radio",
    "outline",
    "location",
    "tour",
    "information",
    "financial",
    "agency",
    "commercial",
    "castle",
    "assessment",
    "secretary",
    "insects",
    "textbook",
    "lack",
    "workshop",
    "confidence",
    "enquiry",
    "variety",
    "support",
    "profit",
    "security",
    "library",
    "soil",
    "construction",
    "form",
    "visual",
    "post",
    "laundry",
    "system",
    "tutor",
    "comedy",
    "railway",
    "bank",
    "opera",
    "annual",
    "farm",
    "diving",
    "trade",
    "discount",
    "language",
    "certificate",
    "accommodation",
    "wide",
    "plastic",
    "conference",
    "weight",
    "notice",
    "evidence",
    "economics",
    "shoes",
    "painting",
    "education",
    "relevant",
    "building",
    "recorder",
    "phone",
    "square",
    "tent",
    "structure",
    "concert",
    "Africa",
    "desert",
    "horse",
    "standard",
    "statement",
    "theatre",
    "advertisement",
    "coffee",
    "Saturday",
    "mathematics",
    "jacket",
    "politics",
    "cream",
    "clothes",
    "statistics",
    "development",
    "property",
    "emergency",
    "April",
    "confident",
    "shopping",
    "register",
    "processing",
    "fund",
    "seminar",
    "power",
    "volume",
    "aids",
    "sheet",
    "category",
    "defense",
    "symbol",
    "discussion",
    "barbecue",
    "loan",
    "extra",
    "decision",
    "union",
    "notes",
    "expansion",
    "coach",
    "bathroom",
    "tourism",
    "newspaper",
    "blood",
    "code",
    "secondary",
    "object",
    "invasion",
    "trousers",
    "behavior",
    "activities",
    "marketing",
    "cities",
    "beach",
    "wheelchair",
    "audience",
    "launch",
    "purpose",
    "magazines",
    "design",
    "stomach",
    "cable",
    "town",
    "decoration",
    "arrange",
    "fishing",
    "refreshments",
    "consumption",
    "brain",
    "competitaion",
    "energy",
    "apartment",
    "grey",
    "silver",
    "international",
    "recruit",
    "definition",
    "personal",
    "Novemver",
    "arragement",
    "surface",
    "festival",
    "donation",
    "measurement",
    "limitation",
    "socks",
    "package",
    "leisure",
    "criteria",
    "tools",
    "south",
    "sufficient",
    "passpot",
    "motivation",
    "cafeteria",
    "oxygen",
    "experiment",
    "studio",
    "dissertation",
    "term",
    "helicopter",
    "dining",
    "Australian",
    "lectures",
    "barrier",
    "feeding",
    "quiet",
    "report",
    "brick",
    "selection",
    "project",
    "handle",
    "observe",
    "oil",
    "tutorial",
    "rock",
    "questionnaire",
    "previous",
    "swimming",
    "steam",
    "booklet",
    "cycling",
    "photograph",
    "cheese",
    "mental",
    "migration",
    "cheque",
    "concertration",
    "necessary",
    "email",
    "historical",
    "capacity",
    "globa",
    "diet",
    "route",
    "parents",
    "injury"
  ];

  function Test() {
    const location = useLocation();
    const navigate = useNavigate();
    const wordCount = location.state?.wordCount || 10;
  
    const [wordsToTest, setWordsToTest] = useState([]);
    const [currentWordIndex, setCurrentWordIndex] = useState(0);
    const [userInput, setUserInput] = useState('');
    const [remainingTime, setRemainingTime] = useState(5);
    const [showResult, setShowResult] = useState(false);
    const [results, setResults] = useState([]);
    const [timerId, setTimerId] = useState(null);
  
    const inputRef = useRef(null); // 创建一个引用，用于指向输入框
  
    // 初始化要测试的单词列表
    useEffect(() => {
      const shuffledWords = [...wordBank].sort(() => 0.5 - Math.random());
      setWordsToTest(shuffledWords.slice(0, wordCount));
    }, [wordCount]);
  
    // 当 currentWordIndex 改变时，开始新一轮测试
    useEffect(() => {
      if (wordsToTest.length === 0) return;
      const currentWord = wordsToTest[currentWordIndex];
      playWord(currentWord);

      // 根据单词长度设置剩余时间，最少 5 秒
      const timeForWord = Math.max(currentWord.length, 5);
      setRemainingTime(timeForWord);
      setUserInput('');
      setShowResult(false);
  
      const intervalId = setInterval(() => {
        setRemainingTime((prev) => prev - 1);
      }, 1000);
      setTimerId(intervalId);
  
      return () => clearInterval(intervalId);
    }, [currentWordIndex, wordsToTest]);
  
    // 当 showResult 变为 false 时，输入框重新出现，聚焦输入框
    useEffect(() => {
      if (!showResult && inputRef.current) {
        inputRef.current.focus();
      }
    }, [showResult]);
  
    // 当时间耗尽时，自动提交
    useEffect(() => {
      if (remainingTime <= 0) {
        handleSubmit();
      }
    }, [remainingTime]);
  
    const playWord = (word) => {
      const utterance = new SpeechSynthesisUtterance(word);
      utterance.lang = 'en-GB'; // 英式口音
      window.speechSynthesis.speak(utterance);
    };
  
    const handleSubmit = () => {
      clearInterval(timerId);
      const correctWord = wordsToTest[currentWordIndex];
      const isCorrect = userInput.trim().toLowerCase() === correctWord.toLowerCase();
      const newResults = [
        ...results,
        {
          word: correctWord,
          userAnswer: userInput.trim(),
          isCorrect,
        },
      ];
      setResults(newResults);
      setShowResult(true);
  
      setTimeout(() => {
        if (currentWordIndex + 1 < wordsToTest.length) {
          setCurrentWordIndex(currentWordIndex + 1);
        } else {
          // 测试结束，跳转到结果页面
          navigate('/results', { state: { results: newResults } });
        }
      }, 1000);
    };
  
    const handleInputChange = (e) => {
      setUserInput(e.target.value);
    };
  
    const handleKeyPress = (e) => {
      if (e.key === 'Enter') {
        handleSubmit();
      }
    };

    // 添加 "放弃测试" 按钮的点击处理函数
    const handleGiveUp = () => {
      clearInterval(timerId); // 清除计时器
      navigate('/'); // 返回首页
    };  

    return (
      <div className="min-h-screen bg-gray-100 flex flex-col">
        <header className="bg-blue-600 py-6">
          <h1 className="text-3xl text-white text-center font-bold">
          350个剑雅听力基础答案词听写抽查
          </h1>
        </header>
        <main className="flex-grow container mx-auto px-4 py-8">
          <div className="bg-white rounded shadow p-6 max-w-lg mx-auto">
            <h2 className="text-xl font-semibold text-center mb-4">
              正在测试第 {currentWordIndex + 1}/{wordsToTest.length} 个单词
            </h2>
            <div className="text-center text-red-600 text-lg mb-6">
              剩余时间：{remainingTime} 秒
            </div>
            {!showResult ? (
              <div className="text-center">
                <input
                  type="text"
                  value={userInput}
                  onChange={handleInputChange}
                  onKeyPress={handleKeyPress}
                  ref={inputRef}
                  className="w-full px-3 py-2 border border-gray-300 rounded mb-4"
                  placeholder="请输入您听到的单词"
                />
                <button
                  onClick={handleSubmit}
                  className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
                >
                  提交
                </button>
              </div>
            ) : (
              <div className="text-center">
                {results[currentWordIndex]?.isCorrect ? (
                  <div className="text-green-600 text-2xl font-bold">✅ 回答正确！</div>
                ) : (
                  <div className="text-red-600 text-2xl font-bold">
                    ❌ 回答错误！
                    <div className="text-lg text-black mt-2">
                      正确单词：{results[currentWordIndex]?.word}
                      <br />
                      您的答案：{results[currentWordIndex]?.userAnswer || '（空）'}
                    </div>
                  </div>
                )}
              </div>
            )}
            <div className="text-center mt-6">
              <button
                onClick={handleGiveUp}
                className="text-gray-600 hover:underline"
              >
                放弃测试
              </button>
            </div>
          </div>
        </main>
        <footer className="bg-gray-200 py-4">
          <p className="text-center text-gray-600">有问题可以加微信 dshy86</p>
        </footer>
      </div>
    );
  }
  
  export default Test;