## n-digit-token

Generate a cryptographically secure pseudo-random token of N digits.

[![Latest stable](https://img.shields.io/npm/v/n-digit-token/latest.svg?style=flat-square)](https://https://www.npmjs.com/package/n-digit-token)

## Quick start

`gen(n)` where `n` is the desired length/number of digits.

``` javascript
const { gen } = require('n-digit-token');

const token = gen(6);
// => '681485'
```

## Summary

This tiny module generates an n-digit cryptographically strong pseudo-random token in constant time and avoids modulo bias.

### Modulo bias

The `2.x` version of the `n-digit-token` algorithm __does avoid__ [modulo bias](https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle#Modulo_bias) therefore providing high precision even for larger tokens.

### Performance

This algorithm runs in `O(1)` constant time for up to a `1000` digit long token sizes
_(and I don't know why you would ever want larger tokens)_.

### Comparisons

| Algorithm        	| Cryptographically strong? 	| Avoids modulo bias? 	|
|------------------	|---------------------------	|---------------------	|
| average RNG      	| :x:                       	| :x:                 	|
| crypto.randomInt 	| :x:                       	| :heavy_check_mark:  	|
| n-digit-token    	| :heavy_check_mark:        	| :heavy_check_mark:  	|

As of `n-digit-token@2.x` February 2021

## Details

- [n-digit-token](#n-digit-token)
- [Quick start](#quick-start)
- [Summary](#summary)
  - [Modulo bias](#modulo-bias)
  - [Performance](#performance)
  - [Comparisons](#comparisons)
- [Details](#details)
- [Background](#background)
- [Detailed usage](#detailed-usage)
- [Algorithmic properties](#algorithmic-properties)
  - [Memory usage](#memory-usage)
- [Options](#options)
  - [options.returnType](#optionsreturntype)
    - [Return type compatibility](#return-type-compatibility)
    - [Examples](#examples)
  - [options.skipPadding](#optionsskippadding)
    - [Generating digits](#generating-digits)
      - [Generate single-digit decimal](#generate-single-digit-decimal)
      - [Generate multi-digit decimal](#generate-multi-digit-decimal)
    - [Equally random](#equally-random)
      - [Why not just discard numbers that start with 0?](#why-not-just-discard-numbers-that-start-with-0)
        - [How much discarded](#how-much-discarded)
  - [options.customMemory](#optionscustommemory)
  - [options.avoidModuloBias (deprecated)](#optionsavoidmodulobias-deprecated)
- [Test](#test)
  - [Scripts](#scripts)
- [Dependencies](#dependencies)
  - [Browserify](#browserify)
- [License](#license)

## Background

I was looking for a simple module that generates an n-digit token that could be used for 2FA among others and was surprised that I couldn't find one that uses a cryptographically secure number generator ([CSPRNG](https://en.wikipedia.org/wiki/Cryptographically_secure_pseudorandom_number_generator))

If your application needs cryptographically strong pseudo random values, this uses `crypto.randomBytes()` which provides [cryptographically strong](https://nodejs.org/api/crypto.html#crypto_crypto_randombytes_size_callback) pseudo-random data.

## Detailed usage

`gen()` is just a shorthand for `generateSecureToken()`, use whichever you prefer.

``` javascript
const { gen, generateSecureToken } = require('n-digit-token');

const token = gen(6);
// => '681485'

const anotherAuthToken = generateSecureToken(6);
// => '090188'

const anEightDigitToken = gen(8);
// => '25280789'
```

## Algorithmic properties

### Memory usage

By default the algorithm ensures modulo precision whilst also balancing performance and memory usage.

In order to achieve `O(1)` running time for lengths `1-1000` the algorithm will attempt to reserve memory linearly scaling with the desired token length.

For token sizes between `1-32` the maximum used memory will not exceed `128 bytes`.
For very large tokens, such as a `1000` digits, the max memory by default is `1 kibibyte`.

## Options

There are a few supported customisation options for the algorithm for some highly specific use cases.

Most users will **not need to change** any of these options.

|                      	| optional           	| default value 	|
|----------------------	|--------------------	|---------------	|
| options.returnType   	| :heavy_check_mark: 	| `'string'`      	|
| options.skipPadding  	| :heavy_check_mark: 	| `false`         	|
| options.customMemory 	| :heavy_check_mark: 	| N/A           	|

### options.returnType

By default the algorithm returns the generated token as a string.

This option allows you to customise the return type of the generated token.

You can choose from:
- `'string'`
- `'number'` _(alias: `'integer'`)_
- `'bigint'`

:warning: Note that only `string` guarantees a fixed length output!



#### Return type compatibility

Please refer to the below table to see the compatibility of the return types:

| return type / token length 	| 1-15               	| 16+                	|
|----------------------------	|--------------------	|--------------------	|
| string                     	| :heavy_check_mark: 	| :heavy_check_mark: 	|
| number/integer             	| :heavy_check_mark: 	| :x:                	|
| bigint                     	| :heavy_check_mark: 	| :heavy_check_mark: 	|

#### Examples

``` javascript
const { gen, generateSecureToken } = require('n-digit-token');

const token = gen(6);
=> '440835'

const anotherStringToken = gen(16, {returnType: 'string'});
=> '8384458882874956'

const aNumberToken = gen(6, {returnType: 'number'});
=> 225806

const aBigIntToken = gen(16, {returnType: 'bigint'});
=> 9680644450112709n
```



### options.skipPadding

Padding is an important concept regarding this algorithm.

If you aim to change this option, make sure to read both [skipPadding](#optionsskippadding) & [returnType](#optionsreturntype) carefully to avoid unintended consequences.

#### Generating digits

##### Generate single-digit decimal

Since this algorithm aims to generate decimal numbers from a cryptographically strong random byte stream, the distribution of the generated numbers will *mostly* follow a natural distribution.

This means that if you generate a single digit token, you are *mostly* equally likely to hit any of the decimal numbers `0-9` inclusive. Note that, you can therefore get zero as a result (as you should be able to do so).

For example, calling `gen(1)` can result in the decimal number `9` and the token `'9'`.

``` javascript
const token = gen(1);
// internally:
1) length=1 means max=9
2) roll a number between 0-9
3) convert it to string
4) return
=> '9'
```

##### Generate multi-digit decimal

On the other hand, for multi-digit tokens, you will be *mostly* equally likely to hit any of `0-99` meaning that you **can still hit a single digit decimal number**.

For example, calling `gen(2)` can internally result in the decimal number `9` again, since it is a valid random number on the range `0-99`. However, since the user wanted to receive a 2-digit token, the returned token string will need to be padded by a `0`. Therefore, you will get `'09'` as the token.

``` javascript
const token = gen(2);
// internally:
1) length=2 means max=99
2) roll a number between 0-99
3) convert it to string
4) pad if less than desired length
5) return
=> '09'
```

#### Equally random

Now you should see why it may be necessary to pad the generated numbers.

##### Why not just discard numbers that start with 0?

You might be wondering, why can't we just discard numbers that start with zeros rather than to pad them.

Whilst it would be a valid approach to say that we could just discard any numbers that are lower than the desired number of digits, it would defeat the purpose of using a cryptographically strong seed.

In order to provide the closest to a truly random distribution of generated numbers, it is essential that the minimum possible value is `0` as the CSPRNG functions provide a pseudo random stream of binary data.

###### How much discarded

Furthermore, just think about in how many cases you would need to _re-roll_ for larger tokens.
For example for `gen(6)` in order to have a `6-digit` number any numbers below `100000` would have to be discarded. That's `99999` or `10 ** (length-1) - 1` cases.

``` javascript
const token = gen(6);
=> '009542'
```

Besides, there are already many average random number generators where you can specify an integer range for both min and max that focuses less on precision.



**:warning: Varied token lengths :warning:**




| return type / padding 	| skipPadding 	| padWithZeros 	|
|-----------------------	|-------------	|--------------	|
| string                	| optional    	| default      	|
| number            	    | required    	| impossible   	|
| bigint                	| required    	| impossible   	|

### options.customMemory

This is a highly advanced option. Please read [memory usage](#memory-usage) before proceeding.

If you need to limit the used memory, you can do so by specifying the amount of bytes you can allocate via the `options.customMemory` option.

For example, if you can only allocate `8 bytes`, you could do the following:

``` javascript
const { gen, generateSecureToken } = require('n-digit-token');

const token = gen(6, {customMemory: 8});
```

**:warning: Performance implications :warning:**

Please note that both **giving too few or too much memory** to the algorithm **may negatively impact performance** by a considerable amount.

If the application detects unsuitable amount of memory, it may warn you in the debug console, but will continue to execute.

### options.avoidModuloBias (deprecated)

This setting has been deprecated as of `n-digit-token@v2.x` since the algorithm avoids modulo bias by default. Therefore, the use of this option is now unnecessary and ignored by the application.

## Test

Install the devDependencies and run `npm test` for the module tests.

### Scripts

- `npm test` to see interactive tests and coverage
- `npm run build` to compile JavaScript
- `npm run lint` to run linting

## Dependencies

`0 dependencies`

This package is solely dependent on the built-in `nodeJS/Crypto` module.

### Browserify

You may have success running this module with [crypto-browserify](https://www.npmjs.com/package/crypto-browserify), but note that this is intended for server-side use and therefore in-browser use is not natively supported.

## License

[MIT © Daniel Almasi](https://github.com/almasen/n-digit-token/blob/master/LICENSE)
