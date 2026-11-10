import { expect, test } from '@playwright/test'

test('Alert Dialog Playground uses the official layout for each size', async ({ page }) => {
  // From the Radix Themes Playground at 100% scaling.
  const sizes = [
    { size: 1, width: 300, padding: 12, radius: 8, title: 14, titleGap: 4, description: 12, line: 16, footerGap: 12, buttonGap: 8, trigger: 24, button: 24 },
    { size: 2, width: 400, padding: 16, radius: 8, title: 20, titleGap: 8, description: 14, line: 20, footerGap: 16, buttonGap: 12, trigger: 32, button: 32 },
    { size: 3, width: 400, padding: 24, radius: 12, title: 20, titleGap: 12, description: 14, line: 20, footerGap: 16, buttonGap: 12, trigger: 40, button: 32 },
    { size: 4, width: 450, padding: 32, radius: 12, title: 24, titleGap: 12, description: 16, line: 24, footerGap: 24, buttonGap: 12, trigger: 48, button: 40 },
  ]
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.goto('/#components/alert-dialog')
  for (const { size, ...expected } of sizes) {
    await test.step(`Size ${size}`, async () => {
      const trigger = page.getByRole('button', { name: 'Open', exact: true }).nth(size - 1)
      const triggerHeight = await trigger.evaluate(el => parseFloat(getComputedStyle(el).height))
      await trigger.click()
      const dialog = page.getByRole('alertdialog', { name: 'Revoke access' })
      await expect(dialog).toHaveCSS('opacity', '1')
      const layout = await dialog.evaluate(popup => {
        const title = popup.querySelector('h2')!
        const description = popup.querySelector('p')!
        const [cancel, confirm] = popup.querySelectorAll('button')
        const pixels = (el: Element, property: string) => parseFloat(getComputedStyle(el).getPropertyValue(property))
        return {
          width: pixels(popup, 'width'), padding: pixels(popup, 'padding-left'), radius: pixels(popup, 'border-top-left-radius'),
          title: pixels(title, 'font-size'), titleGap: pixels(title, 'margin-bottom'),
          description: pixels(description, 'font-size'), line: pixels(description, 'line-height'),
          footerGap: Math.round(cancel.getBoundingClientRect().top - description.getBoundingClientRect().bottom),
          buttonGap: Math.round(confirm.getBoundingClientRect().left - cancel.getBoundingClientRect().right),
          button: pixels(confirm, 'height'),
        }
      })
      expect({ ...layout, trigger: triggerHeight }).toEqual(expected)
      await expect(dialog).toHaveAccessibleDescription(/existing sessions will be expired/)
      await expect(dialog.getByRole('button', { name: 'Revoke', exact: true })).toBeVisible()
      await dialog.getByRole('button', { name: 'Cancel' }).click()
      await expect(dialog).toBeHidden()
    })
  }
})

test('Classic button retains its material on keyboard focus and depresses on pointer down', async ({ page }) => {
  await page.goto('/?fixture=1&component=button')
  const button = page.getByRole('button', { name: 'classic', exact: true })
  await expect(button).not.toHaveCSS('box-shadow', 'none')
  const shadow = await button.evaluate(el => getComputedStyle(el).boxShadow)

  await page.keyboard.press('Tab')
  await expect(button).toBeFocused()
  await expect(button).toHaveCSS('outline-offset', '2px')
  await expect(button).toHaveCSS('box-shadow', shadow)

  await button.hover()
  await expect(button).toHaveCSS('background-color', 'rgb(62, 99, 221)')
  expect(await button.evaluate(el => getComputedStyle(el, '::after').backgroundColor)).toBe('rgb(51, 88, 212)')
  await page.mouse.down()
  await expect(button).toHaveCSS('padding-top', '2px')
  expect(await button.evaluate(el => getComputedStyle(el, '::after').boxShadow)).toBe('none')
  await page.mouse.up()
})

test('surface Checkbox retains its inset border on focus and uses the size-2 mark', async ({ page }) => {
  await page.goto('/?fixture=1&component=checkbox')
  const checkbox = page.getByRole('checkbox', { name: 'surface', exact: true })
  const border = await checkbox.evaluate(el => getComputedStyle(el).boxShadow)

  await page.keyboard.press('Tab')
  await page.keyboard.press('Tab')
  await page.keyboard.press('Tab')
  await page.keyboard.press('Tab')
  await expect(checkbox).toBeFocused()
  await expect(checkbox).toHaveCSS('border-radius', '3px')
  await expect(checkbox).toHaveCSS('box-shadow', border)
  await page.keyboard.press('Space')
  await expect(checkbox).toBeChecked()
  await expect(checkbox.locator('svg:visible')).toHaveCSS('width', '10px')
  await expect(page.getByRole('checkbox', { name: 'surface mixed' }).locator('svg:visible')).toHaveCSS('width', '10px')
})

test('surface Switch animates the track separately from the thumb', async ({ page }) => {
  await page.goto('/?fixture=1&component=switch')
  const control = page.getByRole('switch', { name: 'surface', exact: true })
  const track = () => control.evaluate(el => {
    const style = getComputedStyle(el, '::before')
    return {
      background: style.backgroundColor,
      position: style.backgroundPositionX,
      duration: style.transitionDuration,
    }
  })

  expect(await track()).toMatchObject({ position: '100%', duration: '0.12s, 0.14s, 0.14s, 0.14s' })
  await control.hover()
  await page.mouse.down()
  await expect.poll(track).toMatchObject({ background: 'rgba(0, 0, 45, 0.09)', duration: '0.03s' })
  await page.mouse.up()
  await expect(control).toBeChecked()
  await expect.poll(track).toMatchObject({ position: '0%', duration: '0.16s, 0.14s, 0.14s, 0.14s' })
  const thumb = control.locator('[data-slot=switch-thumb]')
  const bounds = (await control.boundingBox())!
  await expect.poll(async () => {
    const box = (await thumb.boundingBox())!
    return Math.round(box.x + box.width - bounds.x - bounds.width)
  }).toBe(-1)
  await page.emulateMedia({ reducedMotion: 'reduce' })
  expect(parseFloat((await track()).duration)).toBeLessThan(.001)
})

