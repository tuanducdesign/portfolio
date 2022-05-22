import { Container, Layout, PostCard, Seo } from '@site/components';
import { buildImageKitURL } from '@site/libs';
import { getAllPosts } from '@site/utils';
import { useReducedMotion, motion, type Variants } from 'framer-motion';
import type { InferGetStaticPropsType } from 'next';

export default function BlogPages({
  posts,
}: InferGetStaticPropsType<typeof getStaticProps>) {
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
        keywords={[
          'coding',
          'react',
          'article',
          'ashal farhan',
          'blog',
          'nextjs',
        ]}
        image={buildImageKitURL({
          src: '/misc/glenn-carstens-peters-npxXWgQ33ZQ-unsplash_7H3jgLOx_.jpg',
        })}
      />
      <Container className="max-w-4xl mx-auto">
        <motion.div
          initial="initial"
          animate="visible"
          className="min-h-[480px] text-center flex flex-col items-center justify-center"
        >
          <motion.h1 variants={textReveal} className="text-4xl font-bold">
            Welcome to my blog!
          </motion.h1>
          <motion.p
            variants={textReveal}
            className="text-gray-text font-semibold text-xl mt-2"
          >
            Here I share my knowledge and experience as a Frontend Engineer.
          </motion.p>
        </motion.div>
        <div className="mb-12">
          <h1 className="font-bold text-2xl mb-4">Posts</h1>
          <div className="flex flex-col gap-8">
            {posts.map(post => (
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
  // const mmYYY = new Intl.DateTimeFormat('en-US', {
  //   year: 'numeric',
  //   month: 'long',
  // });
  // const grouped = posts.reduce((acc, curr) => {
  //   const mY = mmYYY.format(new Date(curr.meta.publishedAt));
  //   (acc[mY] || (acc[mY] = [])).push(curr);
  //   return acc;
  // }, {} as Record<string, Post[]>);
  return {
    props: { posts },
  };
}
