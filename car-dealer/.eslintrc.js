module.exports = {
    extends: [
      'next/core-web-vitals',
      'eslint:recommended',    
      'plugin:prettier/recommended' 
    ],
    parserOptions: {
      ecmaVersion: 2020, 
      sourceType: 'module', 
    },
    rules: {
      'prettier/prettier': ['error', { singleQuote: true, trailingComma: 'all' }], 
    },
    env: {
      browser: true,
      node: true,
      es6: true,
    },
  };
  