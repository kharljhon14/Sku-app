import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

import prisma from '../../../../../prisma/db';

const options: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: {
          label: 'Email',
          type: 'text',
          placeholder: 'Email'
        },
        password: {
          label: 'Password',
          placeholder: 'Password',
          type: 'password'
        }
      },
      authorize: async (credentials) => {
        const user = await prisma.user.findUnique({
          where: {
            email: credentials!.email
          },
          select: {
            email: true,
            id: true,
            role: true
          }
        });

        if (!user) {
          return null;
        }

        // const match = await bcrypt.compare(credentials!.password, user.password);

        // if (!match) {
        //   return null;
        // }

        return user;
      }
    })
  ],

  session: {
    strategy: 'jwt'
  },
  callbacks: {
    async jwt({ token, account, user }) {
      if (account) {
        token.role = user.role;
      }

      return token;
    },
    session({ session, token }) {
      if (session.user) {
        session.user.role = token.role || 'USER';
      }

      return session;
    }
  },
  pages: {
    signIn: '/auth'
  }
};

export default options;
