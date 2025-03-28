"use client"
import { checkUser } from '@/app/(auth)/login/loginActions';
import Post from '@/components/Post';
import { posts } from '@/datas/posts';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

// Componente de Skeleton personalizado
const PostSkeleton = () => (
  <SkeletonTheme 
    baseColor="#202020" 
    highlightColor="#444"
    duration={2}
    width={500}
    height={700}
  >
    <div className="border border-gray-500 shadow-md rounded-lg mb-4 h-full w-full">
    
      {/* Área da imagem */}
      <div className="w-full">
        <Skeleton height={300} />
      </div>

      {/* Área de interação */}
      <div className="p-2">
       
        
      </div>
      <div className="flex pb-2 items-center px-2 space-x-4">
        <div className="flex-1">
          <div className='border-b border-gray-500 pb-2'>
            <Skeleton height={15} width={150}/>
          </div>
          <div className='flex flex-row justify-between'>
            <Skeleton height={10} width={100} />
            <Skeleton height={10} width={100} />
          </div>
          
        </div>
      </div>
    </div>
    
  </SkeletonTheme>
);

export default function Feed() {
  const [user, setUser] = useState<{ isPremium?: boolean } | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await checkUser();
        setUser(response?.user || null);
      } catch (error) {
        console.error('Erro ao buscar usuário:', error);
        router.push('/login');
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, [router]);

  console.log(user)
  if (isLoading) {
    return (
      <div className="flex items-center justify-center px-5 h-full w-full">
        <div className="flex min-w-96 h-screen max-1/2 flex-col justify-start items-center pt-5 pb-10">
          {[...Array(3)].map((_, index) => (
            <PostSkeleton key={index} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center px-5 h-full w-full">
      <div className="flex min-w-96 h-screen max-1/2 flex-col justify-start items-center pt-5 pb-10">
        <div className="pt-1 flex flex-col pb-7 gap-4">
          {posts.map((post) => (
            <Post
              key={post.id}
              isPremium={user?.isPremium}
              description={post.description}
              likes={post.likes}
              date={post.date}
              photo={{ 
                path: post?.photo?.path, 
                categories: post?.photo?.categories, 
                forPremium: post?.photo?.forPremium 
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}