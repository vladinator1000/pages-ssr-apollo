import React, { Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'

let LandingPage = React.lazy(() => import('./LandingPage'))
let DataPage = React.lazy(() => import('./DataPage'))

export function App() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/data" element={<DataPage />} />
      </Routes>
    </Suspense>
  )
}
