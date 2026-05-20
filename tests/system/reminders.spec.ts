import { test, expect } from '@playwright/test';

test.describe('Reminders App User Journey', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await expect(page.getByText(/reminders/i)).toBeVisible();
  });

  // User Story 1: Add a reminder
  test('should allow a user to add a reminder', async ({ page }) => {
    const uniqueTitle = `Buy milk ${Math.random()}`;
    const input = page.getByPlaceholder(/enter a reminder/i);
    const addButton = page.getByRole('button', { name: /add/i });

    await input.fill(uniqueTitle);
    await addButton.click();

    await expect(page.getByText(uniqueTitle)).toBeVisible({ timeout: 10000 });
  });

  // User Story 2: View all reminders
  test('should display all added reminders', async ({ page }) => {
    const title1 = `Task alpha ${Math.random()}`;
    const title2 = `Task beta ${Math.random()}`;

    await page.getByPlaceholder(/enter a reminder/i).fill(title1);
    await page.getByRole('button', { name: /add/i }).click();
    await expect(page.getByText(title1)).toBeVisible({ timeout: 10000 });

    await page.getByPlaceholder(/enter a reminder/i).fill(title2);
    await page.getByRole('button', { name: /add/i }).click();
    await expect(page.getByText(title2)).toBeVisible({ timeout: 10000 });

    await expect(page.getByText(title1)).toBeVisible();
    await expect(page.getByText(title2)).toBeVisible();
  });

  // User Story 3: Delete a reminder
  test('should allow a user to delete a reminder', async ({ page }) => {
    const uniqueTitle = `Delete me ${Math.random()}`;

    await page.getByPlaceholder(/enter a reminder/i).fill(uniqueTitle);
    await page.getByRole('button', { name: /add/i }).click();

    const row = page.locator('li', { hasText: uniqueTitle });
    await expect(row).toBeVisible({ timeout: 10000 });

    await row.locator('button', { hasText: 'Delete' }).click();

    await expect(page.getByText(uniqueTitle)).not.toBeVisible({ timeout: 10000 });
  });

  // User Story 3 (continued): Mark a reminder as completed
  test('should allow a user to mark a reminder as completed', async ({ page }) => {
    const uniqueTitle = `Complete me ${Math.random()}`;

    await page.getByPlaceholder(/enter a reminder/i).fill(uniqueTitle);
    await page.getByRole('button', { name: /add/i }).click();

    const row = page.locator('li', { hasText: uniqueTitle });
    await expect(row).toBeVisible({ timeout: 10000 });

    await row.locator('button', { hasText: /complete|done/i }).click();

    await expect(row.locator('[data-testid="status"]')).toHaveText(/done|completed/i, { timeout: 10000 });
  });
});
