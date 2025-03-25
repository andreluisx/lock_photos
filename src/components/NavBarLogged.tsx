"use client"
import { checkUser } from '@/app/(auth)/login/loginActions';
import { Feed, Gallery, OutlineAccountCircle } from '@/svgs/svgs';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function NavbarLogged(){
  const pathname = usePathname();

  const router = useRouter();

  useEffect(()=>{
    const ative = async ()=>{
      const response = await checkUser()
      if(!response){
        router.push('/login');
      }
    }
    ative()
  },[router, pathname])
  
  return (
    <div className="flex fixed z-50 bg-slate-950 flex-row justify-center gap-5 pt-4 w-full px-5 border-b border-slate-500 pb-4">
      <Link href='/feed' className={`${pathname === '/feed' ? 'bg-gradient-to-bl from-pink-700 to-red-600' : 'bg-gradient-to-bl from-pink-700 to-pink-500'} cursor-pointer py-2 px-3 rounded-md justify-center items-center flex flex-row gap-2`}>
        <Feed/>
        <p>Feed</p>
      </Link>
      <Link href='/allImages' className={`${pathname === '/allImages' ? 'bg-gradient-to-bl from-pink-700 to-red-600' : 'bg-gradient-to-bl from-pink-700 to-pink-500'} cursor-pointer py-2 px-3 rounded-md justify-center items-center flex flex-row gap-2`}>
        <Gallery/>
        <p>Galeria</p>
      </Link>
      <Link href='/account' className={`${pathname === '/account' ? 'bg-gradient-to-bl from-pink-700 to-red-600' : 'bg-gradient-to-bl from-pink-700 to-pink-500'} cursor-pointer py-2 px-3 rounded-md justify-center items-center flex flex-row gap-2`}>
        <OutlineAccountCircle/>
        <p>Conta</p>
      </Link>
    </div>
  )
}