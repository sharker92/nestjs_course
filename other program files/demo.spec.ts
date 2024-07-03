import axios from 'axios';

describe('TestsX1', () => {
  beforeAll(() => {
    jest.mock('axios', () => {
      return {
        get: jest.fn(() => {
          console.log('fun1');
          return 3;
        }),
      };
    });
  });
});
test('should create a user', async () => {
  const value = axios.get('www.example.com');
  console.log(value);
  expect(value).toBe(2);
});
