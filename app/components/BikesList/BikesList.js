import React from 'react';
import styled from '@emotion/styled';
import { H1 } from '../Typography';
import { BikeTeaser } from '../BikeTeaser/BikeTeaser';
import { BikeFilterConsumer } from '../BikeFilterContext/BikeFilterContext';

const Grid = styled.div`
  display: grid;
  grid-gap: 1rem;
`;

const BikesList = () => (
  <BikeFilterConsumer>
    {({ bikes } = {}) => {
      return (
        <Grid>
          <H1>Fahrräder</H1>

          { bikes.map(bike => (
            <BikeTeaser {...bike} key={bike.id} />
          )) }
        </Grid>
      );
    }}
  </BikeFilterConsumer>
);

export default BikesList;
