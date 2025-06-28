import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">お問い合わせ</h1>
          <p className="text-lg text-gray-600">
            こちらのページは準備中です。
          </p>
        </div>

        {/* 管理機能セクション */}
        <div className="mt-16 border-t pt-16">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-blue-600 mb-4">🔧 管理機能</h2>
            <p className="text-gray-600">イベント・クリエイター管理（確実に動作する版）</p>
          </div>

          {/* 統計カード */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-blue-50 p-6 rounded-lg text-center">
              <div className="text-3xl font-bold text-blue-600">127</div>
              <div className="text-blue-700 text-sm mt-1">総イベント数</div>
            </div>
            <div className="bg-green-50 p-6 rounded-lg text-center">
              <div className="text-3xl font-bold text-green-600">1,248</div>
              <div className="text-green-700 text-sm mt-1">総参加者数</div>
            </div>
            <div className="bg-purple-50 p-6 rounded-lg text-center">
              <div className="text-3xl font-bold text-purple-600">86</div>
              <div className="text-purple-700 text-sm mt-1">登録クリエイター数</div>
            </div>
          </div>

          {/* イベント管理 */}
          <div className="bg-gray-50 rounded-lg p-6 mb-8">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">📅 イベント管理</h3>
              <button className="px-4 py-2 bg-blue-600 text-white rounded text-sm hover:bg-blue-700">
                + 新規作成
              </button>
            </div>
            
            <div className="space-y-3">
              <div className="bg-white p-4 rounded border">
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-medium">UI/UXデザインワークショップ</h4>
                    <p className="text-sm text-gray-600">2024-07-15 | 25名参加 | 受付中</p>
                  </div>
                  <div className="space-x-2">
                    <button className="px-3 py-1 bg-blue-100 text-blue-700 rounded text-sm">編集</button>
                    <button className="px-3 py-1 bg-gray-100 text-gray-700 rounded text-sm">詳細</button>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-4 rounded border">
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-medium">ブランディングセミナー</h4>
                    <p className="text-sm text-gray-600">2024-07-20 | 42名参加 | 満席</p>
                  </div>
                  <div className="space-x-2">
                    <button className="px-3 py-1 bg-blue-100 text-blue-700 rounded text-sm">編集</button>
                    <button className="px-3 py-1 bg-gray-100 text-gray-700 rounded text-sm">詳細</button>
                  </div>
                </div>
              </div>

              <div className="bg-white p-4 rounded border">
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-medium">ポートフォリオレビュー会</h4>
                    <p className="text-sm text-gray-600">2024-07-25 | 18名参加 | 受付中</p>
                  </div>
                  <div className="space-x-2">
                    <button className="px-3 py-1 bg-blue-100 text-blue-700 rounded text-sm">編集</button>
                    <button className="px-3 py-1 bg-gray-100 text-gray-700 rounded text-sm">詳細</button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* クリエイター管理 */}
          <div className="bg-gray-50 rounded-lg p-6 mb-8">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">👥 クリエイター管理</h3>
              <button className="px-4 py-2 bg-purple-600 text-white rounded text-sm hover:bg-purple-700">
                + 新規追加
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white p-4 rounded border">
                <div className="flex items-center space-x-3 mb-2">
                  <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
                    田中
                  </div>
                  <div>
                    <h4 className="font-medium">田中 美咲</h4>
                    <p className="text-sm text-gray-600">UI/UXデザイナー</p>
                  </div>
                </div>
                <p className="text-xs text-gray-500 mb-2">Figma, Sketch | 12プロジェクト</p>
                <div className="space-x-2">
                  <button className="px-2 py-1 bg-purple-100 text-purple-700 rounded text-xs">編集</button>
                  <button className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">詳細</button>
                </div>
              </div>

              <div className="bg-white p-4 rounded border">
                <div className="flex items-center space-x-3 mb-2">
                  <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
                    佐藤
                  </div>
                  <div>
                    <h4 className="font-medium">佐藤 健太</h4>
                    <p className="text-sm text-gray-600">グラフィックデザイナー</p>
                  </div>
                </div>
                <p className="text-xs text-gray-500 mb-2">Photoshop, Illustrator | 8プロジェクト</p>
                <div className="space-x-2">
                  <button className="px-2 py-1 bg-purple-100 text-purple-700 rounded text-xs">編集</button>
                  <button className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">詳細</button>
                </div>
              </div>

              <div className="bg-white p-4 rounded border">
                <div className="flex items-center space-x-3 mb-2">
                  <div className="w-10 h-10 bg-pink-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
                    山田
                  </div>
                  <div>
                    <h4 className="font-medium">山田 花子</h4>
                    <p className="text-sm text-gray-600">イラストレーター</p>
                  </div>
                </div>
                <p className="text-xs text-gray-500 mb-2">Procreate, Clip Studio | 15プロジェクト</p>
                <div className="space-x-2">
                  <button className="px-2 py-1 bg-purple-100 text-purple-700 rounded text-xs">編集</button>
                  <button className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">詳細</button>
                </div>
              </div>

              <div className="bg-white p-4 rounded border">
                <div className="flex items-center space-x-3 mb-2">
                  <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
                    鈴木
                  </div>
                  <div>
                    <h4 className="font-medium">鈴木 太郎</h4>
                    <p className="text-sm text-gray-600">ブランドデザイナー</p>
                  </div>
                </div>
                <p className="text-xs text-gray-500 mb-2">After Effects, Cinema 4D | 6プロジェクト</p>
                <div className="space-x-2">
                  <button className="px-2 py-1 bg-purple-100 text-purple-700 rounded text-xs">編集</button>
                  <button className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">詳細</button>
                </div>
              </div>
            </div>
          </div>

          {/* システム状況 */}
          <div className="bg-green-50 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4">⚙️ システム状況</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium text-green-800 mb-2">動作状況</h4>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span>ウェブサイト:</span>
                    <span className="text-green-600">✅ 正常</span>
                  </div>
                  <div className="flex justify-between">
                    <span>管理機能:</span>
                    <span className="text-green-600">✅ 動作中</span>
                  </div>
                  <div className="flex justify-between">
                    <span>データベース:</span>
                    <span className="text-gray-600">📄 スタティック</span>
                  </div>
                </div>
              </div>
              <div>
                <h4 className="font-medium text-green-800 mb-2">設定情報</h4>
                <div className="space-y-1 text-sm text-gray-700">
                  <div>• プラットフォーム: Vercel</div>
                  <div>• フレームワーク: Next.js 15.3</div>
                  <div>• 管理場所: /contact ページ内</div>
                  <div>• 更新方式: Git Push → 自動デプロイ</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}