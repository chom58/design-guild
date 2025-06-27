// 本番データベースのセットアップスクリプト
// Vercel Postgresデータベースが作成された後に実行

const { execSync } = require('child_process');

console.log('Setting up production database...');

try {
  // PostgreSQL用のスキーマを使用
  execSync('cp prisma/schema-postgres.prisma prisma/schema.prisma', { stdio: 'inherit' });
  
  // Prismaクライアントを生成
  execSync('npx prisma generate', { stdio: 'inherit' });
  
  // データベースにスキーマを適用
  execSync('npx prisma db push', { stdio: 'inherit' });
  
  console.log('✅ Production database setup complete!');
} catch (error) {
  console.error('❌ Error setting up production database:', error);
  process.exit(1);
}