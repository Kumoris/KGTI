export type PersonalityCode =
  | "FSRD" | "FSRN" | "FSED" | "FSEN"
  | "FCRD" | "FCRN" | "FCED" | "FCEN"
  | "ISRD" | "ISRN" | "ISED" | "ISEN"
  | "ICRD" | "ICRN" | "ICED" | "ICEN";

export interface Personality {
  code: PersonalityCode;
  name: string;
  emoji: string;
  tagline: string;
  description: string;
  campusScene: string;
  radarValues: [number, number, number, number];
  compatibleTypes: PersonalityCode[];
  celebrity: string;
  color: string;
}

export const personalities: Record<PersonalityCode, Personality> = {
  FSRD: {
    code: "FSRD",
    name: "实验室守望者",
    emoji: "🔬",
    tagline: "天亮就在实验室，科研就是我的晨练",
    description: "你是港科广最早醒来的那批人——不是因为闹钟，而是因为昨晚培养的晶体今天该出结果了。Function Hub 的硬核实力派，相信手中的仪器和数据，每一步都脚踏实地。你的实验室里永远有一杯凉掉的咖啡和一叠工整的实验记录。",
    campusScene: "清晨6:30，你已经在校内实验室做着材料表征，窗外是南沙的第一缕阳光。",
    radarValues: [90, 70, 80, 90],
    compatibleTypes: ["FSRN", "ISRD", "FCED"],
    celebrity: "居里夫人 × 钟南山",
    color: "#00d4ff",
  },
  FSRN: {
    code: "FSRN",
    name: "深夜炼金师",
    emoji: "🌙",
    tagline: "凌晨3点的实验室，只有我和我的材料",
    description: "白天你是安静的科研人，夜晚才是你的主场。在港科广寂静的深夜，你与材料为伴，与数据对话。你不是在熬夜，你是在和科学约会。你的实验日志里记录最多的时间是 23:47 和 02:13。",
    campusScene: "凌晨2点，微电子超净间里只有你的呼吸声和设备的低鸣，透过玻璃能看到星光。",
    radarValues: [90, 70, 80, 20],
    compatibleTypes: ["FSRD", "ISRN", "FCEN"],
    celebrity: "爱迪生 × 熬夜冠军",
    color: "#a855f7",
  },
  FSED: {
    code: "FSED",
    name: "绿色基建官",
    emoji: "🏗️",
    tagline: "不是在跑项目，就是在去跑项目的路上",
    description: "你把可持续能源当成信仰，把每一个项目都当作改变世界的机会。白天跑现场、谈合作、推落地，你是港科广最务实的创业派。你相信好的技术必须走出实验室，才能真正改变世界。",
    campusScene: "上午10点，你刚从南沙某新能源企业谈完合作回到学校，笔记本上画满了项目路线图。",
    radarValues: [90, 70, 60, 85],
    compatibleTypes: ["FSEN", "ISED", "FCRD"],
    celebrity: "马斯克 × 环保少女",
    color: "#ffd700",
  },
  FSEN: {
    code: "FSEN",
    name: "夜行发明家",
    emoji: "🦾",
    tagline: "Deadline 是第一生产力，灵感总在深夜降临",
    description: "你是那种会在深夜突然坐起来记下灵感的人。动手能力爆表，创业脑洞无限，但生物钟完全自由。你相信最好的原型都是在凌晨4点焊出来的。你的工位上永远有未完成的项目和一罐红牛。",
    campusScene: "晚上11点的创客空间，你正在3D打印一个原型，旁边是队友的空椅子和三罐空红牛。",
    radarValues: [90, 70, 60, 20],
    compatibleTypes: ["FSED", "ISEN", "FCRN"],
    celebrity: "钢铁侠 × 夜猫子",
    color: "#ff2d95",
  },
  FCRD: {
    code: "FCRD",
    name: "南沙探索者",
    emoji: "🌊",
    tagline: "早起看潮汐，田野就是我的实验室",
    description: "你大概是港科广最接近大自然的人——地球海洋大气方向的研究者，你的实验室不在楼里，在南海的船上、在南沙的湿地上。早起对你不是选择，是潮汐时间表的决定。你同时拥有严谨的科学精神和广阔的人文关怀。",
    campusScene: "清晨5:30，你已在南沙湿地架好监测设备，等待第一波潮水，远处有白鹭飞过。",
    radarValues: [90, 40, 80, 90],
    compatibleTypes: ["FCRN", "ICRD", "FSED"],
    celebrity: "雅克·库斯托 × 徐霞客",
    color: "#00d4ff",
  },
  FCRN: {
    code: "FCRN",
    name: "午夜调配师",
    emoji: "🧪",
    tagline: "试管比咖啡更提神，数据比月光更迷人",
    description: "你是那种在深夜实验室里反而更精神的人。社会科学的洞察力加上硬核的动手能力，让你成为跨学科的魔法师。你调配的不只是化学试剂，更是不同学科的知识溶液。你的论文致谢里永远有深夜食堂的阿姨。",
    campusScene: "午夜12点，中心实验楼的灯还亮着，你正在做第37次配比实验，耳机里放着白噪音。",
    radarValues: [90, 40, 80, 20],
    compatibleTypes: ["FCRD", "ICRN", "FSEN"],
    celebrity: "邓布利多 × 科研锦鲤",
    color: "#a855f7",
  },
  FCED: {
    code: "FCED",
    name: "实践连接官",
    emoji: "🤝",
    tagline: "左手做实验，右手谈合作，双脚踩在校园每个角落",
    description: "你是港科广最活跃的跨界连接者——能进实验室做实验，能上讲台做分享，能组织活动拉动全员。你相信知识只有流动起来才有价值，所以你总在不同 Hub 之间穿梭，把人、资源、想法连接在一起。",
    campusScene: "中午12点，你刚从Function Hub的实验做完，赶去Society Hub的活动做分享，路上还在回复微信群的三个project。",
    radarValues: [90, 40, 60, 85],
    compatibleTypes: ["FCEN", "ICED", "FSRD"],
    celebrity: "谢尔顿（社交版）× 雷军",
    color: "#ffd700",
  },
  FCEN: {
    code: "FCEN",
    name: "暗夜共创家",
    emoji: "🎨",
    tagline: "深夜的灵感碰撞，比白天的头脑风暴更炸裂",
    description: "你是最具创造力的夜行者。跨学科背景让你在夜晚灵感迸发时能同时从多个维度思考。你的创意总是在深夜和朋友的闲聊中诞生，然后在凌晨化为原型。你可能是港科广深夜外卖订单最多的人。",
    campusScene: "凌晨1点，你和朋友在宿舍楼下讨论一个跨学科项目，手机备忘录里又多了5个新idea。",
    radarValues: [90, 40, 60, 20],
    compatibleTypes: ["FCED", "ICEN", "FSRN"],
    celebrity: "达芬奇 × 熬夜版",
    color: "#ff2d95",
  },
  ISRD: {
    code: "ISRD",
    name: "数据架构师",
    emoji: "📊",
    tagline: "代码即信仰，算法即真理，早起写代码才是正经事",
    description: "你是港科广最清醒的信息人——早起、高效、逻辑严密。你相信一切问题都有数据可以解答，一切系统都有架构可以优化。你的代码从不在深夜写出，因为清醒的大脑才能写出优雅的算法。你的 GitHub 永远是绿色的。",
    campusScene: "早上8点，你已经坐在图书馆靠窗的位置，两块屏幕，一杯美式，开始重构昨天的算法。",
    radarValues: [40, 90, 80, 90],
    compatibleTypes: ["ISRN", "FSRD", "ICED"],
    celebrity: "林纳斯·托瓦兹 × 早起的鸟",
    color: "#00d4ff",
  },
  ISRN: {
    code: "ISRN",
    name: "深夜炼码师",
    emoji: "🤖",
    tagline: "凌晨debug，世界安静了，bug也无处遁形",
    description: "你不是在写代码，就是在写代码的路上——只不过总是在深夜。Information Hub 的暗夜骑士，相信最好的代码诞生在世界沉睡的时刻。你的 commit 记录里有90%的时间戳在 00:00-05:00 之间。",
    campusScene: "凌晨3点的工位，三块屏幕泛着蓝光，你终于找到了那个困扰两天的bug，窗外一片漆黑。",
    radarValues: [40, 90, 80, 20],
    compatibleTypes: ["ISRD", "FSRN", "ICRN"],
    celebrity: "中本聪 × 熬夜版",
    color: "#a855f7",
  },
  ISED: {
    code: "ISED",
    name: "产品指挥官",
    emoji: "🚀",
    tagline: "信息+系统+创业，敏捷执行的白天项目经理",
    description: "你是港科广最会做产品的人——既懂数据又懂系统，更有商业嗅觉。你是那个在白天跑会、评审、路演的人，晚上还在打磨BP。你相信好的产品是系统思维+数据驱动+用户洞察的交汇。",
    campusScene: "下午2点，你正在OKT路演，PPT上是你用数据分析验证过的新产品方案，评委频频点头。",
    radarValues: [40, 90, 60, 85],
    compatibleTypes: ["ISEN", "FSED", "ICRD"],
    celebrity: "张小龙 × 乔布斯",
    color: "#ffd700",
  },
  ISEN: {
    code: "ISEN",
    name: "极客幻想家",
    emoji: "💡",
    tagline: "深夜爆肝原型产品，全栈是我的浪漫",
    description: "你是那种一个人就能做出MVP的全栈极客。深夜是你最有创造力的时刻，前端后端算法部署一把梭。你做的原型可能粗糙，但总让人眼前一亮。你的电脑上同时开着 VS Code、Figma 和三个终端。",
    campusScene: "凌晨4点，你终于把原型跑通了，激动地给队友群发消息（明早才会被看到），然后继续加功能。",
    radarValues: [40, 90, 60, 20],
    compatibleTypes: ["ISED", "FSEN", "ICEN"],
    celebrity: "赫尔墨斯（科技版）× 熬夜极客",
    color: "#ff2d95",
  },
  ICRD: {
    code: "ICRD",
    name: "学术社交家",
    emoji: "📖",
    tagline: "论文与研讨两不误，信息时代的知识桥梁",
    description: "你是港科广最会做学术社交的人——信息分析能力加上社会洞察力，让你在学术会议和跨学科研讨中如鱼得水。你既能在期刊上发论文，也能在茶歇时建立关键人脉。你的日历永远排满了 seminar 和 workshop。",
    campusScene: "上午10点，你刚在University Forum做了一场精彩报告，现在正在和来访学者交流下一步合作可能。",
    radarValues: [40, 40, 80, 90],
    compatibleTypes: ["ICRN", "FCRD", "ISED"],
    celebrity: "赫拉利 × 学术网红",
    color: "#00d4ff",
  },
  ICRN: {
    code: "ICRN",
    name: "夜间网络师",
    emoji: "🌐",
    tagline: "深夜做数据分析，社科研究的暗夜行者",
    description: "你是那种在深夜处理大规模社会数据的人——当世界安静下来，你的数据才开始说话。你相信好的社科研究需要硬核的数据支撑，而深夜是最好的分析时间。你的屏幕上永远开着 Python 和 Zotero。",
    campusScene: "晚上11点，你正在对一份大规模问卷数据做聚类分析，耳机里是雨声白噪音，咖啡还是热的。",
    radarValues: [40, 40, 80, 20],
    compatibleTypes: ["ICRD", "FCRN", "ISRN"],
    celebrity: "凯文·凯利 × 数字人类学家",
    color: "#a855f7",
  },
  ICED: {
    code: "ICED",
    name: "校园影响力",
    emoji: "🎤",
    tagline: "信息+社交+创业，港科广的日间KOL",
    description: "你是港科广最有影响力的人——不是因为你发了几篇顶刊，而是因为你总能让知识和想法在校园里流动起来。你写的推文比论文阅读量高十倍，你组织的活动比讲座还座无虚席。信息是你的武器，社交是你的战场。",
    campusScene: "午餐时间，你在High Street的咖啡厅和三个不同Hub的朋友讨论新项目，手机不断弹出合作邀请。",
    radarValues: [40, 40, 60, 85],
    compatibleTypes: ["ICEN", "FCED", "ISRD"],
    celebrity: "罗永浩 × 科技博主",
    color: "#ffd700",
  },
  ICEN: {
    code: "ICEN",
    name: "数字游民",
    emoji: "✨",
    tagline: "信息+社交+创业，深夜灵感爆发的灵魂连接者",
    description: "你是港科广最自由的人——不被时间表束缚，不被学科限制，在深夜找到最真实的灵感。你用信息编织网络，用社交连接灵魂，用创业思维把每一个深夜的灵感变现。你可能是那个凌晨在B站发技术vlog的人。",
    campusScene: "凌晨2点，你刚在B站发了一条AI技术解读视频，正在Discord上和海外团队讨论下一个创业方向。",
    radarValues: [40, 40, 60, 20],
    compatibleTypes: ["ICED", "FCEN", "ISEN"],
    celebrity: "V神（Vitalik）× 数字游民",
    color: "#ff2d95",
  },
};

export const personalityList = Object.values(personalities);

export type Dimension = "FI" | "SC" | "RE" | "DN";

export const dimensionLabels: Record<Dimension, { name: string; sideA: string; sideB: string }> = {
  FI: { name: "思维模式", sideA: "F 实干家", sideB: "I 思考者" },
  SC: { name: "行动风格", sideA: "S 架构师", sideB: "C 连接者" },
  RE: { name: "驱动内核", sideA: "R 探索者", sideB: "E 创造者" },
  DN: { name: "生活节律", sideA: "D 昼型", sideB: "N 夜型" },
};

export const hubNames: Record<string, string> = {
  F: "Function Hub",
  I: "Information Hub",
  S: "Systems Hub",
  C: "Society Hub",
  R: "Research",
  E: "Entrepreneurship",
  D: "Daytime",
  N: "Nighttime",
};
