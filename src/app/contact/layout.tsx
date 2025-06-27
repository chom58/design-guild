import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "お問い合わせ",
  description: "デザインギルドへのお問い合わせページです。クリエイターとしての参加、イベントに関するご質問、お仕事のご依頼など、お気軽にご連絡ください。",
  keywords: ["お問い合わせ", "参加申し込み", "クリエイター募集", "イベント", "お仕事依頼"],
  openGraph: {
    title: "お問い合わせ | デザインギルド",
    description: "デザインギルドへのお問い合わせページです。お気軽にご連絡ください。",
    url: "/contact",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}