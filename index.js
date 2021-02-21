/**
 * @module n-digit-token
 */

const {randomBytes} = require("crypto");

const DEFAULT_BYTE_SIZE = 64;

/**
 * Validates input length.
 * Throws an error if length is not a positive integer.
 * @param {any} input
 * @throws {error} if not called with a positive integer
 */
const validateLength = (input) => {
    if (!Number.isInteger(input) || input <= 0) {
        throw new Error("Invalid length: must be called with a positive integer.");
    }
};

/* eslint-disable max-len */

/**
 * Validates input options.
 * @param {number} length
 * @param {object} options
 * @throws {error} if called with invalid options
 */
const validateOptions = (length, options) => {
    if (!options) {
        return;
    }
    if ("avoidModuloBias" in options) {
        console.warn("Warning - deprecated option: The updated algorithm avoids modulo bias by default, therefore the avoidModuloBias option is no longer necessary and has been deprecated.");
    }
    if ("returnType" in options) {
        validateReturnType(length, options);
    }
    if ("customMemory" in options) {
        validateCustomMemory(length, options);
    }
};

const validateReturnType = (length, options) => {
    const returnType = options.returnType.toLowerCase();
    switch (returnType) {
        case "number":
        case "integer":
            if (length > 15) {
                throw new Error("Invalid options: number (integer) return type is too small for length of 15+ digits. Please consider using BigInt or String as return type.");
            }
            if ("skipPadding" in options && !options.skipPadding) {
                throw new Error("Invalid options: skipPadding must be enabled with non-string return types. Please consult the documentation for further information.");
            }
            break;

        case "string":
            break;

        default:
            throw new Error(`Invalid return type: Please choose one of string | number | bigint.`);
            break;
    }
};

const validateCustomMemory = (length, options) => {
    if (!Number.isInteger(options.customMemory) || options.customMemory <= 0) {
        throw new Error("Invalid options: customMemory must be a positive integer.");
    }
    if (options.customMemory < (DEFAULT_BYTE_SIZE + length)) {
        console.warn('Warning - scarce memory: Allocated memory is less than ideal for the algorithm, this *may* result in decreased performance.');
        return options.customMemory;
    }
};

/* eslint-enable max-len */

/**
 * Generate secure random bytes of given length.
 * @param {number} length
 * @return {string} bytes in hex
 */
const generateSecureBytes = (length) => {
    return randomBytes(length).toString("hex");
};

/**
 * Calculate largest possible value that avoids modulo bias.
 * @param {number} byteCount
 * @param {number} length
 * @return {bigint} max
 */
const calculateMax = (byteCount, length) => {
    const maxDecimal = BigInt(2n ** (BigInt(byteCount) * 8n) - 1n);
    return maxDecimal - (maxDecimal % (10n ** BigInt(length))) - 1n;
};

/**
 * Calculate total size of byte stream to be generated.
 * @param {number} length
 * @param {object} options
 * @return {number} required number of bytes
 */
const calculateByteSize = (length, options) => {
    return options && "customMemory" in options ? options.customMemory : DEFAULT_BYTE_SIZE + length;
};

/**
 * Left-pad token with zeros if necessary.
 * @param {number} length
 * @param {string} token
 * @return {string} padded token
 */
const padTokenIfNecessary = (length, token) => {
    return token.length === length ? token : token.padStart(length, '0');
};

/**
 * Generates a cryptographically secure pseudo random token string of given length.
 * This implementation avoids modulo bias.
 * @param {number} length
 * @param {object} [options] options object
 * @return {bigint} token
 */
const generateWithoutModuloBias = (length, options) => {
    const byteSize = calculateByteSize(length, options);
    const max = calculateMax(byteSize, length);

    let done = false;
    let secureInt;

    while (!done) {
        secureInt = 0n; // minimise memory usage
        const secureBytes = generateSecureBytes(byteSize);
        secureInt = BigInt('0x' + secureBytes);
        done = secureInt <= max;
    }

    return (secureInt % BigInt(10n ** BigInt(length)));
};

/**
 * Handle token return type and format based on user options.
 * @param {bigint} secureBigIntToken token
 * @param {number} length
 * @param {object} options
 * @return {string|number|bigint} formatted token
 */
const handleOptions = (secureBigIntToken, length, options) => {
    if (!options) {
        return padTokenIfNecessary(length, secureBigIntToken.toString(10));
    }

    if (!("returnType" in options)) {
        const tokenString = secureBigIntToken.toString(10);
        return options.skipPadding ? tokenString : padTokenIfNecessary(length, tokenString);
    }

    switch (options.returnType.toLowerCase()) {
        case "bigint":
            return secureBigIntToken;
            break;

        case "number":
        case "integer":
            return parseInt(secureBigIntToken, 10);
            break;

        default:
            const tokenString = secureBigIntToken.toString(10);
            return options.skipPadding ? tokenString : padTokenIfNecessary(length, tokenString);
            break;
    }
};

/**
 * Generate a cryptographically secure pseudo random token of given number of digits.
 *
 * This algorithm avoids modulo bias and runs in constant time for lengths <= 1000.
 *
 * By default the algorithm returns the token as string which may start with zeros.
 * This can be customised via the options object. Please consult the documentation if interested.
 * @param {number} length desired token length
 * @param {object} [options] options object (optional)
 * @param {string} [options.returnType='string'] desired return type (default=string)
 * @param {boolean} [options.skipPadding=false] set to true to avoid leading zeros
 * @param {number} [options.customMemory] memory used in bytes WARNING: Advanced option, use with caution!!
 * @return {string|number|bigint} token
 */
const generateSecureToken = (length, options) => {
    validateLength(length);
    validateOptions(length, options);
    const secureBigIntToken = generateWithoutModuloBias(length, options);
    return handleOptions(secureBigIntToken, length, options);
};

module.exports = {
    generateSecureToken,
    gen: generateSecureToken,
};
