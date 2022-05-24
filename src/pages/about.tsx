import { Layout, Markdown, Seo } from '@site/components';
import { parseMarkdown } from '@site/libs';
import { getFileContent } from '@site/utils';
import type { InferGetStaticPropsType } from 'next';

export default function AboutPage({
  content,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Layout>
      <Seo title="About" />
      <Markdown content={content} className="mx-auto my-20" />
    </Layout>
  );
}

export const getStaticProps = async () => {
  const raw = getFileContent({
    filename: 'about',
  });
  const content = await parseMarkdown(raw);
  return {
    props: { content },
  };
};
