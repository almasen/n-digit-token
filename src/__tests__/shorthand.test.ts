// @ts-nocheck
import { gen, generateSecureToken } from '../index';

test('gen shorthand calls generateSecureToken function as expected', () => {
    for (let length = 1; length <= 32; length++) {
        const genResult = gen(length);
        const generateSecureTokenResult = generateSecureToken(length);
        expect(typeof genResult).toStrictEqual(
            typeof generateSecureTokenResult,
        );
        expect(genResult.length).toStrictEqual(
            generateSecureTokenResult.length,
        );
    }
});
