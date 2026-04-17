import { create } from 'zustand';

// 定义人格类型
export type PersonalityType = {
  id: string;
  name: string;
  description: string;
  traits: string[];
  color: string;
};

// 定义测试题目
export type Question = {
  id: number;
  text: string;
  options: {
    id: number;
    text: string;
    scores: {
      [key: string]: number;
    };
  }[];
};

// 定义测试状态
interface TestState {
  questions: Question[];
  currentQuestionIndex: number;
  answers: { [questionId: number]: number };
  isTestCompleted: boolean;
  result: PersonalityType | null;
  
  // 操作方法
  startTest: () => void;
  answerQuestion: (questionId: number, optionId: number) => void;
  nextQuestion: () => void;
  prevQuestion: () => void;
  calculateResult: () => void;
  resetTest: () => void;
}

// 港科广专属人格类型
export const personalityTypes: PersonalityType[] = [
  {
    id: 'A',
    name: '创新探索者',
    description: '你充满好奇心，喜欢探索未知领域，是团队中的创意源泉。',
    traits: ['创新思维', '冒险精神', '开放包容', '独立思考'],
    color: '#FF6B6B'
  },
  {
    id: 'B',
    name: '逻辑分析者',
    description: '你理性冷静，善于分析问题，是解决复杂挑战的专家。',
    traits: ['逻辑思维', '精准判断', '系统思考', '问题解决'],
    color: '#4ECDC4'
  },
  {
    id: 'C',
    name: '团队协作者',
    description: '你善于与人合作，重视团队和谐，是团队凝聚力的核心。',
    traits: ['团队精神', '沟通能力', '同理心', '责任感'],
    color: '#45B7D1'
  },
  {
    id: 'D',
    name: '实践行动者',
    description: '你注重实际效果，行动力强，是将想法转化为现实的能手。',
    traits: ['行动力', '务实精神', '目标导向', '坚韧不拔'],
    color: '#96CEB4'
  },
  {
    id: 'E',
    name: '战略规划者',
    description: '你具有长远眼光，善于规划布局，是团队的指引者。',
    traits: ['战略思维', '前瞻性', '决策能力', '全局观念'],
    color: '#FFEAA7'
  },
  {
    id: 'F',
    name: '人文关怀者',
    description: '你富有同情心，关注他人需求，是团队中的情感支柱。',
    traits: ['同理心', '关怀他人', '善于倾听', '情感智慧'],
    color: '#DDA0DD'
  }
];

