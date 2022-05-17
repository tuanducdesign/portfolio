import { Container, Layout, Seo } from '@site/components';
import { Post } from '@site/types';
import { getAllPosts } from '@site/utils';
import Link from 'next/link';

export default function BlogPages({ posts }: { posts: Post[] }) {
  return (
    <Layout>
      <Seo title="Blog" description="Ashal's personal blog about Coding" />
      <Container className="max-w-4xl mx-auto">
        <div className="min-h-[480px] text-center flex flex-col items-center justify-center">
          <h1 className="text-4xl font-bold">Welcome to my blog!</h1>
          <p className="text-gray-text font-semibold text-xl mt-2">
            Here I will share my knowledge and experience as a Frontend Engineer.
          </p>
        </div>
        <div className="mb-12">
          <h1 className="ml-4 font-bold text-3xl mb-4" id="featured">
            Featured
          </h1>
          <div className="flex flex-col gap-8">
            {posts.map((post) => (
              <Link key={post.meta.id} href={'/blog/' + post.meta.slug} passHref>
                <a className="p-4 rounded-lg cursor-pointer hover:ring-offset-4 hover:ring-blue-text dark:hover:ring-yellow-border ring-2 ring-transparent dark:ring-offset-black-primary transition-all">
                  <h1 className="font-bold text-xl">{post.meta.title}</h1>
                  <p className="text-gray-400">{post.meta.description}</p>
                  <ul className="flex gap-2">
                    {post.meta.tags.map((tag, idx) => (
                      <li key={tag + idx} className="p-1">
                        <span className="text-yellow-border dark:text-blue-text">#</span>
                        <span>{tag}</span>
                      </li>
                    ))}
                  </ul>
                </a>
              </Link>
            ))}
          </div>
        </div>
      </Container>
    </Layout>
  );
}

export async function getStaticProps() {
  const posts = await getAllPosts();
  return {
    props: { posts },
  };
}
