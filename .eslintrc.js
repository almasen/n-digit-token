module.exports = {
    'env': {
        'commonjs': true,
        'es6': true,
        'node': true,
    },
    'extends': [
        'google',
    ],
    'globals': {
        'Atomics': 'readonly',
        'SharedArrayBuffer': 'readonly',
    },
    'parserOptions': {
        'ecmaVersion': 2020,
    },
    "rules": {
        "linebreak-style": 0,
        "indent": ["error", 4, {"SwitchCase": 1}],
        "new-cap": 0,
        "quotes": 0,
        "arrow-parens": 0,
        "max-len": ["error", {"code": 140}],
    },
    "ignorePatterns": ["/conf"],
};
