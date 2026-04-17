"use client";

import html2canvas from "html2canvas";

export async function captureResultCard(
  elementId: string
): Promise<string | null> {
  const element = document.getElementById(elementId);
  if (!element) return null;

  try {
    const canvas = await html2canvas(element, {
      backgroundColor: "#0a0a0f",
      scale: 2,
      useCORS: true,
      logging: false,
    });
    return canvas.toDataURL("image/png");
  } catch {
    return null;
  }
}

export function downloadImage(dataUrl: string, filename: string) {
  const link = document.createElement("a");
  link.href = dataUrl;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export function generateShareText(code: string, name: string): string {
  return `我在 KGTI 港科广人格测试中的结果是 ${code}「${name}」！快来测测你是哪种科广人 👉`;
}

export function copyToClipboard(text: string): Promise<boolean> {
  return navigator.clipboard
    .writeText(text)
    .then(() => true)
    .catch(() => false);
}

export function saveResultToLocal(code: string) {
  const existing = JSON.parse(localStorage.getItem("kgti_results") || "[]");
  if (!existing.includes(code)) {
    existing.push(code);
    localStorage.setItem("kgti_results", JSON.stringify(existing));
  }
}

export function getSavedResults(): string[] {
  return JSON.parse(localStorage.getItem("kgti_results") || "[]");
}
