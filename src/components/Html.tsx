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
        <title>App</title>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no"
        />
      </Helmet>
      <body>
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
