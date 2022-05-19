import { Container, Layout, Markdown, Seo } from '@site/components';
import { useTimeRead } from '@site/hooks';
import type { Post, Project } from '@site/types';
import { getFiles, getContent } from '@site/utils';
import { GetStaticPaths, GetStaticProps } from 'next';
import Link from 'next/link';
import { Ref } from 'react';

export default function BlogPostPage({ post }: { post: Post }) {
  const [articleRef, minute] = useTimeRead();
  return (
    <Layout>
      <Seo title={post.meta.title} description={post.meta.description} keywords={post.meta.tags} />
      <Container className="flex justify-center flex-col my-8 max-w-prose">
        <div className="mb-4 flex flex-col gap-2">
          <h1 className="font-bold text-4xl">{post.meta.title}</h1>
          <hr />
          <span className="text-gray-text font-semibold">
            Published at: {new Date(post.meta.publishedAt).toDateString()} - {minute} min read
          </span>
          <ul className="flex gap-2">
            {post.meta.tags.map((tag, idx) => (
              <li key={tag + idx} className="p-1">
                <Link
                  href={{
                    pathname: '/blog',
                    query: {
                      tags: tag,
                    },
                  }}
                  passHref
                >
                  <a>
                    <span className="text-yellow-border dark:text-blue-text">#</span>
                    <span>{tag}</span>
                  </a>
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <Markdown
          ref={articleRef as Ref<HTMLDivElement>}
          content={post.content}
          className="mx-auto"
        />
      </Container>
    </Layout>
  );
}

export const getStaticPaths: GetStaticPaths = () => {
  const files = getFiles('posts');
  return {
    paths: files.map((file) => ({ params: { slug: file.slice(0, -3) } })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const defaultRedirect = { redirect: { destination: '/', permanent: true } };
  if (!params) return defaultRedirect;
  const { slug } = params;
  if (typeof slug !== 'string') return defaultRedirect;
  try {
    const post = getContent<Project>({
      slug,
      dir: 'posts',
    });
    return {
      props: {
        post,
      },
    };
  } catch {
    return defaultRedirect;
  }
};
