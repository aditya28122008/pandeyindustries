import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import EmailProvider from "next-auth/providers/email";
// import { MongoDBAdapter } from "@auth/mongodb-adapter"
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "./lib/prisma.js";
// import client from "./app/db";

export const { auth, handlers, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    GitHub,
    Google,
    EmailProvider({
      server: process.env.EMAIL_SERVER,
      from: process.env.EMAIL_FROM,
    }),
  ],
  secret: process.env.JWT_SECRET,
});
