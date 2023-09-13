## Change log

## 2.2.1 - 2023-09-13

### Added

* Upgrade development dependencies
* Refactor add minor missing function return types
* Refactor style lint rule to use standard 2 indent width

## 2.2.0 - 2023-01-03

### Added

* More robust type system with support for advanced options validation
* Separate function signatures and JSDocs for different token return types
* Dedicated test ensuring modulo-bias is avoided
* New `randomDigits` alias following `node/crypto` naming convention
* Refactor whole package to dedicated, loosely coupled modules
* Further static tests to ensure type compatibility and safety
* Upgrade development dependencies
* Minor fixes and improvements

### Changed

* Exported function signatures to add support for conditional, more advanced type checking and documentation
* Updated default examples in docs to TypeScript

### Fixed

* Default return type not being recognised as string

## 2.1.1 - 2022-04-03

### Added

* Bump development dependencies

## 2.1.0 - 2021-11-15

### Added

* Bump development dependencies
* Refactor main & validator modules
* Clarified documentation for custom options
* Minor fixes and improvements
* Update package lock format

## 2.0.5 - 2021-08-15

### Added

* Upgrade npm lockfile version
* Bump various dev-dependencies
* Minor fixes and improvements

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
