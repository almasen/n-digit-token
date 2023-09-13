import { generateSecureToken } from '../generateSecureToken';
// @ts-ignore
import { randomBytes } from 'crypto-browserify';

test('token generation algorithm works with custom byte stream', () => {
  const token = generateSecureToken(16, { customByteStream: randomBytes });
  expect(token.length).toStrictEqual(16);
});
