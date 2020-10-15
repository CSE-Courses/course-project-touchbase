module.exports = {
  extends: [
    'plugin:vue/recommended',
    '@vue/airbnb',
    '@vue/typescript/recommended',
    '@vue/prettier',
    '@vue/prettier/@typescript-eslint',
    '@touchbase/extra'
  ],
  rules: {
    'class-methods-use-this': 'off'
  }
}
