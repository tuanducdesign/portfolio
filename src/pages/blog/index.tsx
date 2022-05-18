import { Container, Layout, PostCard, Seo } from '@site/components';
import { Post } from '@site/types';
import { getAllPosts } from '@site/utils';
import { useReducedMotion, motion, Variants } from 'framer-motion';

export default function BlogPages({ posts }: { posts: Post[] }) {
  const reduce = useReducedMotion();

  const textReveal: Variants = {
    initial: { opacity: 0, y: reduce ? 0 : 25 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };
  return (
    <Layout>
      <Seo
        title="Blog"
        description="Ashal's personal blog about Coding"
        keywords={['coding', 'react', 'article', 'ashal farhan', 'blog', 'nextjs']}
      />
      <Container className="max-w-4xl mx-auto">
        <motion.div
          initial="initial"
          animate="visible"
          className="min-h-[480px] text-center flex flex-col items-center justify-center"
        >
          <motion.h1 variants={textReveal} className="text-4xl font-bold">
            Welcome to my blog! ✍️
          </motion.h1>
          <motion.p variants={textReveal} className="text-gray-text font-semibold text-xl mt-2">
            Here I will share my knowledge and experience as a Frontend Engineer.
          </motion.p>
        </motion.div>
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
