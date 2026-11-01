import globals from 'globals';
import pluginReact from 'eslint-plugin-react';
import pluginReactHooks from 'eslint-plugin-react-hooks';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';

export default [
  {
    // Directorios y archivos que se deben ignorar globalmente
    ignores: ['dist/', 'build/', 'node_modules/', 'out/'],
  },
  pluginReact.configs.flat.recommended,
  // Permite usar JSX sin escribir "import React" en cada archivo
  pluginReact.configs.flat['jsx-runtime'],
  // Verifica el uso correcto de los Hooks (useState, useEffect, etc.)
  pluginReactHooks.configs.flat.recommended,
  {
    // Aplica la configuración a todos los archivos JavaScript
    files: ['**/*.{js,mjs,cjs,jsx}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    settings: {
      react: { version: 'detect' },
    },
    rules: {
      'no-unused-vars': 'warn',
      'no-undef': 'error',
      'no-console': 'warn',
      eqeqeq: 'error',
      semi: ['error', 'always'],
      quotes: ['error', 'single'],
    },
  },
  // Va al final: apaga reglas que chocan con Prettier y aplica su formato
  eslintPluginPrettierRecommended,
];
