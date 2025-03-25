import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import findUserByCredentials from './app/(auth)/login/findUserByCredentials';
import { LoginUserType } from './types/auth';

type UserType = {
  id: number;
  email: string;
  fullName: string | null;
  birthdate: string;
  isPremium: boolean;
  terms: boolean;
};

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      authorize: async ({
        email,
        password,
      }: LoginUserType): Promise<UserType | null> => {
        const user = await findUserByCredentials(email, password);

        if(!user){
          return null
        }

        return {
          id: user.id,
          email: user.email,
          fullName: user.fullName, // Certifique-se de que isso está vindo corretamente
          birthdate: user.birthdate,
          isPremium: user.isPremium,
          terms: user.terms
        };
      },
    }),
  ],
  // Add any additional configuration if needed
});
