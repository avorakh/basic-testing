// Uncomment the code below and write your tests
import { generateLinkedList } from './index';

describe('generateLinkedList', () => {
  // Check match by expect(...).toStrictEqual(...)
  test('should generate linked list from values 1', () => {
    const firstNodeValue = 3;
    const secondNodeValue = 2;

    const expected = {
      next: {
        next: {
          next: null,
          value: null,
        },
        value: secondNodeValue,
      },
      value: firstNodeValue,
    };

    const actual = generateLinkedList([firstNodeValue, secondNodeValue]);

    expect(actual).toStrictEqual(expected);
  });

  // Check match by comparison with snapshot
  test('should generate linked list from values 2', () => {
    const actual = generateLinkedList([1, 2]);

    expect(actual).toMatchInlineSnapshot(`
      {
        "next": {
          "next": {
            "next": null,
            "value": null,
          },
          "value": 2,
        },
        "value": 1,
      }
    `);
  });
});
