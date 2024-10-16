import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 1, b: 2, action: Action.Add, expected: 3 },
  { a: 2, b: 2, action: Action.Add, expected: 4 },
  { a: 3, b: 2, action: Action.Add, expected: 5 },
  { a: 2, b: 2, action: Action.Add, expected: 4 },
  { a: 1, b: 0, action: Action.Add, expected: 1 },
  { a: -3, b: 2, action: Action.Add, expected: -1 },
  { a: 4, b: 2, action: Action.Subtract, expected: 2 },
  { a: 74, b: 5, action: Action.Subtract, expected: 69 },
  { a: -2, b: -2, action: Action.Subtract, expected: 0 },
  { a: 3, b: 3, action: Action.Multiply, expected: 9 },
  { a: 1, b: 2, action: Action.Multiply, expected: 2 },
  { a: -2, b: 3, action: Action.Multiply, expected: -6 },
  { a: 2, b: 2, action: Action.Divide, expected: 1 },
  { a: -6, b: -3, action: Action.Divide, expected: 2 },
  { a: 1, b: 2, action: Action.Divide, expected: 0.5 },
  { a: 2, b: 5, action: Action.Exponentiate, expected: 32 },
  { a: 3, b: 5, action: Action.Exponentiate, expected: 243 },
  { a: 1, b: 2, action: undefined, expected: null },
  { a: 3, b: 4, action: null, expected: null },
  { a: 5, b: 6, action: 'Multiply', expected: null },
  { a: null, b: 2, action: Action.Subtract, expected: null },
  { a: 1, b: undefined, action: Action.Add, expected: null },
  { a: '2', b: undefined, action: Action.Multiply, expected: null },
];

describe('simpleCalculator', () => {
  test.each(testCases)(
    'Operation: $action, a:$a, b:$b',
    ({ a, b, action, expected }) => {
      expect(simpleCalculator({ a, b, action })).toBe(expected);
    },
  );
});
