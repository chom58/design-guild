'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function EventsAdminPage() {
  const [activeTab, setActiveTab] = useState('events');
  const [showSecret, setShowSecret] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-blue-600">管理パネル</h1>
              <p className="text-sm text-gray-600">イベント・クリエイター管理システム</p>
            </div>
            <Link 
              href="/events"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              ← イベント一覧に戻る
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Success Alert */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6"
        >
          <div className="flex items-center">
            <div className="w-3 h-3 bg-green-500 rounded-full mr-3 animate-pulse"></div>
            <span className="font-medium text-green-800">✅ 管理画面が正常に動作中</span>
          </div>
          <p className="text-green-700 text-sm mt-1">
            この管理画面は/events/adminのパスで安定稼働しています
          </p>
        </motion.div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-sm mb-6">
          <div className="border-b border-gray-200">
            <div className="flex space-x-8 px-6">
              <button
                onClick={() => setActiveTab('events')}
                className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === 'events'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                📅 イベント管理
              </button>
              <button
                onClick={() => setActiveTab('creators')}
                className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === 'creators'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                👥 クリエイター管理
              </button>
              <button
                onClick={() => setActiveTab('analytics')}
                className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === 'analytics'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                📊 分析・統計
              </button>
              <button
                onClick={() => setActiveTab('settings')}
                className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === 'settings'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                ⚙️ システム設定
              </button>
            </div>
          </div>

          <div className="p-6">
            {activeTab === 'events' && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold">イベント管理</h2>
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    + 新しいイベント作成
                  </button>
                </div>
                
                <div className="space-y-4">
                  {[
                    { id: 1, title: 'UI/UXデザインワークショップ', date: '2024-07-15', participants: 25, status: '受付中' },
                    { id: 2, title: 'ブランディングセミナー', date: '2024-07-20', participants: 42, status: '満席' },
                    { id: 3, title: 'ポートフォリオレビュー会', date: '2024-07-25', participants: 18, status: '受付中' }
                  ].map((event) => (
                    <div key={event.id} className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h3 className="font-medium text-gray-900">{event.title}</h3>
                          <div className="flex items-center mt-2 text-sm text-gray-600 space-x-4">
                            <span>📅 {event.date}</span>
                            <span>👥 {event.participants}名参加</span>
                            <span className={`px-2 py-1 rounded-full text-xs ${
                              event.status === '受付中' 
                                ? 'bg-green-100 text-green-700' 
                                : 'bg-red-100 text-red-700'
                            }`}>
                              {event.status}
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
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === 'creators' && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold">クリエイター管理</h2>
                  <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                    + 新しいクリエイター追加
                  </button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { id: 1, name: '田中 美咲', role: 'UI/UXデザイナー', skills: 'Figma, Sketch', projects: 12 },
                    { id: 2, name: '佐藤 健太', role: 'グラフィックデザイナー', skills: 'Photoshop, Illustrator', projects: 8 },
                    { id: 3, name: '山田 花子', role: 'イラストレーター', skills: 'Procreate, Clip Studio', projects: 15 },
                    { id: 4, name: '鈴木 太郎', role: 'ブランドデザイナー', skills: 'After Effects, Cinema 4D', projects: 6 }
                  ].map((creator) => (
                    <div key={creator.id} className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                      <div className="flex items-center space-x-3 mb-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-medium">
                          {creator.name.split(' ')[0]}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium text-gray-900">{creator.name}</h3>
                          <p className="text-sm text-gray-600">{creator.role}</p>
                        </div>
                      </div>
                      <div className="text-sm text-gray-600 space-y-1">
                        <div>スキル: {creator.skills}</div>
                        <div>プロジェクト: {creator.projects}件</div>
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
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === 'analytics' && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className="text-xl font-semibold mb-6">分析・統計</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div className="p-6 bg-blue-50 rounded-lg">
                    <div className="text-3xl font-bold text-blue-600">127</div>
                    <div className="text-sm text-blue-700 mt-1">総イベント数</div>
                  </div>
                  <div className="p-6 bg-green-50 rounded-lg">
                    <div className="text-3xl font-bold text-green-600">1,248</div>
                    <div className="text-sm text-green-700 mt-1">総参加者数</div>
                  </div>
                  <div className="p-6 bg-purple-50 rounded-lg">
                    <div className="text-3xl font-bold text-purple-600">86</div>
                    <div className="text-sm text-purple-700 mt-1">登録クリエイター数</div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-6 border border-gray-200 rounded-lg">
                    <h3 className="font-medium mb-4">人気イベントタイプ</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">ワークショップ</span>
                        <span className="text-sm font-medium">45%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-blue-600 h-2 rounded-full" style={{ width: '45%' }}></div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-6 border border-gray-200 rounded-lg">
                    <h3 className="font-medium mb-4">月別参加者推移</h3>
                    <div className="text-sm text-gray-600">
                      前月比 +12% の成長を記録
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'settings' && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className="text-xl font-semibold mb-6">システム設定</h2>
                
                <div className="space-y-6">
                  <div className="p-6 border border-gray-200 rounded-lg">
                    <h3 className="font-medium text-gray-900 mb-4">現在の設定状況</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-gray-600">データソース:</span>
                          <span className="text-green-600 font-medium">スタティックファイル</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">WordPress連携:</span>
                          <span className="text-gray-500">無効</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">認証システム:</span>
                          <span className="text-blue-600 font-medium">NextAuth.js</span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-gray-600">デプロイ環境:</span>
                          <span className="text-blue-600 font-medium">Vercel</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">フレームワーク:</span>
                          <span className="text-blue-600 font-medium">Next.js 15.3</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">更新方式:</span>
                          <span className="text-blue-600 font-medium">Git Push</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 border border-gray-200 rounded-lg">
                    <h3 className="font-medium text-gray-900 mb-4">推奨改善項目</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 bg-yellow-50 rounded">
                        <div>
                          <span className="text-sm font-medium text-yellow-800">データベース移行</span>
                          <p className="text-xs text-yellow-700 mt-1">SQLite → PostgreSQL推奨</p>
                        </div>
                        <button className="px-3 py-1 bg-yellow-200 text-yellow-800 text-xs rounded hover:bg-yellow-300">
                          詳細
                        </button>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-blue-50 rounded">
                        <div>
                          <span className="text-sm font-medium text-blue-800">認証強化</span>
                          <p className="text-xs text-blue-700 mt-1">管理者権限の細分化</p>
                        </div>
                        <button className="px-3 py-1 bg-blue-200 text-blue-800 text-xs rounded hover:bg-blue-300">
                          設定
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 border border-gray-200 rounded-lg">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="font-medium text-gray-900">開発者情報</h3>
                      <button 
                        onClick={() => setShowSecret(!showSecret)}
                        className="text-xs text-gray-500 hover:text-gray-700"
                      >
                        {showSecret ? '隠す' : '表示'}
                      </button>
                    </div>
                    {showSecret && (
                      <div className="text-xs text-gray-600 space-y-1 bg-gray-50 p-3 rounded">
                        <div>• ルートパス: /events/admin</div>
                        <div>• 404回避のため既存ディレクトリ内に配置</div>
                        <div>• データベース・認証依存なしで動作</div>
                        <div>• レスポンシブ対応・アニメーション付き</div>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="font-semibold text-gray-900 mb-4">クイックアクション</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-center">
              <div className="text-2xl mb-2">📝</div>
              <div className="text-sm font-medium">新規イベント</div>
            </button>
            <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-center">
              <div className="text-2xl mb-2">👤</div>
              <div className="text-sm font-medium">クリエイター追加</div>
            </button>
            <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-center">
              <div className="text-2xl mb-2">📊</div>
              <div className="text-sm font-medium">レポート生成</div>
            </button>
            <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-center">
              <div className="text-2xl mb-2">⚙️</div>
              <div className="text-sm font-medium">設定変更</div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}