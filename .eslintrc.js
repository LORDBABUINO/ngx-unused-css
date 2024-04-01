module.exports = {
  env: {
    browser: true,
    es2021: true,
    jest: true
  },
  extends: ['standard'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module'
  },
  plugins: ['@typescript-eslint'],
  rules: {
    semi: 0,
    '@typescript-eslint/no-explicit-any': 2,
    'no-useless-constructor': 'off',
    '@typescript-eslint/no-useless-constructor': 'error',
    'space-before-function-paren': 'off'
  }
};
