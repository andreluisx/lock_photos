import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import findUserByCredentials from './app/(auth)/login/findUserByCredentials';
import { LoginUserType } from './types/auth';

// Define the type for login credentials
interface LoginCredentials {
  email: string;
  password: string;
  rememberMe?: boolean;
}

// Your existing types
type UserType = {
  id: string;
  name?: string;
  email: string;
  // other user properties
};

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
        };
      },
    }),
  ],
  trustHost: true,
  // Add any additional configuration if needed
});
