import vars from "@/vars";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import EmailProvider from "next-auth/providers/email";
import User from "@/model/User";

const authOptions = {
  // Configure one or more authentication providers
  providers: [
    EmailProvider({
      server: process.env.EMAIL_SERVER,
      from: process.env.EMAIL_FROM
    }),
    GithubProvider({
      clientId: vars.GITHUB_ID,
      clientSecret: vars.GITHUB_SECRET,
    }),
    GoogleProvider({
      clientId: vars.GOOGLE_CLIENT_ID,
      clientSecret: vars.GOOGLE_CLIENT_SECRET,
    }),
    // ...add more providers here
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      const { email, name, image } = user;

      const existingUser = await User.findOne({ email });

      if (!existingUser) {
        await User.create({
          email,
          name,
          image,
        });
      } else {
        await User.updateOne(
          { email },
          {
            name,
            image,
            updatedAt: Date.now(),
          }
        );
      }

      return true;
    },
    async session({ session, token }) {
      const user = await User.findOne({ email: token.email });
      session.user = user;
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.email = user.email;
      }
      return token;
    },
  },
  database: process.env.DATABASE_URL,

  database: "postgresql://postgres:safetywall@localhost:5432/pandeyindustries",

  secret: process.env.JWT_SECRET,
};

export default authOptions;
