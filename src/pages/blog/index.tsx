import { allPosts } from '@content';
import { Container, Layout, PostCard, Seo } from '@site/components';
import { pick } from '@site/utils';
import { buildImageKitURL } from '@site/libs';
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
          <motion.h1
            variants={textReveal}
            className="text-3xl md:text-4xl font-bold"
          >
            Welcome to my blog!
          </motion.h1>
          <motion.p
            variants={textReveal}
            className="text-neutral font-semibold md:text-xl mt-2"
          >
            Here I share my knowledge and experience as a Frontend Engineer.
          </motion.p>
        </motion.div>
        <div className="mb-12">
          <h2 className="font-bold text-2xl mb-4">Recent Posts</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 grid-grid-cols-2  gap-8">
            {posts.map(post => (
              <PostCard post={post} key={post.title} />
            ))}
          </div>
        </div>
      </Container>
    </Layout>
  );
}

export const getStaticProps = async () => ({
  props: {
    posts: allPosts
      .filter(post => !post.draft)
      .map(post =>
        pick(post, ['title', 'slug', 'publishedAt', 'cover', 'placeholder']),
      ),
  },
});
