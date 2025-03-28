'use client';
import { checkUser } from '@/app/(auth)/login/loginActions';
import LogoutAction from '@/app/(logou)/logoutAction';
import { redirect, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function DataAccount() {
  const [user, setUser] = useState({});
  const router = useRouter();

  useEffect(() => {
    const ative = async () => {
      const response = await checkUser();
      setUser(response?.user);
    };
    ative();
  }, [router]);

  const logout = () => {
      LogoutAction();
      return redirect('/login');
    }

  return (
    <div className="p-6 text-white">
      <h2 className="text-2xl font-bold mb-6 text-pink-500">Meus Dados</h2>

      <div className="mb-6">
        <label className="block text-sm font-medium mb-2">Nome</label>
        <input
          type="text"
          className="w-full bg-gray-800 border border-slate-600 rounded-md px-4 py-2 text-white"
          defaultValue={user?.fullName}
        />
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium mb-2">Email</label>
        <input
          type="email"
          className="w-full bg-gray-800 border border-slate-600 rounded-md px-4 py-2 text-white"
          defaultValue={user?.email}
        />
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium mb-2">Senha</label>
        <button className="bg-gray-800 hover:bg-gray-700 border border-slate-600 rounded-md px-4 py-2 text-white">
          Alterar senha
        </button>
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium mb-2">
          Preferências de notificação
        </label>
        <div className="flex items-center gap-2 mb-2">
          <input
            type="checkbox"
            id="email-notif"
            className="rounded bg-gray-800 border-slate-600"
          />
          <label htmlFor="email-notif">Receber notificações por email</label>
        </div>
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="new-content"
            className="rounded bg-gray-800 border-slate-600"
          />
          <label htmlFor="new-content">
            Ser notificado sobre novos conteúdos
          </label>
        </div>
      </div>

      <button
        disabled={true}
        className="bg-pink-800 hover:bg-pink-700 disabled:bg-slate-700 text-white font-bold py-2 px-4 rounded-md"
      >
        Salvar alterações
      </button>

      <div className="mt-8 pt-6 border-t border-slate-600">
        <button
          onClick={logout}
          className="text-gray-400 cursor-pointer hover:text-white"
        >
          Sair da conta
        </button>
      </div>
    </div>
  );
}