test('Select draws the Radix focus ring inside its trigger', async ({ page }) => {
  await page.goto('/?fixture=1&component=select')
  const trigger = page.getByRole('combobox', { name: 'Fruit' })
  await page.keyboard.press('Tab')
  await expect(trigger).toBeFocused()
  await expect(trigger).toHaveCSS('outline-offset', '-1px')
  await trigger.press('ArrowDown')
  const option = page.getByRole('option', { name: 'Apple' })
  await expect(option).toBeFocused()
  await expect(option).toHaveCSS('outline-style', 'none')
})

test('keyboard-opened Tooltip skips the delayed-hover entrance', async ({ page }) => {
  await page.goto('/?fixture=1&component=tooltip')
  const tooltip = page.getByRole('tooltip')
  await page.keyboard.press('Tab')
  await expect(tooltip).toHaveCSS('transition-duration', '0s')
})

test('Popper exit uses the same easing curve as its entrance', async ({ page }) => {
  await page.goto('/?fixture=1&component=popover')
  await page.getByRole('button', { name: 'Comment' }).click()
  const popup = page.locator('[data-slot=popover-content]')
  const easing = 'cubic-bezier(0.16, 1, 0.3, 1), cubic-bezier(0.16, 1, 0.3, 1)'
  await expect(popup).toHaveCSS('opacity', '1')
  await expect(popup).toHaveCSS('transition-timing-function', easing)
  await page.keyboard.press('Escape')
  await expect(popup.and(page.locator('[data-ending-style]'))).toHaveCSS('transition-timing-function', easing)
  await expect(popup).toBeHidden()
})

test('a size-1 Popover uses the Radix overlay radius', async ({ page }) => {
  await page.goto('/#components/popover')
  await page.getByRole('button', { name: 'Comment', exact: true }).first().click()
  await expect(page.locator('[data-slot=popover-content]')).toHaveCSS('border-radius', '8px')
})

test('Popover starts at the trigger edge with the Radix 8px gap', async ({ page }) => {
  await page.goto('/?fixture=1&component=popover')
  const trigger = page.getByRole('button', { name: 'Comment' })
  await trigger.click()
  const popup = page.locator('[data-slot=popover-content]')
  await expect(popup).toHaveCSS('opacity', '1')
  const anchor = (await trigger.boundingBox())!
  const content = (await popup.boundingBox())!
  expect(content.x).toBeCloseTo(anchor.x, 0)
  expect(content.y - anchor.y - anchor.height).toBeCloseTo(8, 0)
})

test('Classic Card paints its panel only on the inset material layer', async ({ page }) => {
  await page.goto('/?fixture=1&component=card&theme=%7B%22appearance%22%3A%22dark%22%7D')
  const card = page.locator('[data-slot=card][data-variant=classic]')
  await expect(card).toHaveCSS('background-color', 'rgba(0, 0, 0, 0)')
  await expect(card).toHaveCSS('backdrop-filter', 'none')
  expect(await card.evaluate(el => getComputedStyle(el, '::before').backdropFilter)).toBe('blur(64px)')
})

test('dark Kbd uses the dark inset highlight and regular system text', async ({ page }) => {
  await page.goto('/?fixture=1&component=kbd&theme=%7B%22appearance%22%3A%22dark%22%7D')
  const key = page.getByText('⌘ Tab').first()
  await expect(key).toHaveCSS('font-weight', '400')
  expect(await key.evaluate(el => getComputedStyle(el).boxShadow)).toContain('rgba(241, 247, 254, 0.71) 0px 0.48px')
})

test('soft Text Field keeps its colored placeholder and uses only the inset focus outline', async ({ page }) => {
  await page.goto('/?fixture=1&component=text-field')
  const input = page.getByRole('textbox', { name: 'soft' })
  expect(await input.evaluate(el => getComputedStyle(el, '::placeholder').opacity)).toBe('0.6')
  await input.click()
  await expect(input).toHaveCSS('outline-offset', '-1px')
  await expect(input).toHaveCSS('box-shadow', 'none')
})

test('Classic Progress paints the track shadow above the completed segment', async ({ page }) => {
  await page.goto('/?fixture=1&component=progress')
  const track = page.getByRole('progressbar', { name: 'classic' }).locator('[data-slot=progress-track]')
  await expect(track).toHaveCSS('box-shadow', 'none')
  expect(await track.evaluate(el => getComputedStyle(el, '::after').boxShadow)).not.toBe('none')
})

test('soft Slider uses the Radix range tint and keeps the focus ring on its visible thumb', async ({ page }) => {
  await page.goto('/?fixture=1&component=slider')
  const slider = page.getByRole('slider', { name: 'soft', exact: true })
  const root = page.locator('[data-slot=slider][data-variant=soft]')
  await expect(root.locator('[data-slot=slider-range]')).toHaveCSS('background-color', 'rgb(193, 208, 255)')
  await page.keyboard.press('Tab')
  await page.keyboard.press('Tab')
  await page.keyboard.press('Tab')
  await expect(slider).toBeFocused()
  await expect(root.locator('[data-slot=slider-thumb]')).toHaveCSS('box-shadow', /0px 0px 0px 5px/)
})
