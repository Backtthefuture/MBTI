import { Header } from "@/components/header";
import { MBTITest } from "@/components/mbti-test";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-start">
      <Header />
      <div className="container max-w-4xl mx-auto px-4 py-8 flex-1">
        <MBTITest />
      </div>
    </main>
  );
}