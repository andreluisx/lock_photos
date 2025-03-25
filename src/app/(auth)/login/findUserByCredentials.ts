'use server';

import db from '@/lib/db';
import { compareSync } from 'bcrypt-ts';

type UserType = {
  id: number;
  email: string;
  password: string;
  fullName: string | null;
  birthdate: string;
  isPremium: boolean;
  terms: boolean;
};

export default async function findUserByCredentials(
  email: string,
  password: string
): Promise<any | null> {
  
  const user = await db.user.findFirst({
    where: { email },
    select: {
      id: true,
      email: true,
      password:  true,
      fullName: true,
      birthdate: true,
      isPremium: true,
      terms: true,
    },
  });

  if (!user) {
    return null;
  }
  const passwordMatch = compareSync(password, user.password);

  if (passwordMatch) {
    const { password, ...DataUser } = user;
    return DataUser;
  }

  return null;
}
