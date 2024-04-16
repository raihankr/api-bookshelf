module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: 'airbnb-base',
  overrides: [
    {
      env: {
        node: true,
      },
      files: [
        '.eslintrc.{js,cjs}',
      ],
      parserOptions: {
        sourceType: 'script',
      },
    },
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    'max-len': [
      'warn',
      {
        code: 80,
      },
    ],
    'no-console': 0,
    // ESModule tidak bisa mengimpor file tanpa ekstensi, tidak seperti CommonJS
    'import/extensions': 0,
  },
};
