import clsx from 'clsx';
import copy from 'copy-to-clipboard';
import omit from 'lodash.omit';
import { useEffect, useRef, useState } from 'react';
import { FiCheck, FiCopy } from 'react-icons/fi';

export const Pre = ({ className, ...props }: JSX.IntrinsicElements['pre']) => {
  const ref = useRef<HTMLPreElement>(null);
  const [copied, setCopied] = useState(false);
  const onClickCopy = () => {
    if (!ref.current) {
      throw new Error("ref is not passed to 'pre' element");
    }
    setCopied(copy(ref.current.innerText));
  };
  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (copied) {
      timeout = setTimeout(setCopied, 1500, false);
    }
    return () => {
      clearTimeout(timeout);
    };
  }, [copied]);
  return (
    <div className="relative group">
      <button
        onClick={onClickCopy}
        className="bg-black-primary transition-opacity absolute top-2 right-2 p-2 ring-2 ring-blue-text rounded-md opacity-0 group-hover:opacity-100 text-white"
        title={copied ? 'Copied to your clipboard' : 'Copy to clipboard'}
      >
        {copied ? <FiCheck /> : <FiCopy />}
      </button>
      <pre
        {...omit(props, 'node')}
        className={clsx('not-prose bg-transparent p-0', className)}
        ref={ref}
      />
    </div>
  );
};
