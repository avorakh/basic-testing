import { getBankAccount, InsufficientFundsError, TransferFailedError } from '.';
import { random } from 'lodash';

jest.mock('lodash', () => ({
  random: jest.fn(),
}));

describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    const balance = 90;
    const expected = balance;

    const sut = getBankAccount(balance);

    expect(sut.getBalance()).toBe(expected);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const balance = 100;
    const invalidAmount = balance + 10;

    const sut = getBankAccount(balance);

    expect(() => sut.withdraw(invalidAmount)).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring more than balance', () => {
    const balance = 100;
    const invalidAmount = balance + 10;

    const anotherAccount = getBankAccount(10);
    const sut = getBankAccount(balance);

    expect(() => sut.transfer(invalidAmount, anotherAccount)).toThrow(
      InsufficientFundsError,
    );
  });

  test('should throw error when transferring to the same account', () => {
    const balance = 100;

    const sut = getBankAccount(balance);
    const sameAccount = sut;

    expect(() => sut.transfer(balance, sameAccount)).toThrow(
      TransferFailedError,
    );
  });

  test('should deposit money', () => {
    const balance = 90;
    const amount = 10;

    const expected = balance + amount;

    const sut = getBankAccount(balance);

    sut.deposit(amount);

    const actual = sut.getBalance();
    expect(actual).toBe(expected);
  });

  test('should withdraw money', () => {
    const balance = 90;
    const amount = 10;

    const expected = balance - amount;

    const sut = getBankAccount(balance);

    sut.withdraw(amount);

    const actual = sut.getBalance();
    expect(actual).toBe(expected);
  });

  test('should transfer money', () => {
    const balance = 90;
    const amount = 10;

    const expected = balance - amount;

    const sut = getBankAccount(balance);
    const anotherAccount = getBankAccount(0);
    sut.transfer(amount, anotherAccount);

    const actualOnSut = sut.getBalance();
    expect(actualOnSut).toBe(expected);

    const actualOnAnotherAccount = anotherAccount.getBalance();
    expect(actualOnAnotherAccount).toBe(amount);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const mockRandom = random as jest.Mock;

    const sut = getBankAccount(0);

    mockRandom.mockImplementationOnce(() => 69).mockImplementationOnce(() => 1);

    const result = await sut.fetchBalance();

    expect(typeof result).toBe('number');

    mockRandom.mockRestore();
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const mockRandom = random as jest.Mock;

    const sut = getBankAccount(10);

    const expected = 42;
    mockRandom
      .mockImplementationOnce(() => expected)
      .mockImplementationOnce(() => 1);

    const actual = await sut.fetchBalance();

    expect(actual).toBe(expected);

    mockRandom.mockRestore();
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const mockRandom = random as jest.Mock;

    const sut = getBankAccount(10);

    mockRandom.mockImplementation(() => 0);

    const actual = await sut.fetchBalance();

    expect(actual).toBeNull();

    mockRandom.mockRestore();
  });
});
