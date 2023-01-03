import {
    validateLength,
    validateOptions,
    generateWithoutModuloBias,
    Options,
    handleOptions,
} from './library';
import { TokenGenerator } from './signatures';

export const generateSecureToken = ((length: number, options?: Options) => {
    validateLength(length);
    validateOptions(length, options);
    const secureBigIntToken = generateWithoutModuloBias(length, options);
    return handleOptions(secureBigIntToken, length, options);
}) as TokenGenerator;
