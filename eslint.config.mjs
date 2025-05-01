
// @ts-check

import eslint from '@eslint/js'
import prettierConfig from 'eslint-config-prettier';
import tseslint from 'typescript-eslint'
import pluginQuery from '@tanstack/eslint-plugin-query'

export default {
  parser: '@typescript-eslint/parser',
  plugins: [
    pluginQuery,
    'jsx-a11y'
  ],
  extends: [
    eslint.configs.recommended,
    tseslint.configs.strict,
    tseslint.configs.stylistic,
    prettierConfig,
    'react-app',
    'plugin:jsx-a11y/recommended',
    'plugin:@tanstack/query/recommended',
  ],
  settings: {
    react: {
      version: 'detect'
    }
  }
}
