import { Layout, Markdown, Seo } from '@site/components';
import { Container } from '@site/components/Container';
import { Post, Project } from '@site/types';
import { getFiles, getMarkdown } from '@site/utils';
import { GetStaticPaths, GetStaticProps } from 'next';

export default function Blog({ post }: { post: Post }) {
  return (
    <Layout>
      <Seo title={post.meta.title} description={post.meta.description} keywords={post.meta.tags} />
      <Container className="flex justify-center flex-col my-8">
        <Markdown html={post.html} className="mx-auto" />
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
    const post = await getMarkdown<Project>({
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
