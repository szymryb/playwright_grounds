import js from '@eslint/js';
import { defineConfig } from 'eslint/config';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default defineConfig([
  { ignores: ['package-lock.json', 'playwright-report/**', 'test-results/**'] },
  {
    files: ['**/*.ts'],
    plugins: { js },
    extends: ['js/recommended'],
    languageOptions: {
      globals: globals.node,
    },
  },
  tseslint.configs.recommended,
  {
    rules: {
      'no-console': 'error',
    },
  },
]);
