'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { AnimatedButton } from '@/components/ui/AnimatedButton';

export default function SignUpPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    profession: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // パスワード確認
    if (formData.password !== formData.confirmPassword) {
      setError('パスワードが一致しません');
      setIsLoading(false);
      return;
    }

    try {
      // ユーザー登録
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
          name: formData.name,
          profession: formData.profession
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || '登録に失敗しました');
      }

      // 自動ログイン
      const result = await signIn('credentials', {
        redirect: false,
        email: formData.email,
        password: formData.password
      });

      if (result?.error) {
        throw new Error('ログインに失敗しました');
      }

      router.push('/');
      router.refresh();
    } catch (error) {
      setError(error instanceof Error ? error.message : '登録中にエラーが発生しました');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main className="pt-24 pb-16 px-4">
        <div className="max-w-md mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h1 className="text-2xl font-bold text-center mb-8">新規登録</h1>
            
            {error && (
              <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-6 text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  お名前
                </label>
                <input
                  type="text"
                  id="name"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  メールアドレス
                </label>
                <input
                  type="email"
                  id="email"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>

              <div>
                <label htmlFor="profession" className="block text-sm font-medium text-gray-700 mb-2">
                  職種
                </label>
                <select
                  id="profession"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={formData.profession}
                  onChange={(e) => setFormData({ ...formData, profession: e.target.value })}
                >
                  <option value="">選択してください</option>
                  <option value="グラフィックデザイナー">グラフィックデザイナー</option>
                  <option value="UIデザイナー">UIデザイナー</option>
                  <option value="UXデザイナー">UXデザイナー</option>
                  <option value="Webデザイナー">Webデザイナー</option>
                  <option value="プロダクトデザイナー">プロダクトデザイナー</option>
                  <option value="イラストレーター">イラストレーター</option>
                  <option value="フォトグラファー">フォトグラファー</option>
                  <option value="動画クリエイター">動画クリエイター</option>
                  <option value="その他">その他</option>
                </select>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                  パスワード（6文字以上）
                </label>
                <input
                  type="password"
                  id="password"
                  required
                  minLength={6}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                  パスワード（確認）
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  required
                  minLength={6}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                />
              </div>

              <AnimatedButton
                type="submit"
                size="lg"
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? '登録中...' : '登録する'}
              </AnimatedButton>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                既にアカウントをお持ちの方は
                <Link href="/auth/signin" className="text-blue-600 hover:underline ml-1">
                  ログイン
                </Link>
              </p>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}