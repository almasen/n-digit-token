import { calculateByteSize } from './calculateByteSize';
import { calculateMax } from './calculateMax';
import { generateSecureBytes } from './generateSecureBytes';
import { Options } from './types';

/**
 * Generates a cryptographically secure pseudo random token string of given length.
 * This implementation avoids modulo bias.
 * @param {number} length
 * @param {Options} [options]
 * @return {bigint} token
 */
export const generateWithoutModuloBias = (
    length: number,
    options?: Options,
): bigint => {
    const byteSize = calculateByteSize(length, options);
    const max = calculateMax({ byteSize, length });

    let done = false;
    let secureInt = 0n;

    while (!done) {
        secureInt = 0n; // minimize memory usage
        const secureBytes = generateSecureBytes(byteSize, options);
        secureInt = BigInt('0x' + secureBytes);
        done = secureInt <= max;
    }

    return secureInt % BigInt(10n ** BigInt(length));
};
