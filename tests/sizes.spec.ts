import { expect, test } from '@playwright/test'

// Each Playground page lists Radix sizes 1 to n. Its first row of samples passes `size`.
const sizedComponents = [
  { id: 'avatar', target: '[data-slot=avatar]', count: 9 },
  { id: 'badge', target: '[data-slot=badge]', count: 3 },
  { id: 'callout', target: '.ds-callout', count: 3 },
  { id: 'card', target: '[data-slot=card]', count: 5 },
  { id: 'checkbox', target: '[data-slot=checkbox]', count: 3 },
  { id: 'checkbox-cards', target: '.ds-choice-card', count: 3 },
  { id: 'checkbox-group', target: '[data-slot=checkbox-group]', count: 3 },
  { id: 'data-list', target: '[data-slot=data-list]', count: 3 },
  { id: 'kbd', target: '[data-slot=kbd]', count: 9 },
  { id: 'progress', target: '[data-slot=progress]', count: 3 },
  { id: 'radio-cards', target: '.ds-choice-card', count: 3 },
  { id: 'radio-group', target: '[data-slot=radio-group]', count: 3 },
  { id: 'scroll-area', target: '[data-slot=scroll-area]', count: 3 },
  { id: 'segmented-control', target: '[data-slot=tabs]', count: 3 },
  { id: 'select', target: '[data-slot=select-trigger]', count: 3 },
  { id: 'separator', target: '[data-slot=separator]', count: 4 },
  { id: 'slider', target: '[data-slot=slider]', count: 3 },
  { id: 'spinner', target: '[data-slot=spinner]', count: 3 },
  { id: 'switch', target: '[data-slot=switch]', count: 3 },
  { id: 'table', target: '[data-slot=table]', count: 3 },
  { id: 'tabs', target: '[data-slot=tabs]', count: 2 },
  { id: 'text-area', target: '[data-slot=textarea]', count: 3 },
  { id: 'text-field', target: '[data-slot=input]', count: 3 },
]

for (const { id, target, count } of sizedComponents) {
  test(`${id} maps size 1-${count} to the Radix scale`, async ({ page }) => {
    await page.goto(`/#components/${id}`)
    const samples = page.locator('.size-grid').first().locator('.size-sample')
    await expect(samples).toHaveCount(count)
    for (let size = 1; size <= count; size++) {
      await expect(samples.nth(size - 1).locator(target).first()).toHaveAttribute('data-scale', String(size))
    }
  })
}

test('Button and icon button map size 1-4 to the Radix control sizes', async ({ page }) => {
  for (const id of ['button', 'icon-button']) {
    await page.goto(`/#components/${id}`)
    const samples = page.locator('.size-grid').first().locator('.size-sample')
    for (let size = 1; size <= 4; size++) {
      const button = samples.nth(size - 1).getByRole('button')
      await expect(button).toHaveClass(new RegExp(`\\bds-size-${size}\\b`))
      if (id === 'icon-button') {
        await expect(button).toHaveClass(/\bds-icon\b/)
        const box = (await button.boundingBox())!
        expect(box.width).toBe(box.height)
      }
    }
  }
})

test('a size-1 Dropdown Menu passes its size to the submenu', async ({ page }) => {
  await page.goto('/#components/dropdown-menu')
  await page.locator('.size-grid').first().locator('.size-sample').first().getByRole('button', { name: 'Options' }).click()
  const menu = page.locator('[data-slot=dropdown-menu-content]')
  await expect(menu).toHaveAttribute('data-scale', '1')
  await page.getByRole('menuitem', { name: 'More tools' }).hover()
  const submenu = page.locator('[data-slot=dropdown-menu-sub-content]')
  await expect(submenu).toHaveAttribute('data-scale', '1')
  await expect(submenu.getByRole('menuitem', { name: 'Bookmark page' })).toHaveCSS('height', '24px')
})

test('a size-1 Select passes its size to the trigger and the list', async ({ page }) => {
  await page.goto('/#components/select')
  const trigger = page.locator('.size-grid').first().locator('.size-sample').first().getByRole('combobox')
  await expect(trigger).toHaveAttribute('data-scale', '1')
  await trigger.click()
  await expect(page.getByRole('listbox')).toBeVisible()
  await expect(page.locator('[data-slot=select-content]')).toHaveAttribute('data-scale', '1')
})
