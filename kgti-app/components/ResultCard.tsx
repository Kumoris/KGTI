"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { personalities } from "@/data/personalities";
import { PersonalityCode } from "@/data/personalities";
import { captureResultCard, downloadImage, generateShareText, copyToClipboard } from "@/lib/share";
import RadarChart from "@/components/RadarChart";
import Link from "next/link";

export default function ResultCard({ code }: { code: PersonalityCode }) {
  const [showShare, setShowShare] = useState(false);
  const [copied, setCopied] = useState(false);
  const personality = personalities[code];

  const handleSaveImage = useCallback(async () => {
    const dataUrl = await captureResultCard("result-card");
    if (dataUrl) {
      downloadImage(dataUrl, `KGTI-${code}.png`);
    }
  }, [code]);

  const handleCopyLink = useCallback(async () => {
    const text = generateShareText(code, personality.name) + ` ${typeof window !== "undefined" ? window.location.href : ""}`;
    const ok = await copyToClipboard(text);
    if (ok) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, [code, personality.name]);

  return (
    <div className="flex flex-col items-center">
      <div
        id="result-card"
        className="w-full max-w-md bg-deep-black p-6 sm:p-8 rounded-2xl"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, type: "spring" }}
          className="flex flex-col items-center text-center"
        >
          <motion.span
            className="text-6xl mb-4"
            initial={{ rotate: -180, scale: 0 }}
            animate={{ rotate: 0, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6, type: "spring" }}
          >
            {personality.emoji}
          </motion.span>

          <h1
            className="text-4xl sm:text-5xl font-bold font-mono mb-2"
            style={{ color: personality.color }}
          >
            {code}
          </h1>
          <h2 className="text-2xl sm:text-3xl font-semibold mb-3">
            {personality.name}
          </h2>
          <p className="text-sm text-foreground/60 font-mono mb-6 italic">
            &ldquo;{personality.tagline}&rdquo;
          </p>

          <div className="w-full glass-card rounded-xl p-4 mb-6 text-left">
            <p className="text-sm sm:text-base leading-relaxed text-foreground/80">
              {personality.description}
            </p>
          </div>

          <div className="w-full glass-card rounded-xl p-4 mb-6 text-left">
            <p className="text-xs text-neon-blue/60 font-mono mb-1">
              📍 校园场景
            </p>
            <p className="text-sm text-foreground/70 leading-relaxed">
              {personality.campusScene}
            </p>
          </div>

          <div className="mb-6">
            <RadarChart
              values={personality.radarValues}
              labels={["实干", "架构", "探索", "昼型"]}
              size={200}
            />
          </div>

          <div className="w-full glass-card rounded-xl p-4 text-left space-y-2">
            <p className="text-xs text-foreground/50 font-mono">兼容类型</p>
            <div className="flex gap-2 flex-wrap">
              {personality.compatibleTypes.map((t) => {
                const tp = personalities[t];
                return (
                  <Link
                    key={t}
                    href={`/result?type=${t}`}
                    className="px-3 py-1 rounded-full text-xs font-mono border border-card-border hover:border-neon-blue/40 transition-colors"
                    style={{ color: tp.color }}
                  >
                    {tp.emoji} {t}
                  </Link>
                );
              })}
            </div>
            <p className="text-xs text-foreground/50 font-mono pt-2">
              明星类比
            </p>
            <p className="text-sm text-neon-gold/80">{personality.celebrity}</p>
          </div>
        </motion.div>
      </div>

      <div className="mt-8 flex flex-wrap gap-3 justify-center max-w-md">
        <motion.button
          onClick={handleSaveImage}
          className="px-6 py-3 rounded-full border border-neon-blue/40 text-neon-blue text-sm hover:bg-neon-blue/10 transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          📸 保存结果卡片
        </motion.button>
        <motion.button
          onClick={() => setShowShare(true)}
          className="px-6 py-3 rounded-full border border-neon-purple/40 text-neon-purple text-sm hover:bg-neon-purple/10 transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          🔗 分享给朋友
        </motion.button>
        <Link
          href="/gallery"
          className="px-6 py-3 rounded-full border border-neon-gold/40 text-neon-gold text-sm hover:bg-neon-gold/10 transition-colors"
        >
          🗂️ 查看16型图鉴
        </Link>
        <Link
          href="/quiz"
          className="px-6 py-3 rounded-full border border-neon-pink/40 text-neon-pink text-sm hover:bg-neon-pink/10 transition-colors"
        >
          🔄 再测一次
        </Link>
      </div>

      <AnimatePresence>
        {showShare && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4"
            onClick={() => setShowShare(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="glass-card rounded-2xl p-6 max-w-sm w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-lg font-semibold mb-4 text-center">
                分享你的结果
              </h3>
              <div className="flex flex-col gap-3">
                <button
                  onClick={handleSaveImage}
                  className="w-full p-3 rounded-xl border border-neon-blue/30 text-neon-blue text-sm hover:bg-neon-blue/10 transition-colors text-left"
                >
                  📱 长按保存图片 → 发微信朋友圈
                </button>
                <button
                  onClick={handleCopyLink}
                  className="w-full p-3 rounded-xl border border-neon-purple/30 text-neon-purple text-sm hover:bg-neon-purple/10 transition-colors text-left"
                >
                  {copied ? "✅ 已复制" : "📋 复制分享文案"}
                </button>
              </div>
              <button
                onClick={() => setShowShare(false)}
                className="mt-4 w-full p-2 text-xs text-foreground/40 hover:text-foreground/60 transition-colors"
              >
                关闭
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
