import { DEFAULT_BYTE_SIZE } from './constants';
import type { Options } from './types';

/**
 * Calculate total size of byte stream to be generated.
 * @param {number} length
 * @param {Options} [options]
 * @return {number} required number of bytes
 */
export const calculateByteSize = (length: number, options?: Options): number =>
  options?.customMemory || DEFAULT_BYTE_SIZE + length;
