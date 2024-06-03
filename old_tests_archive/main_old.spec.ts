import { test, expect } from '@playwright/test';
import {CartPage} from '../pages-objects/cart_page.ts'
import {CheckoutCompletePage} from '../pages-objects/checkout_complete_page.ts'
import {CheckoutInformationPage} from '../pages-objects/checkout_information_page.ts'
import {CheckoutOverviewPage} from '../pages-objects/checkout_overview_page.ts'
import {InventoryPage} from '../pages-objects/inventory_page.ts'
import {LandingPage} from '../pages-objects/landing_page.ts'



test.describe('Exercicies dans le cadre des jours TP ', () => {

  test.beforeEach(async ({ page }, testInfo) => {
    // Extend timeout for all tests running this hook by 30 seconds.
    //test.setTimeout(testInfo.timeout + 30000);

    await page.goto('https://www.saucedemo.com/');
  });

  test('Exercice 1', async ({ page }) => {
  //  await page.goto('https://www.saucedemo.com/');
    await expect(page).toHaveURL('https://www.saucedemo.com/')
    //remplir le formulaire de création d'un user 
    const landingPage = new LandingPage(page);
    await landingPage.connectionWithValidAccount();
    await landingPage.logoutFromInventoryPage()
    // await expect(page).toHaveTitle(/Playwright/);
  });
  
  test('Exercice 2', async ({ page }) => {
   // await page.goto('https://www.saucedemo.com/');
    await expect(page).toHaveURL('https://www.saucedemo.com/')
    //remplir le formulaire de création d'un user 
    const landingPage = new LandingPage(page);
    await landingPage.connectionWithInvalidAccount()
    //await expect(page.locator('[data-test="error"]')).toHaveText('Epic sadface: Username and password do not match any user in this service')
    await expect(page.locator('[data-test="error"]')).toBeVisible();
    // await expect(page).toHaveTitle(/Playwright/);
  });
  
  
  test('Exercice 3', async ({ page }) => {
   // await page.goto('https://www.saucedemo.com/');
    await expect(page).toHaveURL('https://www.saucedemo.com/')
    //remplir le formulaire de création d'un user 
    const landingPage = new LandingPage(page);
    const cartPage= new CartPage(page);
    const checkout_information_page= new CheckoutInformationPage(page);
    const checkout_complete_page= new CheckoutCompletePage(page);
    const checkout_overview_page= new CheckoutOverviewPage(page);
    const inventory_page= new InventoryPage(page);

    await landingPage.connectionWithValidAccount();
  

    await page.waitForTimeout(3000)

    await inventory_page.filterProductHighToLow()
    await page.waitForTimeout(3000)

    // Sélection du premier élément
   await inventory_page.selectTwoProducts()
  
    await page.waitForTimeout(2000)
  
    //COmparaison du nombre d'articles 
    await inventory_page.countElementsSelected()
   
    // go to cart 
    await cartPage.goToCart()
    
    await page.waitForTimeout(2000)
    await checkout_information_page.goToCheckout()
    await page.waitForTimeout(2000)
  
    //checkout page
    await expect(page.getByText('Checkout: Your Information')).toBeVisible()
    await expect(page).toHaveURL('https://www.saucedemo.com/checkout-step-one.html')
    // await expect(page).toHaveTitle(/Playwright/);

    await checkout_information_page.checkoutCustomerInformations()
    
    await page.waitForTimeout(2000)
    await checkout_information_page.continueCheckoutAction()
    
  
    await page.waitForTimeout(2000)
    await expect(page).toHaveURL('https://www.saucedemo.com/checkout-step-two.html')
    await expect(page.locator('[data-test="title"]')).toHaveText('Checkout: Overview')

    await checkout_overview_page.finishOrder()
  
    await page.waitForTimeout(2000)
  
    await expect(page.locator('[data-test="complete-header"]')).toHaveText('Thank you for your order!')
    
    await  checkout_complete_page.bactToProducts() 
  
    await page.waitForTimeout(2000)
  
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html')

  });


  test.only('Exercice 4 du plus grand au plus petit ', async ({ page }) => {
    const landingPage = new LandingPage(page);
    const cartPage= new CartPage(page);
    const checkout_information_page= new CheckoutInformationPage(page);
    const checkout_complete_page= new CheckoutCompletePage(page);
    const checkout_overview_page= new CheckoutOverviewPage(page);
    const inventory_page= new InventoryPage(page);


    // await page.goto('https://www.saucedemo.com/');
    await expect(page).toHaveURL('https://www.saucedemo.com/')
    //remplir le formulaire de création d'un user 
    await landingPage.connectionWithValidAccount();
    await page.waitForTimeout(3000)

    //selection des produis du plus cher au moins cher
    await inventory_page.filterProductHighToLow()
    await page.waitForTimeout(3000)

    //initialisation d'un tabelau vide avec typage 
    const liste: string[] = [];
   
    //récupération des elements filtres par le prix 
    let long = await productsArrayLength(page)
    //const bb= await page.locator(`(//div[@data-test="inventory-item-price"])[i]`).textContent();
    //console.log(bb)
   
    
    //longueur du tableau
    console.log(long)

    // for (let i = 1; i < long + 1; i++) {
    //   let first_value ;
    //   let value_filter;
    //   await page.waitForTimeout(2000)
    //   first_value= await page.locator(`(//div[@data-test="inventory-item-price"])[${i}]`);
    //   const value= await first_value.textContent();
    //   value_filter= value.replace('$', '');
    //   liste.push(value_filter)
    // }

    await loopArrayProducts(page,liste,long)

    console.log(liste)

    for(let j=1;j<long;j++){
      if(liste[j-1] > liste[j]){
       await expect(+(liste[j-1])).toBeGreaterThan( +(liste[j]))
      }
    }

    });

    test('Exercice 4 du plus petit au plus grand  ', async ({ page }) => {
      const landingPage = new LandingPage(page);
      const cartPage= new CartPage(page);
      const checkout_information_page= new CheckoutInformationPage(page);
      const checkout_complete_page= new CheckoutCompletePage(page);
      const checkout_overview_page= new CheckoutOverviewPage(page);
      const inventory_page= new InventoryPage(page);
  
  
      // await page.goto('https://www.saucedemo.com/');
      await expect(page).toHaveURL('https://www.saucedemo.com/')
      //remplir le formulaire de création d'un user 
      await landingPage.connectionWithValidAccount();
      await page.waitForTimeout(3000)
  
      //selection des produis du plus cher au moins cher
      await inventory_page.filterProductLowToHigh()
      await page.waitForTimeout(3000)
  
      //initialisation d'un tabelau vide avec typage 
      const liste: string[] = [];
     
      //récupération des elements filtres par le prix 
      let long = await productsArrayLength(page)
      //const bb= await page.locator(`(//div[@data-test="inventory-item-price"])[i]`).textContent();
      //console.log(bb)
     
      
      //longueur du tableau
      console.log(long)
  
      for (let i = 1; i < long + 1; i++) {
        let first_value ;
        let value_filter;
        await page.waitForTimeout(2000)
        first_value= await page.locator(`(//div[@data-test="inventory-item-price"])[${i}]`);
        const value= await first_value.textContent();
        value_filter= value.replace('$', '');
        liste.push(value_filter)
      }
      console.log(liste)
  
      for(let j=10;j<long;j++){
       
         await expect(+(liste[j])).toBeLessThan( +(liste[j+1]))
       
      }
  
      });
    
});






async function loopArrayProducts(page,liste,long){
  for (let i = 1; i < long + 1; i++) {
    let first_value ;
    let value_filter;
    await page.waitForTimeout(2000)
    first_value= await page.locator(`(//div[@data-test="inventory-item-price"])[${i}]`);
    const value= await first_value.textContent();
    value_filter= value.replace('$', '');
    liste.push(value_filter)
  }
}

async function connection(page){
    const landingPage = new LandingPage(page);
    await landingPage.connectionWithValidAccount();
   
}

function productsArrayLength(page){
  let long = page.locator('(//div[@data-test="inventory-item-price"])').count();
  return long ;
 
}




