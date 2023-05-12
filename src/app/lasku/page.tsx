import React from 'react';

import { Header } from '~/app/Header';
import { NavButtons } from './NavButtons';
import { InvoiceContent } from './InvoiceContent';

export default function Invoice() {
  return (
    <div className="container mx-auto min-h-screen max-w-2xl bg-white">
      <Header />
      <main className="flex flex-col gap-10 p-8">
        <NavButtons />
        <InvoiceContent />
        <div className="print:hidden">
          Voit laittaa laskurista palautetta osoitteeseen samuli@samcode.fi
        </div>
      </main>
    </div>
  );
}
