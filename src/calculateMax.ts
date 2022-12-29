/**
 * Calculate largest possible value that avoids modulo bias.
 * @param {number} byteCount
 * @param {number} length
 * @return {bigint} max
 */
export const calculateMax = (byteCount: number, length: number): bigint => {
    const maxDecimal = BigInt(2n ** (BigInt(byteCount) * 8n) - 1n);
    return maxDecimal - (maxDecimal % 10n ** BigInt(length)) - 1n;
};
