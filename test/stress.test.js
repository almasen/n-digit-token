const { gen } = require("../index.js");

test("token generation algorithm always returns secure random token of expected length", async () => {
    for (let length = 1; length <= 16; length++) {
        for (let i = 0; i < 10000; i++) {
            const token = gen(length);
            expect(token.length).toStrictEqual(length);
        }
    }
});
