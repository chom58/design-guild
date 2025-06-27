# WordPress.com無料プラン クイックスタートガイド

## 🚀 今すぐ始める5ステップ（5分で完了）

### Step 1: WordPress.comアカウント作成
1. [WordPress.com](https://wordpress.com) にアクセス
2. 「サイトを作成」をクリック
3. サイト名: `design-guild-cms` （好きな名前でOK）
4. 無料プランを選択
5. URL: `design-guild-cms.wordpress.com` （メモしておく）

### Step 2: カテゴリ作成
1. WordPress管理画面 → 投稿 → カテゴリー
2. 以下のカテゴリを作成：
   - **events** （イベント用）
   - **creators** （クリエイター用）
3. 各カテゴリのIDをメモ（URLの `tag_ID=数字` 部分）

### Step 3: サンプル投稿作成
1. 投稿 → 新規追加
2. [投稿テンプレート](./WORDPRESS_POST_TEMPLATES.md) をコピー
3. 1つずつ投稿を作成（イベント1個、クリエイター1個）

### Step 4: Next.js環境変数設定
```bash
# .env.local を更新
NEXT_PUBLIC_WP_API_URL=https://your-site.wordpress.com/wp-json/wp/v2
NEXT_PUBLIC_WP_TYPE=free
NEXT_PUBLIC_USE_WORDPRESS=true
```

### Step 5: 動作確認
```bash
npm run dev
```
http://localhost:3000 でWordPressデータが表示されることを確認

## 📝 本番環境での設定

### Vercel環境変数
Vercelダッシュボードで以下を設定：
- `NEXT_PUBLIC_WP_API_URL`: `https://your-site.wordpress.com/wp-json/wp/v2`
- `NEXT_PUBLIC_WP_TYPE`: `free`
- `NEXT_PUBLIC_USE_WORDPRESS`: `true`

## 🎯 WordPress.com投稿のコツ

### イベント投稿
- カテゴリ: `events`
- アイキャッチ画像: 必ず設定
- MEタデータ: 正確なJSON形式で記述

### クリエイター投稿
- カテゴリ: `creators`
- プロフィール写真: アイキャッチ画像として設定
- ポートフォリオ: 画像URLは WordPress.com のメディアライブラリから

## 🔧 トラブルシューティング

### データが表示されない場合
1. カテゴリIDが正しいか確認
2. MEタデータのJSON形式をチェック
3. ブラウザの開発者ツールでAPIエラーを確認

### APIエラーの場合
1. WordPress.comサイトが公開状態か確認
2. REST APIが有効か確認（WordPress.com無料版は標準で有効）
3. URLに誤字がないか確認

## 💰 費用
- **WordPress.com**: 完全無料
- **運用費用**: 月額0円
- **アップグレード**: 必要に応じて後から可能

## 📈 アップグレード時のメリット
- **Personal**: 月額500円 → 独自ドメイン
- **Premium**: 月額900円 → テーマ・プラグイン
- **Business**: 月額2,900円 → 全機能・ACF利用可能