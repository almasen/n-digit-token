/**
 * Left-pad token with zeros if necessary.
 * @param {number} length
 * @param {string} token
 * @return {string} padded token
 */
export const padTokenIfNecessary = (length: number, token: string): string =>
  token.length === length ? token : token.padStart(length, '0');
