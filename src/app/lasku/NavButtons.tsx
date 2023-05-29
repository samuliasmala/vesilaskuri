'use client';
import React, { FC } from 'react';
import { useSearchParams } from 'next/navigation';
import { Button } from '~/components/Button';
import { getUrl } from '~/utils/getUrl';

export const NavButtons: FC = () => {
  const searchParams = useSearchParams();

  const backUrl = getUrl('/', {
    edellinen: searchParams.get('edellinen') ?? '',
    uusi: searchParams.get('uusi') ?? '',
    viite: searchParams.get('viite') ?? '',
  });

  return (
    <div className="flex justify-between print:hidden">
      <Button className="px-4 py-2" href={backUrl}>
        Takaisin
      </Button>
      <Button
        className="px-4 py-2"
        onClick={() => {
          window.print();
        }}
      >
        Tulosta tai tallenna
      </Button>
    </div>
  );
};
