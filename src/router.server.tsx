import React from 'react'
import { ViteDevServer } from 'vite'
import { Router, type Context } from 'worktop'
import type { Durable } from 'worktop/cfw.durable'
import * as diff from 'diff'
import prettier from 'prettier'
import fs from 'fs/promises'

import { createYoga } from 'graphql-yoga'
import { schema } from './graphqlSchema.server'
import { render } from './render.server'
import path from 'path'

export type WorkerContext = Context & {
  bindings: {
    ASSETS: Durable.Object
    VITE?: ViteDevServer
  }
}

export let router = new Router<WorkerContext>()

router.add('POST', '/graphql', async (req, context) => {
  let gqlServer = createYoga({ schema })
  return gqlServer.fetch(req, context)
})

router.add('GET', '/assets/*', (req, context) => {
  return context.bindings.ASSETS.fetch(req)
})

router.add('GET', '/*', render)

router.add('POST', '/diff', async (req, context) => {
  let { ssrHtml, clientHtml } = await req.json<any>()

  ssrHtml = await prettier.format(ssrHtml, { parser: 'html' })
  clientHtml = await prettier.format(clientHtml, { parser: 'html' })

  let difference = diff.diffChars(ssrHtml, clientHtml)

  let color = (colorCode: string, text: string) => `\x1b[${colorCode}m${text}\x1b[0m`

  let coloredDiff = difference
    .map((part) => {
      if (part.added) {
        return color('32', part.value)
      }
      if (part.removed) {
        return color('31', part.value)
      }
      return part.value
    })
    .join('')

  process.stderr.write('\nDiff:\n' + coloredDiff + '\n')


  return new Response(JSON.stringify(difference), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  })
})

router.onerror = (_request, context) => {
  let { error } = context
  console.log('router.onerror', error)
  return new Response(error?.message, { status: 500 })
}
