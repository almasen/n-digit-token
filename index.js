/**
 * @module n-digit-token
 */

const crypto = require("crypto");

/**
 * Map desired token length to number of generated bytes & ideal byte
 * length combination.
 */
const lengthMap = {
    1: {
        totalBytes: 1,
        lengthCombination: [1],
    },
    2: {
        totalBytes: 1,
        lengthCombination: [1],
    },
    3: {
        totalBytes: 2,
        lengthCombination: [1, 1],
    },
    4: {
        totalBytes: 2,
        lengthCombination: [1, 1],
    },
    5: {
        totalBytes: 3,
        lengthCombination: [2, 1],
    },
    6: {
        totalBytes: 3,
        lengthCombination: [2, 1],
    },
    7: {
        totalBytes: 3,
        lengthCombination: [2, 1],
    },
    8: {
        totalBytes: 4,
        lengthCombination: [2, 2],
    },
    9: {
        totalBytes: 4,
        lengthCombination: [2, 2],
    },
    10: {
        totalBytes: 5,
        lengthCombination: [5],
    },
    11: {
        totalBytes: 5,
        lengthCombination: [5],
    },
    12: {
        totalBytes: 5,
        lengthCombination: [5],
    },
    13: {
        totalBytes: 6,
        lengthCombination: [5, 1],
    },
    14: {
        totalBytes: 6,
        lengthCombination: [5, 1],
    },
    15: {
        totalBytes: 7,
        lengthCombination: [5, 1, 1],
    },
    16: {
        totalBytes: 7,
        lengthCombination: [5, 1, 1],
    },
    17: {
        totalBytes: 8,
        lengthCombination: [5, 3],
    },
    18: {
        totalBytes: 8,
        lengthCombination: [5, 3],
    },
    19: {
        totalBytes: 8,
        lengthCombination: [5, 3],
    },
    20: {
        totalBytes: 9,
        lengthCombination: [5, 3, 1],
    },
};

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
    // if (options.type === "num" && !options.wrapper) {
    //     throw new Error("Invalid options: Number output is only supported when a wrapper is specified.");
    // }
};

/**
 * Generate secure random bytes of given length.
 * @param {Number} length
 * @return {String} random bytes
 */
const generateSecureBytes = (length) => {
    return crypto.randomBytes(length).toString("hex");
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
 * @param {Object} [options] options object
 * @return {String} token
 */
const generateWithModulo = (length, options) => {
    const secureBytes = generateSecureBytes(lengthMap[length].totalBytes);
    const secureInt = parseInt(secureBytes, 16) % calculateMax(length);
    return padTokenIfNecessary(length, secureInt.toString());
};

/**
 * Generates a cryptographically secure pseudo random token string of given length.
 * This implementation avoids modulo bias.
 * @param {Number} length
 * @param {Object} [options] options object
 * @return {String} token
 */
const generateWithoutModulo = (length, options) => {
    let secureBytes; let secureInt;
    const max = calculateMax(length);

    while (!secureInt || secureInt > max) {
        secureBytes = generateSecureBytes(lengthMap[length].totalBytes);
        secureInt = parseInt(secureBytes, 16);
    }
    return padTokenIfNecessary(length, secureInt.toString());
};

/**
 * Generate a cryptographically secure pseudo random token string of given length.
 * By default the algorithm does not avoid modulo bias favouring performance.
 * @param {Number} length length between 1-20 (inclusive)
 * @param {Object} [options] options object (optional)
 * @param {Boolean} [options.avoidModuloBias=false] set true to avoid modulo bias
 * @return {String} token
 */
const generateSecureToken = (length, options) => {
    validateInput(length);
    validateOptions(options);
    return options && options.avoidModuloBias ? generateWithoutModulo(length, options) : generateWithModulo(length, options);
};

module.exports = {
    generateSecureToken,
    gen: generateSecureToken,
};
