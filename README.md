## n-digit-token

Generate a cryptographically secure pseudo-random token of N digits.

## Quick start

``` javascript
const { gen } = require('n-digit-token');

const token = gen(6);
// => '681485'
```

## Introduction

This tiny module generates an n-digit cryptographically strong pseudo-random token.

### Background

I was looking for a simple module that generates an n-digit token that could be used for 2FA among others and was surprised that I couldn't find one that uses a cryptographically secure number generator.

If your application needs cryptographically strong pseudo random values, this uses `crypto.randomBytes()` which provides cryptographically strong pseudo-random data.

## Detailed usage

`gen(n)` where `n` is the desired length/number of digits.

``` javascript
const { gen } = require('n-digit-token');

const token = gen(6);
// => '681485'

const anotherAuthToken = gen(6);
// => '090188'

const anEightDigitToken = gen(8);
// => '25280789'
```

__Alias__

`gen()` is an alias of `generateSecureToken()`.

``` javascript
const { gen, generateSecureToken } = require('n-digit-token');

const lazyToken = gen(6);
// => '973351'

const meLikeLongFunctionNames = generateSecureToken(6);
// => '811358'
```

__Also__

You can do this too but I'm not sure why you would want to..

``` javascript
const tokenGenerator = require('n-digit-token');

const uuhh = tokenGenerator.gen(6);
// => '040821'
```

## Options

TODO: coming soon

## Test

Run `npm test` for the module tests.

### Scripts

- `npm run lint` to run eslint
- `npm run stress-test` runs for ~10 seconds

### Dependencies

This package is solely dependent on the built in `nodeJS/Crypto` module.

## License

[MIT © Daniel Almasi](https://github.com/almasen/n-digit-token/blob/master/LICENSE)