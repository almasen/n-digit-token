import { generateWithoutModuloBias } from './generateWithoutModuloBias';
import { handleOptions } from './handleOptions';
import { Options } from './types';
import { validateLength, validateOptions } from './validation';

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
export const generateSecureToken = (
    length: number,
    options?: Options,
): string | number | bigint => {
    validateLength(length);
    validateOptions(length, options);
    const secureBigIntToken = generateWithoutModuloBias(length, options);
    return handleOptions(secureBigIntToken, length, options);
};
