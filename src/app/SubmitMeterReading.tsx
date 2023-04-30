'use client';

import React, { FC, ReactNode, useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/Button';
import infoImg from '@/images/info.svg';

export const SubmitMeterReading: FC = () => {
  const [currentReading, setCurrentReading] = useState<string>('');

  const { error, readingAsNumber } = validateReading(currentReading);

  return (
    <>
      <div className="grid max-w-xs grid-cols-[minmax(min-content,1fr)_max-content_max-content] grid-rows-3 items-center gap-4">
        <ErrorText>{error}</ErrorText>
        <div>Nykyinen lukema</div>
        <div>
          <input
            className="h-10 w-20 rounded-md border border-solid border-[#274A61] bg-[#F5F5F5] p-2 text-right"
            placeholder="0"
            value={currentReading}
            onChange={(event) => setCurrentReading(event.target.value)}
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
      <div className="mt-8">
        <Button disabled={error != null || readingAsNumber == null}>
          Laske kulutus ja muodosta lasku
        </Button>
      </div>
    </>
  );
};

const ErrorText: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div className="col-span-3 self-end text-right text-red-500">
      {children}
    </div>
  );
};

function validateReading(reading: string): {
  error: string | null;
  readingAsNumber: number | null;
} {
  const sanitizedReading = reading.trim().replaceAll(',', '.');
  if (sanitizedReading === '') return { error: null, readingAsNumber: null };

  const isReadingValidNumber = /^\d+[.]?\d*$/.test(sanitizedReading);
  if (!isReadingValidNumber)
    return { error: 'Lukema ei ole kelvollinen numero', readingAsNumber: null };

  const readingAsNumber = parseFloat(sanitizedReading);

  if (!Number.isInteger(readingAsNumber))
    return { error: 'Voit käyttää vain kokonaisia lukuja', readingAsNumber };

  return { error: null, readingAsNumber };
}
