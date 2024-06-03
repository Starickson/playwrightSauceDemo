import { expect, type Locator, type Page } from '@playwright/test';
import { LandingPage } from '../pages-objects/landing_page.ts'




export class FonctionUtiles {
    readonly page: Page;
    

    constructor(page: Page) {
        this.page = page;
       
    }



    async  loopArrayProducts(page, liste, long) {
        for (let i = 1; i < long + 1; i++) {
          let first_value;
          let value_filter;
          await page.waitForTimeout(2000)
          first_value = await page.locator(`(//div[@data-test="inventory-item-price"])[${i}]`);
          const value = await first_value.textContent();
          value_filter = value.replace('$', '');
          liste.push(value_filter)
        }
      }
      
      async  connection(page) {
        const landingPage = new LandingPage(page);
        await landingPage.connectionWithValidAccount();
      
      }
      
      async productsArrayLength(page) {
        let long = page.locator('(//div[@data-test="inventory-item-price"])').count();
        return long;
      
      }
      
      async cartProductsLength(page) {
        let long = page.locator('//div[@data-test="inventory-item"]').count()
        return long;
      
      }



    

}









