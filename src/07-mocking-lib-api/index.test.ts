import axios from 'axios';
import { throttledGetDataFromApi } from './index';

beforeAll(() => {
  jest.useFakeTimers();
});

afterEach(() => {
  jest.runAllTimers();
  jest.clearAllMocks();
});

describe('throttledGetDataFromApi', () => {
  test('should create instance with provided base url', async () => {
    const axiosSpy = jest.spyOn(axios, 'create');

    axios.Axios.prototype.get = jest.fn().mockResolvedValue('mock1');

    await throttledGetDataFromApi('/');

    expect(axiosSpy).toHaveBeenCalled();
  });

  test('should perform request to correct provided url', async () => {
    axios.Axios.prototype.get = jest.fn().mockResolvedValue('mock2');

    const axiosSpy = jest.spyOn(axios.Axios.prototype, 'get');

    await throttledGetDataFromApi('/mock-url');

    expect(axiosSpy).toHaveBeenCalled();
  });

  test('should return response data', async () => {
    axios.Axios.prototype.get = jest.fn().mockResolvedValue({ data: 'mock3' });

    const mockData = await throttledGetDataFromApi('/');

    expect(mockData).toBe('mock3');
  });
});
