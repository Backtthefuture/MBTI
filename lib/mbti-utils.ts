import { MBTIAnswer } from "@/components/mbti-test";

export function calculateMBTIType(answers: MBTIAnswer[]): string {
  const dimensions = {
    EI: 0,
    SN: 0,
    TF: 0,
    JP: 0,
  };
  
  answers.forEach((answer) => {
    dimensions[answer.dimension as keyof typeof dimensions] += answer.answer;
  });
  
  const E_or_I = dimensions.EI < 0 ? "I" : "E";
  const S_or_N = dimensions.SN < 0 ? "N" : "S";
  const T_or_F = dimensions.TF < 0 ? "F" : "T";
  const J_or_P = dimensions.JP < 0 ? "P" : "J";
  
  return E_or_I + S_or_N + T_or_F + J_or_P;
}

export function getMBTITypeColors(type: string) {
  const colors: Record<string, { bgColor: string; textColor: string; lightBgColor: string }> = {
    INTJ: { 
      bgColor: "bg-indigo-600", 
      textColor: "text-white", 
      lightBgColor: "bg-indigo-50 dark:bg-indigo-950/30" 
    },
    INTP: { 
      bgColor: "bg-blue-600", 
      textColor: "text-white", 
      lightBgColor: "bg-blue-50 dark:bg-blue-950/30" 
    },
    ENTJ: { 
      bgColor: "bg-purple-600", 
      textColor: "text-white", 
      lightBgColor: "bg-purple-50 dark:bg-purple-950/30" 
    },
    ENTP: { 
      bgColor: "bg-violet-600", 
      textColor: "text-white", 
      lightBgColor: "bg-violet-50 dark:bg-violet-950/30" 
    },
    INFJ: { 
      bgColor: "bg-emerald-600", 
      textColor: "text-white", 
      lightBgColor: "bg-emerald-50 dark:bg-emerald-950/30" 
    },
    INFP: { 
      bgColor: "bg-teal-600", 
      textColor: "text-white", 
      lightBgColor: "bg-teal-50 dark:bg-teal-950/30" 
    },
    ENFJ: { 
      bgColor: "bg-green-600", 
      textColor: "text-white", 
      lightBgColor: "bg-green-50 dark:bg-green-950/30" 
    },
    ENFP: { 
      bgColor: "bg-lime-600", 
      textColor: "text-white", 
      lightBgColor: "bg-lime-50 dark:bg-lime-950/30" 
    },
    ISTJ: { 
      bgColor: "bg-slate-700", 
      textColor: "text-white", 
      lightBgColor: "bg-slate-50 dark:bg-slate-900/60" 
    },
    ISFJ: { 
      bgColor: "bg-gray-700", 
      textColor: "text-white", 
      lightBgColor: "bg-gray-50 dark:bg-gray-900/60" 
    },
    ESTJ: { 
      bgColor: "bg-zinc-700", 
      textColor: "text-white", 
      lightBgColor: "bg-zinc-50 dark:bg-zinc-900/60" 
    },
    ESFJ: { 
      bgColor: "bg-stone-700", 
      textColor: "text-white", 
      lightBgColor: "bg-stone-50 dark:bg-stone-900/60" 
    },
    ISTP: { 
      bgColor: "bg-amber-600", 
      textColor: "text-white", 
      lightBgColor: "bg-amber-50 dark:bg-amber-950/30" 
    },
    ISFP: { 
      bgColor: "bg-yellow-600", 
      textColor: "text-white", 
      lightBgColor: "bg-yellow-50 dark:bg-yellow-950/30" 
    },
    ESTP: { 
      bgColor: "bg-orange-600", 
      textColor: "text-white", 
      lightBgColor: "bg-orange-50 dark:bg-orange-950/30" 
    },
    ESFP: { 
      bgColor: "bg-red-600", 
      textColor: "text-white", 
      lightBgColor: "bg-red-50 dark:bg-red-950/30" 
    },
  };
  
  return colors[type] || { 
    bgColor: "bg-gray-600", 
    textColor: "text-white", 
    lightBgColor: "bg-gray-50 dark:bg-gray-900/60" 
  };
}

