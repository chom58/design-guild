/**
 * WordPress.com 無料プラン用のデータ変換
 * カスタム投稿タイプが使えないため、通常投稿でカテゴリ分けして管理
 */

import { Event, Creator } from './types';

// WordPress.com無料プランかどうかを判定
const isWordPressFree = process.env.NEXT_PUBLIC_WP_TYPE === 'free';
export const USE_WORDPRESS_FREE = isWordPressFree;

const WP_FREE_API_BASE = process.env.NEXT_PUBLIC_WP_API_URL || '';

/**
 * WordPress.com 無料プランでのイベント取得
 * カテゴリ「events」の投稿を取得
 */
export async function getEventsFromWordPressFree(): Promise<Event[]> {
  try {
    // カテゴリIDを事前に取得する必要があります
    const eventsResponse = await fetch(`${WP_FREE_API_BASE}/posts?categories=1&per_page=100`);
    const posts = await eventsResponse.json();
    
    return posts.map(transformWordPressPostToEvent);
  } catch (error) {
    console.error('Error fetching events from WordPress.com:', error);
    return [];
  }
}

/**
 * WordPress.com 無料プランでのクリエイター取得
 * カテゴリ「creators」の投稿を取得
 */
export async function getCreatorsFromWordPressFree(): Promise<Creator[]> {
  try {
    // カテゴリIDを事前に取得する必要があります
    const creatorsResponse = await fetch(`${WP_FREE_API_BASE}/posts?categories=2&per_page=100`);
    const posts = await creatorsResponse.json();
    
    return posts.map(transformWordPressPostToCreator);
  } catch (error) {
    console.error('Error fetching creators from WordPress.com:', error);
    return [];
  }
}

/**
 * WordPress.com投稿をイベント形式に変換
 */
function transformWordPressPostToEvent(post: any): Event {
  // 投稿内容からメタデータを抽出
  const metaMatch = post.content.rendered.match(/<!-- META_START -->([\s\S]*?)<!-- META_END -->/);
  let meta = {};
  
  if (metaMatch) {
    try {
      meta = JSON.parse(metaMatch[1]);
    } catch (e) {
      console.warn('Failed to parse event meta:', e);
    }
  }

  return {
    id: post.id.toString(),
    title: post.title.rendered,
    subtitle: (meta as any).subtitle || '',
    date: (meta as any).event_date || post.date.split('T')[0],
    startTime: (meta as any).start_time || '14:00',
    endTime: (meta as any).end_time || '18:00',
    location: (meta as any).location || '東京',
    venue: (meta as any).venue || '',
    description: post.excerpt.rendered.replace(/<[^>]*>/g, ''),
    longDescription: post.content.rendered
      .replace(/<!-- META_START -->[\s\S]*?<!-- META_END -->/, '')
      .replace(/<[^>]*>/g, ''),
    image: post.featured_media ? post._embedded?.['wp:featuredmedia']?.[0]?.source_url || '/images/events/default.jpg' : '/images/events/default.jpg',
    category: mapCategoryToEventType((meta as any).category || 'networking'),
    tags: (meta as any).tags ? (meta as any).tags.split(',').map((tag: string) => tag.trim()) : [],
    capacity: parseInt((meta as any).capacity || '50') || 50,
    registered: parseInt((meta as any).registered || '0') || 0,
    price: 0,
    includes: [],
    requirements: [],
    status: 'upcoming' as const,
    registrationDeadline: (meta as any).event_date || post.date.split('T')[0]
  };
}

/**
 * WordPress.com投稿をクリエイター形式に変換
 */
function transformWordPressPostToCreator(post: any): Creator {
  // 投稿内容からメタデータを抽出
  const metaMatch = post.content.rendered.match(/<!-- META_START -->([\s\S]*?)<!-- META_END -->/);
  let meta = {};
  
  if (metaMatch) {
    try {
      meta = JSON.parse(metaMatch[1]);
    } catch (e) {
      console.warn('Failed to parse creator meta:', e);
    }
  }

  return {
    id: post.id.toString(),
    name: post.title.rendered,
    profileImage: post.featured_media ? post._embedded?.['wp:featuredmedia']?.[0]?.source_url || '/images/creators/default.svg' : '/images/creators/default.svg',
    profession: (meta as any).profession || 'デザイナー',
    bio: post.content.rendered
      .replace(/<!-- META_START -->[\s\S]*?<!-- META_END -->/, '')
      .replace(/<[^>]*>/g, ''),
    skills: (meta as any).skills ? (meta as any).skills.split(',').map((skill: string) => skill.trim()) : ['graphic'],
    portfolio: (meta as any).portfolio ? JSON.parse((meta as any).portfolio) : [],
    social: {
      twitter: (meta as any).twitter,
      instagram: (meta as any).instagram,
      linkedin: (meta as any).linkedin,
      website: (meta as any).website
    },
    email: (meta as any).email || 'contact@example.com'
  };
}

/**
 * 特定のイベントを取得
 */
export async function getEventByIdFromWordPressFree(id: string): Promise<Event | undefined> {
  try {
    const response = await fetch(`${WP_FREE_API_BASE}/posts/${id}?_embed`);
    if (!response.ok) return undefined;
    
    const post = await response.json();
    return transformWordPressPostToEvent(post);
  } catch (error) {
    console.error('Error fetching event from WordPress.com:', error);
    return undefined;
  }
}

/**
 * 特定のクリエイターを取得
 */
export async function getCreatorByIdFromWordPressFree(id: string): Promise<Creator | undefined> {
  try {
    const response = await fetch(`${WP_FREE_API_BASE}/posts/${id}?_embed`);
    if (!response.ok) return undefined;
    
    const post = await response.json();
    return transformWordPressPostToCreator(post);
  } catch (error) {
    console.error('Error fetching creator from WordPress.com:', error);
    return undefined;
  }
}

/**
 * WordPress.com REST APIの接続チェック
 */
export async function checkWordPressFreeConnection(): Promise<boolean> {
  try {
    const response = await fetch(`${WP_FREE_API_BASE.replace('/wp/v2', '')}`);
    return response.ok;
  } catch (error) {
    console.error('WordPress.com connection check failed:', error);
    return false;
  }
}

function mapCategoryToEventType(category: string): Event['category'] {
  const categoryMap: Record<string, Event['category']> = {
    'networking': 'networking',
    'workshop': 'workshop',
    'seminar': 'seminar',
    'exhibition': 'exhibition',
    'competition': 'competition'
  };
  
  return categoryMap[category] || 'networking';
}