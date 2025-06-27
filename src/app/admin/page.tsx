'use client';

import Link from 'next/link';
import { Card } from '@/components/ui/Card';

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">管理ダッシュボード</h1>
        <p className="mt-2 text-gray-600">
          イベントとクリエイターの情報を管理できます
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
          <div className="mt-4">
            <Link 
              href="/admin/events"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              イベント管理画面へ
            </Link>
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
          <div className="mt-4">
            <Link 
              href="/admin/creators"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
            >
              クリエイター管理画面へ
            </Link>
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
            <span className="font-medium text-gray-700">更新方法:</span>
            <span className="ml-2 text-blue-600">管理画面からリアルタイム更新</span>
          </div>
        </div>
      </Card>
    </div>
  );
}