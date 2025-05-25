export interface MBTIQuestion {
  id: number;
  text: string;
  dimension: "EI" | "SN" | "TF" | "JP";
}

export const mbtiQuestions: MBTIQuestion[] = [
  {
    id: 1,
    text: "我更喜欢和他人相处，而不是独处。",
    dimension: "EI",
  },
  {
    id: 2,
    text: "我更关注细节和事实，而不是宏观想法和可能性。",
    dimension: "SN",
  },
  {
    id: 3,
    text: "我做决定时更依赖逻辑，而不是个人价值观。",
    dimension: "TF",
  },
  {
    id: 4,
    text: "我更喜欢有计划的生活，而不是随性而为。",
    dimension: "JP",
  },
  {
    id: 5,
    text: "在有很多人的社交场合，我感到精力充沛。",
    dimension: "EI",
  },
  {
    id: 6,
    text: "我更务实和具体，而不是理论化和抽象。",
    dimension: "SN",
  },
  {
    id: 7,
    text: "我更重视客观真理，而不是人际关系的和谐。",
    dimension: "TF",
  },
  {
    id: 8,
    text: "我喜欢事情有定论，而不是保持开放。",
    dimension: "JP",
  },
  {
    id: 9,
    text: "我倾向于向他人公开表达自己的想法和感受。",
    dimension: "EI",
  },
  {
    id: 10,
    text: "我更关注当下的现实，而不是未来的可能性。",
    dimension: "SN",
  },
  {
    id: 11,
    text: "解决问题时，我更倾向于分析问题而不是考虑对他人的影响。",
    dimension: "TF",
  },
  {
    id: 12,
    text: "我喜欢提前计划活动，而不是即兴行动。",
    dimension: "JP",
  },
];