// 港科广专属测试题目
export const questions: Question[] = [
  {
    id: 1,
    text: '当面对一个新项目时，你更倾向于：',
    options: [
      { id: 1, text: '探索创新的方法和可能性', scores: { A: 5, B: 2, C: 3, D: 4, E: 3, F: 2 } },
      { id: 2, text: '分析项目的逻辑结构和可行性', scores: { A: 2, B: 5, C: 2, D: 3, E: 4, F: 2 } },
      { id: 3, text: '与团队成员讨论，集思广益', scores: { A: 3, B: 2, C: 5, D: 2, E: 3, F: 4 } },
      { id: 4, text: '立即行动，边做边调整', scores: { A: 3, B: 2, C: 2, D: 5, E: 3, F: 2 } }
    ]
  },
  {
    id: 2,
    text: '在团队合作中，你通常扮演的角色是：',
    options: [
      { id: 1, text: '提出创意和新想法的人', scores: { A: 5, B: 2, C: 3, D: 3, E: 4, F: 2 } },
      { id: 2, text: '分析问题并提供解决方案的人', scores: { A: 2, B: 5, C: 2, D: 3, E: 4, F: 2 } },
      { id: 3, text: '协调团队关系，确保和谐的人', scores: { A: 2, B: 2, C: 5, D: 2, E: 3, F: 4 } },
      { id: 4, text: '执行任务，确保项目进展的人', scores: { A: 2, B: 3, C: 3, D: 5, E: 2, F: 2 } }
    ]
  },
  {
    id: 3,
    text: '当遇到困难时，你会：',
    options: [
      { id: 1, text: '尝试不同的方法，寻找创新解决方案', scores: { A: 5, B: 3, C: 3, D: 4, E: 3, F: 2 } },
      { id: 2, text: '冷静分析问题，找出根本原因', scores: { A: 2, B: 5, C: 2, D: 3, E: 4, F: 2 } },
      { id: 3, text: '寻求团队支持和建议', scores: { A: 2, B: 2, C: 5, D: 2, E: 3, F: 4 } },
      { id: 4, text: '制定计划并逐步解决', scores: { A: 3, B: 3, C: 2, D: 5, E: 4, F: 2 } }
    ]
  },
  {
    id: 4,
    text: '你如何看待规则和流程？',
    options: [
      { id: 1, text: '规则是可以被创新打破的', scores: { A: 5, B: 2, C: 3, D: 4, E: 3, F: 2 } },
      { id: 2, text: '规则是基于逻辑和经验的，应该遵守', scores: { A: 2, B: 5, C: 2, D: 3, E: 4, F: 2 } },
      { id: 3, text: '规则应该考虑到所有人的需求', scores: { A: 3, B: 2, C: 5, D: 2, E: 3, F: 4 } },
      { id: 4, text: '规则是为了提高效率，应该灵活应用', scores: { A: 3, B: 3, C: 3, D: 5, E: 3, F: 2 } }
    ]
  },
  {
    id: 5,
    text: '在学习新事物时，你偏好：',
    options: [
      { id: 1, text: '通过探索和实验学习', scores: { A: 5, B: 3, C: 3, D: 4, E: 3, F: 2 } },
      { id: 2, text: '通过分析理论和原理学习', scores: { A: 2, B: 5, C: 2, D: 3, E: 4, F: 2 } },
      { id: 3, text: '通过与他人交流和合作学习', scores: { A: 3, B: 2, C: 5, D: 2, E: 3, F: 4 } },
      { id: 4, text: '通过实践和应用学习', scores: { A: 3, B: 3, C: 2, D: 5, E: 3, F: 2 } }
    ]
  },
  {
    id: 6,
    text: '你认为成功的关键是什么？',
    options: [
      { id: 1, text: '创新和突破', scores: { A: 5, B: 2, C: 3, D: 4, E: 3, F: 2 } },
      { id: 2, text: '逻辑和理性', scores: { A: 2, B: 5, C: 2, D: 3, E: 4, F: 2 } },
      { id: 3, text: '团队合作和人际关系', scores: { A: 3, B: 2, C: 5, D: 2, E: 3, F: 4 } },
      { id: 4, text: '行动和坚持', scores: { A: 3, B: 3, C: 2, D: 5, E: 3, F: 2 } }
    ]
  },
  {
    id: 7,
    text: '当需要做决策时，你更依赖：',
    options: [
      { id: 1, text: '直觉和灵感', scores: { A: 5, B: 2, C: 3, D: 3, E: 3, F: 4 } },
      { id: 2, text: '数据和分析', scores: { A: 2, B: 5, C: 2, D: 3, E: 4, F: 2 } },
      { id: 3, text: '他人的意见和感受', scores: { A: 3, B: 2, C: 5, D: 2, E: 3, F: 4 } },
      { id: 4, text: '实际效果和可行性', scores: { A: 3, B: 3, C: 2, D: 5, E: 4, F: 2 } }
    ]
  },
  {
    id: 8,
    text: '你如何看待失败？',
    options: [
      { id: 1, text: '失败是创新的机会', scores: { A: 5, B: 3, C: 3, D: 4, E: 3, F: 2 } },
      { id: 2, text: '失败是需要分析和改进的问题', scores: { A: 2, B: 5, C: 2, D: 3, E: 4, F: 2 } },
      { id: 3, text: '失败是团队需要共同面对的挑战', scores: { A: 3, B: 2, C: 5, D: 2, E: 3, F: 4 } },
      { id: 4, text: '失败是成功的必经之路', scores: { A: 3, B: 3, C: 2, D: 5, E: 3, F: 2 } }
    ]
  },
  {
    id: 9,
    text: '在团队中，你最看重：',
    options: [
      { id: 1, text: '创造力和创新', scores: { A: 5, B: 2, C: 3, D: 3, E: 4, F: 2 } },
      { id: 2, text: '效率和准确性', scores: { A: 2, B: 5, C: 2, D: 3, E: 4, F: 2 } },
      { id: 3, text: '和谐和凝聚力', scores: { A: 3, B: 2, C: 5, D: 2, E: 3, F: 4 } },
      { id: 4, text: '结果和成就', scores: { A: 3, B: 3, C: 2, D: 5, E: 4, F: 2 } }
    ]
  },
  {
    id: 10,
    text: '你理想的工作环境是：',
    options: [
      { id: 1, text: '充满创意和自由的环境', scores: { A: 5, B: 2, C: 3, D: 3, E: 3, F: 2 } },
      { id: 2, text: '结构清晰、逻辑严谨的环境', scores: { A: 2, B: 5, C: 2, D: 3, E: 4, F: 2 } },
      { id: 3, text: '团队合作、氛围友好的环境', scores: { A: 3, B: 2, C: 5, D: 2, E: 3, F: 4 } },
      { id: 4, text: '目标明确、行动导向的环境', scores: { A: 3, B: 3, C: 2, D: 5, E: 4, F: 2 } }
    ]
  }
];

export const useTestStore = create<TestState>((set, get) => ({
  questions,
  currentQuestionIndex: 0,
  answers: {},
  isTestCompleted: false,
  result: null,
  
  startTest: () => set({ currentQuestionIndex: 0, answers: {}, isTestCompleted: false, result: null }),
  
  answerQuestion: (questionId, optionId) => set((state) => ({
    answers: { ...state.answers, [questionId]: optionId }
  })),
  
  nextQuestion: () => set((state) => {
    const nextIndex = state.currentQuestionIndex + 1;
    if (nextIndex < state.questions.length) {
      return { currentQuestionIndex: nextIndex };
    }
    return state;
  }),
  
  prevQuestion: () => set((state) => {
    const prevIndex = state.currentQuestionIndex - 1;
    if (prevIndex >= 0) {
      return { currentQuestionIndex: prevIndex };
    }
    return state;
  }),
  
  calculateResult: () => {
    const { answers, questions } = get();
    
    // 计算各人格类型的得分
    const scores: { [key: string]: number } = {};
    Object.entries(answers).forEach(([questionId, optionId]) => {
      const question = questions.find(q => q.id === parseInt(questionId));
      if (question) {
        const selectedOption = question.options.find(opt => opt.id === optionId);
        if (selectedOption) {
          Object.entries(selectedOption.scores).forEach(([type, score]) => {
            scores[type] = (scores[type] || 0) + score;
          });
        }
      }
    });
    
    // 找出得分最高的人格类型
    let maxScore = 0;
    let dominantType: string | null = null;
    Object.entries(scores).forEach(([type, score]) => {
      if (score > maxScore) {
        maxScore = score;
        dominantType = type;
      }
    });
    
    // 找到对应的人格类型
    const result = dominantType ? personalityTypes.find(type => type.id === dominantType) : null;
    
    set({ result, isTestCompleted: true });
  },
  
  resetTest: () => set({ currentQuestionIndex: 0, answers: {}, isTestCompleted: false, result: null })
}));
