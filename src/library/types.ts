import { BIGINT, NUMBER, INTEGER, STRING } from './constants';

type ReturnType =
  | typeof BIGINT
  | typeof NUMBER
  | typeof INTEGER
  | typeof STRING;

export type Options = {
  returnType?: ReturnType;
  skipPadding?: boolean;
  customMemory?: number;
  customByteStream?: (length: number) => Buffer;
};

type OnlyTrueSkipPadding = {
  skipPadding?: true;
};

export type OptionsWithNumberReturnType = Options &
  OnlyTrueSkipPadding & {
    returnType: typeof NUMBER | typeof INTEGER;
  };

export type OptionsWithBigIntReturnType = Options &
  OnlyTrueSkipPadding & {
    returnType: typeof BIGINT;
  };

export type OptionsWithDefaultReturnType = Options & {
  returnType?: typeof STRING;
};
