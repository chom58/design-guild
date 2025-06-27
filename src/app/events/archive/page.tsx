'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { AnimatedButton } from '@/components/ui/AnimatedButton';
import { PlaceholderImage } from '@/components/ui/PlaceholderImage';
import { Event } from '@/lib/types';

// Mock data for past events
const pastEvents: Event[] = [
  {
    id: 'archive-1',
    title: 'デザイナーズ・ナイト 2023',
    subtitle: 'クリエイティブな夜の交流会',
    date: '2023-12-15',
    startTime: '19:00',
    endTime: '22:00',
    location: '東京・六本木',
    venue: '六本木アートセンター',
    description: '2023年最後のデザイナー交流会。多くのクリエイターが参加し、刺激的な夜となりました。',
    longDescription: '年末恒例のデザイナーズ・ナイトは今年も大盛況でした。業界のトップデザイナーによるライトニングトークや、参加者同士のネットワーキングセッションが行われ、新しいプロジェクトの種も多数生まれました。',
    image: '/images/events/archive1.jpg',
    category: 'networking' as const,
    tags: ['networking', 'design', 'creative'],
    capacity: 100,
    registered: 95,
    price: 0,
    includes: ['軽食', 'ドリンク', 'ネットワーキング'],
    status: 'completed' as const,
    registrationDeadline: '2023-12-10'
  },
  {
    id: 'archive-2',
    title: 'UI/UXデザイン・ワークショップ',
    subtitle: 'ユーザビリティを重視したデザイン手法',
    date: '2023-11-18',
    startTime: '13:00',
    endTime: '17:00',
    location: '東京・渋谷',
    venue: '渋谷クリエイティブセンター',
    description: 'プロトタイピングからユーザーテストまで、実践的なUI/UXデザインのワークショップ。',
    image: '/images/events/archive2.jpg',
    category: 'workshop' as const,
    tags: ['ui', 'ux', 'workshop', 'prototyping'],
    speakers: [
      {
        name: '田中 UI子',
        title: 'Lead UX Designer',
        bio: '大手IT企業でUI/UXデザインを担当。ユーザビリティ向上に情熱を注ぐ。'
      }
    ],
    capacity: 50,
    registered: 48,
    price: 0,
    includes: ['教材', '昼食', 'ワークショップキット'],
    status: 'completed' as const,
    registrationDeadline: '2023-11-15'
  },
  {
    id: 'archive-3',
    title: 'ブランディング・セミナー',
    subtitle: 'ブランド価値を高める戦略とデザイン',
    date: '2023-10-25',
    startTime: '14:00',
    endTime: '16:30',
    location: '東京・丸の内',
    venue: '丸の内ビジネスセンター',
    description: '成功するブランディングの秘訣を学ぶセミナー。事例研究とワークショップを組み合わせた実践的な内容。',
    image: '/images/events/archive3.jpg',
    category: 'seminar' as const,
    tags: ['branding', 'strategy', 'business'],
    speakers: [
      {
        name: '佐藤 ブランド',
        title: 'ブランドコンサルタント',
        bio: '10年以上のブランディング経験を持つコンサルタント。数多くの企業ブランドを手がける。'
      }
    ],
    capacity: 80,
    registered: 75,
    price: 0,
    includes: ['資料', '軽食', 'ワークブック'],
    status: 'completed' as const,
    registrationDeadline: '2023-10-20'
  }
];

