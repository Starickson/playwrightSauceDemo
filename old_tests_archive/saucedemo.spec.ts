import { test, expect } from '@playwright/test';



test.describe('Exercicies dans le cadre des jours TP ', () => {

  test.beforeEach(async ({ page }, testInfo) => {
    // Extend timeout for all tests running this hook by 30 seconds.
    //test.setTimeout(testInfo.timeout + 30000);

    await page.goto('https://www.saucedemo.com/');
  });

  test('Exercice 1', async ({ page }) => {
  //  await page.goto('https://www.saucedemo.com/');
    await expect(page).toHaveURL('https://www.saucedemo.com/')
  
  });
  

 
});




