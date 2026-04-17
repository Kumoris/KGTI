"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { decodeResult } from "@/lib/calculator";
import ResultCard from "@/components/ResultCard";

function ResultContent() {
  const searchParams = useSearchParams();
  const typeParam = searchParams.get("type") || "";
  const code = decodeResult(typeParam);

  if (!code) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center">
        <span className="text-6xl mb-4">🔍</span>
        <h1 className="text-2xl font-semibold mb-2">未找到结果</h1>
        <p className="text-foreground/60 mb-6">
          请先完成测试，或检查链接是否正确
        </p>
        <a
          href="/quiz"
          className="px-8 py-3 rounded-full border border-neon-blue/40 text-neon-blue hover:bg-neon-blue/10 transition-colors"
        >
          开始测试
        </a>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12 relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(0,212,255,0.04)_0%,transparent_60%)]" />
      <div className="relative z-10 w-full flex justify-center">
        <ResultCard code={code} />
      </div>
    </div>
  );
}

export default function ResultPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <p className="text-foreground/40 font-mono">Loading...</p>
        </div>
      }
    >
      <ResultContent />
    </Suspense>
  );
}
