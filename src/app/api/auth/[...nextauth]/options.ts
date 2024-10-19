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
          }
        });

        if (!user) {
          return null;
        }

        // const match = await bcrypt.compare(credentials!.password, user.password);

        // if (!match) {
        //   return null;
        // }

        return {
          email: user.email,
          id: user.id.toString()
        };
      }
    })
  ],
  session: {
    strategy: 'jwt'
  },
  pages: {
    signIn: '/auth'
  }
};

export default options;
