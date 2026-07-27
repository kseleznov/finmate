import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from 'react';

export type ButtonAsButton = {
  href?: undefined;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'type'> & {
    type?: 'button' | 'submit';
  };

export type ButtonAsLink = {
  href: string;
} & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'>;
