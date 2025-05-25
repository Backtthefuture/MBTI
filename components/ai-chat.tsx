"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Loader2, Send, Bot, User, Sparkles } from "lucide-react";
import { getCommonQuestions } from "@/lib/mbti-utils";
import { chatWithAI } from "@/lib/ai-service";

interface AIMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

interface AIChatProps {
  mbtiType: string;
}

// 简单的Markdown解析函数
function parseMarkdown(text: string) {
  return text.split('\n').map((line, i) => {
    // 处理加粗文本 **text**
    line = line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    return line;
  }).join('<br />');
}

export function AIChat({ mbtiType }: AIChatProps) {
  const [messages, setMessages] = useState<AIMessage[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const commonQuestions = getCommonQuestions(mbtiType);
  
  useEffect(() => {
    setMessages([
      {
        role: "assistant",
        content: `你好！我是你的AI助手，很高兴为你解析${mbtiType}性格类型的特点。你想了解什么？`
      }
    ]);
  }, [mbtiType]);
  
  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);
  
  const handleSendMessage = async (message: string = input) => {
    if (!message.trim()) return;
    
    const userMessage: AIMessage = { role: "user", content: message };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);
    
    try {
      const aiResponse = await chatWithAI([...messages, userMessage], mbtiType);
      setMessages((prev) => [
        ...prev, 
        { role: "assistant", content: aiResponse }
      ]);
    } catch (error) {
      console.error("Error chatting with AI:", error);
      setMessages((prev) => [
        ...prev, 
        { 
          role: "assistant", 
          content: "抱歉，处理请求时出现错误。请稍后再试。" 
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !isLoading) {
      handleSendMessage();
    }
  };
  
  return (
    <div className="flex flex-col h-[500px] border rounded-lg overflow-hidden">
      <div className="p-3 border-b bg-muted/20 flex items-center gap-2">
        <Bot className="h-5 w-5" />
        <span className="font-medium">AI助手</span>
      </div>
      
      <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
        <div className="space-y-4">
          {messages.map((message, i) => (
            <div
              key={i}
              className={`flex ${
                message.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`flex gap-3 max-w-[80%] ${
                  message.role === "user" ? "flex-row-reverse" : ""
                }`}
              >
                <Avatar className="h-8 w-8 flex-shrink-0">
                  <AvatarFallback>
                    {message.role === "user" ? (
                      <User className="h-4 w-4" />
                    ) : (
                      <Sparkles className="h-4 w-4" />
                    )}
                  </AvatarFallback>
                </Avatar>
                <div
                  className={`rounded-lg p-4 text-base leading-relaxed ${
                    message.role === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted"
                  }`}
                  dangerouslySetInnerHTML={{
                    __html: parseMarkdown(message.content)
                  }}
                />
              </div>
            </div>
          ))}
          
          {isLoading && (
            <div className="flex justify-start">
              <div className="flex gap-3 max-w-[80%]">
                <Avatar className="h-8 w-8">
                  <AvatarFallback>
                    <Sparkles className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>
                <div className="rounded-lg p-3 bg-muted flex items-center">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span className="ml-2 text-sm">AI正在思考...</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>
      
      <div className="px-4 py-2 border-t bg-background flex gap-2 overflow-x-auto hide-scrollbar">
        {commonQuestions.map((question, i) => (
          <Button 
            key={i} 
            variant="outline" 
            size="sm" 
            className="whitespace-nowrap"
            onClick={() => handleSendMessage(question)}
            disabled={isLoading}
          >
            {question}
          </Button>
        ))}
      </div>
      
      <div className="p-3 border-t bg-background flex gap-2">
        <Input
          placeholder="问我任何关于你的MBTI类型的问题..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={isLoading}
          className="flex-1"
        />
        <Button 
          size="icon" 
          onClick={() => handleSendMessage()}
          disabled={isLoading || !input.trim()}
        >
          {isLoading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Send className="h-4 w-4" />
          )}
        </Button>
      </div>
    </div>
  );
}