import { Container, Layout, Markdown, Seo } from '@site/components';
import { getImgProps } from '@site/helpers';
import { useTimeRead } from '@site/hooks';
import type { Post } from '@site/types';
import { getFiles, getPost } from '@site/utils';
import type { GetStaticPaths, GetStaticPropsContext } from 'next';
import Link from 'next/link';
import type { Ref } from 'react';

export default function BlogPostPage({ post }: { post: Post }) {
  const [articleRef, minute] = useTimeRead();
  return (
    <Layout>
      <Seo
        title={post.meta.title}
        description={post.meta.description}
        keywords={post.meta.tags}
      />
      <Container className="flex justify-center flex-col my-8 max-w-prose">
        <div className="mb-4 flex flex-col gap-2">
          <h1 className="font-bold text-4xl">{post.meta.title}</h1>
          <hr />
          <img
            {...getImgProps({
              src: post.meta.cover.path,
              sizes: [
                '(max-width: 520px) 100vw',
                '(min-width: 521px) and (max-width: 764px) 80vw',
                (post.meta.cover.width ?? 480) + 'px',
              ],
              widths: [post.meta.cover.width ?? 480, 840, 1100],
            })}
            alt={post.meta.title}
            width={post.meta.cover.width}
            height={post.meta.cover.height}
            className="aspect-auto rounded-md"
          />
          <span className="text-gray-text font-semibold">
            {new Date(post.meta.publishedAt).toDateString()} - {minute} min read
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
                    <span className="text-yellow-border dark:text-blue-text">
                      #
                    </span>
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
    paths: files.map(file => ({ params: { slug: file.slice(0, -3) } })),
    fallback: false,
  };
};

export const getStaticProps = async ({
  params,
}: GetStaticPropsContext<{ slug: string }>) => {
  const { slug = '' } = params || {};
  const post = await getPost(slug);
  return {
    props: {
      post,
    },
  };
};
