// @ts-nocheck
import { gen, generateSecureToken } from '../index';

test("token generation algorithm always returns secure random token of digits of expected length", () => {
    for (let length = 1; length <= 1000; length++) {
        for (let i = 0; i < 50; i++) {
            const token = gen(length);
            expect(token.length).toStrictEqual(length);
            expect(/^\d+$/.test(token)).toStrictEqual(true);
        }
    }
});
