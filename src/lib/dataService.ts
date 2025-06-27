/**
 * データ取得サービス
 * WordPress連携とスタティックデータを統合管理
 */

import { USE_WORDPRESS } from './config';

// WordPress対応版のインポート
import { 
  getUpcomingEvents as getWordPressUpcomingEvents,
  getEventById as getWordPressEventById,
  getAllEvents as getWordPressAllEvents 
} from './eventsDataWordPress';

import {
  getAllCreators as getWordPressAllCreators,
  getCreatorById as getWordPressCreatorById
} from './dataWordPress';

// WordPress.com無料プラン対応
import { 
  getEventsFromWordPressFree, 
  getCreatorsFromWordPressFree,
  getEventByIdFromWordPressFree,
  getCreatorByIdFromWordPressFree,
  USE_WORDPRESS_FREE
} from './wordpress-free';

// スタティックデータのインポート
import { 
  events as staticEvents,
  getEventById as getStaticEventById 
} from './eventsData';

import {
  creators as staticCreators,
  getCreatorById as getStaticCreatorById
} from './data';

import { Event, Creator } from './types';

/**
 * 今後のイベントを取得
 */
export async function getUpcomingEvents(): Promise<Event[]> {
  if (USE_WORDPRESS) {
    if (USE_WORDPRESS_FREE) {
      const events = await getEventsFromWordPressFree();
      // 今後のイベントのみフィルタ
      const now = new Date();
      return events.filter(event => new Date(event.date) >= now);
    }
    return getWordPressUpcomingEvents();
  }
  return staticEvents;
}

/**
 * 特定のイベントを取得
 */
export async function getEventById(id: string): Promise<Event | undefined> {
  if (USE_WORDPRESS) {
    if (USE_WORDPRESS_FREE) {
      return getEventByIdFromWordPressFree(id);
    }
    return getWordPressEventById(id);
  }
  return getStaticEventById(id);
}

/**
 * すべてのイベントを取得
 */
export async function getAllEvents(): Promise<Event[]> {
  if (USE_WORDPRESS) {
    if (USE_WORDPRESS_FREE) {
      return getEventsFromWordPressFree();
    }
    return getWordPressAllEvents();
  }
  return staticEvents;
}

/**
 * すべてのクリエイターを取得
 */
export async function getAllCreators(): Promise<Creator[]> {
  if (USE_WORDPRESS) {
    if (USE_WORDPRESS_FREE) {
      return getCreatorsFromWordPressFree();
    }
    return getWordPressAllCreators();
  }
  return staticCreators;
}

/**
 * 特定のクリエイターを取得
 */
export async function getCreatorById(id: string): Promise<Creator | undefined> {
  if (USE_WORDPRESS) {
    if (USE_WORDPRESS_FREE) {
      return getCreatorByIdFromWordPressFree(id);
    }
    return getWordPressCreatorById(id);
  }
  return getStaticCreatorById(id);
}

/**
 * データソースの状態を取得（開発用）
 */
export function getDataSourceInfo() {
  return {
    useWordPress: USE_WORDPRESS,
    source: USE_WORDPRESS ? 'WordPress REST API' : 'Static Data',
    apiUrl: USE_WORDPRESS ? process.env.NEXT_PUBLIC_WP_API_URL : null
  };
}