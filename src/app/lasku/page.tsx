import React from 'react';

import { Header } from '@/app/Header';
import { NavButtons } from './NavButtons';

export default function Invoice() {
  return (
    <div className="container mx-auto min-h-screen max-w-2xl bg-white">
      <Header />
      <main className="flex flex-col p-8">
        <NavButtons />
      </main>
    </div>
  );
}
