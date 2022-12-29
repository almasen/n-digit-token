import { Options } from '../types';

/**
 * Validates type of options.customByteStream.
 * Please read the README for more information.
 * @param options
 * @throws {error} if called with invalid options
 */

export const validateCustomByteStream = (options?: Options) => {
    if (!options || !options.customByteStream) {
        return;
    }
    if (typeof options.customByteStream !== 'function') {
        throw new Error('Invalid options: customByteStream must be a function that returns a byte Buffer.');
    }
};
