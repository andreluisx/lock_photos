'use server'

import { auth, signIn } from '@/auth';
import { isRedirectError } from 'next/dist/client/components/redirect-error';

export default async function loginAction(email: string, password: string) {
  try {
    await signIn('credentials', {
      email,
      password,
      redirect: true,
      redirectTo: '/feed'
    });
    return { success: true, message: '' };
  } catch (error) {
    if(isRedirectError(error)){
      throw error;
    }

    if (error.type === 'CredentialsSignin') {
      return { success: false, message: 'Credenciais inválidas' };
    }
    return { success: false, message: 'Ops... Ocorreu um problema' };
  }
}

export async function checkUser(){
  const session = await auth();
  return session
}