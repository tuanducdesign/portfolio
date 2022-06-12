import { test, expect } from '@playwright/test';

test('Hero contains my name', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('h1')).toHaveText(/ashal farhan/i);
});

test('Navigate to my blog', async ({ page }) => {
  await page.goto('/');
  await page.click('text=blog');
  await expect(page).toHaveURL('/blog');
  await expect(page.locator('h1')).toContainText(/welcome to my blog/i);
});
