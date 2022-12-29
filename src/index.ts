import { calculateByteSize } from './calculateByteSize';
import { BIGINT, INTEGER, NUMBER } from './constants';
import { generateSecureBytes } from './generateSecureBytes';
import { padTokenIfNecessary } from './padTokenIfNecessary';
import { Options } from './types';
import { validateLength, validateOptions } from './validation';

/**
 * Calculate largest possible value that avoids modulo bias.
 * @param {number} byteCount
 * @param {number} length
 * @return {bigint} max
 */
const calculateMax = (byteCount: number, length: number): bigint => {
    const maxDecimal = BigInt(2n ** (BigInt(byteCount) * 8n) - 1n);
    return maxDecimal - (maxDecimal % 10n ** BigInt(length)) - 1n;
};

/**
 * Generates a cryptographically secure pseudo random token string of given length.
 * This implementation avoids modulo bias.
 * @param {number} length
 * @param {Options} [options]
 * @return {bigint} token
 */
const generateWithoutModuloBias = (length: number, options?: Options): bigint => {
    const byteSize = calculateByteSize(length, options);
    const max = calculateMax(byteSize, length);

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

/**
 * Handle token return type and format based on user options.
 * @param {bigint} secureBigIntToken token
 * @param {number} length
 * @param {Options} [options]
 * @return {string|number|bigint} formatted token
 */
const handleOptions = (secureBigIntToken: bigint, length: number, options?: Options): string | number | bigint => {
    if (!options) {
        return padTokenIfNecessary(length, secureBigIntToken.toString(10));
    }

    switch (options.returnType) {
        case BIGINT:
            return secureBigIntToken;

        case NUMBER:
        case INTEGER:
            return Number(secureBigIntToken);

        default:
            const tokenString = secureBigIntToken.toString(10);
            return options.skipPadding ? tokenString : padTokenIfNecessary(length, tokenString);
    }
};

/**
 * Generate a cryptographically secure pseudo random token of given number of digits.
 *
 * This algorithm avoids modulo bias and runs in constant time for lengths <= 1000.
 *
 * By default the algorithm returns the token as string which may start with zeros.
 * This can be customised via the options object, please consult the documentation if interested.
 * @param {number} length desired token length
 * @param {Options} [options] options object (optional)
 * @param {string} [options.returnType='string'] desired return type (default=string)
 * @param {boolean} [options.skipPadding=false] set to true to avoid leading zeros
 * @param {number} [options.customMemory] memory used in bytes WARNING: Advanced option, use with caution!!
 * @param {number} [options.customByteStream] specify custom CSPRNG byte stream function WARNING: Advanced option, use with caution!!
 * @return {string|number|bigint} token (as string by default)
 */
const generateSecureToken = (length: number, options?: Options): string | number | bigint => {
    validateLength(length);
    validateOptions(length, options);
    const secureBigIntToken = generateWithoutModuloBias(length, options);
    return handleOptions(secureBigIntToken, length, options);
};

export { generateSecureToken, generateSecureToken as gen };
