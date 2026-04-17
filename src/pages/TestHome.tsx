import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTestStore } from '@/store/testStore';

export default function TestHome() {
  const navigate = useNavigate();
  const { startTest } = useTestStore();

  const handleStartTest = () => {
    startTest();
    navigate('/test');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col items-center justify-center p-4">
      <div className="max-w-4xl w-full bg-white rounded-2xl shadow-xl p-8 md:p-12">
        {/* 港科广 logo */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-800">
            KGTI
          </h1>
          <p className="mt-2 text-lg text-gray-600">
            香港科技大学（广州）专属人格测试
          </p>
        </div>

        {/* 测试介绍 */}
        <div className="space-y-6 mb-10">
          <div className="bg-blue-50 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-blue-800 mb-3">关于 KGTI</h2>
            <p className="text-gray-700">
              KGTI 是香港科技大学（广州）专属的趣味人格测试，通过回答一系列问题，
              你将了解自己在科广校园中的独特人格类型，找到与你志同道合的同学，
              打造专属于你的科广身份名片。
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-white border border-blue-100 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
              <h3 className="font-medium text-blue-700 mb-2">发现自我</h3>
              <p className="text-sm text-gray-600">了解你的独特人格特质和优势</p>
            </div>
            <div className="bg-white border border-blue-100 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
              <h3 className="font-medium text-blue-700 mb-2">找到同好</h3>
              <p className="text-sm text-gray-600">结识与你性格匹配的科广同学</p>
            </div>
            <div className="bg-white border border-blue-100 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
              <h3 className="font-medium text-blue-700 mb-2">校园名片</h3>
              <p className="text-sm text-gray-600">生成专属于你的科广身份标识</p>
            </div>
          </div>
        </div>

        {/* 开始测试按钮 */}
        <div className="text-center">
          <button
            onClick={handleStartTest}
            className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white font-medium py-3 px-8 rounded-full hover:shadow-lg transition-all transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            开始测试
          </button>
          <p className="mt-4 text-sm text-gray-500">
            测试包含 10 道题目，预计需要 5 分钟完成
          </p>
        </div>
      </div>
    </div>
  );
}
