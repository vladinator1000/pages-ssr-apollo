import React, { Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import loadable from '@loadable/component'

let LandingPage = loadable(() => import('./LandingPage'))
let DataPage = loadable(() => import('./DataPage'))

let withSuspense = false

export function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/data" element={<DataPage />} />
    </Routes>
  )
}
