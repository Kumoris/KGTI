export type Dimension = "FI" | "SC" | "RE" | "DN";

export type Level = 1 | 2 | 3;

export interface QuestionOption {
  text: string;
  value: "A" | "B";
}

export interface Question {
  id: string;
  dimension: Dimension;
  dimensionLabel: string;
  level: Level;
  text: string;
  options: [QuestionOption, QuestionOption];
}

export const dimensionMeta: Record<
  Dimension,
  { label: string; sideA: string; sideB: string; colorA: string; colorB: string }
> = {
  FI: {
    label: "思维模式",
    sideA: "F 实干家",
    sideB: "I 思考者",
    colorA: "#00d4ff",
    colorB: "#a855f7",
  },
  SC: {
    label: "行动风格",
    sideA: "S 架构师",
    sideB: "C 连接者",
    colorA: "#ffd700",
    colorB: "#ff2d95",
  },
  RE: {
    label: "驱动内核",
    sideA: "R 探索者",
    sideB: "E 创造者",
    colorA: "#00d4ff",
    colorB: "#ffd700",
  },
  DN: {
    label: "生活节律",
    sideA: "D 昼型",
    sideB: "N 夜型",
    colorA: "#ffd700",
    colorB: "#a855f7",
  },
};

const allQuestions: Question[] = [
  // === FI: 思维模式 (实干家 vs 思考者) ===
  // Level 1 — 宽泛
  {
    id: "FI-L1-01",
    dimension: "FI",
    dimensionLabel: "思维模式",
    level: 1,
    text: "你走进港科广新建的实验室，第一反应是？",
    options: [
      { text: "找台仪器开始动手做实验", value: "A" },
      { text: "先看看实验室的数据分析平台", value: "B" },
    ],
  },
  {
    id: "FI-L1-02",
    dimension: "FI",
    dimensionLabel: "思维模式",
    level: 1,
    text: "你更喜欢哪种成就感？",
    options: [
      { text: "手里拿着自己做出来的实物", value: "A" },
      { text: "脑中浮现一个精妙的算法或理论", value: "B" },
    ],
  },
  {
    id: "FI-L1-03",
    dimension: "FI",
    dimensionLabel: "思维模式",
    level: 1,
    text: "选课时，你更倾向哪种课？",
    options: [
      { text: "实验课——动手操作，看得见结果", value: "A" },
      { text: "理论课——逻辑推演，理解深层原理", value: "B" },
    ],
  },
  // Level 2 — 具体
  {
    id: "FI-L2-01",
    dimension: "FI",
    dimensionLabel: "思维模式",
    level: 2,
    text: "在一个跨学科项目里，你更倾向什么角色？",
    options: [
      { text: "动手做原型的实现者", value: "A" },
      { text: "构建概念框架的规划者", value: "B" },
    ],
  },
  {
    id: "FI-L2-02",
    dimension: "FI",
    dimensionLabel: "思维模式",
    level: 2,
    text: "你的浏览器标签页通常是什么画风？",
    options: [
      { text: "GitHub + 各种工具/仿真平台", value: "A" },
      { text: "arXiv + Stack Overflow + 文档", value: "B" },
    ],
  },
  {
    id: "FI-L2-03",
    dimension: "FI",
    dimensionLabel: "思维模式",
    level: 2,
    text: "看到一项新技术，你第一反应？",
    options: [
      { text: "想自己搭一套试试", value: "A" },
      { text: "想先搞懂它背后的原理", value: "B" },
    ],
  },
  // Level 3 — 深入
  {
    id: "FI-L3-01",
    dimension: "FI",
    dimensionLabel: "思维模式",
    level: 3,
    text: "验证一个想法，你认为更可靠的方式是？",
    options: [
      { text: "做出来跑一遍，结果不会骗人", value: "A" },
      { text: "先证明理论上可行，再谈实现", value: "B" },
    ],
  },
  {
    id: "FI-L3-02",
    dimension: "FI",
    dimensionLabel: "思维模式",
    level: 3,
    text: "你的理想桌面是？",
    options: [
      { text: "焊台 + 示波器 + 工具箱，随时开工", value: "A" },
      { text: "多屏 + 白板 + Markdown，纯粹思考空间", value: "B" },
    ],
  },

  // === SC: 行动风格 (架构师 vs 连接者) ===
  // Level 1
  {
    id: "SC-L1-01",
    dimension: "SC",
    dimensionLabel: "行动风格",
    level: 1,
    text: "小组作业开始了，你通常会？",
    options: [
      { text: "先画架构图、分配任务、建系统", value: "A" },
      { text: "先拉群讨论、头脑风暴、找共识", value: "B" },
    ],
  },
  {
    id: "SC-L1-02",
    dimension: "SC",
    dimensionLabel: "行动风格",
    level: 1,
    text: "你更喜欢哪种校园活动？",
    options: [
      { text: "Hackathon/设计冲刺——有规则有目标的挑战", value: "A" },
      { text: "沙龙/文化夜——自由交流碰撞灵感", value: "B" },
    ],
  },
  {
    id: "SC-L1-03",
    dimension: "SC",
    dimensionLabel: "行动风格",
    level: 1,
    text: "你的社交圈通常是？",
    options: [
      { text: "精密小圈子，各司其职高效协作", value: "A" },
      { text: "广泛人脉网，跨界连接有趣灵魂", value: "B" },
    ],
  },
  // Level 2
  {
    id: "SC-L2-01",
    dimension: "SC",
    dimensionLabel: "行动风格",
    level: 2,
    text: "在一场头脑风暴中，你更常扮演？",
    options: [
      { text: "控场者——把发散的idea整理成可执行计划", value: "A" },
      { text: "发散者——疯狂输出各种天马行空的想法", value: "B" },
    ],
  },
  {
    id: "SC-L2-02",
    dimension: "SC",
    dimensionLabel: "行动风格",
    level: 2,
    text: "你理想中的团队规模？",
    options: [
      { text: "2-3人精英小组，高效执行", value: "A" },
      { text: "5-8人多元团队，碰撞火花", value: "B" },
    ],
  },
  {
    id: "SC-L2-03",
    dimension: "SC",
    dimensionLabel: "行动风格",
    level: 2,
    text: "团队遇到分歧，你的处理方式？",
    options: [
      { text: "用数据和逻辑分析做决策", value: "A" },
      { text: "找共识，让每个人都被听见", value: "B" },
    ],
  },
  // Level 3
  {
    id: "SC-L3-01",
    dimension: "SC",
    dimensionLabel: "行动风格",
    level: 3,
    text: "一次社交活动之后，你通常？",
    options: [
      { text: "整理名片，标记关键人，跟进计划", value: "A" },
      { text: "回味有趣的对话，脑中还在碰撞", value: "B" },
    ],
  },
  {
    id: "SC-L3-02",
    dimension: "SC",
    dimensionLabel: "行动风格",
    level: 3,
    text: "你的微信通讯录里，哪种人占比最高？",
    options: [
      { text: "项目合作过的精准联系人", value: "A" },
      { text: "各种场合认识的有趣灵魂", value: "B" },
    ],
  },

  // === RE: 驱动内核 (探索者 vs 创造者) ===
  // Level 1
  {
    id: "RE-L1-01",
    dimension: "RE",
    dimensionLabel: "驱动内核",
    level: 1,
    text: "读到一篇顶会论文，你更想？",
    options: [
      { text: "深挖它的推导过程，理解 why", value: "A" },
      { text: "思考怎么把它的 idea 做成产品", value: "B" },
    ],
  },
  {
    id: "RE-L1-02",
    dimension: "RE",
    dimensionLabel: "驱动内核",
    level: 1,
    text: "你对\u201c红鸟挑战营\u201d的期待是？",
    options: [
      { text: "探索未知领域，发现新知识", value: "A" },
      { text: "组队造出原型，拿到投资", value: "B" },
    ],
  },
  {
    id: "RE-L1-03",
    dimension: "RE",
    dimensionLabel: "驱动内核",
    level: 1,
    text: "十年后你更可能的身份？",
    options: [
      { text: "某领域的顶级学者/专家", value: "A" },
      { text: "科技公司的创始人/CTO", value: "B" },
    ],
  },
  // Level 2
  {
    id: "RE-L2-01",
    dimension: "RE",
    dimensionLabel: "驱动内核",
    level: 2,
    text: "发现一个研究空白，你的第一反应？",
    options: [
      { text: "太好了，赶紧设计实验去探究", value: "A" },
      { text: "有意思，能不能围绕它做一款产品", value: "B" },
    ],
  },
  {
    id: "RE-L2-02",
    dimension: "RE",
    dimensionLabel: "驱动内核",
    level: 2,
    text: "一位教授给你两个项目选择：",
    options: [
      { text: "探索性课题——没有前人做过，高风险高回报", value: "A" },
      { text: "应用型项目——已有市场验证，需要快速落地", value: "B" },
    ],
  },
  {
    id: "RE-L2-03",
    dimension: "RE",
    dimensionLabel: "驱动内核",
    level: 2,
    text: "你心中\u201c影响力\u201d的定义更接近？",
    options: [
      { text: "被广泛引用的理论突破", value: "A" },
      { text: "改变千万人生活的产品", value: "B" },
    ],
  },
  // Level 3
  {
    id: "RE-L3-01",
    dimension: "RE",
    dimensionLabel: "驱动内核",
    level: 3,
    text: "你的引用列表更多来自？",
    options: [
      { text: "顶刊顶会——学术严谨是底线", value: "A" },
      { text: "技术博客+行业报告——实用才是硬道理", value: "B" },
    ],
  },
  {
    id: "RE-L3-02",
    dimension: "RE",
    dimensionLabel: "驱动内核",
    level: 3,
    text: "深夜你想到了一个绝佳 idea，第二天你会？",
    options: [
      { text: "查文献看有没有人做过，设计研究路线", value: "A" },
      { text: "立刻画产品原型，列出MVP功能清单", value: "B" },
    ],
  },

  // === DN: 生活节律 (昼型 vs 夜型) ===
  // Level 1
  {
    id: "DN-L1-01",
    dimension: "DN",
    dimensionLabel: "生活节律",
    level: 1,
    text: "从庆盛站到学校那段路上，你通常？",
    options: [
      { text: "享受清晨阳光，规划一天日程", value: "A" },
      { text: "闭眼补觉，因为昨晚又熬夜了", value: "B" },
    ],
  },
  {
    id: "DN-L1-02",
    dimension: "DN",
    dimensionLabel: "生活节律",
    level: 1,
    text: "你最高效的工作时段？",
    options: [
      { text: "上午9-12点，图书馆/工位安静时", value: "A" },
      { text: "晚上10点-凌晨2点，世界安静了", value: "B" },
    ],
  },
  {
    id: "DN-L1-03",
    dimension: "DN",
    dimensionLabel: "生活节律",
    level: 1,
    text: "周末的港科广，你更可能？",
    options: [
      { text: "早起跑步/健身，然后去图书馆", value: "A" },
      { text: "睡到自然醒，下午才进入状态", value: "B" },
    ],
  },
  // Level 2
  {
    id: "DN-L2-01",
    dimension: "DN",
    dimensionLabel: "生活节律",
    level: 2,
    text: "你的闹钟设置是？",
    options: [
      { text: "一个闹钟就醒，甚至不需要闹钟", value: "A" },
      { text: "至少3个闹钟，贪睡5分钟是基本操作", value: "B" },
    ],
  },
  {
    id: "DN-L2-02",
    dimension: "DN",
    dimensionLabel: "生活节律",
    level: 2,
    text: "你什么时候做最有创意的工作？",
    options: [
      { text: "上午，大脑清醒效率最高", value: "A" },
      { text: "深夜，夜深人静才出灵感", value: "B" },
    ],
  },
  {
    id: "DN-L2-03",
    dimension: "DN",
    dimensionLabel: "生活节律",
    level: 2,
    text: "你的三餐时间？",
    options: [
      { text: "规律准点，食堂开饭就到", value: "A" },
      { text: "弹性随意，饿了才想起来吃", value: "B" },
    ],
  },
  // Level 3
  {
    id: "DN-L3-01",
    dimension: "DN",
    dimensionLabel: "生活节律",
    level: 3,
    text: "如果可以自由排课，你会选？",
    options: [
      { text: "上午集中排完，下午自由安排", value: "A" },
      { text: "下午和晚上的课，上午留给睡眠", value: "B" },
    ],
  },
  {
    id: "DN-L3-02",
    dimension: "DN",
    dimensionLabel: "生活节律",
    level: 3,
    text: "你最后一次看手机是？",
    options: [
      { text: "睡前早早就放下，保证明天早起", value: "A" },
      { text: "刷着刷着就凌晨1点了…", value: "B" },
    ],
  },
];

export const questionPool = allQuestions;

export function getQuestionsByDimensionAndLevel(
  dim: Dimension,
  level: Level
): Question[] {
  return allQuestions.filter((q) => q.dimension === dim && q.level === level);
}