export default function EventArchivePage() {
  const [sortBy, setSortBy] = useState<'date' | 'popularity'>('date');
  const [filterCategory, setFilterCategory] = useState<string>('all');

  const categoryLabels = {
    networking: 'ネットワーキング',
    workshop: 'ワークショップ',
    seminar: 'セミナー',
    exhibition: '展示会',
    competition: 'コンペティション'
  };

  const categoryColors = {
    networking: 'bg-blue-100 text-blue-800',
    workshop: 'bg-purple-100 text-purple-800',
    seminar: 'bg-green-100 text-green-800',
    exhibition: 'bg-amber-100 text-amber-800',
    competition: 'bg-red-100 text-red-800'
  };

  // Filter and sort events
  let filteredEvents = pastEvents;
  if (filterCategory !== 'all') {
    filteredEvents = pastEvents.filter(event => event.category === filterCategory);
  }

  filteredEvents = filteredEvents.sort((a, b) => {
    if (sortBy === 'date') {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    } else {
      return b.registered - a.registered; // Sort by attendance
    }
  });

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Page Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div className="mb-6">
            <Link href="/events">
              <AnimatedButton variant="outline" className="inline-flex items-center">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                イベント一覧に戻る
              </AnimatedButton>
            </Link>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-6">過去のイベント</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            これまでに開催されたデザインギルドのイベントをご覧ください。
            参加者の声やイベントレポートもご確認いただけます。
          </p>
        </motion.div>

        {/* Filters and Sort */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-4">
          {/* Category Filter */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setFilterCategory('all')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                filterCategory === 'all'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              すべて
            </button>
            {Object.entries(categoryLabels).map(([key, label]) => (
              <button
                key={key}
                onClick={() => setFilterCategory(key)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  filterCategory === key
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Sort Options */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">並び替え:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'date' | 'popularity')}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="date">開催日順</option>
              <option value="popularity">参加者数順</option>
            </select>
          </div>
        </div>

        {/* Events List */}
        <motion.div
          className="space-y-8"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1
              }
            }
          }}
        >
          {filteredEvents.map((event, index) => {
            const attendanceRate = (event.registered / event.capacity) * 100;
            
            return (
              <motion.div
                key={event.id}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 }
                }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
              >
                <div className="md:flex">
                  {/* Event Image */}
                  <div className="md:w-1/3">
                    <div className="relative h-64 md:h-full">
                      <PlaceholderImage
                        width={400}
                        height={256}
                        text={event.title}
                        type="event"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-4 left-4">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${categoryColors[event.category]}`}>
                          {categoryLabels[event.category]}
                        </span>
                      </div>
                      <div className="absolute bottom-4 right-4">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-800 text-white">
                          開催済み
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Event Info */}
                  <div className="md:w-2/3 p-6">
                    <div className="flex flex-col h-full">
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">{event.title}</h3>
                        {event.subtitle && (
                          <p className="text-lg text-gray-600 mb-3">{event.subtitle}</p>
                        )}
                        
                        <div className="flex flex-wrap gap-4 mb-4 text-sm text-gray-600">
                          <div className="flex items-center">
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            {new Date(event.date).toLocaleDateString('ja-JP', { 
                              year: 'numeric',
                              month: 'long', 
                              day: 'numeric',
                              weekday: 'long'
                            })}
                          </div>
                          <div className="flex items-center">
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            {event.location}
                          </div>
                        </div>

                        <p className="text-gray-700 mb-4 line-clamp-3">{event.longDescription || event.description}</p>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-2 mb-6">
                          {event.tags.map((tag) => (
                            <span
                              key={tag}
                              className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Stats and Actions */}
                      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                        <div className="flex items-center space-x-6 text-sm text-gray-600">
                          <div>
                            <span className="font-semibold">{event.registered}</span> 名参加
                          </div>
                          <div>
                            <span className="font-semibold">{attendanceRate.toFixed(0)}%</span> 満席率
                          </div>
                          <div>
                            <span className="font-semibold text-blue-600">参加無料</span>
                          </div>
                        </div>
                        <AnimatedButton variant="outline" size="sm">
                          レポートを見る
                        </AnimatedButton>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Load More / Pagination could go here */}
        <div className="text-center mt-12">
          <p className="text-gray-500 mb-4">
            {filteredEvents.length} 件のイベントを表示中
          </p>
          <AnimatedButton variant="outline">
            さらに読み込む
          </AnimatedButton>
        </div>
      </main>
      <Footer />
    </div>
  );
}