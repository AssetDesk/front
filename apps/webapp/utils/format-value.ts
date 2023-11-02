import BigNumber from 'bignumber.js';

export const formatValue = (value: BigNumber, exponent: number): BigNumber => {
  const exponentValue = exponent ? BigNumber(10).exponentiatedBy(exponent) : BigNumber(1);

  return value.div(exponentValue);
};

export const formatValueToBigNumber = (value: string, exponent: number): BigNumber => {
  if (!value) return BigNumber(0);
  const exponentValue = exponent ? BigNumber(10).exponentiatedBy(exponent) : BigNumber(1);
  return BigNumber(value).multipliedBy(exponentValue);
};
