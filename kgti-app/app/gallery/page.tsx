"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { personalityList, personalities } from "@/data/personalities";
import { PersonalityCode } from "@/data/personalities";
import { getSavedResults } from "@/lib/share";
import Link from "next/link";

export default function GalleryPage() {
  const [saved, setSaved] = useState<string[]>([]);
  const [selected, setSelected] = useState<PersonalityCode | null>(null);

  useEffect(() => {
    setSaved(getSavedResults());
  }, []);

  return (
    <div className="min-h-screen px-4 py-12 relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(168,85,247,0.03)_0%,transparent_60%)]" />

      <div className="relative z-10 max-w-4xl mx-auto">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-3xl sm:text-4xl font-bold font-mono gradient-text mb-2">
            16 TYPES
          </h1>
          <p className="text-foreground/50 font-mono text-sm">
            港科广人格图鉴
          </p>
          <Link
            href="/quiz"
            className="inline-block mt-4 px-6 py-2 rounded-full border border-neon-blue/40 text-neon-blue text-sm hover:bg-neon-blue/10 transition-colors"
          >
            还没测？开始测试 →
          </Link>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {personalityList.map((p, i) => {
            const isTested = saved.includes(p.code);
            return (
              <motion.button
                key={p.code}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.04, duration: 0.3 }}
                onClick={() =>
                  setSelected(selected === p.code ? null : p.code)
                }
                className={`glass-card rounded-xl p-4 text-center transition-all duration-200 cursor-pointer ${
                  isTested
                    ? "border-neon-blue/50 shadow-[0_0_15px_rgba(0,212,255,0.1)]"
                    : ""
                } ${selected === p.code ? "scale-105 ring-1 ring-neon-blue/40" : "hover:scale-102"}`}
              >
                <span className="text-2xl">{p.emoji}</span>
                <p
                  className="text-sm font-mono font-bold mt-2"
                  style={{ color: p.color }}
                >
                  {p.code}
                </p>
                <p className="text-xs text-foreground/60 mt-1">{p.name}</p>
                {isTested && (
                  <span className="inline-block mt-1 text-[10px] px-2 py-0.5 rounded-full bg-neon-blue/15 text-neon-blue font-mono">
                    tested
                  </span>
                )}
              </motion.button>
            );
          })}
        </div>

        <AnimatePresence>
          {selected && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="mt-6 glass-card rounded-2xl p-6"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2
                    className="text-2xl font-bold font-mono"
                    style={{ color: personalities[selected].color }}
                  >
                    {personalities[selected].emoji} {selected}
                  </h2>
                  <p className="text-lg font-semibold">
                    {personalities[selected].name}
                  </p>
                </div>
                <button
                  onClick={() => setSelected(null)}
                  className="text-foreground/30 hover:text-foreground/60 text-xl transition-colors"
                >
                  ✕
                </button>
              </div>

              <p className="text-sm text-neon-blue/60 font-mono italic mb-3">
                &ldquo;{personalities[selected].tagline}&rdquo;
              </p>

              <p className="text-sm text-foreground/80 leading-relaxed mb-4">
                {personalities[selected].description}
              </p>

              <div className="bg-foreground/5 rounded-xl p-3 mb-3">
                <p className="text-xs text-neon-blue/60 font-mono mb-1">
                  📍 校园场景
                </p>
                <p className="text-sm text-foreground/70">
                  {personalities[selected].campusScene}
                </p>
              </div>

              <div className="flex gap-2 flex-wrap mb-3">
                <span className="text-xs text-foreground/40 font-mono">
                  兼容：
                </span>
                {personalities[selected].compatibleTypes.map((t) => (
                  <button
                    key={t}
                    onClick={() => setSelected(t)}
                    className="px-2 py-0.5 rounded text-xs font-mono border border-card-border hover:border-neon-blue/40 transition-colors"
                    style={{ color: personalities[t].color }}
                  >
                    {personalities[t].emoji} {t}
                  </button>
                ))}
              </div>

              <p className="text-xs text-neon-gold/70">
                🌟 明星类比：{personalities[selected].celebrity}
              </p>

              <Link
                href={`/result?type=${selected}`}
                className="mt-4 inline-block px-4 py-2 rounded-full border border-neon-blue/40 text-neon-blue text-sm hover:bg-neon-blue/10 transition-colors"
              >
                查看完整结果 →
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
