const { test, expect } = require('@playwright/test');
const fs = require('fs');
const path = require('path');
test.setTimeout(600000);
test.describe.configure({
  mode: 'parallel'
});
// CSV file path
const csvPath = path.join(__dirname, '../test-data/sgoustudentsmarklist.csv');
// Read CSV
const csvData = fs.readFileSync(csvPath, 'utf-8');
// Convert CSV rows to array
const users = csvData.split('\n').slice(1).map(row => row.trim()).filter(row => row.length > 0);
users.forEach((email, index) => {
  test(`SGOU students login ${index + 1}`, async ({ page }) => {
    await page.goto('https://erpsgou.cdipd.in/login-candidate');
    await page.locator('#logName').fill(email);
    await page.locator('#psWd').fill('654321');
    await page.locator('#btnLogin').click();
    console.log(`User ${email} logged successfully...`);
    await page.waitForLoadState('networkidle');
    await page.locator('#course-pills-tab-2-enrld').click();
    await page.locator('//h6[text()="Grade Card Report"]').click();
    console.log("Grade card report button clicked successfully....");
    const context = page.context();
    const [newPage] = await Promise.all([
      context.waitForEvent('page'),
      page.locator('(//*[@id="semester_list"]//a[text()="Generate"])[1]').click()
    ]);
    // Wait until PDF page fully opens
    await newPage.waitForLoadState();
    // Wait for URL contains expected text
    await expect(newPage).toHaveURL(/student-mark-list/);
    const pdfUrl = newPage.url();
    console.log("PDF URL:", pdfUrl);
    // Validate response
    const response = await newPage.goto(pdfUrl);
    expect(response.status()).toBe(200);
    console.log("PDF loaded successfully...");
  });

});