// @ts-nocheck
import { gen, generateSecureToken } from '../index';

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