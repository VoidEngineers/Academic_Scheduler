import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'

export default tseslint.config(
  { 
    ignores: ['dist'],
  },
  {
    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommended,
      'plugin:react-hooks/recommended'
    ],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser,
        es2020: true
      },
      parser: tseslint.parser,
      parserOptions: {
        project: ['./tsconfig.json'],
        tsconfigRootDir: process.cwd()
      }
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      '@typescript-eslint': tseslint
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      '@typescript-eslint/no-empty-object-type': 'warn',
      '@typescript-eslint/no-empty-interface': 'warn',
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true }
      ]
    },
    env: {
      browser: true,
      es2020: true
    }
  }
)