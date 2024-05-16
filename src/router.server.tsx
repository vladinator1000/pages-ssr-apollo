import React from 'react'
import { ViteDevServer } from 'vite'
import { Router, type Context } from 'worktop'
import type { Durable } from 'worktop/cfw.durable'

import { createYoga } from 'graphql-yoga'
import { schema } from './graphqlSchema.server'
import { render } from './render.server'

export type WorkerContext = Context & {
  bindings: {
    ASSETS: Durable.Object
    VITE?: ViteDevServer
  }
}

export let router = new Router<WorkerContext>()

router.add('POST', '/graphql', async (req, context) => {
  let gqlServer = createYoga({ schema })
  console.log('yo');

  return gqlServer.fetch(req, context)
})

router.add('GET', '/assets/*', (req, context) => {
  return context.bindings.ASSETS.fetch(req)
})

router.add('GET', '/*', render)

router.onerror = (_request, context) => {
  let { error } = context
  console.log('router.onerror', error)
  return new Response(error?.message, { status: 500 })
}
