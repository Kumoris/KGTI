"use client";

import { motion } from "framer-motion";
import { Question } from "@/data/questions";

interface QuizCardProps {
  question: Question;
  onSelect: (value: "A" | "B") => void;
  index: number;
}

export default function QuizCard({ question, onSelect, index }: QuizCardProps) {
  return (
    <motion.div
      key={question.id}
      initial={{ opacity: 0, x: 60 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -60 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="w-full"
    >
      <div className="glass-card rounded-2xl p-6 sm:p-8">
        <div className="flex items-center gap-2 mb-4">
          <span className="text-xs font-mono px-2 py-1 rounded bg-neon-purple/20 text-neon-purple border border-neon-purple/30">
            {question.dimensionLabel}
          </span>
          {question.level >= 2 && (
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-neon-blue/15 text-neon-blue/70 border border-neon-blue/20">
              深入追问 Lv.{question.level}
            </span>
          )}
        </div>

        <h2 className="text-xl sm:text-2xl font-semibold mb-8 leading-relaxed">
          {question.text}
        </h2>

        <div className="flex flex-col gap-4">
          {question.options.map((opt) => (
            <motion.button
              key={opt.value}
              onClick={() => onSelect(opt.value)}
              className="w-full text-left p-5 rounded-xl border border-card-border bg-foreground/5 hover:bg-neon-blue/10 hover:border-neon-blue/50 hover:shadow-[0_0_20px_rgba(0,212,255,0.15)] transition-all duration-200 group"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="flex items-center gap-4">
                <span className="w-8 h-8 rounded-full border border-neon-blue/40 flex items-center justify-center text-sm font-mono text-neon-blue/70 group-hover:bg-neon-blue/20 group-hover:border-neon-blue/70 transition-colors">
                  {opt.value}
                </span>
                <span className="text-base sm:text-lg">{opt.text}</span>
              </span>
            </motion.button>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
