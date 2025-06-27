#!/bin/bash

# WordPress.com ワンクリックセットアップ
# 必要な情報を入力するだけで自動設定

echo "🚀 Design Guild WordPress.com クイックセットアップ"
echo "=================================================="
echo ""

# カラー定義
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# 入力受付
echo -e "${BLUE}📝 WordPress.com の情報を入力してください${NC}"
echo ""

read -p "WordPressサイトURL (例: https://design-guild-cms.wordpress.com): " WP_URL
read -p "WordPressユーザー名: " WP_USERNAME
read -s -p "WordPressパスワード: " WP_PASSWORD
echo ""
echo ""

# URLの正規化（末尾のスラッシュを削除）
WP_URL=${WP_URL%/}

echo -e "${BLUE}⚙️ 自動セットアップを開始します...${NC}"
echo ""

# Node.jsスクリプトを実行
cat << EOF | node scripts/setup-wordpress-com.js
${WP_URL}
${WP_USERNAME}
${WP_PASSWORD}
EOF

echo ""
echo -e "${GREEN}✅ セットアップ完了！${NC}"
echo ""
echo -e "${BLUE}🔄 Next.js開発サーバーを再起動してください：${NC}"
echo "   npm run dev"
echo ""
echo -e "${BLUE}🌐 確認URL：${NC}"
echo "   http://localhost:3000"
echo ""
echo -e "${YELLOW}💡 WordPress管理画面：${NC}"
echo "   ${WP_URL}/wp-admin"