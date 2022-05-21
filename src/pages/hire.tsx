import { Seo, Layout, Button, Markdown } from '@site/components';
import { profile } from '@site/config';
import { parseMarkdown } from '@site/libs';
import { getFileContent } from '@site/utils';
import { InferGetStaticPropsType } from 'next';

export default function HirePage({
  content,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Layout>
      <Seo title="Hire Me!" />
      <div className="container mx-auto pb-12">
        <Markdown className="md:mx-auto my-12 p-4" content={content} />
        <div className="max-w-xl mx-auto md:space-x-4 flex md:flex-row flex-col md:space-y-0 space-y-4 px-4">
          <Button
            className="flex-auto"
            as="a"
            href={`mailto:${profile.personal.email}`}
          >
            Mail Me
          </Button>
          <Button
            className="flex-auto"
            as="a"
            href="/resume.pdf"
            download={`${profile.fullName}-Resume`}
          >
            My Resume
          </Button>
        </div>
      </div>
    </Layout>
  );
}

export const getStaticProps = async () => {
  const raw = getFileContent({
    filename: 'hire',
  });
  const content = await parseMarkdown(raw);
  return {
    props: { content },
  };
};
