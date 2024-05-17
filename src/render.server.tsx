import { StrictMode } from 'react'
import { type Handler } from 'worktop'
import { ApolloProvider } from '@apollo/client'
import { HelmetProvider } from 'react-helmet-async'
import { StaticRouter } from 'react-router-dom/server'
import { renderToReadableStream, renderToString } from 'react-dom/server'
import { getDataFromTree } from '@apollo/client/react/ssr'
import { Manifest } from 'vite'

import { type WorkerContext } from './router.server'
import { createGraphqlClientServer } from './graphqlClient.server'
import { Html } from './components/Html'
import { App } from './components/App'

export let render: Handler<WorkerContext> = async (req, context) => {
  let url = new URL(req.url)
  let gqlClient = createGraphqlClientServer(context)

  let app = (
    <StrictMode>
      <ApolloProvider client={gqlClient}>
        <StaticRouter location={url.pathname}>
          <App />
        </StaticRouter>
      </ApolloProvider>
    </StrictMode>
  )

  let content = await getDataFromTree(app)
  let apolloState = gqlClient.extract()

  let assetsRaw = await context.bindings.ASSETS.fetch('/.vite/manifest.json')
  let assets = await assetsRaw.json<Manifest>()

  app = (
    <HelmetProvider>
      <Html assets={assets} apolloState={apolloState} content={content} />
    </HelmetProvider>
  )

  let vite = context.bindings.VITE
  if (vite) {
    // This feels wrong, I want to use the streaming API (renderToReadableStream),
    // but I'm not sure how to add the Vite transformIndexHtml to it.
    let html = renderToString(app)
    html = await vite.transformIndexHtml(url.pathname, html)
    html = `<!DOCTYPE html>${html}`

    return new Response(html, {
      headers: {
        'content-type': 'text/html',
      },
    })
  }

  let controller = new AbortController()
  let res = await renderToReadableStream(app, {
    signal: controller.signal,
  })

  return new Response(res, {
    headers: {
      'content-type': 'text/html',
    },
  })
}
