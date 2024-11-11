// src/Home.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
  const [wordCount, setWordCount] = useState(50);
  const navigate = useNavigate();

  const startTest = () => {
    navigate('/test', { state: { wordCount: parseInt(wordCount, 10) } });
  };

  return (
    <div>
      <h1>听力测试首页</h1>
      <div>
        <label>测试单词数量：</label>
        <input
          type="number"
          value={wordCount}
          onChange={(e) => setWordCount(e.target.value)}
          min="1"
        />
      </div>
      <button onClick={startTest}>开始测试</button>
    </div>
  );
}

export default Home;