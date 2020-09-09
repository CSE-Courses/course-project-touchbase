module.exports = {
  extends: [
    "airbnb-base",
    "plugin:@typescript-eslint/recommended",
    "prettier",
    "prettier/@typescript-eslint",
    "@touchbase/extra",
  ],
  parserOptions: {
    parser: "@typescript-eslint/parser",
  },
  settings: {
    "import/extensions": [".js", ".mjs", ".jsx", ".js", ".jsx", ".ts", ".tsx", ".d.ts"],
    "import/resolver": {
      node: {
        extensions: [".js", ".jsx", ".ts", ".tsx", ".d.ts"],
      },
    },
  },
  plugins: ["@typescript-eslint", "prettier"],
  rules: {
    "prettier/prettier": "error",
  },
};
