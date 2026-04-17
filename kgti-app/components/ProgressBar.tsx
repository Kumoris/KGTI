"use client";

import { motion } from "framer-motion";

interface ProgressBarProps {
  current: number;
  total: number;
}

export default function ProgressBar({ current, total }: ProgressBarProps) {
  const pct = (current / total) * 100;

  return (
    <div className="w-full mb-8">
      <div className="flex justify-between items-center mb-2">
        <span className="text-xs font-mono text-foreground/50">
          {current} / {total}
        </span>
        <span className="text-xs font-mono text-neon-blue/60">
          {Math.round(pct)}%
        </span>
      </div>
      <div className="w-full h-1.5 bg-foreground/10 rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{
            background: "linear-gradient(90deg, #00d4ff, #a855f7, #ff2d95)",
          }}
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}
