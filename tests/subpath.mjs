import { createServer } from 'node:http'
import { readFile } from 'node:fs/promises'
import { resolve, extname } from 'node:path'

// Serve the untouched production output below a mount point, with no SPA rewrite.
const root = resolve('dist')
const mime = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.svg': 'image/svg+xml', '.jpg': 'image/jpeg', '.png': 'image/png', '.woff2': 'font/woff2' }
const server = createServer(async (request, response) => {
  try {
    const path = decodeURIComponent(new URL(request.url, 'http://localhost').pathname)
    if (!path.startsWith('/nested/')) throw Error('Outside mount')
    const file = resolve(root, path.slice('/nested/'.length) || 'index.html')
    if (!file.startsWith(root + '/')) throw Error('Outside output')
    const data = await readFile(file)
    response.writeHead(200, { 'Content-Type': mime[extname(file)] || 'application/octet-stream' })
    response.end(data)
  } catch { response.writeHead(404); response.end('Not found') }
})
await new Promise(resolve => server.listen(0, '127.0.0.1', resolve))
try {
  process.env.STATIC_URL = `http://127.0.0.1:${server.address().port}/nested`
  process.env.STATIC_SUFFIX = '-subpath'
  await import('./static.mjs')
} finally { await new Promise(resolve => server.close(resolve)) }
