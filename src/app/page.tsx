import React from 'react';
import Image from 'next/image';
import { Header } from './Header';
import { Button } from '@/components/Button';
import infoImg from '~/images/info.svg';

export default function Home() {
  return (
    <div className="container mx-auto min-h-screen max-w-2xl bg-white">
      <Header />
      <main className="flex flex-col gap-10 p-8">
        <div>
          Laskurin avulla voit laskea oman kotitaloutesi vedenkulutuksen.
          Laskuri muodostaa myös laskun ja viivakoodin, jonka avulla voit maksaa
          laskun pankissa.
        </div>
        <div className="grid max-w-xs grid-cols-[minmax(min-content,1fr)_max-content_max-content] items-center gap-4">
          <div>Nykyinen lukema</div>
          <div>
            <input
              placeholder="0"
              className="h-10 w-20 rounded-md border border-solid border-[#274A61] bg-[#F5F5F5] p-2 text-right"
            />
          </div>
          <div>
            m<sup>3</sup>
          </div>
          <div>
            Edellinen lukema
            <Image
              // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
              src={infoImg}
              alt="Lisätietoa"
              className="ml-2 inline-block"
              priority
            />
          </div>
          <div className="px-2 text-right">3316</div>
          <div>
            m<sup>3</sup>
          </div>
        </div>
        <div>
          <Button>Laske kulutus ja muodosta lasku</Button>
        </div>
      </main>
    </div>
  );
}
