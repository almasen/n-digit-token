import { generateSecureToken } from '../generateSecureToken';

jest.spyOn(console, 'warn').mockImplementation();

afterEach(() => {
  jest.clearAllMocks();
});

test('token generation algorithm warns about scarce memory but executes without error', () => {
  expect((console.warn as jest.Mock).mock.calls.length).toBe(0);
  const token = generateSecureToken(6, { customMemory: 64 });
  expect((console.warn as jest.Mock).mock.calls.length).toBe(1);
  expect((console.warn as jest.Mock).mock.calls[0][0]).toBe(
    'Warning - scarce memory: Allocated memory is less than ideal for the algorithm, this *may* result in decreased performance.',
  );
  expect(token.length).toStrictEqual(6);
});

test('token generation algorithm warns about too much memory but executes without error', () => {
  expect((console.warn as jest.Mock).mock.calls.length).toBe(0);
  const token = generateSecureToken(6, { customMemory: 1024 });
  expect((console.warn as jest.Mock).mock.calls.length).toBe(1);
  expect((console.warn as jest.Mock).mock.calls[0][0]).toBe(
    'Warning - overcompensated memory: Allocated memory is more than ideal for the algorithm, this *may* result in decreased performance.',
  );
  expect(token.length).toStrictEqual(6);
});

test('token generation algorithm warns about deprecated options but executes without error', () => {
  expect((console.warn as jest.Mock).mock.calls.length).toBe(0);
  // @ts-expect-error
  generateSecureToken(6, { avoidModuloBias: true });
  expect((console.warn as jest.Mock).mock.calls.length).toBe(1);
  // @ts-expect-error
  generateSecureToken(6, { avoidModuloBias: false });
  expect((console.warn as jest.Mock).mock.calls.length).toBe(2);
  // @ts-expect-error
  generateSecureToken(6, { avoidModuloBias: 'invalid' });
  expect((console.warn as jest.Mock).mock.calls.length).toBe(3);
  expect((console.warn as jest.Mock).mock.calls[0][0]).toBe(
    'Warning - deprecated option: The updated algorithm avoids modulo bias by default, therefore the avoidModuloBias option is no longer necessary and has been deprecated.',
  );
  expect((console.warn as jest.Mock).mock.calls[1][0]).toBe(
    'Warning - deprecated option: The updated algorithm avoids modulo bias by default, therefore the avoidModuloBias option is no longer necessary and has been deprecated.',
  );
  expect((console.warn as jest.Mock).mock.calls[2][0]).toBe(
    'Warning - deprecated option: The updated algorithm avoids modulo bias by default, therefore the avoidModuloBias option is no longer necessary and has been deprecated.',
  );
});
