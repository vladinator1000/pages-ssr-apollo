import React, { StrictMode } from 'react'
import { hydrateRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { ApolloProvider } from '@apollo/client'

import { graphqlClient } from './graphqlClient.client'
import { App } from './components/App'

let element = document.getElementById('root')
if (!element) {
  throw new Error('Unable to find element with ID "root" in HTML.')
}

let app = (
  <StrictMode>
    <HelmetProvider>
      <ApolloProvider client={graphqlClient}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ApolloProvider>
    </HelmetProvider>
  </StrictMode>
)

hydrateRoot(element, app)
