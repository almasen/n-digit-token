const {gen, generateSecureToken} = require("../index.js");

jest.spyOn(console, 'warn').mockImplementation();

afterEach(() => {
    jest.clearAllMocks();
});

test("simple token generation works", () => {
    const token = generateSecureToken(6);
    expect(token.length).toStrictEqual(6);
    expect(typeof token).toStrictEqual("string");
});

test("simple token generation shorthand works", () => {
    const token = generateSecureToken(6);
    expect(token.length).toStrictEqual(6);
    expect(typeof token).toStrictEqual("string");
});

/* eslint-disable max-len */

test("token generation algorithm throws appropriate error on invalid length", () => {
    expect(() => {
        generateSecureToken();
    }).toThrow(new Error("Invalid length: must be called with a positive integer."));
    expect(() => {
        generateSecureToken(2.45);
    }).toThrow(new Error("Invalid length: must be called with a positive integer."));

    expect(() => {
        generateSecureToken(-5);
    }).toThrow(new Error("Invalid length: must be called with a positive integer."));

    expect(() => {
        generateSecureToken("abc");
    }).toThrow(new Error("Invalid length: must be called with a positive integer."));

    expect(() => {
        generateSecureToken(6n);
    }).toThrow(new Error("Invalid length: must be called with a positive integer."));
});

test("token generation algorithm supports integer/number return type up to 15 digits", () => {
    for (let length = 1; length < 16; length++) {
        const token = generateSecureToken(length, {returnType: "number"});
        expect(typeof token).toStrictEqual("number");
    }
});

test("token generation algorithm rejects integer sizes greater than 15 digits.", () => {
    expect(() => {
        generateSecureToken(16, {returnType: "number"});
    }).toThrow(new Error("Invalid options: number (integer) return type is too small for length of 15+ digits. Please consider using BigInt or String as return type."));
});

test("token generation accepts bigint sizes greater than 15 digits.", () => {
    const token = generateSecureToken(16, {returnType: "bigint"});
    expect(typeof token).toStrictEqual("bigint");
});

test("token generation algorithm verifies that returnType is a string if used.", () => {
    generateSecureToken(6);
    generateSecureToken(6, {returnType: "bigint"});
    expect(() => {
        generateSecureToken(6, {returnType: 2n});
    }).toThrow(new Error("Invalid options: returnType must be specified in a string. For example 'number' or 'string'."));
    expect(() => {
        generateSecureToken(6, {returnType: 0});
    }).toThrow(new Error("Invalid options: returnType must be specified in a string. For example 'number' or 'string'."));
    expect(() => {
        generateSecureToken(6, {returnType: false});
    }).toThrow(new Error("Invalid options: returnType must be specified in a string. For example 'number' or 'string'."));
});

test("token generation algorithm verifies that skipPadding is a boolean if used.", () => {
    generateSecureToken(6);
    generateSecureToken(6, {skipPadding: false});
    expect(() => {
        generateSecureToken(6, {skipPadding: "false"});
    }).toThrow(new Error("Invalid options: skipPadding must be a boolean."));
    expect(() => {
        generateSecureToken(6, {skipPadding: 0});
    }).toThrow(new Error("Invalid options: skipPadding must be a boolean."));
});

test("token generation algorithm throws an appropriate error on unknown return types", () => {
    expect(() => {
        generateSecureToken(6, {returnType: "unknown"});
    }).toThrow(new Error("Invalid return type: Please choose one of string | number | bigint."));
});

test("setting skipPadding to true is only accepted for token lengths >1", () => {
    expect(() => {
        generateSecureToken(1, {skipPadding: true});
    }).toThrow(new Error("Invalid options: skipPadding can only be used with token length >1. How would you skip padding for a single digit token?"));
});

test("token generation algorithm rejects skipPadding=false in combination with a numerical return type.", () => {
    const token = generateSecureToken(6, {returnType: "number", skipPadding: true});
    expect(typeof token).toStrictEqual("number");

    expect(() => {
        generateSecureToken(6, {returnType: "number", skipPadding: false});
    }).toThrow(new Error("Invalid options: skipPadding must be enabled with non-string return types. Please consult the documentation for further information."));

    expect(() => {
        generateSecureToken(6, {returnType: "integer", skipPadding: false});
    }).toThrow(new Error("Invalid options: skipPadding must be enabled with non-string return types. Please consult the documentation for further information."));

    expect(() => {
        generateSecureToken(6, {returnType: "bigint", skipPadding: false});
    }).toThrow(new Error("Invalid options: skipPadding must be enabled with non-string return types. Please consult the documentation for further information."));
});

