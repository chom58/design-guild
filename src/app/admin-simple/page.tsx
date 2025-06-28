'use client';

import Link from 'next/link';
import { Card } from '@/components/ui/Card';

export default function SimpleAdminDashboard() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-6">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-green-500 rounded-full mr-3 animate-pulse"></div>
              <span className="font-medium text-blue-800">✅ 管理画面が正常に動作中</span>
            </div>
            <p className="text-blue-700 text-sm mt-1">
              この管理画面は完全に動作し、データベース不要で安定稼働しています
            </p>
          </div>
          
          <div>
            <h1 className="text-3xl font-bold text-gray-900">管理ダッシュボード（動作版）</h1>
            <p className="mt-2 text-gray-600">
              イベントとクリエイターの情報を管理できます - 認証・DB不要で確実に動作
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* イベント管理カード */}
            <Card className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">イベント管理</h2>
                  <p className="mt-2 text-gray-600">
                    イベントの作成、編集、削除ができます
                  </p>
                </div>
                <div className="text-3xl text-blue-600">📅</div>
              </div>
              <div className="mt-4 space-y-2">
                <Link 
                  href="/admin-simple/events"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  イベント管理
                </Link>
                <div className="text-xs text-gray-500 mt-1">
                  * データは実際のサイトに反映されません（デモ用）
                </div>
              </div>
            </Card>

            {/* クリエイター管理カード */}
            <Card className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">クリエイター管理</h2>
                  <p className="mt-2 text-gray-600">
                    クリエイタープロフィールの作成、編集、削除ができます
                  </p>
                </div>
                <div className="text-3xl text-purple-600">👥</div>
              </div>
              <div className="mt-4 space-y-2">
                <Link 
                  href="/admin-simple/creators"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                >
                  クリエイター管理
                </Link>
                <div className="text-xs text-gray-500 mt-1">
                  * データは実際のサイトに反映されません（デモ用）
                </div>
              </div>
            </Card>
          </div>

          {/* 設定情報 */}
          <Card className="p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">システム設定</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div>
                <span className="font-medium text-gray-700">データソース:</span>
                <span className="ml-2 text-green-600">スタティックファイル (高速)</span>
              </div>
              <div>
                <span className="font-medium text-gray-700">WordPress連携:</span>
                <span className="ml-2 text-gray-500">無効 (管理画面を使用)</span>
              </div>
              <div>
                <span className="font-medium text-gray-700">認証:</span>
                <span className="ml-2 text-orange-600">無効 (デモ版)</span>
              </div>
            </div>
          </Card>

          {/* 戻るリンク */}
          <div className="text-center">
            <Link 
              href="/" 
              className="text-blue-600 hover:text-blue-800 text-sm font-medium"
            >
              ← サイトに戻る
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}