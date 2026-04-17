import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTestStore } from '@/store/testStore';

export default function Test() {
  const navigate = useNavigate();
  const { 
    questions, 
    currentQuestionIndex, 
    answers, 
    answerQuestion, 
    nextQuestion, 
    prevQuestion, 
    calculateResult 
  } = useTestStore();

  const currentQuestion = questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === questions.length - 1;
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  const handleOptionSelect = (optionId: number) => {
    answerQuestion(currentQuestion.id, optionId);
  };

  const handleNext = () => {
    if (isLastQuestion) {
      calculateResult();
      navigate('/result');
    } else {
      nextQuestion();
    }
  };

  const handlePrev = () => {
    prevQuestion();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col items-center justify-center p-4">
      <div className="max-w-4xl w-full bg-white rounded-2xl shadow-xl p-8 md:p-12">
        {/* 进度条 */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-gray-500 mb-2">
            <span>问题 {currentQuestionIndex + 1} / {questions.length}</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-blue-500 to-indigo-600 h-2 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        {/* 题目 */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            {currentQuestion.text}
          </h2>
          
          {/* 选项 */}
          <div className="space-y-3">
            {currentQuestion.options.map((option) => {
              const isSelected = answers[currentQuestion.id] === option.id;
              return (
                <button
                  key={option.id}
                  onClick={() => handleOptionSelect(option.id)}
                  className={`w-full text-left p-4 rounded-lg border-2 transition-all ${isSelected 
                    ? 'border-blue-500 bg-blue-50 text-blue-700' 
                    : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'}
                  `}
                >
                  <div className="flex items-center">
                    <div className={`w-5 h-5 rounded-full mr-3 flex items-center justify-center ${isSelected 
                      ? 'bg-blue-500 text-white' 
                      : 'border border-gray-300'}
                    `}>
                      {isSelected && <span className="text-xs">✓</span>}
                    </div>
                    <span>{option.text}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* 导航按钮 */}
        <div className="flex justify-between mt-10">
          <button
            onClick={handlePrev}
            disabled={currentQuestionIndex === 0}
            className="px-6 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            上一题
          </button>
          
          <button
            onClick={handleNext}
            disabled={!answers[currentQuestion.id]}
            className={`px-8 py-2 rounded-lg font-medium transition-all ${answers[currentQuestion.id] 
              ? 'bg-gradient-to-r from-blue-600 to-indigo-700 text-white hover:shadow-lg' 
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'}
            `}
          >
            {isLastQuestion ? '查看结果' : '下一题'}
          </button>
        </div>
      </div>
    </div>
  );
}
