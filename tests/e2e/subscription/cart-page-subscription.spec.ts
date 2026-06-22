import { test } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { HomePage } from '../../../Pages/homePage';
import { CartPage } from '../../../Pages/cartPage';

test.describe('Cart Page Subscription Feature', () => {
  let homePage: HomePage;
  let cartPage: CartPage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    cartPage = new CartPage(page);
    await homePage.navigateToHome();
    await homePage.verifyHomePageIsVisible();
  });

  test('Verify subscription is successful from cart page', async () => {
    const email = faker.internet.email();

    // Navigate to cart and verify subscription section
    await cartPage.navigateToCart();
    await cartPage.verifySubscriptionSectionIsVisible();

    // Subscribe and verify success
    await cartPage.subscribeAndVerify(email);
  });
});
