const { test, expect } = require('@playwright/test');

  let page;
  test.beforeAll(async ({ browser }) => {
      const context = await browser.newContext();
      page = await context.newPage();
      await page.goto('https://wydqa.cdipd.in/');
  });
  test.afterAll(async ({browser}) => {
      browser.close;
  });

  test('Wayanad Portal Login', async () => {
  // Clicking Contribute Button...
  await page.locator('//div[@class="flex items-center"][2]').click();  
  await page.locator('//input[@placeholder]').fill('midhun.sb@duk.ac.in'); 
  await page.locator("//button[text()='Continue']").click();
  await page.locator("//button[text()='Verify OTP & Continue']").click();

});





