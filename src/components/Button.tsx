/* eslint-disable react/display-name */
import clsx from 'clsx';
import { AnchorHTMLAttributes, createElement, DetailedHTMLProps, forwardRef, HTMLAttributes } from 'react';

type ButtonProps = {
  as?: 'a' | 'button';
  color?: 'primary' | 'secondary';
} & DetailedHTMLProps<
  HTMLAttributes<HTMLButtonElement> | AnchorHTMLAttributes<HTMLAnchorElement>,
  HTMLButtonElement | HTMLAnchorElement
>;

const Button = forwardRef(({ children, as = 'button', color = 'primary', className, ...props }: ButtonProps, ref) => {
  return createElement(
    as,
    {
      ...props,
      className: clsx('border-2 px-4 transition font-bold py-2 text-center cursor-pointer', className, {
        ['border-blue-300 hover:bg-blue-300 hover:text-black']: color === 'primary',
      }),
      ref,
    },
    children,
  );
});

export { Button };
