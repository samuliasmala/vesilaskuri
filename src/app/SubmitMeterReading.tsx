'use client';
import React, { FC, ReactNode, MouseEvent, useState } from 'react';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';

import { Button } from '~/components/Button';
import infoImg from '~/images/info.svg';
import { getUrl } from '~/utils/getUrl';
import { M3 } from '~/components/M3';
import { max2digits } from '~/utils/formatters';

type ValidationError =
  | 'NegativeUsage'
  | 'MissingReading'
  | 'NonNumberReading'
  | 'NonIntegerReading';

const ValidationErrorMessage: Record<ValidationError, string> = {
  NegativeUsage: 'Nykyisen lukeman oltava edellistä suurempi',
  MissingReading: 'Nykyinen lukema on pakollinen',
  NonNumberReading: 'Lukema ei ole kelvollinen numero',
  NonIntegerReading: 'Voit käyttää vain kokonaisia lukuja',
} as const;

export const SubmitMeterReading: FC = () => {
  const searchParams = useSearchParams();
  const [currentReading, setCurrentReading] = useState<string>(
    searchParams.get('uusi') || ''
  );
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [validationError, setValidationError] =
    useState<ValidationError | null>(null);

  const previousReading = searchParams.get('edellinen') || '0';
  const previousReadingAsNumber = Number(previousReading.replaceAll(',', '.'));
  const { error: readingToIntegerError, readingAsInt } =
    readingToInteger(currentReading);

  const errorType = readingToIntegerError || validationError;
  const errorMessage = errorType && ValidationErrorMessage[errorType];

  // Create invoice url with query parameters holding input data
  const invoiceUrl = getUrl('/lasku', {
    edellinen: previousReadingAsNumber.toString(),
    uusi: readingAsInt?.toString() ?? '0',
    viite: searchParams.get('viite') ?? '',
  });

  const updateReading = (newReading: string) => {
    setCurrentReading(newReading);
    const { readingAsInt } = readingToInteger(newReading);
    if (validationError == 'MissingReading') setValidationError(null);
    if (validationError == 'NegativeUsage') validateReadingOnBlur(readingAsInt);
  };

  const validateReadingOnBlur = (
    readingAsInt: number | null
  ): ValidationError | null => {
    const error =
      readingAsInt != null && readingAsInt - previousReadingAsNumber <= 0
        ? 'NegativeUsage'
        : null;
    setValidationError(error);
    return error;
  };

  const validateReadingOnSubmit = (
    ev: MouseEvent,
    readingAsInt: number | null
  ) => {
    if (validateReadingOnBlur(readingAsInt) != null) {
      ev.preventDefault();
      return;
    }

    if (readingAsInt == null) {
      setValidationError('MissingReading');
      ev.preventDefault();
      return;
    }
    setValidationError(null);
  };

  return (
    <div className="w-full max-w-xs">
      <div className="grid max-w-xs grid-cols-[minmax(min-content,1fr)_max-content_max-content] grid-rows-3 items-center gap-x-1 gap-y-4">
        <ErrorText>{errorMessage}</ErrorText>
        <label htmlFor="currentReading">Nykyinen lukema</label>
        <input
          id="currentReading"
          className="default-border h-10 w-20 bg-neutral-100 p-2 text-right"
          placeholder="0"
          inputMode="numeric"
          value={currentReading}
          onChange={(event) => updateReading(event.target.value)}
          onKeyDown={(ev) => ev.key === 'Enter' && ev.currentTarget.blur()}
          onBlur={() => validateReadingOnBlur(readingAsInt)}
        />
        <M3 />
        <div>
          Edellinen lukema
          <button
            className="p-1"
            onClick={() => setShowInfoModal((showInfoModal) => !showInfoModal)}
          >
            <Image
              // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
              src={infoImg}
              alt="Lisätietoa"
              className="relative bottom-[1px] inline-block"
              priority
            />
          </button>
        </div>
        <div className="px-2 text-right">
          {max2digits(previousReadingAsNumber)}
        </div>
        <M3 />
      </div>
      <div className="mt-8 w-full">
        {showInfoModal ? (
          <InfoModal closeModal={() => setShowInfoModal(false)} />
        ) : (
          <Button
            className="w-full p-5"
            disabled={errorType != null}
            href={invoiceUrl}
            onClick={(ev) => validateReadingOnSubmit(ev, readingAsInt)}
          >
            Laske kulutus ja muodosta lasku
          </Button>
        )}
      </div>
    </div>
  );
};

const ErrorText: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div className="col-span-3 max-w-xs self-end whitespace-nowrap text-right text-red-500 max-[390px]:-ml-6">
      {children}
    </div>
  );
};

const InfoModal: FC<{ closeModal: () => void }> = ({ closeModal }) => {
  return (
    <div className="default-border flex flex-col gap-8 bg-neutral-100 px-8 py-6">
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

function readingToInteger(reading: string): {
  error: ValidationError | null;
  readingAsInt: number | null;
} {
  const sanitizedReading = reading.trim().replaceAll(',', '.');
  if (sanitizedReading === '') return { error: null, readingAsInt: null };

  const isReadingValidNumber = /^\d+[.]?\d*$/.test(sanitizedReading);
  if (!isReadingValidNumber)
    return { error: 'NonNumberReading', readingAsInt: null };

  const readingAsInt = parseFloat(sanitizedReading);

  if (!Number.isInteger(readingAsInt))
    return { error: 'NonIntegerReading', readingAsInt };

  return { error: null, readingAsInt };
}
