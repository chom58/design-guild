// 環境変数の検証とデフォルト値の設定

const requiredEnvVars = [
  'DATABASE_URL',
  'NEXTAUTH_SECRET',
  'NEXTAUTH_URL'
] as const;

const optionalEnvVars = [
  'NEXT_PUBLIC_WP_API_URL',
  'NEXT_PUBLIC_USE_WORDPRESS'
] as const;

export function validateEnv() {
  const missingVars: string[] = [];

  for (const varName of requiredEnvVars) {
    if (!process.env[varName]) {
      missingVars.push(varName);
    }
  }

  if (missingVars.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missingVars.join(', ')}\n` +
      'Please check your .env.local file'
    );
  }
}

// 環境変数の型安全なアクセサー
export const env = {
  // Database
  DATABASE_URL: process.env.DATABASE_URL!,
  
  // NextAuth
  NEXTAUTH_URL: process.env.NEXTAUTH_URL!,
  NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET!,
  
  // WordPress (optional)
  WP_API_URL: process.env.NEXT_PUBLIC_WP_API_URL,
  USE_WORDPRESS: process.env.NEXT_PUBLIC_USE_WORDPRESS === 'true',
  
  // Node
  NODE_ENV: process.env.NODE_ENV as 'development' | 'production' | 'test',
  IS_PRODUCTION: process.env.NODE_ENV === 'production',
  IS_DEVELOPMENT: process.env.NODE_ENV === 'development'
};