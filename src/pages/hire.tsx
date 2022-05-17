import { Seo, Layout, Button, Markdown } from '@site/components';
import { profileData } from '@site/config';
import { getMarkdown } from '@site/utils';

type HirePageProps = {
  content: {
    html: string;
  };
};

export default function HirePage({ content }: HirePageProps) {
  return (
    <Layout>
      <Seo title="Hire Me!" />
      <div className="container mx-auto pb-12">
        <Markdown className="md:mx-auto my-12 p-4" html={content.html} />
        <div className="max-w-xl mx-auto md:space-x-4 flex md:flex-row flex-col md:space-y-0 space-y-4 px-4">
          <Button className="flex-auto" as="a" href={`mailto:${profileData.email}`}>
            Mail Me
          </Button>
          <Button
            className="flex-auto"
            as="a"
            href={'/resume.pdf'}
            download={`${profileData.fullName}-Resume`}
          >
            My Resume
          </Button>
        </div>
      </div>
    </Layout>
  );
}

export const getStaticProps = async () => {
  const content = await getMarkdown('career');
  return {
    props: { content },
  };
};
