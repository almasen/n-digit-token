import { Options } from '../types';

/**
 * Validates options.skipPadding.
 * Please read the README for more information.
 * @param length
 * @param options
 * @throws {error} if called with invalid options
 */

export const validateSkipPadding = (length: number, options?: Options) => {
    if (!options || !options.skipPadding) {
        return;
    }
    if (typeof options.skipPadding !== 'boolean') {
        throw new Error('Invalid options: skipPadding must be a boolean.');
    }
    if (options.skipPadding && length === 1) {
        throw new Error(
            'Invalid options: skipPadding can only be used with token length >1.',
        );
    }
};
