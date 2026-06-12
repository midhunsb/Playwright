const { test, expect } = require('@playwright/test');
let page;
let context;
test.setTimeout(300000);
test.beforeAll(async ({ browser }) => {
    context = await browser.newContext({acceptDownloads: true});
    page = await context.newPage();
    await page.goto('https://erpsgou.cdipd.in/login-official');
});
test.afterAll(async () => {
    await context.close();
});
test('SNOU Login', async () => {
    // Clicking Login Button...
    await page.locator('//*[@id="logName"]').fill('rc05verifier1');
    await page.locator('//*[@id="psWd"]').fill('654321');
    await page.locator('//*[@id="btnLogin"]').click();
    console.log("Successfully logged.......");
    await page.waitForLoadState('networkidle');
    await page.locator('//*[@id="tab-1-1"]//td[contains(normalize-space(.), "Verification Pending")]//a').click();
    for (let i = 1; i <= 100; i++) {
    console.log(`Starting preview and print ${i}`);
    await page.locator('(//*[@id="applicantLIst"]//a)[1]').click();
    await page.waitForLoadState('networkidle');
    await expect(page.locator("//*[@id='print_pdf_content']")).toBeVisible();
    await page.goBack();    
    await page.waitForLoadState('networkidle');
    }
});