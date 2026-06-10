import { Page, expect } from '@playwright/test';
import { BasePage } from './basePage';

export class SignupFormPage extends BasePage {
    constructor(page: Page) {
        super(page);
    }

    // Locators
    readonly mrRadio = this.page.getByRole('radio', { name: 'Mr.' });
    readonly passwordInput = this.page.getByRole('textbox', { name: 'Password *' });
    readonly daysDropdown = this.page.locator('#days');
    readonly monthsDropdown = this.page.locator('#months');
    readonly yearsDropdown = this.page.locator('#years');
    readonly newsletterCheckbox = this.page.getByRole('checkbox', { name: 'Sign up for our newsletter!' });
    readonly specialOffersCheckbox = this.page.getByRole('checkbox', { name: 'Receive special offers from' });
    readonly firstNameInput = this.page.getByRole('textbox', { name: 'First name *' });
    readonly lastNameInput = this.page.getByRole('textbox', { name: 'Last name *' });
    readonly companyInput = this.page.getByRole('textbox', { name: 'Company', exact: true });
    readonly addressInput = this.page.getByRole('textbox', { name: 'Address * (Street address, P.' });
    readonly address2Input = this.page.getByRole('textbox', { name: 'Address 2' });
    readonly countryDropdown = this.page.getByRole('combobox', { name: 'Country *' });
    readonly stateInput = this.page.getByRole('textbox', { name: 'State *' });
    readonly cityInput = this.page.getByRole('textbox', { name: 'City * Zipcode *' });
    readonly zipcodeInput = this.page.locator('#zipcode');
    readonly mobileNumberInput = this.page.getByRole('textbox', { name: 'Mobile Number *' });
    readonly createAccountButton = this.page.getByRole('button', { name: 'Create Account' });

    // Actions
    async selectTitle(title: string = 'Mr.') {
        if (title === 'Mr.') {
            await this.mrRadio.check();
        }
    }

    async fillPassword(password: string) {
        await this.passwordInput.fill(password);
    }

    async selectDateOfBirth(day: string, month: string, year: string) {
        await this.daysDropdown.selectOption(day);
        await this.monthsDropdown.selectOption(month);
        await this.yearsDropdown.selectOption(year);
    }

    async checkNewsletterAndOffers() {
        await this.newsletterCheckbox.check();
        await this.specialOffersCheckbox.check();
    }

    async fillUserDetails(firstName: string, lastName: string, company: string) {
        await this.firstNameInput.fill(firstName);
        await this.lastNameInput.fill(lastName);
        await this.companyInput.fill(company);
    }

    async fillAddressDetails(address: string, address2: string, city: string, state: string, zipcode: string, mobileNumber: string) {
        await this.addressInput.fill(address);
        await this.address2Input.fill(address2);
        await this.cityInput.fill(city);
        await this.zipcodeInput.fill(zipcode);
        await this.stateInput.fill(state);
        await this.mobileNumberInput.fill(mobileNumber);
    }

    async selectCountry(country: string) {
        await this.countryDropdown.selectOption(country);
    }

    async fillCompleteSignupForm(signupData: any) {
        await this.selectTitle(signupData.title || 'Mr.');
        await this.fillPassword(signupData.password);
        await this.selectDateOfBirth(signupData.day, signupData.month, signupData.year);
        await this.checkNewsletterAndOffers();
        await this.fillUserDetails(signupData.firstName, signupData.lastName, signupData.company);
        await this.fillAddressDetails(
            signupData.address,
            signupData.address2,
            signupData.city,
            signupData.state,
            signupData.zipcode,
            signupData.mobileNumber
        );
        await this.selectCountry(signupData.country);
    }

    async clickCreateAccountButton() {
        await this.createAccountButton.click();
    }
}
