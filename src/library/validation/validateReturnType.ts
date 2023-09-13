import { BIGINT, INTEGER, NUMBER, STRING } from '../constants';
import type { Options } from '../types';

/**
 * Validates options.returnType.
 * Please read the README for more information.
 * @param length
 * @param options
 * @throw {error} if called with invalid options
 */

export const validateReturnType = (length: number, options?: Options): void => {
    if (!options || !options.returnType) {
        return;
    }
    if (typeof options.returnType !== 'string') {
        throw new Error(
            "Invalid options: returnType must be specified in a string. For example 'number' or 'string'.",
        );
    }

    switch (options.returnType) {
        case NUMBER:
        case INTEGER:
            if (length > 15) {
                throw new Error(
                    'Invalid options: number (integer) return type is too small for length of 15+ digits. Please consider using BigInt or String as return type.',
                );
            }
        case BIGINT:
            if ('skipPadding' in options && !options.skipPadding) {
                throw new Error(
                    'Invalid options: skipPadding must be enabled with non-string return types. Please consult the documentation for further information.',
                );
            }
            break;

        case STRING:
            break;

        default:
            throw new Error(
                `Invalid return type: Please choose one of string | number | bigint.`,
            );
    }
};
