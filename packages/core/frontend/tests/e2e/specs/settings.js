module.exports = {
  "settings menu": (browser) => {
    browser
      .init()
      .waitForElementVisible("#app")
      .assert.elementPresent(".v-dialog")
      .setValue("#email", "test@test.com")
      .setValue("#password", "password")
      .click("#login")
      .waitForElementVisible("#app")
      .assert.elementPresent("#Logo")
      .click("#Logo")
      .assert.containsText("#app", "Account Settings")
      .assert.containsText("#app", "Color Settings")
      .end();
  },
};
