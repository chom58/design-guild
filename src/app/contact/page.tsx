import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">お問い合わせ</h1>
          <p className="text-lg text-gray-600">
            こちらのページは準備中です。
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}