import { describe, expect, it } from 'vitest';
import { formattedNumber } from './format-number';

describe('formattedNumber', () => {
  it('returns the correctly formatted number with a variable number of decimal places', () => {
    const num = 1234.5678;
    expect(formattedNumber(num)).toBe('1.2K');
  });

  it('returns 100', () => {
    const num = 100;
    expect(formattedNumber(num)).toBe('100');
  });
  it('returns 12k', () => {
    const num = 12000;
    expect(formattedNumber(num)).toBe('12K');
  });
  it('returns 2M', () => {
    const num = 2000000;
    expect(formattedNumber(num)).toBe('2M');
  });
  it('returns 2.3M', () => {
    const num = 2300000;
    expect(formattedNumber(num)).toBe('2.3M');
  });
  it('returns 6B', () => {
    const num = 6000000000;
    expect(formattedNumber(num)).toBe('6B');
  });
  it('returns 12T', () => {
    const num = 12434534534534;
    expect(formattedNumber(num)).toBe('12T');
  });

  it('returns negative 12T', () => {
    const num = -12434534534534;
    expect(formattedNumber(num)).toBe('-12T');
  });

  it('returns "0" for a zero input number', () => {
    const num = 0;
    expect(formattedNumber(num)).toBe('0');
  });
});