export function getMBTIDescription(type: string) {
  const descriptions: Record<string, {
    nickname: string;
    description: string;
    traits: string[];
    functions: Array<{ name: string; description: string }>;
  }> = {
    INTJ: {
      nickname: "建筑师",
      description: "INTJ型人格是战略性思考者，擅长规划和实施复杂系统。他们重视能力和逻辑推理，常常关注大局的同时也不忽视关键细节。",
      traits: [
        "战略性长远思考",
        "独立且果断",
        "对自己和他人都有很高的标准",
        "致力于实现自己的愿景",
        "重视知识和能力"
      ],
      functions: [
        { name: "Ni（内向直觉）", description: "主导功能 - 模式识别和未来预测" },
        { name: "Te（外向思维）", description: "辅助功能 - 逻辑组织和效率" },
        { name: "Fi（内向情感）", description: "第三功能 - 个人价值观和真实性" },
        { name: "Se（外向感觉）", description: "劣势功能 - 当下意识和体验" }
      ]
    },
    INTP: {
      nickname: "逻辑学家",
      description: "INTP型人格渴望知识，擅长理论和抽象概念。他们通过独特的角度提供创新解决方案，善于发现问题的本质。",
      traits: [
        "分析性思维和逻辑解决问题",
        "独立好奇的思考者",
        "对新想法持开放态度",
        "重视精确的表达",
        "热衷于理解复杂系统"
      ],
      functions: [
        { name: "Ti（内向思维）", description: "主导功能 - 分析精确和逻辑框架" },
        { name: "Ne（外向直觉）", description: "辅助功能 - 探索可能性和联系" },
        { name: "Si（内向感觉）", description: "第三功能 - 内部经验整理" },
        { name: "Fe（外向情感）", description: "劣势功能 - 他人情绪意识" }
      ]
    },
    ENTJ: {
      nickname: "指挥官",
      description: "ENTJ型人格果断坚定，天生的领导者。他们擅长发现系统中的逻辑缺陷和效率问题，并实施全面的解决方案。",
      traits: [
        "天生的领导者，具有统御力",
        "战略性和高效的规划者",
        "直接的沟通者",
        "强烈的系统实施动力",
        "注重结果的决策者"
      ],
      functions: [
        { name: "Te（外向思维）", description: "主导功能 - 逻辑组织和效率" },
        { name: "Ni（内向直觉）", description: "辅助功能 - 模式识别和愿景" },
        { name: "Se（外向感觉）", description: "第三功能 - 当下意识和行动" },
        { name: "Fi（内向情感）", description: "劣势功能 - 个人价值观和真实性" }
      ]
    },
    ENTP: {
      nickname: "辩论家",
      description: "ENTP型人格思维敏捷，善于辩论和发现可能性。他们享受智力挑战，能够快速思考，发现他人可能忽视的联系。",
      traits: [
        "思维敏捷，机智多谋",
        "享受智力辩论",
        "轻松产生创新想法",
        "质疑既定规范",
        "适应力强，灵活多变"
      ],
      functions: [
        { name: "Ne（外向直觉）", description: "主导功能 - 探索可能性和联系" },
        { name: "Ti（内向思维）", description: "辅助功能 - 分析精确和框架" },
        { name: "Fe（外向情感）", description: "第三功能 - 理解社交动态" },
        { name: "Si（内向感觉）", description: "劣势功能 - 个人经验和记忆" }
      ]
    },
    INFJ: {
      nickname: "提倡者",
      description: "INFJ型人格洞察力强，富有同情心，具有强烈的正直感和对更美好未来的愿景。他们深刻理解他人，用直觉引导他人成长。",
      traits: [
        "深刻的同理心和同情心",
        "具有强烈的信念和远见",
        "洞察人性动机",
        "重视有意义的联系",
        "富有创造性的问题解决者"
      ],
      functions: [
        { name: "Ni（内向直觉）", description: "主导功能 - 模式识别和未来愿景" },
        { name: "Fe（外向情感）", description: "辅助功能 - 和谐与理解他人" },
        { name: "Ti（内向思维）", description: "第三功能 - 分析精确" },
        { name: "Se（外向感觉）", description: "劣势功能 - 当下意识" }
      ]
    },
    INFP: {
      nickname: "调停者",
      description: "INFP型人格理想主义，真诚，具有深刻的个人价值观和助人意愿。他们看到每个人的成长潜力，致力于使世界更符合他们的理想。",
      traits: [
        "由强烈的个人价值观引导",
        "极具创造力和想象力",
        "追求真实的自我表达",
        "富有同理心，包容他人",
        "追求意义和目标"
      ],
      functions: [
        { name: "Fi（内向情感）", description: "主导功能 - 个人价值观和真实性" },
        { name: "Ne（外向直觉）", description: "辅助功能 - 探索可能性" },
        { name: "Si（内向感觉）", description: "第三功能 - 个人经验和记忆" },
        { name: "Te（外向思维）", description: "劣势功能 - 外部组织" }
      ]
    },
    ENFJ: {
      nickname: "主人公",
      description: "ENFJ型人格富有魅力和同理心，天生能激励和激励他人。他们敏锐地察觉他人的需求和潜力，擅长将不同群体团结在共同目标下。",
      traits: [
        "天生激励他人的能力",
        "富有同理心，以人为本",
        "出色的沟通技巧",
        "有条理且果断",
        "重视和谐与合作"
      ],
      functions: [
        { name: "Fe（外向情感）", description: "主导功能 - 和谐与理解他人" },
        { name: "Ni（内向直觉）", description: "辅助功能 - 模式识别和愿景" },
        { name: "Se（外向感觉）", description: "第三功能 - 当下意识和行动" },
        { name: "Ti（内向思维）", description: "劣势功能 - 分析精确" }
      ]
    },
    ENFP: {
      nickname: "探险家",
      description: "ENFP型人格热情洋溢，富有创造力，能在每个人和情境中看到令人兴奋的潜力。他们容易建立联系，为项目和关系带来感染力的能量。",
      traits: [
        "热情活力，随性自然",
        "创造力和想象力丰富",
        "出色的人际交往能力",
        "重视真实性和表达",
        "处处看到可能性和潜力"
      ],
      functions: [
        { name: "Ne（外向直觉）", description: "主导功能 - 探索可能性和联系" },
        { name: "Fi（内向情感）", description: "辅助功能 - 个人价值观和真实性" },
        { name: "Te（外向思维）", description: "第三功能 - 外部组织" },
        { name: "Si（内向感觉）", description: "劣势功能 - 个人经验和记忆" }
      ]
    },
    ISTJ: {
      nickname: "检查者",
      description: "ISTJ型人格可靠，注重事实，具有强烈的责任感。他们擅长创建和维护秩序，用系统的方法确保任务准确高效地完成。",
      traits: [
        "务实，注重事实",
        "可靠负责",
        "有条理，有方法",
        "重视传统和稳定",
        "注重细节，做事彻底"
      ],
      functions: [
        { name: "Si（内向感觉）", description: "主导功能 - 内部经验整理和先例" },
        { name: "Te（外向思维）", description: "辅助功能 - 逻辑组织" },
        { name: "Fi（内向情感）", description: "第三功能 - 个人价值观" },
        { name: "Ne（外向直觉）", description: "劣势功能 - 探索可能性" }
      ]
    },
    ISFJ: {
      nickname: "守护者",
      description: "ISFJ型人格温暖，尽职尽责，擅长为他人提供实际帮助和服务。他们对与自己重要的人和事物有着非凡的记忆力。",
      traits: [
        "温暖体贴",
        "实际且注重细节",
        "忠诚投入",
        "服务导向",
        "重视和谐与合作"
      ],
      functions: [
        { name: "Si（内向感觉）", description: "主导功能 - 内部经验整理" },
        { name: "Fe（外向情感）", description: "辅助功能 - 和谐与理解他人" },
        { name: "Ti（内向思维）", description: "第三功能 - 分析精确" },
        { name: "Ne（外向直觉）", description: "劣势功能 - 探索可能性" }
      ]
    },
    ESTJ: {
      nickname: "总经理",
      description: "ESTJ型人格务实，注重事实，重视传统和秩序。他们擅长实施能够产生结果的系统和流程，注重效率和标准。",
      traits: [
        "有条理且高效",
        "务实现实",
        "果断直接",
        "重视传统和稳定",
        "结果导向的领导者"
      ],
      functions: [
        { name: "Te（外向思维）", description: "主导功能 - 逻辑组织和效率" },
        { name: "Si（内向感觉）", description: "辅助功能 - 内部经验整理" },
        { name: "Ne（外向直觉）", description: "第三功能 - 探索可能性" },
        { name: "Fi（内向情感）", description: "劣势功能 - 个人价值观" }
      ]
    },
    ESFJ: {
      nickname: "执政官",
      description: "ESFJ型人格温暖，有责任心，重视和谐与合作。他们擅长创造秩序和凝聚人心，常常成为团体和组织的粘合剂。",
      traits: [
        "温暖支持",
        "有条理且务实",
        "服务导向",
        "重视传统和社交联系",
        "认真可靠"
      ],
      functions: [
        { name: "Fe（外向情感）", description: "主导功能 - 和谐与理解他人" },
        { name: "Si（内向感觉）", description: "辅助功能 - 内部经验整理" },
        { name: "Ne（外向直觉）", description: "第三功能 - 探索可能性" },
        { name: "Ti（内向思维）", description: "劣势功能 - 分析精确" }
      ]
    },
    ISTP: {
      nickname: "鉴赏家",
      description: "ISTP型人格是实践型的问题解决者，对机械有深刻理解，擅长运用工具、系统和实践解决方案。他们观察敏锐，能快速适应当前需求。",
      traits: [
        "对细节观察敏锐",
        "实践型问题解决者",
        "适应力强，随机应变",
        "独立且内敛",
        "擅长使用工具和机械"
      ],
      functions: [
        { name: "Ti（内向思维）", description: "主导功能 - 分析精确和框架" },
        { name: "Se（外向感觉）", description: "辅助功能 - 当下意识和行动" },
        { name: "Ni（内向直觉）", description: "第三功能 - 模式识别" },
        { name: "Fe（外向情感）", description: "劣势功能 - 和谐与社交动态" }
      ]
    },
    ISFP: {
      nickname: "艺术家",
      description: "ISFP型人格温和，敏感，具有强烈的审美感和深刻的情感能力。他们重视个人自由和表达，常通过行动或艺术传达独特视角。",
      traits: [
        "艺术感和审美意识强",
        "专注当下，随性自然",
        "温和富有同情心",
        "重视个人自由",
        "真实且具个性"
      ],
      functions: [
        { name: "Fi（内向情感）", description: "主导功能 - 个人价值观和真实性" },
        { name: "Se（外向感觉）", description: "辅助功能 - 当下意识和体验" },
        { name: "Ni（内向直觉）", description: "第三功能 - 模式识别" },
        { name: "Te（外向思维）", description: "劣势功能 - 外部组织" }
      ]
    },
    ESTP: {
      nickname: "企业家",
      description: "ESTP型人格充满活力，行动导向，在动态情况下表现出色。他们善于快速评估当前事实并采取行动，是出色的问题解决者和谈判者。",
      traits: [
        "精力充沛，行动导向",
        "适应力强，随机应变",
        "对周围环境观察敏锐",
        "务实的问题解决者",
        "喜欢承担计算好的风险"
      ],
      functions: [
        { name: "Se（外向感觉）", description: "主导功能 - 当下意识和行动" },
        { name: "Ti（内向思维）", description: "辅助功能 - 分析精确" },
        { name: "Fe（外向情感）", description: "第三功能 - 他人情绪意识" },
        { name: "Ni（内向直觉）", description: "劣势功能 - 模式识别" }
      ]
    },
    ESFP: {
      nickname: "表演者",
      description: "ESFP型人格活力四射，热情洋溢，善于在当下找到快乐并带动他人共同体验。他们善解人意，擅长创造有趣、吸引人的环境。",
      traits: [
        "热情活力，随性自然",
        "善于交际，友好",
        "实际且观察敏锐",
        "活在当下",
        "适应力强，随机应变"
      ],
      functions: [
        { name: "Se（外向感觉）", description: "主导功能 - 当下意识和体验" },
        { name: "Fi（内向情感）", description: "辅助功能 - 个人价值观和真实性" },
        { name: "Te（外向思维）", description: "第三功能 - 外部组织" },
        { name: "Ni（内向直觉）", description: "劣势功能 - 模式识别和愿景" }
      ]
    },
  };
  
  return descriptions[type] || {
    nickname: "性格类型",
    description: "基于你的回答得出的独特性格组合。",
    traits: ["根据你的回答得出的独特特征"],
    functions: [
      { name: "主导功能", description: "你的主要认知过程" },
      { name: "辅助功能", description: "你的次要认知过程" },
      { name: "第三功能", description: "你的第三认知过程" },
      { name: "劣势功能", description: "你最不发达的认知过程" }
    ]
  };
}

