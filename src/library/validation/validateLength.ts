/**
 * Validates input length.
 * Throws an error if length is not a positive integer.
 * @param {number} length
 * @throws {error} if not called with a positive integer
 */
export const validateLength = (length: number): void => {
  if (!Number.isInteger(length) || length <= 0) {
    throw new Error('Invalid length: must be called with a positive integer.');
  }
};
