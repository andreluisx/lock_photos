"use client"
import React, { useEffect, useState, use } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { posts } from '@/datas/posts';
import Image from 'next/image';
import { checkUser } from '@/app/(auth)/login/loginActions';

const PostViewer = ({ params }: { params: Promise<{ id: string }> }) => {
  const router = useRouter();
  
  // Resolver `params` corretamente
  const { id } = use(params);
  const indexFromUrl = parseInt(id, 10);

  const [currentIndex, setCurrentIndex] = useState(id);
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!isNaN(indexFromUrl) && indexFromUrl >= 0 && indexFromUrl < posts.length) {
      setCurrentIndex(indexFromUrl);
    }

    const fetchUser = async () => {
      try {
        const response = await checkUser();
        setUser(response?.user || null);
      } catch (error) {
        console.error("Erro ao buscar usuário:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, [indexFromUrl]);

  const handleNext = () => {
    const newIndex = currentIndex < posts.length - 1 ? currentIndex + 1 : currentIndex;
    router.push(`/${newIndex}`);
    setCurrentIndex(newIndex);
  };

  const handlePrev = () => {
    const newIndex = currentIndex > 0 ? currentIndex - 1 : currentIndex;
    router.push(`/${newIndex}`);
    setCurrentIndex(newIndex);
  };

  const currentPost = posts[currentIndex];

  const renderImage = () => {
    if (currentPost.photo.forPremium === true && !user.isPremium) {
      return (
        <div className="relative border overflow-hidden bg-gray-950 border-slate-600 rounded-md w-full md:w-1/2">
          <a className="cursor-pointer inset-1 px-1 gap-2 flex flex-col justify-center items-center border-none absolute z-50 rounded-t-md">
            <p className="text-sm md:text-2xl font-bold self-center text-center text-white bg-pink-800 py-2 px-4 rounded-md">
              Ative o Premium
            </p>
            <p className='hidden md:block text-slate-800 text-center text-sm font-bold bg-white px-1 rounded-md'>
              conteúdo premium ★, tenha acesso clicando aqui.
            </p>
          </a>
          <div className="filter blur-md">
            <Image 
              src={currentPost.photo.path} 
              alt="Post" 
              className="w-full h-auto object-cover rounded-md"
            />
          </div>
        </div>
      );
    }
    
    return (
      <div className="border bg-gray-950 border-slate-600 rounded-md w-full md:w-1/2">
        <div className="overflow-hidden">
          <Image 
            src={currentPost.photo.path} 
            alt="Post" 
            className="w-full h-auto object-cover rounded-md"
          />
        </div>
      </div>
    );
  };

  return (
    <div className="w-full h-screen flex items-center justify-center">
      {/* Navigation Arrows */}
      {currentIndex > 0 && (
        <button 
          onClick={handlePrev} 
          className="absolute left-4 z-10 bg-gray-800 bg-opacity-50 rounded-full p-2 hover:bg-opacity-75 transition-all"
        >
          <ChevronLeft color="white" size={32} />
        </button>
      )}
      
      {currentIndex < posts.length - 1 && (
        <button 
          onClick={handleNext} 
          className="absolute right-4 z-10 bg-gray-800 bg-opacity-50 rounded-full p-2 hover:bg-opacity-75 transition-all"
        >
          <ChevronRight color="white" size={32} />
        </button>
      )}

      {/* Post Container */}
      {!isLoading && renderImage()}
    </div>
  );
};

export default PostViewer;
