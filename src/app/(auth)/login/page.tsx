'use client';

import { useFormik } from 'formik';
import * as Yup from 'yup';
import Image from 'next/image';
import fundo_login from '@/assets/images/cama2.png';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { LoginUserType } from '@/types/auth';
import loginAction, { checkUser } from './loginActions';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { CircularProgress } from '@mui/material';

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(()=>{
    const ative = async ()=>{
      const response = await checkUser()
      if(response?.user){
        router.push('/feed');
      }
    }
    ative()
  },[router])
  // Schema de validação com Yup
  const validationSchema = Yup.object({
    email: Yup.string().email('Email inválido').required('Email é obrigatório'),
    password: Yup.string().required('Senha é obrigatória'),
  });

  // Configuração do Formik
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
    validationSchema,
    onSubmit: async (values: LoginUserType) => {
      setLoading(true);
      const response = await loginAction(values.email, values.password);
      if (response) {
        if (response.success) {
          setLoading(false);
        }
        if (!response.success) {
          toast(response.message, { type: 'error' });
          setLoading(false);
        }
      }
    },
  });

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

      {/* Lado Esquerdo - Formulário de Login */}
      <div className="w-full md:w-7/12 flex items-center justify-center p-8 z-10">
        <div className="w-full max-w-md">
          {/* Card de login */}
          <div className="rounded-lg shadow-xl overflow-hidden bg-gray-800">
            {/* Cabeçalho */}
            <div className="p-6 bg-gradient-to-t from-pink-900 to-purple-950">
              <h2 className="text-2xl font-bold text-center text-white">
                Boas Vindas!
              </h2>
              <p className="text-sm text-center text-purple-200">
                Faça o login abaixo para ver fotos e vídeos
              </p>
            </div>

            {/* Formulário */}
            <form onSubmit={formik.handleSubmit} className="p-6 space-y-6">
              <div className="space-y-2">
                <label className="block font-medium text-gray-200">Email</label>
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

              <div className="space-y-2">
                <div className="flex justify-between">
                  <label className="block font-medium text-gray-200">
                    Senha
                  </label>
                  <a
                    href="#"
                    className="text-sm font-medium text-pink-400 hover:text-pink-300"
                  >
                    Esqueceu a senha?
                  </a>
                </div>
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

              <div className="flex items-center">
                <input
                  id="rememberMe"
                  name="rememberMe"
                  type="checkbox"
                  className="h-4 w-4 rounded bg-gray-700 border-gray-600 text-pink-500"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  checked={formik.values.rememberMe}
                />
                <label
                  htmlFor="rememberMe"
                  className="ml-2 block text-sm text-gray-300"
                >
                  Lembrar-me
                </label>
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center items-center cursor-pointer py-3 px-4 rounded-lg bg-pink-600 hover:bg-pink-700 text-white font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={!formik.isValid || formik.isSubmitting || loading}
                >
                  {loading ? <CircularProgress color="inherit" size={23} /> : 'Entrar'}
                </button>
              </div>
            </form>

            {/* Rodapé */}
            <div className="p-6 border-t border-gray-700 bg-gray-800">
              <p className="text-center text-sm text-gray-400">
                Não tem uma conta?{' '}
                <Link
                  href="/register"
                  className="font-medium text-pink-400 hover:text-pink-300"
                >
                  Criar conta
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
          className="w-full h-full object-cover filter overflow-hidden"
          priority
        />
        <div className="absolute inset-0 bg-purple-900/30"></div>
      </div>
    </div>
  );
}
