/**
 * Calculate largest possible value that avoids modulo bias.
 * @param {number} byteSize
 * @param {number} length
 * @return {bigint} max
 */
export const calculateMax = ({
  byteSize,
  length,
}: {
  byteSize: number;
  length: number;
}): bigint => {
  const maxDecimal = BigInt(2n ** (BigInt(byteSize) * 8n) - 1n);
  return maxDecimal - (maxDecimal % 10n ** BigInt(length)) - 1n;
};
