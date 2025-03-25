'use client';

import { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Image from 'next/image';
import fundo_login from '@/assets/images/hot_foto2.png';
import Link from 'next/link';
import registerAction from './registerAction';
import { RegisterUserType } from '@/types/auth';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { CircularProgress } from '@mui/material';
import { checkUser } from '../login/loginActions';

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const ative = async () => {
      const response = await checkUser();
      if (response?.user) {
        router.push('/feed');
      }
    };
    ative();
  }, [router]);

  // Função para verificar se o usuário tem pelo menos 18 anos
  const checkAge = (dateString: string): boolean => {
    const today = new Date();
    const birthDate = new Date(dateString);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }
    return age >= 18;
  };

  // Schema de validação com Yup
  const validationSchema = Yup.object({
    fullName: Yup.string()
      .required('Nome completo é obrigatório')
      .test('two-words', 'Insira pelo menos 2 palavras', (value) => {
        return value?.split(' ').filter((word) => word.length > 0).length >= 2;
      }),
    email: Yup.string().email('Email inválido').required('Email é obrigatório'),
    birthdate: Yup.date()
      .required('Data de nascimento é obrigatória')
      .test('age', 'Você precisa ter pelo menos 18 anos', (value) =>
        checkAge(value?.toISOString().split('T')[0] || '')
      ),
    password: Yup.string()
      .min(6, 'A senha deve ter no mínimo 6 caracteres')
      .required('Senha é obrigatória'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password')], 'As senhas devem ser iguais')
      .required('Confirme sua senha'),
    terms: Yup.boolean().oneOf(
      [true],
      'Você deve aceitar os termos e condições'
    ),
  });

  // Configuração do Formik
  const formik = useFormik({
    initialValues: {
      fullName: '',
      email: '',
      birthdate: '',
      password: '',
      confirmPassword: '',
      terms: false,
    },
    validationSchema,
    onSubmit: async (values: RegisterUserType) => {
      setLoading(true);
      const response = await registerAction(values);
      if (response) {
        if (response.success) {
          toast(response.message, { type: 'success' });
          router.push('/login');
          setLoading(false);
        }
        if (!response.success) {
          toast(response.message, { type: 'error' });
          setLoading(false);
        }
      }
    },
  });

  // Calcular a data máxima para o date picker (hoje - 18 anos)
  const getMaxDate = (): string => {
    const today = new Date();
    today.setFullYear(today.getFullYear() - 18);
    return today.toISOString().split('T')[0];
  };

  return (
    <div className="min-h-screen flex bg-gray-900">
      {/* Background com blur para telas pequenas */}
      <div className="md:hidden absolute inset-0 overflow-hidden">
        <Image
          src={fundo_login}
          alt="Background"
          className="w-full h-full object-cover filter blur-sm"
          priority
        />
        <div className="absolute inset-0 bg-purple-900/70"></div>
      </div>

      {/* Lado Esquerdo - Formulário de Registro */}
      <div className="w-full md:w-7/12 shadow-2xl flex items-center justify-center p-5 md:p-8 z-10">
        <div className="w-full max-w-2xl">
          {/* Card de registro */}
          <div className="rounded-2xl shadow-2xl overflow-hidden bg-gray-800">
            {/* Cabeçalho com novo gradiente */}
            <div className="p-6 bg-gradient-to-t from-pink-900 to-purple-950">
              <h2 className="text-2xl font-bold text-center text-white">
                Criar Conta Grátis
              </h2>
              <p className="text-sm text-center text-purple-200">
                Sua senha é criptografada, e seus dados trancados em segurança
              </p>
            </div>

            {/* Formulário */}
            <form onSubmit={formik.handleSubmit} className="p-6">
              <div className="flex flex-col md:flex-row gap-6">
                {/* Coluna Esquerda */}
                <div className="flex-1 space-y-4">
                  <div className="space-y-2">
                    <label className="block font-medium text-gray-200">
                      Nome completo
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      placeholder="Seu nome completo"
                      className={`w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 bg-gray-700 text-white border ${
                        formik.errors.fullName && formik.touched.fullName
                          ? 'border-red-500 focus:ring-red-500'
                          : 'border-gray-600 focus:ring-pink-500'
                      }`}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.fullName}
                    />
                    {formik.errors.fullName && formik.touched.fullName && (
                      <p className="mt-1 text-red-500 text-sm">
                        {formik.errors.fullName}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label className="block font-medium text-gray-200">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      placeholder="seu@email.com"
                      className={`w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 bg-gray-700 text-white border ${
                        formik.errors.email && formik.touched.email
                          ? 'border-red-500 focus:ring-red-500'
                          : 'border-gray-600 focus:ring-pink-500'
                      }`}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.email}
                    />
                    {formik.errors.email && formik.touched.email && (
                      <p className="mt-1 text-red-500 text-sm">
                        {formik.errors.email}
                      </p>
                    )}
                  </div>

                  {/* Campo de data de nascimento */}
                  <div className="space-y-2">
                    <label className="block font-medium text-gray-200">
                      Data de nascimento
                    </label>
                    <input
                      type="date"
                      name="birthdate"
                      max={getMaxDate()}
                      className={`w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 bg-gray-700 text-white border ${
                        formik.errors.birthdate && formik.touched.birthdate
                          ? 'border-red-500 focus:ring-red-500'
                          : 'border-gray-600 focus:ring-pink-500'
                      }`}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.birthdate}
                    />
                    {formik.errors.birthdate && formik.touched.birthdate && (
                      <p className="mt-1 text-red-500 text-sm">
                        {formik.errors.birthdate}
                      </p>
                    )}
                  </div>
                </div>

                {/* Coluna Direita */}
                <div className="flex-1 space-y-4">
                  <div className="space-y-2">
                    <label className="block font-medium text-gray-200">
                      Senha
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        name="password"
                        placeholder="••••••••"
                        className={`w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 bg-gray-700 text-white border ${
                          formik.errors.password && formik.touched.password
                            ? 'border-red-500 focus:ring-red-500'
                            : 'border-gray-600 focus:ring-pink-500'
                        }`}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.password}
                      />
                      <button
                        type="button"
                        className="absolute z-40 flex justify-end items-center bg-gray-700 w-10 h-10 right-3 top-1/2 transform -translate-y-1/2"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="white"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          {showPassword ? (
                            <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24 M1 1l22 22" />
                          ) : (
                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z M12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6z" />
                          )}
                        </svg>
                      </button>
                    </div>
                    {formik.errors.password && formik.touched.password && (
                      <p className="mt-1 text-red-500 text-sm">
                        {formik.errors.password}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label className="block font-medium text-gray-200">
                      Confirmar senha
                    </label>
                    <div className="relative">
                      <input
                        type={showConfirmPassword ? 'text' : 'password'}
                        name="confirmPassword"
                        placeholder="••••••••"
                        className={`w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 bg-gray-700 text-white border ${
                          formik.errors.confirmPassword &&
                          formik.touched.confirmPassword
                            ? 'border-red-500 focus:ring-red-500'
                            : 'border-gray-600 focus:ring-pink-500'
                        }`}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.confirmPassword}
                      />
                      <button
                        type="button"
                        className="z-40 flex justify-end items-center bg-gray-700 w-10 h-10 absolute right-3 top-1/2 transform -translate-y-1/2"
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="white"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          {showConfirmPassword ? (
                            <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24 M1 1l22 22" />
                          ) : (
                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z M12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6z" />
                          )}
                        </svg>
                      </button>
                    </div>
                    {formik.errors.confirmPassword &&
                      formik.touched.confirmPassword && (
                        <p className="mt-1 text-red-500 text-sm">
                          {formik.errors.confirmPassword}
                        </p>
                      )}
                  </div>
                </div>
              </div>

              <div className="mt-6 flex flex-col md:flex-row items-start md:items-center justify-between">
                <div className="flex items-center mb-4 md:mb-0">
                  <input
                    id="terms"
                    name="terms"
                    type="checkbox"
                    className="h-4 w-4 rounded bg-gray-700 border-gray-600 text-pink-500"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    checked={formik.values.terms}
                  />
                  <label
                    htmlFor="terms"
                    className="ml-2 block text-sm text-gray-300"
                  >
                    Concordo com os{' '}
                    <Link
                      href="/terms"
                      className="text-pink-400 hover:text-pink-300"
                    >
                      Termos e Condições
                    </Link>
                  </label>
                </div>
                {formik.errors.terms && formik.touched.terms && (
                  <p className="mt-1 text-red-500 text-sm">
                    {formik.errors.terms}
                  </p>
                )}

                <button
                  type="submit"
                  className="py-3 flex justify-center w-full md:w-1/2 items-center min-w-20 px-6 cursor-pointer rounded-lg bg-pink-600 hover:bg-pink-700 text-white font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={!formik.isValid || formik.isSubmitting || loading}
                >
                  {loading ? (
                    <CircularProgress color="inherit" size={20} />
                  ) : (
                    'Registrar'
                  )}
                </button>
              </div>
            </form>

            {/* Rodapé */}
            <div className="p-6 border-t border-gray-700 bg-gray-800">
              <p className="text-center text-sm text-gray-400">
                Já tem uma conta?{' '}
                <Link
                  href="/login"
                  className="font-medium cursor-pointer text-pink-400 hover:text-pink-300"
                >
                  Fazer login
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Lado Direito - Imagem (apenas visível em telas médias e grandes) */}
      <div className="hidden md:block md:w-5/12 relative">
        <Image
          src={fundo_login}
          alt="Background"
          className="w-full h-full object-cover"
          priority
        />
        <div className="absolute inset-0 bg-purple-900/30"></div>
      </div>
    </div>
  );
}