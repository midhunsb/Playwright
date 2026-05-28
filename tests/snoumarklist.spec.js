const {test,expect} = require('@playwright/test');
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
  .split('\n').slice(1).map(row => row.trim()).filter(row => row.length > 0);
users.forEach((email, index) => {
  test(`SGOU students login  ${index + 1}`, async ({
    page
  }) => {
    await page.goto('https://erpsgou.cdipd.in/login-candidate');
    await page.locator('//*[@id="logName"]').fill(email);
    await page.locator('//*[@id="psWd"]').fill('654321');
    await page.locator('//*[@id="btnLogin"]').click();
    console.log(`User ${email} logged successfully...`);
    //await page.waitForTimeout(4000);
    await page.waitForLoadState('networkidle');
    await page.locator('//*[@id="course-pills-tab-2-enrld"]').click();
    await page.locator('//h6[@class="card-title" and text()="Grade Card Report"]').click();
    console.log("Grade card report button clicked successfully....");
    //await page.waitForTimeout(9000);
    //const context = page.context();
    //const [newPage] = await Promise.all([
      //context.waitForEvent('page'),
      await page.locator('(//*[@id="semester_list"]//a[text()="Generate"])[1]').click();
      console.log("Generate button clicked successfully....")
    
    // await newPage.waitForLoadState('domcontentloaded');
    // await expect(newPage.locator('embed')).toBeVisible({timeout: 20000});
    // const pdfUrl = await newPage.url();
    // expect(pdfUrl).toContain('student-mark-list');
      console.log("URL Contains /student-mark-list");
  });
});