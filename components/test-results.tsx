import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getMBTIDescription, getMBTITypeColors } from "@/lib/mbti-utils";
import { AIChat } from "@/components/ai-chat";
import { ArrowRight, RefreshCw, MessageSquare, Info } from "lucide-react";

interface TestResultsProps {
  mbtiType: string;
  onRetakeTest: () => void;
}

export function TestResults({ mbtiType, onRetakeTest }: TestResultsProps) {
  const [activeTab, setActiveTab] = useState("overview");
  const description = getMBTIDescription(mbtiType);
  const { bgColor, textColor, lightBgColor } = getMBTITypeColors(mbtiType);
  
  return (
    <div className="w-full max-w-2xl animate-fadeIn">
      <Card className="mb-6">
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <CardDescription className="mb-1">你的性格类型是</CardDescription>
              <CardTitle className="text-3xl flex items-center gap-2">
                <span 
                  className={`${bgColor} ${textColor} px-3 py-1 rounded-md`}
                >
                  {mbtiType}
                </span>
                <span className="text-xl font-bold">「{description.nickname}」</span>
              </CardTitle>
            </div>
            <Button
              variant="outline" 
              size="sm"
              className="w-full sm:w-auto"
              onClick={onRetakeTest}
            >
              <RefreshCw className="mr-2 h-4 w-4" />
              重新测试
            </Button>
          </div>
        </CardHeader>
        
        <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab}>
          <CardContent>
            <TabsList className="grid grid-cols-2 mb-4">
              <TabsTrigger value="overview">
                <Info className="mr-2 h-4 w-4" />
                概览
              </TabsTrigger>
              <TabsTrigger value="chat">
                <MessageSquare className="mr-2 h-4 w-4" />
                AI对话
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="space-y-6">
              <div className={`${lightBgColor} p-6 rounded-lg space-y-2`}>
                <h3 className="text-lg font-bold mb-3">核心特质</h3>
                <ul className="list-disc list-inside space-y-2">
                  {description.traits.map((trait, index) => (
                    <li key={index} className="text-base">
                      <span className="font-medium">{trait}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="space-y-2">
                <h3 className="text-lg font-bold mb-3">类型描述</h3>
                <p className="text-base leading-relaxed whitespace-pre-wrap">
                  {description.description}
                </p>
              </div>
              
              <div className="space-y-3">
                <h3 className="text-lg font-bold mb-3">认知功能</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {description.functions.map((func, index) => (
                    <div key={index} className="border rounded-lg p-4 space-y-1">
                      <div className="font-bold text-base">{func.name}</div>
                      <div className="text-base text-muted-foreground">
                        {func.description}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="chat">
              <AIChat mbtiType={mbtiType} />
            </TabsContent>
          </CardContent>
        </Tabs>
        
        <CardFooter className="flex justify-end">
          {activeTab === "overview" && (
            <Button onClick={() => setActiveTab("chat")}>
              与AI助手讨论你的结果
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}