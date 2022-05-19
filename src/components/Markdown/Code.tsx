import clsx from 'clsx';
import type { CodeProps } from 'react-markdown/lib/ast-to-react';

export const Code = ({ inline, className, ...props }: CodeProps) => {
  return (
    <code
      {...props}
      className={clsx(className, {
        'text-blue-text dark:bg-gray-800 bg-gray-200 rounded-md p-[1px] transition-colors': inline,
      })}
    />
  );
};
