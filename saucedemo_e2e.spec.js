const { test, expect } = require('@playwright/test');

// --- THE LABELS ---
const UI = {
  USER_INPUT: 'input[data-test="username"]',
  PASS_INPUT: 'input[data-test="password"]',
  LOGIN_BTN: 'input[data-test="login-button"]',
  ADD_TO_CART: 'button[data-test="add-to-cart-sauce-labs-backpack"]',
  CART_BADGE: '.shopping_cart_badge',
  CHECKOUT_BTN: 'button[data-test="checkout"]'
};

test('TC-01: Full Purchase Journey', async ({ page }) => {
  // 1. Login
  await page.goto('https://www.saucedemo.com/');
  await page.locator(UI.USER_INPUT).fill('standard_user');
  await page.locator(UI.PASS_INPUT).fill('secret_sauce');
  await page.locator(UI.LOGIN_BTN).click();

  // 2. Action: Add to Cart
  await page.locator(UI.ADD_TO_CART).click();

  // 3. Assertion: Verify the cart icon shows "1" item
  await expect(page.locator(UI.CART_BADGE)).toHaveText('1');

  // 4. Action: Go to Checkout
  await page.locator('.shopping_cart_link').click();
  await page.locator(UI.CHECKOUT_BTN).click();

  // 5. Final Assertion: Verify we are on the Information Page
  await expect(page).toHaveURL(/checkout-step-one/);
});