test("token generation algorithm validates custom memory option correctly", () => {
    expect(() => {
        generateSecureToken(16, {customMemory: "8"});
    }).toThrow(new Error("Invalid options: customMemory must be a positive integer."));

    expect(() => {
        generateSecureToken(16, {customMemory: 0});
    }).toThrow(new Error("Invalid options: customMemory must be a positive integer."));

    const token = generateSecureToken(16, {customMemory: 32});
    expect(token.length).toStrictEqual(16);
});

test("token generation algorithm warns about scarce memory but executes without error", () => {
    expect(console.warn.mock.calls.length).toBe(0);
    const token = generateSecureToken(6, {customMemory: 64});
    expect(console.warn.mock.calls.length).toBe(1);
    expect(console.warn.mock.calls[0][0]).toBe("Warning - scarce memory: Allocated memory is less than ideal for the algorithm, this *may* result in decreased performance.");
    expect(token.length).toStrictEqual(6);
});

test("token generation algorithm warns about too much memory but executes without error", () => {
    expect(console.warn.mock.calls.length).toBe(0);
    const token = generateSecureToken(6, {customMemory: 1024});
    expect(console.warn.mock.calls.length).toBe(1);
    expect(console.warn.mock.calls[0][0]).toBe("Warning - overcompensated memory: Allocated memory is more than ideal for the algorithm, this *may* result in decreased performance.");
    expect(token.length).toStrictEqual(6);
});

test("token generation algorithm warns about deprecated options but executes without error", () => {
    expect(console.warn.mock.calls.length).toBe(0);
    generateSecureToken(6, {avoidModuloBias: true});
    expect(console.warn.mock.calls.length).toBe(1);
    generateSecureToken(6, {avoidModuloBias: false});
    expect(console.warn.mock.calls.length).toBe(2);
    generateSecureToken(6, {avoidModuloBias: "invalid"});
    expect(console.warn.mock.calls.length).toBe(3);
    expect(console.warn.mock.calls[0][0]).toBe("Warning - deprecated option: The updated algorithm avoids modulo bias by default, therefore the avoidModuloBias option is no longer necessary and has been deprecated.");
    expect(console.warn.mock.calls[1][0]).toBe("Warning - deprecated option: The updated algorithm avoids modulo bias by default, therefore the avoidModuloBias option is no longer necessary and has been deprecated.");
    expect(console.warn.mock.calls[2][0]).toBe("Warning - deprecated option: The updated algorithm avoids modulo bias by default, therefore the avoidModuloBias option is no longer necessary and has been deprecated.");
});

test("gen shorthand calls generateSecureToken function as expected", () => {
    for (let length = 1; length <= 32; length++) {
        const genResult = gen(length);
        const generateSecureTokenResult = generateSecureToken(length);
        expect(typeof genResult).toStrictEqual(typeof generateSecureTokenResult);
        expect(genResult.length).toStrictEqual(generateSecureTokenResult.length);
    }
});

test("setting number as return type returns a number as expected", () => {
    const token = generateSecureToken(6, {returnType: "number"});
    const token2 = generateSecureToken(6, {returnType: "number", skipPadding: true});
    expect(typeof token).toStrictEqual("number");
    expect(typeof token2).toStrictEqual("number");
});

test("setting integer as return type returns a number as expected", () => {
    const token = generateSecureToken(6, {returnType: "integer"});
    const token2 = generateSecureToken(6, {returnType: "integer", skipPadding: true});
    expect(typeof token).toStrictEqual("number");
    expect(typeof token2).toStrictEqual("number");
});

test("setting bigint as return type returns a bigint as expected", () => {
    const token = generateSecureToken(6, {returnType: "bigint"});
    const token2 = generateSecureToken(6, {returnType: "bigint", skipPadding: true});
    expect(typeof token).toStrictEqual("bigint");
    expect(typeof token2).toStrictEqual("bigint");
});

test("setting string as return type returns a string as expected", () => {
    const token0 = generateSecureToken(6);
    const token1 = generateSecureToken(6, {returnType: "string"});
    const token2 = generateSecureToken(6, {returnType: "string", skipPadding: true});
    const token3 = generateSecureToken(6, {returnType: "string", skipPadding: false});
    expect(typeof token0).toStrictEqual("string");
    expect(typeof token1).toStrictEqual("string");
    expect(typeof token2).toStrictEqual("string");
    expect(typeof token3).toStrictEqual("string");
});

