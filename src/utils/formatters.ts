export const max2digits = (value: number) =>
  value.toLocaleString('fi', {
    maximumFractionDigits: 2,
  });

export const always2digits = (value: number) =>
  value.toLocaleString('fi', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
