import { describe, expect, test } from 'vitest';
import { validateAmount, validateDigitsAfterComma } from './validation';

describe('Validation tests', () => {
  describe('validateAmount()', () => {
    test('if the amount is greater than the balance, the result is true', () => {
      const amount = '20';
      const balance = 10;
      expect(validateAmount(amount, balance)).toBeTruthy();
    });

    test('if the balance is greater than the amount, the result is false', () => {
      const amount = '10';
      const balance = 20;
      expect(validateAmount(amount, balance)).toBeFalsy();
    });

    test('if the balance and amount are equal, the result is false', () => {
      const amount = '20';
      const balance = 20;
      expect(validateAmount(amount, balance)).toBeFalsy();
    });
  });

  describe('validateDigitsAfterComma()', () => {
    test('value as "" return false', () => {
      expect(validateDigitsAfterComma('', 10)).toBeFalsy();
    });

    test('value with bigger amount than allowed return true', () => {
      expect(validateDigitsAfterComma('123.123122', 5)).toBeTruthy();
    });

    test('value with less amount than allowed return false', () => {
      expect(validateDigitsAfterComma('123.1231', 5)).toBeFalsy();
    });

    test('value with equal amount than allowed return false', () => {
      expect(validateDigitsAfterComma('123.12312', 5)).toBeFalsy();
    });
  });
});
