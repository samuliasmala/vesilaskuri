'use client';

import { FC, ReactNode, useEffect } from 'react';

export const VersionLogger: FC<{ children: ReactNode }> = ({ children }) => {
  // Log app version number to browser console
  // eslint-disable-next-line no-console
  useEffect(() => console.log(`v${process.env.NEXT_PUBLIC_VERSION ?? ''}`), []);

  return <>{children}</>;
};
