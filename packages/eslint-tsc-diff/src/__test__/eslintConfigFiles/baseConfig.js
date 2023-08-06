/**
 * @baseConfig this config is copied to other .eslintrc files with the script <monorepoRoot>/scripts/generateEslintTestFiles.ts
 */
module.exports = {
  plugins: ['@nx'],
  parserOptions: {
    EXPERIMENTAL_useProjectService: true,
  },
  rules: {
    'import/no-cycle': ['error'],
    'import/order': ['warn', { groups: ['builtin', 'external', 'object'] }],
  },
}
