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
      .assert.elementPresent("#settings-button")
      .click("#settings-button")
      .assert.containsText("#app", "Account Settings")
      .assert.containsText("#app", "Color Settings")
      .end();
  },
};
