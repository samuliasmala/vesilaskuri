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
        'rounded-md bg-[#274A61] p-5 font-bold text-white disabled:bg-[#274A619E]',
        className
      )}
    >
      {children}
    </button>
  );
};
