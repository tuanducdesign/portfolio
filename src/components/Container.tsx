import clsx from 'clsx';

export const Container = (props: JSX.IntrinsicElements['div']) => {
  return <div {...props} className={clsx('w-11/12 sm:w-4/6 mx-auto', props.className)} />;
};
