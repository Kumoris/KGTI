"use client";

import { useState, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { AdaptiveEngine } from "@/lib/calculator";
import { saveResultToLocal } from "@/lib/share";
import { Question, dimensionMeta } from "@/data/questions";
import ProgressBar from "@/components/ProgressBar";
import QuizCard from "@/components/QuizCard";

function DimIndicator({
  dim,
  label,
  tendency,
  color,
  confidence,
}: {
  dim: string;
  label: string;
  tendency: string;
  color: string;
  confidence: number;
}) {
  return (
    <div className="flex flex-col items-center gap-1">
      <span className="text-[10px] font-mono text-foreground/40">{label}</span>
      <div className="relative w-10 h-10">
        <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
          <circle
            cx="18"
            cy="18"
            r="15"
            fill="none"
            stroke="rgba(255,255,255,0.06)"
            strokeWidth="3"
          />
          <circle
            cx="18"
            cy="18"
            r="15"
            fill="none"
            stroke={color}
            strokeWidth="3"
            strokeDasharray={`${(confidence / 100) * 94.25} 94.25`}
            strokeLinecap="round"
            opacity={0.7}
          />
        </svg>
        <span className="absolute inset-0 flex items-center justify-center text-xs font-mono" style={{ color }}>
          {tendency.charAt(0)}
        </span>
      </div>
      <span className="text-[9px] font-mono" style={{ color: confidence > 60 ? color : "rgba(224,224,224,0.3)" }}>
        {Math.round(confidence)}%
      </span>
    </div>
  );
}

export default function QuizPage() {
  const router = useRouter();
  const engineRef = useRef(new AdaptiveEngine());
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(
    null
  );
  const [progress, setProgress] = useState(engineRef.current.getProgress());
  const [started, setStarted] = useState(false);
  const [questionKey, setQuestionKey] = useState(0);

  const startQuiz = useCallback(() => {
    const q = engineRef.current.nextQuestion();
    setCurrentQuestion(q);
    setStarted(true);
  }, []);

  const handleSelect = useCallback(
    (value: "A" | "B") => {
      if (!currentQuestion) return;

      engineRef.current.recordAnswer(currentQuestion.id, value, currentQuestion.dimension);

      setTimeout(() => {
        const nextQ = engineRef.current.nextQuestion();
        setProgress(engineRef.current.getProgress());

        if (nextQ) {
          setCurrentQuestion(nextQ);
          setQuestionKey((k) => k + 1);
        } else {
          const result = engineRef.current.getFinalResult();
          saveResultToLocal(result.code);
          router.push(`/result?type=${result.code}`);
        }
      }, 350);
    },
    [currentQuestion, router]
  );

  if (!started) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4 py-8 relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,212,255,0.03)_0%,transparent_70%)]" />
        <div className="relative z-10 max-w-md w-full text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h2 className="text-2xl font-bold mb-3 gradient-text">
              自适应测试
            </h2>
            <p className="text-foreground/60 text-sm mb-2">
              KGTI 会根据你的回答动态调整题目
            </p>
            <p className="text-foreground/40 text-xs mb-8 leading-relaxed">
              如果某个维度倾向明显，我们会跳过重复提问；
              <br />
              如果模糊不清，我们会深入追问。8-16题即可精准定位。
            </p>
            <div className="grid grid-cols-2 gap-3 mb-8 text-left">
              {(["FI", "SC", "RE", "DN"] as const).map((d) => {
                const m = dimensionMeta[d];
                return (
                  <div key={d} className="glass-card rounded-lg p-3">
                    <p className="text-xs font-mono text-foreground/50 mb-1">
                      {m.label}
                    </p>
                    <p className="text-xs" style={{ color: m.colorA }}>
                      {m.sideA}
                    </p>
                    <p className="text-[10px] text-foreground/30">vs</p>
                    <p className="text-xs" style={{ color: m.colorB }}>
                      {m.sideB}
                    </p>
                  </div>
                );
              })}
            </div>
            <motion.button
              onClick={startQuiz}
              className="px-10 py-4 rounded-full bg-neon-blue/10 border border-neon-blue/40 text-neon-blue text-lg font-semibold tracking-wide hover:bg-neon-blue/20 hover:border-neon-blue/70 hover:shadow-[0_0_30px_rgba(0,212,255,0.3)] breathe-glow transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              开始测试 →
            </motion.button>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-8 relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,212,255,0.03)_0%,transparent_70%)]" />

      <div className="relative z-10 w-full max-w-lg">
        <ProgressBar
          current={progress.totalAnswered}
          total={progress.estimatedTotal}
        />

        <div className="flex justify-center gap-4 sm:gap-6 mb-6">
          {progress.dims.map((d) => (
            <DimIndicator
              key={d.dimension}
              dim={d.dimension}
              label={d.label}
              tendency={d.tendency}
              color={d.color}
              confidence={d.confidence}
            />
          ))}
        </div>

        {currentQuestion && (
          <AnimatePresence mode="wait">
            <QuizCard
              key={questionKey}
              question={currentQuestion}
              onSelect={handleSelect}
              index={progress.totalAnswered}
            />
          </AnimatePresence>
        )}

        <p className="text-center text-xs text-foreground/30 mt-6 font-mono">
          KGTI · Adaptive · Question {progress.totalAnswered}
        </p>
      </div>
    </div>
  );
}
