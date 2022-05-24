import clsx from 'clsx';

export const Card = ({ className, ...props }: JSX.IntrinsicElements['div']) => {
  return (
    <div
      {...props}
      className={clsx(
        'p-1 rounded-md cursor-pointer ring-2 ring-transparent transition-all ring-offset-inherit h-full',
        'hover:ring-offset-8 hover:ring-primary',
        'dark:hover:ring-secondary dark:ring-offset-dark-primary',
        className,
      )}
    />
  );
};
