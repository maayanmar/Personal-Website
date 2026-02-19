const { defineConfig } = require("@playwright/test");

module.exports = defineConfig({
  testDir: "./tests",
  use: {
    baseURL: "http://localhost:8080",
  },
  webServer: {
    command: "npx serve . -l 8080 --no-clipboard",
    port: 8080,
    reuseExistingServer: true,
  },
});
