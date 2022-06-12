import { test, expect } from '@playwright/test';

const black = 'rgb(22, 26, 29)';
const white = 'rgb(251, 251, 251)';

test.afterEach(async ({ page }) => {
  await page.evaluate(() => localStorage.removeItem('theme'));
});

test.describe('Should infer the theme from device system preferences', () => {
  test('System preference is dark', async ({ page }) => {
    await page.emulateMedia({ colorScheme: 'dark' });
    await page.goto('/blog');
    await expect(page.locator('html')).toHaveCSS('color-scheme', 'dark');
    await expect(page.locator('body')).toHaveCSS('color', white);
    await expect(page.locator('body')).toHaveCSS('background-color', black);
  });
  test('System preference is light', async ({ page }) => {
    await page.emulateMedia({ colorScheme: 'light' });
    await page.goto('/blog');
    await expect(page.locator('html')).toHaveCSS('color-scheme', 'light');
    await expect(page.locator('body')).toHaveCSS('color', black);
    await expect(page.locator('body')).toHaveCSS('background-color', white);
  });
});

test.describe('Should be able to toggle the theme', () => {
  test('Using togglee theme button ', async ({ page }) => {
    await page.goto('/blog');
    await expect(page.locator('html')).toHaveCSS('color-scheme', 'light');
    await page.click('button[aria-label="Toggle theme"]');
    await expect(page.locator('html')).toHaveCSS('color-scheme', 'dark');
  });
  test('Using system preference', async ({ page }) => {
    await page.goto('/blog');
    await expect(page.locator('html')).toHaveCSS('color-scheme', 'light');
    await page.emulateMedia({ colorScheme: 'dark' });
    await expect(page.locator('html')).toHaveCSS('color-scheme', 'dark');
  });
});
