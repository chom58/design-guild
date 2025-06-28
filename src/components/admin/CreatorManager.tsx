'use client';

import { useState } from 'react';

interface Creator {
  id: number;
  name: string;
  role: string;
  skills: string;
  projects: number;
}

interface CreatorManagerProps {
  initialCreators: Creator[];
}

export const CreatorManager: React.FC<CreatorManagerProps> = ({ initialCreators }) => {
  const [creators, setCreators] = useState<Creator[]>(initialCreators);
  const [editingCreator, setEditingCreator] = useState<number | null>(null);
  const [showCreatorForm, setShowCreatorForm] = useState(false);
  const [formData, setFormData] = useState({ name: '', role: '', skills: '' });

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n.charAt(0)).join('');
  };

  const getAvatarColor = (id: number) => {
    const colors = ['bg-blue-500', 'bg-green-500', 'bg-pink-500', 'bg-orange-500', 'bg-purple-500', 'bg-indigo-500'];
    return colors[id % colors.length];
  };

  const handleCreateCreator = () => {
    if (!formData.name || !formData.role) return;
    
    const newCreator: Creator = {
      id: Math.max(...creators.map(c => c.id), 0) + 1,
      name: formData.name,
      role: formData.role,
      skills: formData.skills,
      projects: 0
    };
    
    setCreators([...creators, newCreator]);
    setFormData({ name: '', role: '', skills: '' });
    setShowCreatorForm(false);
  };

  const handleDeleteCreator = (id: number) => {
    if (confirm('このクリエイターを削除しますか？')) {
      setCreators(creators.filter(c => c.id !== id));
    }
  };

  const handleEditCreator = (id: number, field: string, value: string | number) => {
    setCreators(creators.map(creator => 
      creator.id === id ? { ...creator, [field]: value } : creator
    ));
  };

  return (
    <div className="bg-gray-50 rounded-lg p-6 mb-8">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">👥 クリエイター管理</h3>
        <button 
          onClick={() => setShowCreatorForm(true)}
          className="px-4 py-2 bg-purple-600 text-white rounded text-sm hover:bg-purple-700 transition-colors"
        >
          + 新規追加
        </button>
      </div>

      {/* 新規作成フォーム */}
      {showCreatorForm && (
        <div className="bg-purple-50 p-4 rounded-lg mb-4 border">
          <h4 className="font-medium mb-3">新しいクリエイターを追加</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3">
            <input 
              type="text" 
              placeholder="名前" 
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="px-3 py-2 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <input 
              type="text" 
              placeholder="職業・役割" 
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              className="px-3 py-2 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <input 
              type="text" 
              placeholder="スキル（カンマ区切り）" 
              value={formData.skills}
              onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
              className="px-3 py-2 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <div className="flex space-x-2">
            <button 
              onClick={handleCreateCreator}
              disabled={!formData.name || !formData.role}
              className="px-4 py-2 bg-purple-600 text-white rounded text-sm hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              追加
            </button>
            <button 
              onClick={() => {
                setShowCreatorForm(false);
                setFormData({ name: '', role: '', skills: '' });
              }}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded text-sm hover:bg-gray-400 transition-colors"
            >
              キャンセル
            </button>
          </div>
        </div>
      )}

      {/* クリエイター一覧 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {creators.length === 0 ? (
          <div className="col-span-2 text-center py-8 text-gray-500">
            <p>まだクリエイターが登録されていません</p>
            <button 
              onClick={() => setShowCreatorForm(true)}
              className="mt-2 text-purple-600 hover:text-purple-800 text-sm"
            >
              最初のクリエイターを追加
            </button>
          </div>
        ) : (
          creators.map((creator) => (
            <div key={creator.id} className="bg-white p-4 rounded border hover:shadow-md transition-shadow">
              <div className="flex items-center space-x-3 mb-3">
                <div className={`w-12 h-12 ${getAvatarColor(creator.id)} rounded-full flex items-center justify-center text-white text-sm font-medium`}>
                  {getInitials(creator.name)}
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900">{creator.name}</h4>
                  <p className="text-sm text-gray-600">{creator.role}</p>
                </div>
              </div>
              
              <div className="text-sm text-gray-600 space-y-1 mb-3">
                <div>スキル: {creator.skills || '未設定'}</div>
                <div>プロジェクト: {creator.projects}件</div>
              </div>
              
              <div className="flex space-x-2">
                <button 
                  onClick={() => setEditingCreator(editingCreator === creator.id ? null : creator.id)}
                  className="px-3 py-1 bg-purple-100 text-purple-700 rounded text-sm hover:bg-purple-200 transition-colors"
                >
                  {editingCreator === creator.id ? '完了' : '編集'}
                </button>
                <button 
                  onClick={() => handleDeleteCreator(creator.id)}
                  className="px-3 py-1 bg-red-100 text-red-700 rounded text-sm hover:bg-red-200 transition-colors"
                >
                  削除
                </button>
              </div>

              {/* インライン編集フォーム */}
              {editingCreator === creator.id && (
                <div className="mt-3 pt-3 border-t bg-gray-50 p-3 rounded">
                  <div className="space-y-3">
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">名前</label>
                      <input 
                        type="text" 
                        value={creator.name}
                        onChange={(e) => handleEditCreator(creator.id, 'name', e.target.value)}
                        className="w-full px-3 py-2 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">職業・役割</label>
                      <input 
                        type="text" 
                        value={creator.role}
                        onChange={(e) => handleEditCreator(creator.id, 'role', e.target.value)}
                        className="w-full px-3 py-2 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">スキル</label>
                      <input 
                        type="text" 
                        value={creator.skills}
                        onChange={(e) => handleEditCreator(creator.id, 'skills', e.target.value)}
                        className="w-full px-3 py-2 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                        placeholder="例: Figma, Sketch, Photoshop"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">プロジェクト数</label>
                      <input 
                        type="number" 
                        value={creator.projects}
                        onChange={(e) => handleEditCreator(creator.id, 'projects', parseInt(e.target.value) || 0)}
                        className="w-full px-3 py-2 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                        min="0"
                      />
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