import {
  BackButton,
  BlurrableImage,
  Container,
  Layout,
  Markdown,
  Seo,
} from '@site/components';
import { getImgProps, pick } from '@site/utils';
import type { GetStaticPropsContext, InferGetStaticPropsType } from 'next';
import Link from 'next/link';
import { buildImageKitURL } from '@site/libs';
import { allPosts } from '@content';

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
        title={post.title}
        description={post.description}
        image={buildImageKitURL({ src: post.cover.path })}
        keywords={post.tags}
      />
      <Container className="flex justify-center flex-col my-8 max-w-prose">
        <div className="my-8 flex flex-col gap-2">
          <BackButton />
          <h1 className="font-bold text-2xl md:text-4xl">{post.title}</h1>
          <hr />
          <span className="text-neutral font-semibold">
            {new Date(post.publishedAt).toDateString()}&nbsp;-&nbsp;
            {post.readingTime.text}
          </span>
          <ul className="flex gap-2">
            {post.tags.map((tag, idx) => (
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
            placeholder={post.placeholder}
            className="aspect-h-4 aspect-w-3 md:aspect-w-3 md:aspect-h-2 md:-mx-24 my-6"
            img={
              <img
                {...getImgProps({
                  src: post.cover.path,
                  sizes: [
                    '(max-width: 520px) 100vw',
                    '(min-width: 521px) and (max-width: 764px) 80vw',
                    (post.cover.width ?? 480) + 'px',
                  ],
                  widths: [post.cover.width ?? 480, 840, 1100],
                })}
                alt={post.title}
                width={post.cover.width}
                height={post.cover.height}
                className="rounded-md object-cover object-center"
              />
            }
          />
        </div>
        <Markdown content={post.body.html} className="mx-auto" />
      </Container>
    </Layout>
  );
}

export const getStaticPaths = () => ({
  paths: allPosts.map(({ slug }) => ({ params: { slug } })),
  fallback: false,
});

export const getStaticProps = async ({
  params,
}: GetStaticPropsContext<{ slug: string }>) => {
  const { slug = '' } = params || {};
  const post = allPosts.find(post => post.slug === slug);
  if (!post) {
    throw new Error(`Post with slug ${slug} not found`);
  }
  return {
    props: {
      post: pick(post, [
        'title',
        'description',
        'body',
        'cover',
        'publishedAt',
        'readingTime',
        'tags',
        'placeholder',
      ]),
    },
  };
};
