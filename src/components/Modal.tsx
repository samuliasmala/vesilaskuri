import React, { FC, ReactNode } from 'react';

export const Modal: FC<{ children: ReactNode; closeModal: () => void }> = ({
  children,
  closeModal,
}) => {
  return (
    <>
      {/* Partially transparent background overlay covering the screen */}
      <div
        className="fixed left-0 top-0 z-10 h-full w-full bg-gray-500 opacity-70"
        onClick={closeModal}
      ></div>
      {/* Modal content centered */}
      <div className="fixed left-1/2 top-1/2 z-20 max-h-screen w-full max-w-lg -translate-x-1/2 -translate-y-1/2 p-8">
        {children}
      </div>
    </>
  );
};
