'use client';
import { FC } from 'react';
import { useSearchParams } from 'next/navigation';
import { H2 } from '~/components/Typography';
import { M3 } from '~/components/M3';
import { WATER_EUR_PER_M3, YEARLY_FEE } from '~/constants';
import { InvoiceDetails } from './InvoiceDetails';
import { always2digits, max2digits } from '~/utils/formatters';

export const InvoiceContent: FC = () => {
  const searchParams = useSearchParams();

  const prev = parseFloat(searchParams.get('edellinen') ?? '');
  const current = parseFloat(searchParams.get('uusi') ?? '');
  const reference = searchParams.get('viite') ?? '';

  const usage = current - prev;
  const waterPrice = usage * WATER_EUR_PER_M3;
  const totalPrice = waterPrice + YEARLY_FEE;

  return (
    <>
      <Usage prev={prev} current={current} usage={usage} />
      <Pricing usage={usage} waterPrice={waterPrice} totalPrice={totalPrice} />
      <InvoiceDetails totalPrice={totalPrice} reference={reference} />
    </>
  );
};

export const Usage: FC<{ prev: number; current: number; usage: number }> = ({
  prev,
  current,
  usage,
}) => {
  return (
    <div>
      <H2>Kulutus</H2>
      <div className="grid max-w-md grid-cols-[minmax(min-content,1fr)_max-content_max-content] items-center gap-1">
        <div>Nykyinen lukema</div>
        <div className="text-right">{max2digits(current)}</div>
        <M3 />

        <div>Edellinen lukema</div>
        <div className="text-right">{max2digits(prev)}</div>
        <M3 />

        <div className="col-span-3 border-t"></div>

        <div className="font-medium">Kulutus</div>
        <div className="text-right font-medium">{max2digits(usage)}</div>
        <M3 className="font-medium" />
      </div>
    </div>
  );
};

export const Pricing: FC<{
  usage: number;
  waterPrice: number;
  totalPrice: number;
}> = ({ usage, waterPrice, totalPrice }) => {
  return (
    <div>
      <H2>Vesimaksun loppusumma</H2>
      <div className="grid max-w-md grid-cols-[minmax(min-content,1fr)_max-content_max-content] items-center gap-1">
        <div className="font-medium">Veden hinta</div>
        <div className="text-right font-medium">
          {always2digits(waterPrice)}
        </div>
        <div className="font-medium">€</div>

        <div className="col-span-3 indent-5">
          Kulutus: {max2digits(usage)} <M3 />
        </div>
        <div className="col-span-3 indent-5">
          Veden yksikköhinta: {always2digits(WATER_EUR_PER_M3)} €/
          <M3 />
        </div>

        <div className="font-medium">Perusmaksu</div>
        <div className="text-right font-medium">
          {always2digits(YEARLY_FEE)}
        </div>
        <div className="font-medium">€</div>

        <div className="col-span-3 border-t"></div>

        <div className="font-bold">Yhteensä</div>
        <div className="text-right font-bold">{always2digits(totalPrice)}</div>
        <div className="font-bold">€</div>

        <div className="col-span-2 text-right">
          (sis. alv {always2digits(totalPrice * (0.24 / 1.24))}
        </div>
        <div>€)</div>
      </div>
    </div>
  );
};
