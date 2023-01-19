import Koa from 'koa'
import render from 'preact-render-to-string'
import serialize from 'serialize-javascript'
import serve from 'koa-static'
import { toStatic } from 'hoofd/preact'

import App from './App'

import { assetsByChunkName } from '../dist-ssr/stats.json'

const app = new Koa()

app.use(serve(__dirname))

app.use(async ctx => {
  console.log(ctx.request.url)
  ctx.type = 'html'
  ctx.body = renderer(ctx.request.url, { hello: 10 })
})

// renderer
function renderer(route, state = {}) {
  const rendered = render(<App route={route} />)

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
      <div id="root">${rendered}</div>    
    
      <script>
          window.__STATE__ = ${serialize(state).replace(/</g, '\\u003c')}
      </script>
    </body>
  </html>`
}

app.listen(3000)
