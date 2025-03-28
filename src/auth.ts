import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import findUserByCredentials from './app/(auth)/login/findUserByCredentials';

interface LoginCredentials {
  email: string;
  password: string;
  rememberMe?: boolean;
}

// Your existing types
type UserType = {
  id: string;
  fullName?: string;
  isPremium?:boolean;
  email: string;
  // other user properties
};
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
      fullName: string;
      isPremium: boolean;
    };
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      authorize: async (
        credentials: Partial<LoginCredentials>
      ): Promise<UserType | null> => {
        const { email, password } = credentials as LoginCredentials;

        if (!email || !password) {
          return null;
        }

        const user = await findUserByCredentials(email, password);

        if (!user) {
          return null;
        }

        return {
          id: user.id,
          email: user.email,
          fullName: user.fullName, // Adicione essas propriedades
          isPremium: user.isPremium, // Adicione essas propriedades
        };
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      if (token.sub) {
        session.user.id = token.sub;
      }
      
      // Adicione essas linhas para incluir fullName e isPremium na sessão
      session.user.fullName = token.fullName as string;
      session.user.isPremium = token.isPremium as boolean;
      
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.fullName = (user as UserType).fullName;
        token.isPremium = (user as UserType).isPremium;
      }
      return token;
    },
  },
  trustHost: true,
});
