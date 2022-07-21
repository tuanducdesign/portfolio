import { allTutorials, allPosts } from '@content';
import { Container, Layout, PostCard, Seo } from '@site/components';
import { pick } from '@site/utils';
import { buildImageKitURL } from '@site/libs';
import type { InferGetStaticPropsType } from 'next';
import Link from 'next/link';

const dateFormatter = new Intl.DateTimeFormat('en-US', {
  dateStyle: 'medium',
});

export default function BlogPages({
  posts,
  tutorials,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Layout>
      <Seo
        title="Blog"
        description="Ashal's technical blog"
        keywords={[
          'coding',
          'react',
          'article',
          'ashal farhan',
          'blog',
          'nextjs',
          'webdev',
        ]}
        image={buildImageKitURL({
          src: '/misc/glenn-carstens-peters-npxXWgQ33ZQ-unsplash_7H3jgLOx_.jpg',
          width: 420,
          aspectRatio: '4:3',
        })}
      />
      <Container className="max-w-4xl mx-auto">
        <div className="min-h-[480px] text-center flex flex-col items-center justify-center">
          <h1 className="text-3xl md:text-4xl font-bold motion-safe:animate-fade-up">
            Welcome to my blog!
          </h1>
          <p className="text-neutral font-semibold md:text-xl mt-2 motion-safe:animate-fade-up">
            Here I share my knowledge and experience as a Frontend Engineer.
          </p>
        </div>
        <div className="mb-12">
          <h2 className="font-bold text-2xl mb-4">Recent Posts</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 grid-grid-cols-2 gap-8">
            {posts.map(post => (
              <PostCard post={post} key={post.title} />
            ))}
          </div>
        </div>
        <div className="mb-12">
          <h2 className="font-bold text-2xl mb-4">How to&apos;s</h2>
          <div className="space-y-2">
            {tutorials.map(post => (
              <Link
                key={post.title}
                passHref
                href={{
                  pathname: '/tutorials/[slug]',
                  query: { slug: post.slug },
                }}
              >
                <a className="flex justify-between group sm:flex-row flex-col">
                  <h3 className="group-hover:underline underline-offset-2 font-semibold">
                    {post.title}
                  </h3>
                  <span className="text-neutral">
                    {dateFormatter.format(new Date(post.publishedAt))}
                  </span>
                </a>
              </Link>
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
      .sort(
        (a, b) =>
          new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
      )
      .map(post =>
        pick(post, ['title', 'slug', 'publishedAt', 'cover', 'placeholder']),
      ),
    tutorials: allTutorials
      .filter(post => !post.draft)
      .sort(
        (a, b) =>
          new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
      )
      .map(post => pick(post, ['title', 'slug', 'publishedAt'])),
  },
});
