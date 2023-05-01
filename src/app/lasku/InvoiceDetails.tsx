'use client';

import React, { FC, useState } from 'react';
import { Button } from '@/components/Button';
import { Modal } from '@/components/Modal';
import { H2 } from '@/components/Typography';
import { ACCOUNT_NUMBER, DUE_DATE, INVOICE_RECEIVER } from '@/constants';

export const InvoiceDetails: FC<{ totalPrice: number; reference: string }> = ({
  totalPrice,
  reference,
}) => {
  const [showBarcodeModal, setShowBarcodeModal] = useState(false);
  return (
    <div>
      {showBarcodeModal && (
        <BarcodeModal closeModal={() => setShowBarcodeModal(false)} />
      )}
      <H2>Laskun tiedot</H2>
      <div className="grid max-w-md grid-cols-[minmax(min-content,max-content)_1fr] items-start gap-x-8 gap-y-1">
        <div>Saaja</div>
        <div>{INVOICE_RECEIVER}</div>
        <div>Tilinumero</div>
        <div>{ACCOUNT_NUMBER}</div>
        <div>Summa</div>
        <div>{totalPrice.toLocaleString('fi')} €</div>
        <div>Eräpäivä</div>
        <div>{DUE_DATE.toLocaleDateString('fi')}</div>
        <div>Viite</div>
        <div>{reference}</div>
        <div>Virtuaali­viivakoodi</div>
        <div>{}</div>
      </div>
      <div className="mt-10">
        <Button
          className="w-full max-w-xs p-5"
          onClick={() => setShowBarcodeModal(true)}
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
      <div className="default-border flex flex-col gap-8 bg-neutral-100 p-8">
        <div className="text-center">Viivakoodi kopioitu leikepöydälle.</div>
        <div className="text-center">
          <Button onClick={closeModal}>Sulje</Button>
        </div>
      </div>
    </Modal>
  );
};
