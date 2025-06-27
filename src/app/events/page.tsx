'use client';

import { motion } from 'framer-motion';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { AnimatedButton } from '@/components/ui/AnimatedButton';
import { PlaceholderImage } from '@/components/ui/PlaceholderImage';
import { getUpcomingEvents } from '@/lib/eventsData';

export default function EventsPage() {
  const events = getUpcomingEvents();

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
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            デザインギルドが主催する様々なイベントをご紹介します。
            ネットワーキング、ワークショップ、セミナーなど、あなたの成長につながるイベントが見つかります。
          </p>
        </motion.div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <button className="px-6 py-2 bg-blue-600 text-white rounded-full font-medium">
            すべて
          </button>
          <button className="px-6 py-2 bg-gray-100 text-gray-700 rounded-full font-medium hover:bg-gray-200 transition-colors">
            ネットワーキング
          </button>
          <button className="px-6 py-2 bg-gray-100 text-gray-700 rounded-full font-medium hover:bg-gray-200 transition-colors">
            ワークショップ
          </button>
          <button className="px-6 py-2 bg-gray-100 text-gray-700 rounded-full font-medium hover:bg-gray-200 transition-colors">
            セミナー
          </button>
        </div>

        {/* Events Grid */}
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
          {events.map((event, index) => {
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
          })}
        </motion.div>

        {/* Newsletter CTA */}
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
      </main>
      <Footer />
    </div>
  );
}