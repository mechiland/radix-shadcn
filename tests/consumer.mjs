import { chromium } from '@playwright/test'
import { readFileSync, writeFileSync } from 'node:fs'
import { spawn } from 'node:child_process'
import { createServer } from 'node:net'
import assert from 'node:assert/strict'

const consumer = readFileSync('evidence/registry/consumer-path.txt', 'utf8').trim()
const reserve = createServer()
await new Promise(resolve => reserve.listen(0, '127.0.0.1', resolve))
const port = reserve.address().port
await new Promise(resolve => reserve.close(resolve))
const server = spawn(process.execPath, ['node_modules/vite/bin/vite.js', 'preview', '--host', '127.0.0.1', '--port', String(port), '--strictPort'], { cwd: consumer, stdio: ['ignore', 'pipe', 'pipe'] })
let output = ''
server.stdout.on('data', data => { output += data })
server.stderr.on('data', data => { output += data })
let browser
try {
  const base = `http://127.0.0.1:${port}`
  for (let i = 0; i < 100; i++) {
    if (server.exitCode !== null) throw Error(output)
    try { if ((await fetch(base)).ok()) break } catch { /* Wait for the owned preview process. */ }
    await new Promise(resolve => setTimeout(resolve, 100))
  }
  browser = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH || '/usr/bin/google-chrome', args: ['--no-sandbox'] })
  const page = await browser.newPage({ viewport: { width: 1200, height: 800 }, deviceScaleFactor: 1 })
  const errors = []
  page.on('pageerror', error => errors.push(error.message))
  page.on('console', message => { if (message.type() === 'error') errors.push(message.text()) })
  await page.goto(base)
  await page.getByRole('button', { name: 'Installed button', exact: true }).waitFor()
  const theme = await page.locator('.ds-theme[data-root-theme=true]').evaluate(el => ({ height: el.getBoundingClientRect().height, appearance: el.classList.contains('dark'), accent: getComputedStyle(el).getPropertyValue('--accent-9').trim(), background: getComputedStyle(el).backgroundColor }))
  assert(theme.height >= 800 && theme.appearance && theme.background !== 'rgb(255, 255, 255)', 'Installed root theme must cover the viewport with its dark appearance')
  const checkbox = page.getByRole('checkbox', { name: 'Installed checkbox' })
  await checkbox.focus()
  await page.keyboard.press('Space')
  assert.equal(await checkbox.getAttribute('aria-checked'), 'true')
  const trigger = page.getByRole('button', { name: 'Open installed dialog' })
  await trigger.click()
  await page.getByRole('dialog').waitFor()
  const portal = await page.getByRole('dialog').evaluate(el => ({ accent: getComputedStyle(el).getPropertyValue('--accent-9').trim(), theme: el.closest('.ds-theme')?.getAttribute('data-accent-color'), background: getComputedStyle(el).backgroundColor }))
  assert.equal(portal.accent, theme.accent)
  assert.equal(portal.theme, 'yellow')
  await page.getByRole('dialog').getByRole('button', { name: 'Close', exact: true }).first().click()
  await page.getByRole('dialog').waitFor({ state: 'hidden' })
  assert(await trigger.evaluate(el => el === document.activeElement), 'Dialog must restore focus')
  const select = page.getByRole('combobox', { name: 'Installed select' })
  await select.click()
  await page.getByRole('option', { name: 'Two', exact: true }).click()
  assert.match(await select.innerText(), /two/i)
  await page.screenshot({ path: 'evidence/registry/installed-consumer.png', fullPage: true })
  assert.deepEqual(errors, [])
  writeFileSync('evidence/registry/interaction.json', JSON.stringify({ consumer, browser: await browser.version(), viewport: { width: 1200, height: 800 }, theme, portal, checks: ['root viewport', 'installed CSS and yellow/dark tokens', 'keyboard checkbox', 'dialog focus restoration', 'portal theme inheritance', 'select change'], errors, status: 'passed' }, null, 2))
  console.log('Installed production consumer: theme, keyboard, dialog, focus, portal and Select passed.')
} finally {
  await browser?.close()
  server.kill('SIGTERM')
}
