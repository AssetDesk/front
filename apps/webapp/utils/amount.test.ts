import BigNumber from 'bignumber.js';
import { describe, expect, it, test } from 'vitest';
import {
  calculateToUsd,
  displayAmount,
  displayUsd,
  fromBaseUnitAmount,
  toBaseUnitAmount,
} from './amount';

describe('Formatting', () => {
  describe('displayAmount()', () => {
    it('no decimals', () => {
      expect(displayAmount(2000)).toBe('2,000');
    });

    it('one decimal place', () => {
      expect(displayAmount(2001.1)).toBe('2,001.1');
    });

    it('many decimals, if above 1, rounds to three places', () => {
      expect(displayAmount(2001.124125)).toBe('2,001.124');
    });

    it('many decimals, if less than 1, shows all places', () => {
      expect(displayAmount(0.000012)).toBe('0.000012');
    });

    it('negative numbers work too', () => {
      expect(displayAmount(-2001.124125)).toBe('0');
    });
  });

  describe('displayUsd()', () => {
    it('should format numbers with no decimals', () => {
      expect(displayUsd(2000)).toBe('2,000.00');
    });

    it('should format numbers with one decimal place', () => {
      expect(displayUsd(2001.1)).toBe('2,001.10');
    });

    it('should format numbers with two decimal places', () => {
      expect(displayUsd(2001.12)).toBe('2,001.12');
    });

    it('should round numbers with more than two decimal places', () => {
      expect(displayUsd(2001.124)).toBe('2,001.12');
      expect(displayUsd(2001.125)).toBe('2,001.13'); // testing rounding
    });

    it('should format numbers less than one', () => {
      expect(displayUsd(0.1)).toBe('0.10');
      expect(displayUsd(0.01)).toBe('0.01');
      expect(displayUsd(0.001)).toBe('0.00'); // testing rounding
    });

    it('should format negative numbers', () => {
      expect(displayUsd(-2001)).toBe('-2,001.00');
      expect(displayUsd(-2001.1)).toBe('-2,001.10');
      expect(displayUsd(-2001.12)).toBe('-2,001.12');
      expect(displayUsd(-2001.125)).toBe('-2,001.13'); // testing rounding
    });
  });
});

describe('format', () => {
  describe('formatValue()', () => {
    test('zero value should return 0', () => {
      const zeroValue = BigNumber(0);
      expect(fromBaseUnitAmount(zeroValue, 1).toNumber()).toBe(0);
    });

    test('value with zero exponent return same value', () => {
      const value = BigNumber(1_000);
      expect(fromBaseUnitAmount(value, 0)).toStrictEqual(value);
    });

    test('value and exponent return value', () => {
      const value = BigNumber(1_000);
      expect(fromBaseUnitAmount(value, 2)).toStrictEqual(BigNumber(10));
    });

    test('big value and exponent return value', () => {
      const bigValue = BigNumber(100_000_000_000_000);
      expect(fromBaseUnitAmount(bigValue, 3)).toStrictEqual(BigNumber(100_000_000_000));
    });

    test('float value and exponent return value', () => {
      const floatValue = BigNumber(100.234);
      expect(fromBaseUnitAmount(floatValue, 1)).toStrictEqual(BigNumber(10.0234));
    });
  });

  describe('formatValueToBigNumber()', () => {
    test('zero value should return 0', () => {
      const zeroValue = '';
      expect(toBaseUnitAmount(zeroValue, 1).toNumber()).toBe(0);
    });

    test('value with zero exponent return same value', () => {
      const value = '1000';
      expect(toBaseUnitAmount(value, 0)).toStrictEqual(BigNumber(value));
    });

    test('value and exponent return value', () => {
      const value = '1000';
      expect(toBaseUnitAmount(value, 2)).toStrictEqual(BigNumber(100000));
    });

    test('big value and exponent return value', () => {
      const bigValue = '100000000000000';
      expect(toBaseUnitAmount(bigValue, 3)).toStrictEqual(BigNumber('100000000000000000'));
    });

    test('float value and exponent return value', () => {
      const floatValue = '100.234';
      expect(toBaseUnitAmount(floatValue, 1)).toStrictEqual(BigNumber(1002.34));
    });
  });
});

describe('calculateToUSD', () => {
  it('should calculate to USDC correctly', () => {
    const totalReserves = new BigNumber(1100001214142797);
    const exponent = 18;
    const price = new BigNumber(191741000000);
    const expected = new BigNumber(2.1091533280095405);

    expect(calculateToUsd(totalReserves, exponent, price).toNumber()).toBe(expected.toNumber());
  });
});
