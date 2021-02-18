const {gen, generateSecureToken} = require("../index.js");
const lengthMap = require("../length-map.json");

test("sum of byte length combinations in lengthMap matches required bytes", () => {
    for (const key in lengthMap) {
        if (Object.hasOwnProperty.call(lengthMap, key)) {
            const record = lengthMap[key];
            expect(record.totalBytes).toStrictEqual(record.lengthCombination.reduce((a, b) => a + b, 0));
        }
    }
});

test("token generation algorithm returns a string", () => {
    for (let length = 1; length <= 20; length++) {
        expect(typeof generateSecureToken(length)).toStrictEqual("string");
    }
});

test("gen shorthand calls generateSecureToken function as expected", () => {
    for (let length = 1; length <= 20; length++) {
        const genResult = gen(length);
        const generateSecureTokenResult = generateSecureToken(length);
        expect(typeof genResult).toStrictEqual(typeof generateSecureTokenResult);
        expect(genResult.length).toStrictEqual(generateSecureTokenResult.length);
    }
});

test("token generation algorithm throws appropriate error on invalid parameters", () => {
    expect(() => {
        generateSecureToken(2.45);
    }).toThrow(new Error("Invalid input: must be called with a positive integer."));

    expect(() => {
        generateSecureToken(-5);
    }).toThrow(new Error("Invalid input: must be called with a positive integer."));

    expect(() => {
        generateSecureToken("abc");
    }).toThrow(new Error("Invalid input: must be called with a positive integer."));

    expect(() => {
        generateSecureToken(23);
    }).toThrow(new Error("Invalid input: the largest supported length is 20."));

    expect(() => {
        generateSecureToken(2, {avoidModuloBias: "invalid"});
    }).toThrow(new Error("Invalid options: avoidModuloBias must be a boolean."));
});

test("token generation algorithm always returns a token consisting of digits only", () => {
    for (let length = 1; length <= 20; length++) {
        const token = generateSecureToken(length, {avoidModuloBias: false});
        expect(/^\d+$/.test(token)).toStrictEqual(true);
    }
});

test("token generation algorithm with avoidModuloBias turned on always returns a token consisting of digits only", () => {
    for (let length = 1; length <= 20; length++) {
        const token = generateSecureToken(length, {avoidModuloBias: true});
        expect(/^\d+$/.test(token)).toStrictEqual(true);
    }
});

test("token generation algorithm always returns secure random token of expected length", () => {
    for (let length = 1; length <= 20; length++) {
        for (let i = 0; i < 100; i++) {
            const token = generateSecureToken(length, {avoidModuloBias: false});
            expect(token.length).toStrictEqual(length);
        }
    }
});

test("token generation algorithm with avoidModuloBias turned on always returns secure random token of expected length", () => {
    for (let length = 1; length <= 20; length++) {
        for (let i = 0; i < 100; i++) {
            const token = generateSecureToken(length, {avoidModuloBias: true});
            expect(token.length).toStrictEqual(length);
        }
    }
});
