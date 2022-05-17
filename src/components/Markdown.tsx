import clsx from 'clsx';

export const Markdown = ({ html = '', className = '' }) => {
  return (
    <article
      className={clsx('prose prose-sky dark:prose-invert prose-lg md:prose-xl', className)}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
};
