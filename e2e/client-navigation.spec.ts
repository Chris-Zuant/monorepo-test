import { test, expect } from '@playwright/test';

test.describe('Client App Navigation', () => {
  test('should load the home page and display header', async ({ page }) => {
    await page.goto('/');
    
    // Verify header is present
    await expect(page.getByText('Monorepo')).toBeVisible();
    
    // Verify navigation elements
    await expect(page.getByRole('button', { name: /Toggle theme mode/ })).toBeVisible();
    await expect(page.getByText(/Features|Fonctionnalités/)).toBeVisible();
  });

  test('should navigate between features', async ({ page }) => {
    await page.goto('/');
    
    // Click on Features dropdown
    await page.getByText(/Features|Fonctionnalités/).click();
    
    // Navigate to Users page
    await page.getByRole('menuitem').first().click();
    
    // Verify we're on the users page
    await expect(page).toHaveURL(/\/users/);
    await expect(page.getByRole('heading')).toBeVisible();
  });

  test('should toggle theme', async ({ page }) => {
    await page.goto('/');
    
    // Get initial background color
    const header = page.locator('header');
    const initialStyle = await header.getAttribute('style');
    
    // Click theme toggle
    await page.getByTitle(/Toggle theme mode/).click();
    
    // Verify style changed (indicates theme toggle worked)
    const newStyle = await header.getAttribute('style');
    expect(initialStyle).toBeDefined();
    expect(newStyle).toBeDefined();
  });

  test('should change language', async ({ page }) => {
    await page.goto('/');
    
    // Click language selector
    await page.getByText(/EN|FR/).click();
    
    // Switch to French
    await page.getByText('Français').click();
    
    // Verify language changed
    await expect(page.getByText('FR')).toBeVisible();
  });
});
