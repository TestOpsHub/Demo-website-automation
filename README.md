# Demo Website Automation

End-to-end automation suite for [Automation Exercise](https://automationexercise.com) using Playwright, TypeScript, and the Page Object Model (POM).

## Overview

This repository contains an automated end-to-end testing framework built with Playwright and TypeScript. The suite follows the Page Object Model pattern and supports environment-driven configuration, reporting, and cross-browser execution.

## Features

- Maintainable Page Object Model implementation for reusable page abstractions.
- Automated user journeys for account registration, login, product browsing, cart management, checkout, invoice download, product review, and newsletter subscription.
- Allure reporting and Playwright configuration designed for both local and CI execution.
- Test coverage organized across authentication, cart, checkout, product interaction, and subscription flows.

## Key technologies

- Playwright (`@playwright/test`)
- TypeScript
- Page Object Model (POM)
- Allure reporting (`allure-playwright`, `allure-commandline`)
- GitHub Actions for CI/CD workflow automation
- dotenv for environment configuration
- Node.js and npm

## Test coverage

Current automation coverage includes:

- Authentication: registration and login flows
- Cart: add products to cart, remove products, verify quantity
- Checkout: checkout with login flow, invoice download after purchase
- Products: add product review
- Subscription: newsletter subscription behavior from cart page

## Prerequisites

- [Node.js](https://nodejs.org/) (LTS recommended)
- npm

## Getting started

```bash
git clone https://github.com/TestOpsHub/Demo-website-automation.git
cd Demo-website-automation
npm install
npx playwright install
```

## Environment variables

Create a `.env` file in the project root (this file is gitignored):

```
BASE_URL=https://automationexercise.com
```

`playwright.config.ts` loads environment variables using `dotenv`. If `BASE_URL` is not set, it defaults to `https://automationexercise.com/`.

## Running tests

| Command | Description |
|---------|-------------|
| `npm run test:e2e` | Run E2E tests headless |
| `npm run test:e2e:headed` | Run E2E tests with browser UI |
| `npx playwright test` | Run all tests under `tests/e2e/` |
| `npx playwright show-report` | Open HTML report after a run |

## Allure report

This project supports Allure reporting through `allure-playwright`.

After running tests, generate the report with:

```bash
npx allure generate allure-results --clean -o allure-report
npx allure open allure-report
```

If Allure is not installed globally, use the `allure-commandline` package already included in the project dependencies.
<img width="1907" height="939" alt="image" src="https://github.com/user-attachments/assets/ba47ffda-120a-4062-ac22-770adf7c38c2" />
<img width="1909" height="937" alt="image" src="https://github.com/user-attachments/assets/cefab84e-027f-4434-9f03-6ffee37762a4" />



## Project structure

```
Demo-website-automation/
├── Pages/               # Page Object classes
│   ├── accountPage.ts
│   ├── basePage.ts
│   ├── cartPage.ts
│   ├── checkoutPage.ts
│   ├── homePage.ts
│   ├── loginSignupPage.ts
│   ├── productsPage.ts
│   └── signupFormPage.ts
├── tests/
│   └── e2e/
│       ├── auth/
│       ├── cart/
│       ├── checkout/
│       ├── products/
│       └── subscription/
├── playwright.config.ts
├── package.json
├── README.md
└── .env                # Local env (not committed)
```

## CI/CD

This repository includes a GitHub Actions workflow at `.github/workflows/playwright.yml` to run Playwright tests on push and pull requests to `main` and `master`.

The workflow installs dependencies, caches npm and Playwright browsers, runs the test suite with `CI=true`, and uploads the generated `playwright-report/` folder as an artifact.

## Configuration

Key settings from `playwright.config.ts`:

- **Browsers:** Chromium, Firefox, WebKit
- **Reporter:** HTML (`playwright-report/`)
- **Trace:** captured on first retry
- **CI:** 2 retries and 1 worker when `CI` is enabled

## License

ISC
