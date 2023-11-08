import BigNumber from 'bignumber.js';

export function calculatePercentage(value: BigNumber, total: BigNumber): BigNumber {
  if (total.isZero()) return BigNumber(0);
  return value.div(total).multipliedBy(BigNumber(100));
}
