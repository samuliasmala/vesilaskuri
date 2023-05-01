import React, { FC } from 'react';
import { Header } from '@/app/Header';
import { Button } from '@/components/Button';

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

const NavButtons: FC = () => (
  <div className="flex justify-between">
    <Button className="py-1" href="/">
      Takaisin
    </Button>
    <Button className="py-1">Tulosta tai tallenna</Button>
  </div>
);
