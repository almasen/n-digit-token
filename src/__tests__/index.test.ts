// @ts-nocheck
import { generateSecureToken } from '../index';

test('simple token generation works', () => {
    const token = generateSecureToken(6);
    expect(token.length).toStrictEqual(6);
    expect(typeof token).toStrictEqual('string');
});

test('simple token generation shorthand works', () => {
    const token = generateSecureToken(6);
    expect(token.length).toStrictEqual(6);
    expect(typeof token).toStrictEqual('string');
});
