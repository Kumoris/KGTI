"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { personalityList } from "@/data/personalities";
import ParticleBg from "@/components/ParticleBg";

export default function Home() {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <ParticleBg />
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center px-6 py-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h1 className="text-6xl sm:text-8xl font-bold font-mono tracking-wider mb-2 gradient-text">
            KGTI
          </h1>
          <p className="text-lg sm:text-xl text-neon-blue/80 font-mono tracking-widest neon-text-blue mb-8">
            港科广人格图谱
          </p>
        </motion.div>

        <motion.p
          className="text-base sm:text-lg text-foreground/70 max-w-md mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          12道趣味测试，解锁你的港科大（广州）专属人格
          <br />
          发现你的科广DNA，找到同好
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.7, duration: 0.5 }}
        >
          <Link
            href="/quiz"
            className="inline-flex items-center gap-3 px-10 py-4 rounded-full bg-neon-blue/10 border border-neon-blue/40 text-neon-blue text-lg font-semibold tracking-wide transition-all duration-300 hover:bg-neon-blue/20 hover:border-neon-blue/70 hover:shadow-[0_0_30px_rgba(0,212,255,0.3)] breathe-glow"
          >
            开始测试
            <span className="text-2xl">→</span>
          </Link>
        </motion.div>

        <motion.div
          className="mt-20 w-full max-w-3xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.0, duration: 0.8 }}
        >
          <p className="text-sm text-foreground/40 mb-4 font-mono">
            16 TYPES OF HKUST(GZ) PERSONALITY
          </p>
          <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
            {personalityList.map((p, i) => (
              <motion.div
                key={p.code}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.2 + i * 0.05, duration: 0.3 }}
                className="glass-card rounded-lg p-2 text-center cursor-default hover:scale-110 transition-transform"
                title={`${p.name} (${p.code})`}
              >
                <span className="text-lg">{p.emoji}</span>
                <p className="text-[10px] text-foreground/50 font-mono mt-1">
                  {p.code}
                </p>
              </motion.div>
            ))}
          </div>
          <Link
            href="/gallery"
            className="mt-6 inline-block text-sm text-neon-blue/60 hover:text-neon-blue transition-colors font-mono"
          >
            查看全部16型 →
          </Link>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-deep-black to-transparent z-10 pointer-events-none" />
    </div>
  );
}
