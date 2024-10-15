// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    expect(simpleCalculator({ a: 2, b: 2, action: Action.Add })).toBe(4);
    expect(simpleCalculator({ a: 1, b: 0, action: Action.Add })).toBe(1);
    expect(simpleCalculator({ a: -3, b: 2, action: Action.Add })).toBe(-1);
  });

  test('should subtract two numbers', () => {
    expect(simpleCalculator({ a: 4, b: 2, action: Action.Subtract })).toBe(2);
    expect(simpleCalculator({ a: 74, b: 5, action: Action.Subtract })).toBe(69);
    expect(simpleCalculator({ a: -2, b: -2, action: Action.Subtract })).toBe(0);
  });

  test('should multiply two numbers', () => {
    expect(simpleCalculator({ a: 3, b: 3, action: Action.Multiply })).toBe(9);
    expect(simpleCalculator({ a: 1, b: 2, action: Action.Multiply })).toBe(2);
    expect(simpleCalculator({ a: -2, b: 3, action: Action.Multiply })).toBe(-6);
  });

  test('should divide two numbers', () => {
    expect(simpleCalculator({ a: 2, b: 2, action: Action.Divide })).toBe(1);
    expect(simpleCalculator({ a: -6, b: -3, action: Action.Divide })).toBe(2);
    expect(simpleCalculator({ a: 1, b: 2, action: Action.Divide })).toBe(0.5);
  });

  test('should exponentiate two numbers', () => {
    const expnt: Action = Action.Exponentiate;
    expect(simpleCalculator({ a: 2, b: 5, action: expnt })).toBe(32);
    expect(simpleCalculator({ a: 3, b: 5, action: expnt })).toBe(243);
  });

  test('should return null for invalid action', () => {
    expect(simpleCalculator({ a: 1, b: 2, action: undefined })).toBeNull();
    expect(simpleCalculator({ a: 3, b: 4, action: null })).toBeNull();
    expect(simpleCalculator({ a: 5, b: 6, action: 'Multiply' })).toBeNull();
  });

  test('should return null for invalid arguments', () => {
    expect(
      simpleCalculator({ a: null, b: 2, action: Action.Subtract }),
    ).toBeNull();
    expect(
      simpleCalculator({ a: 1, b: undefined, action: Action.Add }),
    ).toBeNull();
    expect(
      simpleCalculator({ a: '2', b: undefined, action: Action.Multiply }),
    ).toBeNull();
  });
});
