import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { NextAuthOptions, User, getServerSession } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { prisma } from "./connect";

declare module "next-auth" {
  interface Session {
    user: User & {
      isAdmin: Boolean;
      isRecuriter: Boolean;
      userId: String
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    isAdmin: Boolean;
    isRecuriter: Boolean;
    userId: String;
  }
}

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID!,
      clientSecret: process.env.GOOGLE_SECRET!,
    }),
  ],
  callbacks: {
    async redirect({ url, baseUrl }) {
      return baseUrl;
    },
    async session({ token, session }) {
      if (token) {
        session.user.isAdmin = token.isAdmin;
        session.user.isRecuriter = token.isRecuriter;
        session.user.userId = token.userId;
      }
      return session;
    },
    async jwt({ token }) {
      const userInDB = await prisma.user.findUnique({
        where: {
          email: token.email!,
        },
      });
      token.isAdmin = userInDB?.isAdmin!;
      token.isRecuriter = userInDB?.isRecuriter!;
      token.userId = userInDB?.id!;
      return token;
    },
  },
};

export const getAuthSession = () => getServerSession(authOptions);
