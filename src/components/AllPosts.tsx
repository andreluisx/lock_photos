import Image, { StaticImageData } from 'next/image';

type photoType = {
  path: StaticImageData;
  forPremium: boolean;
  categories: string[];
};

interface AllPostsProps {
  photo: photoType;
  isPremium: boolean;
}

export default function AllPosts({ photo, isPremium }: AllPostsProps) {
  if(isPremium === false && photo?.forPremium === true){
    return (
      <div className="relative rounded-md mb-4 overflow-hidden">
        <a className="cursor-pointer inset-1  px-1 gap-2 flex flex-col justify-center items-center border-none absolute z-40 rounded-t-md">
          <p className=" text-sm md:text-2xl font-bold self-center text-center text-white bg-pink-800 py-2 px-4 rounded-md">Ative o Premium</p>
          <p className='hidden md:block text-slate-800 text-center text-sm font-bold bg-white px-1 rounded-md'>conteúdo premium ★, tenha acesso clicando aqui.</p>
        </a>
        <Image
          src={photo?.path}
          alt="Descrição da imagem"
          className="w-full h-fit filter blur-lg rounded-t-md border-b border-slate-600"
        />
      </div>
    );
  }else{
    return (
      <div className="overflow-hidden rounded-md mb-4 sm:mt-0 border border-slate-600">
        <Image
          src={photo?.path}
          alt="Descrição da imagem"
          className="w-full h-fit rounded-md cursor-pointer transition-transform duration-300 hover:scale-105"
        />
      </div>
    );
  } 
}
