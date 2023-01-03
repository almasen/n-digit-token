import type { Options } from '../types';
import { validateCustomByteStream } from './validateCustomByteStream';
import { validateCustomMemory } from './validateCustomMemory';
import { validateReturnType } from './validateReturnType';
import { validateSkipPadding } from './validateSkipPadding';

/**
 * Validates input options.
 * Please read the README for more information.
 * @param {number} length
 * @param {Options} [options]
 * @throws {error} if called with invalid options
 */
export const validateOptions = (length: number, options?: Options) => {
    if (!options) {
        return;
    }
    if ('avoidModuloBias' in options) {
        /* tslint:disable-next-line:no-console */
        console.warn(
            'Warning - deprecated option: The updated algorithm avoids modulo bias by default, therefore the avoidModuloBias option is no longer necessary and has been deprecated.',
        );
    }
    validateSkipPadding(length, options);
    validateReturnType(length, options);
    validateCustomMemory(length, options);
    validateCustomByteStream(options);
};
