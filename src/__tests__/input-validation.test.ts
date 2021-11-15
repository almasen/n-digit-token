// @ts-nocheck
import { gen, generateSecureToken } from '../index';
import { randomBytes } from 'crypto';

/* eslint-disable max-len */

test('token generation algorithm throws appropriate error on invalid length', () => {
    expect(() => {
        generateSecureToken();
    }).toThrow(new Error('Invalid length: must be called with a positive integer.'));
    expect(() => {
        generateSecureToken(2.45);
    }).toThrow(new Error('Invalid length: must be called with a positive integer.'));

    expect(() => {
        generateSecureToken(-5);
    }).toThrow(new Error('Invalid length: must be called with a positive integer.'));

    expect(() => {
        generateSecureToken('abc');
    }).toThrow(new Error('Invalid length: must be called with a positive integer.'));

    expect(() => {
        generateSecureToken(6n);
    }).toThrow(new Error('Invalid length: must be called with a positive integer.'));
});

test('token generation algorithm supports integer/number return type up to 15 digits', () => {
    for (let length = 1; length < 16; length++) {
        const token = generateSecureToken(length, { returnType: 'number' });
        expect(typeof token).toStrictEqual('number');
    }
});

test('token generation algorithm rejects integer sizes greater than 15 digits.', () => {
    expect(() => {
        generateSecureToken(16, { returnType: 'number' });
    }).toThrow(new Error('Invalid options: number (integer) return type is too small for length of 15+ digits. Please consider using BigInt or String as return type.'));
});

test('token generation accepts bigint sizes greater than 15 digits.', () => {
    const token = generateSecureToken(16, { returnType: 'bigint' });
    expect(typeof token).toStrictEqual('bigint');
});

test('token generation algorithm verifies that returnType is a string if used.', () => {
    generateSecureToken(6);
    generateSecureToken(6, { returnType: 'bigint' });
    expect(() => {
        generateSecureToken(6, { returnType: 2n });
    }).toThrow(new Error("Invalid options: returnType must be specified in a string. For example 'number' or 'string'."));
    expect(() => {
        generateSecureToken(6, { returnType: 1 });
    }).toThrow(new Error("Invalid options: returnType must be specified in a string. For example 'number' or 'string'."));
    expect(() => {
        generateSecureToken(6, { returnType: true });
    }).toThrow(new Error("Invalid options: returnType must be specified in a string. For example 'number' or 'string'."));
});

test('token generation algorithm verifies that skipPadding is a boolean if used.', () => {
    generateSecureToken(6);
    generateSecureToken(6, { skipPadding: false });
    expect(() => {
        generateSecureToken(6, { skipPadding: 'invalid' });
    }).toThrow(new Error('Invalid options: skipPadding must be a boolean.'));
    expect(() => {
        generateSecureToken(6, { skipPadding: 12 });
    }).toThrow(new Error('Invalid options: skipPadding must be a boolean.'));
});

test('token generation algorithm throws an appropriate error on unknown return types', () => {
    expect(() => {
        generateSecureToken(6, { returnType: 'unknown' });
    }).toThrow(new Error('Invalid return type: Please choose one of string | number | bigint.'));
});

test('setting skipPadding to true is only accepted for token lengths >1', () => {
    expect(() => {
        generateSecureToken(1, { skipPadding: true });
    }).toThrow(new Error('Invalid options: skipPadding can only be used with token length >1.'));
});

test('token generation algorithm rejects skipPadding=false in combination with a numerical return type.', () => {
    const token = generateSecureToken(6, { returnType: 'number', skipPadding: true });
    expect(typeof token).toStrictEqual('number');

    expect(() => {
        generateSecureToken(6, { returnType: 'number', skipPadding: false });
    }).toThrow(new Error('Invalid options: skipPadding must be enabled with non-string return types. Please consult the documentation for further information.'));

    expect(() => {
        generateSecureToken(6, { returnType: 'integer', skipPadding: false });
    }).toThrow(new Error('Invalid options: skipPadding must be enabled with non-string return types. Please consult the documentation for further information.'));

    expect(() => {
        generateSecureToken(6, { returnType: 'bigint', skipPadding: false });
    }).toThrow(new Error('Invalid options: skipPadding must be enabled with non-string return types. Please consult the documentation for further information.'));
});

test('token generation algorithm validates custom memory option correctly', () => {
    expect(() => {
        generateSecureToken(16, { customMemory: '8' });
    }).toThrow(new Error('Invalid options: customMemory must be a positive integer.'));

    expect(() => {
        generateSecureToken(16, { customMemory: 0 });
    }).toThrow(new Error('Invalid options: customMemory must be a positive integer.'));

    const token = generateSecureToken(16, { customMemory: 96 });
    expect(token.length).toStrictEqual(16);
});

test('token generation algorithm validates custom byte stream option correctly', () => {
    const noParamsFunction = (): Buffer => {
        return Buffer;
    };
    const invalidParamsFunction = (length: string): Buffer => {
        return Buffer;
    };
    const invalidVoidFunction = (length: number): void => {};
    const invalidReturnFunction = (length: number): string => {
        return '';
    };

    expect(() => {
        generateSecureToken(16, { customByteStream: 'a' });
    }).toThrow(new Error('Invalid options: customByteStream must be a function that returns a byte Buffer.'));

    expect(() => {
        generateSecureToken(16, { customByteStream: true });
    }).toThrow(new Error('Invalid options: customByteStream must be a function that returns a byte Buffer.'));

    expect(() => {
        generateSecureToken(16, { customByteStream: noParamsFunction });
    }).toThrow();

    expect(() => {
        generateSecureToken(16, { customByteStream: invalidParamsFunction });
    }).toThrow();

    expect(() => {
        generateSecureToken(16, { customByteStream: invalidVoidFunction });
    }).toThrow();

    expect(() => {
        generateSecureToken(16, { customByteStream: invalidReturnFunction });
    }).toThrow();

    const token = generateSecureToken(16, { customByteStream: randomBytes });
    expect(token.length).toStrictEqual(16);
});
