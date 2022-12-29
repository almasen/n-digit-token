import { DEFAULT_BYTE_SIZE } from '../constants';
import { Options } from '../types';

/**
 * Validates options.customMemory.
 * Please read the README for more information.
 * @param length
 * @param options
 * @throws {error} if called with invalid options
 */

export const validateCustomMemory = (length: number, options?: Options) => {
    if (!options || options.customMemory === undefined) {
        return;
    }
    // check order has to follow options > 0 > undef/null
    if (options.customMemory === 0) {
        throw new Error(
            'Invalid options: customMemory must be a positive integer.',
        );
    }
    if (!Number.isInteger(options.customMemory) || options.customMemory <= 0) {
        throw new Error(
            'Invalid options: customMemory must be a positive integer.',
        );
    }
    if (options.customMemory < DEFAULT_BYTE_SIZE + length) {
        /* tslint:disable-next-line:no-console */
        console.warn(
            'Warning - scarce memory: Allocated memory is less than ideal for the algorithm, this *may* result in decreased performance.',
        );
    }
    if (options.customMemory > (DEFAULT_BYTE_SIZE + length) * 2) {
        /* tslint:disable-next-line:no-console */
        console.warn(
            'Warning - overcompensated memory: Allocated memory is more than ideal for the algorithm, this *may* result in decreased performance.',
        );
    }
};
