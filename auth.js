import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";

const authOptions = {
  providers: [
    GitHub({
      clientId: process.env.AUTH_GITHUB_ID,
      clientSecret: process.env.AUTH_GITHUB_SECRET,
    }),
  ],
}

export const { handlers, auth, signIn, signOut } = NextAuth(authOptions)
