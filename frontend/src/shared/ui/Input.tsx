'use client';

import { forwardRef } from 'react';
import clsx from 'clsx';
import type { InputHTMLAttributes } from 'react';

type Props = InputHTMLAttributes<HTMLInputElement>;

export const Input = forwardRef<HTMLInputElement, Props>(function Input(
  { className, ...props },
  ref
) {
  return <input ref={ref} className={clsx(className)} {...props} />;
});
