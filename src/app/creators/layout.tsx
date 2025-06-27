import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "クリエイター一覧",
  description: "デザインギルドで活躍する才能豊かなクリエイターたちをご紹介します。グラフィックデザイナー、イラストレーター、ブランドデザイナーなど、各分野の専門家のプロフィールとポートフォリオをご覧いただけます。",
  keywords: ["クリエイター", "デザイナー", "イラストレーター", "ポートフォリオ", "グラフィックデザイン", "ブランディング"],
  openGraph: {
    title: "クリエイター一覧 | デザインギルド",
    description: "デザインギルドで活躍する才能豊かなクリエイターたちをご紹介します。",
    url: "/creators",
  },
};

export default function CreatorsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}