const tsconfig = require('./tsconfig.base.json')

/**
 * aliases should not have asterisks or trailing slashes
 */
const aliasMap = Object.entries(tsconfig.compilerOptions.paths).map(
  ([key, value]) => [key.replace('/*', ''), value[0].replace('*', '')],
)

module.exports = {
  root: true,
  extends: ['plugin:import/recommended'],
  plugins: ['@nx'],
  // noInlineConfig: true, // due to having eslintConfig test files eslint does not ignore them even with ignore paths specified.
  settings: {
    'import/resolver': {
      typescript: true,
      node: true,
      alias: {
        map: aliasMap,
        extensions: ['.ts', '.js', '.jsx', '.json'],
      },
    },
  },
  parserOptions: {
    EXPERIMENTAL_useProjectService: true,
  },
  rules: {
    'import/no-cycle': ['error'],
    'import/order': ['warn', { groups: ['builtin', 'external', 'object'] }],
  },
  overrides: [
    {
      files: ['*.ts', '*.tsx', '*.js', '*.jsx'],
      rules: {
        '@nx/enforce-module-boundaries': [
          'error',
          {
            enforceBuildableLibDependency: true,
            allow: [],
            depConstraints: [
              {
                sourceTag: '*',
                onlyDependOnLibsWithTags: ['*'],
              },
            ],
          },
        ],
      },
    },
    {
      files: ['*.ts', '*.tsx'],
      extends: ['plugin:@nx/typescript'],
      rules: {
        'import/no-cycle': ['error'],
      },
    },
    {
      files: ['*.js', '*.jsx'],
      extends: ['plugin:@nx/javascript'],
      rules: {},
    },
    {
      files: ['*.spec.ts', '*.spec.tsx', '*.spec.js', '*.spec.jsx'],
      env: {
        jest: true,
      },
      rules: {},
    },
  ],
}
