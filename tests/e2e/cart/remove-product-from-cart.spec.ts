import { test } from '@playwright/test';
import { HomePage } from '../../../Pages/homePage';
import { ProductsPage } from '../../../Pages/productsPage';
import { CartPage } from '../../../Pages/cartPage';

test.describe('Cart Feature', () => {
  let homePage: HomePage;
  let productsPage: ProductsPage;
  let cartPage: CartPage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    productsPage = new ProductsPage(page);
    cartPage = new CartPage(page);

    await homePage.navigateToHome();
    await homePage.verifyHomePageIsVisible();
  });

  test('removes a product from the cart using the page object model', async () => {
    await productsPage.navigateToProducts();
    await productsPage.addProductToCart(3);
    await productsPage.viewCart();

    await cartPage.verifyCartPageIsVisible();
    await cartPage.removeProductFromCart();
    await cartPage.verifyCartIsEmpty();
  });
});