import NextAuth from "next-auth";
import Google from "next-auth/providers/google"
import Credentials from "next-auth/providers/credentials"
import GitHub from "next-auth/providers/github"
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "./db";
import bcrypt from "bcryptjs";

export const { auth, handlers, signIn, signOut } = NextAuth({
    adapter: PrismaAdapter(db),
    session: {strategy: 'jwt'},
    providers: [
      Google({
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET
      }),
      GitHub({
        clientId: process.env.AUTH_GITHUB_ID,
        clientSecret: process.env.AUTH_GITHUB_SECRET
      }),
      Credentials({
        name: 'Credentials',
        credentials: {
          email: { label: "email", type: "email" },
          password: { label: "Password", type: "password" },
        },
        authorize: async (credentials) => {
          const user = await db.user.findUnique({
            where: {
              email: credentials.email,
            },
          })

          if (!user) {
            return null
          }

          const validPassword = await bcrypt.compare(credentials.password as string, user.password as string)
          if (!validPassword) {
            return null
          }

          return user
        },
      })
    ]
  })