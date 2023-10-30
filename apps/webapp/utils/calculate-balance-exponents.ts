import BigNumber from 'bignumber.js';

export const calculateBalanceExponents = (balance: BigNumber, exponent: number): BigNumber => {
  const exponentValue = exponent ? BigNumber(10).exponentiatedBy(exponent) : BigNumber(1);
  return balance.div(exponentValue);
};
