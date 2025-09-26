const js = require("@eslint/js");
const ts = require("@typescript-eslint/eslint-plugin");
const tsParser = require("@typescript-eslint/parser");
const globals = require("globals");

module.exports = [
  js.configs.recommended,
  {
    files: ["src/**/*.ts", "src/**/*.tsx"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: "module",
      },
      globals: globals.node,
    },
    plugins: {
      "@typescript-eslint": ts,
    },
    rules: {
      semi: ["error", "always"],
      "@typescript-eslint/no-unused-vars": "warn",
      "@typescript-eslint/no-explicit-any": "warn",
      "no-async-promise-executor": "error",
      "no-duplicate-imports": "error",
      "prefer-const": "error",
      "no-undef": "error",
      "no-empty-function": "warn",
      "consistent-return": "warn",
      "indent": ["error", 2],
    },
  },
];
