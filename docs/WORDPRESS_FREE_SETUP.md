# WordPress.com 無料プラン セットアップ手順

## 1. WordPress.com アカウント作成

1. [WordPress.com](https://wordpress.com) にアクセス
2. 「サイトを作成」をクリック
3. サイト名: `design-guild-cms` (例)
4. 無料プランを選択
5. サブドメイン: `design-guild-cms.wordpress.com`

## 2. カスタム投稿タイプの追加

WordPress.com無料プランでは制限があるため、通常の投稿でカテゴリ分けして管理：

### イベント管理
- カテゴリ: `events`
- タグで細分化: `networking`, `workshop`, `seminar`

### クリエイター管理  
- カテゴリ: `creators`
- タグでスキル分け: `graphic`, `ui-ux`, `web`

## 3. REST APIエンドポイント

WordPress.com は REST API が標準で有効：

```
https://design-guild-cms.wordpress.com/wp-json/wp/v2/posts?categories=イベントのカテゴリID
https://design-guild-cms.wordpress.com/wp-json/wp/v2/posts?categories=クリエイターのカテゴリID
```

## 4. Next.js側の設定更新

```bash
# .env.local
NEXT_PUBLIC_WP_API_URL=https://design-guild-cms.wordpress.com/wp-json/wp/v2
NEXT_PUBLIC_USE_WORDPRESS=true
```

## 5. 制限事項と対策

### 制限事項
- カスタム投稿タイプ不可 → 通常投稿でカテゴリ分け
- ACF不可 → カスタムフィールドで代用
- プラグイン制限 → WordPress.com標準機能のみ

### 対策
- メタデータは投稿内容にJSON形式で記載
- 画像はWordPress.comのメディアライブラリ使用
- 構造化された投稿フォーマットで統一

## 6. 投稿フォーマット例

### イベント投稿
```
タイトル: クリエイティブ・ネットワーキング 2024
カテゴリ: events
タグ: networking, design, trend

本文:
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
  "registered": "30",
  "tags": "ネットワーキング,デザイン,トレンド"
}
<!-- META_END -->

イベントの詳細説明をここに記載...
```

## 7. 費用
- **WordPress.com**: 完全無料
- **独自ドメイン**: 年額1,000円程度（任意）
- **合計**: 月額0円〜83円

## 8. アップグレード時の費用
- Personal プラン: 月額500円（独自ドメイン付き）
- Premium プラン: 月額900円（プラグイン一部利用可）
- Business プラン: 月額2,900円（全プラグイン利用可）