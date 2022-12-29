// @ts-nocheck
import { generateSecureToken } from '../generateSecureToken';

test('setting number as return type returns a number as expected', () => {
    const token = generateSecureToken(6, { returnType: 'number' });
    const token2 = generateSecureToken(6, {
        returnType: 'number',
        skipPadding: true,
    });
    expect(typeof token).toStrictEqual('number');
    expect(typeof token2).toStrictEqual('number');
});

test('setting integer as return type returns a number as expected', () => {
    const token = generateSecureToken(6, { returnType: 'integer' });
    const token2 = generateSecureToken(6, {
        returnType: 'integer',
        skipPadding: true,
    });
    expect(typeof token).toStrictEqual('number');
    expect(typeof token2).toStrictEqual('number');
});

test('setting bigint as return type returns a bigint as expected', () => {
    const token = generateSecureToken(6, { returnType: 'bigint' });
    const token2 = generateSecureToken(6, {
        returnType: 'bigint',
        skipPadding: true,
    });
    expect(typeof token).toStrictEqual('bigint');
    expect(typeof token2).toStrictEqual('bigint');
});

test('setting string as return type returns a string as expected', () => {
    const token0 = generateSecureToken(6);
    const token1 = generateSecureToken(6, { returnType: 'string' });
    const token2 = generateSecureToken(6, {
        returnType: 'string',
        skipPadding: true,
    });
    const token3 = generateSecureToken(6, {
        returnType: 'string',
        skipPadding: false,
    });
    expect(typeof token0).toStrictEqual('string');
    expect(typeof token1).toStrictEqual('string');
    expect(typeof token2).toStrictEqual('string');
    expect(typeof token3).toStrictEqual('string');
});
