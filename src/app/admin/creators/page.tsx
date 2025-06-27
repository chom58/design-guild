'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Card } from '@/components/ui/Card';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { Creator } from '@/lib/types';

export default function AdminCreatorsPage() {
  const [creators, setCreators] = useState<Creator[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchCreators();
  }, []);

  const fetchCreators = async () => {
    try {
      const response = await fetch('/api/admin/creators');
      if (!response.ok) {
        throw new Error('クリエイターの取得に失敗しました');
      }
      const data = await response.json();
      setCreators(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'エラーが発生しました');
    } finally {
      setLoading(false);
    }
  };

  const deleteCreator = async (id: string) => {
    if (!confirm('このクリエイターを削除しますか？')) return;

    try {
      const response = await fetch(`/api/admin/creators/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('削除に失敗しました');
      }

      await fetchCreators(); // リストを再取得
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
          onClick={fetchCreators}
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
          <h1 className="text-3xl font-bold text-gray-900">クリエイター管理</h1>
          <p className="mt-2 text-gray-600">
            {creators.length}人のクリエイターが登録されています
          </p>
        </div>
        <Link
          href="/admin/creators/new"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
        >
          + 新しいクリエイターを追加
        </Link>
      </div>

      {/* クリエイター一覧 */}
      {creators.length === 0 ? (
        <Card className="p-8 text-center">
          <p className="text-gray-500 mb-4">まだクリエイターが登録されていません</p>
          <Link
            href="/admin/creators/new"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700"
          >
            最初のクリエイターを追加
          </Link>
        </Card>
      ) : (
        <div className="grid gap-6">
          {creators.map((creator) => (
            <Card key={creator.id} className="p-6">
              <div className="flex items-start space-x-6">
                {/* プロフィール画像 */}
                <div className="flex-shrink-0">
                  <img
                    src={creator.profileImage}
                    alt={creator.name}
                    className="w-20 h-20 rounded-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = '/images/creators/default.svg';
                    }}
                  />
                </div>

                {/* クリエイター情報 */}
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {creator.name}
                    </h3>
                    <span className="px-2 py-1 text-xs font-medium rounded-full bg-purple-100 text-purple-800">
                      {creator.profession}
                    </span>
                  </div>
                  
                  {creator.bio && (
                    <p className="text-gray-600 mb-3 line-clamp-2">{creator.bio}</p>
                  )}
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-medium text-gray-700">スキル:</span>
                      <div className="mt-1 flex flex-wrap gap-1">
                        {creator.skills.slice(0, 3).map((skill, index) => (
                          <span key={index} className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded">
                            {skill}
                          </span>
                        ))}
                        {creator.skills.length > 3 && (
                          <span className="px-2 py-1 text-xs text-gray-500">
                            +{creator.skills.length - 3}
                          </span>
                        )}
                      </div>
                    </div>
                    
                    <div>
                      <span className="font-medium text-gray-700">連絡先:</span>
                      <div className="mt-1 space-y-1">
                        {creator.email && (
                          <div className="text-gray-600 text-xs">{creator.email}</div>
                        )}
                        {creator.social?.website && (
                          <div className="text-blue-600 text-xs hover:underline">
                            <a href={creator.social.website} target="_blank" rel="noopener noreferrer">
                              Website
                            </a>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* アクションボタン */}
                <div className="flex items-center space-x-2">
                  <Link
                    href={`/admin/creators/${creator.id}/edit`}
                    className="px-3 py-1 text-sm text-purple-600 hover:text-purple-800 border border-purple-600 hover:border-purple-800 rounded"
                  >
                    編集
                  </Link>
                  <button
                    onClick={() => deleteCreator(creator.id)}
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