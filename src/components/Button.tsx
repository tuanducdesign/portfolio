import clsx from 'clsx';
import { createElement, forwardRef, ReactNode, Ref } from 'react';

type ButtonAsProps = {
  as?: 'button';
} & JSX.IntrinsicElements['button'];

type AnchorAsProps = {
  as: 'a';
} & JSX.IntrinsicElements['a'];

type ButtonProps = {
  color?: 'primary' | 'unstyled';
  leftIcon?: ReactNode;
} & (ButtonAsProps | AnchorAsProps);

const Button = forwardRef(
  (
    {
      children,
      as = 'button',
      color = 'primary',
      className,
      ...props
    }: ButtonProps,
    ref: Ref<HTMLButtonElement | HTMLAnchorElement>,
  ) => {
    const element = createElement(
      as,
      {
        ...props,
        className: clsx(
          'transition px-4 py-2 text-center cursor-pointer',
          className,
          {
            ['font-bold border-2 border-blue-text hover:bg-blue-text dark:border-blue-text dark:hover:bg-blue-text hover:text-white-text dark:hover:text-black-primary rounded-lg']:
              color === 'primary',
          },
        ),
        ref,
      },
      children,
    );
    return element;
  },
);

export { Button };

/* 
eslint
  react/display-name: 0
*/
