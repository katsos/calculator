import { calculateOperation } from './calculate';
import calculateExpression from './calculate';

describe('calculate', () => {
  describe('calculateExpression', () => {
    it('should return the result if there is only one factor', () => {
      const result = calculateExpression(['5']);
      expect(result).toBe(5);
    });

    it('should return null if there is a trailing operator', () => {
      const result = calculateExpression(['5', '-']);
      expect(result).toBeNull();
    });

    it('should return the result', () => {
      const result = calculateExpression(['5', '-', '5']);
      expect(result).toBe(0);
    });
  });

  describe('calculateOperation', () => {
    it('addition', () => {
      const result = calculateOperation('1', '+', '4');
      expect(result).toBe(5);
    });

    it('subtraction', () => {
      const result = calculateOperation('2', '-', '2');
      expect(result).toBe(0);
    });

    it('multiplication', () => {
      const result = calculateOperation('3', '*', '2');
      expect(result).toBe(6);
    });

    it('division', () => {
      const result = calculateOperation('4', '÷', '1');
      expect(result).toBe(4);
    });
  });
});