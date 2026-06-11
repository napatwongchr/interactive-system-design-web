import { expect, test } from '@playwright/test'

const STORAGE_KEY = 'system-design-progress'

// helpers
function progressJson(completedLessons: string[], currentLessonId: string) {
  return JSON.stringify({ completedLessons, currentLessonId })
}

test.describe('lesson navigation', () => {
  test.beforeEach(async ({ page }) => {
    // Clear progress before each test
    await page.goto('/learn/http-cycle')
    await page.evaluate((key) => localStorage.removeItem(key), STORAGE_KEY)
  })

  test('first lesson is accessible with no prior progress', async ({ page }) => {
    await page.goto('/learn/http-cycle')
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
    expect(page.url()).toContain('/learn/http-cycle')
  })

  test('locked lesson redirects to current lesson', async ({ page }) => {
    // Set progress where current lesson is http-cycle (fresh start)
    await page.evaluate(
      ({ key, val }) => localStorage.setItem(key, val),
      { key: STORAGE_KEY, val: progressJson([], 'http-cycle') },
    )
    // three-layers is lesson 2 and not yet accessible
    await page.goto('/learn/three-layers')
    await page.waitForURL(/\/learn\/http-cycle/)
    expect(page.url()).toContain('/learn/http-cycle')
  })

  test('completed lesson is accessible without redirect', async ({ page }) => {
    await page.evaluate(
      ({ key, val }) => localStorage.setItem(key, val),
      { key: STORAGE_KEY, val: progressJson(['http-cycle'], 'three-layers') },
    )
    await page.goto('/learn/http-cycle')
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
    expect(page.url()).toContain('/learn/http-cycle')
  })

  test('"mark complete" button writes progress and navigates to next lesson', async ({ page }) => {
    await page.evaluate(
      ({ key, val }) => localStorage.setItem(key, val),
      { key: STORAGE_KEY, val: progressJson([], 'http-cycle') },
    )
    await page.goto('/learn/http-cycle')
    await page.getByRole('button', { name: /mark complete/i }).click()
    await page.waitForURL(/\/learn\/three-layers/)
    expect(page.url()).toContain('/learn/three-layers')
    // verify progress was persisted
    const stored = await page.evaluate((key) => localStorage.getItem(key), STORAGE_KEY)
    const parsed = JSON.parse(stored!)
    expect(parsed.completedLessons).toContain('http-cycle')
  })

  test('previous lesson button navigates back', async ({ page }) => {
    await page.evaluate(
      ({ key, val }) => localStorage.setItem(key, val),
      { key: STORAGE_KEY, val: progressJson(['http-cycle'], 'three-layers') },
    )
    await page.goto('/learn/three-layers')
    await page.getByRole('button', { name: /the http cycle/i }).click()
    await page.waitForURL(/\/learn\/http-cycle/)
    expect(page.url()).toContain('/learn/http-cycle')
  })

  test('final lesson "mark complete" does not navigate away', async ({ page }) => {
    const lastId = 'consistency-vs-availability'
    await page.evaluate(
      ({ key, val }) => localStorage.setItem(key, val),
      { key: STORAGE_KEY, val: progressJson([], lastId) },
    )
    await page.goto(`/learn/${lastId}`)
    await page.getByRole('button', { name: /mark complete/i }).click()
    // URL should stay the same
    await page.waitForTimeout(500)
    expect(page.url()).toContain(`/learn/${lastId}`)
  })
})
