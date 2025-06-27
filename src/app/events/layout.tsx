import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "イベント一覧",
  description: "デザインギルドが開催するクリエイター向けイベント情報をご紹介します。ネットワーキングイベント、ワークショップ、勉強会など、デザイン業界のプロフェッショナルが集まる様々なイベントを開催しています。",
  keywords: ["イベント", "ワークショップ", "ネットワーキング", "勉強会", "セミナー", "デザイン", "クリエイター"],
  openGraph: {
    title: "イベント一覧 | デザインギルド", 
    description: "デザインギルドが開催するクリエイター向けイベント情報をご紹介します。",
    url: "/events",
  },
};

export default function EventsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}