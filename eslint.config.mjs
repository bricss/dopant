import ultraRefined from 'eslint-config-ultra-refined';

export default [
  ...ultraRefined,
  {
    ignores: ['dist'],
    languageOptions: {
      sourceType: 'script',
    },
  },
];
