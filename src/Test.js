// src/Test.js
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const wordBank = [
  // 您可以在这里添加更多的单词
  'apple', 'banana', 'orange', 'grape', 'pineapple', 'strawberry', 'watermelon',
  'lemon', 'peach', 'cherry', 'pear', 'mango', 'blueberry', 'kiwi', 'plum',
  // ...
];

function Test() {
  const location = useLocation();
  const navigate = useNavigate();
  const wordCount = location.state?.wordCount || 50;

  const [wordsToTest, setWordsToTest] = useState([]);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [remainingTime, setRemainingTime] = useState(5);
  const [showResult, setShowResult] = useState(false);
  const [results, setResults] = useState([]);
  const [timerId, setTimerId] = useState(null);

  // 初始化要测试的单词列表
  useEffect(() => {
    const shuffledWords = wordBank.sort(() => 0.5 - Math.random());
    setWordsToTest(shuffledWords.slice(0, wordCount));
  }, [wordCount]);

  // 当 currentWordIndex 改变时，开始新一轮测试
  useEffect(() => {
    if (wordsToTest.length === 0) return;
    playWord(wordsToTest[currentWordIndex]);
    setRemainingTime(5);
    setUserInput('');
    setShowResult(false);

    const intervalId = setInterval(() => {
      setRemainingTime((prev) => prev - 1);
    }, 1000);
    setTimerId(intervalId);

    return () => clearInterval(intervalId);
  }, [currentWordIndex, wordsToTest]);

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

  return (
    <div>
      <h2>
        正在测试第 {currentWordIndex + 1}/{wordsToTest.length} 个单词
      </h2>
      <div style={{ fontSize: '24px', color: 'red' }}>
        剩余时间：{remainingTime} 秒
      </div>
      {!showResult ? (
        <div>
          <input
            type="text"
            value={userInput}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
          />
          <button onClick={handleSubmit}>提交</button>
        </div>
      ) : (
        <div>
          {results[currentWordIndex]?.isCorrect ? (
            <div style={{ color: 'green', fontSize: '24px' }}>回答正确！</div>
          ) : (
            <div style={{ color: 'red', fontSize: '24px' }}>
              回答错误！<br />
              正确单词：{results[currentWordIndex]?.word}
              <br />
              您的答案：{results[currentWordIndex]?.userAnswer || '（空）'}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Test;