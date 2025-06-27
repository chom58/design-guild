/**
 * WordPress REST API連携ユーティリティ
 */

// WordPress REST APIの基本設定
const WP_API_BASE_URL = process.env.NEXT_PUBLIC_WP_API_URL || 'http://localhost:10003/wp-json/wp/v2';

/**
 * WordPress REST APIからデータを取得する汎用関数
 */
async function fetchFromWordPress<T>(endpoint: string, params?: Record<string, string>): Promise<T> {
  try {
    const url = new URL(`${WP_API_BASE_URL}/${endpoint}`);
    
    // パラメータが指定されている場合はクエリストリングに追加
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        url.searchParams.append(key, value);
      });
    }

    const response = await fetch(url.toString(), {
      headers: {
        'Content-Type': 'application/json',
      },
      // キャッシュ設定（本番環境では調整が必要）
      next: { revalidate: 300 } // 5分間キャッシュ
    });

    if (!response.ok) {
      throw new Error(`WordPress API error: ${response.status} ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`WordPress API fetch error for ${endpoint}:`, error);
    throw error;
  }
}

/**
 * WordPress投稿データの基本型定義
 */
export interface WordPressPost {
  id: number;
  date: string;
  date_gmt: string;
  guid: { rendered: string };
  modified: string;
  modified_gmt: string;
  slug: string;
  status: string;
  type: string;
  link: string;
  title: { rendered: string };
  content: { rendered: string; protected: boolean };
  excerpt: { rendered: string; protected: boolean };
  author: number;
  featured_media: number;
  comment_status: string;
  ping_status: string;
  sticky: boolean;
  template: string;
  format: string;
  meta: Record<string, unknown>;
  categories: number[];
  tags: number[];
  acf?: Record<string, unknown>; // Advanced Custom Fields
  _links: Record<string, unknown>;
}

/**
 * WordPressメディアオブジェクトの型定義
 */
export interface WordPressMedia {
  id: number;
  date: string;
  slug: string;
  type: string;
  link: string;
  title: { rendered: string };
  author: number;
  description: { rendered: string };
  caption: { rendered: string };
  alt_text: string;
  media_type: string;
  mime_type: string;
  media_details: {
    width: number;
    height: number;
    file: string;
    sizes: Record<string, {
      file: string;
      width: number;
      height: number;
      mime_type: string;
      source_url: string;
    }>;
  };
  source_url: string;
}

/**
 * イベント投稿を取得
 */
export async function getEventsFromWordPress(): Promise<WordPressPost[]> {
  return fetchFromWordPress<WordPressPost[]>('events', {
    'per_page': '100',
    'status': 'publish',
    '_embed': 'true' // 関連データも一緒に取得
  });
}

/**
 * 特定のイベントを取得
 */
export async function getEventFromWordPress(id: string): Promise<WordPressPost> {
  return fetchFromWordPress<WordPressPost>(`events/${id}`, {
    '_embed': 'true'
  });
}

/**
 * クリエイター投稿を取得
 */
export async function getCreatorsFromWordPress(): Promise<WordPressPost[]> {
  return fetchFromWordPress<WordPressPost[]>('creators', {
    'per_page': '100',
    'status': 'publish',
    '_embed': 'true'
  });
}

/**
 * 特定のクリエイターを取得
 */
export async function getCreatorFromWordPress(id: string): Promise<WordPressPost> {
  return fetchFromWordPress<WordPressPost>(`creators/${id}`, {
    '_embed': 'true'
  });
}

/**
 * WordPressのメディアファイルを取得
 */
export async function getMediaFromWordPress(id: number): Promise<WordPressMedia> {
  return fetchFromWordPress<WordPressMedia>(`media/${id}`);
}

/**
 * カテゴリ情報を取得
 */
export async function getCategoriesFromWordPress(): Promise<Record<string, unknown>[]> {
  return fetchFromWordPress<Record<string, unknown>[]>('categories', {
    'per_page': '100'
  });
}

/**
 * タグ情報を取得
 */
export async function getTagsFromWordPress(): Promise<Record<string, unknown>[]> {
  return fetchFromWordPress<Record<string, unknown>[]>('tags', {
    'per_page': '100'
  });
}

/**
 * WordPress APIが利用可能かチェック
 */
export async function checkWordPressConnection(): Promise<boolean> {
  try {
    const response = await fetch(`${WP_API_BASE_URL.replace('/wp/v2', '')}`);
    return response.ok;
  } catch (error) {
    console.error('WordPress connection check failed:', error);
    return false;
  }
}