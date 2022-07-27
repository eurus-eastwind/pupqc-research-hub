import NextAuth, { NextAuthOptions } from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID as string,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "Email" },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Password",
        },
      },
      // @ts-ignore
      authorize: async (credentials, req) => {
        const user = await prisma.user.findFirst({
          where: { email: credentials?.email },
        });

        if (!user) return null;

        if (!credentials?.password || !user.password) return null;

        const isPasswordCorrect = await bcrypt.compare(
          credentials?.password,
          user.password
        );

        if (isPasswordCorrect) {
          return {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
          };
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  jwt: { secret: process.env.JWT_SECRET },
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token.id = user.id;
      }

      return token;
    },
    session: async ({ session, token }) => {
      if (token) {
        session.id = token.id;
      }
      return session;
    },
    redirect: async ({ url, baseUrl }) => {
      if (url === "/api/auth/signin") {
        return Promise.resolve("/");
      }

      return Promise.resolve("/api/auth/signin");
    },
  },
  pages: {
    signIn: "/signin",
  },
};

export default NextAuth(authOptions);
