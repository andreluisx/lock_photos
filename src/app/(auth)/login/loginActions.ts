'use server'

import { auth, signIn } from '@/auth';
import { isRedirectError } from 'next/dist/client/components/redirect-error';
import { AuthError } from 'next-auth';

export default async function loginAction(email: string, password: string) {
  try {
    await signIn('credentials', {
      email,
      password,
      redirect: true,
      redirectTo: '/feed'
    });
    return { success: true, message: '' };
  } catch (error: unknown) {
    if (isRedirectError(error)) {
      throw error;
    }

    // Check if it's an AuthError from next-auth
    if (typeof error === 'object' && error !== null && 'type' in error) {
      const authError = error as AuthError;
      if (authError.type === 'CredentialsSignin') {
        return { success: false, message: 'Credenciais inválidas' };
      }
    }

    return { success: false, message: 'Ops... Ocorreu um problema' };
  }
}

export async function checkUser() {
  const session = await auth();
  return session;
}