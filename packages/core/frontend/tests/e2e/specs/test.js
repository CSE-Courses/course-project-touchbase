// For authoring Nightwatch tests, see
// https://nightwatchjs.org/guide

module.exports = {
  "default e2e tests": (browser) => {
    browser
      .init()
      .waitForElementVisible("#app")
      // .assert.elementPresent('.hello')
      // .assert.containsText('h1', 'Welcome to Your Vue.js + TypeScript App')
      // .assert.elementCount('img', 1)
      .end();
  },
};
