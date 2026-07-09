import { Page, expect } from '@playwright/test';
import { BasePage } from './basePage';

export class CheckoutPage extends BasePage {
    constructor(page: Page) {
        super(page);
    }

   readonly proceedToCheckoutButton =this.page.locator('a.check_out');
    readonly placeOrderLink = this.page.getByRole('link', { name: 'Place Order' });
    readonly nameOnCardInput = this.page.locator('input[name="name_on_card"]');
    readonly cardNumberInput = this.page.locator('input[name="card_number"]');
    readonly cvcInput = this.page.getByRole('textbox', { name: 'ex.' });
    readonly expiryMonthInput = this.page.getByRole('textbox', { name: 'MM' });
    readonly expiryYearInput = this.page.getByRole('textbox', { name: 'YYYY' });
    readonly payAndConfirmOrderButton = this.page.getByRole('button', { name: 'Pay and Confirm Order' });
    readonly orderSuccessMessage = this.page.getByText('Congratulations! Your order has been confirmed!');
    readonly continueButton = this.page.getByRole('link', { name: 'Continue' });

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

    async verifyOrderSuccess() {
        await expect(this.orderSuccessMessage).toBeVisible();
    }

    async continueShoppingAfterOrder() {
        await this.continueButton.click();
    }
}
