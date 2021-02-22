// @ts-nocheck
import { gen, generateSecureToken } from '../index';

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