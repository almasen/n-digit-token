/**
 * @module types
 */

const DEFAULT_BYTE_SIZE = 64;

/**
 * Customisation options object.
 * @type {{ returnType?: string, skipPadding?: boolean | customMemory?: number | customByteStream?: () => Buffer }}
 */
type Options = {
    returnType?: 'string' | 'number' | 'bigint';
    skipPadding?: boolean;
    customMemory?: number;
    customByteStream?: (length: number) => Buffer;
};

export { DEFAULT_BYTE_SIZE, Options };
