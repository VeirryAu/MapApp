const express = require('express')
const next = require('next')
const { join } = require('path')
const LRUCache = require('lru-cache')

const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

// This is where we cache our rendered HTML pages
const ssrCache = new LRUCache({
  max: 100,
  maxAge: 1000 * 60 * 60 // 1hour
})


/*
 * NB: make sure to modify this to take into account anything that should trigger
 * an immediate page change (e.g a locale stored in req.session)
 */
function getCacheKey (req) {
  return `${req.url}`
}

async function renderAndCache (req, res, pagePath, queryParams) {
  const key = getCacheKey(req)

  // If we have a page in the cache, let's serve it
  if (ssrCache.has(key)) {
    res.setHeader('x-cache', 'HIT')
    res.send(ssrCache.get(key))
    return
  }

  try {
    // If not let's render the page into HTML
    const html = await app.renderToHTML(req, res, pagePath, queryParams)

    // Something is wrong with the request, let's skip the cache
    if (res.statusCode !== 200) {
      res.send(html)
      return
    }

    // Let's cache this page
    ssrCache.set(key, html)

    res.setHeader('x-cache', 'MISS')
    res.send(html)
  } catch (err) {
    app.renderError(err, req, res, pagePath, queryParams)
  }
}

app.prepare()
  .then(() => {
    const server = express()

    server
      .get('/', (req, res) => renderAndCache(req, res, '/'))
      .get('/home', (req, res) => renderAndCache(req, res, '/'))
      .get('/list', (req, res) => renderAndCache(req, res, '/list'))
      .get('/list/:id', (req, res) => renderAndCache(req, res, '/list'))
      .get('*', (req, res) => {
        if (req.url.includes('/sw')) {
          const filePath = join(__dirname, 'static', 'workbox', 'sw.js')
          app.serveStatic(req, res, filePath)
        } else if (req.url.startsWith('static/workbox/')) {
          app.serveStatic(req, res, join(__dirname, req.url))
        } else {
          handle(req, res, req.url)
        }
      })
      .listen(port, (err) => {
        if (err) throw err
        console.log(`> Ready on http://localhost:${port}`)
      })
  })
