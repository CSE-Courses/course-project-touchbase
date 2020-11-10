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
      .assert.elementPresent("#app")
      .end();
  },
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
  failedRegistration: (browser) => {
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
