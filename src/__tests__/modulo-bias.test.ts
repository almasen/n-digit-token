import { generateSecureBytes } from '../library/generateSecureBytes';
import { generateSecureToken } from '../generateSecureToken';

jest.spyOn(console, 'warn').mockImplementation();

jest.mock('../library/generateSecureBytes');

let callCount = 0;
(generateSecureBytes as jest.Mock).mockImplementation(() => {
  callCount++;
  return callCount < 42 ? 'FF' : '2A';
});

afterEach(() => {
  jest.clearAllMocks();
  callCount = 0;
});

test('token generation is performed until a value is generated that does not exceed largest possible value hence avoiding modulo bias', () => {
  expect((console.warn as jest.Mock).mock.calls.length).toBe(0);
  expect((generateSecureBytes as jest.Mock).mock.calls.length).toBe(0);

  const token = generateSecureToken(2, { customMemory: 1 });

  expect((console.warn as jest.Mock).mock.calls.length).toBe(1);
  expect((generateSecureBytes as jest.Mock).mock.calls.length).toBe(42);
  expect(token.length).toStrictEqual(2);
  expect(token).toStrictEqual('42');
});
