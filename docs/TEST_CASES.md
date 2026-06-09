# Automation Test Scenarios

## Authentication

### TC-AUTH-001: Register New User

**Priority:** High

**Scenario**

* Register a new user with valid information.

**Test Data**

* Name: Dynamic
* Email: Generated at runtime
* Password: Test@123

**Validations**

* Account creation succeeds.
* User is logged in.
* Username is displayed.
* Account can be deleted.

---

### TC-AUTH-002: Login with Valid Credentials

**Priority:** High

**Scenario**

* Login using a registered user account.

**Validations**

* Login succeeds.
* User is redirected to home page.
* Logged-in username is displayed.

---

### TC-AUTH-003: Login with Invalid Credentials

**Priority:** High

**Scenario**

* Attempt login using invalid credentials.

**Validations**

* Login fails.
* Appropriate error message is displayed.

---

### TC-AUTH-004: Logout User

**Priority:** Medium

**Scenario**

* Logout from an authenticated session.

**Validations**

* User session is terminated.
* User is redirected to login page.

---

### TC-AUTH-005: Register with Existing Email

**Priority:** Medium

**Scenario**

* Attempt registration using an already registered email.

**Validations**

* Registration is blocked.
* Duplicate email error message is displayed.

---

## Contact

### TC-CONTACT-001: Submit Contact Us Form

**Priority:** Medium

**Scenario**

* Submit the contact form with valid information and attachment.

**Validations**

* Form submission succeeds.
* Success message is displayed.
* User can navigate back to home page.

---

## Navigation

### TC-NAV-001: Verify Test Cases Page

**Priority:** Low

**Scenario**

* Open the Test Cases page.

**Validations**

* Test Cases page is accessible.
* Expected content is displayed.

---

## Products

### TC-PROD-001: View All Products and Product Details

**Priority:** High

**Scenario**

* Browse products and open a product details page.

**Validations**

* Product list is displayed.
* Product detail page opens successfully.
* Product information is visible.

---

### TC-PROD-002: Search Product

**Priority:** High

**Scenario**

* Search products using a keyword.

**Validations**

* Search results are displayed.
* Matching products are shown.

---

### TC-PROD-003: View Category Products

**Priority:** Medium

**Scenario**

* Browse products using category navigation.

**Validations**

* Category page opens successfully.
* Category-specific products are displayed.

---

### TC-PROD-004: View Brand Products

**Priority:** Medium

**Scenario**

* Browse products using brand filters.

**Validations**

* Brand page opens successfully.
* Brand-specific products are displayed.

---

### TC-PROD-005: Submit Product Review

**Priority:** Low

**Scenario**

* Submit a review for a product.

**Validations**

* Review is submitted successfully.
* Success message is displayed.

---

## Subscription

### TC-SUB-001: Subscribe from Home Page

**Priority:** Low

**Scenario**

* Subscribe using the footer subscription form on the home page.

**Validations**

* Subscription succeeds.
* Success message is displayed.

---

### TC-SUB-002: Subscribe from Cart Page

**Priority:** Low

**Scenario**

* Subscribe using the footer subscription form on the cart page.

**Validations**

* Subscription succeeds.
* Success message is displayed.

---

## Cart

### TC-CART-001: Add Products to Cart

**Priority:** High

**Scenario**

* Add multiple products to the cart.

**Validations**

* Products are added successfully.
* Quantity is correct.
* Total price is calculated correctly.

---

### TC-CART-002: Verify Product Quantity in Cart

**Priority:** Medium

**Scenario**

* Update product quantity before adding to cart.

**Validations**

* Selected quantity is reflected in cart.

---

### TC-CART-003: Remove Product from Cart

**Priority:** Medium

**Scenario**

* Remove a product from the shopping cart.

**Validations**

* Product is removed successfully.

---

### TC-CART-004: Search Products and Verify Cart After Login

**Priority:** High

**Scenario**

* Search products, add them to cart, and verify cart persistence after login.

**Validations**

* Products remain in cart after authentication.

---

### TC-CART-005: Add Recommended Product to Cart

**Priority:** Medium

**Scenario**

* Add a recommended product to cart.

**Validations**

* Product is added successfully.
* Product appears in cart.

---

## Checkout & Orders

### TC-CHK-001: Register During Checkout

**Priority:** Critical

**Scenario**

* Register a new account during checkout and complete purchase.

**Validations**

* Registration succeeds.
* Checkout completes successfully.
* Order is placed successfully.

---

### TC-CHK-002: Register Before Checkout

**Priority:** Critical

**Scenario**

* Register before checkout and complete purchase.

**Validations**

* Checkout succeeds.
* Order confirmation is displayed.

---

### TC-CHK-003: Login Before Checkout

**Priority:** Critical

**Scenario**

* Login with an existing account and complete purchase.

**Validations**

* Checkout succeeds.
* Order confirmation is displayed.

---

### TC-CHK-004: Verify Address Details in Checkout

**Priority:** High

**Scenario**

* Verify billing and delivery addresses during checkout.

**Validations**

* Delivery address matches account information.
* Billing address matches account information.

---

### TC-CHK-005: Download Invoice After Purchase

**Priority:** High

**Scenario**

* Download invoice after successful order placement.

**Validations**

* Invoice download starts successfully.
* Downloaded file exists.

---

## UI & Usability

### TC-UI-001: Scroll Up Using Arrow Button

**Priority:** Low

**Scenario**

* Scroll down and return to top using the arrow button.

**Validations**

* Page scrolls to top successfully.
* Header content becomes visible.

---

### TC-UI-002: Scroll Up Without Arrow Button

**Priority:** Low

**Scenario**

* Scroll down and manually return to top.

**Validations**

* Page scrolls to top successfully.
* Header content becomes visible.

---

## Additional Scenarios

### TC-ORDER-001: Verify Recommended Items Section

**Priority:** Medium

**Scenario**

* Validate recommended products section visibility.

**Validations**

* Recommended products section is displayed.
* Products can be interacted with.

---

### TC-ORDER-002: Verify Cart Persistence Across Session

**Priority:** High

**Scenario**

* Verify products remain associated with the logged-in user.

**Validations**

* Cart data is retained after authentication.

---

### TC-ORDER-003: Verify Payment Flow

**Priority:** Critical

**Scenario**

* Complete payment during checkout.

**Validations**

* Payment is processed successfully.
* Confirmation message is displayed.
