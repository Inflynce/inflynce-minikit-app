import NextAuth, { type DefaultSession } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { createAppClient, viemConnector } from '@farcaster/auth-client';

const appClient = createAppClient({
  relay: 'https://relay.farcaster.xyz',
  ethereum: viemConnector(),
});

// declare module 'next-auth' {
//   /**
//    * Returned by `auth`, `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
//    */
//   interface Session {
//     user: {
//       /** The user's postal address. */
//       address: string;
//       /** The user's Farcaster ID */
//       id: string;
//       /**
//        * By default, TypeScript merges new interface properties and overwrites existing ones.
//        * In this case, the default session user properties will be overwritten,
//        * with the new ones defined above. To keep the default session user properties,
//        * you need to add them back into the newly declared interface.
//        */
//     } & DefaultSession['user'];
//   }

//   interface JWT {
//     fid?: string;
//   }
// }

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        message: {
          label: 'Message',
          type: 'text',
        },
        signature: {
          label: 'Signature',
          type: 'text',
        },
        nonce: {
          label: 'Nonce',
          type: 'text',
        },
      },
      authorize: async (credentials) => {
        console.log(credentials);
        console.log(process.env.NEXT_PUBLIC_URL);
        const result = await appClient.verifySignInMessage({
          nonce: credentials.nonce as string,
          message: credentials.message as string,
          signature: credentials.signature as `0x${string}`,
          domain: (process.env.NEXT_PUBLIC_URL || 'https://miniapp.inflynce.com').replace(
            /^https?:\/\//,
            ''
          ),
        });
        console.log(result);
        console.log('rprocess.env.NEXTAUTH_SECRET', process.env.AUTH_SECRET);
        if (result.success) {
          return {
            id: result.fid?.toString() || '1',
            address: '',
            email: '',
            name: '',
            image: '',
          };
        }

        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, account, profile, trigger, isNewUser, session }) {
      console.log('jwt', token, user, account, profile, trigger, isNewUser, session);
      if (user) {
        console.log('user', user);
        token.sub = user.id;
        // token.fid = user.id;
        token.address = (user as any).address;
        token.name = (user as any).name ?? null;
        token.picture = (user as any).image ?? null;
      }
      return token;
    },
    async session({ session, token, user }) {
      console.log('session1', session, token, user);
      session.user = {
        id: token.sub as string,
        // These are required by AdapterUser
        email: token.email || '',
        emailVerified: null,
        // Optional properties
        // name: token.name ?? null,
        // image: token.picture ?? null,
      };
      return session;
    },
  },
  session: {
    strategy: 'jwt',
  },
  trustHost: true,
  secret: '599NpN4Ea2FHK7H3NxiDD4A+uBMfWOOZ8pje6WucD5M=',
});
