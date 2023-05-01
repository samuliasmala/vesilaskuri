import React, { FC } from 'react';
import Link from 'next/link';
import { twMerge } from 'tailwind-merge';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  href?: string | URL;
}

export const Button: FC<ButtonProps> = ({
  children,
  className,
  href,
  ...props
}) => {
  const button = (
    <button
      {...props}
      className={twMerge(
        'rounded-md bg-primary px-4 py-2 font-bold text-white disabled:opacity-60',
        className
      )}
    >
      {children}
    </button>
  );

  if (href && !props.disabled) return <Link href={href}>{button}</Link>;

  return button;
};
