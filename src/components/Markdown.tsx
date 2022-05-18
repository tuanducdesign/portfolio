import clsx from 'clsx';
import { forwardRef } from 'react';

// eslint-disable-next-line react/display-name
export const Markdown = forwardRef<
  HTMLElement,
  JSX.IntrinsicElements['article'] & { html: string }
>(({ html = '', className = '', ...props }, ref) => {
  return (
    <article
      {...props}
      className={clsx(
        'prose prose-sky dark:prose-invert max-w-full md:max-w-prose prose-a:break-words',
        className,
      )}
      dangerouslySetInnerHTML={{ __html: html }}
      ref={ref}
    />
  );
});
