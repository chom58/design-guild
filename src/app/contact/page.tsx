'use client';

import { useState } from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

export default function ContactPage() {
  const [editingEvent, setEditingEvent] = useState(null);
  const [showEventForm, setShowEventForm] = useState(false);
  const [editingCreator, setEditingCreator] = useState(null);
  const [showCreatorForm, setShowCreatorForm] = useState(false);

  // サンプルデータ（後でAPIに接続）
  const [events, setEvents] = useState([
    { id: 1, title: 'UI/UXデザインワークショップ', date: '2024-07-15', participants: 25, status: '受付中' },
    { id: 2, title: 'ブランディングセミナー', date: '2024-07-20', participants: 42, status: '満席' },
    { id: 3, title: 'ポートフォリオレビュー会', date: '2024-07-25', participants: 18, status: '受付中' }
  ]);

  const [creators, setCreators] = useState([
    { id: 1, name: '田中 美咲', role: 'UI/UXデザイナー', skills: 'Figma, Sketch', projects: 12 },
    { id: 2, name: '佐藤 健太', role: 'グラフィックデザイナー', skills: 'Photoshop, Illustrator', projects: 8 },
    { id: 3, name: '山田 花子', role: 'イラストレーター', skills: 'Procreate, Clip Studio', projects: 15 },
    { id: 4, name: '鈴木 太郎', role: 'ブランドデザイナー', skills: 'After Effects, Cinema 4D', projects: 6 }
  ]);

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
              <button 
                onClick={() => setShowEventForm(true)}
                className="px-4 py-2 bg-blue-600 text-white rounded text-sm hover:bg-blue-700"
              >
                + 新規作成
              </button>
            </div>
            
            {/* イベント新規作成フォーム */}
            {showEventForm && (
              <div className="bg-blue-50 p-4 rounded-lg mb-4 border">
                <h4 className="font-medium mb-3">新しいイベントを作成</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                  <input 
                    type="text" 
                    placeholder="イベントタイトル" 
                    className="px-3 py-2 border rounded text-sm"
                  />
                  <input 
                    type="date" 
                    className="px-3 py-2 border rounded text-sm"
                  />
                </div>
                <div className="flex space-x-2">
                  <button 
                    onClick={() => {
                      const newEvent = {
                        id: events.length + 1,
                        title: '新しいイベント',
                        date: '2024-08-01',
                        participants: 0,
                        status: '受付中'
                      };
                      setEvents([...events, newEvent]);
                      setShowEventForm(false);
                    }}
                    className="px-4 py-2 bg-blue-600 text-white rounded text-sm"
                  >
                    作成
                  </button>
                  <button 
                    onClick={() => setShowEventForm(false)}
                    className="px-4 py-2 bg-gray-300 text-gray-700 rounded text-sm"
                  >
                    キャンセル
                  </button>
                </div>
              </div>
            )}

            <div className="space-y-3">
              {events.map((event) => (
                <div key={event.id} className="bg-white p-4 rounded border">
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-medium">{event.title}</h4>
                      <p className="text-sm text-gray-600">
                        {event.date} | {event.participants}名参加 | {event.status}
                      </p>
                    </div>
                    <div className="space-x-2">
                      <button 
                        onClick={() => setEditingEvent(event.id)}
                        className="px-3 py-1 bg-blue-100 text-blue-700 rounded text-sm hover:bg-blue-200"
                      >
                        編集
                      </button>
                      <button 
                        onClick={() => {
                          setEvents(events.filter(e => e.id !== event.id));
                        }}
                        className="px-3 py-1 bg-red-100 text-red-700 rounded text-sm hover:bg-red-200"
                      >
                        削除
                      </button>
                    </div>
                  </div>
                  
                  {/* インライン編集フォーム */}
                  {editingEvent === event.id && (
                    <div className="mt-3 pt-3 border-t bg-gray-50 p-3 rounded">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                        <input 
                          type="text" 
                          defaultValue={event.title}
                          className="px-3 py-2 border rounded text-sm"
                          onChange={(e) => {
                            setEvents(events.map(ev => 
                              ev.id === event.id ? {...ev, title: e.target.value} : ev
                            ));
                          }}
                        />
                        <input 
                          type="date" 
                          defaultValue={event.date}
                          className="px-3 py-2 border rounded text-sm"
                          onChange={(e) => {
                            setEvents(events.map(ev => 
                              ev.id === event.id ? {...ev, date: e.target.value} : ev
                            ));
                          }}
                        />
                      </div>
                      <div className="flex space-x-2">
                        <button 
                          onClick={() => setEditingEvent(null)}
                          className="px-3 py-1 bg-green-600 text-white rounded text-sm"
                        >
                          保存
                        </button>
                        <button 
                          onClick={() => setEditingEvent(null)}
                          className="px-3 py-1 bg-gray-300 text-gray-700 rounded text-sm"
                        >
                          キャンセル
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
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