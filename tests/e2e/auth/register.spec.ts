import {test, expect} from '@playwright/test';
import {faker} from '@faker-js/faker';
import { HomePage } from '../../../Pages/homePage';
import { LoginSignupPage } from '../../../Pages/loginSignupPage';
import { SignupFormPage } from '../../../Pages/signupFormPage';
import { AccountPage } from '../../../Pages/accountPage';
import dotenv from 'dotenv';

dotenv.config();

test.describe('Registration Feature', ()=>{
    test('User can register with valid details',async({page, baseURL})=>{
        // Initialize page objects
        const homePage = new HomePage(page);
        const loginSignupPage = new LoginSignupPage(page);
        const signupFormPage = new SignupFormPage(page);
        const accountPage = new AccountPage(page);

        // Test data - using faker for dynamic data
        const firstName = faker.person.firstName();
        const lastName = faker.person.lastName();
        const email = faker.internet.email();
        const testData = {
            name: `${firstName} ${lastName}`,
            email: email,
            title: 'Mr.',
            password: 'Test@123',
            day: '8',
            month: '10',
            year: '2001',
            firstName: firstName,
            lastName: lastName,
            company: 'Google',
            address: 'USA',
            address2: 'California',
            city: 'Los Angeles',
            state: 'California',
            zipcode: '90001',
            country: 'United States',
            mobileNumber: '01845989665'
        };

        // Step 1: Navigate to home page and verify that home page is visible successfully
        await homePage.navigateToHome();
        await homePage.verifyHomePageIsVisible();

        // Step 2: Click login link to go to login/signup page
        await homePage.clickLoginLink();
        await loginSignupPage.verifyLoginSignupPageIsVisible();

        // Step 3: Sign up with name and email
        await loginSignupPage.signupWithDetails(testData.name, testData.email);

        // Step 4: Fill signup form with complete details
        await signupFormPage.fillCompleteSignupForm(testData);

        // Step 5: Create account
        await signupFormPage.clickCreateAccountButton();

        // Step 6: Verify account created
        await accountPage.verifyAccountCreated();

        // Step 7: Click continue to go to dashboard
        await accountPage.clickContinue();

        // Step 8: Verify user is logged in
        await accountPage.verifyLoggedInUser(firstName);

        // Step 9: Delete the account
        await accountPage.clickDeleteAccount();

        // Step 10: Verify account deleted
        await accountPage.verifyAccountDeleted();

        // Step 11: Click continue after account deletion
        await accountPage.clickContinue();

    })

    test('TC-AUTH-005: Register with Existing Email', async({page, baseURL})=>{
        // Initialize page objects
        const homePage = new HomePage(page);
        const loginSignupPage = new LoginSignupPage(page);

        // Test data - using faker for name and env file for email
        const firstName = faker.person.firstName();
        const lastName = faker.person.lastName();
        const fullName = `${firstName} ${lastName}`;
        const existingEmail = process.env.EMAIL!; // Email from .env which is already registered

        // Step 1: Launch browser (implicit with baseURL)
        // Step 2: Navigate to url http://automationexercise.com/
        await homePage.navigateToHome();

        // Step 3: Verify that home page is visible successfully
        await homePage.verifyHomePageIsVisible();

        // Step 4: Click on 'Signup / Login' button
        await homePage.clickLoginLink();

        // Step 5: Verify 'New User Signup!' is visible
        await loginSignupPage.verifyLoginSignupPageIsVisible();

        // Step 6: Enter name and already registered email address
        await loginSignupPage.fillSignupForm(fullName, existingEmail);

        // Step 7: Click 'Signup' button
        await loginSignupPage.clickSignupButton();

        // Step 8: Verify error 'Email Address already exist!' is visible
        await loginSignupPage.verifySignupErrorMessage();
    })

})
