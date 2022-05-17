import { Layout, Markdown } from '@site/components';
import { Post, Project } from '@site/types';
import { getFiles, getMarkdown } from '@site/utils';
import { GetStaticPaths, GetStaticProps } from 'next';

export default function Blog({ post }: { post: Post }) {
  return (
    <Layout>
      <Markdown html={post.html} />
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