export function getCommonQuestions(type: string): string[] {
  const commonQuestions = [
    "我有什么优势？",
    "我有什么需要改进的地方？",
    "什么职业最适合我？",
    "我如何提升自己？",
    "我该如何应对压力？",
  ];
  
  const typeQuestions: Record<string, string[]> = {
    INTJ: [
      "如何更好地与他人建立联系？",
      "为什么我觉得闲聊很困难？",
      "如何对效率较低的人保持耐心？",
    ],
    INTP: [
      "如何完成已经开始的项目？",
      "为什么我总是拖延？",
      "如何更清晰地向他人解释我的想法？",
    ],
    ENTJ: [
      "如何更体贴他人的感受？",
      "为什么别人觉得我太强势？",
      "如何平衡工作和生活？",
    ],
    ENTP: [
      "如何专注于一件事？",
      "为什么我总是喜欢打破常规？",
      "如何实现我的众多想法？",
    ],
    INFJ: [
      "为什么我感觉与他人如此不同？",
      "如何避免因帮助他人而耗尽自己？",
      "为什么我对批评这么敏感？",
    ],
    INFP: [
      "如何更好地处理日常琐事？",
      "为什么我总是太过敏感？",
      "如何变得更果断？",
    ],
    ENFJ: [
      "如何在帮助他人的同时照顾好自己？",
      "为什么我需要外界的认可？",
      "如何在决策时保持客观？",
    ],
    ENFP: [
      "如何提高执行力？",
      "为什么我容易对常规感到厌倦？",
      "如何变得更有条理？",
    ],
    ISTJ: [
      "如何更灵活地应对变化？",
      "为什么我难以表达情感？",
      "如何考虑更多可能性？",
    ],
    ISFJ: [
      "如何设立更好的界限？",
      "为什么我难以说不？",
      "如何变得更果断？",
    ],
    ESTJ: [
      "如何对他人更有耐心？",
      "为什么别人觉得我太专制？",
      "如何更多地考虑他人感受？",
    ],
    ESFJ: [
      "如何更好地接受批评？",
      "为什么我总是太在意他人想法？",
      "如何更多关注自己的需求？",
    ],
    ISTP: [
      "如何更好地建立情感联系？",
      "为什么我容易对长期项目感到厌倦？",
      "如何更好地规划未来？",
    ],
    ISFP: [
      "如何变得更果断？",
      "为什么我总是回避冲突？",
      "如何更好地规划未来？",
    ],
    ESTP: [
      "如何更多考虑长期影响？",
      "为什么我容易对常规感到厌倦？",
      "如何培养更多耐心？",
    ],
    ESFP: [
      "如何专注于长期目标？",
      "为什么我难以进行详细规划？",
      "如何更好地处理批评？",
    ],
  };
  
  return [...commonQuestions, ...(typeQuestions[type] || [])];
}