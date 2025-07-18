'use client';

import React, { FC, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import Barcode from 'react-barcode';
import { Button } from '~/components/Button';
import { Modal } from '~/components/Modal';
import { H2 } from '~/components/Typography';
import { ACCOUNT_NUMBER, DUE_DATE, INVOICE_RECEIVER } from '~/constants';
import { calculateVirtualBarcode } from '~/utils/barcode';
import { always2digits } from '~/utils/formatters';

export const InvoiceDetails: FC<{ totalPrice: number; reference: string }> = ({
  totalPrice,
  reference,
}) => {
  const [showBarcodeModal, setShowBarcodeModal] = useState(false);

  let barcode: string | undefined;
  try {
    barcode = calculateVirtualBarcode({
      account: ACCOUNT_NUMBER,
      price: totalPrice,
      reference,
      dueDate: DUE_DATE,
    });
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(e);
  }

  return (
    <div>
      {showBarcodeModal && (
        <BarcodeModal closeModal={() => setShowBarcodeModal(false)} />
      )}
      <H2>Laskun tiedot</H2>
      <div
        className={twMerge(
          'grid items-start gap-x-8 gap-y-1',
          'grid-cols-[min-content_1fr]',
          'sm:grid-cols-[minmax(min-content,max-content)_1fr]',
          'print:grid-cols-[minmax(min-content,max-content)_1fr]'
        )}
      >
        <div>Saaja:</div>
        <div>{INVOICE_RECEIVER}</div>
        <div>Tilinumero:</div>
        <div>{ACCOUNT_NUMBER}</div>
        <div>Summa:</div>
        <div>{always2digits(totalPrice)} €</div>
        <div>Eräpäivä:</div>
        <div>{DUE_DATE.toLocaleDateString('fi')}</div>
        <div>Viite:</div>
        <div>{reference}</div>
        <div>Virtuaali­viivakoodi:</div>
        <div className="break-all">
          {barcode ?? 'Viivakoodia ei voitu laskea'}
        </div>
        <div className="col-span-2">
          {
            /* Reference is mandatory for the barcode even though it's optional
               for virtual barcode */
            barcode !== undefined && reference !== '' && (
              <div className="mt-2 flex justify-center">
                <Barcode
                  format="CODE128C"
                  value={barcode}
                  width={1.5}
                  height={50}
                  fontSize={12}
                  margin={5}
                  displayValue={false}
                />
              </div>
            )
          }
        </div>
      </div>
      <div className="mt-10 flex justify-center print:hidden">
        <Button
          className="w-full max-w-xs p-5"
          disabled={barcode === undefined}
          onClick={() => {
            void navigator?.clipboard?.writeText(barcode ?? '');
            setShowBarcodeModal(true);
          }}
        >
          Kopioi viivakoodi
        </Button>
      </div>
    </div>
  );
};

const BarcodeModal: FC<{ closeModal: () => void }> = ({ closeModal }) => {
  return (
    <Modal closeModal={closeModal}>
      <div className="default-border flex flex-col gap-8 bg-white p-8">
        <div className="text-center">Viivakoodi kopioitu leikepöydälle.</div>
        <div className="text-center">
          <Button onClick={closeModal}>Sulje</Button>
        </div>
      </div>
    </Modal>
  );
};
