export default function ManagePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header - Static */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-blue-600">管理パネル</h1>
              <p className="text-sm text-gray-600">イベント・クリエイター管理システム（静的版）</p>
            </div>
            <a 
              href="/"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              ← ホームに戻る
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Success Alert - Static */}
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
          <div className="flex items-center">
            <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
            <span className="font-medium text-green-800">✅ 管理画面が正常に動作中</span>
          </div>
          <p className="text-green-700 text-sm mt-1">
            この管理画面は/manageのパスで静的HTMLとして確実に動作します
          </p>
        </div>

        {/* Stats Cards - Static */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="text-3xl font-bold text-blue-600">127</div>
            <div className="text-sm text-blue-700 mt-1">総イベント数</div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="text-3xl font-bold text-green-600">1,248</div>
            <div className="text-sm text-green-700 mt-1">総参加者数</div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="text-3xl font-bold text-purple-600">86</div>
            <div className="text-sm text-purple-700 mt-1">登録クリエイター数</div>
          </div>
        </div>

        {/* Event Management Section - Static */}
        <div className="bg-white rounded-lg shadow-sm mb-6">
          <div className="p-6 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">📅 イベント管理</h2>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                + 新しいイベント作成
              </button>
            </div>
          </div>
          
          <div className="p-6">
            <div className="space-y-4">
              <div className="p-4 border border-gray-200 rounded-lg">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">UI/UXデザインワークショップ</h3>
                    <div className="flex items-center mt-2 text-sm text-gray-600 space-x-4">
                      <span>📅 2024-07-15</span>
                      <span>👥 25名参加</span>
                      <span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-700">
                        受付中
                      </span>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition-colors">
                      編集
                    </button>
                    <button className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors">
                      詳細
                    </button>
                  </div>
                </div>
              </div>

              <div className="p-4 border border-gray-200 rounded-lg">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">ブランディングセミナー</h3>
                    <div className="flex items-center mt-2 text-sm text-gray-600 space-x-4">
                      <span>📅 2024-07-20</span>
                      <span>👥 42名参加</span>
                      <span className="px-2 py-1 rounded-full text-xs bg-red-100 text-red-700">
                        満席
                      </span>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition-colors">
                      編集
                    </button>
                    <button className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors">
                      詳細
                    </button>
                  </div>
                </div>
              </div>

              <div className="p-4 border border-gray-200 rounded-lg">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">ポートフォリオレビュー会</h3>
                    <div className="flex items-center mt-2 text-sm text-gray-600 space-x-4">
                      <span>📅 2024-07-25</span>
                      <span>👥 18名参加</span>
                      <span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-700">
                        受付中
                      </span>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition-colors">
                      編集
                    </button>
                    <button className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors">
                      詳細
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Creator Management Section - Static */}
        <div className="bg-white rounded-lg shadow-sm mb-6">
          <div className="p-6 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">👥 クリエイター管理</h2>
              <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                + 新しいクリエイター追加
              </button>
            </div>
          </div>
          
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-medium">
                    田中
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">田中 美咲</h3>
                    <p className="text-sm text-gray-600">UI/UXデザイナー</p>
                  </div>
                </div>
                <div className="text-sm text-gray-600 space-y-1">
                  <div>スキル: Figma, Sketch</div>
                  <div>プロジェクト: 12件</div>
                </div>
                <div className="mt-3 flex space-x-2">
                  <button className="px-3 py-1 text-sm bg-purple-100 text-purple-700 rounded hover:bg-purple-200 transition-colors">
                    編集
                  </button>
                  <button className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors">
                    詳細
                  </button>
                </div>
              </div>

              <div className="p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center text-white font-medium">
                    佐藤
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">佐藤 健太</h3>
                    <p className="text-sm text-gray-600">グラフィックデザイナー</p>
                  </div>
                </div>
                <div className="text-sm text-gray-600 space-y-1">
                  <div>スキル: Photoshop, Illustrator</div>
                  <div>プロジェクト: 8件</div>
                </div>
                <div className="mt-3 flex space-x-2">
                  <button className="px-3 py-1 text-sm bg-purple-100 text-purple-700 rounded hover:bg-purple-200 transition-colors">
                    編集
                  </button>
                  <button className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors">
                    詳細
                  </button>
                </div>
              </div>

              <div className="p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-pink-400 to-red-500 rounded-full flex items-center justify-center text-white font-medium">
                    山田
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">山田 花子</h3>
                    <p className="text-sm text-gray-600">イラストレーター</p>
                  </div>
                </div>
                <div className="text-sm text-gray-600 space-y-1">
                  <div>スキル: Procreate, Clip Studio</div>
                  <div>プロジェクト: 15件</div>
                </div>
                <div className="mt-3 flex space-x-2">
                  <button className="px-3 py-1 text-sm bg-purple-100 text-purple-700 rounded hover:bg-purple-200 transition-colors">
                    編集
                  </button>
                  <button className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors">
                    詳細
                  </button>
                </div>
              </div>

              <div className="p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-white font-medium">
                    鈴木
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">鈴木 太郎</h3>
                    <p className="text-sm text-gray-600">ブランドデザイナー</p>
                  </div>
                </div>
                <div className="text-sm text-gray-600 space-y-1">
                  <div>スキル: After Effects, Cinema 4D</div>
                  <div>プロジェクト: 6件</div>
                </div>
                <div className="mt-3 flex space-x-2">
                  <button className="px-3 py-1 text-sm bg-purple-100 text-purple-700 rounded hover:bg-purple-200 transition-colors">
                    編集
                  </button>
                  <button className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors">
                    詳細
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* System Status - Static */}
        <div className="bg-white rounded-lg shadow-sm">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold">⚙️ システム状況</h2>
          </div>
          
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-medium text-gray-900 mb-3">システム状態</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-2 bg-green-50 rounded">
                    <span className="text-sm text-green-800">ウェブサイト</span>
                    <span className="text-xs text-green-600">✅ 正常</span>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-blue-50 rounded">
                    <span className="text-sm text-blue-800">管理画面</span>
                    <span className="text-xs text-blue-600">✅ 動作中</span>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                    <span className="text-sm text-gray-800">データベース</span>
                    <span className="text-xs text-gray-600">📄 スタティック</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="font-medium text-gray-900 mb-3">設定情報</h3>
                <div className="space-y-1 text-sm text-gray-600">
                  <div>• プラットフォーム: Vercel</div>
                  <div>• フレームワーク: Next.js 15.3</div>
                  <div>• データ管理: スタティックファイル</div>
                  <div>• 更新方式: Git Push → 自動デプロイ</div>
                  <div>• 認証: 不要（シンプル版）</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}