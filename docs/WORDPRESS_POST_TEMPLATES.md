# WordPress.com 投稿テンプレート

## イベント投稿テンプレート

### 基本設定
- **カテゴリ**: `events`
- **タグ**: `networking`, `workshop`, `seminar` 等

### 投稿内容

```markdown
<!-- META_START -->
{
  "subtitle": "デザイン業界の最新トレンドと交流会",
  "event_date": "2024-07-15",
  "start_time": "17:00:00",
  "end_time": "19:00:00",
  "location": "東京・渋谷",
  "venue": "サイゼリア",
  "category": "networking",
  "capacity": "30",
  "registered": "0",
  "tags": "ネットワーキング,デザイン,トレンド"
}
<!-- META_END -->

# イベント概要

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

## 会場アクセス
渋谷駅から徒歩5分
詳細な場所は参加者にメールでお知らせします。
```

## クリエイター投稿テンプレート

### 基本設定
- **カテゴリ**: `creators`
- **タグ**: `graphic`, `ui-ux`, `web`, `illustration` 等

### 投稿内容

```markdown
<!-- META_START -->
{
  "profession": "グラフィックデザイナー",
  "skills": "graphic,branding,print",
  "email": "tanaka@example.com",
  "twitter": "tanaka_design",
  "instagram": "tanaka_creative",
  "website": "https://tanaka-design.com",
  "portfolio": "[{\"title\":\"ブランドロゴデザイン\",\"type\":\"image\",\"url\":\"/images/portfolio/logo1.jpg\",\"description\":\"スタートアップ企業のロゴデザイン\"}]"
}
<!-- META_END -->

# プロフィール

10年以上の経験を持つグラフィックデザイナーです。
ブランディングから印刷物まで幅広いデザインを手がけています。

## 専門分野
- ロゴデザイン
- ブランドアイデンティティ
- パッケージデザイン
- 印刷物デザイン

## 実績
- 大手食品会社のパッケージデザイン
- スタートアップのブランドデザイン
- 展覧会ポスター・カタログデザイン

## メッセージ
デザインを通じて企業の価値を最大化することを使命としています。
お気軽にご相談ください。
```

## カテゴリID確認方法

WordPress.comでカテゴリIDを確認：

1. WordPress管理画面 → 投稿 → カテゴリー
2. 各カテゴリの編集画面でURLを確認
3. `tag_ID=数字` の部分がカテゴリID

例：
- events カテゴリ: ID = 1
- creators カテゴリ: ID = 2

## 投稿手順

1. WordPress管理画面で「新規投稿」
2. 上記テンプレートをコピー&ペースト
3. 適切なカテゴリとタグを設定
4. アイキャッチ画像を設定
5. 公開

## 注意事項

- METAデータは必ず`<!-- META_START -->`と`<!-- META_END -->`で囲む
- JSON形式は正確に記述（カンマやクォート忘れに注意）
- 日付は YYYY-MM-DD 形式
- 時刻は HH:MM:SS 形式