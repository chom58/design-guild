import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // セキュリティヘッダーの設定
  const response = NextResponse.next();
  
  // XSS対策
  response.headers.set('X-XSS-Protection', '1; mode=block');
  
  // クリックジャッキング対策
  response.headers.set('X-Frame-Options', 'DENY');
  
  // コンテンツタイプスニッフィング対策
  response.headers.set('X-Content-Type-Options', 'nosniff');
  
  // HTTPS強制（本番環境のみ）
  if (process.env.NODE_ENV === 'production') {
    response.headers.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
  }
  
  // Referrerポリシー
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  
  // 権限ポリシー
  response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
  
  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};