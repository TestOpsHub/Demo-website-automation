import { Page, expect } from '@playwright/test';
import { BasePage } from './basePage';

export class ProductsPage extends BasePage {
    constructor(page: Page) {
        super(page);
    }

    // Locators
    readonly productImageWrappers = this.page.locator('.product-image-wrapper');
    readonly continueShoppingButton = this.page.getByRole('button', { name: 'Continue Shopping' });
    readonly viewCartLink = this.page.getByRole('link', { name: 'View Cart' });
    readonly productViewButtons = this.page.getByRole('link', { name: 'View Product' });
    readonly quantityInput = this.page.locator('#quantity');
    readonly addToCartButton = this.page.getByRole('button', { name: /add to cart/i });
    readonly allProductsHeading = this.page.getByRole('heading', { name: 'All Products' });
    readonly reviewSectionLink = this.page.getByRole('link', { name: 'Write Your Review' });
    readonly reviewNameInput = this.page.getByRole('textbox', { name: 'Your Name' });
    readonly reviewEmailInput = this.page.getByRole('textbox', { name: 'Email Address', exact: true });
    readonly reviewTextInput = this.page.getByRole('textbox', { name: 'Add Review Here!' });
    readonly submitReviewButton = this.page.getByRole('button', { name: 'Submit' });
    readonly reviewSuccessMessage = this.page.getByText('Thank you for your review.');

    // Actions
    async navigateToProducts() {
        await this.page.getByRole('link', { name: ' Products' }).click();
    }

    async openProductDetails(index: number) {
        await this.productViewButtons.nth(index).click();
    }

    async verifyProductPageIsVisible(productName: string) {
        await expect(this.page.getByRole('heading', { name: productName })).toBeVisible();
    }

    async verifyAllProductsPageIsVisible() {
        await expect(this.allProductsHeading).toBeVisible();
    }

    async verifyReviewSectionIsVisible() {
        await expect(this.reviewSectionLink).toBeVisible();
    }

    async submitReview(review: { name: string; email: string; review: string }) {
        await this.reviewNameInput.fill(review.name);
        await this.reviewEmailInput.fill(review.email);
        await this.reviewTextInput.fill(review.review);
        await this.submitReviewButton.click();
    }

    async verifyReviewSubmissionSuccess() {
        await expect(this.reviewSuccessMessage).toBeVisible();
    }

    async updateProductQuantity(quantity: string) {
        await this.quantityInput.fill(quantity);
    }

    async addCurrentProductToCart() {
        await this.addToCartButton.click();
    }

    async addProductToCart(index: number) {
        const product = this.productImageWrappers.nth(index);
        await product.hover();
        await product.locator('.product-overlay .add-to-cart').click();
    }

    async addMultipleProductsToCart(productIndices: number[]) {
        for (let i = 0; i < productIndices.length; i++) {
            await this.addProductToCart(productIndices[i]);
            if (i < productIndices.length - 1) {
                await this.continueShoppingButton.click();
            }
        }
    }

    async viewCart() {
        await this.viewCartLink.click();
    }
}
