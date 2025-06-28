'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function WorkingAdminPage() {
  const [activeTab, setActiveTab] = useState('events');

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">管理画面 (動作版)</h1>
              <p className="text-gray-600 mt-1">データベース不要でシンプルに動作します</p>
            </div>
            <Link 
              href="/"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              サイトに戻る
            </Link>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-sm mb-6">
          <div className="border-b border-gray-200">
            <div className="flex space-x-8 px-6">
              <button
                onClick={() => setActiveTab('events')}
                className={`py-4 px-2 border-b-2 font-medium text-sm ${
                  activeTab === 'events'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                📅 イベント管理
              </button>
              <button
                onClick={() => setActiveTab('creators')}
                className={`py-4 px-2 border-b-2 font-medium text-sm ${
                  activeTab === 'creators'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                👥 クリエイター管理
              </button>
              <button
                onClick={() => setActiveTab('status')}
                className={`py-4 px-2 border-b-2 font-medium text-sm ${
                  activeTab === 'status'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                ⚙️ システム状態
              </button>
            </div>
          </div>

          <div className="p-6">
            {activeTab === 'events' && (
              <div>
                <h2 className="text-lg font-semibold mb-4">イベント管理</h2>
                <div className="space-y-4">
                  <div className="p-4 border border-gray-200 rounded-lg">
                    <h3 className="font-medium">デザインワークショップ 2024</h3>
                    <p className="text-sm text-gray-600 mt-1">2024-07-15 | 定員: 30名 | 参加者: 25名</p>
                    <div className="mt-3 flex space-x-2">
                      <button className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded">編集</button>
                      <button className="px-3 py-1 text-sm bg-red-100 text-red-700 rounded">削除</button>
                    </div>
                  </div>
                  <div className="p-4 border border-gray-200 rounded-lg">
                    <h3 className="font-medium">UI/UXデザインセミナー</h3>
                    <p className="text-sm text-gray-600 mt-1">2024-07-20 | 定員: 50名 | 参加者: 42名</p>
                    <div className="mt-3 flex space-x-2">
                      <button className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded">編集</button>
                      <button className="px-3 py-1 text-sm bg-red-100 text-red-700 rounded">削除</button>
                    </div>
                  </div>
                  <button className="w-full p-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-gray-400 hover:text-gray-700 transition-colors">
                    + 新しいイベントを追加
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'creators' && (
              <div>
                <h2 className="text-lg font-semibold mb-4">クリエイター管理</h2>
                <div className="space-y-4">
                  <div className="p-4 border border-gray-200 rounded-lg flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center">
                      <span className="text-gray-600 font-medium">田中</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium">田中 デザイナー</h3>
                      <p className="text-sm text-gray-600">UI/UXデザイナー | Figma, Sketch</p>
                    </div>
                    <div className="flex space-x-2">
                      <button className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded">編集</button>
                      <button className="px-3 py-1 text-sm bg-red-100 text-red-700 rounded">削除</button>
                    </div>
                  </div>
                  <div className="p-4 border border-gray-200 rounded-lg flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center">
                      <span className="text-gray-600 font-medium">佐藤</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium">佐藤 アーティスト</h3>
                      <p className="text-sm text-gray-600">イラストレーター | Photoshop, Illustrator</p>
                    </div>
                    <div className="flex space-x-2">
                      <button className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded">編集</button>
                      <button className="px-3 py-1 text-sm bg-red-100 text-red-700 rounded">削除</button>
                    </div>
                  </div>
                  <button className="w-full p-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-gray-400 hover:text-gray-700 transition-colors">
                    + 新しいクリエイターを追加
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'status' && (
              <div>
                <h2 className="text-lg font-semibold mb-4">システム状態</h2>
                <div className="space-y-4">
                  <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                      <span className="font-medium text-green-800">ウェブサイト</span>
                    </div>
                    <p className="text-green-700 text-sm mt-1">正常動作中</p>
                  </div>
                  
                  <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-yellow-500 rounded-full mr-3"></div>
                      <span className="font-medium text-yellow-800">データベース</span>
                    </div>
                    <p className="text-yellow-700 text-sm mt-1">SQLite（開発用）→ PostgreSQL（推奨）</p>
                  </div>
                  
                  <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-blue-500 rounded-full mr-3"></div>
                      <span className="font-medium text-blue-800">認証システム</span>
                    </div>
                    <p className="text-blue-700 text-sm mt-1">NextAuth.js 設定済み</p>
                  </div>

                  <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
                    <h3 className="font-medium text-gray-800 mb-2">環境情報</h3>
                    <div className="text-sm text-gray-600 space-y-1">
                      <div>• プラットフォーム: Vercel</div>
                      <div>• フレームワーク: Next.js 15.3</div>
                      <div>• データ管理: スタティックファイル</div>
                      <div>• 更新方式: Git Push → 自動デプロイ</div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Action Items */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="font-semibold text-gray-900 mb-3">今後の改善予定</h3>
          <div className="space-y-2 text-sm text-gray-600">
            <div className="flex items-center">
              <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
              PostgreSQLデータベースへの移行
            </div>
            <div className="flex items-center">
              <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
              完全な認証システムの実装
            </div>
            <div className="flex items-center">
              <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
              リアルタイムデータ更新機能
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}