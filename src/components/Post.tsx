'use client';
import Image, { StaticImageData } from 'next/image';
import { useState } from 'react';

type photoType = {
  path: StaticImageData;
  forPremium: boolean;
  categories: string[];
};

export interface PostProps {
  id: number,
  photo: photoType;
  description: string;
  likes: number | 0;
  date: string;
  isPremium: boolean;
}

export default function Post({
  photo,
  description,
  likes,
  date,
  isPremium,
}: PostProps) {
  const [like, setLike] = useState('white');
  const[likesState, setLikes] = useState(likes)

  const liked = () => {
    const color = like === 'red' ? 'white' : 'red';
    setLike(color);
    return color === 'red' ? setLikes(likesState + 1) : setLikes(likes)
  };

  const renderPhoto = () => {
    if (photo?.forPremium === true && isPremium === false) {
      return (
        <div className="relative">
          <a className="cursor-pointer inset-1 gap-2 flex flex-col justify-center items-center border-none absolute z-40 rounded-t-md">
            <p className=" text-3xl font-bold self-center text-center text-white bg-pink-800 py-2 px-4 rounded-md">Ative o Premium ★</p>
            <p className='text-slate-800 font-bold bg-white px-1 rounded-md'>conteúdo premium, tenha acesso clicando aqui.</p>
          </a>
          <Image
            src={photo?.path}
            alt="Descrição da imagem"
            className="w-full h-fit filter blur-lg rounded-t-md border-b border-slate-600"
          />
        </div>
      );
    }
    return (
      <Image
        src={photo?.path}
        alt="Descrição da imagem"
        className="w-full h-fit rounded-t-md border-b border-slate-600"
      />
    );
  };

  return (
    <div className="border bg-gray-950 border-slate-600 rounded-md max-w-lg h-fit">
      <div className=" overflow-hidden">{renderPhoto()}</div>
      <div className="px-3 py-3 text-sm">
        <div>
          <p>{description}</p>
        </div>
        <div className="flex flex-row gap-2 justify-between items-center mt-4 pt-3 border-t border-slate-600">
          <div className="flex justify-start items-center flex-row gap-2">
            <button onClick={liked} className="cursor-pointer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 64 64"
                width="24px"
                height="24px"
              >
                <path
                  fill={`${like}`}
                  d="M17.718 7h-.002c-6.814 0-12.18 3.957-14.723 10.855c-5.788 15.71 15.227 29.479 24.2 35.357c1.445.946 3.082 2.019 3.404 2.354L31.851 57l1.397-1.292c.232-.204 1.305-.891 2.342-1.555c8.605-5.508 31.459-20.141 25.402-36.318c-2.566-6.857-7.941-10.79-14.742-10.79c-5.744 0-11.426 2.763-14.313 6.554C28.955 9.75 23.345 7 17.718 7"
                ></path>
              </svg>
            </button>
            <p>{likesState} Curtidas</p>
          </div>
          <div>
            <p>Enviada em: {date}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
