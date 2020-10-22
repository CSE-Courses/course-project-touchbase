module.exports = {
  extends: [
    "airbnb-base",
    "plugin:@typescript-eslint/recommended",
    "plugin:import/typescript",
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
      "typescript": {}
    },
  },
  plugins: ["@typescript-eslint", "prettier"],
  rules: {
    "prettier/prettier": "error",
    "import/extensions": [
      "error",
      "ignorePackages",
      {
        "js": "never",
        "jsx": "never",
        "ts": "never",
        "tsx": "never"
      }
   ]
  },
};
