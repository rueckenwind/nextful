import React from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'

import { BikeTeaserImg } from '../BikeTeaser/BikeTeaser'

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-column-gap: 0.5rem;
`

const LatestBikes = ({ bikes }) => (
  <Grid>
    {bikes.map(bike => (
      <BikeTeaserImg {...bike} key={bike.slug} />
    ))}
  </Grid>
)

LatestBikes.propTypes = {
  bikes: PropTypes.array.isRequired,
}

export default LatestBikes
