import BigNumber from 'bignumber.js';
import { describe, expect, test } from 'vitest';
import { formatValue } from './format-value';

describe('formatValue()', () => {
  test('zero value should return 0', () => {
    const zeroValue = BigNumber(0);
    expect(formatValue(zeroValue, 1).toNumber()).toBe(0);
  });

  test('value with zero exponent return same value', () => {
    const value = BigNumber(1_000);
    expect(formatValue(value, 0)).toStrictEqual(value);
  });

  test('value and exponent return value', () => {
    const value = BigNumber(1_000);
    expect(formatValue(value, 2)).toStrictEqual(BigNumber(10));
  });

  test('big value and exponent return value', () => {
    const bigValue = BigNumber(100_000_000_000_000);
    expect(formatValue(bigValue, 3)).toStrictEqual(BigNumber(100_000_000_000));
  });

  test('float value and exponent return value', () => {
    const floatValue = BigNumber(100.234);
    expect(formatValue(floatValue, 1)).toStrictEqual(BigNumber(10.0234));
  });
});
