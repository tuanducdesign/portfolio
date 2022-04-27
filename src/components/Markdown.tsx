import clsx from 'clsx';

export const Markdown = ({ html = '', className = '' }) => {
  return (
    <article
      className={clsx(
        'prose prose-lg md:prose-xl prose-sky dark:text-white dark:prose-headings:text-white prose-code:text-blue-400 dark:prose-code:text-blue-300',
        className,
      )}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
};
