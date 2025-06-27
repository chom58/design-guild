/**
 * アプリケーション設定
 */

// WordPress連携の有効/無効を切り替え
// 管理画面を使用するため、WordPressモードは無効化
export const USE_WORDPRESS = false;

// WordPress API設定
export const WORDPRESS_CONFIG = {
  apiUrl: process.env.NEXT_PUBLIC_WP_API_URL || 'http://localhost:10003/wp-json/wp/v2',
  timeout: 5000, // 5秒でタイムアウト
  retries: 2 // リトライ回数
};

// 開発用設定
export const DEV_CONFIG = {
  enableLogs: process.env.NODE_ENV === 'development',
  showWordPressStatus: process.env.NODE_ENV === 'development'
};