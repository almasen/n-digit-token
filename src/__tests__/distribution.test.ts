// @ts-nocheck
import { generateSecureToken } from '../generateSecureToken';

jest.spyOn(console, 'warn').mockImplementation();

afterEach(() => {
    jest.clearAllMocks();
});

test('by default token generation algorithm returns values within expected distribution', () => {
    const total = 100000;
    const map = new Map();
    for (let i = 0; i < total; i++) {
        const token = generateSecureToken(1);
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

test('token generation algorithm provided less than ideal memory still returns values within expected distribution', () => {
    const total = 100000;
    const map = new Map();
    for (let i = 0; i < total; i++) {
        const token = generateSecureToken(1, { customMemory: 1 });
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
