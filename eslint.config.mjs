
// @ts-check

import eslint from '@eslint/js'
import prettierConfig from 'eslint-config-prettier';
import tseslint from 'typescript-eslint'
import pluginQuery from '@tanstack/eslint-plugin-query'
import reactPlugin from 'eslint-plugin-react'
import reactHooksPlugin from 'eslint-plugin-react-hooks'

export default {
  parser: '@typescript-eslint/parser',
  plugins: [
    pluginQuery,
    reactPlugin,
    reactHooksPlugin
  ],
  extends: [
    eslint.configs.recommended,
    tseslint.configs.strict,
    tseslint.configs.stylistic,
    prettierConfig,
    'plugin:@tanstack/query/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended'
  ],
  settings: {
    react: {
      version: 'detect'
    }
  }
}
