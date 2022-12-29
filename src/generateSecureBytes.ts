import { randomBytes } from 'crypto';
import type { Options } from './types';

/**
 * Generate secure random bytes of given length.
 * @param {number} length
 * @return {string} bytes in hex
 */
export const generateSecureBytes = (length: number, options?: Options): string => 
    options && options.customByteStream ? options.customByteStream(length).toString('hex') : randomBytes(length).toString('hex');
