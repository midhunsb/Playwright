const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({

  testDir: './tests',

  timeout: 600000,

  reporter: [
    ['html', { open: 'never' }]
  ],

  use: {

    ...devices['Desktop Chrome'],

    // Local = headed
    // GitHub Actions = headless
    headless: process.env.CI ? true : false,

    screenshot: 'only-on-failure',

    video: 'retain-on-failure',

    trace: 'retain-on-failure'
  },

  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
      },
    },
  ],

});