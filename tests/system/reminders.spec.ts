 import { test, expect } from '@playwright/test';
    
     test.describe('Reminders App User Journey', () => {
       test.beforeEach(async ({ page }) => {
         await page.goto('/');
       });
    
       test('should allow a user to add a reminder', async ({ page }) => {
         const uniqueTitle = `Buy milk ${Math.random()}`; // Use a unique title
        const input = page.getByPlaceholder(/enter a reminder/i);
        const addButton = page.getByRole('button', { name: /add/i });
   
        await input.fill(uniqueTitle);
        await addButton.click();
   
        await expect(page.getByText(uniqueTitle)).toBeVisible();
      });
   
      test('should allow a user to delete a reminder', async ({ page }) => {
        const uniqueTitle = `Delete me ${Math.random()}`; // Use a unique title
        
        // Add the specific reminder
        await page.getByPlaceholder(/enter a reminder/i).fill(uniqueTitle);
        await page.getByRole('button', { name: /add/i }).click();
       
        // Find the specific row for THIS reminder and click its delete button
        const row = page.locator('li', { hasText: uniqueTitle });
        await row.getByRole('button', { name: /delete/i }).click();
   
       // Verify only THIS specific reminder is gone
        await expect(page.getByText(uniqueTitle)).not.toBeVisible();
      });
    });