'use server';

import db from '@/lib/db';
import { RegisterUserType } from '@/types/auth';
import { hashSync } from 'bcrypt-ts';
import { redirect } from 'next/navigation';

export default async function registerAction(formData: RegisterUserType) {
  if (
    !formData.fullName ||
    !formData.birthdate ||
    !formData.email ||
    !formData.terms ||
    !formData.password
  ) {
    return { success: false, message: 'Todos os campos devem ser preenchidos' };
  }

  const emailAlreadyExist = await db.user.findUnique({
    where: { email: formData.email },
  });

  if (emailAlreadyExist) {
    return { success: false, message: 'Este e-mail já foi cadastrado' };
  }

  if (formData.password !== formData.confirmPassword) {
    return { success: false, message: 'As senhas não coincidem' };
  }

  await db.user.create({
    data: {
      fullName: formData.fullName,
      email: formData.email,
      birthdate: formData.birthdate,
      password: hashSync(formData.password),
      terms: formData.terms,
    },
  });
  return redirect('/login');
}
