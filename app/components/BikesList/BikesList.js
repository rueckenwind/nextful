import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { H1 } from '../Typography';
import BikeTeaser from '../BikeTeaser/BikeTeaser';

const Grid = styled.div`
  display: grid;
  grid-gap: 1rem;
`;

const BikesList = ({ bikes }) => {
  const filteredBikes = bikes;

  console.log(filteredBikes);


  return (
    <Grid>
      <H1>Fahrräder</H1>
      { filteredBikes.map(bike => (
        <BikeTeaser {...bike} />
      )) }
    </Grid>
  );
};

BikesList.propTypes = {
  bikes: PropTypes.array.isRequired,
};

export default BikesList;