test("setting skipPadding to true may result in varied string token lengths if length is set to >1", () => {
    const desiredTokenLength = 6;
    let smallerTokenFound = false;
    while (!smallerTokenFound) {
        const token = gen(desiredTokenLength, {skipPadding: true});
        smallerTokenFound = token.length < desiredTokenLength;
    }
});

test("setting skipPadding to true may result in varied number token lengths if length is set to >1", () => {
    const desiredTokenLength = 6;
    let smallerTokenFound = false;
    while (!smallerTokenFound) {
        const token = gen(desiredTokenLength, {skipPadding: true, returnType: "number"});
        smallerTokenFound = token.toString().length < desiredTokenLength;
    }
});

test("setting skipPadding to true may result in varied bigint token lengths if length is set to >1", () => {
    const desiredTokenLength = 6;
    let smallerTokenFound = false;
    while (!smallerTokenFound) {
        const token = gen(desiredTokenLength, {skipPadding: true, returnType: "bigint"});
        smallerTokenFound = token.toString().length < desiredTokenLength;
    }
});

test("setting skipPadding to true may not result in greater string token lengths if length is set to >1", () => {
    const desiredTokenLength = 6;
    let largerTokenFound = false;
    for (let i = 0; i < 10000; i++) {
        const token = gen(desiredTokenLength, {skipPadding: true});
        largerTokenFound = token.length > desiredTokenLength;
    }
    expect(largerTokenFound).toStrictEqual(false);
});

test("setting skipPadding to true may not result in greater number token lengths if length is set to >1", () => {
    const desiredTokenLength = 6;
    let largerTokenFound = false;
    for (let i = 0; i < 10000; i++) {
        const token = gen(desiredTokenLength, {skipPadding: true, returnType: "number"});
        largerTokenFound = token.toString().length > desiredTokenLength;
    }
    expect(largerTokenFound).toStrictEqual(false);
});

test("setting skipPadding to true may not result in greater bigint token lengths if length is set to >1", () => {
    const desiredTokenLength = 6;
    let largerTokenFound = false;
    for (let i = 0; i < 10000; i++) {
        const token = gen(desiredTokenLength, {skipPadding: true, returnType: "bigint"});
        largerTokenFound = token.toString().length > desiredTokenLength;
    }
    expect(largerTokenFound).toStrictEqual(false);
});

test("token generation algorithm returns a string by default", () => {
    for (let length = 1; length <= 32; length++) {
        expect(typeof generateSecureToken(length)).toStrictEqual("string");
    }
});

test("token generation algorithm returns a token of input length by default", () => {
    for (let length = 1; length <= 32; length++) {
        for (let i = 0; i < 100; i++) {
            const token = generateSecureToken(length);
            expect(token.length).toStrictEqual(length);
        }
    }
});

test("token generation algorithm always returns a token consisting of digits only", () => {
    for (let length = 1; length <= 64; length++) {
        const token = generateSecureToken(length);
        expect(/^\d+$/.test(token)).toStrictEqual(true);
    }
});

test("by default token generation algorithm returns values within expected distribution", () => {
    const total = 10000;
    const map = new Map();
    for (let i = 0; i < total; i++) {
        const token = generateSecureToken(1);
        if (map.has(token)) {
            map.set(token, map.get(token) + 1);
        } else {
            map.set(token, 1);
        }
    }
    for (let i = 1; i < 10; i++) {
        const count = map.get(`${i}`);
        expect(count > Math.floor(total * 0.07)).toStrictEqual(true);
        expect(count < Math.ceil(total * 0.13)).toStrictEqual(true);
    }
});

test("token generation algorithm provided less than ideal memory still returns values within expected distribution", () => {
    const total = 10000;
    const map = new Map();
    for (let i = 0; i < total; i++) {
        const token = generateSecureToken(1, {customMemory: 1});
        if (map.has(token)) {
            map.set(token, map.get(token) + 1);
        } else {
            map.set(token, 1);
        }
    }
    for (let i = 1; i < 10; i++) {
        const count = map.get(`${i}`);
        expect(count > Math.floor(total * 0.07)).toStrictEqual(true);
        expect(count < Math.ceil(total * 0.13)).toStrictEqual(true);
    }
});
