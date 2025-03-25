"use client"
import { useState } from "react";
import { OutlineSearch } from "@/svgs/svgs";
import { posts } from "@/datas/posts";
import AllPosts from "@/components/AllPosts";

export default function Feed() {
  const [search, setSearch] = useState("");

  // Filtrar os posts com base na descrição ou categorias
  const filteredPosts = posts.filter((post) => {
    const descriptionMatch = post.description.toLowerCase().includes(search.toLowerCase());
    const categoriesMatch = post.photo.categories.some((category: string) =>
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
        <div className="pb-6 columns-2 sm:columns-2 md:columns-3 lg:columns-4 gap-4">
          {filteredPosts.map((post) => (
            <AllPosts
              key={post.id}
              photo={{ path: post?.photo?.path, categories: post?.photo?.categories, forPremium: post?.photo?.forPremium }}
              isPremium={false}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
