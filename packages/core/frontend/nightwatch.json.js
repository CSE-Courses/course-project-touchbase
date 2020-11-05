module.exports = {
  src_folders: ["tests/e2e"],

  webdriver: {
    start_process: true,
    // eslint-disable-next-line import/no-extraneous-dependencies,@typescript-eslint/no-var-requires,global-require
    server_path: require("chromedriver").path,
    port: 9515,
  },

  test_settings: {
    default: {
      desiredCapabilities: {
        browserName: "chrome",
      },
    },
  },
};
