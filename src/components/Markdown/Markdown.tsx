import clsx from 'clsx';

export const Markdown = ({
  content = '',
  className = '',
}: JSX.IntrinsicElements['article'] & { content: string }) => {
  return (
    <article
      className={clsx(
        'prose prose-sky dark:prose-invert max-w-full md:max-w-prose prose-a:break-words',
        className,
      )}
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
};
