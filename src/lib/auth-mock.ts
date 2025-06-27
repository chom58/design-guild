// Mock auth for production without database
export const authOptions = {
  providers: [],
  session: {
    strategy: "jwt" as const
  },
  callbacks: {
    async jwt({ token }: any) {
      return token;
    },
    async session({ session }: any) {
      return session;
    }
  }
};