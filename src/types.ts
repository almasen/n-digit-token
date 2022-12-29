import { BIGINT, NUMBER, INTEGER, STRING } from './constants';

type ReturnType = typeof BIGINT | typeof NUMBER | typeof INTEGER | typeof STRING;

type Options = {
    returnType?: ReturnType;
    skipPadding?: boolean;
    customMemory?: number;
    customByteStream?: (length: number) => Buffer;
};

export { Options };
