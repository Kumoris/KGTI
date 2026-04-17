import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "KGTI — 港科广人格图谱",
  description:
    "发现你的港科大（广州）专属人格！12道趣味测试题，16种科广人身份，找到你的同好",
  keywords: ["KGTI", "港科广", "MBTI", "人格测试", "HKUSTGZ", "香港科技大学广州"],
  openGraph: {
    title: "KGTI — 港科广人格图谱",
    description: "发现你的科广DNA，找到同好！",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="zh-CN"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-deep-black text-foreground">
        {children}
      </body>
    </html>
  );
}
