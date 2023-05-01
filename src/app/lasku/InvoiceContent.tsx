'use client';
import { FC } from 'react';
import { useSearchParams } from 'next/navigation';
import { round } from 'lodash';
import { H2 } from '@/components/Typography';
import { M3 } from '@/components/M3';
import { WATER_EUR_PER_M3, YEARLY_FEE } from '@/constants';

export const InvoiceContent: FC = () => {
  const searchParams = useSearchParams();

  const prev = parseFloat(searchParams.get('edellinen') ?? '');
  const current = parseFloat(searchParams.get('uusi') ?? '');

  const usage = round(current - prev);
  const waterPrice = round(usage * WATER_EUR_PER_M3, 2);
  const totalPrice = round(waterPrice + YEARLY_FEE, 2);

  return (
    <>
      <Usage prev={prev} current={current} usage={usage} />
      <Pricing usage={usage} waterPrice={waterPrice} totalPrice={totalPrice} />
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
      <div className="grid max-w-sm grid-cols-[minmax(min-content,1fr)_max-content_max-content] items-center gap-1">
        <div>Nykyinen lukema</div>
        <div className="text-right">{current}</div>
        <M3 />

        <div>Edellinen lukema</div>
        <div className="text-right">{prev}</div>
        <M3 />

        <div className="col-span-3 border-t"></div>

        <div className="font-medium">Kulutus</div>
        <div className="text-right font-medium">{usage}</div>
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
      <div className="grid max-w-sm grid-cols-[minmax(min-content,1fr)_max-content_max-content] items-center gap-1">
        <div className="font-medium">Veden hinta</div>
        <div className="text-right font-medium">
          {waterPrice.toLocaleString('fi')}
        </div>
        <div className="font-medium">€</div>

        <div className="col-span-3 indent-5">
          Kulutus: {usage} <M3 />
        </div>
        <div className="col-span-3 indent-5">
          Veden yksikköhinta: {WATER_EUR_PER_M3.toLocaleString('fi')} €/
          <M3 />
        </div>

        <div className="font-medium">Perusmaksu</div>
        <div className="text-right font-medium">
          {YEARLY_FEE.toLocaleString('fi')}
        </div>
        <div className="font-medium">€</div>

        <div className="col-span-3 border-t"></div>

        <div className="font-bold">Yhteensä</div>
        <div className="text-right font-bold">
          {totalPrice.toLocaleString('fi')}
        </div>
        <div className="font-bold">€</div>
      </div>
    </div>
  );
};
