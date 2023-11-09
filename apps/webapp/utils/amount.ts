import BigNumber from 'bignumber.js';
import { USDC_EXPONENT } from './constants';

export const fromBaseUnitAmount = (value: BigNumber, exponent: number): BigNumber => {
  const exponentValue = exponent ? BigNumber(10).exponentiatedBy(exponent) : BigNumber(1);

  return value.div(exponentValue);
};

export const toBaseUnitAmount = (value: string, exponent: number): BigNumber => {
  if (!value) return BigNumber(0);
  const exponentValue = exponent ? BigNumber(10).exponentiatedBy(exponent) : BigNumber(1);
  return BigNumber(value).multipliedBy(exponentValue);
};

// This function takes a number and formats it in a display-friendly way (en-US locale)
// Examples:
//    2000        -> 2,000
//    2001.1      -> 2,000.1
//    2001.124125 -> 2,001.124
//    0.000012    -> 0.000012
export const displayAmount = (num: number): string => {
  const split = num.toString().split('.');
  const integer = parseInt(split[0]!);
  let decimal = split[1];

  const formattedInt = new Intl.NumberFormat('en-US').format(integer);

  if (!decimal) return formattedInt;

  if (Math.abs(num) >= 1) {
    decimal = decimal.slice(0, 3);
  } else {
    const nonZeroFirstIndex = decimal.split('').findIndex(val => val !== '0');
    decimal = decimal.slice(0, nonZeroFirstIndex + 2);
  }

  return `${formattedInt}.${decimal}`;
};

// Takes a number and represents it as a formatted $usd value
//    2000        -> 2,000
//    2001.1      -> 2,000.10
//    2001.124125 -> 2,001.12
//    0.000012    -> 0.00
export const displayUsd = (number: number): string => {
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(number);
};

export const calculateToUsd = (totalReserves: BigNumber, exponent: number, price: BigNumber) => {
  const formattedTotalReserves = fromBaseUnitAmount(totalReserves, exponent);
  const formattedPrice = fromBaseUnitAmount(price, USDC_EXPONENT);
  return formattedTotalReserves.multipliedBy(formattedPrice);
};
