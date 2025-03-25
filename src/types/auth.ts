export type RegisterUserType = {
  fullName: string;
  email: string;
  birthdate: string;
  password: string;
  confirmPassword: string;
  terms: boolean;
}

export type LoginUserType = {
  email: string;
  password: string;
  rememberMe: boolean;
}