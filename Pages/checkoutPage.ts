import { Page, expect, Download } from '@playwright/test';
import * as fs from 'fs';
import { BasePage } from './basePage';

export class CheckoutPage extends BasePage {
    constructor(page: Page) {
        super(page);
    }

    readonly proceedToCheckoutButton = this.page.locator('a.check_out');
    readonly placeOrderLink = this.page.getByRole('link', { name: 'Place Order' });
    readonly nameOnCardInput = this.page.locator('input[name="name_on_card"]');
    readonly cardNumberInput = this.page.locator('input[name="card_number"]');
    readonly cvcInput = this.page.getByRole('textbox', { name: 'ex.' });
    readonly expiryMonthInput = this.page.getByRole('textbox', { name: 'MM' });
    readonly expiryYearInput = this.page.getByRole('textbox', { name: 'YYYY' });
    readonly payAndConfirmOrderButton = this.page.getByRole('button', { name: 'Pay and Confirm Order' });
    readonly orderSuccessMessage = this.page.getByText('Congratulations! Your order has been confirmed!');
    readonly continueButton = this.page.getByRole('link', { name: 'Continue' });
    readonly checkoutHeading = this.page.getByText('Checkout');
    readonly reviewYourOrderHeading = this.page.getByRole('heading', { name: 'Review Your Order' });
    readonly downloadInvoiceLink = this.page.getByRole('link', { name: 'Download Invoice' });

    async proceedToCheckout() {
        await expect(this.proceedToCheckoutButton).toBeVisible();
        await this.proceedToCheckoutButton.click();
    }

    async placeOrder() {
        await this.placeOrderLink.click();
    }

    async fillCardDetails(name: string, cardNumber: string, cvc: string, month: string, year: string) {
        await this.nameOnCardInput.fill(name);
        await this.cardNumberInput.fill(cardNumber);
        await this.cvcInput.fill(cvc);
        await this.expiryMonthInput.fill(month);
        await this.expiryYearInput.fill(year);
    }

    async completePayment(name: string, cardNumber: string, cvc: string, month: string, year: string) {
        await this.placeOrder();
        await this.fillCardDetails(name, cardNumber, cvc, month, year);
        await this.payAndConfirmOrderButton.click();
    }

    async verifyCheckoutPageIsVisible() {
        await expect(this.checkoutHeading).toBeVisible();
        await expect(this.reviewYourOrderHeading).toBeVisible();
    }

    async verifyOrderSuccess() {
        await expect(this.orderSuccessMessage).toBeVisible();
    }

    async downloadInvoice(): Promise<Download> {
        await expect(this.downloadInvoiceLink).toBeVisible();
        const downloadPromise = this.page.waitForEvent('download');
        await this.downloadInvoiceLink.click();
        return downloadPromise;
    }

    async verifyInvoiceDownloaded(download: Download) {
        const downloadPath = await download.path();
        expect(downloadPath).toBeTruthy();

        const resolvedPath = downloadPath!;
        expect(fs.existsSync(resolvedPath)).toBeTruthy();

        const fileStats = fs.statSync(resolvedPath);
        expect(fileStats.size).toBeGreaterThan(0);

        const fileName = download.suggestedFilename().toLowerCase();
        expect(fileName).toContain('invoice');
    }

    async continueShoppingAfterOrder() {
        await this.continueButton.click();
    }
}
