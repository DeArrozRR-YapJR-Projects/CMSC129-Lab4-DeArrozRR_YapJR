import { test, expect } from '@playwright/test';
    
     test.describe('Reminders App User Journey', () => {
       test.beforeEach(async ({ page }) => {
         // Navigate and wait for the page to be ready
         await page.goto('/');
         await expect(page.getByText(/reminders/i)).toBeVisible();
       });
    
      test('should allow a user to add a reminder', async ({ page }) => {
        const uniqueTitle = `Buy milk ${Math.random()}`;
        const input = page.getByPlaceholder(/enter a reminder/i);
        const addButton = page.getByRole('button', { name: /add/i });
   
        await input.fill(uniqueTitle);
        await addButton.click();
   
        // Explicitly wait for the new item to appear
        await expect(page.getByText(uniqueTitle)).toBeVisible({ timeout: 10000 });
      });
   
      test('should allow a user to delete a reminder', async ({ page }) => {
        const uniqueTitle = `Delete me ${Math.random()}`;
        
        // 1. Add the reminder
        await page.getByPlaceholder(/enter a reminder/i).fill(uniqueTitle);
        await page.getByRole('button', { name: /add/i }).click();
        
        // 2. Wait for it to definitely be on the screen
        const row = page.locator('li', { hasText: uniqueTitle });
        await expect(row).toBeVisible({ timeout: 10000 });
        
        // 3. Click the delete button inside that row
        // We use a simpler text-based selector which is more reliable in slow CI
        await row.locator('button', { hasText: 'Delete' }).click();
   
        // 4. Verify it's gone
        await expect(page.getByText(uniqueTitle)).not.toBeVisible({ timeout: 10000 });
      });
    });