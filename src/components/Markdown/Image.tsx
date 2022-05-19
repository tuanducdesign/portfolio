import clsx from 'clsx';
import omit from 'lodash.omit';

function getAdditionalProps({ src }: { src: string }) {
  const sizes = [560, 840, 1100, 1650];
  return {
    srcSet: sizes.map((screen) => `${src}?tr=w-${screen} ${screen}w`).join(', '),
    sizes:
      '(max-width: 840px) 100vw, (max-width: 1023px) 80vw, (min-width: 1024px) and (max-width: 1620px) 67vw, 1100px',
  };
}

export const Image = ({ className, alt, ...props }: JSX.IntrinsicElements['img']) => {
  return (
    <img
      {...omit(props, 'node')}
      className={clsx('mx-auto rounded-md', className)}
      alt={alt || 'An image'}
      {...getAdditionalProps({ src: props.src ?? '' })}
    />
  );
};

/*
eslint 
   @next/next/no-img-element: 0
*/
