#!/bin/bash

# Production database migration script
# Run this after setting up Vercel Postgres

echo "🔄 Setting up production database..."

# Use PostgreSQL schema for production
echo "📝 Switching to PostgreSQL schema..."
cp prisma/schema-postgres.prisma prisma/schema.prisma

# Generate Prisma client
echo "⚙️ Generating Prisma client..."
npx prisma generate

# Apply schema to production database
echo "🗄️ Applying schema to production database..."
npx prisma db push --accept-data-loss

echo "✅ Production database setup complete!"
echo ""
echo "Next steps:"
echo "1. Update Vercel environment variables"
echo "2. Redeploy the application"
echo "3. Test authentication functionality"