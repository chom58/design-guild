declare namespace NodeJS {
  interface ProcessEnv {
    // Database
    DATABASE_URL: string;
    
    // NextAuth
    NEXTAUTH_URL: string;
    NEXTAUTH_SECRET: string;
    
    // WordPress
    NEXT_PUBLIC_WP_API_URL?: string;
    NEXT_PUBLIC_USE_WORDPRESS?: string;
    
    // Node
    NODE_ENV: 'development' | 'production' | 'test';
  }
}