'use client';

import Link from 'next/link';
import clsx from 'clsx';
import type { ReactNode } from 'react';
import type { ButtonAsButton, ButtonAsLink } from './types';

type Props = (ButtonAsButton | ButtonAsLink) & {
  className?: string;
  children?: ReactNode;
};

export function Button({ className, children, ...props }: Props) {
  if (props.href !== undefined) {
    const { href, ...rest } = props;

    return (
      <Link href={href} className={clsx(className)} {...rest}>
        {children}
      </Link>
    );
  }

  const { type = 'button', ...rest } = props;

  return (
    <button type={type} className={clsx(className)} {...rest}>
      {children}
    </button>
  );
}
