"use client";
import { useEffect, useState } from "react";
import { OutlineSearch } from "@/svgs/svgs";
import { posts } from "@/datas/posts";
import AllPosts from "@/components/AllPosts";
import { checkUser } from "@/app/(auth)/login/loginActions";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const PostSkeleton = () => (
  <SkeletonTheme 
    baseColor="#202020" 
    highlightColor="#444"
    duration={2}
    height={230} width={300}
  >
    <div className="border border-gray-500 shadow-md rounded-lg mb-4">
      {/* Área da imagem */}
      <div className="w-full">
        <Skeleton height={230} width={300}/>
      </div>
    </div>
  </SkeletonTheme>
);

export default function Feed() {
  const [search, setSearch] = useState("");
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
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
  }, []);

  const filteredPosts = posts.filter((post) => {
    const descriptionMatch = post.description.toLowerCase().includes(search.toLowerCase());
    const categoriesMatch = post.photo.categories.some((category) =>
      category.toLowerCase().includes(search.toLowerCase())
    );
    return descriptionMatch || categoriesMatch;
  });

  return (
    <div className="flex items-center justify-center px-5 h-full w-full">
      <div className="flex w-full h-screen flex-col justify-start items-center pt-5 pb-10">
        {/* Campo de Busca */}
        <div className="w-full px-3 sm:w-1/2 h-12 bg-gray-800 rounded-2xl flex flex-row justify-start items-center border border-slate-600 mb-3">
          <OutlineSearch />
          <input
            className="w-full pl-2 outline-none bg-transparent text-white"
            type="text"
            placeholder="Pesquise por alguma imagem"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Exibição dos Posts Filtrados */}
        <div className="pb-6 columns-2 sm:columns-2 lg:columns-3 gap-4">
          {isLoading
            ? Array(8)
                .fill(0)
                .map((_, index) => <PostSkeleton key={index} />)
            : filteredPosts.map((post) => (
                <AllPosts
                  key={post.id}
                  id={post.id}
                  photo={{ path: post?.photo?.path, categories: post?.photo?.categories, forPremium: post?.photo?.forPremium }}
                  isPremium={user?.isPremium || false}
                />
              ))}
        </div>
      </div>
    </div>
  );
}