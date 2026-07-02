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

    test('Verify that product quantity can be updated in cart', async () => {
        const productName = 'Men Tshirt';
        const quantity = '4';

        await productsPage.openProductDetails(1);
        await productsPage.verifyProductPageIsVisible(productName);
        await productsPage.updateProductQuantity(quantity);
        await productsPage.addCurrentProductToCart();
        await productsPage.viewCart();

        await cartPage.verifyQuantityInCart(quantity);
     

    })

})