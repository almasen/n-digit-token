/**
 * @module types
 */

type ReturnType = 'string' | 'number' | 'bigint' | 'integer';

type Options = {
    returnType?: ReturnType;
    skipPadding?: boolean;
    customMemory?: number;
    customByteStream?: (length: number) => Buffer;
};

export { Options };
