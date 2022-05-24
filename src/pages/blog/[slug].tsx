import {
  BackButton,
  BlurrableImage,
  Container,
  Layout,
  Markdown,
  Seo,
} from '@site/components';
import { getImgProps } from '@site/helpers';
import { getFiles, getPost } from '@site/utils';
import type {
  GetStaticPaths,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from 'next';
import Link from 'next/link';
import { buildImageKitURL } from '@site/libs';

// import { profile } from '@site/config';
// function getTwitterShareLink({ title, slug }: { title: string; slug: string }) {
//   return `https://twitter.com/intent/tweet?${new URLSearchParams({
//     url: `https://ashal.me/blog/${slug}`,
//     text: `I just read "${title}" by @${profile.personal.twitter}`,
//   })}`;
// }

export default function BlogPostPage({
  post,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Layout>
      <Seo
        title={post.meta.title}
        description={post.meta.description}
        image={buildImageKitURL({ src: post.meta.cover.path })}
        keywords={post.meta.tags}
      />
      <Container className="flex justify-center flex-col my-8 max-w-prose">
        <div className="my-8 flex flex-col gap-2">
          <BackButton />
          <h1 className="font-bold text-2xl md:text-4xl">{post.meta.title}</h1>
          <hr />
          <span className="text-neutral font-semibold">
            {new Date(post.meta.publishedAt).toDateString()} -&nbsp;
            {post.readingTime} min read
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
                    <span className="text-secondary dark:text-primary">#</span>
                    <span>{tag}</span>
                  </a>
                </Link>
              </li>
            ))}
          </ul>
          <BlurrableImage
            placeholder={post.meta.placeholder}
            className="aspect-h-4 aspect-w-3 md:aspect-w-3 md:aspect-h-2 md:-mx-24 my-6"
            img={
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
                className="rounded-md object-cover object-center"
              />
            }
          />
        </div>
        <Markdown content={post.content} className="mx-auto" />
      </Container>
    </Layout>
  );
}

export const getStaticPaths: GetStaticPaths = () => {
  const files = getFiles('posts');
  return {
    paths: files.map(slug => ({ params: { slug } })),
    fallback: false,
  };
};

export const getStaticProps = async ({
  params,
}: GetStaticPropsContext<{ slug: string }>) => {
  const { slug = '' } = params || {};
  const post = await getPost({
    slug,
    placeholder: true,
    withContent: true,
  });
  return {
    props: {
      post,
    },
  };
};
