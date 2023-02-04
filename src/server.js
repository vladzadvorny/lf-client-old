import Koa from 'koa'
import render from 'preact-render-to-string'
import serialize from 'serialize-javascript'
import serve from 'koa-static'
import { toStatic } from 'hoofd/preact'
import { TranslateProvider } from '@denysvuika/preact-translate'
import pretty from 'pretty'

import App from './App'

import { assetsByChunkName } from '../dist-ssr/stats.json'
import en from '../public/translations/en.json'
import { uri } from './constants/config'

// global.fetch = require('node-fetch').default

const app = new Koa()

app.use(serve(__dirname))

app.use(async ctx => {
  let state = {}

  if (ctx.request.url === '/') {
    const res = await fetch(`${uri}/posts`)
    const data = await res.json()
    state = { posts: data.posts }
  }

  console.log(ctx.request.url)
  ctx.type = 'html'
  ctx.body = pretty(renderer(ctx.request.url, state), { ocd: true })
})

// renderer
function renderer(url, state = {}) {
  const rendered = render(
    <TranslateProvider translations={{ en }} lang="en">
      <App url={url} state={state} />
    </TranslateProvider>
  )

  let files = []

  Object.keys(assetsByChunkName).forEach(key => {
    if (Array.isArray(assetsByChunkName[key])) {
      files = files.concat(assetsByChunkName[key])
    } else {
      files.push(assetsByChunkName[key])
    }
  })

  const scripts = files.filter(f => f.endsWith('.js'))
  const stylesheets = files.filter(f => f.endsWith('.css'))
  const { metas, links, title, lang } = toStatic()

  return `<!DOCTYPE html>
  <html lang="${lang}">
    <head>
      <title>${title}</title>
      <meta charset="utf-8" />      
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="manifest" href="/site.webmanifest" />
      <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
      <meta name="msapplication-TileColor" content="#da532c" />
      <meta name="theme-color" content="#ffffff" />
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0"
      />
      ${metas.reduce(
        (acc, meta) =>
          `${acc}<meta ${Object.keys(meta)
            .map(key => `${key}="${meta[key]}"`)
            .join(' ')}>`,
        ''
      )}
      ${links.reduce(
        (acc, link) =>
          `${acc}<link ${Object.keys(link)
            .map(key => `${key}="${link[key]}"`)
            .join(' ')}>`,
        ''
      )}
      ${stylesheets
        .map(f => `<link rel="stylesheet" type="text/css" href="/${f}" />`)
        .join('\n')}
      ${scripts
        .map(f => `<script defer="defer" src="/${f}"></script>`)
        .join('\n')}
    </head>
    <body>
      ${rendered}
      <script>
          window.__STATE__ = ${serialize(state).replace(/</g, '\\u003c')}
      </script>
    </body>
  </html>`
}

app.listen(3000)
