import {test, expect} from '@playwright/test';
import {faker} from '@faker-js/faker';
import { HomePage } from '../../../Pages/homePage';
import { LoginSignupPage } from '../../../Pages/loginSignupPage';
import { SignupFormPage } from '../../../Pages/signupFormPage';
import { AccountPage } from '../../../Pages/accountPage';
import dotenv from 'dotenv';

dotenv.config();

// Test data constants
const TEST_DATA_DEFAULTS = {
    title: 'Mr.',
    password: 'Test@123',
    day: '8',
    month: '10',
    year: '2001',
    company: 'Google',
    address: 'USA',
    address2: 'California',
    city: 'Los Angeles',
    state: 'California',
    zipcode: '90001',
    country: 'United States',
    mobileNumber: '01845989665'
};

test.describe('Registration Feature', ()=>{
    let homePage: HomePage;
    let loginSignupPage: LoginSignupPage;
    let signupFormPage: SignupFormPage;
    let accountPage: AccountPage;

    test.beforeEach(async({ page }) => {
        homePage = new HomePage(page);
        loginSignupPage = new LoginSignupPage(page);
        signupFormPage = new SignupFormPage(page);
        accountPage = new AccountPage(page);

        // Navigate to signup page
        await homePage.navigateToHome();
        await homePage.verifyHomePageIsVisible();
        await homePage.clickLoginLink();
        await loginSignupPage.verifyLoginSignupPageIsVisible();
    });
    test('User can register with valid details',async()=>{
        const firstName = faker.person.firstName();
        const lastName = faker.person.lastName();
        const email = faker.internet.email();
        
        const testData = {
            name: `${firstName} ${lastName}`,
            email: email,
            firstName: firstName,
            lastName: lastName,
            ...TEST_DATA_DEFAULTS
        };

        // Sign up and proceed to account creation
        await loginSignupPage.signupWithDetails(testData.name, testData.email);
        await signupFormPage.fillCompleteSignupForm(testData);
        await signupFormPage.clickCreateAccountButton();

        // Verify account created and logged in
        await accountPage.verifyAccountCreated();
        await accountPage.clickContinue();
        await accountPage.verifyLoggedInUser(firstName);

        // Clean up: Delete account
        await accountPage.clickDeleteAccount();
        await accountPage.verifyAccountDeleted();
        await accountPage.clickContinue();
    });

    test('TC-AUTH-005: Register with Existing Email', async()=>{
        const firstName = faker.person.firstName();
        const lastName = faker.person.lastName();
        const fullName = `${firstName} ${lastName}`;
        const existingEmail = process.env.EMAIL!; // Email from .env which is already registered

        // Attempt signup with existing email
        await loginSignupPage.fillSignupForm(fullName, existingEmail);
        await loginSignupPage.clickSignupButton();

        // Verify duplicate email error
        await loginSignupPage.verifySignupErrorMessage();
    });

})
