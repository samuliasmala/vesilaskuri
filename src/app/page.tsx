import React from 'react';
import { Header } from './Header';
import { SubmitMeterReading } from './SubmitMeterReading';

export default function Home() {
  return (
    <div className="container mx-auto min-h-screen max-w-2xl bg-white">
      <Header />
      <main className="flex flex-col p-8">
        <div>
          Laskurin avulla voit laskea oman kotitaloutesi vedenkulutuksen.
          Laskuri muodostaa myös laskun ja viivakoodin, jonka avulla voit maksaa
          laskun pankissa.
        </div>
        <SubmitMeterReading />
      </main>
    </div>
  );
}
