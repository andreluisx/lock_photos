'use client';
import { useState } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { posts } from '@/datas/posts';

interface ImageViewerProps {
  isPremiums: boolean;
}

export default function ImageViewer({ isPremiums }: ImageViewerProps) {
  const [currentIndex, setCurrentIndex] = useState(1);  // Corrigido para usar o `initialIndex`
  const isPremium = isPremiums;  // Corrigido para usar a prop `isPremiums`

  const images = posts.map(post => post.photo.path);

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const onClose = () => {
    window.history.back();
  };

  const renderPhoto = () => {
    if (isPremium === false && posts[currentIndex].photo.forPremium === true) {
      return (
        <div className="relative rounded-md overflow-hidden mt-4">
          <a className="cursor-pointer inset-1 px-1 gap-2 flex flex-col justify-center items-center border-none absolute z-40 rounded-t-md">
            <p className=" text-2xl font-bold self-center text-center text-white bg-pink-800 py-2 px-4 rounded-md">Ative o Premium</p>
            <p className='text-slate-800 text-center text-sm font-bold bg-white px-1 rounded-md'>conteúdo premium ★, tenha acesso clicando aqui.</p>
          </a>
          <Image
            src={posts[currentIndex]?.photo?.path}
            alt="Descrição da imagem"
            className="w-full h-fit filter blur-lg rounded-t-md border-b border-slate-600"
          />
        </div>
      )
    }
    return (
      <Image
        src={posts[currentIndex]?.photo?.path}
        alt="Imagem em destaque"
        width={800}
        height={600}
        className="rounded-md object-contain"
      />
    );
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50">
      <button className="absolute top-5 right-5 text-white" onClick={onClose}>
        <X size={32} />
      </button>

      <button onClick={prevImage} className="absolute z-50 p-1 bg-slate-700 left-5 text-white">
        <ChevronLeft size={30} />
      </button>

      <div className="p-4 bg-gray-900 rounded-lg">
        {renderPhoto()}
      </div>

      <button onClick={nextImage} className="absolute z-50 p-1 bg-slate-700 right-5 text-white">
        <ChevronRight size={30} />
      </button>
    </div>
  );
}
