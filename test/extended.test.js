const {gen} = require("../index.js");

jest.spyOn(console, 'warn').mockImplementation();

afterEach(() => {
    jest.clearAllMocks();
});

test("token generation algorithm always returns secure random token of digits of expected length", () => {
    for (let length = 1; length <= 1000; length++) {
        for (let i = 0; i < 50; i++) {
            const token = gen(length);
            expect(token.length).toStrictEqual(length);
            expect(/^\d+$/.test(token)).toStrictEqual(true);
        }
    }
});

test("by default token generation algorithm returns values within expected distribution", () => {
    const total = 1000000;
    const map = new Map();
    for (let i = 0; i < total; i++) {
        const token = gen(1);
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
    const total = 1000000;
    const map = new Map();
    for (let i = 0; i < total; i++) {
        const token = gen(1, {customMemory: 1});
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
