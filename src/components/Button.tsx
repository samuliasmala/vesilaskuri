import React, { FC } from 'react';
import { twMerge } from 'tailwind-merge';

export const Button: FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = ({
  children,
  className,
  ...props
}) => {
  return (
    <button
      {...props}
      className={twMerge(
        'rounded-md bg-primary p-5 font-bold text-white disabled:opacity-60',
        className
      )}
    >
      {children}
    </button>
  );
};
