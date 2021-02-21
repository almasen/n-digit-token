const {gen, generateSecureToken} = require("../index.js");

jest.spyOn(console, 'warn').mockImplementation();

afterEach(() => {
  jest.clearAllMocks();
});

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

test("token generation algorithm warns about deprecated options but executes without error", () => {
    expect(console.warn.mock.calls.length).toBe(0);
    generateSecureToken(6, {avoidModuloBias: true})
    expect(console.warn.mock.calls.length).toBe(1);
    generateSecureToken(6, {avoidModuloBias: false})
    expect(console.warn.mock.calls.length).toBe(2);
    generateSecureToken(6, {avoidModuloBias: "invalid"})
    expect(console.warn.mock.calls.length).toBe(3);
    expect(console.warn.mock.calls[0][0]).toBe("Deprecated option: The updated algorithm avoids modulo bias by default, therefore the avoidModuloBias option is no longer necessary and has been deprecated.");
    expect(console.warn.mock.calls[1][0]).toBe("Deprecated option: The updated algorithm avoids modulo bias by default, therefore the avoidModuloBias option is no longer necessary and has been deprecated.");
    expect(console.warn.mock.calls[2][0]).toBe("Deprecated option: The updated algorithm avoids modulo bias by default, therefore the avoidModuloBias option is no longer necessary and has been deprecated.");
});

test("gen shorthand calls generateSecureToken function as expected", () => {
    for (let length = 1; length <= 32; length++) {
        const genResult = gen(length);
        const generateSecureTokenResult = generateSecureToken(length);
        expect(typeof genResult).toStrictEqual(typeof generateSecureTokenResult);
        expect(genResult.length).toStrictEqual(generateSecureTokenResult.length);
    }
})

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

