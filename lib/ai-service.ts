"use client";

const API_KEY = "sk-lvlbodckzubnveqmdcjiembvolgwusbnldwyhesyahlsohmh";
const API_URL = "https://api.siliconflow.cn/v1/chat/completions";

interface Message {
  role: string;
  content: string;
}

export async function chatWithAI(messages: Message[], mbtiType: string): Promise<string> {
  try {
    const systemMessage = {
      role: "system",
      content: `你是一位专注于MBTI性格类型分析的AI助手。用户的MBTI类型是${mbtiType}。请提供信息丰富、准确且有帮助的回答。回答要简洁（1-3段），重点突出，并专注于MBTI洞察。避免讨论与性格心理学无关的话题。如果被问及你的能力或身份，请提醒用户你是一个专注于帮助他们理解MBTI类型的AI助手。

      请按以下格式组织回答：
      1. 使用**加粗**突出重要概念
      2. 适当使用换行分隔不同主题
      3. 使用简洁、清晰的语言
      4. 确保回答针对性强，直接解答用户问题`
    };
    
    const formattedMessages = [
      systemMessage,
      ...messages
    ];
    
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${API_KEY}`
      },
      body: JSON.stringify({
        model: "Pro/deepseek-ai/DeepSeek-V3",
        messages: formattedMessages,
        temperature: 0.7,
        max_tokens: 800
      })
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      console.error("API Error:", errorData);
      throw new Error(`API error: ${response.status}`);
    }
    
    const data = await response.json();
    return data.choices[0].message.content;
    
  } catch (error) {
    console.error("Error in chatWithAI:", error);
    return "抱歉，我现在无法连接。请稍后再试。";
  }
}

export function simulateAIResponse(mbtiType: string, question: string): string {
  const responses: Record<string, Record<string, string>> = {
    "strengths": {
      "INTJ": "**你的核心优势包括：**\n\n- 战略性思维\n- 独立分析能力\n- 开发创新系统和解决方案的能力\n\n你特别擅长在把握大局的同时理解所有细节如何协同工作。",
      "default": "根据你的性格类型，你在信息处理和决策方面有独特的优势。根据具体的类型维度，你可能在分析能力或人际交往方面有特殊的天赋。"
    },
    "weaknesses": {
      "INTJ": "**需要注意的方面：**\n\n- 表达情感的困难\n- 对能力较弱者缺乏耐心\n- 可能在无意中显得过于批评性\n\n建议多关注他人的感受，培养同理心。",
      "default": "每种性格类型都有其成长空间。你可能需要在天性和其对立面之间找到平衡，比如在关注细节与把握大局之间，或在逻辑决策与考虑他人感受之间。"
    },
    "default": "我很乐意详细讨论你的MBTI类型。你的性格类型揭示了你的偏好，但请记住这些是倾向而非限制。每个人都是独特的，都可以在各个方面发展技能。"
  };
  
  const questionLower = question.toLowerCase();
  let responseCategory = "default";
  
  if (questionLower.includes("优势")) {
    responseCategory = "strengths";
  } else if (questionLower.includes("缺点") || questionLower.includes("弱点")) {
    responseCategory = "weaknesses";
  }
  
  return responses[responseCategory][mbtiType] || responses[responseCategory]["default"] || responses["default"];
}