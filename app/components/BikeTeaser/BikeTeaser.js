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
`;

const Img = styled.img`
  margin-right: 1rem;
  border: 1px solid ${colors.graylightest};
  transition: border-color ${times.transition};

  ${Teaser}:hover & {
    border-color: ${colors.blue};
  }
`;

const bikeLink = slug => `/fahrrad/${slug}/`;

const BikeTeaser = (props) => {
  console.log(props);
  const { name, image = {}, slug } = props;
  return (
    <Teaser href={bikeLink(slug)}>
      <Img src={`${image.src}?w=200`} alt={image.alt} />
      <div>
        <H3>{ name }</H3>
      </div>
    </Teaser>
  );
};

BikeTeaser.defaultProps = {
  image: {
    src: defaultBikeImg,
    alt: 'Default Bike Image',
  },
};

BikeTeaser.propTypes = {
  name: PropTypes.string.isRequired,
  image: PropTypes.shape({
    src: PropTypes.string,
    alt: PropTypes.string,
  }),

};

export default BikeTeaser;
