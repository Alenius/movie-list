import React, { useState, useEffect } from 'react'
import { Link } from 'gatsby'

import Page from '../components/Page'
import Container from '../components/Container'
import IndexLayout from '../layouts'
import MovieRandomizer from '../components/MovieRandomizer'

const IndexPage = () => {
  const [movie] = useState('The Green Mile')

  return (
    <IndexLayout>
      <Page>
        <Container>
          <p>Welcome to my cool site.</p>
          <MovieRandomizer />
        </Container>
      </Page>
    </IndexLayout>
  )
}

export default IndexPage
