'use client';

import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Creator } from '@/lib/types';

// Sample creator data
const featuredCreators: Creator[] = [
  {
    id: '1',
    name: '田中 美咲',
    profileImage: '/images/creators/tanaka.jpg',
    profession: 'グラフィックデザイナー',
    bio: 'ブランディングとグラフィックデザインを専門とし、10年以上の経験を持つ。',
    skills: ['graphic', 'branding'],
    portfolio: [
      { title: 'ブランドアイデンティティ', image: '/images/portfolio/brand1.jpg', description: 'スタートアップ企業のブランディング' }
    ],
    social: { twitter: 'tanaka_design', instagram: 'tanaka.design' },
    email: 'tanaka@example.com'
  },
  {
    id: '2',
    name: '佐藤 健太',
    profileImage: '/images/creators/sato.jpg',
    profession: 'イラストレーター',
    bio: 'キャラクターデザインとイラストレーションを得意とするクリエイター。',
    skills: ['illustration'],
    portfolio: [
      { title: 'キャラクターデザイン', image: '/images/portfolio/character1.jpg', description: 'ゲーム用キャラクターデザイン' }
    ],
    social: { instagram: 'sato.illust', website: 'https://sato-illust.com' },
    email: 'sato@example.com'
  },
  {
    id: '3',
    name: '山田 あかり',
    profileImage: '/images/creators/yamada.jpg',
    profession: 'ブランドデザイナー',
    bio: 'ブランド戦略とビジュアルアイデンティティの専門家。',
    skills: ['branding', 'graphic'],
    portfolio: [
      { title: 'ブランド戦略', image: '/images/portfolio/strategy1.jpg', description: 'コーポレートブランディング' }
    ],
    social: { linkedin: 'yamada-akari', website: 'https://yamada-brand.com' },
    email: 'yamada@example.com'
  },
  {
    id: '4',
    name: '鈴木 翔太',
    profileImage: '/images/creators/suzuki.jpg',
    profession: 'UIデザイナー',
    bio: 'ユーザーエクスペリエンスを重視したUIデザインを手がける。',
    skills: ['graphic'],
    portfolio: [
      { title: 'モバイルアプリUI', image: '/images/portfolio/mobile1.jpg', description: 'ECアプリのUIデザイン' }
    ],
    social: { twitter: 'suzuki_ui', linkedin: 'suzuki-shota' },
    email: 'suzuki@example.com'
  },
  {
    id: '5',
    name: '高橋 みゆき',
    profileImage: '/images/creators/takahashi.jpg',
    profession: 'イラストレーター',
    bio: '水彩画タッチのイラストレーションを専門とする。',
    skills: ['illustration'],
    portfolio: [
      { title: '水彩イラスト', image: '/images/portfolio/watercolor1.jpg', description: '書籍挿絵イラスト' }
    ],
    social: { instagram: 'takahashi.art', website: 'https://takahashi-art.com' },
    email: 'takahashi@example.com'
  },
  {
    id: '6',
    name: '中村 大輔',
    profileImage: '/images/creators/nakamura.jpg',
    profession: 'ブランドコンサルタント',
    bio: 'ブランド戦略からビジュアルまで一貫したブランディングを提供。',
    skills: ['branding', 'graphic'],
    portfolio: [
      { title: 'ブランドコンサルティング', image: '/images/portfolio/consulting1.jpg', description: '企業ブランド再構築' }
    ],
    social: { linkedin: 'nakamura-daisuke', twitter: 'nakamura_brand' },
    email: 'nakamura@example.com'
  }
];

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-blue-50 to-purple-50 py-20 px-4">
          <div className="max-w-7xl mx-auto text-center">
            <div className="mb-6">
              <span className="inline-block bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-4">
                🎉 次回イベント開催決定！
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              デザインギルド
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
              クリエイターとの出会いを創り出す<br />
              デザインコミュニティプラットフォーム
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="shadow-lg">
                イベントに参加する
              </Button>
              <Button variant="outline" size="lg">
                クリエイターを探す
              </Button>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className="py-20 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                デザインギルドとは
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                デザインギルドは、才能あるクリエイターと素晴らしいプロジェクトを結ぶプラットフォームです。
                定期的なイベントとネットワーキングを通じて、デザイン業界の未来を一緒に築いていきます。
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">コミュニティ</h3>
                <p className="text-gray-600">
                  同じ志を持つクリエイター同士が繋がり、刺激し合える環境を提供します。
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">スキルアップ</h3>
                <p className="text-gray-600">
                  ワークショップや勉強会を通じて、最新のデザイントレンドとスキルを学べます。
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m8 6V9a2 2 0 00-2-2H10a2 2 0 00-2 2v3.1M15 13l-3-3-3 3" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">キャリア</h3>
                <p className="text-gray-600">
                  プロジェクトマッチングや転職支援を通じて、キャリアアップをサポートします。
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Creators Section */}
        <section className="py-20 px-4 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                注目のクリエイター
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                デザインギルドで活躍する才能豊かなクリエイターたちをご紹介します。
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredCreators.map((creator) => (
                <Card
                  key={creator.id}
                  id={creator.id}
                  name={creator.name}
                  profession={creator.profession}
                  profileImage={creator.profileImage}
                  portfolioImage={creator.portfolio[0]?.image || '/images/placeholder.jpg'}
                  skills={creator.skills}
                  onClick={(id) => console.log(`Clicked creator: ${id}`)}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Next Event Section */}
        <section className="py-20 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 md:p-12 text-white">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <h2 className="text-3xl md:text-4xl font-bold mb-4">
                    次回イベント
                  </h2>
                  <h3 className="text-xl md:text-2xl mb-4">
                    クリエイティブ・ネットワーキング 2024
                  </h3>
                  <p className="text-blue-100 mb-6">
                    デザイン業界のトレンドセッションと交流会を開催。
                    新しい出会いとインスピレーションを見つけませんか？
                  </p>
                  <div className="space-y-2 mb-6">
                    <p className="flex items-center">
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      2024年7月15日（土）14:00-18:00
                    </p>
                    <p className="flex items-center">
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      東京・渋谷クリエイティブセンター
                    </p>
                  </div>
                  <Button variant="secondary" size="lg">
                    詳細を見る
                  </Button>
                </div>
                <div className="relative">
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                    <h4 className="text-lg font-semibold mb-4">参加者特典</h4>
                    <ul className="space-y-2 text-blue-100">
                      <li className="flex items-center">
                        <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        業界著名人による講演
                      </li>
                      <li className="flex items-center">
                        <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        ポートフォリオレビュー
                      </li>
                      <li className="flex items-center">
                        <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        交流会・ドリンク付き
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact/Signup CTA Section */}
        <section className="py-20 px-4 bg-gray-900">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              デザインギルドに参加しませんか？
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              クリエイターとしてのキャリアを次のレベルへ。
              今すぐコミュニティに参加して、新しい可能性を発見しましょう。
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="primary" size="lg" className="bg-blue-600 hover:bg-blue-700">
                今すぐ参加する
              </Button>
              <Button variant="outline" size="lg" className="border-gray-300 text-gray-300 hover:bg-gray-800">
                詳細を見る
              </Button>
            </div>
            <p className="text-sm text-gray-400 mt-6">
              参加費無料 • いつでも退会可能 • プライバシー保護
            </p>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}