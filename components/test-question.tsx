"use client";

import { Button } from "@/components/ui/button";
import { MBTIQuestion } from "@/lib/mbti-questions";

interface TestQuestionProps {
  question: MBTIQuestion;
  onAnswer: (answer: number) => void;
}

export function TestQuestion({ question, onAnswer }: TestQuestionProps) {
  const answerOptions = [
    { value: -2, label: "非常不同意" },
    { value: -1, label: "不同意" },
    { value: 0, label: "中立" },
    { value: 1, label: "同意" },
    { value: 2, label: "非常同意" },
  ];

  return (
    <div className="flex flex-col">
      <h3 className="text-xl font-medium mb-6 text-center">{question.text}</h3>
      
      <div className="flex flex-col space-y-3">
        {answerOptions.map((option) => (
          <Button
            key={option.value}
            variant="outline"
            className="justify-start h-auto py-4 px-4 text-left hover:bg-primary/5 transition-colors"
            onClick={() => onAnswer(option.value)}
          >
            <div className="flex items-center gap-3">
              <div className="flex-shrink-0 h-8 w-8 rounded-full border flex items-center justify-center">
                {option.value}
              </div>
              <span>{option.label}</span>
            </div>
          </Button>
        ))}
      </div>
    </div>
  );
}