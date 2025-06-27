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
    
    // TypeScriptの型定義を削除し、JSONとして解析できるよう変換
    let eventsString = eventsMatch[1];
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

// GET: 特定のイベント取得
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: '認証が必要です' }, { status: 401 });
    }

    const events = readEventsFromFile();
    const event = events.find(e => e.id === params.id);
    
    if (!event) {
      return NextResponse.json({ error: 'イベントが見つかりません' }, { status: 404 });
    }

    return NextResponse.json(event);
  } catch (error) {
    console.error('イベント取得エラー:', error);
    return NextResponse.json(
      { error: 'イベントの取得に失敗しました' },
      { status: 500 }
    );
  }
}

// PUT: イベント更新
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
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
    const eventIndex = events.findIndex(e => e.id === params.id);
    
    if (eventIndex === -1) {
      return NextResponse.json({ error: 'イベントが見つかりません' }, { status: 404 });
    }

    // イベントを更新
    const updatedEvent: Event = {
      ...events[eventIndex],
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
      registered: eventData.registered || events[eventIndex].registered,
      updatedAt: new Date().toISOString()
    };

    events[eventIndex] = updatedEvent;
    writeEventsToFile(events);

    return NextResponse.json(updatedEvent);
  } catch (error) {
    console.error('イベント更新エラー:', error);
    return NextResponse.json(
      { error: 'イベントの更新に失敗しました' },
      { status: 500 }
    );
  }
}

// DELETE: イベント削除
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: '認証が必要です' }, { status: 401 });
    }

    const events = readEventsFromFile();
    const eventIndex = events.findIndex(e => e.id === params.id);
    
    if (eventIndex === -1) {
      return NextResponse.json({ error: 'イベントが見つかりません' }, { status: 404 });
    }

    // イベントを削除
    events.splice(eventIndex, 1);
    writeEventsToFile(events);

    return NextResponse.json({ message: 'イベントが削除されました' });
  } catch (error) {
    console.error('イベント削除エラー:', error);
    return NextResponse.json(
      { error: 'イベントの削除に失敗しました' },
      { status: 500 }
    );
  }
}