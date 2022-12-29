import { BIGINT, INTEGER, NUMBER } from './constants';
import { padTokenIfNecessary } from './padTokenIfNecessary';
import { Options } from './types';

/**
 * Handle token return type and format based on user options.
 * @param {bigint} secureBigIntToken token
 * @param {number} length
 * @param {Options} [options]
 * @return {string|number|bigint} formatted token
 */
export const handleOptions = (
    secureBigIntToken: bigint,
    length: number,
    options?: Options,
): string | number | bigint => {
    if (!options) {
        return padTokenIfNecessary(length, secureBigIntToken.toString(10));
    }

    switch (options.returnType) {
        case BIGINT:
            return secureBigIntToken;

        case NUMBER:
        case INTEGER:
            return Number(secureBigIntToken);

        default:
            const tokenString = secureBigIntToken.toString(10);
            return options.skipPadding
                ? tokenString
                : padTokenIfNecessary(length, tokenString);
    }
};
