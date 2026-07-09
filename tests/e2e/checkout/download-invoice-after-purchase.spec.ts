import { test } from '@playwright/test';
import { HomePage } from '../../../Pages/homePage';
import { LoginSignupPage } from '../../../Pages/loginSignupPage';
import { ProductsPage } from '../../../Pages/productsPage';
import { CheckoutPage } from '../../../Pages/checkoutPage';
import { AccountPage } from '../../../Pages/accountPage';
import process from 'process';

test.describe('Checkout Feature', () => {
    let homePage: HomePage;
    let loginSignupPage: LoginSignupPage;
    let productsPage: ProductsPage;
    let checkoutPage: CheckoutPage;
    let accountPage: AccountPage;

    test.beforeEach(async ({ page }) => {
        homePage = new HomePage(page);
        loginSignupPage = new LoginSignupPage(page);
        productsPage = new ProductsPage(page);
        checkoutPage = new CheckoutPage(page);
        accountPage = new AccountPage(page);

        await homePage.navigateToHome();
        await homePage.verifyHomePageIsVisible();
    });

    test('Downloads and verifies the invoice after purchase', async () => {
        const email = process.env.EMAIL ?? '';
        const password = process.env.PASSWORD ?? '';
        const username = process.env.LOGIN_USERNAME ?? '';

        await homePage.clickLoginLink();
        await loginSignupPage.verifyLoginPageIsVisible();
        await loginSignupPage.loginWithCredentials(email, password);
        await accountPage.verifyLoggedInUser(username);

        await productsPage.navigateToProducts();
        await productsPage.addProductToCart(3);
        await productsPage.viewCart();
        await checkoutPage.proceedToCheckout();
        await checkoutPage.verifyCheckoutPageIsVisible();
        await checkoutPage.completePayment('Testopshub', '123456789', '111', '10', '2030');
        await checkoutPage.verifyOrderSuccess();

        const download = await checkoutPage.downloadInvoice();
        await checkoutPage.verifyInvoiceDownloaded(download);
    });
});