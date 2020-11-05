module.exports = {
  registration: (browser) => {
    browser
      .init()
      .waitForElementVisible("#app")
      .assert.elementPresent(".v-dialog")
      .click("#create")
      .setValue("#email", "test@test.com")
      .setValue("#password", "password")
      .click("#register")
      .assert.containsText(
        "#app",
        "Account creation has failed! Please contact an administrator for assistance."
      )
      .end();
  },
};
