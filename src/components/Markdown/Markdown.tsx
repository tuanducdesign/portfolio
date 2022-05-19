import clsx from 'clsx';
import ReactMarkdown, { Options } from 'react-markdown';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeHighlight from 'rehype-highlight';
import rehypeRaw from 'rehype-raw';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';
import { Code } from './Code';
import { Image } from './Image';

const remarkPlugins: Options['remarkPlugins'] = [remarkGfm];
const rehypePlugins: Options['rehypePlugins'] = [
  rehypeRaw,
  rehypeSlug,
  [
    rehypeAutolinkHeadings,
    {
      behavior: 'wrap',
    },
  ],
  rehypeHighlight,
];

const components: Options['components'] = {
  code: Code,
  img: Image,
};

export const Markdown = ({
  content = '',
  className = '',
}: {
  className?: string;
  content: string;
}) => {
  return (
    <ReactMarkdown
      remarkPlugins={remarkPlugins}
      rehypePlugins={rehypePlugins}
      components={components}
      className={clsx(
        'prose prose-sky dark:prose-invert max-w-full md:max-w-prose prose-a:break-words',
        className,
      )}
    >
      {content}
    </ReactMarkdown>
  );
};
