'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { AnimatedButton } from '@/components/ui/AnimatedButton';
import { PlaceholderImage } from '@/components/ui/PlaceholderImage';
import { getEventById } from '@/lib/dataService';
import { Event } from '@/lib/types';


interface EventDetailPageProps {
  params: Promise<{ id: string }>;
}

export default function EventDetailPage({ params }: EventDetailPageProps) {
  // For client components in Next.js 15, we need to handle the Promise differently
  const [event, setEvent] = useState<Event | null>(null);
  const [eventId, setEventId] = useState<string>('');
  const { data: session } = useSession();
  const router = useRouter();
  const [isRegistered, setIsRegistered] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    Promise.resolve(params).then(async ({ id }) => {
      setEventId(id);
      try {
        const eventData = await getEventById(id);
        if (eventData) {
          setEvent(eventData);
        }
      } catch (error) {
        console.error('Failed to fetch event:', error);
      }
    });
  }, [params]);

  // Check registration status
  useEffect(() => {
    if (session && eventId) {
      fetch(`/api/events/registration-status?eventId=${eventId}`)
        .then(res => res.json())
        .then(data => {
          if (data.registered) {
            setIsRegistered(true);
          }
        })
        .catch(console.error);
    }
  }, [session, eventId]);

  const [showSuccess, setShowSuccess] = useState(false);

  if (!event) {
    return <div>Loading...</div>;
  }

  const isRegistrationOpen = event.status === 'upcoming' && new Date(event.registrationDeadline) > new Date();
  const spotsLeft = event.capacity - event.registered;
  const isAlmostFull = spotsLeft < 10;

  const handleRegistration = async () => {
    if (!session) {
      router.push('/auth/signin');
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch('/api/events/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ eventId })
      });

      const data = await response.json();

      if (response.ok) {
        setIsRegistered(true);
        setShowSuccess(true);
      } else {
        alert(data.error || '参加登録に失敗しました');
      }
    } catch (error) {
      alert('参加登録中にエラーが発生しました');
    } finally {
      setIsLoading(false);
    }
  };

  const handleUnregister = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/events/register?eventId=${eventId}`, {
        method: 'DELETE'
      });

      const data = await response.json();

      if (response.ok) {
        setIsRegistered(false);
      } else {
        alert(data.error || 'キャンセルに失敗しました');
      }
    } catch (error) {
      alert('キャンセル中にエラーが発生しました');
    } finally {
      setIsLoading(false);
    }
  };

  const categoryLabels = {
    networking: 'ネットワーキング',
    workshop: 'ワークショップ',
    seminar: 'セミナー',
    exhibition: '展示会',
    competition: 'コンペティション'
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Navigation */}
        <div className="mb-8">
          <Link href="/events">
            <AnimatedButton variant="outline" className="inline-flex items-center">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              イベント一覧に戻る
            </AnimatedButton>
          </Link>
        </div>

        {/* Event Header */}
        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          <div className="lg:col-span-2">
            {/* Event Image */}
            <div className="relative h-96 rounded-xl overflow-hidden mb-8">
              <PlaceholderImage
                width={800}
                height={400}
                text={event.title}
                type="event"
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                  {categoryLabels[event.category]}
                </span>
              </div>
            </div>

            {/* Event Title and Info */}
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">{event.title}</h1>
              {event.subtitle && (
                <p className="text-xl text-gray-600 mb-6">{event.subtitle}</p>
              )}
              
              <div className="flex flex-wrap gap-4 mb-6">
                <div className="flex items-center text-gray-600">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  {new Date(event.date).toLocaleDateString('ja-JP', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric',
                    weekday: 'long'
                  })}
                </div>
                <div className="flex items-center text-gray-600">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {event.startTime} - {event.endTime}
                </div>
                <div className="flex items-center text-gray-600">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {event.location}
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-8">
                {event.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              {/* Description */}
              <div className="prose prose-lg max-w-none mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">イベント概要</h2>
                <p className="text-gray-700 whitespace-pre-line">{event.longDescription || event.description}</p>
              </div>

              {/* Speakers */}
              {event.speakers && event.speakers.length > 0 && (
                <div className="mb-12">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">登壇者</h2>
                  <div className="grid md:grid-cols-2 gap-6">
                    {event.speakers.map((speaker, index) => (
                      <div key={index} className="flex items-start space-x-4">
                        <div className="w-20 h-20 rounded-full overflow-hidden bg-gray-200">
                          <PlaceholderImage
                            width={80}
                            height={80}
                            text={speaker.name}
                            type="profile"
                          />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900">{speaker.name}</h3>
                          <p className="text-sm text-gray-600 mb-2">{speaker.title}</p>
                          <p className="text-sm text-gray-700">{speaker.bio}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Agenda */}
              {event.agenda && event.agenda.length > 0 && (
                <div className="mb-12">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">タイムテーブル</h2>
                  <div className="space-y-4">
                    {event.agenda.map((item, index) => (
                      <div key={index} className="flex border-l-4 border-blue-500 pl-4">
                        <div className="min-w-[100px]">
                          <span className="font-semibold text-gray-900">{item.time}</span>
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900">{item.title}</h3>
                          {item.speaker && (
                            <p className="text-sm text-gray-600">登壇者: {item.speaker}</p>
                          )}
                          {item.description && (
                            <p className="text-sm text-gray-700 mt-1">{item.description}</p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar - Registration Info */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              {/* Registration Card */}
              <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">参加申し込み</h3>
                
                <div className="mb-6 text-center">
                  <p className="text-2xl font-bold text-blue-600 mb-2">参加無料</p>
                  <p className="text-sm text-gray-600">どなたでもお気軽にご参加いただけます</p>
                </div>

                {/* Capacity */}
                <div className="mb-6">
                  <div className="flex justify-between text-sm text-gray-600 mb-2">
                    <span>参加枠</span>
                    <span>{event.registered} / {event.capacity}名</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${isAlmostFull ? 'bg-red-500' : 'bg-blue-600'}`}
                      style={{ width: `${(event.registered / event.capacity) * 100}%` }}
                    ></div>
                  </div>
                  {isAlmostFull && (
                    <p className="text-sm text-red-600 mt-2">残りわずか！</p>
                  )}
                </div>

                {/* Registration Button */}
                {isRegistrationOpen ? (
                  session ? (
                    isRegistered ? (
                      <div className="space-y-3">
                        <div className="bg-green-50 text-green-700 px-4 py-3 rounded-lg text-center">
                          <p className="font-medium">参加登録済み</p>
                        </div>
                        <AnimatedButton
                          variant="outline"
                          className="w-full"
                          size="lg"
                          onClick={handleUnregister}
                          disabled={isLoading}
                        >
                          {isLoading ? 'キャンセル中...' : '参加をキャンセル'}
                        </AnimatedButton>
                      </div>
                    ) : (
                      <AnimatedButton 
                        className="w-full mb-4" 
                        size="lg"
                        onClick={handleRegistration}
                        disabled={isLoading}
                      >
                        {isLoading ? '登録中...' : '参加申し込み'}
                      </AnimatedButton>
                    )
                  ) : (
                    <Link href="/auth/signin">
                      <AnimatedButton className="w-full mb-4" size="lg">
                        ログインして参加申し込み
                      </AnimatedButton>
                    </Link>
                  )
                ) : (
                  <button disabled className="w-full px-4 py-3 bg-gray-300 text-gray-500 rounded-lg cursor-not-allowed">
                    申し込み終了
                  </button>
                )}
                
                <p className="text-xs text-gray-500 text-center">
                  申込締切: {new Date(event.registrationDeadline).toLocaleDateString('ja-JP')}
                </p>
              </div>

              {/* Event Details Card */}
              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">イベント詳細</h3>
                
                {/* Venue */}
                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-gray-700 mb-2">会場</h4>
                  <p className="text-sm text-gray-600">{event.venue}</p>
                </div>

                {/* What's Included */}
                {event.includes && event.includes.length > 0 && (
                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-gray-700 mb-2">含まれるもの</h4>
                    <ul className="space-y-1">
                      {event.includes.map((item, index) => (
                        <li key={index} className="text-sm text-gray-600 flex items-start">
                          <svg className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Requirements */}
                {event.requirements && event.requirements.length > 0 && (
                  <div>
                    <h4 className="text-sm font-semibold text-gray-700 mb-2">参加条件・持ち物</h4>
                    <ul className="space-y-1">
                      {event.requirements.map((item, index) => (
                        <li key={index} className="text-sm text-gray-600 flex items-start">
                          <svg className="w-4 h-4 text-blue-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />

      {/* Success Modal */}
      {showSuccess && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-8 max-w-md w-full">
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
                <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                参加登録が完了しました！
              </h3>
              <p className="text-gray-600 mb-6">
                イベント詳細はメールでお送りします。<br />
                当日お会いできることを楽しみにしています。
              </p>
              <AnimatedButton onClick={() => setShowSuccess(false)}>
                閉じる
              </AnimatedButton>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

