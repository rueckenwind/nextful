import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';

import { H3 } from '../Typography';
import defaultBikeImg from './bike.png';
import colors from '../../js/colors';
import times from '../../js/times';

const Teaser = styled.a`
  display: grid;
  grid-template-columns: 33% auto;
  grid-gap: 1rem;
  color: inherit;
  text-decoration: none;
`;

const Img = styled.img`
  margin-right: 1rem;
  border: 1px solid ${colors.graylightest};
  transition: border-color ${times.transition};

  ${Teaser}:hover & {
    border-color: ${colors.blue};
  }
`;

const Grid = styled.div`
  display: grid;
  grid-gap: .5rem;
`;

const SubHeader = styled.div`
  font-size: .75rem;
  font-weight: bold;
`;

const bikeLink = slug => `/fahrrad/${slug}/`;

const BikeTeaser = (props) => {
  console.log(props);
  const {
    name, image, slug, category, frameShapes, status,
  } = props;
  return (
    <Teaser href={bikeLink(slug)}>
      <Img src={`${image.src}?w=200`} alt={image.alt} />
      <Grid>
        <H3>{ name }</H3>

        <div>
          <SubHeader>Kategorie</SubHeader>
          { category.name }
        </div>

        <div>
          <SubHeader>Rahmenform</SubHeader>
          { frameShapes.map(frameShape => frameShape.name).join(', ') }
        </div>

        <div>
          <SubHeader>Status</SubHeader>
          { status }
        </div>
      </Grid>
    </Teaser>
  );
};

BikeTeaser.defaultProps = {
  image: {
    src: defaultBikeImg,
    alt: 'Default Bike Image',
  },
  frameShapes: [],
};

BikeTeaser.propTypes = {
  name: PropTypes.string.isRequired,
  image: PropTypes.shape({
    src: PropTypes.string,
    alt: PropTypes.string,
  }),
  frameShapes: PropTypes.array,
};

export default BikeTeaser;
