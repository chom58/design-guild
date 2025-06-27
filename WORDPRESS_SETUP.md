# WordPress連携セットアップガイド

このガイドでは、デザインギルドサイトをWordPressで管理できるようにセットアップする手順を説明します。

## 1. WordPress環境の準備

### Local by Flywheel を使用（推奨）
1. [Local by Flywheel](https://localwp.com/) をダウンロード・インストール
2. 新しいサイトを作成
   - サイト名: `design-guild`
   - ユーザー名: `admin`
   - パスワード: 任意
3. WordPressが起動したらダッシュボードにアクセス

### 必要なプラグインのインストール
WordPressダッシュボードで以下のプラグインをインストール・有効化：

1. **Advanced Custom Fields**
   - カスタムフィールドの作成に使用
   - 無料版で十分です

2. **Custom Post Type UI**
   - カスタム投稿タイプの作成に使用

## 2. カスタム投稿タイプの作成

### イベント投稿タイプ
1. WordPressダッシュボード → CPT UI → Add/Edit Post Types
2. 以下の設定で作成：
   ```
   Post Type Slug: events
   Plural Label: イベント
   Singular Label: イベント
   Show in REST API: true
   REST API base slug: events
   ```

### クリエイター投稿タイプ
1. CPT UI → Add/Edit Post Types
2. 以下の設定で作成：
   ```
   Post Type Slug: creators
   Plural Label: クリエイター
   Singular Label: クリエイター
   Show in REST API: true
   REST API base slug: creators
   ```

## 3. カスタムフィールドの設定（ACF）

### イベント用カスタムフィールド
ACF → Field Groups → Add New で以下のフィールドを作成：

```
フィールドグループ名: イベント詳細
適用場所: 投稿タイプ = events

フィールド:
- subtitle (テキスト): サブタイトル
- event_date (日付): 開催日
- start_time (時刻): 開始時間
- end_time (時刻): 終了時間
- location (テキスト): 開催場所
- venue (テキスト): 会場名
- long_description (テキストエリア): 詳細説明
- category (選択): カテゴリ
  選択肢: networking, workshop, seminar, exhibition, competition
- tags (テキスト): タグ（カンマ区切り）
- capacity (数値): 定員
- registered (数値): 参加者数
- registration_deadline (日付): 申込締切
- speakers (テキストエリア): 登壇者情報（JSON形式）
- agenda (テキストエリア): アジェンダ（JSON形式）
- includes (テキストエリア): 含まれるもの（カンマ区切り）
- requirements (テキストエリア): 参加条件（カンマ区切り）
```

### クリエイター用カスタムフィールド
```
フィールドグループ名: クリエイター詳細
適用場所: 投稿タイプ = creators

フィールド:
- profession (テキスト): 職業
- bio (テキストエリア): 経歴・プロフィール
- skills (テキスト): スキル（カンマ区切り）
  例: graphic,branding,illustration
- portfolio (テキストエリア): ポートフォリオ（JSON形式）
- email (メール): メールアドレス
- twitter (テキスト): Twitterアカウント
- instagram (テキスト): Instagramアカウント
- linkedin (テキスト): LinkedInアカウント
- website (URL): ウェブサイト
- profile_image (画像): プロフィール画像
```

## 4. サンプルデータの入力

### イベントのサンプル
1. WordPress ダッシュボード → イベント → 新規追加
2. 以下の情報を入力：
   ```
   タイトル: クリエイティブ・ネットワーキング 2024
   内容: デザイン業界の最新トレンドと交流会
   
   カスタムフィールド:
   - subtitle: デザイン業界の最新トレンドと交流会
   - event_date: 2024-07-15
   - start_time: 14:00
   - end_time: 18:00
   - location: 東京・渋谷
   - venue: 渋谷クリエイティブセンター
   - category: networking
   - tags: ネットワーキング,デザイン,トレンド
   - capacity: 150
   - registered: 89
   - registration_deadline: 2024-07-10
   ```

### クリエイターのサンプル
1. WordPress ダッシュボード → クリエイター → 新規追加
2. 以下の情報を入力：
   ```
   タイトル: 田中 美咲
   内容: ブランディングとグラフィックデザインを専門とするデザイナーです...
   
   カスタムフィールド:
   - profession: グラフィックデザイナー
   - skills: graphic,branding
   - email: tanaka@example.com
   - twitter: dguild_tanaka_m
   - instagram: designguild.tanaka
   ```

## 5. Next.js側の設定

### WordPress連携を有効化
`.env.local` ファイルを編集：
```env
NEXT_PUBLIC_USE_WORDPRESS=true
NEXT_PUBLIC_WP_API_URL=http://localhost:10003/wp-json/wp/v2
```

### 動作確認
1. Next.jsアプリを再起動: `npm run dev`
2. ブラウザでサイトにアクセス
3. WordPressで入力したデータが表示されることを確認

## 6. トラブルシューティング

### REST APIが利用できない場合
1. WordPress設定 → パーマリンク設定を確認
2. .htaccessファイルの権限を確認
3. プラグインの競合を確認

### データが表示されない場合
1. ブラウザのコンソールでエラーを確認
2. カスタム投稿タイプのREST API設定を確認
3. カスタムフィールドの設定を確認

### 接続できない場合
1. WordPressサイトのURLを確認
2. Local by FlywheelのサイトがStarted状態か確認
3. ポート番号が正しいか確認

## 7. 本番環境への展開

1. WordPressサイトを本番サーバーにデプロイ
2. `.env.local`のWP_API_URLを本番URLに変更
3. Vercelの環境変数設定でWordPress連携を有効化

## JSON形式のサンプル

### speakers（登壇者）
```json
[
  {
    "name": "山田太郎",
    "title": "クリエイティブディレクター",
    "bio": "大手広告代理店でクリエイティブディレクターを務める。",
    "image": "/images/speakers/yamada.jpg"
  }
]
```

### agenda（アジェンダ）
```json
[
  {
    "time": "14:00-14:15",
    "title": "開会挨拶・イベント説明",
    "description": "デザインギルド代表による開会の挨拶"
  }
]
```

### portfolio（ポートフォリオ）
```json
[
  {
    "title": "ブランドアイデンティティ",
    "type": "pdf",
    "url": "/portfolio/brand-identity.pdf",
    "thumbnail": "/images/portfolio/brand1.svg",
    "description": "スタートアップ企業のブランディング"
  }
]
```