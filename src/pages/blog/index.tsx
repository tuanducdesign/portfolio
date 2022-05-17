import { Layout, Seo } from '@site/components';
import { Post } from '@site/types';
import { getAllPosts } from '@site/utils';

export default function BlogPages({ posts }: { posts: Post[] }) {
  return (
    <Layout>
      <Seo />
      <div className="max-w-4xl mx-auto bg-gray-800">
        <div className="min-h-[400px] text-center flex flex-col items-center justify-center">
          <h1 className="text-4xl font-bold">Welcome to my blog site!</h1>
          <p className="">Here I will share my knowledge and experience as a Frontend Engineer.</p>
        </div>
        <div>
          {posts.map((post) => (
            <div key={post.meta.id}>
              <h1>{post.meta.title}</h1>
              <p>{post.meta.description}</p>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}

export async function getStaticProps() {
  const posts = await getAllPosts();
  return {
    props: { posts },
  };
}
