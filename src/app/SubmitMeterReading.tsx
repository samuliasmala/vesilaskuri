'use client';
import React, { FC, ReactNode, useState } from 'react';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';

import { Button } from '~/components/Button';
import infoImg from '~/images/info.svg';
import { getUrl } from '~/utils/getUrl';
import { M3 } from '~/components/M3';
import { max2digits } from '~/utils/formatters';

export const SubmitMeterReading: FC = () => {
  const searchParams = useSearchParams();
  const [currentReading, setCurrentReading] = useState<string>(
    searchParams.get('uusi') || ''
  );
  const [showInfoModal, setShowInfoModal] = useState(false);

  const previousReading = searchParams.get('edellinen') || '0';
  const previousReadingAsNumber = Number(previousReading.replaceAll(',', '.'));
  const { error, readingAsNumber } = validateReading(currentReading);

  // Create invoice url with query parameters holding input data
  const invoiceUrl = getUrl('/lasku', {
    edellinen: previousReadingAsNumber.toString(),
    uusi: readingAsNumber?.toString() ?? '0',
    viite: searchParams.get('viite') ?? '',
  });

  return (
    <>
      <div className="grid max-w-xs grid-cols-[minmax(min-content,1fr)_max-content_max-content] grid-rows-3 items-center gap-4">
        <ErrorText>{error}</ErrorText>
        <label htmlFor="currentReading">Nykyinen lukema</label>
        <input
          id="currentReading"
          className="default-border h-10 w-20 bg-neutral-100 p-2 text-right"
          placeholder="0"
          inputMode="numeric"
          value={currentReading}
          onChange={(event) => setCurrentReading(event.target.value)}
          onKeyDown={(ev) => ev.key === 'Enter' && ev.currentTarget.blur()}
        />
        <M3 />
        <div>
          Edellinen lukema
          <button
            className="p-2"
            onClick={() => setShowInfoModal((showInfoModal) => !showInfoModal)}
          >
            <Image
              // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
              src={infoImg}
              alt="Lisätietoa"
              className="inline-block"
              priority
            />
          </button>
        </div>
        <div className="px-2 text-right">
          {max2digits(previousReadingAsNumber)}
        </div>
        <M3 />
      </div>
      <div className="mt-8">
        {showInfoModal ? (
          <InfoModal closeModal={() => setShowInfoModal(false)} />
        ) : (
          <Button
            className="p-5"
            disabled={error != null || readingAsNumber == null}
            href={invoiceUrl}
          >
            Laske kulutus ja muodosta lasku
          </Button>
        )}
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

const InfoModal: FC<{ closeModal: () => void }> = ({ closeModal }) => {
  return (
    <div className="default-border ali flex flex-col gap-8 bg-neutral-100 px-11 py-5">
      <div>
        Lukema on edellisenä vuonna vesiosuuskunnalle ilmoittamasi vesimittarin
        lukema.
      </div>
      <div className="text-center">
        <Button onClick={closeModal}>Sulje</Button>
      </div>
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
