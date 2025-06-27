'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Card } from '@/components/ui/Card';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { Event } from '@/lib/types';

export default function AdminEventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await fetch('/api/admin/events');
      if (!response.ok) {
        throw new Error('イベントの取得に失敗しました');
      }
      const data = await response.json();
      setEvents(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'エラーが発生しました');
    } finally {
      setLoading(false);
    }
  };

  const deleteEvent = async (id: string) => {
    if (!confirm('このイベントを削除しますか？')) return;

    try {
      const response = await fetch(`/api/admin/events/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('削除に失敗しました');
      }

      await fetchEvents(); // リストを再取得
    } catch (err) {
      alert('削除に失敗しました: ' + (err instanceof Error ? err.message : 'エラー'));
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="text-red-600 mb-4">{error}</div>
        <button 
          onClick={fetchEvents}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          再試行
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* ヘッダー */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">イベント管理</h1>
          <p className="mt-2 text-gray-600">
            {events.length}件のイベントが登録されています
          </p>
        </div>
        <Link
          href="/admin/events/new"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          + 新しいイベントを作成
        </Link>
      </div>

      {/* イベント一覧 */}
      {events.length === 0 ? (
        <Card className="p-8 text-center">
          <p className="text-gray-500 mb-4">まだイベントが登録されていません</p>
          <Link
            href="/admin/events/new"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
          >
            最初のイベントを作成
          </Link>
        </Card>
      ) : (
        <div className="grid gap-6">
          {events.map((event) => (
            <Card key={event.id} className="p-6">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {event.title}
                    </h3>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      event.category === 'workshop' ? 'bg-blue-100 text-blue-800' :
                      event.category === 'networking' ? 'bg-green-100 text-green-800' :
                      event.category === 'conference' ? 'bg-purple-100 text-purple-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {event.category}
                    </span>
                  </div>
                  
                  {event.subtitle && (
                    <p className="text-gray-600 mb-2">{event.subtitle}</p>
                  )}
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600">
                    <div>
                      <span className="font-medium">日時:</span><br/>
                      {event.date}
                    </div>
                    <div>
                      <span className="font-medium">時間:</span><br/>
                      {event.startTime} - {event.endTime}
                    </div>
                    <div>
                      <span className="font-medium">場所:</span><br/>
                      {event.location}
                    </div>
                    <div>
                      <span className="font-medium">定員:</span><br/>
                      {event.registered}/{event.capacity}人
                    </div>
                  </div>
                  
                  {event.description && (
                    <p className="mt-3 text-gray-700 line-clamp-2">{event.description}</p>
                  )}
                </div>
                
                <div className="flex items-center space-x-2 ml-4">
                  <Link
                    href={`/admin/events/${event.id}/edit`}
                    className="px-3 py-1 text-sm text-blue-600 hover:text-blue-800 border border-blue-600 hover:border-blue-800 rounded"
                  >
                    編集
                  </Link>
                  <button
                    onClick={() => deleteEvent(event.id)}
                    className="px-3 py-1 text-sm text-red-600 hover:text-red-800 border border-red-600 hover:border-red-800 rounded"
                  >
                    削除
                  </button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}