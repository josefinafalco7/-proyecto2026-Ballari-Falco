import globals from "globals";
import pluginReact from "eslint-plugin-react";
import eslintConfigPrettier from "eslint-config-prettier";
import eslintPluginPrettier from "eslint-plugin-prettier";

export default [
  {
    // Directorios y archivos que se deben ignorar globalmente
    ignores: ["dist/", "build/", "node_modules/"],
  },
  pluginReact.configs.flat.recommended,
  {
    // Aplica la configuración a todos los archivos JavaScript
    files: ["**/*.{js,mjs,cjs,jsx}"],
    plugins: {
      prettier: eslintPluginPrettier,
    },
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    rules: {
      // Reglas de tu guía
      "no-unused-vars": "warn",
      "no-undef": "error",
      "no-console": "warn",
      eqeqeq: "error",
      semi: ["error", "always"],
      quotes: ["error", "single"],
      // Regla de Prettier
      "prettier/prettier": "error",
    },
  },
  eslintConfigPrettier, // Va al final para apagar reglas que choquen
];
