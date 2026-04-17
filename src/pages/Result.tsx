import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTestStore } from '@/store/testStore';

export default function Result() {
  const navigate = useNavigate();
  const { result, resetTest } = useTestStore();

  if (!result) {
    navigate('/');
    return null;
  }

  const handleRetakeTest = () => {
    resetTest();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col items-center justify-center p-4">
      <div className="max-w-4xl w-full bg-white rounded-2xl shadow-xl p-8 md:p-12">
        {/* 结果标题 */}
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-800">
            KGTI
          </h1>
          <p className="mt-2 text-lg text-gray-600">
            你的科广人格类型
          </p>
        </div>

        {/* 人格类型卡片 */}
        <div 
          className="bg-white rounded-2xl shadow-lg p-8 mb-10 border-t-4" 
          style={{ borderColor: result.color }}
        >
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-3" style={{ color: result.color }}>
              {result.name}
            </h2>
            <p className="text-gray-600 mb-6">
              {result.description}
            </p>

            {/* 人格特质标签 */}
            <div className="flex flex-wrap justify-center gap-2 mb-8">
              {result.traits.map((trait, index) => (
                <span
                  key={index}
                  className="px-4 py-2 rounded-full text-sm font-medium"
                  style={{ 
                    backgroundColor: `${result.color}20`, 
                    color: result.color 
                  }}
                >
                  {trait}
                </span>
              ))}
            </div>

            {/* 分享按钮 */}
            <div className="flex justify-center space-x-4">
              <button className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors">
                分享到微信
              </button>
              <button className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors">
                保存结果
              </button>
            </div>
          </div>
        </div>

        {/* 结果分析 */}
        <div className="bg-blue-50 rounded-lg p-6 mb-10">
          <h3 className="text-xl font-semibold text-blue-800 mb-4">结果分析</h3>
          <p className="text-gray-700 mb-4">
            作为{result.name}，你在香港科技大学（广州）的校园生活中具有独特的优势。
            你的人格特质使你在团队合作、学术研究或校园活动中能够发挥重要作用。
          </p>
          <p className="text-gray-700">
            你可以通过KGTI平台找到与你性格相似的同学，共同参与校园活动，
            建立深厚的友谊，一起创造美好的科广回忆。
          </p>
        </div>

        {/* 行动按钮 */}
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button
            onClick={handleRetakeTest}
            className="px-8 py-3 border border-blue-500 text-blue-700 rounded-lg hover:bg-blue-50 transition-colors"
          >
            重新测试
          </button>
          <button
            onClick={() => navigate('/')}
            className="px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-lg hover:shadow-lg transition-all"
          >
            返回首页
          </button>
        </div>
      </div>
    </div>
  );
}
