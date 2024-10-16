import { readFileAsynchronously, doStuffByTimeout, doStuffByInterval } from '.';
import path from 'path';
import fs from 'fs';
import fsPromises from 'fs/promises';

const delay = 200;
const pathToFile = './index.ts';

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    const callback = jest.fn(() => undefined);
    jest.spyOn(global, 'setTimeout');

    doStuffByTimeout(callback, delay);

    expect(setTimeout).toHaveBeenCalledTimes(1);
    expect(setTimeout).toHaveBeenCalledWith(callback, delay);
  });

  test('should call callback only after timeout', () => {
    const callback = jest.fn(() => undefined);

    doStuffByTimeout(callback, delay);

    expect(callback).not.toBeCalled();

    jest.advanceTimersByTime(delay);

    expect(callback).toBeCalled();
    expect(callback).toHaveBeenCalledTimes(1);
  });
});

describe('doStuffByInterval', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    const callback = jest.fn(() => undefined);

    doStuffByTimeout(callback, delay);

    expect(callback).not.toBeCalled();

    jest.advanceTimersByTime(delay * 2);

    expect(callback).toBeCalled();
  });

  test('should call callback multiple times after multiple intervals', () => {
    const callback = jest.fn(() => undefined);

    const intervalDuration = 100;
    const timeoutDuration = 500;

    doStuffByInterval(callback, intervalDuration);
    jest.advanceTimersByTime(timeoutDuration);

    expect(callback).toHaveBeenCalledTimes(5);
  });
});

describe('readFileAsynchronously', () => {
  test('should call join with pathToFile', async () => {
    jest.spyOn(path, 'join');

    readFileAsynchronously(pathToFile);

    expect(path.join).toBeCalledWith(__dirname, pathToFile);
  });

  test('should return null if file does not exist', async () => {
    jest.spyOn(fs, 'existsSync').mockReturnValue(false);

    const actual = await readFileAsynchronously(pathToFile);

    expect(actual).toBeNull();
  });

  test('should return file content if file exists', async () => {
    const content = 'Some content';

    jest.spyOn(fs, 'existsSync').mockReturnValue(true);
    jest.spyOn(fsPromises, 'readFile').mockResolvedValue(content);

    const actual = await readFileAsynchronously(pathToFile);

    expect(actual).toBe(content);
  });
});
