const {gen} = require("../index.js");

test("token generation algorithm always returns secure random token of expected length", () => {
    for (let length = 1; length <= 20; length++) {
        for (let i = 0; i < 100; i++) {
            const token = gen(length, {avoidModuloBias: false});
            expect(token.length).toStrictEqual(length);
        }
    }
});

test("token generation algorithm with avoidModuloBias turned on always returns secure random token of expected length", () => {
    for (let length = 1; length <= 20; length++) {
        for (let i = 0; i < 100; i++) {
            const token = gen(length, {avoidModuloBias: true});
            expect(token.length).toStrictEqual(length);
        }
    }
});

test("token generation algorithm always returns a token consisting of digits only", () => {
    for (let length = 1; length <= 20; length++) {
        for (let i = 0; i < 100; i++) {
            const token = gen(length, {avoidModuloBias: false});
            expect(/^\d+$/.test(token)).toStrictEqual(true);
        }
    }
});

test("token generation algorithm with avoidModuloBias turned on always returns a token consisting of digits only", () => {
    for (let length = 1; length <= 20; length++) {
        for (let i = 0; i < 100; i++) {
            const token = gen(length, {avoidModuloBias: true});
            expect(/^\d+$/.test(token)).toStrictEqual(true);
        }
    }
});
