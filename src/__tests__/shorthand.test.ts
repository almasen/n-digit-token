import { gen, generateSecureToken, randomDigits } from '../index';

test('gen and randomDigits shorthands call generateSecureToken function as expected', () => {
  for (let length = 1; length <= 32; length++) {
    const genResult = gen(length);
    const randomDigitsResult = randomDigits(length);
    const generateSecureTokenResult = generateSecureToken(length);

    expect(typeof genResult).toStrictEqual(typeof generateSecureTokenResult);
    expect(genResult.length).toStrictEqual(generateSecureTokenResult.length);

    expect(typeof randomDigitsResult).toStrictEqual(
      typeof generateSecureTokenResult,
    );
    expect(randomDigitsResult.length).toStrictEqual(
      generateSecureTokenResult.length,
    );
  }
});
