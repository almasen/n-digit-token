/**
 * @module n-digit-token
 */

const crypto = require("crypto");

/**
 * Validates input.
 * If input is not of right format - not an integer between 1-20, throws an appropriate error.
 * @param {Any} input
 * @throws {Error} if not called with an integer between 1-20
 */
const validateInput = (input) => {
    if (!Number.isInteger(input) || input <= 0) {
        throw new Error("Invalid input: must be called with a positive integer.");
    }
    if (input > 20) {
        throw new Error("Invalid input: the largest supported length is 20.");
    }
};

/**
 * Validates input options.
 * @param {Object} options
 * @throws {Error} if called with invalid options
 */
const validateOptions = (options) => {
    if (!options) {
        return;
    }
    if (typeof options.avoidModuloBias !== "boolean") {
        throw new Error("Invalid options: avoidModuloBias is a boolean.");
    }
    if (options.type === "num" && !options.wrapper) {
        throw new Error("Invalid options: Number output is only supported when a wrapper is specified.");
    }
};

/**
 * Generate secure random bytes appropriate for given length.
 * @param {Number} length
 * @return {String} random bytes
 */
const generateSecureBytes = (length) => {
    return crypto.randomBytes(Math.round(length / 2)).toString("hex");
};

/**
 * Calculate largest possible value.
 * @param {Number} length
 * @return {Number} max
 */
const calculateMax = (length) => {
    return Math.pow(10, length) - 1;
};

/**
 * Left-pad token with zeros if necessary.
 * @param {Number} length
 * @param {String} token
 * @return {String} padded token
 */
const padTokenIfNecessary = (length, token) => {
    return token.length === length ? token : token.padStart(length, '0');
};

/**
 * Generates a cryptographically secure pseudo random token string of given length.
 * This does not avoid modulo bias favouring performance.
 * @param {Number} length
 * @return {String} token
 */
const generateWithModulo = (length) => {
    const secureBytes = generateSecureBytes(length);
    const secureInt = parseInt(secureBytes, 16) % calculateMax(length);
    return padTokenIfNecessary(length, secureInt.toString());
};

/**
 * Generates a cryptographically secure pseudo random token string of given length.
 * This implementation avoids modulo bias.
 * @param {Number} length
 * @return {String} token
 */
const generateWithoutModulo = (length) => {
    let secureBytes; let secureInt;
    const max = calculateMax(length);

    while (!secureInt || secureInt > max) {
        secureBytes = crypto.randomBytes(Math.round(length / 2)).toString("hex");
        secureInt = parseInt(secureBytes, 16);
    }
    return padTokenIfNecessary(length, secureInt.toString());
};

/**
 * Generate a cryptographically secure pseudo random token string of given length.
 * By default the algorithm does not avoid modulo bias favouring performance.
 * @param {Number} length length between 1-20 (inclusive)
 * @param {Object} [options]
 * @param {Boolean} [options.avoidModuloBias=false] set true to avoid modulo bias
 * @return {String} token
 */
const generateSecureToken = (length, options) => {
    validateInput(length);
    validateOptions(options);
    return options && options.avoidModuloBias ? generateWithoutModulo(length) : generateWithModulo(length);
};

module.exports = {
    generateSecureToken,
    gen: generateSecureToken,
};
