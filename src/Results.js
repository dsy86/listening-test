// src/Results.js
import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function Results() {
  const location = useLocation();
  const navigate = useNavigate();
  const results = location.state?.results || [];

  const correctCount = results.filter((r) => r.isCorrect).length;
  const incorrectCount = results.length - correctCount;
  const accuracy = ((correctCount / results.length) * 100).toFixed(2);

  const goHome = () => {
    navigate('/');
  };

  // 添加键盘事件监听
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'Enter') {
        goHome();
      }
    };

    window.addEventListener('keypress', handleKeyPress);

    // 清除事件监听
    return () => {
      window.removeEventListener('keypress', handleKeyPress);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <header className="bg-blue-600 py-6">
        <h1 className="text-3xl text-white text-center font-bold">
        350个剑雅听力基础答案词听写抽查
        </h1>
      </header>
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="bg-white rounded shadow p-6 max-w-4xl mx-auto">
          <div className="text-center mb-6">
            <p className="text-xl">
              正确数量：<span className="font-bold">{correctCount}</span>
            </p>
            <p className="text-xl">
              错误数量：<span className="font-bold">{incorrectCount}</span>
            </p>
            <p className="text-xl">
              正确率：<span className="font-bold">{accuracy}%</span>
            </p>
          </div>
          <div className="overflow-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr>
                  <th className="border-b p-2">原单词</th>
                  <th className="border-b p-2">您的答案</th>
                  <th className="border-b p-2 text-center">是否正确</th>
                </tr>
              </thead>
              <tbody>
                {results.map((result, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="border-b p-2">{result.word}</td>
                    <td
                      className={`border-b p-2 ${
                        result.isCorrect ? 'text-black' : 'text-red-600'
                      }`}
                    >
                      {result.userAnswer || '(空)'}
                    </td>
                    <td className="border-b p-2 text-center">
                      {result.isCorrect ? '✅' : '❌'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="text-center mt-6">
            <button
              onClick={goHome}
              className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
            >
              回到首页
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

export default Results;