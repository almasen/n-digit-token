const { gen, generateSecureToken } = require("../index.js");

test("token generation algorithm returns a string", async () => {
    expect(typeof generateSecureToken(2)).toStrictEqual("string");
});

test("token generation algorithm always returns secure random token of expected length", async () => {
    for (let length = 1; length <= 8; length++) {
        for (let i = 0; i < 100; i++) {
            const token = generateSecureToken(length, { avoidModuloBias: false });
            expect(token.length).toStrictEqual(length);
        }
    }
});

test("token generation algorithm always returns secure random token of expected length", async () => {
    for (let length = 1; length <= 8; length++) {
        for (let i = 0; i < 100; i++) {
            const token = generateSecureToken(length, { avoidModuloBias: true });
            expect(token.length).toStrictEqual(length);
        }
    }
});

test("token generation algorithm always returns secure random token of expected length", async () => {
    for (let length = 1; length <= 8; length++) {
        for (let i = 0; i < 100; i++) {
            const token = generateSecureToken(length, { avoidModuloBias: false });
            expect(/^\d+$/.test(token)).toStrictEqual(true);
        }
    }
});

test("token generation algorithm always returns secure random token of expected length", async () => {
    for (let length = 1; length <= 8; length++) {
        for (let i = 0; i < 100; i++) {
            const token = generateSecureToken(length, { avoidModuloBias: true });
            expect(/^\d+$/.test(token)).toStrictEqual(true);
        }
    }
});

test("token generation algorithm throws appropriate error on invalid parameters", async () => {
    expect(() => {
        generateSecureToken(2.45)
    }).toThrow(new Error("Invalid input: must be called with a positive integer."));

    expect(() => {
        generateSecureToken(-5)
    }).toThrow(new Error("Invalid input: must be called with a positive integer."));

    expect(() => {
        generateSecureToken("abc")
    }).toThrow(new Error("Invalid input: must be called with a positive integer."));

    expect(() => {
        generateSecureToken(23)
    }).toThrow(new Error("Invalid input: the largest supported length is 20."));
});
