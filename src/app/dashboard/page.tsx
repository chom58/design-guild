import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { EventManager } from '@/components/admin/EventManager';
import { CreatorManager } from '@/components/admin/CreatorManager';
import { StatsCards } from '@/components/admin/StatsCards';
import { SystemStatus } from '@/components/admin/SystemStatus';

export default function DashboardPage() {
  // 初期データ
  const initialEvents = [
    { id: 1, title: 'UI/UXデザインワークショップ', date: '2024-07-15', participants: 25, status: '受付中' },
    { id: 2, title: 'ブランディングセミナー', date: '2024-07-20', participants: 42, status: '満席' },
    { id: 3, title: 'ポートフォリオレビュー会', date: '2024-07-25', participants: 18, status: '受付中' }
  ];

  const initialCreators = [
    { id: 1, name: '田中 美咲', role: 'UI/UXデザイナー', skills: 'Figma, Sketch', projects: 12 },
    { id: 2, name: '佐藤 健太', role: 'グラフィックデザイナー', skills: 'Photoshop, Illustrator', projects: 8 },
    { id: 3, name: '山田 花子', role: 'イラストレーター', skills: 'Procreate, Clip Studio', projects: 15 },
    { id: 4, name: '鈴木 太郎', role: 'ブランドデザイナー', skills: 'After Effects, Cinema 4D', projects: 6 }
  ];

  const totalParticipants = initialEvents.reduce((sum, event) => sum + event.participants, 0);

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* ヘッダー */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-blue-600 mb-4">🔧 管理ダッシュボード</h1>
          <p className="text-gray-600">イベント・クリエイター管理システム</p>
        </div>

        {/* 統計カード */}
        <StatsCards 
          eventCount={initialEvents.length}
          totalParticipants={totalParticipants}
          creatorCount={initialCreators.length}
        />

        {/* イベント管理 */}
        <EventManager initialEvents={initialEvents} />

        {/* クリエイター管理 */}
        <CreatorManager initialCreators={initialCreators} />

        {/* システム状況 */}
        <SystemStatus />
      </main>
      <Footer />
    </div>
  );
}