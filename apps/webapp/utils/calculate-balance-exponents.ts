export const calculateBalanceExponents = (balance: bigint, exponent: number): bigint => {
  return balance / (exponent ? 10n ** BigInt(exponent) : 1n);
};
