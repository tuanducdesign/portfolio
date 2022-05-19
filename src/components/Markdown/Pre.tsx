import clsx from 'clsx';

export const Pre = ({ className, ...props }: JSX.IntrinsicElements['pre']) => {
  return <pre {...props} className={clsx('not-prose bg-transparent relative p-0', className)} />;
};
