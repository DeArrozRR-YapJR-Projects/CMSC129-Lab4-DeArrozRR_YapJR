import { test, expect } from '@playwright/test';
    
         test.describe('Reminders App User Journey', () => {
           test.beforeEach(async ({ page }) => {
         await page.goto('/');
           });
    
          test('should allow a user to add a reminder', async ({ page }) => {
            const input = page.getByPlaceholder(/enter a reminder/i);
            const addButton = page.getByRole('button', { name: /add/i });
   
            await input.fill('Buy milk');
            await addButton.click();
   
            await expect(page.getByText('Buy milk')).toBeVisible();
          });
   
          test('should allow a user to delete a reminder', async ({ page }) => {
            // Add one first so we have something to delete
            await page.getByPlaceholder(/enter a reminder/i).fill('Delete me');
            await page.getByRole('button', { name: /add/i }).click();
            
            const deleteButton = page.getByRole('button', { name: /delete/i }).first();
            await deleteButton.click();
   
            await expect(page.getByText('Delete me')).not.toBeVisible();
          });
        });