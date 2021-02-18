## n-digit-token

Generate a cryptographically secure pseudo-random token of N digits.

## Quick start

`gen(n)` where `n` is the desired length/number of digits.

``` javascript
const { gen } = require('n-digit-token');

const token = gen(6);
// => '681485'
```

## Introduction

This tiny module generates an n-digit cryptographically strong pseudo-random token.

### Background

A cryptographically secure pseudorandom number generator ([CSPRNG](https://en.wikipedia.org/wiki/Cryptographically_secure_pseudorandom_number_generator)).

I was looking for a simple module that generates an n-digit token that could be used for 2FA among others and was surprised that I couldn't find one that uses a cryptographically secure number generator.

If your application needs cryptographically strong pseudo random values, this uses `crypto.randomBytes()` which provides [cryptographically strong](https://nodejs.org/api/crypto.html#crypto_crypto_randombytes_size_callback) pseudo-random data.

### Modulo bias

The default configuration of `n-digit-token` does __not__ avoid [modulo bias](https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle#Modulo_bias) in favour of performance.

If your application requires an algorithm that avoids modulo bias, you can set this in the [options](#options).

### Comparisons

| Algorithm                            	| Cryptographically strong? 	| Avoids modulo bias? 	|
|--------------------------------------	|---------------------------	|---------------------	|
| average RNG                          	| :x:                        	| :x:                  	|
| crypto.randomInt                     	| :x:                        	| :heavy_check_mark:   	|
| n-digit-token (default config)       	| :heavy_check_mark:           	| :x:                  	|
| n-digit-token (avoidModuloBias=true) 	| :heavy_check_mark:           	| :heavy_check_mark:  	|

_As of January 2021_

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

Maximum supported token length is 20.

## Options

### options.avoidModuloBias

This setting defaults to `false` in favour of performance.

Set this `true` if you need an algorithm that avoids modulo bias.

``` javascript
const token = gen(6, { avoidModuloBias: true });
// => '194127'
```

Please note that setting this option may considerably impact performance for tokens of larger sizes (10+).

_skip-padding & return type options coming soon_

## Test

Install the devDependencies and run `npm test` for the module tests.

### Scripts

- `npm run lint` to run eslint
- `npm run extended-test` runs 1000 iterations of each test scenario

### Dependencies

This package is solely dependent on the built-in `nodeJS/Crypto` module.

#### Browserify

You may have success running this module with [crypto-browserify](https://www.npmjs.com/package/crypto-browserify), but note that this is intended for server-side use.

## License

[MIT © Daniel Almasi](https://github.com/almasen/n-digit-token/blob/master/LICENSE)
