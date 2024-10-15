import { mockOne, mockTwo, mockThree, unmockedFunction } from './index';

const stubFunction = () => {
  // nothing
};

jest.mock('./index', () => {
  const originalModule =
    jest.requireActual<typeof import('./index')>('./index');
  return {
    ...originalModule,
    mockOne: stubFunction,
    mockTwo: stubFunction,
    mockThree: stubFunction,
  };
});

describe('partial mocking', () => {
  afterAll(() => {
    jest.unmock('./index');
  });

  test('mockOne, mockTwo, mockThree should not log into console', () => {
    const logSpy = jest.spyOn(console, 'log');

    mockOne();
    mockTwo();
    mockThree();

    expect(logSpy).not.toHaveBeenCalled();
  });

  test('unmockedFunction should log into console', () => {
    const logSpy = jest.spyOn(console, 'log');

    const expected = 'I am not mocked';

    unmockedFunction();

    expect(logSpy).toHaveBeenCalledWith(expected);
  });
});
