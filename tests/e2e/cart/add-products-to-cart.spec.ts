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

    test('Verify that products can be added to cart successfully', async () => {
        // Navigate to products
        await productsPage.navigateToProducts();

        // Add multiple products to cart
        await productsPage.addMultipleProductsToCart([0, 1]);

        // View cart
        await productsPage.viewCart();

        // Verify products in cart with their details
        const expectedProducts = [
            { id: 1, price: '500', quantity: '1', total: '500' },
            { id: 2, price: '400', quantity: '1', total: '400' }
        ];

        await cartPage.verifyMultipleProductsInCart(expectedProducts);
        
        // Also verify product names
        await cartPage.verifyProductNameInCart('Blue Top');
        await cartPage.verifyProductNameInCart('Men Tshirt');
    });
});