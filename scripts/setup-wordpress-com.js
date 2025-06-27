#!/usr/bin/env node

/**
 * WordPress.com自動セットアップスクリプト
 * カテゴリ作成、サンプル投稿、環境変数設定を自動化
 */

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// カラー出力用
const colors = {
  green: '\x1b[32m',
  blue: '\x1b[34m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  reset: '\x1b[0m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function question(prompt) {
  return new Promise((resolve) => {
    rl.question(prompt, resolve);
  });
}

// サンプルデータ
const sampleEvent = {
  title: 'クリエイティブ・ネットワーキング 2024',
  content: `<!-- META_START -->
{
  "subtitle": "デザイン業界の最新トレンドと交流会",
  "event_date": "2024-12-15",
  "start_time": "17:00:00",
  "end_time": "19:00:00",
  "location": "東京・渋谷",
  "venue": "渋谷クリエイティブセンター",
  "category": "networking",
  "capacity": "30",
  "registered": "8",
  "tags": "ネットワーキング,デザイン,トレンド"
}
<!-- META_END -->

デザイン業界で活躍するプロフェッショナルが集まる交流イベントです。
最新のデザイントレンドについて情報交換し、新しいネットワークを築きましょう。

## 参加対象
- グラフィックデザイナー
- UIデザイナー
- UXデザイナー
- Webデザイナー
- デザイン業界に興味のある方

## プログラム
- 17:00-17:30 受付・歓談
- 17:30-18:30 トレンドセッション
- 18:30-19:00 ネットワーキング

参加費無料、お気軽にご参加ください！`
};

const sampleCreator = {
  title: '山田花子',
  content: `<!-- META_START -->
{
  "profession": "UIデザイナー",
  "skills": "ui-ux,web,figma",
  "email": "yamada@example.com",
  "twitter": "yamada_ui",
  "instagram": "yamada_design",
  "website": "https://yamada-design.jp"
}
<!-- META_END -->

UI/UXデザインを専門とする5年目のデザイナーです。
ユーザビリティを重視したインターフェースデザインを得意としています。

## 専門分野
- モバイルアプリUI
- Webサイトデザイン
- プロトタイピング
- ユーザビリティテスト

## 使用ツール
- Figma
- Adobe XD
- Sketch
- Principle

お気軽にお声がけください！`
};

async function createCategory(baseUrl, username, password, categoryName, description) {
  const auth = Buffer.from(`${username}:${password}`).toString('base64');
  
  try {
    const response = await fetch(`${baseUrl}/wp-json/wp/v2/categories`, {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${auth}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: categoryName,
        slug: categoryName,
        description: description
      })
    });

    if (response.ok) {
      const category = await response.json();
      log(`✅ カテゴリ「${categoryName}」を作成しました (ID: ${category.id})`, 'green');
      return category.id;
    } else {
      const error = await response.json();
      if (error.code === 'term_exists') {
        // 既存のカテゴリIDを取得
        const existingResponse = await fetch(`${baseUrl}/wp-json/wp/v2/categories?slug=${categoryName}`, {
          headers: { 'Authorization': `Basic ${auth}` }
        });
        const existing = await existingResponse.json();
        log(`⚠️ カテゴリ「${categoryName}」は既に存在します (ID: ${existing[0].id})`, 'yellow');
        return existing[0].id;
      }
      throw new Error(`カテゴリ作成エラー: ${error.message}`);
    }
  } catch (error) {
    log(`❌ カテゴリ「${categoryName}」の作成に失敗: ${error.message}`, 'red');
    return null;
  }
}

async function createPost(baseUrl, username, password, title, content, categoryId) {
  const auth = Buffer.from(`${username}:${password}`).toString('base64');
  
  try {
    const response = await fetch(`${baseUrl}/wp-json/wp/v2/posts`, {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${auth}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: title,
        content: content,
        categories: [categoryId],
        status: 'publish'
      })
    });

    if (response.ok) {
      const post = await response.json();
      log(`✅ 投稿「${title}」を作成しました (ID: ${post.id})`, 'green');
      return post.id;
    } else {
      const error = await response.json();
      throw new Error(`投稿作成エラー: ${error.message}`);
    }
  } catch (error) {
    log(`❌ 投稿「${title}」の作成に失敗: ${error.message}`, 'red');
    return null;
  }
}

function updateEnvFile(wpUrl, wpType = 'free') {
  const envPath = path.join(process.cwd(), '.env.local');
  let envContent = '';

  if (fs.existsSync(envPath)) {
    envContent = fs.readFileSync(envPath, 'utf8');
  }

  // 既存の設定を更新または追加
  const updates = {
    'NEXT_PUBLIC_WP_API_URL': `${wpUrl}/wp-json/wp/v2`,
    'NEXT_PUBLIC_WP_TYPE': wpType,
    'NEXT_PUBLIC_USE_WORDPRESS': 'true'
  };

  Object.entries(updates).forEach(([key, value]) => {
    const regex = new RegExp(`^${key}=.*$`, 'm');
    if (regex.test(envContent)) {
      envContent = envContent.replace(regex, `${key}=${value}`);
    } else {
      envContent += `\n${key}=${value}`;
    }
  });

  fs.writeFileSync(envPath, envContent);
  log('✅ .env.local を更新しました', 'green');
}

async function main() {
  log('🚀 WordPress.com 自動セットアップを開始します', 'blue');
  console.log();

  // 基本情報の入力
  const wpUrl = await question('WordPressサイトのURL (例: https://your-site.wordpress.com): ');
  const username = await question('WordPressユーザー名: ');
  const password = await question('WordPressパスワード（またはアプリケーションパスワード）: ');

  console.log();
  log('⚙️ セットアップを開始します...', 'blue');

  // 接続テスト
  try {
    const testResponse = await fetch(`${wpUrl}/wp-json/wp/v2`);
    if (!testResponse.ok) {
      throw new Error('WordPress REST APIに接続できません');
    }
    log('✅ WordPress REST API接続確認完了', 'green');
  } catch (error) {
    log(`❌ 接続エラー: ${error.message}`, 'red');
    process.exit(1);
  }

  // カテゴリ作成
  log('\n📁 カテゴリを作成します...', 'blue');
  const eventsId = await createCategory(wpUrl, username, password, 'events', 'イベント情報の管理');
  const creatorsId = await createCategory(wpUrl, username, password, 'creators', 'クリエイター情報の管理');

  // サンプル投稿作成
  if (eventsId && creatorsId) {
    log('\n📝 サンプル投稿を作成します...', 'blue');
    await createPost(wpUrl, username, password, sampleEvent.title, sampleEvent.content, eventsId);
    await createPost(wpUrl, username, password, sampleCreator.title, sampleCreator.content, creatorsId);
  }

  // 環境変数更新
  log('\n⚙️ 環境変数を更新します...', 'blue');
  updateEnvFile(wpUrl, 'free');

  console.log();
  log('🎉 セットアップ完了！', 'green');
  log('💡 npm run dev でNext.jsを起動して確認してください', 'blue');
  
  rl.close();
}

if (require.main === module) {
  main().catch(console.error);
}