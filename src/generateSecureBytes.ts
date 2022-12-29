import { randomBytes } from 'crypto';
import { Options } from './types';

const generateSecureBytesBuffer = (length: number, options?: Options): Buffer =>
    options?.customByteStream
        ? options.customByteStream(length)
        : randomBytes(length);

/**
 * Generate secure random bytes of given length.
 * @param {number} length
 * @return {string} bytes in hex
 */
export const generateSecureBytes = (
    length: number,
    options?: Options,
): string => generateSecureBytesBuffer(length, options).toString('hex');
