import { Event } from './types';

export const events: Event[] = [
  {
    id: '1',
    title: 'クリエイティブ・ネットワーキング 2024',
    subtitle: 'デザイン業界の最新トレンドと交流会',
    date: '2024-07-15',
    startTime: '14:00',
    endTime: '18:00',
    location: '東京・渋谷',
    venue: '渋谷クリエイティブセンター 5F イベントホール',
    description: 'デザイン業界のトレンドセッションと交流会を開催。新しい出会いとインスピレーションを見つけませんか？',
    longDescription: `デザインギルド主催の年に一度の大型ネットワーキングイベントです。業界の第一線で活躍するデザイナーやクリエイターが集まり、最新のトレンドや技術について語り合います。

    前半は著名デザイナーによる講演とパネルディスカッション、後半は参加者同士の交流会を予定しています。普段なかなか会えない業界のプロフェッショナルと直接話せる貴重な機会です。

    初心者からベテランまで、すべてのクリエイターにとって有意義な時間となることをお約束します。`,
    image: '/images/events/networking2024.jpg',
    category: 'networking',
    tags: ['ネットワーキング', 'トレンド', '交流会', 'キャリア'],
    speakers: [
      {
        name: '山田太郎',
        title: 'クリエイティブディレクター',
        bio: '大手広告代理店でクリエイティブディレクターを務める。カンヌライオンズ金賞受賞。',
        image: '/images/speakers/yamada.jpg'
      },
      {
        name: '佐藤花子',
        title: 'UXデザイナー',
        bio: 'シリコンバレーのテック企業でUXリードとして活躍。デザイン思考の専門家。',
        image: '/images/speakers/sato.jpg'
      }
    ],
    agenda: [
      {
        time: '14:00-14:15',
        title: '開会挨拶・イベント説明',
        description: 'デザインギルド代表による開会の挨拶とイベントの流れ説明'
      },
      {
        time: '14:15-15:00',
        title: '基調講演「AIとデザインの未来」',
        speaker: '山田太郎',
        description: 'AI技術がデザイン業界にもたらす変革と、クリエイターの新しい役割について'
      },
      {
        time: '15:00-15:45',
        title: 'パネルディスカッション「持続可能なデザイン」',
        description: '環境に配慮したデザインアプローチと企業の社会的責任'
      },
      {
        time: '15:45-16:00',
        title: '休憩',
        description: 'コーヒーブレイク'
      },
      {
        time: '16:00-18:00',
        title: 'ネットワーキングセッション',
        description: '参加者同士の自由な交流時間。ドリンクと軽食付き'
      }
    ],
    capacity: 150,
    registered: 89,
    price: 0,
    includes: [
      '全セッション参加権',
      '交流会参加（ドリンク・軽食付き）',
      'イベント資料のデジタル版',
      '参加証明書'
    ],
    requirements: [
      'デザイン・クリエイティブ業界に興味がある方',
      '名刺をご持参ください'
    ],
    status: 'upcoming',
    registrationDeadline: '2024-07-10'
  },
  {
    id: '2',
    title: 'UIデザイン実践ワークショップ',
    subtitle: 'Figmaを使った最新のUIデザイン手法',
    date: '2024-08-20',
    startTime: '13:00',
    endTime: '17:00',
    location: '東京・六本木',
    venue: 'デザインラボ六本木',
    description: 'Figmaを使った実践的なUIデザインワークショップ。最新のデザイントレンドとベストプラクティスを学びます。',
    longDescription: `現役UIデザイナーが講師を務める、実践的なワークショップです。実際のプロジェクトを題材に、UIデザインの基礎から応用まで幅広く学びます。

    少人数制のため、講師から直接フィードバックを受けながら、自分のペースで学習を進めることができます。`,
    image: '/images/events/ui-workshop.jpg',
    category: 'workshop',
    tags: ['UI', 'Figma', 'ワークショップ', 'スキルアップ'],
    capacity: 20,
    registered: 15,
    price: 0,
    includes: [
      'ワークショップ参加権',
      'Figmaのプロジェクトファイル',
      '修了証',
      'ドリンク・お菓子'
    ],
    requirements: [
      'ノートPCをご持参ください',
      'Figmaアカウント（無料版でOK）',
      '基本的なデザイン知識があると望ましい'
    ],
    status: 'upcoming',
    registrationDeadline: '2024-08-15'
  },
  {
    id: '3',
    title: 'ポートフォリオレビュー会',
    subtitle: '現役クリエイターによる個別アドバイス',
    date: '2024-06-10',
    startTime: '18:30',
    endTime: '21:00',
    location: 'オンライン',
    venue: 'Zoom',
    description: '現役のクリエイティブディレクターやデザイナーが、あなたのポートフォリオを直接レビューします。',
    image: '/images/events/portfolio-review.jpg',
    category: 'seminar',
    tags: ['ポートフォリオ', 'キャリア', 'フィードバック'],
    capacity: 30,
    registered: 28,
    price: 0,
    includes: [
      '15分間の個別レビュー',
      '全体フィードバックセッション参加',
      'レビュー後の改善アドバイス資料'
    ],
    status: 'upcoming',
    registrationDeadline: '2024-06-05'
  }
];

export function getEventById(id: string): Event | undefined {
  return events.find(event => event.id === id);
}

export function getUpcomingEvents(): Event[] {
  return events.filter(event => event.status === 'upcoming');
}

export function getEventsByCategory(category: Event['category']): Event[] {
  return events.filter(event => event.category === category);
}