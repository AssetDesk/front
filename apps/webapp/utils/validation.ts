export const validateAmount = (amount: string, balance: number): boolean =>
  Boolean(amount) && Number(amount) > balance;

export const validateDigitsAfterComma = (value: string, maxDigitsAfterComma: number): boolean => {
  const digitsAfterComma = value.match(/\.(\d+)/)?.[1];
  if (!digitsAfterComma) return false;

  return digitsAfterComma.length > maxDigitsAfterComma;
};
