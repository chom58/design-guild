'use client';

import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Card } from '@/components/ui/Card';
import { getAllCreators } from '@/lib/data';

export default function CreatorsPage() {
  const creators = getAllCreators();

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Page Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">クリエイター一覧</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            デザインギルドで活躍する才能豊かなクリエイターたちをご紹介します。
            各クリエイターの詳細プロフィールやポートフォリオをご覧いただけます。
          </p>
        </div>

        {/* Creators Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {creators.map((creator) => (
            <Card
              key={creator.id}
              id={creator.id}
              name={creator.name}
              profession={creator.profession}
              skills={creator.skills}
              onClick={(id) => {
                // Navigate to creator detail page
                window.location.href = `/creators/${id}`;
              }}
            />
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              クリエイターとして参加しませんか？
            </h2>
            <p className="text-gray-600 mb-6">
              デザインギルドでは新しいメンバーを募集しています。
              あなたの才能を活かして、一緒にクリエイティブなコミュニティを築きましょう。
            </p>
            <a 
              href="/contact"
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
            >
              参加の申し込み
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}