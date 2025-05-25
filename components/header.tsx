"use client";

import { Brain } from "lucide-react";
import { ThemeToggle } from "./theme-toggle";
import { useRouter } from "next/navigation";

export function Header() {
  const router = useRouter();
  
  return (
    <header className="w-full border-b sticky top-0 z-10 bg-background">
      <div className="container max-w-4xl mx-auto p-4 flex justify-between items-center">
        <div 
          className="flex items-center gap-2 cursor-pointer" 
          onClick={() => router.push("/")}
        >
          <Brain className="h-6 w-6 text-primary" />
          <h1 className="text-xl font-bold">极简MBTI</h1>
        </div>
        <ThemeToggle />
      </div>
    </header>
  );
}