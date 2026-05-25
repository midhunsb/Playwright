const { test, expect } = require('@playwright/test');
let page;
let context;
test.setTimeout(300000);
test.beforeAll(async ({ browser }) => {
    context = await browser.newContext({acceptDownloads: true});
    page = await context.newPage();
    await page.goto('https://erpsgou.cdipd.in');
});
test.afterAll(async () => {
    await context.close();
});
test('SNOU Login', async () => {
    // Clicking Login Button...
    await page.locator('//*[@id="profileDropdown"]').click();
    await page.locator('//div//p[@class="small m-0 ms-2"]//a[@href="login-official"]').click();
    await page.locator('//*[@id="logName"]').fill('ce@sgou.ac.in');
    await page.locator('//*[@id="psWd"]').fill('654321');
    await page.locator('//*[@id="btnLogin"]').click();
    console.log("Successfully logged.......");
    await page.waitForTimeout(3000);
    await page.locator('//*[@id="headingExamAttendanceReport"]').click();
    await page.locator('//*[@id="collapseExamAttendanceReport"]//span[1]').click();
    await page.waitForTimeout(3000);
    await page.locator('//input[@role="combobox"]').click();
    await page.locator('//span[contains(text(),"Examination Calendar 2022 (CAL2)")]').click();
    await page.locator('//*[@id="btnList"]').click();
    console.log('Examination Calendar 2022 (CAL2) selected from the dropdown');
    await page.locator('//*[@id="tblExam"]').waitFor({ state: 'visible' });
    for (let i = 1; i <= 100; i++) {
        console.log(`Starting download ${i}`);
        // Wait for download event
        const downloadPromise = page.waitForEvent('download');
        // Click download button
        await page.locator('//*[@id="datatable4_wrapper"]//button[2]').click();
        // Get download object
        const download = await downloadPromise;
        // Unique filename
        const timestamp = Date.now();
        const fileName = `Exam_Report_${i}_${timestamp}.xlsx`;
        // Save file
        await download.saveAs(`D:/PlaywrightDownloads/${fileName}`);
        console.log(`Downloaded: ${fileName}`);
        // Wait 3 seconds before next download
        await page.waitForTimeout(3000);
    }
});