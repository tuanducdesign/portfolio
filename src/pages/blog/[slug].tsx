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

const dateFormatter = new Intl.DateTimeFormat('en-US', {
  month: 'long',
  year: 'numeric',
  weekday: 'long',
  day: 'numeric',
});

export default function BlogPostPage({
  post,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Layout>
      <Seo
        title={post.title}
        description={post.description}
        image={buildImageKitURL({
          src: post.cover.path,
          width: 420,
          aspectRatio: '4:3',
        })}
        keywords={post.tags}
      />
      <Container className="flex justify-center flex-col my-8 max-w-prose">
        <div className="my-8 flex flex-col gap-2">
          <BackButton />
          <h1 className="font-bold text-2xl md:text-4xl">{post.title}</h1>
          <hr />
          <span className="text-neutral font-semibold">
            {dateFormatter.format(new Date(post.publishedAt))}&nbsp;-&nbsp;
            {post.readingTime.text}
          </span>
          <ul className="flex gap-2 flex-wrap">
            {post.tags.map((tag, idx) => (
              <li key={tag + idx} className="p-1">
                <Link
                  href={{
                    pathname: '/blog',
                    query: {
                      tags: tag,
                    },
                  }}
                >
                  <span className="text-secondary dark:text-primary">#</span>
                  <span>{tag}</span>
                </Link>
              </li>
            ))}
          </ul>
          <BlurrableImage
            placeholder={post.placeholder}
            className="aspect-h-4 aspect-w-3 md:aspect-w-3 md:aspect-h-2 md:-mx-24 mt-6"
            img={
              <img
                {...getImgProps({
                  src: post.cover.path,
                  sizes: [
                    '(max-width: 520px) 90vw',
                    '(min-width: 521px) and (max-width: 840px) 80vw',
                    `${post.cover.width}px`,
                  ],
                  widths: [480, 840, 1100, post.cover.width],
                })}
                alt={post.title}
                height={post.cover.height}
                className="rounded-md object-cover object-center"
                title={`Photo by ${post.cover.author}`}
              />
            }
          />
          <p className="text-sm text-neutral text-center italic">
            Photo by&nbsp;
            <a
              href={post.cover.credit}
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
            >
              {post.cover.author}
            </a>
          </p>
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
