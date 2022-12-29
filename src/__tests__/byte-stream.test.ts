// @ts-nocheck
import { generateSecureToken } from '../index';
import { randomBytes } from 'crypto-browserify';

/* eslint-disable max-len */

test('token generation algorithm works with custom byte stream', () => {
    const token = generateSecureToken(16, { customByteStream: randomBytes });
    expect(token.length).toStrictEqual(16);
});
