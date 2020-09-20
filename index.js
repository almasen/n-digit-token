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
};

/**
 * Generate a cryptographically secure pseudo random token
 * string of given length.
 * @param {Number} length positive integer
 * @return {String} token
 */
const generateSecureToken = (length) => {
    validateInput(length);
    const secureBytes = crypto.randomBytes(Math.ceil(length / 2)).toString("hex");
    const secureIntString = parseInt(secureBytes, 16).toString();
    const genStringLength = secureIntString.length;
    if (genStringLength >= length) {
        return secureIntString.substring(genStringLength - length);
    } else {
        return secureIntString.padStart(length, "0");
    }
};

module.exports = {
    generateSecureToken,
    gen: generateSecureToken,
};
