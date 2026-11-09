import { expect, test } from '@playwright/test'

test('Create previews and restores Radix settings with shadcn fonts and icons', async ({ page }) => {
  await page.goto('/#create')
  await expect(page.getByRole('heading', { name: 'Create a theme' })).toBeVisible()
  await page.getByLabel('Accent color').selectOption('ruby')
  await page.getByLabel('Radius').selectOption('full')
  await page.getByRole('button', { name: 'Dark', exact: true }).click()
  await page.getByLabel('Body font').selectOption('manrope')
  await page.getByLabel('Heading font').selectOption('geist')
  await page.getByLabel('Icon library').selectOption('tabler')

  const preview = page.getByRole('region', { name: 'Theme preview' })
  await expect(preview).toHaveAttribute('data-accent-color', 'ruby')
  await expect(preview).toHaveAttribute('data-radius', 'full')
  await expect(preview).toHaveClass(/\bdark\b/)
  await expect(preview).toHaveCSS('font-family', /Manrope/)
  await expect(preview.locator('[data-slot="card-title"]').first()).toHaveCSS('font-family', /Geist/)
  await expect(preview.locator('svg[data-icon-library="tabler"]').first()).toBeVisible()
  await expect(page).toHaveURL(/iconLibrary=tabler.*#create/)

  await page.reload()
  await expect(page.getByLabel('Accent color')).toHaveValue('ruby')
  await expect(page.getByLabel('Body font')).toHaveValue('manrope')
  await expect(page.getByLabel('Heading font')).toHaveValue('geist')
  await expect(page.getByLabel('Icon library')).toHaveValue('tabler')
})

test('Create provides a project initialization command for the selected theme', async ({ page, request }) => {
  await page.goto('/#create')
  await page.getByLabel('Accent color').selectOption('teal')
  await page.getByRole('button', { name: 'Get code', exact: true }).click()
  const dialog = page.getByRole('dialog', { name: 'Initialize your project' })
  await dialog.getByLabel('Project name').fill('sample-project')

  const command = dialog.getByLabel('Initialization command')
  await expect(command).toContainText('/create/init.mjs')
  await expect(command).toContainText('sample-project')
  await expect(command).toContainText('"accentColor":"teal"')
  await expect(await request.get('/create/init.mjs')).toBeOK()
})

test('Create fits a mobile viewport with the preview below the controls', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto('/#create')
  const controls = page.getByRole('complementary', { name: 'Theme settings' })
  const preview = page.getByRole('region', { name: 'Theme preview' })
  await expect(controls).toBeVisible()
  await expect(preview).toBeVisible()
  expect((await preview.boundingBox())!.y).toBeGreaterThan((await controls.boundingBox())!.y)
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBe(390)
})
