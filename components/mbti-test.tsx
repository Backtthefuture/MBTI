"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { TestQuestion } from "@/components/test-question";
import { TestResults } from "@/components/test-results";
import { mbtiQuestions } from "@/lib/mbti-questions";
import { calculateMBTIType } from "@/lib/mbti-utils";
import { TestIntro } from "./test-intro";

export type MBTIAnswer = {
  questionId: number;
  dimension: string;
  answer: number; // -2 to 2 scale
};

export function MBTITest() {
  const [testState, setTestState] = useState<"intro" | "in-progress" | "completed">("intro");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<MBTIAnswer[]>([]);
  const [mbtiType, setMbtiType] = useState<string | null>(null);
  
  useEffect(() => {
    const savedResults = localStorage.getItem("mbtiResults");
    if (savedResults) {
      try {
        const parsed = JSON.parse(savedResults);
        if (parsed?.type) {
          setMbtiType(parsed.type);
          setAnswers(parsed.answers || []);
        }
      } catch (e) {
        console.error("Error parsing saved results", e);
      }
    }
  }, []);

  const startTest = () => {
    setTestState("in-progress");
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setMbtiType(null);
  };

  const handleAnswer = (answer: number) => {
    const question = mbtiQuestions[currentQuestionIndex];
    const newAnswer: MBTIAnswer = {
      questionId: question.id,
      dimension: question.dimension,
      answer,
    };
    
    const newAnswers = [...answers, newAnswer];
    setAnswers(newAnswers);
    
    if (currentQuestionIndex < mbtiQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      const type = calculateMBTIType(newAnswers);
      setMbtiType(type);
      setTestState("completed");
      
      localStorage.setItem("mbtiResults", JSON.stringify({
        type,
        answers: newAnswers,
        timestamp: new Date().toISOString(),
      }));
    }
  };

  const progress = testState === "in-progress" 
    ? Math.round(((currentQuestionIndex) / mbtiQuestions.length) * 100)
    : 0;

  useEffect(() => {
    if (mbtiType && testState === "intro") {
      setTestState("completed");
    }
  }, [mbtiType, testState]);

  return (
    <div className="flex flex-col items-center justify-center w-full">
      {testState === "intro" && (
        <TestIntro onStartTest={startTest} />
      )}
      
      {testState === "in-progress" && (
        <div className="w-full max-w-2xl animate-fadeIn">
          <div className="mb-6 w-full">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-muted-foreground">问题 {currentQuestionIndex + 1} / {mbtiQuestions.length}</span>
              <span className="text-sm font-medium">{progress}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
          
          <Card className="mb-6 transition-all">
            <CardContent className="p-6">
              <TestQuestion 
                question={mbtiQuestions[currentQuestionIndex]} 
                onAnswer={handleAnswer}
              />
            </CardContent>
          </Card>
          
          <div className="text-center text-sm text-muted-foreground">
            请诚实回答，以获得最准确的结果。
          </div>
        </div>
      )}
      
      {testState === "completed" && mbtiType && (
        <TestResults 
          mbtiType={mbtiType} 
          onRetakeTest={startTest}
        />
      )}
    </div>
  );
}