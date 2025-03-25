import Post from '@/components/Post';
import { posts } from '@/datas/posts';

export default function Feed() {
  return (
    <div className="flex items-center justify-center px-5 h-full w-full">
      <div className="flex min-w-96 h-screen max-1/2 flex-col justify-start items-center pt-5 pb-10">
        <div className="pt-1 flex flex-col pb-7 gap-4">
          {posts.map((post) => {
            return (
              <Post
                key={post.id}
                isPremium={post.isPremium}
                description={post.description}
                likes={post.likes}
                date={post.date}
                photo={{
                  path: post.photo.path,
                  forPremium: post.photo.forPremium,
                }}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
