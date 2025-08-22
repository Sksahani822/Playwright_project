// playwright.config.js
const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',
  timeout: 60 * 1000,
  reporter: 'html',
  projects: [
    {
      name: 'Chromium on Windows 10',
      use: {
        connectOptions: {
          wsEndpoint: `wss://cdp.lambdatest.com/playwright?capabilities=${encodeURIComponent(JSON.stringify({
            browserName: 'Chromium',
            browserVersion: 'latest',
            'LT:Options': {
              platform: 'Windows 10',
              build: 'Playwright Assessment',
              name: 'Scenario Tests',
              user: process.env.LT_USERNAME,
              accessKey: process.env.LT_ACCESS_KEY,
              network: true,
              console: true,
              video: true,
              screenshot: true,
            },
          }))}`,
        },
      },
    },
    {
      name: 'Firefox on macOS',
      use: {
        connectOptions: {
          wsEndpoint: `wss://cdp.lambdatest.com/playwright?capabilities=${encodeURIComponent(JSON.stringify({
            browserName: 'Firefox',
            browserVersion: 'latest',
            'LT:Options': {
              platform: 'macOS Catalina',
              build: 'Playwright Assessment',
              name: 'Scenario Tests',
              user: process.env.LT_USERNAME,
              accessKey: process.env.LT_ACCESS_KEY,
              network: true,
              console: true,
              video: true,
              screenshot: true,
            },
          }))}`,
        },
      },
    },
  ],
});
