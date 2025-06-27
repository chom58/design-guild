import NextAuth from "next-auth";

const isDevelopment = process.env.NODE_ENV === 'development';

let authOptions;
if (isDevelopment) {
  authOptions = require("@/lib/auth").authOptions;
} else {
  // 本番環境では認証を一時的に無効化
  authOptions = {
    providers: [],
    secret: process.env.NEXTAUTH_SECRET
  };
}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };