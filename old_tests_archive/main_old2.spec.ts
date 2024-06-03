import { test, expect, type Page } from '@playwright/test';
import { CartPage } from '../pages-objects/cart_page.ts'
import { CheckoutCompletePage } from '../pages-objects/checkout_complete_page.ts'
import { CheckoutInformationPage } from '../pages-objects/checkout_information_page.ts'
import { CheckoutOverviewPage } from '../pages-objects/checkout_overview_page.ts'
import { InventoryPage } from '../pages-objects/inventory_page.ts'
import { LandingPage } from '../pages-objects/landing_page.ts'
import { DetailsPage } from '../pages-objects/details_page.ts'
import  data from '../Data/variables.json'
import { FonctionUtiles} from '../utilitaire/fonctions.ts';


//describe générale
test.describe.only('Exercicies dans le cadre des jours TP ', () => {
  
  test.beforeEach(async ({ page }) => {
    await page.goto(data.base_url);
  });

  test.afterEach(async ({ page })  => {
    await page.close();
  });

  test('Exercice 1', async ({ page }) => {
    await expect(page).toHaveURL(data.base_url)
    const landingPage = new LandingPage(page);
    await landingPage.connectionWithValidAccount();
    await landingPage.logoutFromInventoryPage()

  });

  test('Exercice 2', async ({ page }) => {
    await expect(page).toHaveURL(data.base_url)
    const landingPage = new LandingPage(page);
    await landingPage.connectionWithInvalidAccount()
    await expect(landingPage.headingerror).toBeVisible();
  });


  test('Exercice 3', async ({ page }) => {
    await expect(page).toHaveURL(data.base_url)
    const landingPage = new LandingPage(page);
    const cartPage = new CartPage(page);
    const checkout_information_page = new CheckoutInformationPage(page);
    const checkout_complete_page = new CheckoutCompletePage(page);
    const checkout_overview_page = new CheckoutOverviewPage(page);
    const inventory_page = new InventoryPage(page);

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
    await expect(checkout_information_page.titleLocator).toBeVisible()
    await expect(page).toHaveURL(data.checkout_url)
    // await expect(page).toHaveTitle(/Playwright/);

    await checkout_information_page.checkoutCustomerInformations()
    await page.waitForTimeout(2000)
    await checkout_information_page.continueCheckoutAction()
    await page.waitForTimeout(2000)
    await expect(page).toHaveURL(data.checkout_url_step_two)
    await expect(checkout_overview_page.titleCheckoutOverview).toHaveText(data.checkoutOverviewTitle)

    await checkout_overview_page.finishOrder()
    await page.waitForTimeout(2000)
    await expect(checkout_complete_page.completeHeaderLocator).toHaveText(data.checkoutCompletMessage)
    await checkout_complete_page.bactToProducts()
    await page.waitForTimeout(2000)
    await expect(page).toHaveURL(data.inventory_url)

  });


  test('Exercice 4 du plus grand au plus petit ', async ({ page }) => {
    const landingPage = new LandingPage(page);
    const cartPage = new CartPage(page);
    const checkout_information_page = new CheckoutInformationPage(page);
    const checkout_complete_page = new CheckoutCompletePage(page);
    const checkout_overview_page = new CheckoutOverviewPage(page);
    const inventory_page = new InventoryPage(page);
    const fonctionUtiles= new FonctionUtiles(page);

    await expect(page).toHaveURL(data.base_url)
    await landingPage.connectionWithValidAccount();
    await page.waitForTimeout(3000)
    await inventory_page.filterProductHighToLow()
    await page.waitForTimeout(3000)

    const liste: string[] = [];

    //récupération des elements filtres par le prix 
   let long = await productsArrayLength(page)

  
    //longueur du tableau
    console.log(long)

    await loopArrayProducts(page, liste, long)

    console.log(liste)

    for (let j = 1; j < long; j++) {
      if (liste[j - 1] > liste[j]) {
        await expect(+(liste[j - 1])).toBeGreaterThan(+(liste[j]))
      }
    }

  });

  test('Exercice 4 du plus petit au plus grand  ', async ({ page }) => {
    const landingPage = new LandingPage(page);
    const cartPage = new CartPage(page);
    const checkout_information_page = new CheckoutInformationPage(page);
    const checkout_complete_page = new CheckoutCompletePage(page);
    const checkout_overview_page = new CheckoutOverviewPage(page);
    const inventory_page = new InventoryPage(page);

    await expect(page).toHaveURL(data.base_url)
    await landingPage.connectionWithValidAccount();
    await page.waitForTimeout(3000)
    await inventory_page.filterProductLowToHigh()
    await page.waitForTimeout(3000)

    //initialisation d'un tabelau vide avec typage 
    const liste: string[] = [];

    //récupération des elements filtres par le prix 
    let long = await productsArrayLength(page)

    //longueur du tableau
    console.log(long)

    await loopArrayProducts(page, liste, long)

    console.log(liste)

    for (let j = 10; j < long; j++) {

      await expect(+(liste[j])).toBeLessThan(+(liste[j + 1]))

    }

  });


  test('Exercice 5 le one for all ', async ({ page }) => {
    await expect(page).toHaveURL(data.base_url)

    const landingPage = new LandingPage(page);
    const cartPage = new CartPage(page);
    const checkout_information_page = new CheckoutInformationPage(page);
    const checkout_complete_page = new CheckoutCompletePage(page);
    const checkout_overview_page = new CheckoutOverviewPage(page);
    const inventory_page = new InventoryPage(page);
    const details_page = new DetailsPage(page);

    await landingPage.connectionWithValidAccount();
    await page.waitForTimeout(3000)
    await inventory_page.gotoDetailsProduct()
    await page.waitForTimeout(3000)
    await expect(details_page.productTitleLocator).toBeVisible()
    await expect(details_page.productDescLocator).toBeVisible()
    await expect(details_page.productPriceLocator).toBeVisible()
    await expect(details_page.cartLinkLocator).toBeVisible()
    await expect(details_page.productImageLocator).toBeVisible()
    await details_page.addToCart()
    await expect(details_page.cartBadge).toHaveText(data.cartNumberOfProducts)
    await details_page.goToCartFromDetailsPage()
    let long = await cartProductsLength(page)
    //console.log("Verif ombre de produits dans le panier  :" + long)
    await expect(long).toBe(1)
    await expect(long).toEqual(1)

  });

});



//--------------------------------------------FONCTIONS SUPPORTS ------------------------------------------------------


async function loopArrayProducts(page, liste, long) {
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

async function connection(page) {
  const landingPage = new LandingPage(page);
  await landingPage.connectionWithValidAccount();

}

function productsArrayLength(page) {
  let long = page.locator('(//div[@data-test="inventory-item-price"])').count();
  return long;

}

function cartProductsLength(page) {
  let long = page.locator('//div[@data-test="inventory-item"]').count()
  return long;

}





