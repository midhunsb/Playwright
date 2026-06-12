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
    await page.locator('//*[@id="profileDropdown"]').click();
    await page.locator('//div//p[@class="small m-0 ms-2"]//a[@href="login-official"]').click();
    await page.locator('//*[@id="logName"]').fill('cverifierug@sgou.ac.in');
    await page.locator('//*[@id="psWd"]').fill('654321');
    await page.locator('//*[@id="btnLogin"]').click();
    console.log("Successfully logged.......");
    await page.locator('(//a[@class="dashboard-button bg-dark text-light p-2 text-center"])[1]').click();
    await page.locator('//*[@id="ex1-tab-3"]').click();
    console.log("Ordinary button clicked successfully....");
    await page.locator('//*[@id="ex4-tab-1"]').click();
    console.log("Verified button clicked successfully....");
    for (let i = 1; i <= 100; i++) 
      {
    await page.locator('(//*[@id="ordinaryVerifiedTable"]//button)[1]').click();
    await expect(page.locator('//*[@id="exampleModal1"]')).toBeVisible();
    await expect(page.getByText('No Data Found')).toBeHidden();
    await page.locator('//*[@id="exampleModal1"]//button[@class="btn-close"]').click();
    console.log(`Consolidated mark list ${i} viewed successfully....`);
    await page.waitForLoadState('networkidle');
        }
        });
  