"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { BrainCircuit } from "lucide-react";

interface TestIntroProps {
  onStartTest: () => void;
}

export function TestIntro({ onStartTest }: TestIntroProps) {
  return (
    <Card className="w-full max-w-2xl animate-fadeIn">
      <CardHeader className="text-center">
        <div className="mx-auto mb-4 h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
          <BrainCircuit className="h-6 w-6 text-primary" />
        </div>
        <CardTitle className="text-2xl sm:text-3xl">探索你的性格类型</CardTitle>
        <CardDescription className="text-base mt-2">
          一个简约的MBTI测试，帮助你更好地了解自己
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4 text-center">
        <p>
          这个简短的测试将帮助你找出你的MBTI（迈尔斯-布里格斯类型指标）性格类型。
          回答一系列简单的问题，然后与我们的AI助手探讨你的测试结果。
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-4">
          <div className="flex flex-col items-center p-3 rounded-lg border bg-card/50">
            <span className="font-medium">12</span>
            <span className="text-xs text-muted-foreground">个问题</span>
          </div>
          <div className="flex flex-col items-center p-3 rounded-lg border bg-card/50">
            <span className="font-medium">3-5</span>
            <span className="text-xs text-muted-foreground">分钟</span>
          </div>
          <div className="flex flex-col items-center p-3 rounded-lg border bg-card/50">
            <span className="font-medium">16</span>
            <span className="text-xs text-muted-foreground">种类型</span>
          </div>
          <div className="flex flex-col items-center p-3 rounded-lg border bg-card/50">
            <span className="font-medium">AI</span>
            <span className="text-xs text-muted-foreground">解析</span>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button size="lg" className="w-full" onClick={onStartTest}>
          开始测试
        </Button>
      </CardFooter>
    </Card>
  );
}