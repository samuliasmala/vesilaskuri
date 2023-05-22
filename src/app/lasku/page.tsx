import React from 'react';

import { Header } from '~/app/Header';
import { NavButtons } from './NavButtons';
import { InvoiceContent } from './InvoiceContent';

export default function Invoice() {
  return (
    <div className="container mx-auto min-h-screen max-w-2xl bg-white">
      <Header />
      <main className="mx-auto flex max-w-lg flex-col gap-10 p-6 align-middle print:max-w-none">
        <NavButtons />
        <InvoiceContent />
        <div className="mx-auto max-w-xs text-center print:hidden">
          Voit laittaa laskurista palautetta osoitteeseen samuli@samcode.fi
        </div>
      </main>
    </div>
  );
}
