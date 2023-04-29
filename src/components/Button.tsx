import React, { FC, ReactNode } from 'react';

export const Button: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <button className="rounded-md bg-[#274A61] p-5 font-bold text-white">
      {children}
    </button>
  );
};
