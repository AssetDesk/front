import BigNumber from 'bignumber.js';

export const calculateBalanceExponents = (balance: bigint, exponent: number): BigNumber => {
  const exponentValue = exponent ? BigNumber(10).exponentiatedBy(exponent) : BigNumber(1);

  return BigNumber(balance.toString()).div(exponentValue);
};
