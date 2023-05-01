import { FC } from 'react';
import { twMerge } from 'tailwind-merge';

export const M3: FC<React.HTMLAttributes<HTMLDivElement>> = ({ className }) => (
  <span className={twMerge(className)}>
    m<sup>3</sup>
  </span>
);
