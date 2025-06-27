import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import fs from 'fs';
import path from 'path';
import { Creator } from '@/lib/types';

const CREATORS_FILE_PATH = path.join(process.cwd(), 'src/lib/data.ts');

// TypeScriptファイルからクリエイターデータを読み取る
function readCreatorsFromFile(): Creator[] {
  try {
    const fileContent = fs.readFileSync(CREATORS_FILE_PATH, 'utf-8');
    
    // creators配列の部分を抽出
    const creatorsMatch = fileContent.match(/export const creators: Creator\[\] = (\[[\s\S]*?\]);/);
    if (!creatorsMatch) {
      throw new Error('creatorsデータが見つかりません');
    }
    
    // TypeScriptの型定義を削除し、JSONとして解析できるよう変換
    let creatorsString = creatorsMatch[1];
    creatorsString = creatorsString
      .replace(/(\w+):/g, '"$1":') // プロパティ名をクォート
      .replace(/'/g, '"') // シングルクォートをダブルクォートに変換
      .replace(/,(\s*[}\]])/g, '$1'); // 末尾のカンマを削除
    
    return JSON.parse(creatorsString);
  } catch (error) {
    console.error('クリエイターファイル読み込みエラー:', error);
    return [];
  }
}

// TypeScriptファイルにクリエイターデータを書き込む
function writeCreatorsToFile(creators: Creator[]) {
  const fileTemplate = `/**
 * クリエイターデータ
 * 管理画面から自動生成されたファイルです
 */

import { Creator } from './types';

export const creators: Creator[] = ${JSON.stringify(creators, null, 2)};

export function getCreatorById(id: string): Creator | undefined {
  return creators.find(creator => creator.id === id);
}

export function getCreatorsBySkill(skill: string): Creator[] {
  return creators.filter(creator => 
    creator.skills.some(s => s.toLowerCase().includes(skill.toLowerCase()))
  );
}
`;

  fs.writeFileSync(CREATORS_FILE_PATH, fileTemplate, 'utf-8');
}

// GET: 特定のクリエイター取得
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: '認証が必要です' }, { status: 401 });
    }

    const creators = readCreatorsFromFile();
    const creator = creators.find(c => c.id === params.id);
    
    if (!creator) {
      return NextResponse.json({ error: 'クリエイターが見つかりません' }, { status: 404 });
    }

    return NextResponse.json(creator);
  } catch (error) {
    console.error('クリエイター取得エラー:', error);
    return NextResponse.json(
      { error: 'クリエイターの取得に失敗しました' },
      { status: 500 }
    );
  }
}

// PUT: クリエイター更新
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: '認証が必要です' }, { status: 401 });
    }

    const creatorData = await request.json();
    
    // バリデーション
    if (!creatorData.name || !creatorData.profession || !creatorData.bio) {
      return NextResponse.json(
        { error: '必須項目が不足しています' },
        { status: 400 }
      );
    }

    const creators = readCreatorsFromFile();
    const creatorIndex = creators.findIndex(c => c.id === params.id);
    
    if (creatorIndex === -1) {
      return NextResponse.json({ error: 'クリエイターが見つかりません' }, { status: 404 });
    }

    // クリエイターを更新
    const updatedCreator: Creator = {
      ...creators[creatorIndex],
      name: creatorData.name,
      profileImage: creatorData.profileImage || '/images/creators/default.svg',
      profession: creatorData.profession,
      bio: creatorData.bio,
      skills: creatorData.skills || [],
      email: creatorData.email || undefined,
      portfolio: creatorData.portfolio || [],
      social: creatorData.social || {},
      updatedAt: new Date().toISOString()
    };

    creators[creatorIndex] = updatedCreator;
    writeCreatorsToFile(creators);

    return NextResponse.json(updatedCreator);
  } catch (error) {
    console.error('クリエイター更新エラー:', error);
    return NextResponse.json(
      { error: 'クリエイターの更新に失敗しました' },
      { status: 500 }
    );
  }
}

// DELETE: クリエイター削除
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: '認証が必要です' }, { status: 401 });
    }

    const creators = readCreatorsFromFile();
    const creatorIndex = creators.findIndex(c => c.id === params.id);
    
    if (creatorIndex === -1) {
      return NextResponse.json({ error: 'クリエイターが見つかりません' }, { status: 404 });
    }

    // クリエイターを削除
    creators.splice(creatorIndex, 1);
    writeCreatorsToFile(creators);

    return NextResponse.json({ message: 'クリエイターが削除されました' });
  } catch (error) {
    console.error('クリエイター削除エラー:', error);
    return NextResponse.json(
      { error: 'クリエイターの削除に失敗しました' },
      { status: 500 }
    );
  }
}