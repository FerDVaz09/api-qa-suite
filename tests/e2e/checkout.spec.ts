import { test, expect } from '@playwright/test';

test.describe('🛒 Saucedemo E2E Checkout', () => {
  test('Flujo de compra exitoso', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');

    // Login
    await page.fill('[data-test="username"]', 'standard_user');
    await page.fill('[data-test="password"]', 'secret_sauce');
    await page.click('[data-test="login-button"]');
    await expect(page).toHaveURL(/inventory.html/);

    // Agregar producto al carrito
    await page.click('[data-test="add-to-cart-sauce-labs-backpack"]');
    await page.click('.shopping_cart_link');
    await expect(page).toHaveURL(/cart.html/);

    // Checkout
    await page.click('[data-test="checkout"]');
    await page.fill('[data-test="firstName"]', 'QA');
    await page.fill('[data-test="lastName"]', 'Engineer');
    await page.fill('[data-test="postalCode"]', '12345');
    await page.click('[data-test="continue"]');

    // Finalizar
    await page.click('[data-test="finish"]');
    await expect(page.locator('.complete-header')).toHaveText('Thank you for your order!');
    
    console.log('✅ Checkout E2E completado con éxito');
  });
});
