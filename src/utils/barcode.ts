export function calculateVirtualBarcode({
  account,
  price,
  reference,
  dueDate,
}: {
  account: string;
  price: number;
  reference: string;
  dueDate: Date;
}) {
  const barcodeVersion = '4' as const;

  // Remove all non-numbers from account number
  account = account.replace(/\D/g, '');
  if (account.length !== 16)
    throw new Error('Incorrect account number, must contain 16 digits');

  const [euros, cents] = price.toFixed(2).split('.');
  const eurosPadded = euros.padStart(6, '0');
  if (eurosPadded.length > 6)
    throw new Error('Price must be under million euros');

  const reserved = '000' as const;

  const paddedReference = reference.padStart(20, '0');
  if (paddedReference.length > 20)
    throw new Error('Refence maximum length is 20 digits');

  // dueDateString in yymmdd format
  const dueDateString = dueDate.toISOString().slice(2, 10).replace(/-/g, '');

  const barcode =
    barcodeVersion +
    account +
    eurosPadded +
    cents +
    reserved +
    paddedReference +
    dueDateString;

  return barcode;
}
