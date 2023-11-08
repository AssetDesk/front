import { describe, expect, it } from 'vitest';
import { formattedNumber } from './formatNumber';

describe('formattedNumber', () => {
  it('returns the correctly formatted number with a variable number of decimal places', () => {
    const num = 1234.5678;
    const digits = 2;
    expect(formattedNumber(num, digits)).toBe('1.23k');
  });

  it('returns a correctly formatted number without a variable number of decimal places', () => {
    const num = 1234;
    expect(formattedNumber(num)).toBe('1.234k');
  });

  it('returns "0" for a zero input number', () => {
    const num = 0;
    expect(formattedNumber(num)).toBe('0');
  });
});
