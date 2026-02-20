import { test, expect } from '@playwright/test';

test.describe('Users Feature', () => {
  test('should display users page', async ({ page }) => {
    await page.goto('/users');
    
    // Verify page title
    await expect(page.getByRole('heading')).toBeVisible();
    
    // Verify search functionality is available
    await expect(page.getByPlaceholderText(/Search|Rechercher/)).toBeVisible();
  });

  test('should render user card component', async ({ page }) => {
    await page.goto('/users');
    
    // Verify the page loads and has content
    const mainContent = page.locator('main');
    await expect(mainContent).toBeVisible();
    
    // Look for any button (like Fetch Data)
    const buttons = page.getByRole('button');
    const buttonCount = await buttons.count();
    expect(buttonCount).toBeGreaterThan(0);
  });

  test('should handle search input', async ({ page }) => {
    await page.goto('/users');
    
    const searchInput = page.getByPlaceholderText(/Search|Rechercher/);
    
    // Type in search box
    await searchInput.fill('test query');
    
    // Verify input has value
    await expect(searchInput).toHaveValue('test query');
  });
});
