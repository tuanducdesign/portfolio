import { TechIcon } from '@site/components';
import { Project } from '@site/types';

export function LandingIntro({ data }: { data: Pick<Project, 'html'> }) {
  return (
    <div
      className="bg-gray-800 min-h-screen flex flex-col items-center justify-center relative md:py-8 py-4"
      id="intro"
    >
      <h1 className="uppercase font-bold text-3xl text-center">About Me</h1>
      <article
        className="prose md:prose-xl md:mx-auto my-12 mx-4 prose-lg prose-cyan text-white prose-headings:text-white prose-code:text-blue-300"
        dangerouslySetInnerHTML={{ __html: data.html }}
      />
      <TechIcon
        name="typescript"
        className="absolute md:block hidden motion-safe:animate-bounce top-24 right-24"
        size={32}
      />
      <TechIcon
        name="javascript"
        className="absolute md:block hidden motion-safe:animate-bounce top-24 left-24"
        size={32}
      />
      <TechIcon
        name="node_js"
        className="absolute md:block hidden motion-safe:animate-bounce bottom-24 left-24"
        size={32}
      />
      <TechIcon
        name="graphql"
        className="absolute md:block hidden motion-safe:animate-bounce bottom-24 right-24"
        size={32}
      />
    </div>
  );
}
