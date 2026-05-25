const { test, expect } = require('@playwright/test');
const fs = require('fs');
const path = require('path');

test.describe.configure({ mode: 'parallel' });
// CSV file path
const csvPath = path.join(__dirname, '../test-data/sgoustudentsadmitcard.csv');
// Read CSV
const csvData = fs.readFileSync(csvPath, 'utf-8');
// Convert CSV rows to array
const users = csvData
.split('\n').slice(1).map(row => row.trim()).filter(row => row.length > 0);
users.forEach((email, index) => {
  test(`SGOU students login  ${index + 1}`, async ({ page }) => {
    await page.goto('https://erpsgou.cdipd.in/login-candidate');
    await page.locator('//*[@id="logName"]').fill(email);
    await page.locator('//*[@id="psWd"]').fill('654321');
    await page.locator('//*[@id="btnLogin"]').click();
    console.log(`User ${email} logged successfully...`);
    await page.locator('(//*[@id="dashboard"]//div[@class="mt-2"]//a)[1]').click();
    console.log("Download admit button clicked successfully....");
    await expect(page.locator('//*[@id="print_pdf_content"]')).toBeVisible();
  });
});