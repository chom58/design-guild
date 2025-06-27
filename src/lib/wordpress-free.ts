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
 * JSONパースに失敗した場合の手動メタデータ抽出
 */
function extractMetaDataManually(metaText: string): any {
  const meta: any = {};
  
  // 基本的なパターンマッチング
  const patterns = {
    subtitle: /"subtitle":\s*"([^"]+)"/,
    event_date: /"event_date":\s*"([^"]+)"/,
    start_time: /"start_time":\s*"([^"]+)"/,
    end_time: /"end_time":\s*"([^"]+)"/,
    location: /"location":\s*"([^"]+)"/,
    venue: /"venue":\s*"([^"]+)"/,
    category: /"category":\s*"([^"]+)"/,
    capacity: /"capacity":\s*"([^"]+)"/,
    registered: /"registered":\s*"([^"]+)"/,
    tags: /"tags":\s*"([^"]+)"/
  };
  
  Object.entries(patterns).forEach(([key, pattern]) => {
    const match = metaText.match(pattern);
    if (match) {
      meta[key] = match[1];
    }
  });
  
  return meta;
}

/**
 * クリエイター用の手動メタデータ抽出
 */
function extractCreatorMetaDataManually(metaText: string): any {
  const meta: any = {};
  
  const patterns = {
    profession: /"profession":\s*"([^"]+)"/,
    skills: /"skills":\s*"([^"]+)"/,
    email: /"email":\s*"([^"]+)"/,
    twitter: /"twitter":\s*"([^"]+)"/,
    instagram: /"instagram":\s*"([^"]+)"/,
    website: /"website":\s*"([^"]+)"/
  };
  
  Object.entries(patterns).forEach(([key, pattern]) => {
    const match = metaText.match(pattern);
    if (match) {
      meta[key] = match[1];
    }
  });
  
  return meta;
}

/**
 * HTMLエンティティを完全にデコードする関数
 */
function decodeHTMLEntities(text: string): string {
  const entities: { [key: string]: string } = {
    '&amp;': '&',
    '&lt;': '<',
    '&gt;': '>',
    '&quot;': '"',
    '&#8211;': '-',
    '&#8212;': '-',
    '&#8216;': "'",
    '&#8217;': "'",
    '&#8220;': '"',
    '&#8221;': '"',
    '&#8230;': '...',
    '&nbsp;': ' ',
    '&#038;': '&',
    '&ldquo;': '"',
    '&rdquo;': '"',
    '&lsquo;': "'",
    '&rsquo;': "'",
    '&ndash;': '-',
    '&mdash;': '-'
  };

  let decodedText = text;
  
  // 定義済みエンティティを置換
  Object.entries(entities).forEach(([entity, char]) => {
    decodedText = decodedText.replace(new RegExp(entity, 'g'), char);
  });
  
  // 数字エンティティ（&#数字;）を置換
  decodedText = decodedText.replace(/&#(\d+);/g, (match, dec) => {
    return String.fromCharCode(parseInt(dec));
  });
  
  // 16進数エンティティ（&#x数字;）を置換
  decodedText = decodedText.replace(/&#x([0-9a-f]+);/gi, (match, hex) => {
    return String.fromCharCode(parseInt(hex, 16));
  });
  
  return decodedText;
}

/**
 * WordPress.com 無料プランでのイベント取得
 * カテゴリ「events」の投稿を取得
 */
