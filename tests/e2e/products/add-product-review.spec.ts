import { test } from '@playwright/test';
import { HomePage } from '../../../Pages/homePage';
import { ProductsPage } from '../../../Pages/productsPage';

test.describe('Product Review Feature', () => {
    let homePage: HomePage;
    let productsPage: ProductsPage;

    test.beforeEach(async ({ page }) => {
        homePage = new HomePage(page);
        productsPage = new ProductsPage(page);

        await homePage.navigateToHome();
        await homePage.verifyHomePageIsVisible();
    });

    test('Verify product review can be submitted successfully', async () => {
        await productsPage.navigateToProducts();
        await productsPage.verifyAllProductsPageIsVisible();
        await productsPage.openProductDetails(1);
        await productsPage.verifyReviewSectionIsVisible();

        await productsPage.submitReview({
            name: 'testopshub',
            email: 'testopshub@yopmail.com',
            review: 'Good products'
        });

        await productsPage.verifyReviewSubmissionSuccess();
    });
});