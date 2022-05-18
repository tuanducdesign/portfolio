import { Container, Layout, PostCard, Seo } from '@site/components';
import { Post } from '@site/types';
import { getAllPosts } from '@site/utils';

export default function BlogPages({ posts }: { posts: Post[] }) {
  return (
    <Layout>
      <Seo
        title="Blog"
        description="Ashal's personal blog about Coding"
        keywords={['coding', 'react', 'article', 'ashal farhan', 'blog', 'nextjs']}
      />
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
              <PostCard meta={post.meta} key={post.meta.id} />
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
