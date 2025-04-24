import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright'; // 1

test('has title', async ({ page }) => {
  await page.goto('http://localhost:4200/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Just Like People - Home/);
  await page.getByRole('link', { name: 'Products' }).click();
  await page.getByRole('link', { name: 'Animals in Glasses' }).click();

  await expect(page).toHaveTitle(/Just Like People - Products/);

  const addButton = page
    .getByRole('button', { name: 'Add one to cart' })
    .filter({
      hasText: '+',
    });

  await addButton.click();
  await addButton.click();
  await page
    .getByRole('button', { name: 'Add one to the 2 in the cart' })
    .click();
  await page.getByRole('button', { name: 'Remove one from cart' }).click();
  await page.getByRole('link', { name: 'Cart' }).click();

  await expect(page).toHaveTitle(/Just Like People - Cart/);

  //   const addedItem = page
  //     .getByRole('listitem')
  //     .filter({ hasText: /Dark Shades For Cool Cats/ });
  //   await expect(addedItem.getByRole('button').filter({hasText:'2'})).toBeVisible();
  //   await expect(addedItem.getByRole('button')).toHaveText('2', { timeout: 5000 }).toBeVisible();

  const item = page.locator('li', { hasText: 'Dark Shades For Cool Cats' });
  await expect(item).toBeVisible();
});


test.describe('homepage', () => {
  test('home should not have any automatically detectable accessibility issues', async ({ page }) => {
    await page.goto('http://localhost:4200/'); // 3

    const accessibilityScanResults = await new AxeBuilder({ page }).analyze(); // 4

    expect(accessibilityScanResults.violations).toEqual([]); // 5
  });

  test('cart should not have any automatically detectable accessibility issues', async ({ page }) => {
    await page.goto('http://localhost:4200/cart'); // 3

    const accessibilityScanResults = await new AxeBuilder({ page }).analyze(); // 4

    expect(accessibilityScanResults.violations).toEqual([]); // 5
  });

  test('contact should not have any automatically detectable accessibility issues', async ({ page }) => {
    await page.goto('http://localhost:4200/contact'); // 3

    const accessibilityScanResults = await new AxeBuilder({ page }).analyze(); // 4

    expect(accessibilityScanResults.violations).toEqual([]); // 5
  });
  
  test('products should not have any automatically detectable accessibility issues', async ({ page }) => {
    await page.goto('http://localhost:4200/products/glasses?productId=cat-glasses-1'); // 3

    const accessibilityScanResults = await new AxeBuilder({ page }).analyze(); // 4

    expect(accessibilityScanResults.violations).toEqual([]); // 5
  });
});