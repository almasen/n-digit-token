/**
 * @module validator
 */

import { DEFAULT_BYTE_SIZE } from './constants';
import type { Options } from './types';

/**
 * Validates input length.
 * Throws an error if length is not a positive integer.
 * @param {number} length
 * @throws {error} if not called with a positive integer
 */
const validateLength = (length: number) => {
    if (!Number.isInteger(length) || length <= 0) {
        throw new Error('Invalid length: must be called with a positive integer.');
    }
};

/**
 * Validates input options.
 * Please read the README for more information.
 * @param {number} length
 * @param {Options} [options]
 * @throws {error} if called with invalid options
 */
const validateOptions = (length: number, options?: Options) => {
    if (!options) {
        return;
    }
    if ('avoidModuloBias' in options) {
        /* tslint:disable-next-line:no-console */
        console.warn('Warning - deprecated option: The updated algorithm avoids modulo bias by default, therefore the avoidModuloBias option is no longer necessary and has been deprecated.');
    }
    validateSkipPadding(length, options);
    validateReturnType(length, options);
    validateCustomMemory(length, options);
    validateCustomByteStream(options);
};

/**
 * Validates options.skipPadding.
 * Please read the README for more information.
 * @param length
 * @param options
 * @throws {error} if called with invalid options
 */
const validateSkipPadding = (length: number, options?: Options) => {
    if (!options || !options.skipPadding) {
        return;
    }
    if (typeof options.skipPadding !== 'boolean') {
        throw new Error('Invalid options: skipPadding must be a boolean.');
    }
    if (options.skipPadding && length === 1) {
        throw new Error('Invalid options: skipPadding can only be used with token length >1.');
    }
};

/**
 * Validates options.returnType.
 * Please read the README for more information.
 * @param length
 * @param options
 * @throw {error} if called with invalid options
 */
const validateReturnType = (length: number, options?: Options) => {
    if (!options || !options.returnType) {
        return;
    }
    if (typeof options.returnType !== 'string') {
        throw new Error("Invalid options: returnType must be specified in a string. For example 'number' or 'string'.");
    }
    const returnType = options.returnType.toLowerCase();
    switch (returnType) {
        case 'number':
        case 'integer':
            if (length > 15) {
                throw new Error('Invalid options: number (integer) return type is too small for length of 15+ digits. Please consider using BigInt or String as return type.');
            }
        case 'bigint':
            if ('skipPadding' in options && !options.skipPadding) {
                throw new Error('Invalid options: skipPadding must be enabled with non-string return types. Please consult the documentation for further information.');
            }
            break;

        case 'string':
            break;

        default:
            throw new Error(`Invalid return type: Please choose one of string | number | bigint.`);
    }
};

/**
 * Validates options.customMemory.
 * Please read the README for more information.
 * @param length
 * @param options
 * @throws {error} if called with invalid options
 */
const validateCustomMemory = (length: number, options?: Options) => {
    if (!options || !options.customMemory) {
        return;
    }
    // check order has to follow options > 0 > undef/null
    if (options.customMemory === 0) {
        throw new Error('Invalid options: customMemory must be a positive integer.');
    }
    if (!Number.isInteger(options.customMemory) || options.customMemory <= 0) {
        throw new Error('Invalid options: customMemory must be a positive integer.');
    }
    if (options.customMemory < DEFAULT_BYTE_SIZE + length) {
        /* tslint:disable-next-line:no-console */
        console.warn('Warning - scarce memory: Allocated memory is less than ideal for the algorithm, this *may* result in decreased performance.');
    }
    if (options.customMemory > (DEFAULT_BYTE_SIZE + length) * 2) {
        /* tslint:disable-next-line:no-console */
        console.warn('Warning - overcompensated memory: Allocated memory is more than ideal for the algorithm, this *may* result in decreased performance.');
    }
};

/**
 * Validates type of options.customByteStream.
 * Please read the README for more information.
 * @param options
 * @throws {error} if called with invalid options
 */
const validateCustomByteStream = (options?: Options) => {
    if (!options || !options.customByteStream) {
        return;
    }
    if (typeof options.customByteStream !== 'function') {
        throw new Error('Invalid options: customByteStream must be a function that returns a byte Buffer.');
    }
};

export { validateLength, validateOptions };
