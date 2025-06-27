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
    return getWordPressUpcomingEvents();
  }
  return staticEvents;
}

/**
 * 特定のイベントを取得
 */
export async function getEventById(id: string): Promise<Event | undefined> {
  if (USE_WORDPRESS) {
    return getWordPressEventById(id);
  }
  return getStaticEventById(id);
}

/**
 * すべてのイベントを取得
 */
export async function getAllEvents(): Promise<Event[]> {
  if (USE_WORDPRESS) {
    return getWordPressAllEvents();
  }
  return staticEvents;
}

/**
 * すべてのクリエイターを取得
 */
export async function getAllCreators(): Promise<Creator[]> {
  if (USE_WORDPRESS) {
    return getWordPressAllCreators();
  }
  return staticCreators;
}

/**
 * 特定のクリエイターを取得
 */
export async function getCreatorById(id: string): Promise<Creator | undefined> {
  if (USE_WORDPRESS) {
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