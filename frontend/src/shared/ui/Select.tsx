'use client';

import { forwardRef } from 'react';
import clsx from 'clsx';
import type { SelectHTMLAttributes } from 'react';

type Props = SelectHTMLAttributes<HTMLSelectElement>;

export const Select = forwardRef<HTMLSelectElement, Props>(function Select(
  { className, ...props },
  ref
) {
  return <select ref={ref} className={clsx(className)} {...props} />;
});
