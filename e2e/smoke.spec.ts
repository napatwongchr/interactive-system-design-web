import { expect, test } from '@playwright/test'

test('homepage loads and shows the app title', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByRole('heading', { name: /interactive system design/i })).toBeVisible()
})

test('placeholder lesson page loads', async ({ page }) => {
  await page.goto('/lesson/placeholder')
  await expect(page.getByRole('heading', { name: /placeholder lesson/i })).toBeVisible()
})
