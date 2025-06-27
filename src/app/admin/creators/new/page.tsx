'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card } from '@/components/ui/Card';

export default function NewCreatorPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    profession: '',
    bio: '',
    skills: '',
    email: '',
    profileImage: '',
    portfolio: '',
    social: {
      website: '',
      twitter: '',
      instagram: '',
      linkedin: '',
      github: ''
    }
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const creatorData = {
        ...formData,
        skills: formData.skills.split(',').map(skill => skill.trim()).filter(skill => skill),
        portfolio: formData.portfolio ? formData.portfolio.split(',').map(url => url.trim()).filter(url => url) : [],
        // 空の値を持つsocialフィールドを除去
        social: Object.fromEntries(
          Object.entries(formData.social).filter(([_, value]) => value.trim() !== '')
        )
      };

      const response = await fetch('/api/admin/creators', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(creatorData),
      });

      if (!response.ok) {
        throw new Error('クリエイターの作成に失敗しました');
      }

      router.push('/admin/creators');
    } catch (err) {
      alert('エラー: ' + (err instanceof Error ? err.message : 'クリエイターの作成に失敗しました'));
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    if (name.startsWith('social.')) {
      const socialField = name.replace('social.', '');
      setFormData(prev => ({
        ...prev,
        social: {
          ...prev.social,
          [socialField]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">新しいクリエイターを追加</h1>
        <p className="mt-2 text-gray-600">
          クリエイター情報を入力してください
        </p>
      </div>

      <Card className="p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* 基本情報 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                名前 *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div>
              <label htmlFor="profession" className="block text-sm font-medium text-gray-700 mb-2">
                職業 *
              </label>
              <input
                type="text"
                id="profession"
                name="profession"
                required
                value={formData.profession}
                onChange={handleChange}
                placeholder="例: UI/UXデザイナー"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
          </div>

          {/* プロフィール画像・メール */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="profileImage" className="block text-sm font-medium text-gray-700 mb-2">
                プロフィール画像URL
              </label>
              <input
                type="url"
                id="profileImage"
                name="profileImage"
                value={formData.profileImage}
                onChange={handleChange}
                placeholder="https://example.com/image.jpg"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                メールアドレス
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
          </div>

          {/* 自己紹介 */}
          <div>
            <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-2">
              自己紹介 *
            </label>
            <textarea
              id="bio"
              name="bio"
              required
              rows={4}
              value={formData.bio}
              onChange={handleChange}
              placeholder="クリエイターの紹介文を入力してください"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          {/* スキル・ポートフォリオ */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="skills" className="block text-sm font-medium text-gray-700 mb-2">
                スキル *
              </label>
              <input
                type="text"
                id="skills"
                name="skills"
                required
                value={formData.skills}
                onChange={handleChange}
                placeholder="スキルをカンマ区切りで入力"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <p className="mt-1 text-xs text-gray-500">例: UI/UX, Figma, Sketch, Photoshop</p>
            </div>

            <div>
              <label htmlFor="portfolio" className="block text-sm font-medium text-gray-700 mb-2">
                ポートフォリオURL
              </label>
              <input
                type="text"
                id="portfolio"
                name="portfolio"
                value={formData.portfolio}
                onChange={handleChange}
                placeholder="URLをカンマ区切りで入力"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <p className="mt-1 text-xs text-gray-500">複数のポートフォリオがある場合はカンマで区切ってください</p>
            </div>
          </div>

          {/* ソーシャルメディア */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">ソーシャルメディア</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="social.website" className="block text-sm font-medium text-gray-700 mb-2">
                  ウェブサイト
                </label>
                <input
                  type="url"
                  id="social.website"
                  name="social.website"
                  value={formData.social.website}
                  onChange={handleChange}
                  placeholder="https://example.com"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div>
                <label htmlFor="social.twitter" className="block text-sm font-medium text-gray-700 mb-2">
                  Twitter
                </label>
                <input
                  type="text"
                  id="social.twitter"
                  name="social.twitter"
                  value={formData.social.twitter}
                  onChange={handleChange}
                  placeholder="@username"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div>
                <label htmlFor="social.instagram" className="block text-sm font-medium text-gray-700 mb-2">
                  Instagram
                </label>
                <input
                  type="text"
                  id="social.instagram"
                  name="social.instagram"
                  value={formData.social.instagram}
                  onChange={handleChange}
                  placeholder="@username"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div>
                <label htmlFor="social.linkedin" className="block text-sm font-medium text-gray-700 mb-2">
                  LinkedIn
                </label>
                <input
                  type="url"
                  id="social.linkedin"
                  name="social.linkedin"
                  value={formData.social.linkedin}
                  onChange={handleChange}
                  placeholder="https://linkedin.com/in/username"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div>
                <label htmlFor="social.github" className="block text-sm font-medium text-gray-700 mb-2">
                  GitHub
                </label>
                <input
                  type="text"
                  id="social.github"
                  name="social.github"
                  value={formData.social.github}
                  onChange={handleChange}
                  placeholder="username"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </div>
          </div>

          {/* 送信ボタン */}
          <div className="flex justify-end space-x-4 pt-6 border-t">
            <button
              type="button"
              onClick={() => router.back()}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
            >
              キャンセル
            </button>
            <button
              type="submit"
              disabled={loading}
              className={`px-6 py-2 border border-transparent text-white rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 ${
                loading 
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : 'bg-purple-600 hover:bg-purple-700'
              }`}
            >
              {loading ? '作成中...' : 'クリエイターを追加'}
            </button>
          </div>
        </form>
      </Card>
    </div>
  );
}