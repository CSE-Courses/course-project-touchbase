module.exports = {
  login: (browser) => {
    browser
      .init()
      .waitForElementVisible("#app")
      .assert.elementPresent(".v-dialog")
      .setValue("#email", "test@test.com")
      .setValue("#password", "password")
      .click("#login")
      .assert.elementPresent("#app")
      .end();
  },
};
