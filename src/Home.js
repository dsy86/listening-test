// src/Home.js
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
  const [wordCount, setWordCount] = useState(10);
  const navigate = useNavigate();
  const inputRef = useRef(null); // 创建引用

  // 当组件挂载时，从 localStorage 中获取保存的 wordCount
  useEffect(() => {
    const savedWordCount = localStorage.getItem('wordCount');
    if (savedWordCount) {
      setWordCount(parseInt(savedWordCount, 10));
    }
  }, []);

  // 添加键盘事件监听
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'Enter') {
        startTest();
      }
    };

    // 在输入框和整个页面添加事件监听
    if (inputRef.current) {
      inputRef.current.addEventListener('keypress', handleKeyPress);
    }
    window.addEventListener('keypress', handleKeyPress);

    // 清除事件监听
    return () => {
      if (inputRef.current) {
        inputRef.current.removeEventListener('keypress', handleKeyPress);
      }
      window.removeEventListener('keypress', handleKeyPress);
    };
  }, [wordCount]);

  const handleWordCountChange = (e) => {
    const newValue = e.target.value;
    setWordCount(newValue);

    // 将新的 wordCount 保存到 localStorage 中
    localStorage.setItem('wordCount', newValue);
  };

  const startTest = () => {
    if (wordCount < 1) {
      alert('测试单词数量必须大于等于1');
      return;
    }
    navigate('/test', { state: { wordCount: parseInt(wordCount, 10) } });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <header className="bg-blue-600 py-6">
        <h1 className="text-3xl text-white text-center font-bold">
        350个剑雅听力基础答案词听写抽查
        </h1>
      </header>
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="bg-white rounded shadow p-6 max-w-2xl mx-auto">
          <p className="text-m text-gray-600 text-center mb-4">
            ✅背下这些词，雅思听力7分就有了！✅
          </p>
          <p className="text-m text-gray-600 text-center mb-6">
            由于雅思听力填空题的存在，雅思听力的单词务必能够写出来，因此有了这个测试。
            这个测试包括了剑雅真题出现频率最高的350个单词。
            不断练习后，可以帮你快速记忆出现频率最高的答案词。
          </p>
          <p className="text-m text-gray-600 text-center mb-6">
          本听写抽查单词列表，来自于
            <a
              href="http://xhslink.com/a/t3DRfkDNNIwZ"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline"
            >
              「前考官Simon雅思培训」发布的一篇小红书笔记 😆
            </a>
          </p>
          <div className="flex items-center justify-center mb-6">
            <label className="text-lg mr-4">测试单词数量：</label>
            <input
              type="number"
              min="1"
              value={wordCount}
              onChange={handleWordCountChange}
              ref={inputRef} // 添加 ref 引用
              className="w-24 px-2 py-1 border border-gray-300 rounded"
            />
          </div>
          <div className="text-center">
            <button
              onClick={startTest}
              className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
            >
              开始测试
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

export default Home;