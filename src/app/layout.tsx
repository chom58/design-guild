import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import AuthSessionProvider from "@/components/providers/SessionProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "デザインギルド | クリエイターコミュニティプラットフォーム",
    template: "%s | デザインギルド"
  },
  description: "デザインギルドは、才能あるクリエイターと素晴らしいプロジェクトを結ぶコミュニティプラットフォームです。グラフィックデザイナー、イラストレーター、ブランドデザイナーが集まり、定期的なイベントとネットワーキングを通じてデザイン業界の未来を築いています。",
  keywords: ["デザイン", "クリエイター", "グラフィックデザイン", "イラスト", "ブランディング", "ポートフォリオ", "コミュニティ", "イベント", "ネットワーキング"],
  authors: [{ name: "Design Guild Team" }],
  creator: "Design Guild",
  publisher: "Design Guild",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'ja_JP',
    url: 'https://design-guild.vercel.app',
    siteName: 'デザインギルド',
    title: 'デザインギルド | クリエイターコミュニティプラットフォーム',
    description: 'デザインギルドは、才能あるクリエイターと素晴らしいプロジェクトを結ぶコミュニティプラットフォームです。',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'デザインギルド - クリエイターコミュニティプラットフォーム',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'デザインギルド | クリエイターコミュニティプラットフォーム',
    description: 'デザインギルドは、才能あるクリエイターと素晴らしいプロジェクトを結ぶコミュニティプラットフォームです。',
    images: ['/og-image.png'],
    creator: '@designguild_jp',
  },
  verification: {
    google: 'your-google-verification-code',
  },
  category: 'technology',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthSessionProvider>
          {children}
        </AuthSessionProvider>
      </body>
    </html>
  );
}
