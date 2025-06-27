import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import fs from 'fs';
import path from 'path';
import { Event } from '@/lib/types';

const EVENTS_FILE_PATH = path.join(process.cwd(), 'src/lib/eventsData.ts');

// TypeScriptファイルからイベントデータを読み取る
function readEventsFromFile(): Event[] {
  try {
    const fileContent = fs.readFileSync(EVENTS_FILE_PATH, 'utf-8');
    
    // events配列の部分を抽出
    const eventsMatch = fileContent.match(/export const events: Event\[\] = (\[[\s\S]*?\]);/);
    if (!eventsMatch) {
      throw new Error('eventsデータが見つかりません');
    }
    
    // 安全でないevalの代わりに、JSONとして解析できるよう変換
    let eventsString = eventsMatch[1];
    
    // TypeScriptの型定義を削除し、JSONとして解析できるよう変換
    eventsString = eventsString
      .replace(/(\w+):/g, '"$1":') // プロパティ名をクォート
      .replace(/'/g, '"') // シングルクォートをダブルクォートに変換
      .replace(/,(\s*[}\]])/g, '$1'); // 末尾のカンマを削除
    
    return JSON.parse(eventsString);
  } catch (error) {
    console.error('イベントファイル読み込みエラー:', error);
    return [];
  }
}

// TypeScriptファイルにイベントデータを書き込む
function writeEventsToFile(events: Event[]) {
  const fileTemplate = `/**
 * イベントデータ
 * 管理画面から自動生成されたファイルです
 */

import { Event } from './types';

export const events: Event[] = ${JSON.stringify(events, null, 2)};

export function getEventById(id: string): Event | undefined {
  return events.find(event => event.id === id);
}

export function getUpcomingEvents(): Event[] {
  const now = new Date();
  return events.filter(event => new Date(event.date) >= now);
}
`;

  fs.writeFileSync(EVENTS_FILE_PATH, fileTemplate, 'utf-8');
}

// GET: 全イベント取得
export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: '認証が必要です' }, { status: 401 });
    }

    const events = readEventsFromFile();
    return NextResponse.json(events);
  } catch (error) {
    console.error('イベント取得エラー:', error);
    return NextResponse.json(
      { error: 'イベントの取得に失敗しました' },
      { status: 500 }
    );
  }
}

// POST: 新しいイベント作成
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: '認証が必要です' }, { status: 401 });
    }

    const eventData = await request.json();
    
    // バリデーション
    if (!eventData.title || !eventData.date || !eventData.startTime || !eventData.endTime) {
      return NextResponse.json(
        { error: '必須項目が不足しています' },
        { status: 400 }
      );
    }

    const events = readEventsFromFile();
    
    // 新しいIDを生成
    const newId = Date.now().toString();
    
    const newEvent: Event = {
      id: newId,
      title: eventData.title,
      subtitle: eventData.subtitle || '',
      date: eventData.date,
      startTime: eventData.startTime,
      endTime: eventData.endTime,
      location: eventData.location,
      venue: eventData.venue || '',
      description: eventData.description,
      longDescription: eventData.longDescription || '',
      image: eventData.image || '/images/events/default.jpg',
      category: eventData.category,
      tags: eventData.tags || [],
      capacity: eventData.capacity,
      registered: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    events.push(newEvent);
    writeEventsToFile(events);

    return NextResponse.json(newEvent, { status: 201 });
  } catch (error) {
    console.error('イベント作成エラー:', error);
    return NextResponse.json(
      { error: 'イベントの作成に失敗しました' },
      { status: 500 }
    );
  }
}