'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { AnimatedButton } from '@/components/ui/AnimatedButton';
import { PlaceholderImage } from '@/components/ui/PlaceholderImage';
import { EventCalendar } from '@/components/ui/EventCalendar';
import { getUpcomingEvents } from '@/lib/eventsData';
import { Event } from '@/lib/types';

export default function EventsPage() {
  const allEvents = getUpcomingEvents();
  const [filteredEvents, setFilteredEvents] = useState<Event[]>(allEvents);
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [viewMode, setViewMode] = useState<'grid' | 'calendar'>('grid');

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

  // Filter and search logic
  const handleFilterChange = (filter: string) => {
    setActiveFilter(filter);
    applyFilters(filter, searchQuery);
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    applyFilters(activeFilter, query);
  };

  const applyFilters = (filter: string, query: string) => {
    let filtered = allEvents;
    
    // Apply category filter
    if (filter !== 'all') {
      filtered = filtered.filter(event => event.category === filter);
    }
    
    // Apply search filter
    if (query.trim()) {
      filtered = filtered.filter(event => 
        event.title.toLowerCase().includes(query.toLowerCase()) ||
        event.description.toLowerCase().includes(query.toLowerCase()) ||
        event.location.toLowerCase().includes(query.toLowerCase()) ||
        event.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
      );
    }
    
    setFilteredEvents(filtered);
  };

  const handleEventClick = (eventId: string) => {
    window.location.href = `/events/${eventId}`;
  };

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
          <h1 className="text-4xl font-bold text-gray-900 mb-6">イベント一覧</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-6">
            デザインギルドが主催する様々なイベントをご紹介します。
            ネットワーキング、ワークショップ、セミナーなど、あなたの成長につながるイベントが見つかります。
          </p>
          <div className="flex justify-center">
            <AnimatedButton 
              variant="outline" 
              onClick={() => window.location.href = '/events/archive'}
              className="inline-flex items-center"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              過去のイベントを見る
            </AnimatedButton>
          </div>
        </motion.div>

        {/* View Mode Toggle */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex rounded-lg border border-gray-200 p-1">
            <button
              onClick={() => setViewMode('grid')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                viewMode === 'grid'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <svg className="w-4 h-4 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
              グリッド表示
            </button>
            <button
              onClick={() => setViewMode('calendar')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                viewMode === 'calendar'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <svg className="w-4 h-4 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              カレンダー表示
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="max-w-md mx-auto mb-8">
          <div className="relative">
            <input
              type="text"
              placeholder="イベントを検索..."
              value={searchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <svg className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <button 
            onClick={() => handleFilterChange('all')}
            className={`px-6 py-2 rounded-full font-medium transition-colors ${
              activeFilter === 'all' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            すべて
          </button>
          <button 
            onClick={() => handleFilterChange('networking')}
            className={`px-6 py-2 rounded-full font-medium transition-colors ${
              activeFilter === 'networking' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            ネットワーキング
          </button>
          <button 
            onClick={() => handleFilterChange('workshop')}
            className={`px-6 py-2 rounded-full font-medium transition-colors ${
              activeFilter === 'workshop' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            ワークショップ
          </button>
          <button 
            onClick={() => handleFilterChange('seminar')}
            className={`px-6 py-2 rounded-full font-medium transition-colors ${
              activeFilter === 'seminar' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            セミナー
          </button>
          <button 
            onClick={() => handleFilterChange('exhibition')}
            className={`px-6 py-2 rounded-full font-medium transition-colors ${
              activeFilter === 'exhibition' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            展示会
          </button>
          <button 
            onClick={() => handleFilterChange('competition')}
            className={`px-6 py-2 rounded-full font-medium transition-colors ${
              activeFilter === 'competition' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            コンペティション
          </button>
        </div>

        {/* Content Area */}
        {viewMode === 'calendar' ? (
          <div className="mb-12">
            <EventCalendar 
              events={filteredEvents} 
              onEventClick={handleEventClick}
            />
          </div>
        ) : (
          /* Events Grid */
          <motion.div 
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
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
          {filteredEvents.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <div className="text-gray-400 mb-4">
                <svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 16l2.879-2.879m0 0a3 3 0 104.243-4.242 3 3 0 00-4.243 4.242zM21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">イベントが見つかりませんでした</h3>
              <p className="text-gray-500 mb-4">検索条件を変更してもう一度お試しください。</p>
              <AnimatedButton 
                variant="outline"
                onClick={() => {
                  setSearchQuery('');
                  setActiveFilter('all');
                  setFilteredEvents(allEvents);
                }}
              >
                フィルターをリセット
              </AnimatedButton>
            </div>
          ) : (
            filteredEvents.map((event, index) => {
            const spotsLeft = event.capacity - event.registered;
            const isAlmostFull = spotsLeft < 10;
            
            return (
              <motion.div
                key={event.id}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 }
                }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className="bg-white rounded-xl shadow-md overflow-hidden cursor-pointer"
                onClick={() => {
                  window.location.href = `/events/${event.id}`;
                }}
              >
                {/* Event Image */}
                <div className="relative h-48 overflow-hidden">
                  <PlaceholderImage
                    width={400}
                    height={192}
                    text={event.title}
                    type="event"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${categoryColors[event.category]}`}>
                      {categoryLabels[event.category]}
                    </span>
                  </div>
                  {isAlmostFull && (
                    <div className="absolute top-4 right-4">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                        残りわずか
                      </span>
                    </div>
                  )}
                </div>

                {/* Event Info */}
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{event.title}</h3>
                  {event.subtitle && (
                    <p className="text-sm text-gray-600 mb-3">{event.subtitle}</p>
                  )}
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm text-gray-600">
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      {new Date(event.date).toLocaleDateString('ja-JP', { 
                        month: 'long', 
                        day: 'numeric',
                        weekday: 'short'
                      })} {event.startTime}〜
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      {event.location}
                    </div>
                  </div>

                  {/* Price and Capacity */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div>
                      {event.earlyBirdPrice && new Date(event.earlyBirdDeadline!) > new Date() ? (
                        <div>
                          <p className="text-lg font-bold text-blue-600">¥{event.earlyBirdPrice.toLocaleString()}</p>
                          <p className="text-xs text-gray-500 line-through">¥{event.price.toLocaleString()}</p>
                        </div>
                      ) : (
                        <p className="text-lg font-bold text-gray-900">
                          {event.price === 0 ? '無料' : `¥${event.price.toLocaleString()}`}
                        </p>
                      )}
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-600">
                        {event.registered}/{event.capacity}名
                      </p>
                      <div className="w-20 bg-gray-200 rounded-full h-1.5 mt-1">
                        <div 
                          className={`h-1.5 rounded-full ${isAlmostFull ? 'bg-red-500' : 'bg-blue-600'}`}
                          style={{ width: `${(event.registered / event.capacity) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          }))}
          </motion.div>
        )}

        {/* Newsletter CTA - Only show in grid view */}
        {viewMode === 'grid' && (
        <motion.div 
          className="mt-20 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            イベント情報をいち早くお届け
          </h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            デザインギルドのニュースレターに登録して、最新のイベント情報や限定特典を受け取りましょう。
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <input
              type="email"
              placeholder="メールアドレスを入力"
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <AnimatedButton>
              登録する
            </AnimatedButton>
          </div>
        </motion.div>
        )}
      </main>
      <Footer />
    </div>
  );
}