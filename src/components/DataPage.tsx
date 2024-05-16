import React from 'react'
import { useQuery, gql } from '@apollo/client'

let landingPageQuery = gql`
  query LandingPageQuery {
    hello
  }
`

function LandingPage() {
  const { data } = useQuery(landingPageQuery)

  return (
    <div>
      Data page
      <p>{data.hello}</p>
    </div>
  )
}

export default LandingPage
