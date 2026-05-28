const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
      },
    },
  ],
});
module.exports = defineConfig({

  testDir: './tests',

  timeout: 600000,

  reporter: [
    ['html', { open: 'always' }]
  ],

  use: {
    headless: false,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'retain-on-failure'
  }

});