export async function getEventsFromWordPressFree(): Promise<Event[]> {
  try {
    // eventsカテゴリ（ID: 924）の投稿を直接取得
    const eventsResponse = await fetch(`${WP_FREE_API_BASE}/posts?category=events&per_page=100`);
    const response = await eventsResponse.json();
    const posts = response.posts || [];
    
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
    // creatorsカテゴリ（ID: 181758）の投稿を直接取得
    const creatorsResponse = await fetch(`${WP_FREE_API_BASE}/posts?category=creators&per_page=100`);
    const response = await creatorsResponse.json();
    const posts = response.posts || [];
    
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
  // WordPress.com Public APIのcontent文字列からメタデータを抽出
  const content = post.content || '';
  // HTMLエンティティを完全にデコード
  const decodedContent = decodeHTMLEntities(content);
    
  // WordPress.comが追加するHTMLタグを除去してからメタデータを抽出
  const cleanContent = decodedContent
    .replace(/<p[^>]*>/g, '')
    .replace(/<\/p>/g, '')
    .replace(/<em[^>]*>/g, '')
    .replace(/<\/em>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/\s+/g, ' ');
    
  const metaMatch = cleanContent.match(/<!-- META_START -->([\s\S]*?)<!-- META_END -->/);
  let meta = {};
  
  if (metaMatch) {
    try {
      // メタデータ部分をさらにクリーンアップしてJSONとして解析
      let metaText = metaMatch[1].trim();
      // 余分な空白やHTML要素を除去
      metaText = metaText.replace(/\s+/g, ' ').trim();
      
      console.log('Extracting meta from:', metaText);
      meta = JSON.parse(metaText);
      console.log('Meta parsed successfully:', meta);
    } catch (e) {
      console.warn('Failed to parse event meta:', e);
      console.warn('Meta text was:', metaMatch[1]);
      
      // JSONパースに失敗した場合、手動でメタデータを抽出
      try {
        const fallbackMeta = extractMetaDataManually(metaMatch[1]);
        if (Object.keys(fallbackMeta).length > 0) {
          meta = fallbackMeta;
          console.log('Meta extracted manually:', meta);
        }
      } catch (fallbackError) {
        console.warn('Manual meta extraction also failed:', fallbackError);
      }
    }
  }

  return {
    id: post.ID.toString(),
    title: post.title || '',
    subtitle: (meta as any).subtitle || '',
    date: (meta as any).event_date || post.date.split('T')[0],
    startTime: (meta as any).start_time || '14:00',
    endTime: (meta as any).end_time || '18:00',
    location: (meta as any).location || '東京',
    venue: (meta as any).venue || '',
    description: (post.excerpt || '').replace(/<[^>]*>/g, ''),
    longDescription: decodedContent
      .replace(/<!-- META_START -->[\s\S]*?<!-- META_END -->/, '')
      .replace(/<[^>]*>/g, ''),
    image: post.featured_image || '/images/events/default.jpg',
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
  // WordPress.com Public APIのcontent文字列からメタデータを抽出
  const content = post.content || '';
  // HTMLエンティティを完全にデコード
  const decodedContent = decodeHTMLEntities(content);
    
  // WordPress.comが追加するHTMLタグを除去してからメタデータを抽出
  const cleanContent = decodedContent
    .replace(/<p[^>]*>/g, '')
    .replace(/<\/p>/g, '')
    .replace(/<em[^>]*>/g, '')
    .replace(/<\/em>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/\s+/g, ' ');
    
  const metaMatch = cleanContent.match(/<!-- META_START -->([\s\S]*?)<!-- META_END -->/);
  let meta = {};
  
  if (metaMatch) {
    try {
      // メタデータ部分をさらにクリーンアップしてJSONとして解析
      let metaText = metaMatch[1].trim();
      metaText = metaText.replace(/\s+/g, ' ').trim();
      
      console.log('Extracting creator meta from:', metaText);
      meta = JSON.parse(metaText);
      console.log('Creator meta parsed successfully:', meta);
    } catch (e) {
      console.warn('Failed to parse creator meta:', e);
      console.warn('Meta text was:', metaMatch[1]);
      
      // JSONパースに失敗した場合、手動でメタデータを抽出
      try {
        const fallbackMeta = extractCreatorMetaDataManually(metaMatch[1]);
        if (Object.keys(fallbackMeta).length > 0) {
          meta = fallbackMeta;
          console.log('Creator meta extracted manually:', meta);
        }
      } catch (fallbackError) {
        console.warn('Manual creator meta extraction also failed:', fallbackError);
      }
    }
  }

  return {
    id: post.ID.toString(),
    name: post.title || '',
    profileImage: post.featured_image || '/images/creators/default.svg',
    profession: (meta as any).profession || 'デザイナー',
    bio: decodedContent
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