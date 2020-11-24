/**
 * @module n-digit-token
 */

const crypto = require("crypto");

/**
 * Validates input.
 * If input is not of right format - not a positive integer,
 * throws an appropriate error.
 * @param {Any} input
 * @throws {Error} if not called with a positive integer
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
 * If input request a return type of Number without
 * a wrapper an error is thrown.
 * @param {Object} options
 */
const validateOptions = (options) => {
    if (options && options.type === "num" && !options.wrapper) {
        throw new Error("Invalid options: Number output is only supported when a wrapper is specified.");
    }
}

const generateSecureBytes = (length) => {
    return crypto.randomBytes(Math.round(length / 2)).toString("hex");
}

const calculateMax = (length) => {
    return Math.pow(10, length) - 1;
}

const padTokenIfNecessary = (length, token) => {
    return token.length === length ? token : token.padStart(length, '0');
}

const generateAndResizeToDesiredLength = (length) => {
    const secureBytes = generateSecureBytes(length);
    const secureInt = parseInt(secureBytes, 16) % calculateMax(length);
    return padTokenIfNecessary(length, secureInt.toString());
}

const generateUntilOfDesiredLength = (length) => {
    let secureBytes, secureInt;
    const max = calculateMax(length);

    while (!secureInt || secureInt > max) {
        secureBytes = crypto.randomBytes(Math.round(length / 2)).toString("hex");
        secureInt = parseInt(secureBytes, 16);
    }
    return padTokenIfNecessary(length, secureInt.toString())
}

/**
 * Generate a cryptographically secure pseudo random token
 * string of given length.
 * @param {Number} length positive integer
 * @param {Object} options
 * @param {Boolean} [options.avoidModuloBias=false] set true to avoid modulo bias
 * @return {String} token
 */
const generateSecureToken = (length, options) => {
    validateInput(length);
    validateOptions(options);
    return options && options.avoidModuloBias ? generateUntilOfDesiredLength(length) : generateAndResizeToDesiredLength(length);
};

module.exports = {
    generateSecureToken,
    gen: generateSecureToken,
};
