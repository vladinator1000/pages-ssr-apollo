import React from 'react'
import { NormalizedCacheObject } from '@apollo/client'
import { Manifest } from 'vite'
import { Helmet } from 'react-helmet-async'

type Props = {
  assets: Manifest
  content: string
  apolloState: NormalizedCacheObject
}

export function Html({ assets, content, apolloState }: Props) {
  return (
    <html lang="en">
      <Helmet>
        <title>Yupty</title>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no"
        />
        <link
          rel="stylesheet"
          href="https://pro.fontawesome.com/releases/v5.5.0/css/all.css"
          integrity="sha384-j8y0ITrvFafF4EkV1mPW0BKm6dp3c+J9Fky22Man50Ofxo2wNe5pT1oZejDH9/Dt"
          crossOrigin="anonymous"
        />
        <link
          rel="stylesheet"
          href="/node_modules/normalize.css/normalize.css"
        />
      </Helmet>
      <body>
        <noscript
          dangerouslySetInnerHTML={{
            __html: `<b>Please enable JavaScript for a better experience.</b>`,
          }}
        />

        <div id="root" dangerouslySetInnerHTML={{ __html: content }} />
        <script
          type="module"
          src={assets['src/entry.client.tsx'].file}
        ></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `window.__APOLLO_STATE__=${JSON.stringify(
              apolloState,
            ).replace(/</g, '\\u003c')};`,
          }}
        />
      </body>
    </html>
  )
}
