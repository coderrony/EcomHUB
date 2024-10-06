import NextAuth from 'next-auth';

import Google from 'next-auth/providers/google';
import Facebook from 'next-auth/providers/facebook';
import Credentials from 'next-auth/providers/credentials';
import bcrypt from 'bcrypt';
import { connectDB } from './services/mongo';
import { addUser, getUserByEmail } from './database/queries';

export const {
  handlers: { GET, POST },
  signIn,
  signOut,
  auth,
} = NextAuth({
  trustHost: true, // Trust all hosts (use with caution in production)

  session: {
    strategy: 'jwt',
  },

  providers: [
    Google,
    Facebook,

    Credentials({
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      authorize: async credentials => {
        await connectDB();

        if (!credentials) {
          return null;
        }

        const user = await getUserByEmail(credentials.email);

        if (!user) {
          throw new Error('No account found with this email.');
        }

        if (credentials.isLogin === 'true') {
          const isMatch = await bcrypt.compare(
            credentials.password,
            user.password,
          );
          if (!isMatch) {
            throw new Error('Incorrect password.');
          }
          return user;
        }

        return user;
      },
    }),
  ],

  callbacks: {
    async signIn({ user, account, profile }) {
      try {
        await connectDB();
        const existingUser = await getUserByEmail(user.email);

        let userData;
        if (!existingUser) {
          const [firstName, lastName = ''] = user.name
            ? user.name.split(' ')
            : [user.email, ''];
          const salt = await bcrypt.genSalt(10);
          const hashedPassword = await bcrypt.hash(
            user.email + Date.now().toString(),
            salt,
          );

          const data = {
            firstName,
            lastName,
            email: user.email,
            role: 'customer',
            profileImg: user.image,
            password: hashedPassword,
          };

          userData = await addUser(data);
        } else {
          userData = existingUser;
        }

        user.customData = userData;
        return true;
      } catch (error) {
        return false;
      }
    },

    async jwt({ token, user }) {
      if (user?.customData) {
        token.customUserData = user.customData;
      }
      return token;
    },

    async session({ session, token }) {
      const { password, createdAt, updatedAt, ...rest } =
        token.customUserData || {};
      session.user = rest;
      return session;
    },
  },
});
