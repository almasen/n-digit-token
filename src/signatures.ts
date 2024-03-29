import type {
  OptionsWithNumberReturnType,
  OptionsWithBigIntReturnType,
  OptionsWithDefaultReturnType,
} from './library';

export type TokenGenerator = {
  /**
   * Generate a cryptographically secure pseudo random token of given number of digits.
   *
   * This algorithm avoids modulo bias and runs in constant time for lengths <= 1000.
   *
   * By default the algorithm returns the token as string which may start with zeros.
   * This can be customised via the options object, please consult the documentation if interested.
   * @param {number} length desired token length
   * @param {Options} [options] options object (optional)
   * @param {string} [options.returnType='string'] desired return type (default=`'string'`)
   * @param {boolean} [options.skipPadding=false] set to true to avoid leading zeros in string tokens (default=false)
   * @param {number} [options.customMemory] memory used in bytes WARNING: Advanced option, use with caution!!
   * @param {number} [options.customByteStream] specify custom CSPRNG byte stream function WARNING: Advanced option, use with caution!!
   * @return {string} token (as string by default)
   * @example
   *
   * // ** Default use (recommended) **
   * const token: string = generateSecureToken(6);
   * // => '012345' (token is padded with leading zeros if necessary)
   *
   * // ** Advanced use **
   * const tokenWithSkipPadding: string = generateSecureToken(6, { skipPadding: true });
   * // => '12345' (padding is skipped, WARNING: this may result in tokens with variable length)
   */
  (length: number, options?: OptionsWithDefaultReturnType): string;

  /**
   * Generate a cryptographically secure pseudo random token of given number of digits.
   *
   * This algorithm avoids modulo bias and runs in constant time for lengths <= 1000.
   *
   * With this option the token is returned as a number and leading zeros are always removed.
   * @param {number} length desired token length
   * @param {Options} [options] options object (optional)
   * @param {string} [options.returnType='string'] desired return type (default=string)
   * @param {boolean} [options.skipPadding=true] always `true` with non-string return types
   * @param {number} [options.customMemory] memory used in bytes WARNING: Advanced option, use with caution!!
   * @param {number} [options.customByteStream] specify custom CSPRNG byte stream function WARNING: Advanced option, use with caution!!
   * @return {number} token (as string by default)
   * @example
   *
   * const token: number = generateSecureToken(6, { returnType: 'number' });
   * // => 12345 (leading zeros are removed)
   */
  (length: number, options: OptionsWithNumberReturnType): number;

  /**
   * Generate a cryptographically secure pseudo random token of given number of digits.
   *
   * This algorithm avoids modulo bias and runs in constant time for lengths <= 1000.
   *
   * With this option the token is returned as a bigint and leading zeros are always removed.
   * @param {number} length desired token length
   * @param {Options} [options] options object (optional)
   * @param {string} [options.returnType='string'] desired return type (default=string)
   * @param {boolean} [options.skipPadding=true] always `true` with non-string return types
   * @param {number} [options.customMemory] memory used in bytes WARNING: Advanced option, use with caution!!
   * @param {number} [options.customByteStream] specify custom CSPRNG byte stream function WARNING: Advanced option, use with caution!!
   * @return {bigint} token (as string by default)
   * @example
   *
   * const token: bigint = generateSecureToken(6, { returnType: 'bigint' });
   * // => 12345n (leading zeros are removed)
   */
  (length: number, options: OptionsWithBigIntReturnType): bigint;
};
