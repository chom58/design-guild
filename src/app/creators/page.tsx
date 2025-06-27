'use client';

import { useState, useEffect } from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { AnimatedCard } from '@/components/ui/AnimatedCard';
import { motion } from 'framer-motion';
import { getAllCreators } from '@/lib/dataService';
import { Creator } from '@/lib/types';

export default function CreatorsPage() {
  const [creators, setCreators] = useState<Creator[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCreators() {
      try {
        setLoading(true);
        const creatorsData = await getAllCreators();
        setCreators(creatorsData);
      } catch (error) {
        console.error('Failed to fetch creators:', error);
      } finally {
        setLoading(false);
      }
    }
    
    fetchCreators();
  }, []);

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
          <h1 className="text-4xl font-bold text-gray-900 mb-6">クリエイター一覧</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            デザインギルドで活躍する才能豊かなクリエイターたちをご紹介します。
            各クリエイターの詳細プロフィールやポートフォリオをご覧いただけます。
          </p>
        </motion.div>

        {/* Loading State */}
        {loading ? (
          <div className="text-center py-20">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <p className="mt-4 text-gray-600">クリエイターを読み込み中...</p>
          </div>
        ) : (
          /* Creators Grid */
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
            {creators.map((creator, index) => (
            <motion.div
              key={creator.id}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 }
              }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <AnimatedCard
                id={creator.id}
                name={creator.name}
                profession={creator.profession}
                skills={creator.skills}
                onClick={(id) => {
                  // Navigate to creator detail page
                  window.location.href = `/creators/${id}`;
                }}
              />
            </motion.div>
            ))}
          </motion.div>
        )}

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              クリエイターとして参加しませんか？
            </h2>
            <p className="text-gray-600 mb-6">
              デザインギルドでは新しいメンバーを募集しています。
              あなたの才能を活かして、一緒にクリエイティブなコミュニティを築きましょう。
            </p>
            <a 
              href="/contact"
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
            >
              参加の申し込み
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}