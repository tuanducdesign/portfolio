import { Project } from '@site/types';
import { Markdown } from '@site/components';
import { Container } from '@site/components/Container';

export function Intro({ data }: { data: Pick<Project, 'html'> }) {
  return (
    <div className="flex flex-col items-center justify-center scroll-mt-16" id="intro">
      <Container className="relative">
        <div className="absolute inset-y-0 left-0 bg-blue-text dark:bg-yellow-border rounded-lg w-2" />
        <h1 className="font-bold md:text-3xl text-2xl text-center">About Me</h1>
        <Markdown html={data.html} className="md:mx-auto m-4 ml-6" />
      </Container>
    </div>
  );
}
