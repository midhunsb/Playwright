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
const users = csvData
  .split('\n')
  .slice(1)
  .map(row => row.trim())
  .filter(row => row.length > 0);

users.forEach((email, index) => {

  test(`SGOU students login ${index + 1}`, async ({ page }) => {

    // Open Login Page
    await page.goto('https://erpsgou.cdipd.in/login-candidate');

    // Login
    await page.locator('#logName').fill(email);
    await page.locator('#psWd').fill('654321');
    await page.locator('#btnLogin').click();
    console.log(`User ${email} logged successfully...`);
    // Wait for dashboard
    await page.waitForLoadState('domcontentloaded');
    // Open enrolled course tab
    await page.locator('#course-pills-tab-2-enrld').click();
    // Open Grade Card Report
    await page.locator(
      '//h6[@class="card-title" and text()="Grade Card Report"]'
    ).click();
    console.log("Grade card report button clicked successfully....");
    const generateButton = page.locator(
  '(//*[@id="semester_list"]//a[text()="Generate"])[1]'
);
const context = page.context();
// Start listeners BEFORE click
const popupPromise = context.waitForEvent('page').catch(() => null);
const responsePromise = page.waitForResponse(
  response =>
    response.url().includes('student-mark-list') &&
    response.status() === 200
).catch(() => null);
// Single click only
await generateButton.click();
console.log("Generate button clicked successfully....");
// Wait for either popup or response
const newPage = await popupPromise;
if (newPage) {
  // LOCAL FLOW
  await newPage.waitForLoadState('domcontentloaded');
  const pdfUrl = newPage.url();
  console.log("PDF opened in new tab:", pdfUrl);
  expect(pdfUrl).toContain('student-mark-list');
} else {
  // GITHUB ACTIONS FLOW
  const pdfResponse = await responsePromise;
  expect(pdfResponse).not.toBeNull();
  console.log("PDF response URL:", pdfResponse.url());
  expect(pdfResponse.url()).toContain('student-mark-list');
}
console.log("PDF validation completed successfully...");
  });
});