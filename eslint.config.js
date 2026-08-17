import js from "@eslint/js";
import globals from "globals";

export default [
  {
    ignores: [
      ".claude/**",
      ".git/**",
      "dist/**",
      "node_modules/**",
      "raw-data/**",
      "upload/**",
      "public/assets/**",
      "public/js/domains/**/data/**",
      "public/js/domains/**/*.data.js",
      "public/js/domains/**/*.controller.js",
      "public/js/domains/**/*.schema.js",
      "public/js/domains/**/*.view.js",
      "public/js/main.js",
    ],
  },
  js.configs.recommended,
  {
    files: ["eslint.config.js", "scripts/**/*.mjs"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: globals.node,
    },
    rules: {
      "no-unused-vars": ["error", { argsIgnorePattern: "^_", caughtErrors: "none" }],
    },
  },
  {
    files: ["public/tests/**/*.mjs"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    rules: {
      "no-unused-vars": ["error", { argsIgnorePattern: "^_", caughtErrors: "none" }],
    },
  },
  {
    files: [
      "public/js/bootstrap-preferences.js",
      "public/js/core/**/*.js",
      "public/js/domains/**/*.detail.js",
      "public/js/domains/amplifiers/amplifiers.configurations.js",
      "public/js/relationships/**/*.js",
      "public/js/ui/**/*.js",
    ],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: globals.browser,
    },
    rules: {
      "no-unused-vars": ["error", { argsIgnorePattern: "^_", caughtErrors: "none" }],
    },
  },
];
