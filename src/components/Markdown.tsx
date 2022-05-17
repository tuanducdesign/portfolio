import clsx from 'clsx';

export const Markdown = ({ html = '', className = '' }) => {
  return (
    <article
      className={clsx(
        'prose prose-sky dark:prose-invert md:prose-lg max-w-full md:max-w-prose',
        className,
      )}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
};
