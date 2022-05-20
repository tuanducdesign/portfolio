import { getImgProps } from '@site/helpers';
import clsx from 'clsx';
import omit from 'lodash.omit';

export const Image = ({
  className,
  alt,
  ...props
}: JSX.IntrinsicElements['img']) => {
  return (
    <img
      {...omit(props, 'node')}
      {...getImgProps({
        src: props.src ?? '',
        widths: [480, 640, 864, 1100, 1260],
        sizes: ['(max-width: 512px) 100vw', '(max-width: 864) 70vw', '60vw'],
      })}
      className={clsx('mx-auto rounded-md', className)}
      alt={alt || 'An image'}
      loading="lazy"
    />
  );
};
