import clsx from 'clsx';
import omit from 'lodash.omit';
import type { CodeProps } from 'react-markdown/lib/ast-to-react';

export const Code = ({ inline, className, ...props }: CodeProps) => {
  return (
    <code
      {...omit(props, 'node')}
      className={clsx(className, {
        'text-blue-text dark:bg-gray-800 bg-gray-200 rounded-md p-[1px] transition-colors':
          inline,
      })}
    />
  );
};
