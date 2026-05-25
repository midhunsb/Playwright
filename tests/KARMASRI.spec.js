const { test, expect } = require('@playwright/test');
const fs = require('fs');
const path = require('path');

test.describe.configure({ mode: 'parallel' });
// CSV file path
const csvPath = path.join(__dirname, '../test-data/users.csv');
// Read CSV
const csvData = fs.readFileSync(csvPath, 'utf-8');
// Convert CSV rows to array
const users = csvData
  .split('\n')
  .slice(1)
  .map(row => row.trim())
  .filter(row => row.length > 0);

users.forEach((email, index) => {
  test(`KARMASRI Login User ${index + 1}`, async ({ page }) => {
    await page.goto('https://karmasri.kerala.gov.in/login');
    await page.locator('#email').fill(email);
    await page.locator('#password').fill('User@123');
    await page.locator("button[type='submit']").click();
    // await page.waitForTimeout(10000);
    const viewProfileBtn = page.locator("//div//button[text()='View Profile']");
    if (await viewProfileBtn.isVisible()) 
      {
      await viewProfileBtn.click();
    } else {
      await expect(
        page.locator('(//span[@class="absolute inset-0"])[4]')).toHaveText(/KARMASRI/);
    }
  });
});