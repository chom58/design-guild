/**
 * WordPressから取得したデータを既存の型に変換するユーティリティ
 */

import { Event } from './types';
import { 
  WordPressPost, 
  getEventsFromWordPress, 
  getEventFromWordPress,
  checkWordPressConnection 
} from './wordpress';

// 既存のハードコードされたデータ（フォールバック用）
import { events as fallbackEvents, getEventById as getFallbackEventById } from './eventsData';

/**
 * WordPressのイベント投稿を既存のEvent型に変換
 */
function transformWordPressEventToEvent(wpEvent: WordPressPost): Event {
  const acf = wpEvent.acf || {};
  
  return {
    id: wpEvent.id.toString(),
    title: wpEvent.title.rendered,
    subtitle: (acf.subtitle as string) || '',
    date: (acf.event_date as string) || wpEvent.date.split('T')[0],
    startTime: (acf.start_time as string) || '14:00',
    endTime: (acf.end_time as string) || '18:00',
    location: (acf.location as string) || '東京',
    venue: (acf.venue as string) || '',
    description: wpEvent.excerpt.rendered.replace(/<[^>]*>/g, ''), // HTMLタグを除去
    longDescription: (acf.long_description as string) || wpEvent.content.rendered.replace(/<[^>]*>/g, ''),
    image: (acf.featured_image as string) || '/images/events/default.jpg',
    category: mapWordPressCategory((acf.category as string) || 'networking'),
    tags: acf.tags ? (acf.tags as string).split(',').map((tag: string) => tag.trim()) : [],
    speakers: acf.speakers ? JSON.parse(acf.speakers as string) : undefined,
    agenda: acf.agenda ? JSON.parse(acf.agenda as string) : undefined,
    capacity: parseInt((acf.capacity as string) || '50') || 50,
    registered: parseInt((acf.registered as string) || '0') || 0,
    price: 0, // 常に無料
    includes: acf.includes ? (acf.includes as string).split(',').map((item: string) => item.trim()) : [],
    requirements: acf.requirements ? (acf.requirements as string).split(',').map((req: string) => req.trim()) : [],
    status: mapWordPressStatus(wpEvent.status),
    registrationDeadline: (acf.registration_deadline as string) || (acf.event_date as string) || wpEvent.date.split('T')[0]
  };
}

/**
 * WordPressのカテゴリを既存のカテゴリ型にマッピング
 */
function mapWordPressCategory(wpCategory: string): Event['category'] {
  const categoryMap: Record<string, Event['category']> = {
    'networking': 'networking',
    'workshop': 'workshop',
    'seminar': 'seminar',
    'exhibition': 'exhibition',
    'competition': 'competition',
    'ネットワーキング': 'networking',
    'ワークショップ': 'workshop',
    'セミナー': 'seminar',
    '展示会': 'exhibition',
    'コンペティション': 'competition'
  };
  
  return categoryMap[wpCategory] || 'networking';
}

/**
 * WordPressの投稿ステータスを既存のステータス型にマッピング
 */
function mapWordPressStatus(wpStatus: string): Event['status'] {
  const statusMap: Record<string, Event['status']> = {
    'publish': 'upcoming',
    'draft': 'upcoming',
    'private': 'upcoming',
    'future': 'upcoming'
  };
  
  return statusMap[wpStatus] || 'upcoming';
}

/**
 * 今後のイベントを取得（WordPress優先、フォールバック対応）
 */
export async function getUpcomingEvents(): Promise<Event[]> {
  try {
    // WordPress接続チェック
    const isConnected = await checkWordPressConnection();
    
    if (!isConnected) {
      console.log('WordPress not available, using fallback data');
      return fallbackEvents;
    }

    // WordPressからイベントデータを取得
    const wpEvents = await getEventsFromWordPress();
    
    if (!wpEvents || wpEvents.length === 0) {
      console.log('No WordPress events found, using fallback data');
      return fallbackEvents;
    }

    // WordPressデータを変換
    const events = wpEvents.map(transformWordPressEventToEvent);
    
    // 今後のイベントのみフィルタ
    const now = new Date();
    const upcomingEvents = events.filter(event => {
      const eventDate = new Date(event.date);
      return eventDate >= now;
    });

    console.log(`Found ${upcomingEvents.length} upcoming events from WordPress`);
    return upcomingEvents;
    
  } catch (error) {
    console.error('Error fetching events from WordPress:', error);
    console.log('Falling back to static data');
    return fallbackEvents;
  }
}

/**
 * 特定のイベントを取得（WordPress優先、フォールバック対応）
 */
export async function getEventById(id: string): Promise<Event | undefined> {
  try {
    // WordPress接続チェック
    const isConnected = await checkWordPressConnection();
    
    if (!isConnected) {
      console.log('WordPress not available, using fallback data');
      return getFallbackEventById(id);
    }

    // WordPressから特定のイベントを取得
    const wpEvent = await getEventFromWordPress(id);
    
    if (!wpEvent) {
      console.log(`WordPress event ${id} not found, using fallback data`);
      return getFallbackEventById(id);
    }

    // WordPressデータを変換
    const event = transformWordPressEventToEvent(wpEvent);
    
    console.log(`Found event ${id} from WordPress`);
    return event;
    
  } catch (error) {
    console.error(`Error fetching event ${id} from WordPress:`, error);
    console.log('Falling back to static data');
    return getFallbackEventById(id);
  }
}

/**
 * すべてのイベントを取得（過去・未来含む）
 */
export async function getAllEvents(): Promise<Event[]> {
  try {
    const isConnected = await checkWordPressConnection();
    
    if (!isConnected) {
      return fallbackEvents;
    }

    const wpEvents = await getEventsFromWordPress();
    
    if (!wpEvents || wpEvents.length === 0) {
      return fallbackEvents;
    }

    return wpEvents.map(transformWordPressEventToEvent);
    
  } catch (error) {
    console.error('Error fetching all events from WordPress:', error);
    return fallbackEvents;
  }
}