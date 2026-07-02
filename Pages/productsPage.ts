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
