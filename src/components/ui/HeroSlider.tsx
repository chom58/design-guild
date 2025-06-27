'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Calendar, MapPin, Users } from 'lucide-react';
import { Event } from '@/lib/types';

interface HeroSliderProps {
  events: Event[];
  autoPlay?: boolean;
  autoPlayDelay?: number;
}

export const HeroSlider: React.FC<HeroSliderProps> = ({
  events,
  autoPlay = true,
  autoPlayDelay = 5000
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % events.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + events.length) % events.length);
  };

  useEffect(() => {
    if (autoPlay && events.length > 1) {
      const interval = setInterval(nextSlide, autoPlayDelay);
      return () => clearInterval(interval);
    }
  }, [autoPlay, autoPlayDelay, events.length]);

  if (!events.length) return null;

  const currentEvent = events[currentIndex];

  // 動的グラデーション生成
  const generateGradient = (eventCategory: string) => {
    const gradients = {
      networking: 'from-blue-600 via-purple-600 to-pink-600',
      workshop: 'from-green-500 via-teal-500 to-blue-500',
      seminar: 'from-orange-500 via-red-500 to-pink-500',
      default: 'from-gray-600 via-gray-700 to-gray-800'
    };
    return gradients[eventCategory as keyof typeof gradients] || gradients.default;
  };

  return (
    <div className="relative h-[70vh] overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.7 }}
          className={`absolute inset-0 bg-gradient-to-br ${generateGradient(currentEvent.category)}`}
        >
          {/* 背景パターン */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.1"%3E%3Ccircle cx="30" cy="30" r="2"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]"></div>
          </div>

          {/* コンテンツ */}
          <div className="relative h-full flex items-center">
            <div className="container mx-auto px-6">
              <div className="max-w-4xl">
                <motion.div
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                  className="mb-4"
                >
                  <span className="inline-block px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm font-medium">
                    {currentEvent.category.toUpperCase()}
                  </span>
                </motion.div>

                <motion.h1
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                  className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight"
                >
                  {currentEvent.title}
                </motion.h1>

                <motion.p
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                  className="text-xl text-white/90 mb-8 leading-relaxed"
                >
                  {currentEvent.subtitle || currentEvent.description}
                </motion.p>

                {/* イベント詳細 */}
                <motion.div
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.6 }}
                  className="flex flex-wrap gap-6 mb-8"
                >
                  <div className="flex items-center text-white/90">
                    <Calendar className="w-5 h-5 mr-2" />
                    <span>{currentEvent.date} {currentEvent.startTime}</span>
                  </div>
                  <div className="flex items-center text-white/90">
                    <MapPin className="w-5 h-5 mr-2" />
                    <span>{currentEvent.venue || currentEvent.location}</span>
                  </div>
                  <div className="flex items-center text-white/90">
                    <Users className="w-5 h-5 mr-2" />
                    <span>{currentEvent.registered}/{currentEvent.capacity} 参加</span>
                  </div>
                </motion.div>

                {/* CTA ボタン */}
                <motion.div
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.6, duration: 0.6 }}
                  className="flex gap-4"
                >
                  <button className="px-8 py-4 bg-white text-gray-900 font-semibold rounded-lg hover:bg-gray-100 transition-colors duration-200 shadow-lg">
                    詳細を見る
                  </button>
                  <button className="px-8 py-4 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-gray-900 transition-colors duration-200">
                    参加登録
                  </button>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* ナビゲーション */}
      {events.length > 1 && (
        <>
          <button
            onClick={prevSlide}
            className="absolute left-6 top-1/2 -translate-y-1/2 p-3 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors duration-200"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-6 top-1/2 -translate-y-1/2 p-3 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors duration-200"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* インジケーター */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
            {events.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-colors duration-200 ${
                  index === currentIndex ? 'bg-white' : 'bg-white/40'
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};