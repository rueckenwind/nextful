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
  grid-column-gap: 1rem;
  color: inherit;
  text-decoration: none;
`;
const TeaserSmall = styled.a`
  color: inherit;
  text-decoration: none;
`;

const Img = styled.img`
  border: 1px solid ${colors.graylightest};
  transition: border-color ${times.transition};

  ${Teaser}:hover &,
  ${TeaserSmall}:hover & {
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

export const BikeTeaserImg = ({ image, slug }) => {
  const img = image && {
    x1: `${image.src}?w=200&h=200&fit=fill`,
    x2: `${image.src}?w=400&h=400&fit=fill`,
  };

  return (
    <TeaserSmall href={bikeLink(slug)}>
      <Img
        src={img.x1}
        srcSet={`${img.x1} 1x, ${img.x2} 2x`}
        alt={image.alt} />
    </TeaserSmall>
  );
};

BikeTeaserImg.defaultProps = {
  image: {
    src: defaultBikeImg,
    alt: 'Default Bike Image',
  },
};

BikeTeaserImg.propTypes = {
  slug: PropTypes.string.isRequired,
  image: PropTypes.shape({
    src: PropTypes.string,
    alt: PropTypes.string,
  }),
};

export const BikeTeaser = ({
  name, image, slug, category, frameShapes, status,
}) => {
  const img = image && {
    x1: `${image.src}?w=200&h=200&fit=fill`,
    x2: `${image.src}?w=400&h=400&fit=fill`,
  };

  return (
    <Teaser href={bikeLink(slug)}>
      <Img
        src={img.x1}
        srcSet={`${img.x1} 1x, ${img.x2} 2x`}
        alt={image.alt} />
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
  slug: PropTypes.string.isRequired,
  image: PropTypes.shape({
    src: PropTypes.string,
    alt: PropTypes.string,
  }),
  frameShapes: PropTypes.array,
  category: PropTypes.object.isRequired,
  status: PropTypes.string.isRequired,
};
