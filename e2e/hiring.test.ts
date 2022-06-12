import { test, expect } from '@playwright/test';

test('Hiring flow => Download Resume', async ({ page }) => {
  await page.goto('/');
  await page.click('text=hire me');
  await expect(page).toHaveURL('/hire');
  await page.click('text=my resume');
  const download = await page.waitForEvent('download');
  expect(download.suggestedFilename()).toMatch(/resume\.pdf$/i);
  await download.delete();
});
