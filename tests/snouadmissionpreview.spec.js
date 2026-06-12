const { test, expect } = require('@playwright/test');
const fs = require('fs');
const path = require('path');
test.setTimeout(600000);
test.describe.configure({ mode: 'parallel' });
const csvPath = path.join(__dirname, '../test-data/sgouadmissionstudents.csv');
const csvData = fs.readFileSync(csvPath, 'utf-8');
const users = csvData.split('\n').slice(1).map(row => row.trim()).filter(row => row.length > 0);
users.forEach((email, index) => {
  test(`SGOU students login ${index + 1}`, async ({ page }) => {
    await page.goto('https://erpsgou.cdipd.in/login-candidate');
    await page.locator('//*[@id="logName"]').fill(email);
    await page.locator('//*[@id="psWd"]').fill('Test@123');
    await page.locator('//*[@id="btnLogin"]').click();
    console.log(`User ${email} logged successfully...`);
    for (let i = 1; i <= 100; i++) {
    console.log(`Starting preview and print ${i} for ${email}`);
    await page.locator('//*[@id="offcanvasNavbar"]//a[contains(normalize-space(.),"My Application")]').click();
    await page.goBack();    
    await page.waitForLoadState('networkidle');
    }
  });
});