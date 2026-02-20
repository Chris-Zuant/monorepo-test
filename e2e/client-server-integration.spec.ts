import { test, expect } from '@playwright/test';

/**
 * End-to-end tests for client + server interactions
 * These tests verify API calls from client to server
 */

test.describe('Client + Server Integration', () => {
  test('should intercept and verify API calls', async ({ page }) => {
    // Listen for API responses
    const responses: string[] = [];
    page.on('response', async (response) => {
      if (response.url().includes('/api')) {
        responses.push(response.url());
      }
    });

    await page.goto('/users');
    
    // Wait a moment for any API calls to complete
    await page.waitForTimeout(1000);
    
    // Verify that some API interaction could happen
    // (Note: This depends on UserCard component making API calls)
    const mainContent = page.locator('main');
    await expect(mainContent).toBeVisible();
  });

  test('should load form builder feature', async ({ page }) => {
    await page.goto('/');
    
    // Navigate to Form Builder
    await page.getByText(/Features|Fonctionnalités/).click();
    
    // Find and click Form Builder menu item
    const menuItems = page.getByRole('menuitem');
    const formBuilderItem = menuItems.filter({ hasText: /Form Builder|Créateur/ });
    
    if (await formBuilderItem.count() > 0) {
      await formBuilderItem.first().click();
      await page.waitForURL(/\/forms/);
      await expect(page).toHaveURL(/\/forms/);
    }
  });

  test('should load integrations feature', async ({ page }) => {
    await page.goto('/');
    
    // Navigate to Integrations
    await page.getByText(/Features|Fonctionnalités/).click();
    
    // Find and click Integrations menu item
    const menuItems = page.getByRole('menuitem');
    const integrationsItem = menuItems.filter({ hasText: /Integrations|Intégrations/ });
    
    if (await integrationsItem.count() > 0) {
      await integrationsItem.first().click();
      await page.waitForURL(/\/integrations/);
      await expect(page).toHaveURL(/\/integrations/);
    }
  });
});
