import BigNumber from 'bignumber.js';

export const formatValueToExponents = (value: BigNumber, exponent: number): BigNumber => {
  const exponentValue = exponent ? BigNumber(10).exponentiatedBy(exponent) : BigNumber(1);
  return value.div(exponentValue);
};
