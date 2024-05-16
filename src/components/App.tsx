import React, { Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'

let LandingPage = React.lazy(() => import('./LandingPage'))
let DataPage = React.lazy(() => import('./DataPage'))

let withSuspense = true

export function App() {
  let content = (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/data" element={<DataPage />} />
    </Routes>
  )

  if (withSuspense) {
    // This path renders on the server, but when the client loads, it errors:
    // "Uncaught Error: Hydration failed because the initial UI does not match what was rendered on the server."
    // Then it throws out the whole dom and re-renders
    return <Suspense fallback={<p>Loading...</p>}>{content}</Suspense>
  }

  // This path fails to load and errors:
  // "A component suspended while responding to synchronous input. This will cause the UI to be replaced with a loading indicator. To fix, updates that suspend should be wrapped with startTransition."
  return content
}
