import { FC } from 'react';
import { twMerge } from 'tailwind-merge';

export const H2: FC<React.HTMLAttributes<HTMLHeadingElement>> = ({
  children,
  className,
}) => (
  <h2 className={twMerge('my-3 text-xl font-bold', className)}>{children}</h2>
);
