import { connectToDatabase } from "@/lib/mongodb";
import NextAuth, { NextAuthOptions, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

import bcrypt from "bcrypt";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const db = await connectToDatabase();
        const usersCollection = db.collection("users");

        // Find user by email
        const user = await usersCollection.findOne({
          email: credentials?.email,
        });
        if (!user) {
          console.log("User not found!");
          return null;
        }
        // Check password
        const isPasswordValid = await bcrypt.compare(
          credentials?.password!,
          user.password
        );

        if (!isPasswordValid) {
          return null;
        }

        return { email: user.email, name: user.firstName } as User;
      },
    }),
  ],
  pages: {
    signIn: "/", // Custom login page
  },
  session: {
    strategy: "jwt", // Use JWT for session
  },
  cookies: {
    sessionToken: {
      name: "authToken",  // ✅ Set custom cookie name
      options: {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        path: "/",
        sameSite: "lax",
      },
    },
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.email = user.email;
        token.name = user.name;
      }
      return token;
    },
    async session({ session, token }) {
      // Ensure session.user is defined before accessing properties
      if (session.user) {
        session.user.email = token.email!;
        session.user.name = token.name!;
      } else {
        // Initialize session.user if it's undefined
        session.user = {
          email: token.email!,
          name: token.name!,
        };
      }
      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
