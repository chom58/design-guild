'use client';

import { useState } from 'react';

interface Event {
  id: number;
  title: string;
  date: string;
  participants: number;
  status: string;
}

interface EventManagerProps {
  initialEvents: Event[];
}

export const EventManager: React.FC<EventManagerProps> = ({ initialEvents }) => {
  const [events, setEvents] = useState<Event[]>(initialEvents);
  const [editingEvent, setEditingEvent] = useState<number | null>(null);
  const [showEventForm, setShowEventForm] = useState(false);
  const [formData, setFormData] = useState({ title: '', date: '' });

  const handleCreateEvent = () => {
    if (!formData.title || !formData.date) return;
    
    const newEvent: Event = {
      id: Math.max(...events.map(e => e.id), 0) + 1,
      title: formData.title,
      date: formData.date,
      participants: 0,
      status: '受付中'
    };
    
    setEvents([...events, newEvent]);
    setFormData({ title: '', date: '' });
    setShowEventForm(false);
  };

  const handleDeleteEvent = (id: number) => {
    if (confirm('このイベントを削除しますか？')) {
      setEvents(events.filter(e => e.id !== id));
    }
  };

  const handleEditEvent = (id: number, field: string, value: string) => {
    setEvents(events.map(event => 
      event.id === id ? { ...event, [field]: value } : event
    ));
  };

  return (
    <div className="bg-gray-50 rounded-lg p-6 mb-8">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">📅 イベント管理</h3>
        <button 
          onClick={() => setShowEventForm(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded text-sm hover:bg-blue-700 transition-colors"
        >
          + 新規作成
        </button>
      </div>

      {/* 新規作成フォーム */}
      {showEventForm && (
        <div className="bg-blue-50 p-4 rounded-lg mb-4 border">
          <h4 className="font-medium mb-3">新しいイベントを作成</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
            <input 
              type="text" 
              placeholder="イベントタイトル" 
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="px-3 py-2 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input 
              type="date" 
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              className="px-3 py-2 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex space-x-2">
            <button 
              onClick={handleCreateEvent}
              disabled={!formData.title || !formData.date}
              className="px-4 py-2 bg-blue-600 text-white rounded text-sm hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              作成
            </button>
            <button 
              onClick={() => {
                setShowEventForm(false);
                setFormData({ title: '', date: '' });
              }}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded text-sm hover:bg-gray-400 transition-colors"
            >
              キャンセル
            </button>
          </div>
        </div>
      )}

      {/* イベント一覧 */}
      <div className="space-y-3">
        {events.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <p>まだイベントが登録されていません</p>
            <button 
              onClick={() => setShowEventForm(true)}
              className="mt-2 text-blue-600 hover:text-blue-800 text-sm"
            >
              最初のイベントを作成
            </button>
          </div>
        ) : (
          events.map((event) => (
            <div key={event.id} className="bg-white p-4 rounded border hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900">{event.title}</h4>
                  <p className="text-sm text-gray-600 mt-1">
                    {event.date} | {event.participants}名参加 | {event.status}
                  </p>
                </div>
                <div className="flex space-x-2 ml-4">
                  <button 
                    onClick={() => setEditingEvent(editingEvent === event.id ? null : event.id)}
                    className="px-3 py-1 bg-blue-100 text-blue-700 rounded text-sm hover:bg-blue-200 transition-colors"
                  >
                    {editingEvent === event.id ? '完了' : '編集'}
                  </button>
                  <button 
                    onClick={() => handleDeleteEvent(event.id)}
                    className="px-3 py-1 bg-red-100 text-red-700 rounded text-sm hover:bg-red-200 transition-colors"
                  >
                    削除
                  </button>
                </div>
              </div>
              
              {/* インライン編集フォーム */}
              {editingEvent === event.id && (
                <div className="mt-3 pt-3 border-t bg-gray-50 p-3 rounded">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">タイトル</label>
                      <input 
                        type="text" 
                        value={event.title}
                        onChange={(e) => handleEditEvent(event.id, 'title', e.target.value)}
                        className="w-full px-3 py-2 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">開催日</label>
                      <input 
                        type="date" 
                        value={event.date}
                        onChange={(e) => handleEditEvent(event.id, 'date', e.target.value)}
                        className="w-full px-3 py-2 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">参加者数</label>
                      <input 
                        type="number" 
                        value={event.participants}
                        onChange={(e) => handleEditEvent(event.id, 'participants', parseInt(e.target.value) || 0)}
                        className="w-full px-3 py-2 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">ステータス</label>
                      <select 
                        value={event.status}
                        onChange={(e) => handleEditEvent(event.id, 'status', e.target.value)}
                        className="w-full px-3 py-2 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="受付中">受付中</option>
                        <option value="満席">満席</option>
                        <option value="終了">終了</option>
                        <option value="準備中">準備中</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};