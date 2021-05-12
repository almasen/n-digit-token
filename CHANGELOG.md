## Change log

## 2.0.4 - 2021-05-11

### Added

* CI workflow for automatic GitHub release generation
* Updated some `dev-dependencies` to their newer versions as per [#5](https://github.com/almasen/n-digit-token/pull/5)

### Changed

* Minor documentation improvements regarding customisation options

## 2.0.3 - 2021-04-14

### Added

* Further support for in-browser use such as use with `crypto-browserify`

## 2.0.2 - 2021-03-20

### Added

* Support for custom random byte streams such as `crypto-browserify`

## 2.0.1 - 2021-02-23

### Fixed

* Conflict in deployment CI workflow due to beta version

## 2.0.0 - 2021-02-22

**Complete TypeScript rewrite**

### Added

* Support for arbitrary token lengths with full precision
* Complete avoidance of [modulo bias](https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle#Modulo_bias) (by default)
* Performance & memory optimisations achieving a constant `O(1)` run time (for `length` <= `1000`)
* Type declarations and type safety
* Various customisation options:
  * `returnType` to specify returned token type as `string | number | bigint`
  * `skipPadding` to avoid leading zeros
  * `customMemory` to allocate a custom amount of memory to the algorithm
* `100%` test coverage

### Changed

* `v1.x` has been deprecated in favour of fully superior `v2.x`
* In order to achieve modulo precision with high performance, support of `BigInt` literals is required
* New minimum required nodeJS version is `node >= 10.4.0`
* `options.avoidModuloBias` has been deprecated as `n-digit-token@2.x` has this built-in

### Fixed

* Fixed occasional rounding error for token sizes `>= 12`
* Fixed trailing zeros for token sizes `>=16`
* Generating a single digit token on some environment settings would never return a `9`
* Fixed sometimes slow performance when avoiding modulo bias
* Fixed occasional excessive memory usage when generating `20-digit` tokens

### 1.x - 1.3.3 deprecated in favour of v2.x
